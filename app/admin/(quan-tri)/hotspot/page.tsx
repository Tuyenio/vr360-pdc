import { AdminTourBuilder } from "../../components/AdminTourBuilder";
import { AdminFrame } from "../../components/AdminFrame";
import { heritageSites } from "../../../lib/data";

export default function AdminHotspotPage() {
  return (
    <AdminFrame
      eyebrow="Hotspot giới thiệu"
      title="Biên tập điểm thông tin, ảnh, video và thuyết minh"
    >
      <AdminTourBuilder sites={heritageSites} focus="hotspots" />
    </AdminFrame>
  );
}
