function dangNhap(){
    const username = document.getElementsByName("ten")[0].value;
    const password = document.getElementsByName("matKhau")[0].value;
    let users = JSON.parse(localStorage.getItem("users")) || {};
    if (!users[username]){
        var input = document.getElementsByName("ten")[0];
        input.value="";
        input.placeholder = "Tên không tồn tại!";
        return input;
    }
    if (users[username].password !== password){
        var input = document.getElementsByName("matKhau")[0];
        input.value="";
        input.placeholder = "Sai mật khẩu!";
        return input;
    }
    localStorage.setItem("DaDangNhap", username);
    window.location.href = "trang3.html";
}