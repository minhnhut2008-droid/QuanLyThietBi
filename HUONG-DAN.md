# Quản Lý Thiết Bị (PWA) - Hướng dẫn triển khai

Gồm: index.html, firebase-config.js, firestore.rules, sw.js, manifest.webmanifest, icon-192.png, icon-512.png, icon.svg.

## 1. Tạo máy chủ dữ liệu (Firebase, gói miễn phí Spark đủ dùng cho đơn vị nhỏ)
1. Vào https://console.firebase.google.com → Add project → đặt tên.
2. Build → Authentication → Get started → bật nhà cung cấp **Email/Password**.
3. Build → Firestore Database → Create database → chọn **production mode**, vùng asia-southeast1 (Singapore).
4. Tab **Rules** của Firestore → xóa nội dung cũ, dán toàn bộ nội dung file `firestore.rules` → Publish.
5. Project settings (biểu tượng bánh răng) → Your apps → biểu tượng **</>** (Web) → đăng ký app → sao chép đối tượng `firebaseConfig`.
6. Mở `firebase-config.js`, thay các giá trị DAN_VAO_DAY / TEN-DU-AN bằng cấu hình vừa sao chép.

## 2. Đưa lên web (bắt buộc HTTPS để cài được như app)
Chọn một cách:
- **Netlify Drop**: vào https://app.netlify.com/drop, kéo cả thư mục này vào → nhận địa chỉ https.
- **Firebase Hosting**: cài Node.js, chạy `npm i -g firebase-tools`, `firebase login`, `firebase init hosting` (thư mục public = thư mục này, không ghi đè index.html), `firebase deploy`.
- **GitHub Pages / máy chủ nội bộ có HTTPS**: đưa các file lên thư mục gốc của site.

Sau đó vào Firebase → Authentication → Settings → **Authorized domains** → thêm tên miền site của bạn.
Chạy thử trên máy: `python -m http.server 8000` rồi mở http://localhost:8000 (localhost được phép).

## 3. Tạo tài khoản admin đầu tiên
1. Mở app, bấm "Đăng ký tài khoản mới" (họ tên, email, mật khẩu). Tài khoản mới ở trạng thái "chờ duyệt".
2. Firebase console → Firestore Database → collection **users** → mở tài liệu của bạn → sửa trường `role` từ `pending` thành `admin`.
3. Tải lại app: bạn là admin.

## 4. Quản lý tài khoản
- Người khác tự đăng ký → admin vào **Danh mục → Tài khoản** → chọn quyền: Người dùng, Admin, Khóa.
- Admin: thêm/sửa/xóa thiết bị và cán bộ, duyệt đề xuất, quản lý tài khoản.
- Người dùng: giao nhận, trả lại, xuất PDF, đề xuất thêm danh mục (chờ admin duyệt).
- Quên mật khẩu: admin đặt lại trong Firebase → Authentication → Users.

## 5. Cài trên điện thoại
- **Android (Chrome)**: mở địa chỉ app → menu ⋮ → "Cài đặt ứng dụng" (hoặc "Thêm vào màn hình chính").
- **iPhone (bắt buộc dùng Safari)**: mở địa chỉ app → nút Chia sẻ → "Thêm vào Màn hình chính".
- Mở lần đầu cần có mạng. Sau đó app chạy offline; thay đổi tự gửi lên khi có mạng lại.

## 6. Lưu ý
- Offline: dữ liệu và thay đổi lưu trên máy; đăng xuất khi còn thay đổi chưa gửi sẽ bị mất (app có cảnh báo).
- Khi sửa mã nguồn, đổi `V='qltb-v1'` trong sw.js (ví dụ qltb-v2) để điện thoại nhận bản mới.
- Dữ liệu nội bộ nhạy cảm: nên sao lưu định kỳ (Firestore export) và cân nhắc quy định bảo mật của đơn vị.
- Mật khẩu do Firebase quản lý, app không lưu mật khẩu.
