import { AdminFrame } from "../../components/AdminFrame";
import { AdminSiteEditor } from "../../components/AdminSiteEditor";
import { heritageSites } from "../../../lib/data";

export default function AdminSitesPage() {
  return (
    <AdminFrame eyebrow="Quản lý di tích" title="Biên tập hồ sơ số hóa và trạng thái xuất bản">
      <AdminSiteEditor sites={heritageSites} />
    </AdminFrame>
  );
}
