import { AdminTourBuilder } from "../../components/AdminTourBuilder";
import { AdminFrame } from "../../components/AdminFrame";
import { heritageSites } from "../../../lib/data";

export default function AdminTourPointsPage() {
  return (
    <AdminFrame
      eyebrow="Điểm tham quan VR360"
      title="Xưởng dựng tour, ảnh panorama và tuyến tham quan"
    >
      <AdminTourBuilder sites={heritageSites} focus="points" />
    </AdminFrame>
  );
}
