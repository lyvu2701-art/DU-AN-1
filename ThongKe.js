let DaDangNhap = localStorage.getItem("DaDangNhap");
let users = JSON.parse(localStorage.getItem("users"));
let user = users[DaDangNhap];
let root1 = users[DaDangNhap].drive;
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
    window.location.href="index.html";
}
function trangchu(){
    window.location.href="trangchu.html";
}
function taofolder(){
    window.location.href="trangchu.html";
}
//hien thi loi chao
let chao=document.getElementById("chaoUser");
if(DaDangNhap){
    chao.textContent="Xin Chào, "+DaDangNhap+"!";
}else{
    chao.textContent="";
}