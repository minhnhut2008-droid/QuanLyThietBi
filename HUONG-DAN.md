# Quản Lý Thiết Bị (PWA) - Liên kết trực tiếp tới 3 tệp trên Google Drive

## Cách hoạt động
- App chỉ làm việc với **3 tệp trên Google Drive**, được liên kết bằng đường link trong `drive-config.js`:
  1. `QLTB-thiet-bi.json` - danh mục thiết bị
  2. `QLTB-can-bo.json` - danh sách cán bộ
  3. `QLTB-giao-nhan.json` - nhật ký giao nhận (phiếu, người đang giữ, đề xuất chờ duyệt)
- **Quyền = quyền chia sẻ trên Drive.** Không có màn hình quản lý tài khoản trong app; admin chia sẻ tệp bằng Gmail ngay trên Google Drive.
- Mặc định app chỉ xin quyền truy cập **đúng 3 tệp được chọn** (không đọc phần còn lại của Drive).
- Dữ liệu được **mã hóa AES-256 trên thiết bị** trước khi lưu vào máy và tải lên Drive. Đồng bộ khoảng 8-10 giây một lần; mất mạng vẫn dùng được và tự gửi lên khi có mạng.

## Cập nhật app mà không mất liên kết Drive (quan trọng)
`drive-config.js` là tệp **của bạn** (chứa Client ID và 3 liên kết Drive). Gói cập nhật chỉ có `drive-config.mau.js` nên **không ghi đè** tệp của bạn. Khi tải bản mới lên GitHub, chỉ chép đè các tệp khác, **đừng xóa hay thay `drive-config.js`**. Nếu lỡ bị ghi đè bằng tệp mẫu, các máy từng mở app trước đó vẫn tự dùng cấu hình đã lưu trên máy; nên điền lại tệp cho các máy khác.

## Khi app báo "Chưa kết nối Drive - chỉ lưu trên máy này"
Chạm vào dòng cảnh báo ở đầu app để xem lý do. Cách xử lý:
1. Mở `drive-config.js` trên GitHub, kiểm tra `clientId` đã điền (không còn chữ `DAN_VAO_DAY`).
2. Điền lại `deviceFile`, `staffFile`, `logFile` (tìm tệp `QLTB` trên Drive → chuột phải → Chia sẻ → Sao chép đường liên kết). Không bấm "Tạo 3 tệp" lần nữa nếu 3 tệp cũ vẫn còn, vì sẽ tạo bản trống mới.
3. Lưu rồi tải lại app (kéo xuống làm mới, hoặc đóng hẳn rồi mở lại để điện thoại nhận bản mới).

## 1. Cấu hình Google Cloud (admin, làm một lần)
1. Vào https://console.cloud.google.com → tạo **dự án mới**. Ghi lại **Project number** (số dự án) ở trang Dashboard.
2. **APIs & Services → Library**: bật **Google Drive API** và **Google Picker API**.
3. **OAuth consent screen**: loại **External**, điền tên app và email hỗ trợ, để trạng thái **Testing**, thêm **Test users** là Gmail của admin và từng cán bộ (tối đa 100).
4. **Credentials → Create credentials → OAuth client ID** → **Web application** → *Authorized JavaScript origins*: `https://TEN-TAI-KHOAN.github.io` (thử trên máy thì thêm `http://localhost:8000`). Sao chép **Client ID**.
5. **Credentials → Create credentials → API key** → vào khóa vừa tạo: *Application restrictions* chọn **Websites** và thêm `https://TEN-TAI-KHOAN.github.io/*`; *API restrictions* chọn **Google Picker API**. Sao chép khóa.
6. **Đổi tên** tệp `drive-config.mau.js` thành `drive-config.js`, mở ra và điền `clientId`, `apiKey`, `appId` (= Project number).

## 2. Tạo và liên kết 3 tệp (admin)
1. Tải app lên GitHub Pages, mở app, đăng nhập Google bằng tài khoản admin. App hiện nút **Tạo 3 tệp trên Drive** → bấm.
2. App hiển thị 3 dòng `deviceFile`, `staffFile`, `logFile` (là liên kết Drive). Dán vào `drive-config.js`, tải lại lên GitHub, mở lại app.
3. Đặt **mật khẩu mã hóa** (từ 8 ký tự, nhập 2 lần). Mất mật khẩu thì không khôi phục được dữ liệu.

**Không thấy tệp .json trên Drive?** Tệp chỉ xuất hiện sau khi admin bấm **Tạo 3 tệp trên Drive** (ở mục "Drive của tôi" của tài khoản admin, tìm chữ `QLTB`). Nếu `drive-config.js` chưa điền `clientId` thì app chạy chế độ "Chỉ lưu trên máy này" và không có tệp nào trên Drive.
**Cách làm thủ công:** trong gói có thư mục `mau-tep-drive/` chứa 3 tệp mẫu (nội dung `{}`). Vào Drive → **Mới → Tải tệp lên**, chọn 3 tệp, bấm chuột phải từng tệp → **Chia sẻ → Sao chép đường liên kết**, dán vào `deviceFile`, `staffFile`, `logFile`. Admin sẽ được yêu cầu chọn 3 tệp bằng bộ chọn tệp ở lần đăng nhập đầu.

## 3. Cấp quyền trên Google Drive
Trên Drive, bấm chuột phải từng tệp → **Chia sẻ (Share)** → nhập Gmail → chọn quyền. Để "Quyền truy cập chung" là **Bị hạn chế (Restricted)**.

| Tệp | Admin | Người dùng thường |
|---|---|---|
| QLTB-thiet-bi.json | **Người chỉnh sửa (Editor)** | **Người xem (Viewer)** |
| QLTB-can-bo.json | **Người chỉnh sửa** | **Người xem** |
| QLTB-giao-nhan.json | **Người chỉnh sửa** | **Người chỉnh sửa** |

- App tự nhận vai trò: ai chỉnh sửa được tệp thiết bị là admin; người chỉ xem là người dùng thường (thêm danh mục phải **đề xuất**, admin duyệt).
- Người dùng bắt buộc có quyền **chỉnh sửa** tệp giao nhận, nếu không sẽ không tạo được phiếu.
- Admin cũng phải được thêm vào **Test users** (bước 1.3).

## 4. Người dùng thường bắt đầu như thế nào
1. Admin gửi **đường link app** (và nhắc đã chia sẻ 3 tệp cho Gmail của họ). Gửi **mật khẩu mã hóa** qua kênh riêng.
2. Mở link trên điện thoại → **Đăng nhập bằng Google** (nếu có cảnh báo "chưa xác minh": Advanced → Go to ... ).
3. App hiện **Chọn 3 tệp dữ liệu**: bấm, chọn cả 3 tệp trong danh sách (nếu không thấy, vào mục *Được chia sẻ với tôi*), bấm **Select**. Việc này chỉ làm một lần trên mỗi tài khoản.
4. Nhập mật khẩu mã hóa (tick *Ghi nhớ trên thiết bị này* để khỏi nhập lại).
5. Cài lên màn hình chính: Android dùng Chrome → ⋮ → Cài đặt ứng dụng; iPhone dùng Safari → Chia sẻ → Thêm vào Màn hình chính.

## 5. Quản lý
- **Thêm người dùng:** chia sẻ 3 tệp cho Gmail của họ (và thêm vào Test users). **Thu hồi:** bỏ chia sẻ trên Drive **và** bấm **Đổi mật khẩu mã hóa** (admin, ở tab Danh mục), rồi báo mật khẩu mới cho những người còn lại.
- **Xóa phiếu / làm mới nhật ký (admin):** ở tab Giao nhận. Nút chỉ ẩn với người dùng thường; tệp giao nhận cho họ quyền chỉnh sửa nên về kỹ thuật vẫn có thể bị xóa phiếu. Chỉ cấp cho người đáng tin cậy.
- **QR xác nhận:** người nhận quét mã, đăng nhập, bấm "Tôi xác nhận đã nhận"; tên và email Google của người quét được lưu và in trên biên bản PDF.

## 6. Nếu Bộ chọn tệp (Picker) không hoạt động
Đặt `picker:false` trong `drive-config.js`. App sẽ xin quyền truy cập **toàn bộ Google Drive** của người đăng nhập (rộng hơn), nhưng không cần `apiKey`, `appId` và không cần bước chọn tệp.

## Xuất PDF
App vẽ biên bản trên màn hình tạm thời (hiện chữ "Đang tạo PDF…" vài giây) rồi lưu thành tệp PDF. Nếu vì lý do nào đó không vẽ được, app tự mở hộp thoại **In** để bạn chọn "Lưu dưới dạng PDF". Lần mở đầu cần có mạng để tải thư viện PDF.

## Lưu ý
- Bản này dùng **3 tệp mới**. Dữ liệu của bản 2 tệp trước đó không tự chuyển sang, cần nhập lại.
- Mất mật khẩu mã hóa = mất dữ liệu, không ai khôi phục được.
- Chế độ Testing: Google có thể bắt đăng nhập lại khoảng mỗi 7 ngày; phiên truy cập Google chỉ sống 1 giờ (quy định của Google). App **tự gia hạn** im lặng trước khi hết hạn; nếu trình duyệt chặn thì **chạm vào bất kỳ đâu** trên app hoặc vào dòng cảnh báo ở đầu app để gia hạn (có thể thấy cửa sổ Google lóe lên). Thay đổi không bị mất, được giữ lại và gửi sau.
- Không đổi tên, xóa hay di chuyển 3 tệp trong Drive của admin.
- Khi sửa mã, đổi `qltb-v10` trong sw.js thành bản mới để điện thoại cập nhật.
