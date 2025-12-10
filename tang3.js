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
        // let tenfolder=document.createElement("p");
        // tenfolder.textContent="Tên Folder:";
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
function goStats(){
    window.location.href = "LichSu.html";
}
HienThiFolder(root, document.getElementById("fileTree"));
function dangxuat(){
    document.querySelector(".xuattrang").style.display="block";
}
function bienmatdx(){
    document.querySelector(".xuattrang").style.display="none";
}
function xuattrang(){
    window.location.href="trang1.html";
}
//file
// let tenfolder = localStorage.getItem("tenfolder");
// let users = JSON.parse(localStorage.getItem("users"));
// let DaDangNhap = localStorage.getItem("DaDangNhap");
// if (!tenfolder || !users || !users[DaDangNhap] || !users[DaDangNhap].drive.children[tenfolder]) {
//     alert("Folder không tồn tại hoặc đã bị xóa. Quay về trang trước.");
//     window.location.href = "trang3.html"; // trang chứa danh sách folder
// } else {
//     var root = users[DaDangNhap].drive.children[tenfolder];
// }
console.log("root =", root);
document.getElementsByClassName("con3")[0].onclick = function(){
    document.querySelector(".con1").style.display="flex";
}
document.getElementById("TAT").onclick = function(){
    document.querySelector(".con1").style.display="none";
}
function taofile(){
    console.log(document.getElementById("TenFilemoi"));

    let name= document.getElementById("TenFilemoi").value.trim();
    if(!name){
        alert("Hãy tạo file!");
    }
    root.children[name]={
        type: "file",
        content: ""
    }
    users[DaDangNhap].history.push(`Tạo file '${name}' trong thư mục '${tenfolder}'`);
    CapNhatfile();
    document.getElementById("TenFilemoi").value="";
}
function SuaFlie(file, oldname){
    let Newname = prompt("Đổi tên file:", oldname);
    if(!Newname || Newname === oldname){
        alert("trùng tên");
        return;
    }
    file.children[Newname] = file.children[oldname];
    delete file.children[oldname];
    users[DaDangNhap].history.push(`Đổi tên file '${oldname}' thành '${Newname}' trong thư mục '${tenfolder}'`);
    CapNhatfile();
}
function Xoafile(file, name){
    if(!confirm(`Xóa file '${name}'?`)) return;
    delete file.children[name];
    users[DaDangNhap].history.push(`Xóa file '${name}' trong thư mục '${tenfolder}'`);
    CapNhatfile();
}
function CapNhatfile(){
    users[DaDangNhap].drive.children[tenfolder] = root;
    localStorage.setItem("users", JSON.stringify(users));
    HienThiFile(root, document.getElementById("fileTree1"));
}
function HienThiFile(Folder, contain){
    contain.innerHTML = "";
    for(let name in Folder.children){
        let item = document.createElement("div");
        item.style.border = "1px solid";
        item.style.display = "flex";
        let b = document.createElement("div");
        b.style.border = "1px solid";
        b.style.width = "110px";
        b.textContent = name;
        item.appendChild(b);
        let c = document.createElement("button");
        //c.id = "doiTen";
        c.type = "button";
        c.textContent = "doi ten";
        c.onclick = () => SuaFlie(Folder, name);
        item.appendChild(c);
        let d = document.createElement("button");
        //d.id = "xoa";
        d.type = "button";
        d.textContent = "Xoa";
        d.onclick = () => Xoafile(Folder, name);
        item.appendChild(d);
        contain.appendChild(item);
        //mở file
        if(Folder.children[name].type === "file"){
            b.onclick = () => {
                let content = Folder.children[name].content;
                let newcontent = prompt("Nội dung file:", content);
                if(newcontent === null) return;
                Folder.children[name].content = newcontent;
                users[DaDangNhap].history.push(`Chỉnh sửa nội dung file '${name}' trong thư mục '${tenfolder}'`);
                CapNhatfile();
            }
        }
        else{
            b.onclick = () => alert("đây không phải file, không thể mở");
        }
        
    }
    
}
HienThiFile(root, document.getElementById("fileTree1"));