function dangNhap(){
    const username = document.getElementsByName("tenDN")[0].value;
    const password = document.getElementsByName("matKhauDN")[0].value;
    let users = JSON.parse(localStorage.getItem("users")) || {};
    if (!users[username]){
        var input = document.getElementsByName("tenDN")[0];
        input.value="";
        input.placeholder = "Tên không tồn tại!";
        return ;
    }
    if (users[username].password !== password){
        var input = document.getElementsByName("matKhauDN")[0];
        input.value="";
        input.placeholder = "Sai mật khẩu!";
        return ;
    }
    localStorage.setItem("DaDangNhap", username);
    window.location.href = "trang3.html";
}
function hiendangky(){
    document.querySelector(".dangnhap").style.display="none";
    document.querySelector(".dangky").style.display="block";
}
function dangKy(){
    const username = document.getElementsByName("tenDK")[0].value.trim();
    const password = document.getElementsByName("matKhauDK")[0].value;
    if (!username || !password){
        return alert("Hãy điền đầy đủ thông tin!");
    }
    let users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username]){
        var input = document.getElementsByName("tenDK")[0];
        input.value="";
        input.placeholder = "Tên đã tồn tại!";
        return;
    }
    users[username] = {
        password: password,
        drive: { type: "folder", children: {}},
        history: []
    }
    localStorage.setItem("users", JSON.stringify(users));
    alert("Đăng ký thành công!");
    document.querySelector(".dangky").style.display="none";
    document.querySelector(".dangnhap").style.display="block";
}
function hiendangnhap(){
    document.querySelector(".dangky").style.display="none";
    document.querySelector(".dangnhap").style.display="block";
}