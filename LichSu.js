let tenfolder = localStorage.getItem("tenfolder");
let DaDangNhap = localStorage.getItem("DaDangNhap");
let users = JSON.parse(localStorage.getItem("users"));
let user = users[DaDangNhap];
if(!DaDangNhap || !user){
    alert("Vui lòng đăng nhập để xem lịch sử hoạt động");
    window.location.href = "trang1.html";
}
else{
    var root1 = users[DaDangNhap].drive;
}
function hienThi(){
    let demfolder = 0;
    let demfile = 0;

    // Duyệt tất cả folder trong root1
    for (let folderName in root1.children) {
        let folder = root1.children[folderName];

        if (folder.type === "folder") {
            demfolder += 1;

            // Đếm file trong folder
            for (let fileName in folder.children) {
                let file = folder.children[fileName];
                if (file.type === "file") {
                    demfile += 1;
                }
            }
        }
    }
    document.getElementById("Sofolder").textContent += `${demfolder}`;
    document.getElementById("Sofile").textContent += `${demfile}`;  
}
function HienThiLichSu(history, contain){
    contain.innerHTML ="";
    for (let i = history.length - 1; i >=0; i--){
        let item = document.createElement("div");
        item.style.border = "1px solid";
        item.style.margin = "5px";
        item.textContent = history[i];
        contain.append(item);
    }
}
HienThiLichSu(user.history, document.getElementById("lichsu"));
hienThi();
function dangxuat(){
    document.querySelector(".xuattrang").style.display="block";
}
function bienmatdx(){
    document.querySelector(".xuattrang").style.display="none";
}
function xuattrang(){
    window.location.href="trang1.html";
}
function trangchu(){
    window.location.href="trang3.html";
}