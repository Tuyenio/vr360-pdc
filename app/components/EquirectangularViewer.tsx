"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import * as THREE from "three";

export type PanoramaPov = {
  heading: number;
  pitch: number;
  fov?: number;
};

export type ViewerHotspot = {
  id: string;
  title: string;
  yaw: number;
  pitch: number;
  type: "navigation" | "info";
  thumbnail?: string;
  variant?: "arrow" | "book" | "audio" | "media" | "temple";
};

export type EquirectangularViewerHandle = {
  getPov: () => PanoramaPov;
  setPov: (pov: PanoramaPov) => void;
};

type ProjectedHotspot = ViewerHotspot & {
  visible: boolean;
  x: number;
  y: number;
};

type Props = {
  src: string;
  title: string;
  heading: number;
  pitch?: number;
  fov?: number;
  hotspots?: ViewerHotspot[];
  preloadSrcs?: string[];
  interactionDisabled?: boolean;
  debugHotspots?: boolean;
  onHotspotClick?: (hotspot: ViewerHotspot & { x: number; y: number }) => void;
  onDebugCoordinate?: (coordinate: { yaw: number; pitch: number }) => void;
};

const MIN_FOV = 28;
const MAX_FOV = 100;
const textureCache = new Map<string, Promise<THREE.Texture>>();

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const normalizeHeading = (heading: number) => ((heading % 360) + 360) % 360;

function vectorFromYawPitch(yaw: number, pitch: number, radius = 500) {
  const yawRad = THREE.MathUtils.degToRad(normalizeHeading(yaw));
  const pitchRad = THREE.MathUtils.degToRad(clamp(pitch, -89.9, 89.9));

  return new THREE.Vector3(
    Math.sin(yawRad) * Math.cos(pitchRad) * radius,
    Math.sin(pitchRad) * radius,
    -Math.cos(yawRad) * Math.cos(pitchRad) * radius,
  );
}

function yawPitchFromScreenPoint(
  camera: THREE.PerspectiveCamera,
  container: HTMLElement,
  clientX: number,
  clientY: number,
) {
  const rect = container.getBoundingClientRect();
  const pointer = new THREE.Vector2(
    ((clientX - rect.left) / rect.width) * 2 - 1,
    -((clientY - rect.top) / rect.height) * 2 + 1,
  );
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(pointer, camera);
  const direction = raycaster.ray.direction.normalize();

  return {
    yaw: normalizeHeading(THREE.MathUtils.radToDeg(Math.atan2(direction.x, -direction.z))),
    pitch: THREE.MathUtils.radToDeg(Math.asin(clamp(direction.y, -1, 1))),
  };
}

function prepareTexture(texture: THREE.Texture, renderer: THREE.WebGLRenderer | null) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer?.capabilities.getMaxAnisotropy() ?? 1;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;

  return texture;
}

function loadTexture(src: string, renderer: THREE.WebGLRenderer | null) {
  const cached = textureCache.get(src);
  if (cached) return cached.then((texture) => prepareTexture(texture, renderer));

  const promise = new Promise<THREE.Texture>((resolve, reject) => {
    new THREE.TextureLoader().load(
      src,
      (texture) => resolve(prepareTexture(texture, renderer)),
      undefined,
      reject,
    );
  });
  textureCache.set(src, promise);

  return promise;
}

function updateCameraPov(camera: THREE.PerspectiveCamera, pov: PanoramaPov) {
  const heading = normalizeHeading(pov.heading);
  const pitch = clamp(pov.pitch, -85, 85);
  const headingRad = THREE.MathUtils.degToRad(heading);
  const pitchRad = THREE.MathUtils.degToRad(pitch);
  const lookAt = new THREE.Vector3(
    Math.sin(headingRad) * Math.cos(pitchRad),
    Math.sin(pitchRad),
    -Math.cos(headingRad) * Math.cos(pitchRad),
  );

  camera.fov = clamp(pov.fov ?? camera.fov, MIN_FOV, MAX_FOV);
  camera.updateProjectionMatrix();
  camera.lookAt(lookAt);
}

export const EquirectangularViewer = forwardRef<EquirectangularViewerHandle, Props>(
  function EquirectangularViewer(
    {
      src,
      title,
      heading,
      pitch = 0,
      fov = 72,
      hotspots = [],
      preloadSrcs = [],
      interactionDisabled = false,
      debugHotspots = false,
      onHotspotClick,
      onDebugCoordinate,
    },
    ref,
  ) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const materialRef = useRef<THREE.MeshBasicMaterial | null>(null);
    const hotspotsRef = useRef(hotspots);
    const povRef = useRef<PanoramaPov>({ heading, pitch, fov });
    const dragRef = useRef({
      isDragging: false,
      pointerId: 0,
      startX: 0,
      startY: 0,
      startHeading: heading,
      startPitch: pitch,
      hasMoved: false,
    });
    const pinchRef = useRef({ isPinching: false, startDistance: 0, startFov: fov });
    const activePointersRef = useRef(new Map<number, { x: number; y: number }>());
    const [projectedHotspots, setProjectedHotspots] = useState<ProjectedHotspot[]>([]);
    const [debugCoordinate, setDebugCoordinate] = useState<{ yaw: number; pitch: number } | null>(
      null,
    );

    const setPov = (nextPov: PanoramaPov) => {
      const next = {
        heading: normalizeHeading(nextPov.heading),
        pitch: clamp(nextPov.pitch, -85, 85),
        fov: clamp(nextPov.fov ?? povRef.current.fov ?? fov, MIN_FOV, MAX_FOV),
      };
      povRef.current = next;
      if (cameraRef.current) updateCameraPov(cameraRef.current, next);
    };

    useImperativeHandle(ref, () => ({
      getPov: () => ({ ...povRef.current }),
      setPov,
    }));

    useEffect(() => {
      hotspotsRef.current = hotspots;
    }, [hotspots]);

    useEffect(() => {
      if (!interactionDisabled) return;
      dragRef.current.isDragging = false;
      activePointersRef.current.clear();
      pinchRef.current.isPinching = false;
    }, [interactionDisabled]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return undefined;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);

      const geometry = new THREE.SphereGeometry(500, 96, 64);
      geometry.scale(-1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x071719 });
      scene.add(new THREE.Mesh(geometry, material));

      cameraRef.current = camera;
      rendererRef.current = renderer;
      materialRef.current = material;
      updateCameraPov(camera, povRef.current);

      const resize = () => {
        if (!container.clientWidth || !container.clientHeight) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      const observer = new ResizeObserver(resize);
      observer.observe(container);
      resize();

      let frame = 0;
      const render = () => {
        renderer.render(scene, camera);
        const rect = container.getBoundingClientRect();
        setProjectedHotspots(
          hotspotsRef.current.map((hotspot) => {
            const projected = vectorFromYawPitch(hotspot.yaw, hotspot.pitch).project(camera);
            const visible =
              projected.z >= -1 &&
              projected.z <= 1 &&
              projected.x >= -1 &&
              projected.x <= 1 &&
              projected.y >= -1 &&
              projected.y <= 1;

            return {
              ...hotspot,
              visible,
              x: ((projected.x + 1) / 2) * rect.width,
              y: ((-projected.y + 1) / 2) * rect.height,
            };
          }),
        );
        frame = window.requestAnimationFrame(render);
      };
      render();

      return () => {
        window.cancelAnimationFrame(frame);
        observer.disconnect();
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        renderer.domElement.remove();
        cameraRef.current = null;
        rendererRef.current = null;
        materialRef.current = null;
      };
    }, [fov]);

    useEffect(() => {
      const material = materialRef.current;
      if (!material) return undefined;

      let cancelled = false;
      void loadTexture(src, rendererRef.current)
        .then((texture) => {
          if (cancelled) return;
          material.color.set(0xffffff);
          material.map = texture;
          material.needsUpdate = true;
        })
        .catch((error) => console.error(error));

      return () => {
        cancelled = true;
      };
    }, [src]);

    useEffect(() => {
      if (!preloadSrcs.length) return undefined;
      const timer = window.setTimeout(() => {
        preloadSrcs.forEach((preloadSrc) => {
          if (preloadSrc !== src) {
            void loadTexture(preloadSrc, rendererRef.current).catch((error) => console.error(error));
          }
        });
      }, 450);

      return () => window.clearTimeout(timer);
    }, [preloadSrcs, src]);

    useEffect(() => {
      setPov({ heading, pitch, fov });
      // setPov talks to the imperative Three.js camera and clamps the latest props.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [heading, pitch, fov]);

    const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
      if (interactionDisabled) return;
      activePointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

      if (activePointersRef.current.size === 2) {
        const pointers = Array.from(activePointersRef.current.values());
        pinchRef.current = {
          isPinching: true,
          startDistance: Math.hypot(pointers[0].x - pointers[1].x, pointers[0].y - pointers[1].y),
          startFov: povRef.current.fov ?? fov,
        };
        dragRef.current.isDragging = false;
        event.currentTarget.setPointerCapture(event.pointerId);
        return;
      }

      dragRef.current = {
        isDragging: true,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startHeading: povRef.current.heading,
        startPitch: povRef.current.pitch,
        hasMoved: false,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
      if (interactionDisabled) return;
      if (activePointersRef.current.has(event.pointerId)) {
        activePointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
      }

      if (pinchRef.current.isPinching && activePointersRef.current.size >= 2) {
        const pointers = Array.from(activePointersRef.current.values());
        const distance = Math.hypot(pointers[0].x - pointers[1].x, pointers[0].y - pointers[1].y);
        if (distance > 0 && pinchRef.current.startDistance > 0) {
          setPov({
            ...povRef.current,
            fov: pinchRef.current.startFov * (pinchRef.current.startDistance / distance),
          });
        }
        return;
      }

      const drag = dragRef.current;
      if (!drag.isDragging || drag.pointerId !== event.pointerId) return;
      if (Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 4) {
        drag.hasMoved = true;
      }

      setPov({
        heading: normalizeHeading(drag.startHeading - (event.clientX - drag.startX) * 0.12),
        pitch: clamp(drag.startPitch + (event.clientY - drag.startY) * 0.12, -85, 85),
        fov: povRef.current.fov,
      });
    };

    const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
      activePointersRef.current.delete(event.pointerId);
      if (activePointersRef.current.size < 2) pinchRef.current.isPinching = false;
      if (dragRef.current.pointerId === event.pointerId) dragRef.current.isDragging = false;
    };

    const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (interactionDisabled) return;
      setPov({ ...povRef.current, fov: (povRef.current.fov ?? fov) + event.deltaY * 0.04 });
    };

    const handleClick = (event: ReactMouseEvent<HTMLDivElement>) => {
      if (
        interactionDisabled ||
        !debugHotspots ||
        dragRef.current.hasMoved ||
        !cameraRef.current ||
        !containerRef.current
      ) {
        return;
      }

      const coordinate = yawPitchFromScreenPoint(
        cameraRef.current,
        containerRef.current,
        event.clientX,
        event.clientY,
      );
      const rounded = {
        yaw: Number(coordinate.yaw.toFixed(1)),
        pitch: Number(coordinate.pitch.toFixed(1)),
      };
      setDebugCoordinate(rounded);
      onDebugCoordinate?.(rounded);
    };

    return (
      <div
        className="sphere-viewer"
        data-interaction-disabled={interactionDisabled ? "true" : undefined}
        ref={containerRef}
        role="img"
        aria-label={title}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onWheel={handleWheel}
        onClick={handleClick}
      >
        <div className="viewer-hotspots" aria-hidden={!projectedHotspots.length}>
          {projectedHotspots.map((hotspot) => (
            <button
              aria-label={hotspot.title}
              className={[
                "hotspot-marker",
                `hotspot-marker--${hotspot.type}`,
                hotspot.variant ? `hotspot-marker--${hotspot.variant}` : "",
                hotspot.visible ? "hotspot-marker--visible" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              key={hotspot.id}
              onClick={(event) => {
                event.stopPropagation();
                onHotspotClick?.({ ...hotspot, x: hotspot.x, y: hotspot.y });
              }}
              onPointerDown={(event) => event.stopPropagation()}
              style={{
                transform: `translate3d(${hotspot.x}px, ${hotspot.y}px, 0) translate(-50%, -50%)`,
              }}
              tabIndex={hotspot.visible ? 0 : -1}
              title={hotspot.title}
              type="button"
            >
              <span className="hotspot-marker__icon" aria-hidden="true" />
              {hotspot.type === "navigation" ? (
                <span className="hotspot-marker__preview" aria-hidden="true">
                  {hotspot.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={hotspot.thumbnail} alt="" loading="lazy" />
                  ) : null}
                  <strong>{hotspot.title}</strong>
                </span>
              ) : (
                <span className="hotspot-marker__label">{hotspot.title}</span>
              )}
            </button>
          ))}
        </div>
        {debugHotspots ? (
          <div className="hotspot-debug" aria-live="polite">
            {debugCoordinate
              ? `yaw: ${debugCoordinate.yaw} | pitch: ${debugCoordinate.pitch}`
              : "Nhấn lên ảnh 360 để lấy yaw/pitch"}
          </div>
        ) : null}
      </div>
    );
  },
);
