// TỆP MẪU: đổi tên thành drive-config.js rồi điền (xem HUONG-DAN.md). Khi cập nhật app, KHÔNG tải đè drive-config.js của bạn.
window.DRIVE_CONFIG={
  clientId:"DAN_VAO_DAY.apps.googleusercontent.com",
  apiKey:"DAN_VAO_DAY",     // khóa API (dùng cho bộ chọn tệp Google Picker)
  appId:"DAN_VAO_DAY",      // số dự án Google Cloud (Project number)
  picker:true,              // true: chỉ truy cập 3 tệp được liên kết (khuyến nghị). false: xin quyền toàn bộ Drive, không cần apiKey/appId
  deviceFile:"",            // liên kết tệp danh mục thiết bị trên Drive
  staffFile:"",             // liên kết tệp danh sách cán bộ
  logFile:""                // liên kết tệp nhật ký giao nhận
};
