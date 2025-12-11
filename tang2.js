function dangKy(){
    const username = document.getElementsByName("ten")[0].value.trim();
    const password = document.getElementsByName("matKhau")[0].value;
    if (!username || !password){
        return alert("Hãy điền đầy đủ thông tin!");
    }
    let users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username]){
        var input = document.getElementsByName("ten")[0];
        input.value="";
        input.placeholder = "Tên đã tồn tại!";
        return input.placeholder;
    }
    users[username] = {
        password: password,
        drive: { type: "folder", children: {}},
        history: []
    }
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("DaDangNhap", username);
    alert("Đăng ký thành công!");
    window.location.href = "trang1.html";

}