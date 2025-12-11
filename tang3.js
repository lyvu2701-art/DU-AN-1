let DaDangNhap = localStorage.getItem("DaDangNhap");
let users = JSON.parse(localStorage.getItem("users"));
let root = users[DaDangNhap].drive;
document.getElementById("TaoFolder").onclick = function(){
    document.querySelector(".taofolder").style.display = "flex";
}
document.getElementById("tat").onclick = function(){
    document.querySelector(".taofolder").style.display = "none";
}
function taoFolder(){
    let name = document.getElementById("tenFolderMoi").value.trim();
    if(!name){
        alert("Hãy tạo folder!");
        return;
    }
    root.children[name] = {
        type: "folder",
        children: {},
    }
    users[DaDangNhap].history.push(`Tạo thư mục '${name}'`);
    CapNhat();
     document.getElementById("tenFolderMoi").value = "";
}
function suaFolder(folder, oldname){
    let Newname = prompt("Đổi tên folder:", oldname);
    if(!Newname || Newname === oldname) return;
    folder.children[Newname] = folder.children[oldname];
    delete folder.children[oldname];
    users[DaDangNhap].history.push(`Đổi tên '${oldname}' thành '${Newname}'`);
    CapNhat();

}
function Xoa(folder, name){
    if(!confirm(`Xóa'${name}'?`)) return;
    delete folder.children[name];
    users[DaDangNhap].history.push(`Xóa'${name}'`);
    CapNhat();
}
function CapNhat(){
    users[DaDangNhap].drive = root;
    localStorage.setItem("users", JSON.stringify(users));
    HienThiFolder(root, document.getElementById("folderTree"));
}
function HienThiFolder(Folder, contain){
    contain.innerHTML = "";
    for(let name in Folder.children){
        let item = document.createElement("div");
        item.id="khungfolder";
        let logofolder=document.createElement("img");
        logofolder.src="iconfolder.png";
        logofolder.id="logofolder2";
        item.append(logofolder);
        let b = document.createElement("div");
        b.id="tenfolder";
        b.textContent = name + (Folder.children[name].type ==="folder"?"/":"");
        item.appendChild(b);
        let c = document.createElement("button");
        c.id = "doiTen";
        c.type = "button";
        c.textContent = "Đổi tên";
        c.onclick = () => suaFolder(Folder, name);
        item.appendChild(c);
        let d = document.createElement("button");
        d.id = "xoa";
        d.type = "button";
        d.textContent = "Xoá";
        d.onclick = () => Xoa(Folder, name);
        item.appendChild(d);
        contain.appendChild(item);
        //tạo file
        let taofile=document.createElement("button");
        taofile.id="taofilemoi";
        taofile.textContent="Tạo file";
        item.append(taofile);
        // click để mở file
        if (Folder.children[name].type === "folder"){
            // let tenfolder = name;
            taofile.onclick = () => {
                localStorage.setItem("tenfolder", name);
                window.location.href = "trang4.html";
            }
            b.onclick = () => {
                localStorage.setItem("tenfolder", name);
                window.location.href = "trang4.html";
            }
            
        }
    }
} 
HienThiFolder(root, document.getElementById("folderTree"));
function goStats(){
    window.location.href = "LichSu.html";
}
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


//dếm file ,folder

let user = users[DaDangNhap];
if(!DaDangNhap || !user){
    alert("Vui lòng đăng nhập để xem lịch sử hoạt động!");
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
hienThi();
//hien thi loi chao
let chao=document.getElementById("chaoUser");
if(DaDangNhap){
    chao.textContent="Xin Chào, "+DaDangNhap+"!";
}