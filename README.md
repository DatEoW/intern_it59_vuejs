
# Dự án Vuejs kết hợp Api Laravel

## Giới thiệu: Dự án quản lý user với các chức năng login, Crud user được xử lý bằng Api

### Các chức năng chính

- ***Login***

Khi đăng nhập thành công sẽ trả về 1 token được tạo từ jwt, sau đó sẽ trả token về client theo cookies

- ***Xác minh người dùng cho mỗi request***

Mỗi request đều kèm token để xác minh
Client gửi cookies về cho server, ở đây server sẽ xử lý cookies để lấy token người dùng và luôn luôn gắn vào headers

- ***Tương tác với database***
  1. Tạo mới người dùng
  2. Xem danh sách người dùng
  3. Cập nhật người dùng
  4. Xóa người dùng
  5. Khóa người dùng
  6. Mở khóa người dùng
  7. Tìm kiếm người dùng

### Các package được sử dụng

- Pinia: Quản lý state
- Axios: Xử lý Api
- Bootstrap: Hỗ trợ UI
- Vite: Hỗ trợ cho Vuejs
- Vee-validate/ yup: Hỗ trợ validate input
- Sweet alert: Hỗ trợ tạo popup thông báo

## Cách deloy lên host

1. Set up cấu hình axios với "base url"
