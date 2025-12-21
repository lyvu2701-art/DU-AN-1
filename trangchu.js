let DaDangNhap = localStorage.getItem("DaDangNhap");
let users = JSON.parse(localStorage.getItem("users"));
let root = users[DaDangNhap].drive; // Lấy đối tượng 'drive' của người dùng hiện tại.
let folderDangTaoFile = null;
let tenFolderDangTaoFile = "";
// mở popup tạo folder
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
    if (root.children[name]) {
        alert("Folder đã tồn tại!");
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
        alert("Tên folder đã tồn tại!Hãy nhập tên khác!");
        return;
    }
    // gán giá trị của tên folder cũ cho tên folder mới(cùng trỏ đến giá trị)
    folder.children[Newname] = folder.children[oldname];
    // xóa tên folder cũ(tên cũ không trỏ đến giá trị)
    delete folder.children[oldname];
    users[DaDangNhap].history.push(`Đổi tên thư mục '${oldname}' thành '${Newname}'`);
    CapNhat();

}
// hàm xóa folder
function Xoa(folder, name){
    if(!confirm(`Xóa folder '${name}'?`)) return;
    // xóa tên folder->không trỏ đến giá trị->cùng mất
    delete folder.children[name];
    users[DaDangNhap].history.push(`Xóa thư mục '${name}'`);
    CapNhat();
}
function taofile(){
    if(!folderDangTaoFile) return;
    let name1= document.getElementById("TenFilemoi").value.trim();
    if(!name1){
        alert("Hãy tạo file!");
        return;
    }
    if (folderDangTaoFile.children[name1]) {
        alert("File đã tồn tại!");
        return;
    }
    // thêm file mới cho đối tượng 'children'
    folderDangTaoFile.children[name1]={
        type: "file",
         content: ""
    }
    // truy xuất đến thuộc tính có tên là history và thêm phần tử vào cuối danh sách 
    users[DaDangNhap].history.push(`Tạo file '${name1}' trong thư mục '${tenFolderDangTaoFile}'`);
    folderDangTaoFile = null;
    tenFolderDangTaoFile = "";
    CapNhat();
    document.getElementById("TenFilemoi").value="";
}
function SuaFlie(file, oldname, name){
    let Newname = prompt("Đổi tên file:", oldname);
    // kiểm tra tên mới
    if(!Newname || Newname === oldname)return;
    Newname = Newname.trim();
    if (file.children[Newname]) {
        alert("Tên file đã tồn tại!Hãy nhập tên khác!");
        return;
    }
    // gán giá trị của file cũ cho file mới( tạo thêm 1 biến trỏ tới cùng 1 địa chỉ chính là giá trị của folder cũ)
    file.children[Newname] = file.children[oldname];
    delete file.children[oldname];
    users[DaDangNhap].history.push(`Đổi tên file '${oldname}' thành '${Newname}' trong thư mục '${name}'`);
    CapNhat();
}
function Xoafile(file, name1, name){
    if(!confirm(`Xóa file '${name1}'?`)) return;
    // xóa tên file -> mất biến tham chiếu -> giá trị cũng mất
    delete file.children[name1];
    users[DaDangNhap].history.push(`Xóa file '${name1}' trong thư mục '${name}'`);
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
        let folderObj = Folder.children[name];
        let item = document.createElement("div");
        item.className="khungfolder";
        let khung2=document.createElement("div");
        khung2.className="khung2";
        item.append(khung2);
        let logofolder=document.createElement("img");
        logofolder.src="iconfolder.png";
        logofolder.className="logofolder2";
        khung2.append(logofolder);
        let b = document.createElement("div");
        b.className="tenfolder";
        b.textContent = name 
        khung2.appendChild(b);
        let c = document.createElement("button");
        c.className = "doiTen";
        c.textContent = "Đổi tên";
        c.onclick = () => suaFolder(Folder, name);
        khung2.appendChild(c);
        let d = document.createElement("button");
        d.className = "xoa";
        d.textContent = "Xoá";
        d.onclick = () => Xoa(Folder, name);
        khung2.appendChild(d);
        contain.appendChild(item);
        //tạo file
        let taofile=document.createElement("button");
        taofile.className="taofilemoi";
        taofile.textContent="Tạo file";
        taofile.onclick = () => {
            folderDangTaoFile = folderObj;
            tenFolderDangTaoFile = name;
            document.querySelector(".taofile").style.display = "flex";
        }
        khung2.append(taofile);
        let fileContainer = document.createElement("div");
        fileContainer.className = "fileContainer";
        fileContainer.style.display = "block";
        // hiển thị file
        for(let name1 in folderObj.children){
            let item1 = document.createElement("div");
            item1.className="khungfile";
            let khung1 = document.createElement("div");
            khung1.className="khung1";
            item1.append(khung1);
            let logofile=document.createElement("img");
            logofile.src="iconfile.png";
            logofile.className="logofile2";
            khung1.append(logofile);
            let b1 = document.createElement("div");
            b1.className="tenfile";
            b1.textContent = name1;
            khung1.appendChild(b1);
            let c1 = document.createElement("button");
            c1.className = "doiTen";
            c1.textContent = "Đổi tên";
            c1.onclick = () => SuaFlie(folderObj, name1, name);
            khung1.appendChild(c1);
            let d1 = document.createElement("button");
            d1.className = "xoa";
            d1.textContent = "Xoá";
            d1.onclick = () => Xoafile(folderObj, name1, name);
            khung1.appendChild(d1);
            //hiển thi nd trong khung file
            let ndfile=document.createElement("div");
            ndfile.className="ndfile";
            item1.appendChild(ndfile);
            fileContainer.appendChild(item1);
            let fileData = folderObj.children[name1];
            if (fileData.content) {
                ndfile.textContent = "Nội dung: " + fileData.content;
                ndfile.style.display = "block";
            } else {
                ndfile.style.display = "none";
            }
            b1.onclick=()=>{
                if (fileData.content) {
                    ndfile.textContent = "Nội dung: " + fileData.content;
                    ndfile.style.display = "block";
                } else {
                    b1.onclick = () => {
                    let content2 = folderObj.children[name1].content || "";
                    let newcontent = prompt("File rỗng!Hãy nhập nội dung cho file!:", content2);
                    if(newcontent === null) return;
                    ndfile.textContent="Nội dung của file là: "+ newcontent;
                    ndfile.style.display = "block";
                    folderObj.children[name1].content = newcontent;
                    users[DaDangNhap].history.push(`Chỉnh sửa nội dung file '${name1}' trong thư mục '${name}'`);
                    CapNhat();
                    }
                }
            }
            b1.ondblclick=()=>{
                ndfile.style.display = "none";
            }
            //mở file
            if(folderObj.children[name1].type === "file"){
                ndfile.onclick = () => {
                    let content2 = folderObj.children[name1].content || "";
                    let newcontent = prompt("Nội dung file:", content2);
                    if(newcontent === null) return;
                    ndfile.textContent="Nội dung của file là: "+ newcontent;
                    ndfile.style.display = "block";
                    folderObj.children[name1].content = newcontent;
                    users[DaDangNhap].history.push(`Chỉnh sửa nội dung file '${name1}' trong thư mục '${name}'`);
                    CapNhat();
                }
            }
                    
        }
        item.appendChild(fileContainer);
        b.onclick=()=>{
            fileContainer.style.display="block";
        };
        b.ondblclick=()=>{
            fileContainer.style.display="none";
        };     
    }  
} 
document.getElementById("TAT").onclick = function(){
    document.querySelector(".taofile").style.display = "none";
}
HienThiFolder(root, document.getElementById("folderTree"));
function goStats(){
    window.location.href = "ThongKe.html";
}
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

//hien thi loi chao
let chao=document.getElementById("chaoUser");
if(DaDangNhap){
    chao.textContent="Xin Chào, "+DaDangNhap+"!";
}