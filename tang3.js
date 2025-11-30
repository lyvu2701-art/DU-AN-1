let DaDangNhap = localStorage.getItem("DaDangNhap");
let users = JSON.parse(localStorage.getItem("users"));
let root = users[DaDangNhap].drive;
document.getElementById("TaoFile").onclick = function(){
    document.querySelector(".taofile").style.display = "flex";
}
function taoFolder(){
    let name = document.getElementById("tenFolderMoi").value.trim();
    if(!name){
        alert("Hãy tạo folder!")
    }
    root.children[name] = {
        type: "folder",
        children: {}
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
    for(let name in Folder.children){
        let item = document.createElement("div");
        item.textContent = name + (Folder.children[name].type ==="folder"?"/":"");
        item.style.cursor = "pointer";
        // click để đổi tên
        item.ondblclick = () => suaFolder(Folder, name);
        item.onclick = (e) => {
            e.stopPropagation(); // quan trọng
            HienThiFolder(Folder.children[name], contain);
}
        // click để mở file
        if (Folder.children[name].type === "folder"){
            item.onclick = () => {
                HienThiFolder(Folder.children[name], contain);
            }
        }
        //click chuột phải để xóa
        item.oncontextmenu = (e) => {
            e.preventDefault();
            Xoa(Folder, name);
        }
        contain.appendChild(item);
    }
}
function goStats(){
    window.location.href = "LichSu.html";
}
HienThiFolder(root, document.getElementById("fileTree"));