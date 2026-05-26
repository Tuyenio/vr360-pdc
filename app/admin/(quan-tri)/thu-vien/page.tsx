import Image from "next/image";
import { AdminFrame } from "../../components/AdminFrame";
import { mediaFiles } from "../../../lib/data";

export default function AdminMediaPage() {
  return (
    <AdminFrame eyebrow="Thư viện tư liệu" title="Quản lý ảnh, video, audio và tài liệu">
      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <p className="eyebrow">Kho tư liệu</p>
            <h2>Tệp đã tải lên</h2>
          </div>
          <button type="button">Tải tệp lên</button>
        </div>
        <div className="media-admin-grid">
          {mediaFiles.map((file) => (
            <article className="media-admin-card" key={file.id}>
              <div className="media-preview">
                {file.fileType === "image" ? (
                  <Image src={file.fileUrl} alt={file.title} fill sizes="260px" />
                ) : (
                  <span>{file.fileType.toUpperCase()}</span>
                )}
              </div>
              <strong>{file.title}</strong>
              <p>{file.description}</p>
              <small>{file.heritageSite} · {file.fileName}</small>
            </article>
          ))}
        </div>
      </section>

      <form className="admin-form-panel wide-form">
        <p className="eyebrow">Phân loại tư liệu</p>
        <h2>Thông tin tệp</h2>
        <div className="form-grid">
          <label>
            <span>Tiêu đề</span>
            <input defaultValue="Ảnh lễ hội truyền thống" />
          </label>
          <label>
            <span>Loại tệp</span>
            <select defaultValue="image">
              <option>image</option>
              <option>video</option>
              <option>audio</option>
              <option>pdf</option>
            </select>
          </label>
          <label>
            <span>Thuộc di tích</span>
            <input defaultValue="Chùa Định Công" />
          </label>
          <label>
            <span>Đường dẫn tệp</span>
            <input defaultValue="/uploads/tu-lieu.jpg" />
          </label>
        </div>
        <button className="primary-button" type="button">Lưu tư liệu</button>
      </form>
    </AdminFrame>
  );
}
