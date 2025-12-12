let tenfolder = localStorage.getItem("tenfolder");
let users = JSON.parse(localStorage.getItem("users"));
let DaDangNhap = localStorage.getItem("DaDangNhap");
// kiểm tra dữ liệu
if (!tenfolder || !users || !users[DaDangNhap] || !users[DaDangNhap].drive.children[tenfolder]) {
    alert("Folder không tồn tại hoặc đã bị xóa. Quay về trang trước.");
    window.location.href = "trang3.html"; // trang chứa danh sách folder
} else {
    var root = users[DaDangNhap].drive.children[tenfolder];
}
// gán sự kiện onclick cho thẻ có class 'nuttaofile' để mở popup tạo file    
document.getElementsByClassName("nuttaofile")[0].onclick = function(){
    document.querySelector(".taofile").style.display="flex";
}
// gán sự kiện onclick cho thẻ có id 'TAT' để tắt popup tạo file
document.getElementById("TAT").onclick = function(){
    document.querySelector(".taofile").style.display="none";
}
// hàm tạo file
function taofile(){
    let name= document.getElementById("TenFilemoi").value.trim();
    if(!name){
        alert("Hãy tạo file!");
        return;
    }
    // thêm folder mới cho đối tượng 'children'
    root.children[name]={
        type: "file",
        content: ""
    }
    // truy xuất đến thuộc tính có tên là history và thêm phần tử vào cuối danh sách 
    users[DaDangNhap].history.push(`Tạo file '${name}' trong thư mục '${tenfolder}'`);
    CapNhatfile();
    document.getElementById("TenFilemoi").value="";
}
// hàm sửa file
function SuaFlie(file, oldname){
    let Newname = prompt("Đổi tên file:", oldname);
    // kiểm tra tên mới
    if(!Newname || Newname === oldname){
        alert("trùng tên");
        return;
    }
    Newname = Newname.trim();
    if (!Newname) return;
    if (folder.children[Newname]) {
        alert("Tên folder đã tồn tại!");
        return;
    }
    // gán giá trị của file cũ cho file mới( tạo thêm 1 biến trỏ tới cùng 1 địa chỉ chính là giá trị của folder cũ)
    file.children[Newname] = file.children[oldname];
    delete file.children[oldname];
    users[DaDangNhap].history.push(`Đổi tên file '${oldname}' thành '${Newname}' trong thư mục '${tenfolder}'`);
    CapNhatfile();
}
// hàm xóa tên file
function Xoafile(file, name){
    if(!confirm(`Xóa file '${name}'?`)) return;
    // xóa tên file -> mất biến tham chiếu -> giá trị cũng mất
    delete file.children[name];
    users[DaDangNhap].history.push(`Xóa file '${name}' trong thư mục '${tenfolder}'`);
    CapNhatfile();
}
// cập nhật lại file trên giao diện
function CapNhatfile(){
    users[DaDangNhap].drive.children[tenfolder] = root;
    localStorage.setItem("users", JSON.stringify(users));
    HienThiFile(root, document.getElementById("fileTree1"));
}
// biến root và Folder đều tham chiếu đến giá trị là thuộc tính 'children' trong đối tượng children của đối tượng drive
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

//hien thi loi chao
let chao=document.getElementById("chaoUser");
if(DaDangNhap){
    chao.textContent="Xin Chào, "+DaDangNhap+"!";
}else{
    chao.textContent="";
}

//button quay lại trang tao folder
function qltaofolder(){
    window.location.href="trang3.html";
}