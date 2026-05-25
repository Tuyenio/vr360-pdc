export type HeritageType =
  | "Chùa"
  | "Đình"
  | "Đền"
  | "Miếu"
  | "Nhà thờ họ"
  | "Di tích lịch sử";

export type PublishStatus = "published" | "draft" | "hidden";
export type HotspotType = "text" | "image" | "audio" | "video" | "gallery" | "document";

export type Hotspot = {
  id: string;
  type: HotspotType;
  title: string;
  content: string;
  x: number;
  y: number;
  media?: string;
  audio?: string;
  status: PublishStatus;
};

export type NavigationArrow = {
  id: string;
  title: string;
  toPointId: string;
  x: number;
  y: number;
  targetPan: number;
  status: PublishStatus;
  transitionEffect: "fade" | "zoom" | "slide";
};

export type TourPoint = {
  id: string;
  name: string;
  description: string;
  panorama: string;
  preview: string;
  initialPan: number;
  narration?: string;
  isStartPoint: boolean;
  status: PublishStatus;
  hotspots: Hotspot[];
  arrows: NavigationArrow[];
};

export type HeritageSite = {
  id: string;
  name: string;
  slug: string;
  type: HeritageType;
  address: string;
  shortDescription: string;
  content: string[];
  history: string;
  culturalValue: string;
  thumbnail: string;
  banner: string;
  backgroundMusic?: string;
  status: PublishStatus;
  views: number;
  updatedAt: string;
  responsibleUnit: string;
  tourPoints: TourPoint[];
  gallery: string[];
};

export type MediaFile = {
  id: string;
  title: string;
  fileName: string;
  fileType: "image" | "video" | "audio" | "pdf";
  fileUrl: string;
  heritageSite: string;
  description: string;
};

export type AdminNavItem = {
  label: string;
  href: string;
  description: string;
};

export const heritageSites: HeritageSite[] = [
  {
    id: "DT-001",
    name: "Chùa Liên Hoa",
    slug: "chua-lien-hoa",
    type: "Chùa",
    address: "Phường Định Công, quận Hoàng Mai, Hà Nội",
    shortDescription:
      "Không gian tín ngưỡng tiêu biểu của phường Định Công, lưu giữ nhiều giá trị văn hóa, kiến trúc và sinh hoạt cộng đồng.",
    content: [
      "Chùa Liên Hoa là điểm tham quan mẫu trong hệ thống số hóa di tích phường Định Công. Trải nghiệm VR360 cho phép người xem di chuyển qua cổng tam quan, sân chùa, tiền đường, điện Tam Bảo và các không gian phụ trợ như đang có mặt tại di tích.",
      "Nội dung được trình bày theo hướng trang trọng, dễ tiếp cận với người dân, học sinh và khách tham quan. Mỗi điểm dừng có thể gắn thuyết minh, ảnh tư liệu, video, tài liệu và các điểm thông tin liên quan đến hiện vật, kiến trúc, hoành phi, câu đối, bia đá.",
    ],
    history:
      "Theo ký ức cộng đồng, di tích gắn với đời sống tín ngưỡng lâu đời của cư dân địa phương và đã nhiều lần được gìn giữ, tu bổ để đáp ứng nhu cầu sinh hoạt văn hóa, lễ bái và giáo dục truyền thống.",
    culturalValue:
      "Giá trị nổi bật của chùa nằm ở sự kết hợp giữa cảnh quan thanh tịnh, kiến trúc truyền thống, sinh hoạt tín ngưỡng và hệ thống tư liệu về lễ hội, công đức, nghệ thuật trang trí dân gian.",
    thumbnail: "/vr360/Trước Cổng.jpg",
    banner: "/vr360/Sảnh Chính.jpg",
    backgroundMusic: "/icons/nhạc nền.mp3",
    status: "published",
    views: 12840,
    updatedAt: "25/05/2026",
    responsibleUnit: "UBND phường Định Công",
    gallery: [
      "/vr360/Trước Cổng.jpg",
      "/vr360/Sảnh trung tâm.jpg",
      "/vr360/Ban Tam Bảo.jpg",
      "/vr360/Tượng bồ tát.jpg",
    ],
    tourPoints: [
      {
        id: "gate",
        name: "Cổng tam quan",
        description: "Điểm bắt đầu tham quan, giới thiệu trục tiếp cận chính vào chùa.",
        panorama: "/vr360/Trước Cổng.jpg",
        preview: "/vr360/Trước Cổng.jpg",
        initialPan: 18,
        narration: "/icons/âm thanh/Cổng tam quan.mp3",
        isStartPoint: true,
        status: "published",
        hotspots: [
          {
            id: "gate-info",
            type: "text",
            title: "Cổng tam quan",
            content:
              "Cổng tam quan là lớp không gian chuyển tiếp từ đời sống phố phường vào khu vực thanh tịnh, tạo ấn tượng đầu tiên cho hành trình tham quan.",
            x: 52,
            y: 44,
            status: "published",
          },
          {
            id: "welcome-audio",
            type: "audio",
            title: "Lời chào tham quan",
            content: "Nhấn để nghe lời chào và giới thiệu ngắn về hành trình VR360 tại Chùa Liên Hoa.",
            x: 68,
            y: 35,
            audio: "/icons/âm thanh/lời chào.mp3",
            status: "published",
          },
        ],
        arrows: [
          {
            id: "to-yard",
            title: "Đi vào sân chùa",
            toPointId: "yard",
            x: 74,
            y: 62,
            targetPan: 30,
            status: "published",
            transitionEffect: "fade",
          },
        ],
      },
      {
        id: "yard",
        name: "Sân trung tâm",
        description: "Không gian kết nối các hạng mục kiến trúc chính của di tích.",
        panorama: "/vr360/Sảnh trung tâm.jpg",
        preview: "/vr360/Sảnh trung tâm.jpg",
        initialPan: 28,
        narration: "/icons/âm thanh/Hồ sen.mp3",
        isStartPoint: false,
        status: "published",
        hotspots: [
          {
            id: "lotus",
            type: "image",
            title: "Cảnh quan sân chùa",
            content:
              "Sân chùa là nơi diễn ra các hoạt động cộng đồng, tiếp đón Phật tử và kết nối nhiều lối tham quan trong di tích.",
            x: 46,
            y: 52,
            media: "/vr360/Sảnh trung tâm.jpg",
            status: "published",
          },
          {
            id: "tower",
            type: "text",
            title: "Vườn tháp tổ",
            content:
              "Khu vườn tháp gợi nhớ truyền thống tri ân tiền nhân và lịch sử hình thành của nhà chùa.",
            x: 24,
            y: 48,
            status: "published",
          },
        ],
        arrows: [
          {
            id: "back-gate",
            title: "Quay lại cổng",
            toPointId: "gate",
            x: 18,
            y: 62,
            targetPan: 10,
            status: "published",
            transitionEffect: "fade",
          },
          {
            id: "to-main",
            title: "Vào tiền đường",
            toPointId: "main-hall",
            x: 66,
            y: 60,
            targetPan: 35,
            status: "published",
            transitionEffect: "zoom",
          },
          {
            id: "to-statue",
            title: "Đến đài Quan Âm",
            toPointId: "statue",
            x: 86,
            y: 49,
            targetPan: 54,
            status: "published",
            transitionEffect: "slide",
          },
        ],
      },
      {
        id: "main-hall",
        name: "Tiền đường",
        description: "Nơi giới thiệu hoành phi, câu đối và các lớp trang trí kiến trúc.",
        panorama: "/vr360/Sảnh Chính.jpg",
        preview: "/vr360/Sảnh Chính.jpg",
        initialPan: 35,
        narration: "/icons/âm thanh/tiền đường.mp3",
        isStartPoint: false,
        status: "published",
        hotspots: [
          {
            id: "parallel-sentences",
            type: "text",
            title: "Hoành phi, câu đối",
            content:
              "Các mảng chữ Hán Nôm và trang trí gợi mở giá trị nghệ thuật, giáo dục đạo lý và ký ức cộng đồng.",
            x: 55,
            y: 32,
            status: "published",
          },
          {
            id: "donation-stone",
            type: "audio",
            title: "Bia công đức",
            content: "Phần thuyết minh về bia công đức và hoạt động tôn tạo di tích.",
            x: 35,
            y: 54,
            audio: "/icons/âm thanh/bia công đức.mp3",
            status: "published",
          },
        ],
        arrows: [
          {
            id: "back-yard",
            title: "Ra sân chùa",
            toPointId: "yard",
            x: 22,
            y: 66,
            targetPan: 24,
            status: "published",
            transitionEffect: "fade",
          },
          {
            id: "to-tam-bao",
            title: "Vào điện Tam Bảo",
            toPointId: "tam-bao",
            x: 74,
            y: 58,
            targetPan: 40,
            status: "published",
            transitionEffect: "zoom",
          },
        ],
      },
      {
        id: "tam-bao",
        name: "Điện Tam Bảo",
        description: "Không gian trung tâm với các lớp tượng thờ và đồ thờ tự.",
        panorama: "/vr360/Ban Tam Bảo.jpg",
        preview: "/vr360/Ban Tam Bảo.jpg",
        initialPan: 42,
        narration: "/icons/âm thanh/điện tam bảo.mp3",
        isStartPoint: false,
        status: "published",
        hotspots: [
          {
            id: "altar",
            type: "text",
            title: "Ban Tam Bảo",
            content:
              "Ban Tam Bảo là điểm nhấn tín ngưỡng quan trọng, cần được giới thiệu bằng ngôn ngữ trang trọng và dễ hiểu.",
            x: 58,
            y: 38,
            status: "published",
          },
        ],
        arrows: [
          {
            id: "back-main",
            title: "Quay lại tiền đường",
            toPointId: "main-hall",
            x: 20,
            y: 63,
            targetPan: 36,
            status: "published",
            transitionEffect: "fade",
          },
        ],
      },
      {
        id: "statue",
        name: "Đài Quan Âm",
        description: "Điểm dừng gần tượng Bồ Tát và cảnh quan phụ trợ.",
        panorama: "/vr360/Tượng bồ tát.jpg",
        preview: "/vr360/Tượng bồ tát.jpg",
        initialPan: 50,
        narration: "/icons/âm thanh/đài quan âm.mp3",
        isStartPoint: false,
        status: "published",
        hotspots: [
          {
            id: "statue-info",
            type: "text",
            title: "Tượng Bồ Tát",
            content:
              "Điểm thông tin này có thể gắn ảnh tư liệu, video lễ hội hoặc thuyết minh riêng trong bản hoàn thiện.",
            x: 60,
            y: 36,
            status: "published",
          },
        ],
        arrows: [
          {
            id: "back-yard-statue",
            title: "Về sân trung tâm",
            toPointId: "yard",
            x: 28,
            y: 64,
            targetPan: 28,
            status: "published",
            transitionEffect: "fade",
          },
        ],
      },
    ],
  },
  {
    id: "DT-002",
    name: "Đình Định Công",
    slug: "dinh-dinh-cong",
    type: "Đình",
    address: "Khu dân cư Định Công, quận Hoàng Mai, Hà Nội",
    shortDescription:
      "Không gian đình làng gắn với thiết chế cộng đồng, lễ hội truyền thống và ký ức văn hóa của vùng Định Công.",
    content: [
      "Đình Định Công được đưa vào hệ thống như một điểm tham quan mở rộng. Giao diện đã sẵn sàng cho trang giới thiệu, thư viện tư liệu, dữ liệu bản đồ và nút tham quan VR360 khi có ảnh toàn cảnh.",
    ],
    history:
      "Thông tin lịch sử sẽ được quản trị viên cập nhật trong hệ thống quản trị sau khi đối chiếu hồ sơ di tích, tư liệu địa phương và phỏng vấn cộng đồng.",
    culturalValue:
      "Đình làng là không gian quan trọng để giới thiệu nghi lễ, hương ước, lễ hội, thiết chế làng xã và quá trình hình thành cộng đồng dân cư địa phương.",
    thumbnail: "/vr360/Bên Trái.jpg",
    banner: "/vr360/Chi tiết bên trái.jpg",
    status: "published",
    views: 7210,
    updatedAt: "21/05/2026",
    responsibleUnit: "Ban quản lý di tích",
    gallery: ["/vr360/Bên Trái.jpg", "/vr360/Chi tiết bên trái.jpg"],
    tourPoints: [],
  },
  {
    id: "DT-003",
    name: "Miếu cổ Định Công",
    slug: "mieu-co-dinh-cong",
    type: "Miếu",
    address: "Phường Định Công, quận Hoàng Mai, Hà Nội",
    shortDescription:
      "Điểm di tích quy mô nhỏ, phù hợp để số hóa theo dạng tư liệu hiện trạng, bài giới thiệu và thuyết minh ngắn.",
    content: [
      "Miếu cổ Định Công đại diện cho nhóm di tích nhỏ cần được số hóa để lưu giữ thông tin và tạo dữ liệu nền cho giáo dục văn hóa địa phương.",
    ],
    history:
      "Thông tin chi tiết cần bổ sung từ nguồn địa phương, hồ sơ di tích và phỏng vấn người cao tuổi trong cộng đồng.",
    culturalValue:
      "Giá trị nằm ở tín ngưỡng bản địa, ký ức cộng đồng và mối liên hệ giữa di tích với đời sống văn hóa thường ngày.",
    thumbnail: "/vr360/Tháp.jpg",
    banner: "/vr360/Tháp.jpg",
    status: "draft",
    views: 2430,
    updatedAt: "18/05/2026",
    responsibleUnit: "Tổ biên tập nội dung",
    gallery: ["/vr360/Tháp.jpg"],
    tourPoints: [],
  },
];

export const mediaFiles: MediaFile[] = [
  {
    id: "MEDIA-001",
    title: "Ảnh toàn cảnh Cổng tam quan",
    fileName: "Trước Cổng.jpg",
    fileType: "image",
    fileUrl: "/vr360/Trước Cổng.jpg",
    heritageSite: "Chùa Liên Hoa",
    description: "Ảnh panorama dùng cho điểm bắt đầu của tour.",
  },
  {
    id: "MEDIA-002",
    title: "Thuyết minh Tiền đường",
    fileName: "tiền đường.mp3",
    fileType: "audio",
    fileUrl: "/icons/âm thanh/tiền đường.mp3",
    heritageSite: "Chùa Liên Hoa",
    description: "Audio thuyết minh gắn với điểm tham quan Tiền đường.",
  },
  {
    id: "MEDIA-003",
    title: "Ảnh tư liệu sân trung tâm",
    fileName: "Sảnh trung tâm.jpg",
    fileType: "image",
    fileUrl: "/vr360/Sảnh trung tâm.jpg",
    heritageSite: "Chùa Liên Hoa",
    description: "Ảnh dùng trong album tư liệu và popup hotspot.",
  },
];

export const adminNavItems: AdminNavItem[] = [
  { label: "Tổng quan", href: "/admin/dashboard", description: "Số liệu và hoạt động gần đây" },
  { label: "Quản lý di tích", href: "/admin/di-tich", description: "Thông tin, trạng thái và bài giới thiệu" },
  { label: "Điểm VR360", href: "/admin/diem-tham-quan", description: "Ảnh panorama, điểm bắt đầu, góc nhìn" },
  { label: "Mũi tên điều hướng", href: "/admin/mui-ten-dieu-huong", description: "Liên kết giữa các điểm tham quan" },
  { label: "Hotspot", href: "/admin/hotspot", description: "Điểm thông tin, ảnh, video, audio" },
  { label: "Âm thanh", href: "/admin/am-thanh", description: "Nhạc nền và thuyết minh" },
  { label: "Thư viện tư liệu", href: "/admin/thu-vien", description: "Ảnh, video, PDF, audio" },
  { label: "Bài viết", href: "/admin/bai-viet", description: "Nội dung giới thiệu và hướng dẫn" },
  { label: "Tài khoản", href: "/admin/tai-khoan", description: "Người dùng và phân quyền" },
  { label: "Thống kê", href: "/admin/thong-ke", description: "Lượt xem và báo cáo truy cập" },
  { label: "Cài đặt", href: "/admin/cai-dat", description: "Giao diện, logo, thông tin hệ thống" },
];

export const publicNavItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Di tích", href: "/di-tich" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Liên hệ", href: "/lien-he" },
];

export function getSiteBySlug(slug: string) {
  return heritageSites.find((site) => site.slug === slug);
}

export function getFirstTourableSite() {
  return heritageSites.find((site) => site.tourPoints.length > 0) ?? heritageSites[0];
}

export function getPublishedSites() {
  return heritageSites.filter((site) => site.status === "published");
}

export function getAllTourPoints() {
  return heritageSites.flatMap((site) =>
    site.tourPoints.map((point) => ({
      ...point,
      heritageSiteName: site.name,
      heritageSiteSlug: site.slug,
    })),
  );
}

export function getAllHotspots() {
  return getAllTourPoints().flatMap((point) =>
    point.hotspots.map((hotspot) => ({
      ...hotspot,
      tourPointName: point.name,
      heritageSiteName: point.heritageSiteName,
    })),
  );
}

export function getAllNavigationArrows() {
  return getAllTourPoints().flatMap((point) =>
    point.arrows.map((arrow) => ({
      ...arrow,
      fromPointName: point.name,
      heritageSiteName: point.heritageSiteName,
    })),
  );
}
