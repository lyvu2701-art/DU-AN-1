let tenfolder = localStorage.getItem("tenfolder");
let users = JSON.parse(localStorage.getItem("users"));
let DaDangNhap = localStorage.getItem("DaDangNhap");
if(!DaDangNhap || !user || !user("DaDangNhap")){
    alert("Vui lòng đăng nhập để xem lịch sử hoạt động");
    window.location.href = "trang1.html";
}
let user = users[DaDangNhap];
let root1 = users[DaDangNhap].drive;
function hienThi(){
    let demfile = 0;
    let demfolder = root1.demfolder;
    document.getElementById("Sofolder").textContent += `${demfolder}`;
    for(let name in root1.children){
        demfile += root1.children[name].demfile;
    }
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
HienThiLichSu(user.history, document.getElementsByClassName(""))