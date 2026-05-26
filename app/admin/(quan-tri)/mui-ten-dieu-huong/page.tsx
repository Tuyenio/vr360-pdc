import { AdminTourBuilder } from "../../components/AdminTourBuilder";
import { AdminFrame } from "../../components/AdminFrame";
import { heritageSites } from "../../../lib/data";

export default function AdminNavigationPage() {
  return (
    <AdminFrame
      eyebrow="Mũi tên điều hướng"
      title="Đặt mũi tên cố định trong không gian VR360"
    >
      <AdminTourBuilder sites={heritageSites} focus="navigation" />
    </AdminFrame>
  );
}
