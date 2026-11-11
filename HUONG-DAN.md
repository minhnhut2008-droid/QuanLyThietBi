# Quản Lý Thiết Bị (PWA) - Lưu và đồng bộ trên Google Drive

## Cách hoạt động
- Dữ liệu lưu trong **2 tệp JSON trên Google Drive** của admin: `QLTB-danh-muc.json` (thiết bị, cán bộ) và `QLTB-giao-nhan.json` (giao nhận, người giữ, đề xuất).
- Mỗi người đăng nhập bằng **tài khoản Google (Gmail)**. Quyền do chính Google Drive kiểm soát:
  - **Admin**: sửa được cả 2 tệp.
  - **Người dùng**: chỉ xem tệp danh mục, sửa được tệp giao nhận (nên không tự thêm/sửa/xóa danh mục được).
- Đồng bộ bằng cách hỏi Drive định kỳ (khoảng **8-10 giây**), không phải tức thì. Mất mạng vẫn dùng được, thay đổi xếp hàng và tự gửi lên khi có mạng.

## 1. Tạo ứng dụng đăng nhập Google (làm một lần, miễn phí)
1. Vào https://console.cloud.google.com → tạo **dự án mới**.
2. **APIs & Services → Library** → tìm **Google Drive API** → **Enable**.
3. **OAuth consent screen** (hoặc Google Auth Platform):
   - Loại người dùng: **External**; điền tên app, email hỗ trợ.
   - Trạng thái xuất bản: để **Testing**.
   - **Test users**: thêm Gmail của **admin và từng cán bộ** (tối đa 100 người). Người không có trong danh sách sẽ không đăng nhập được.
4. **Credentials → Create credentials → OAuth client ID** → loại **Web application**.
   - **Authorized JavaScript origins**: thêm `https://TEN-TAI-KHOAN.github.io` (chỉ tên miền, không có đường dẫn). Muốn thử trên máy thì thêm `http://localhost:8000`.
   - Create → sao chép **Client ID**.
5. Mở `drive-config.js`, dán Client ID vào `clientId`. Tải toàn bộ file lên GitHub.

## 2. Tạo kho dữ liệu (admin làm một lần)
1. Mở app, bấm **Đăng nhập bằng Google** bằng tài khoản admin. Màn hình Google có thể báo "Google hasn't verified this app": bấm **Advanced → Go to ... (unsafe)** rồi đồng ý cấp quyền Drive.
2. App hiện nút **Tạo kho dữ liệu trên Drive** → bấm. App hiện 2 dòng `catalogId` và `activityId`.
3. Dán 2 dòng đó vào `drive-config.js`, tải lại lên GitHub, mở lại app.

## 2b. Mã hóa dữ liệu (tự động)
- Mọi dữ liệu được **mã hóa ngay trên thiết bị** bằng AES-256-GCM trước khi lưu vào bộ nhớ máy hoặc tải lên Google Drive. Trên Drive chỉ có chuỗi mã hóa, Google và người không có mật khẩu không đọc được nội dung. Giải mã chỉ thực hiện trên thiết bị của người đã nhập mật khẩu.
- **Lần đầu (admin):** sau khi đăng nhập, app yêu cầu **tạo mật khẩu mã hóa** (từ 8 ký tự, nhập 2 lần). Hãy dùng mật khẩu dài, khó đoán.
- **Cán bộ:** admin gửi mật khẩu mã hóa qua kênh an toàn (nói trực tiếp, không gửi chung với tài khoản). Cán bộ nhập khi mở app lần đầu; có thể tick **Ghi nhớ trên thiết bị này** để không phải nhập lại (khóa được giữ ở dạng không thể xuất ra trên máy).
- **Mất mật khẩu = mất dữ liệu**, không ai khôi phục được (kể cả tôi, Google hay admin). Hãy cất mật khẩu ở nơi an toàn.
- **Thu hồi người rời đơn vị:** thu hồi quyền Gmail ở tab Tài khoản **và** bấm **Đổi mật khẩu mã hóa** (admin). Dữ liệu được mã hóa lại bằng mật khẩu mới, các máy còn lại sẽ phải nhập mật khẩu mới.
- Nằm ngoài phạm vi mã hóa: tên 2 tệp trên Drive, thời điểm sửa, danh sách Gmail được cấp quyền, và tên/email người đăng nhập lưu trên máy.

## 3. Cấp quyền cho cán bộ
Admin vào **Danh mục → Tài khoản**, nhập Gmail, chọn Người dùng hoặc Admin, bấm **Cấp quyền**. Có thể **Thu hồi** bất cứ lúc nào.
Cán bộ đăng nhập bằng đúng Gmail đó. Nếu chưa được cấp, app báo "chưa được cấp quyền".

## 4. Cài trên điện thoại
Android: Chrome → ⋮ → Cài đặt ứng dụng. iPhone: Safari → Chia sẻ → Thêm vào Màn hình chính.

## 4b. Xóa / làm mới nhật ký (chỉ admin)
Ở tab **Giao nhận**: nút **Xóa** trên từng phiếu, và nút **Làm mới nhật ký** để xóa toàn bộ phiếu (có hỏi xác nhận, có tùy chọn đưa tất cả thiết bị về Kho). Không thể hoàn tác. Nút này chỉ hiện với admin; về kỹ thuật, tệp giao nhận trên Drive cho mọi tài khoản ghi, nên cần cấp quyền admin cho người đáng tin cậy.

## 5. Xác nhận bằng mã QR
Mỗi phiếu có mã QR. Người nhận quét bằng camera, đăng nhập Google, bấm "Tôi xác nhận đã nhận". Tên và email Google của người quét được lưu và in trên biên bản PDF.

## Lưu ý quan trọng
- **Quyền truy cập rộng:** để đọc tệp do admin chia sẻ, app xin quyền truy cập **toàn bộ Google Drive** của người đăng nhập. Nên dùng Gmail riêng cho công việc, không dùng Gmail có nhiều dữ liệu cá nhân. Gỡ quyền: https://myaccount.google.com/permissions
- **Cảnh báo "chưa xác minh":** do app ở chế độ Testing. Ở chế độ này Google có thể bắt đăng nhập lại khoảng mỗi 7 ngày.
- **Phiên đăng nhập 1 giờ:** hết phiên, dòng trạng thái trên đầu app báo "Phiên Google hết hạn", chạm vào để đăng nhập lại. Trong lúc đó mọi thay đổi vẫn được lưu và gửi sau.
- **Không tức thì và không khóa giao dịch:** nếu hai người sửa cùng lúc, app tự gửi lại để cả hai thay đổi đều được ghi, nhưng nếu sửa chính một mục thì bản gửi sau thắng.
- Đừng đổi tên, xóa hay di chuyển 2 tệp JSON trong Drive của admin.
- Khi sửa mã, đổi `qltb-v6` trong sw.js thành bản mới để điện thoại cập nhật.
