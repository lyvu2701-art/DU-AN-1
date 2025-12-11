let DaDangNhap = localStorage.getItem("DaDangNhap");
let users = JSON.parse(localStorage.getItem("users"));
let root = users[DaDangNhap].drive; // Lấy đối tượng 'drive' của người dùng hiện tại.
// mở popup tạo folder
//document.getElementById("TaoFile").onclick = function(){
    //document.querySelector(".taofile").style.display = "flex";
//}
//let root = users[DaDangNhap].drive;
document.getElementById("TaoFolder").onclick = function(){
    document.querySelector(".taofolder").style.display = "flex";
}
// đóng popup tạo folder
document.getElementById("tat").onclick = function(){
    document.querySelector(".taofolder").style.display = "none";
}
// hàm tạo folder
function taoFolder(){
    let name = document.getElementById("tenFolderMoi").value.trim();
    if(!name){
        alert("Hãy tạo folder!");
        return;
    }
    // thêm/tạo folder có tên 'name'
    root.children[name] = {
        type: "folder",
        children: {},
    }
    // lưu vào history của người dùng hiện tại
    users[DaDangNhap].history.push(`Tạo thư mục '${name}'`);
    CapNhat();
     document.getElementById("tenFolderMoi").value = "";
}
// hàm sửa tên folder
function suaFolder(folder, oldname){
    let Newname = prompt("Đổi tên folder:", oldname);
    //kiểm tra tên mới
    if(!Newname || Newname === oldname) return;
    Newname = Newname.trim();
    if (!Newname) return;
    if (folder.children[Newname]) {
        alert("Tên folder đã tồn tại!");
        return;
    }
    // gán giá trị của tên folder cũ cho tên folder mới(cùng trỏ đến giá trị)
    folder.children[Newname] = folder.children[oldname];
    // xóa tên folder cũ(tên cũ không trỏ đến giá trị)
    delete folder.children[oldname];
    users[DaDangNhap].history.push(`Đổi tên '${oldname}' thành '${Newname}'`);
    CapNhat();

}
// hàm xóa folder
function Xoa(folder, name){
    if(!confirm(`Xóa'${name}'?`)) return;
    // xóa tên folder->không trỏ đến giá trị->cùng mất
    delete folder.children[name];
    users[DaDangNhap].history.push(`Xóa'${name}'`);
    CapNhat();
}
// hàm cập nhật
function CapNhat(){
    users[DaDangNhap].drive = root;
    localStorage.setItem("users", JSON.stringify(users));
    HienThiFolder(root, document.getElementById("folderTree"));
}
// hàm hiển thị folder ra giao diện
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


//đếm file ,folder

let user = users[DaDangNhap];
// kiểm tra trạng thái đăng nhập
if(!DaDangNhap || !user){
    alert("Vui lòng đăng nhập để xem lịch sử hoạt động!");
    window.location.href = "trang1.html";
}
else{
    var root1 = users[DaDangNhap].drive;
}
// hiển thị số lượng ra giao diện
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