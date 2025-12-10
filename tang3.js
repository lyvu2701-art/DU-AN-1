let DaDangNhap = localStorage.getItem("DaDangNhap");
let users = JSON.parse(localStorage.getItem("users"));
let root = users[DaDangNhap].drive;
document.getElementById("TaoFile").onclick = function(){
    document.querySelector(".taofile").style.display = "flex";
}
document.getElementById("tat").onclick = function(){
    document.querySelector(".taofile").style.display = "none";
}
function taoFolder(){
    let name = document.getElementById("tenFolderMoi").value.trim();
    if(!name){
        alert("Hãy tạo folder!")
    }
    root.children[name] = {
        type: "folder",
        children: {},
        demfile: 0
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
    HienThiFolder(root, document.getElementById("fileTree"));
}
function HienThiFolder(Folder, contain){
    contain.innerHTML = "";
    let dem = 0;
    for(let name in Folder.children){
        dem += 1;
        let item = document.createElement("div");
        item.id="khungfile";
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
        item.style.cursor = "pointer";
        // click để đổi tên
        
        /*item.onclick = (e) => {
            e.stopPropagation(); // quan trọng
            HienThiFolder(Folder.children[name], contain);
}*/

        // click để mở file
        if (Folder.children[name].type === "folder"){
            let tenfolder = name;
            b.onclick = () => {
                localStorage.setItem("tenfolder", name);
                window.location.href = "trang4.html";
            };/*{
                HienThiFolder(Folder.children[name], contain);
            }*/
        }
        //click chuột phải để xóa
        /*item.oncontextmenu = (e) => {
            e.preventDefault();
            Xoa(Folder, name);
        }*/
        
    }
    Folder.demfolder = dem;
}
HienThiFolder(root, document.getElementById("fileTree"));
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
//tạo file