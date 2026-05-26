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
  spatialPlan: string[];
  preservationNotes: string[];
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

const vrImages = {
  gate: "/vr360/Trước Cổng.jpg",
  center: "/vr360/Sảnh trung tâm.jpg",
  main: "/vr360/Sảnh Chính.jpg",
  altar: "/vr360/Ban Tam Bảo.jpg",
  statue: "/vr360/Tượng bồ tát.jpg",
  left: "/vr360/Bên Trái.jpg",
  leftDetail: "/vr360/Chi tiết bên trái.jpg",
  tower: "/vr360/Tháp.jpg",
};

function createTourPoints(prefix: string, focus: "đình" | "chùa" | "nhà thờ" | "đền"): TourPoint[] {
  const introTitle =
    focus === "đình"
      ? "Cổng tam quan và sân ngoại khu"
      : focus === "chùa"
        ? "Ngoại cảnh và khuôn viên chùa"
        : focus === "nhà thờ"
          ? "Cổng đình, hồ nước và sân tiền phương"
          : "Hồ Đầm Sen và sân hành lễ";

  const interiorTitle =
    focus === "đình"
      ? "Tòa Đại bái"
      : focus === "chùa"
        ? "Tòa Tiền tế"
        : focus === "nhà thờ"
          ? "Tòa đại đình"
          : "Điện thờ chính";

  const detailTitle =
    focus === "đình"
      ? "Hậu cung và kết cấu chữ Đinh"
      : focus === "chùa"
        ? "Hậu cung và hiện vật nghề kim hoàn"
        : focus === "nhà thờ"
          ? "Hoành phi, sắc phong cổ"
          : "Ban thờ Mẫu Tam phủ - Tứ phủ";

  return [
    {
      id: `${prefix}-overview`,
      name: introTitle,
      description:
        "Điểm toàn cảnh giúp người xem nhận diện cấu trúc không gian, lối tiếp cận chính và cảnh quan bao quanh di tích.",
      panorama: focus === "đền" ? vrImages.center : vrImages.gate,
      preview: focus === "đền" ? vrImages.center : vrImages.gate,
      initialPan: 18,
      narration: "/icons/âm thanh/Cổng tam quan.mp3",
      isStartPoint: true,
      status: "published",
      hotspots: [
        {
          id: `${prefix}-overview-info`,
          type: "text",
          title: introTitle,
          content:
            "Cụm không gian này được ưu tiên ghi hình toàn cảnh để phục vụ định vị, giới thiệu tuyến tham quan và tạo điểm mở đầu cho bảo tàng số VR360.",
          x: 52,
          y: 44,
          status: "published",
        },
      ],
      arrows: [
        {
          id: `${prefix}-to-interior`,
          title: `Vào ${interiorTitle}`,
          toPointId: `${prefix}-interior`,
          x: 74,
          y: 62,
          targetPan: 34,
          status: "published",
          transitionEffect: "fade",
        },
      ],
    },
    {
      id: `${prefix}-interior`,
      name: interiorTitle,
      description:
        "Không gian nội tự được số hóa để giới thiệu kiến trúc, hệ thống cột, khung gỗ, ban thờ và các lớp trang trí truyền thống.",
      panorama: focus === "đình" ? vrImages.leftDetail : vrImages.main,
      preview: focus === "đình" ? vrImages.leftDetail : vrImages.main,
      initialPan: 35,
      narration: "/icons/âm thanh/tiền đường.mp3",
      isStartPoint: false,
      status: "published",
      hotspots: [
        {
          id: `${prefix}-structure`,
          type: "text",
          title: "Kiến trúc nội tự",
          content:
            "Điểm thông tin giới thiệu cấu kiện kiến trúc, chất liệu, lớp trang trí và giá trị bảo tồn của không gian thờ tự.",
          x: 56,
          y: 34,
          status: "published",
        },
        {
          id: `${prefix}-narration`,
          type: "audio",
          title: "Thuyết minh không gian",
          content: "Nhấn để nghe thuyết minh ngắn về khu vực đang tham quan.",
          x: 36,
          y: 56,
          audio: "/icons/âm thanh/lời chào.mp3",
          status: "published",
        },
      ],
      arrows: [
        {
          id: `${prefix}-back-overview`,
          title: "Quay lại toàn cảnh",
          toPointId: `${prefix}-overview`,
          x: 20,
          y: 64,
          targetPan: 18,
          status: "published",
          transitionEffect: "fade",
        },
        {
          id: `${prefix}-to-detail`,
          title: `Xem ${detailTitle}`,
          toPointId: `${prefix}-detail`,
          x: 76,
          y: 58,
          targetPan: 42,
          status: "published",
          transitionEffect: "zoom",
        },
      ],
    },
    {
      id: `${prefix}-detail`,
      name: detailTitle,
      description:
        "Khu vực đặc tả bảo tồn dùng để lưu giữ tư liệu độ phân giải cao về hiện vật, sắc phong, hoành phi, câu đối và hệ thống thờ tự.",
      panorama: focus === "chùa" ? vrImages.altar : focus === "đền" ? vrImages.statue : vrImages.tower,
      preview: focus === "chùa" ? vrImages.altar : focus === "đền" ? vrImages.statue : vrImages.tower,
      initialPan: 44,
      narration: focus === "đền" ? "/icons/âm thanh/đài quan âm.mp3" : "/icons/âm thanh/điện tam bảo.mp3",
      isStartPoint: false,
      status: "published",
      hotspots: [
        {
          id: `${prefix}-artifact`,
          type: "image",
          title: detailTitle,
          content:
            "Khu vực này có thể gắn album ảnh, video tư liệu, bản dịch sắc phong và thuyết minh chuyên sâu trong giai đoạn hoàn thiện dữ liệu.",
          x: 58,
          y: 38,
          media: focus === "chùa" ? vrImages.altar : vrImages.tower,
          status: "published",
        },
      ],
      arrows: [
        {
          id: `${prefix}-back-interior`,
          title: `Quay lại ${interiorTitle}`,
          toPointId: `${prefix}-interior`,
          x: 22,
          y: 64,
          targetPan: 35,
          status: "published",
          transitionEffect: "fade",
        },
      ],
    },
  ];
}

export const heritageSites: HeritageSite[] = [
  {
    id: "DT-001",
    name: "Đình Định Công Thượng & Đình Định Công Hạ",
    slug: "dinh-dinh-cong-thuong-ha",
    type: "Đình",
    address: "Phường Định Công, quận Hoàng Mai, thành phố Hà Nội",
    shortDescription:
      "Cụm đình làng quan trọng của Định Công, ưu tiên số hóa cảnh quan tổng thể, cổng tam quan, sân gạch ngoại khu và kiến trúc nội tự chữ Đinh.",
    content: [
      "Cụm Đình Định Công Thượng và Đình Định Công Hạ được đưa vào bản đồ số VR360 như một không gian di sản tiêu biểu, nơi thể hiện cấu trúc làng truyền thống, nghi lễ cộng đồng và lớp kiến trúc gỗ cổ kính.",
      "Dữ liệu số hóa tập trung vào hai lớp thông tin: nhận diện tổng thể bằng flycam 360 tầm cao và quét chi tiết tòa Đại bái, Hậu cung, hệ thống cấu kiện khung gỗ, không gian sân gạch và cổng tam quan.",
    ],
    history:
      "Cụm đình gắn với ký ức cộng đồng Định Công, là nơi lưu giữ sinh hoạt tín ngưỡng, lễ hội và những dấu ấn về tổ chức làng xã qua nhiều thế hệ.",
    culturalValue:
      "Giá trị nổi bật nằm ở cấu trúc kiến trúc chữ Đinh, khung gỗ cổ, trục nghi lễ, không gian sân đình và vai trò gắn kết cộng đồng trong đời sống văn hóa địa phương.",
    thumbnail: vrImages.leftDetail,
    banner: vrImages.leftDetail,
    backgroundMusic: "/icons/nhạc nền.mp3",
    status: "published",
    views: 15320,
    updatedAt: "25/05/2026",
    responsibleUnit: "UBND phường Định Công",
    spatialPlan: [
      "Flycam 360 tầm cao bao quát toàn bộ di tích, cổng tam quan và sân gạch ngoại khu.",
      "Quét chi tiết tòa Đại bái và Hậu cung.",
      "Đặc tả hệ thống cấu kiện khung gỗ kiến trúc chữ Đinh cổ kính.",
    ],
    preservationNotes: [
      "Tác nghiệp ghi hình không can thiệp vào yếu tố gốc cấu thành di tích.",
      "Ưu tiên ánh sáng tự nhiên, hạn chế thiết bị ảnh hưởng đến không gian thờ tự.",
      "Dữ liệu được tổ chức phục vụ giáo dục truyền thống và lưu trữ lâu dài.",
    ],
    gallery: [vrImages.leftDetail, vrImages.left, vrImages.tower],
    tourPoints: createTourPoints("dinh-thuong-ha", "đình"),
  },
  {
    id: "DT-002",
    name: "Chùa Định Công (Định Công Tự)",
    slug: "chua-dinh-cong",
    type: "Chùa",
    address: "Phường Định Công, quận Hoàng Mai, thành phố Hà Nội",
    shortDescription:
      "Không gian Phật giáo và ký ức nghề kim hoàn, trọng tâm là ngoại cảnh chùa, Tiền tế, Hậu cung và hệ thống hiện vật bảo tồn.",
    content: [
      "Chùa Định Công được số hóa như một điểm di sản có chiều sâu văn hóa, vừa mang giá trị tín ngưỡng, vừa gắn với truyền thống nghề kim hoàn của địa phương.",
      "Hệ thống VR360 tập trung vào ngoại cảnh, khuôn viên, tòa Tiền tế, Hậu cung, cửa võng chạm phượng, hương án chạm thủng, bộ dụng cụ chế tác đậu bạc và bài vị Tam vị Tổ nghề Trần Tiêu, Trần Điệu, Trần Hòa.",
    ],
    history:
      "Định Công Tự gắn với sinh hoạt tín ngưỡng của cư dân địa phương và các lớp tư liệu về nghề kim hoàn truyền thống, góp phần phản ánh bản sắc văn hóa riêng của vùng Định Công.",
    culturalValue:
      "Giá trị nổi bật nằm ở sự kết hợp giữa không gian thờ tự, nghệ thuật chạm khắc, tư liệu nghề truyền thống và khả năng truyền tải ký ức nghề nghiệp qua dữ liệu số.",
    thumbnail: vrImages.gate,
    banner: vrImages.main,
    backgroundMusic: "/icons/nhạc nền.mp3",
    status: "published",
    views: 12840,
    updatedAt: "25/05/2026",
    responsibleUnit: "UBND phường Định Công",
    spatialPlan: [
      "Flycam toàn cảnh khuôn viên và vùng bao quanh chùa.",
      "Quét không gian tòa Tiền tế và Hậu cung.",
      "Đặc tả cửa võng chạm phượng, hương án chạm thủng, dụng cụ chế tác đậu bạc và bài vị Tam vị Tổ nghề.",
    ],
    preservationNotes: [
      "Không làm biến dạng, dịch chuyển hoặc tác động đến hiện vật gốc.",
      "Tư liệu hiện vật được gắn hotspot để thuận tiện tra cứu và thuyết minh.",
      "Dữ liệu có thể mở rộng thành chuyên đề nghề kim hoàn Định Công.",
    ],
    gallery: [vrImages.gate, vrImages.center, vrImages.main, vrImages.altar],
    tourPoints: createTourPoints("chua-dinh-cong", "chùa"),
  },
  {
    id: "DT-003",
    name: "Nhà thờ Tổ nghề Kim hoàn",
    slug: "nha-tho-to-nghe-kim-hoan",
    type: "Nhà thờ họ",
    address: "Phường Định Công, quận Hoàng Mai, thành phố Hà Nội",
    shortDescription:
      "Không gian tưởng niệm nghề kim hoàn, tập trung số hóa hồ nước, cổng đình, sân gạch, đại đình, cột lim cổ và hệ thống sắc phong.",
    content: [
      "Nhà thờ Tổ nghề Kim hoàn là điểm nhấn quan trọng trong bản đồ số VR360 bởi nơi đây kết nối di sản kiến trúc với ký ức nghề truyền thống của cộng đồng Định Công.",
      "Dữ liệu số hóa bao gồm cảnh quan tổng thể bằng flycam 360, không gian hồ nước, cổng đình, sân gạch tiền phương, tòa đại đình, kết cấu cột lim cổ, ngai thờ Thành hoàng làng Công Sơ Đại Vương và Đông Hải Đại Vương Đoàn Thượng.",
    ],
    history:
      "Không gian thờ tự gắn với truyền thống nghề kim hoàn, các dòng họ và lớp tư liệu Hán Nôm, sắc phong, hoành phi được cộng đồng gìn giữ qua nhiều thế hệ.",
    culturalValue:
      "Giá trị văn hóa nằm ở mối liên hệ giữa tín ngưỡng nghề, ký ức dòng họ, hệ thống hoành phi, sắc phong cổ của dòng họ Bùi và cấu trúc kiến trúc truyền thống.",
    thumbnail: vrImages.tower,
    banner: vrImages.tower,
    backgroundMusic: "/icons/Nhạc Phật Giáo sâu lắng.mp3",
    status: "published",
    views: 9860,
    updatedAt: "24/05/2026",
    responsibleUnit: "Ban quản lý di tích",
    spatialPlan: [
      "Flycam 360 từ trên cao bao quát hồ nước, cổng đình và sân gạch tiền phương.",
      "Quét chi tiết tòa đại đình và kết cấu cột lim cổ.",
      "Tích hợp tư liệu hoành phi, sắc phong cổ của dòng họ Bùi và hệ thống ngai thờ.",
    ],
    preservationNotes: [
      "Ưu tiên số hóa hiện vật có nguy cơ xuống cấp và tư liệu Hán Nôm.",
      "Hotspot tư liệu được thiết kế để tra cứu theo lớp: kiến trúc, thần tích, sắc phong, nghề truyền thống.",
      "Quá trình ghi hình tuân thủ nghiêm ngặt Luật Di sản văn hóa.",
    ],
    gallery: [vrImages.tower, vrImages.left, vrImages.leftDetail],
    tourPoints: createTourPoints("nha-tho-kim-hoan", "nhà thờ"),
  },
  {
    id: "DT-004",
    name: "Đền Đầm Sen (Đền Mẫu Đầm Sen)",
    slug: "den-dam-sen",
    type: "Đền",
    address: "Khu vực hồ Đầm Sen, phường Định Công, quận Hoàng Mai, Hà Nội",
    shortDescription:
      "Không gian thờ Mẫu gắn với hồ Đầm Sen, trọng tâm là toàn cảnh mặt nước, cổng đền, sân hành lễ và điện thờ chính.",
    content: [
      "Đền Đầm Sen được định hướng số hóa như một cụm cảnh quan tín ngưỡng mở, nơi người xem có thể quan sát mối quan hệ giữa mặt nước, cổng đền, sân hành lễ và điện thờ chính.",
      "Dữ liệu VR360 tập trung vào hồ Đầm Sen, cổng đền, sân hành lễ, điện thờ chính, ban thờ Mẫu Tam phủ - Tứ phủ, hệ thống tượng Mẫu, hoành phi, câu đối và sắc phong cổ.",
    ],
    history:
      "Đền Mẫu Đầm Sen gắn với sinh hoạt tín ngưỡng dân gian, là nơi cộng đồng thực hành lễ nghi và lưu giữ các biểu tượng văn hóa thờ Mẫu tại địa phương.",
    culturalValue:
      "Giá trị nổi bật nằm ở không gian cảnh quan ven hồ, hệ thống thờ Mẫu, hoành phi, câu đối, sắc phong cổ và khả năng giới thiệu tín ngưỡng bản địa bằng trải nghiệm trực quan.",
    thumbnail: vrImages.center,
    banner: vrImages.statue,
    backgroundMusic: "/icons/nhạc nền.mp3",
    status: "published",
    views: 8420,
    updatedAt: "23/05/2026",
    responsibleUnit: "Tổ biên tập nội dung",
    spatialPlan: [
      "Flycam 360 toàn cảnh hồ Đầm Sen, cổng đền và sân hành lễ.",
      "Quét chi tiết điện thờ chính và ban thờ Mẫu Tam phủ - Tứ phủ.",
      "Tích hợp hệ thống tượng Mẫu, hoành phi, câu đối và sắc phong cổ.",
    ],
    preservationNotes: [
      "Ghi hình giữ nguyên tính tôn nghiêm của không gian thờ tự.",
      "Các lớp tư liệu được biên tập để phục vụ quảng bá chính thống và giáo dục văn hóa.",
      "Không gian hồ và sân hành lễ được ưu tiên trong bản đồ định vị VR360.",
    ],
    gallery: [vrImages.center, vrImages.statue, vrImages.main],
    tourPoints: createTourPoints("den-dam-sen", "đền"),
  },
];

export const mediaFiles: MediaFile[] = [
  {
    id: "MEDIA-001",
    title: "Ảnh toàn cảnh cổng tam quan",
    fileName: "Trước Cổng.jpg",
    fileType: "image",
    fileUrl: vrImages.gate,
    heritageSite: "Chùa Định Công",
    description: "Ảnh panorama dùng cho điểm bắt đầu của tour.",
  },
  {
    id: "MEDIA-002",
    title: "Thuyết minh không gian nội tự",
    fileName: "tiền đường.mp3",
    fileType: "audio",
    fileUrl: "/icons/âm thanh/tiền đường.mp3",
    heritageSite: "Chùa Định Công",
    description: "Audio thuyết minh gắn với điểm tham quan nội tự.",
  },
  {
    id: "MEDIA-003",
    title: "Ảnh tư liệu sân trung tâm",
    fileName: "Sảnh trung tâm.jpg",
    fileType: "image",
    fileUrl: vrImages.center,
    heritageSite: "Đền Đầm Sen",
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

export const solutionHighlights = [
  {
    title: "Bảo tàng số VR360",
    text: "Chuyển đổi không gian vật lý tại di tích thành dữ liệu số độ phân giải cao, phục vụ tra cứu và tham quan mọi lúc, mọi nơi.",
  },
  {
    title: "Bản đồ số di tích",
    text: "Tổ chức các cụm Đình, Chùa, Nhà thờ Tổ nghề và Đền Mẫu thành một tuyến trải nghiệm thống nhất.",
  },
  {
    title: "Bảo tồn không xâm lấn",
    text: "Tác nghiệp thực địa tuân thủ Luật Di sản văn hóa, không gây ảnh hưởng hoặc biến dạng yếu tố gốc cấu thành di tích.",
  },
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
