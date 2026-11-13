// Điền theo hướng dẫn trong HUONG-DAN.md
window.DRIVE_CONFIG={
  clientId:"559186418840-u8ki7irf31vbc74jdn0b1h2hpa5ge7g9.apps.googleusercontent.com",
  apiKey:"AIzaSyB7qzigfnzSvQfeAeyesv547vjH3ekPoL8",     // khóa API (dùng cho bộ chọn tệp Google Picker)
  appId:"559186418840",      // số dự án Google Cloud (Project number)
  picker:true,              // true: chỉ truy cập 3 tệp được liên kết (khuyến nghị). false: xin quyền toàn bộ Drive, không cần apiKey/appId
  deviceFile:"",            // liên kết tệp danh mục thiết bị trên Drive
  staffFile:"",             // liên kết tệp danh sách cán bộ
  logFile:""                // liên kết tệp nhật ký giao nhận
};
