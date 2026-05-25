import { AdminFrame } from "../../components/AdminFrame";

const posts = [
  { title: "Giới thiệu dự án số hóa di tích phường Định Công", category: "Giới thiệu dự án", status: "Đang hiển thị" },
  { title: "Lịch sử hình thành Chùa Liên Hoa", category: "Di tích", status: "Đang hiển thị" },
  { title: "Hướng dẫn tham quan VR360", category: "Hướng dẫn", status: "Bản nháp" },
];

export default function AdminPostsPage() {
  return (
    <AdminFrame eyebrow="Quản lý bài viết" title="Soạn thảo nội dung giới thiệu và hướng dẫn">
      <section className="admin-two-column">
        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <p className="eyebrow">Bài viết</p>
              <h2>Nội dung đang quản lý</h2>
            </div>
            <button type="button">Tạo bài viết</button>
          </div>
          <div className="admin-table compact-table">
            <div className="admin-row admin-row-head">
              <span>Tiêu đề</span>
              <span>Chuyên mục</span>
              <span>Trạng thái</span>
              <span>Người sửa</span>
              <span>Cập nhật</span>
              <span>Hành động</span>
            </div>
            {posts.map((post) => (
              <div className="admin-row" key={post.title}>
                <strong>{post.title}</strong>
                <span>{post.category}</span>
                <span>{post.status}</span>
                <span>Biên tập viên</span>
                <span>25/05/2026</span>
                <span className="admin-actions">
                  <button type="button">Sửa</button>
                  <button type="button">Xuất bản</button>
                </span>
              </div>
            ))}
          </div>
        </div>

        <form className="admin-form-panel editor-form">
          <p className="eyebrow">Trình soạn thảo</p>
          <h2>Bài giới thiệu</h2>
          <label>
            <span>Tiêu đề</span>
            <input defaultValue="Giới thiệu Chùa Liên Hoa" />
          </label>
          <label>
            <span>Chuyên mục</span>
            <select defaultValue="Di tích">
              <option>Giới thiệu dự án</option>
              <option>Di tích</option>
              <option>Hướng dẫn</option>
              <option>Tin tức</option>
            </select>
          </label>
          <label>
            <span>Nội dung</span>
            <textarea defaultValue="Nhập nội dung giới thiệu, lịch sử hình thành, giá trị văn hóa và tư liệu liên quan..." />
          </label>
          <div className="admin-actions">
            <button type="button">Lưu nháp</button>
            <button className="primary-button compact" type="button">Xuất bản</button>
          </div>
        </form>
      </section>
    </AdminFrame>
  );
}
