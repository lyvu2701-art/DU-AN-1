let tenfolder = localStorage.getItem("tenfolder");
let users = JSON.parse(localStorage.getItem("users"));
let DaDangNhap = localStorage.getItem("DaDangNhap");
if (!tenfolder || !users || !users[DaDangNhap] || !users[DaDangNhap].drive.children[tenfolder]) {
    alert("Folder không tồn tại hoặc đã bị xóa. Quay về trang trước.");
    window.location.href = "trang3.html"; // trang chứa danh sách folder
} else {
    var root = users[DaDangNhap].drive.children[tenfolder];
}
document.getElementsByClassName("con3")[0].onclick = function(){
    document.querySelector(".con1").style.display="flex";
}
document.getElementById("TAT").onclick = function(){
    document.querySelector(".con1").style.display="none";
}
function taofile(){
    let name= document.getElementById("TenFilemoi").value.trim();
    if(!name){
        alert("Hãy tạo file!");
        return;
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
        item.id="khungfile";
        let logofile=document.createElement("img");
        logofile.src="iconfile.png";
        logofile.id="logofile2";
        item.append(logofile);
        let b = document.createElement("div");
        b.id="tenfile";
        b.textContent = name;
        item.appendChild(b);
        let c = document.createElement("button");
        c.id = "doiTen";
        c.type = "button";
        c.textContent = "Đổi tên";
        c.onclick = () => SuaFlie(Folder, name);
        item.appendChild(c);
        let d = document.createElement("button");
        d.id = "xoa";
        d.type = "button";
        d.textContent = "Xoá";
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

//phân quyền
let phanquyen=localStorage.getItem("phanquyen");
if (phanquyen==="admin"){
    console.log("Bạn đang ở chế độ admin!");
}else{
    console.log("Bạn đang ở chế độ User!");
}
 

//hien thi loi chao
let chao=document.getElementById("chaoUser");
if(DaDangNhap){
    chao.textContent="Xin Chào, "+DaDangNhap+"!";
}else{
    chao.textContent="";
}