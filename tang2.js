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
    //phan quyen
    let phanquyen=prompt("Bạn muốn đăng ký với quyền gì? (admin/user)").toLowerCase();
    if (phanquyen!="admin"&& phanquyen!="user"){
        phanquyen="user";
    }
    users[username] = {
        password: password,
        quyen: phanquyen,
        drive: { type: "folder", children: {}},
        history: []
    }
    alert("Tài khoản được cấp quyền: "+phanquyen);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Đăng ký thành công!");
    window.location.href = "trang1.html";

}