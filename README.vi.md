# Viblo Atom Plugin package

![plugin-screen-shot](./images/ss1.png)

Viblo Plugin cho Atom editor. Bạn có thể đọc tài liệu tiếng anh [tại đây](./README.md).

## Yêu cầu
- [Atom](https://atom.io/) version 1.x

## Cài đặt Viblo Atom plugin
- Bật `Atom` lên.
- Tiếp theo, mở `Packages` > `Settings View` > `Open` trên thanh menu hoặc nhân tổ hợp phím <kbd>Ctrl + Shift + P</kbd> (Linux/Windows) hoặc <kbd>Cmd + Shift + P</kbd> (macOS),
Trong cửa sổ search hiện ra, gõ từ khóa **Install packages** và click chuột vào **Settings View:Install Packages and Themes**.
- Bạn sẽ thấy một thanh tìm kiếm bên trong, hãy gõ `viblo`. Cài đặt Viblo Plugin từ danh sách kết quả tìm kiếm trả về. :smile:

## Tính năng
- Hiển thị danh sách bài viết, bài nháp (draft) từ Viblo.
- Tạo một bài viết mới và lưu nó ở trạng thái draft hoặc publish nó.
- Sửa một bài viết đã có của bạn trên Viblo.
- Quản lý hình ảnh trên Viblo của bạn.
- Xem trước (preview) nội dung trong bài viết hoặc của file markdown (*.md) dưới style của Viblo. 

## Hướng dẫn sử dụng
### Đăng nhập
- Tới trang [Settings](https://viblo.asia/settings/oauth) trên Viblo để tạo mới một API token (mã đăng nhập) và copy nó.
- Nhấn tổ hợp phím <kbd>Ctrl + Shift + P</kbd> (Linux/Windows) hoặc <kbd>Cmd + Shift + P</kbd> (macOS), nhập `viblo`, rồi chọn `Viblo: Settings`.
Để mở cửa sổ `Setting` của Viblo plugin trên atom. Dán API token vừa copy ở trên vào thanh nhập liệu.
- Khởi động lại Atom và sử dụng.

### Tạo bài viết mới
- Nhấn tổ hợp phím <kbd>Ctrl + Shift + P</kbd> hoặc <kbd>Cmd + Shift + P</kbd> (macOS), gõ `viblo` rồi chọn `Viblo: Create Post`.
Viblo editor sẽ được hiển thị và bạn hãy nhập nội dung cho bài viết tại đây.
- Click chuột phải trong Viblo editor, rồi chọn `Viblo Toggle Preview` để xem trước nội dung bài viết của bạn sẽ được hiển thị trên Viblo ra sao.
- Click chuột phải trong Viblo editor, rồi chọn `Save to Viblo` để mở Publish Form - nơi bạn có thể nhập tiêu đề bài viết, đánh tags, chọn danh mục và ngôn ngữ cho bài viết.
Sau đó, click nút `Publish post` hoặc nút `Save as Draft` trong Publish Form để lưu bài viết tới Viblo.
- Một cách khác để tạo bài viết cho Viblo, bạn có thể mở một file `markdown` (`*.md` có đuôi mở rộng) hoặc tạo một file markdown *.md trên máy tính của bạn.
Sau đó cũng thực hiện click chuột phải bên trong editor để `Viblo Toggle Preview`, `Save to Viblo` như trong Viblo editor.

### Sửa một bài viết Viblo có sẵn
- Hãy đi tới `Viblo: Publish Posts` hoặc `Viblo: Draft Posts` để kiểm tra danh sách các bài viết/draft trên Viblo của bạn.
- Click vào tiêu đề bài viết mà bạn muốn sửa. Viblo editor sẽ được hiển thị ra để viết bài.
- Click chuột phải trong Viblo editor, rồi chọn `Viblo Toggle Preview` để xem trước nội dung bài viết của bạn sẽ được hiển thị trên Viblo ra sao.
- Click chuột phải trong Viblo editor, rồi chọn `Save to Viblo` để mở Publish Form - nơi bạn có thể nhập tiêu đề bài viết, đánh tags, chọn danh mục và ngôn ngữ cho bài viết.
Sau đó, click nút `Update and Publish post` hoặc nút `Save as Draft` trong Publish Form để lưu bài viết tới Viblo.

### Các phím tắt
Nếu bạn đang sử dụng trên nền macOS, hãy sử dụng phím <kbd>Cmd</kbd> thay thế cho phím <kbd>Ctrl</kbd>.
**Các phím tắt của atom** mà bạn nên biết trước khi sử dụng:
- <kbd>Ctrl + Shift + P</kbd>: Tìm kiếm và chạy các command trong atom.
- <kbd>Ctrl + S</kbd>: Lưu nội dung ra file hiện tại.
- <kbd>Ctrl + Shift + F5</kbd>: Khởi động lại Atom.

**Các phím tắt của Viblo Atom Plugin** được hổ trợ.
- <kbd>Ctrl + Alt + O</kbd> hoặc <kbd>Ctrl + Alt P</kbd>: Mở `Publish Posts`, xem danh sách các bài viết đã được publish của bạn.
- <kbd>Ctrl + Alt + D</kbd>: Mở trang `Draft Posts`, xem danh sách và bài nháp của bạn.
- <kbd>Ctrl + Alt + G</kbd>: Mở trang `Gallery`, quản lý hình ảnh trên viblo.
- <kbd>Ctrl + Alt + S</kbd>: Mở trang `Settings`, để cài đặt Viblo atom plugin, đăng nhập/đăng xuất.
- <kbd>Ctrl + Alt + A</kbd>: Mở trang `About` để xem các thông tin về Viblo Atom Plugin.
- <kbd>Ctrl + Alt + C</kbd>: Tạo bài viết mới.
- <kbd>Ctrl + Shift + S</kbd>: Bật/tắt Publish Form, nơi giúp bạn nhập thông tin cho bài viết và lưu vào Viblo.
- <kbd>Ctrl + Alt + V</kbd>: Bật/tắt chế độ xem trước để xem mẫu bài viết của bạn trước khi publish lên Viblo.
- <kbd>Ctrl + Alt + I</kbd>: Bật/tắt Image Helper từ viblo editor để upload image lên Viblo khi đang viết bài, chèn ảnh đã upload vào trong bài đang viết.

## Developing
1. Clone repository
```
cd ~/ & git clone git@github.com:viblo-asia/atom-plugin.git
```
Chuyển thư mục vừa clone trên vào `~/.atom/packages` hoặc tạo `symlink` bên trong folder này và đặt tên là `viblo`
```
ln -s ~/atom-plugin ~/.atom/packages/viblo
```

2. Nhập tổ hợp phím <kbd>Ctrl + Shift + F5</kbd>, hoặc <kbd>Ctrl + Shift + P</kbd> rồi gõ command `Window: reload` hoặc chỉ `reload`, nhấn <kbd>Enter</kbd>
để khởi động lại atom. Sau đó, `viblo` sẽ có trong danh sách package đã được cài đặt của bạn.
3. Kiểm tra package đã được cài đặt, nhấn <kbd>Ctrl + Shift + P</kbd>, rồi nhập command
`Settings View: View Installed Packages` hoặc chỉ `Installed Packages` (command line sẽ có các gợi ý tuyệt vời bạn nhập)
và nhấn <kbd>Enter</kbd>.

> **Note:** Để kiểm tra code, bạn cần sẽ phải reload atom mỗi lần.

### Helpful links
- [Documentation of Atom](https://atom.io/docs)
- [Atom API](https://atom.io/docs/api/)
- [Specification of Versioning of package](http://semver.org/)

### Licence
[MIT](./LICENSE.md)
