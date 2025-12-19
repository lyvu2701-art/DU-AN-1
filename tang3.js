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
    if (!Newname) return;
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
        item.id="khungfolder";
        let logofolder=document.createElement("img");
        logofolder.src="iconfolder.png";
        logofolder.id="logofolder2";
        item.append(logofolder);
        let b = document.createElement("div");
        b.id="tenfolder";
        b.textContent = name 
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
        taofile.onclick = () => {
            folderDangTaoFile = folderObj;
            tenFolderDangTaoFile = name;
            document.querySelector(".taofile").style.display = "flex";
        }
        item.append(taofile);
        // click để mở file
        for(let name1 in folderObj.children){
            let item1 = document.createElement("div");
            item1.id="khungfile";
            let logofile=document.createElement("img");
            logofile.src="iconfile.png";
            logofile.id="logofile2";
            item1.append(logofile);
            let b1 = document.createElement("div");
            b1.id="tenfile";
            b1.textContent = name1;
            item1.appendChild(b1);
            let c1 = document.createElement("button");
            c1.id = "doiTen";
            c1.type = "button";
            c1.textContent = "Đổi tên";
            c1.onclick = () => SuaFlie(folderObj, name1, name);
            item1.appendChild(c1);
            let d1 = document.createElement("button");
            d1.id = "xoa";
            d1.type = "button";
            d1.textContent = "Xoá";
            d1.onclick = () => Xoafile(folderObj, name1, name);
            item1.appendChild(d1);
            contain.appendChild(item1);
            //mở file
            if(folderObj.children[name1].type === "file"){
                b1.onclick = () => {
                    let content2 = folderObj.children[name1].content;
                    let newcontent = prompt("Nội dung file:", content2);
                    if(newcontent === null) return;
                    folderObj.children[name1].content = newcontent;
                    users[DaDangNhap].history.push(`Chỉnh sửa nội dung file '${name1}' trong thư mục '${name}'`);
                    CapNhat();
                }
            }
            else{
                b1.onclick = () => alert("đây không phải file, không thể mở");
            }
                        
                    
                        
        }
                    
                    
                
                /*localStorage.setItem("tenfolder", name);
                window.location.href = "trang4.html";
            }
            b.onclick = () => {
                localStorage.setItem("tenfolder", name);
                window.location.href = "trang4.html";
            }*/
            
            
        
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

//hien thi loi chao
let chao=document.getElementById("chaoUser");
if(DaDangNhap){
    chao.textContent="Xin Chào, "+DaDangNhap+"!";
}