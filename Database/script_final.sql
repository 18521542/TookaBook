create schema BookStoreManagement;
use BookStoreManagement;

CREATE TABLE THELOAISACH
(
	MaTheLoai INT auto_increment PRIMARY KEY,
	TenTheLoai NVARCHAR(100) NOT NULL
);

CREATE TABLE TACGIA
(
	MaTacGia INT auto_increment PRIMARY KEY,
	TenTacGia NVARCHAR(100) NOT NULL
);

CREATE TABLE CT_TACGIA
(
	MaSach INT ,
	MaTacGia INT NOT NULL ,
	CONSTRAINT PK_CTTACGIA PRIMARY KEY (MaSach,MaTacGia)
);

CREATE TABLE SACH
(
	MaSach INT auto_increment  PRIMARY KEY,
    TenSach NVARCHAR(100),
    MaTheLoai int not null,
	NhaXuatBan NVARCHAR(100) NOT NULL,
	NamXuatBan INT NOT NULL,
	SoLuongTon INT NOT NULL DEFAULT 0,
	DonGiaNhap FLOAT NOT NULL DEFAULT 0
);

alter table SACH 
add constraint SACH_THELOAISACH_FK 
foreign key(MaTheLoai) references THELOAISACH(MaTheLoai);

alter table CT_TACGIA 
add constraint CT_TACGIA_SACH_FK 
foreign key(MaSach) references SACH(MaSach);

alter table CT_TACGIA 
add constraint CT_TACGIA_TACGIA_FK 
foreign key(MaTacGia) references TACGIA(MaTacGia);

CREATE TABLE PHIEUNHAPSACH
(
	SoPhieuNhap INT auto_increment PRIMARY KEY,
	NgayLap TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	TongTien FLOAT DEFAULT 0
);

CREATE TABLE CT_PHIEUNHAPSACH
(
	SoPhieuNhap INT NOT NULL ,
	MaSach INT NOT NULL ,
	SoLuongNhap INT NOT NULL DEFAULT 0,
	DonGiaNhap FLOAT NOT NULL DEFAULT 0,
	ThanhTien FLOAT NOT NULL DEFAULT 0,	
	CONSTRAINT PK_CTPHIEUNHAPSACH PRIMARY KEY (SoPhieuNhap,MaSach)
);

alter table CT_PHIEUNHAPSACH 
add constraint CT_PHIEUNHAPSACH_PHIEUNHAPSACH_FK 
foreign key(SoPhieuNhap) references PHIEUNHAPSACH(SoPhieuNhap);

alter table CT_PHIEUNHAPSACH 
add constraint CT_PHIEUNHAPSACH_SACH_FK 
foreign key(MaSach) references SACH(MaSach);

CREATE TABLE KHACHHANG
(
	MaKhachHang INT auto_increment PRIMARY KEY,
	TenKhachHang NVARCHAR(100) NOT NULL DEFAULT ' ',
	DiaChi NVARCHAR(200)NOT NULL DEFAULT ' ',
	SoDienThoai VARCHAR(11)NOT NULL DEFAULT ' ',
	Email VARCHAR(100)NOT NULL DEFAULT ' ',
	SoTienNo FLOAT NOT NULL DEFAULT 0
);

CREATE TABLE HOADON
(
	SoHoaDon INT auto_increment PRIMARY KEY,
	MaKhachHang INT NOT NULL ,
	NgayLap TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	TongTien FLOAT NOT NULL DEFAULT 0,
	ThanhToan float NOT NULL DEFAULT 0,
	ConLai FLOAT NOT NULL DEFAULT 0
);

alter table HOADON 
add constraint HOADON_KHACHHANG_FK 
foreign key(MaKhachHang) references KHACHHANG(MaKhachHang);

CREATE TABLE CT_HOADON
(
	SoHoaDon INT NOT NULL ,
	MaSach INT NOT NULL ,
	SoLuong INT NOT NULL DEFAULT 0,
	DonGiaBan FLOAT NOT NULL DEFAULT 0,
	ThanhTien FLOAT DEFAULT 0,
	CONSTRAINT PK_CTHD PRIMARY KEY(SoHoaDon,MaSach)
);

alter table CT_HOADON 
add constraint CT_HOADON_HOADON_FK 
foreign key(SoHoaDon) references HOADON(SoHoaDon);

alter table CT_HOADON 
add constraint CT_HOADON_SACH_FK 
foreign key(MaSach) references SACH(MaSach);

CREATE TABLE BAOCAOTON
(
	Thang INT NOT NULL ,
	Nam INT NOT NULL  ,
	MaSach INT NOT NULL ,
	TonDau INT NOT NULL DEFAULT 0,
	PhatSinh INT NOT NULL DEFAULT 0,
	TonCuoi INT NOT NULL DEFAULT 0,
	CONSTRAINT PK_ReportCountInfo PRIMARY KEY( Thang,Nam,MaSach)
);

alter table BAOCAOTON 
add constraint BAOCAOTON_SACH_FK 
foreign key(MaSach) references SACH(MaSach);

CREATE TABLE BAOCAODOANHTHU
(
	Thang INT NOT NULL ,
	Nam INT NOT NULL  ,
    MaSach INT NOT NULL,
    SoLuongBan	INT,
    TongTien FLOAT,
    CONSTRAINT PK_ReportSale PRIMARY KEY(Thang, Nam, MaSach)
);
alter table BAOCAODOANHTHU 
add constraint BAOCAODOANHTHU_SACH_FK 
foreign key(MaSach) references SACH(MaSach);

CREATE TABLE Account
(
	username VARCHAR(255) NOT NULL PRIMARY KEY,
	password VARCHAR(255),
	type int,
    	Realname VARCHAR(255),
	PhoneNumber VARCHAR(255),	
	Email VARCHAR(255),
	Address VARCHAR(255)
);
insert into Account values ("admin","admin",0,"Default","Default","Default","Default");

DELIMITER $$
create procedure USP_Login(p_userName VARCHAR(255),p_passWord VARCHAR(255))
BEGIN
select * from BookStoreManagement.Account where username=p_userName and password=p_passWord;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetAccountByUsername(p_userName VARCHAR(255))
BEGIN
select * from BookStoreManagement.Account where username=p_userName;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_AddAccount(p_userName VARCHAR(255), p_password VARCHAR(255), p_type int, p_RealName VARCHAR(255), p_PhoneNumber VARCHAR(255), p_Email VARCHAR(255), p_Address VARCHAR(255))
BEGIN
INSERT INTO BookStoreManagement.Account (username, password, type, realname, PhoneNumber, Email, Address)
VALUES (p_username,p_password, p_type, p_RealName, p_PhoneNumber, p_Email,p_Address);
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetAccount()
BEGIN
select * from BookStoreManagement.Account;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_DeleteAccountByUsername(p_userName VARCHAR(255), p_password VARCHAR(255), p_type int, p_RealName VARCHAR(255), p_PhoneNumber VARCHAR(255), p_Email VARCHAR(255), p_Address VARCHAR(255))
BEGIN
DELETE  from account where account.username=p_username;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_UpdateAccountByUsername(p_userName VARCHAR(255), p_password VARCHAR(255), p_type int, p_RealName VARCHAR(255), p_PhoneNumber VARCHAR(255), p_Email VARCHAR(255), p_Address VARCHAR(255))
BEGIN
 UPDATE account
 SET account.PASSWORD=p_password, account.type=p_type,
 account.RealName= p_RealName, account.PhoneNumber=p_PhoneNumber, account.Email=p_Email, account.Address=p_Address
 
 WHERE account.username=p_username;
end; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_GetCategory()
BEGIN
select * from THELOAISACH;
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_AddCategory(categoryName VARCHAR(100))
BEGIN
if((select count(*) from THELOAISACH where TenTheLoai=categoryname)=0)
then
    insert THELOAISACH(TenTheLoai) values(categoryName);
    end if;
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_GetAuthor()
BEGIN
select * from TACGIA;
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_AddAuthor(author VARCHAR(100))
BEGIN
	insert TACGIA(TenTacGia) values(author);
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_GetAuthorByBook(bookID int)
BEGIN
select TACGIA.MaTacGia,TACGIA.TenTacGia from TACGIA,CT_TACGIA,SACH
where TACGIA.MaTacGia=CT_TACGIA.MaTacGia and CT_TACGIA.MaSach=SACH.MaSach and SACH.MaSach=bookID;
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_GetCategoryByBook(bookID int)
BEGIN
select THELOAISACH.MaTheLoai,THELOAISACH.TenTheLoai from THELOAISACH,SACH
where THELOAISACH.MaTheLoai=SACH.MaTheLoai and SACH.MaSach=bookID;
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_AddBook(name NVARCHAR(100),categoryID int, publishCompany nvarchar(200),publishYear int)
BEGIN
	insert SACH(TenSach,MaTheLoai,NhaXuatBan,NamXuatBan,SoLuongTon,DonGiaNhap)
    values(name,categoryID,publishCompany,publishYear,0,0);
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_AddBookAuthor(authorID int)
BEGIN
	declare bookID int;
    set bookID=(select max(MaSach) from SACH);
	insert CT_TACGIA values(bookID,authorID);
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_GetCategoryByID(categoryID int)
BEGIN
	select* from THELOAISACH where MaTheLoai=categoryID;
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_GetBook()
BEGIN
	select* from SACH;
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_AddImportBook(dateInput date ,money float)
BEGIN
	insert PHIEUNHAPSACH(NgayLap,TongTien)values(dateInput,money);
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_AddImportBookInfo(bookID int ,countt int, price float,total float)
BEGIN
	declare id int;
    set id=(select max(SoPhieuNhap) from PHIEUNHAPSACH);
	insert CT_PHIEUNHAPSACH values(id,bookID,countt,price,total);
    update SACH set SoLuongTon=SoLuongTon+countt,DonGiaNhap=price where MaSach=bookID;
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_AddCustomer(name NVARCHAR(100),phone varchar(100),email varchar(100),address nvarchar(100))
BEGIN
	insert KHACHHANG(TenKhachHang,DiaChi,SoDienThoai,Email,SoTienNo) 
    values(name,address,phone,email,0);
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_GetCustomer()
BEGIN
select * from KHACHHANG;
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_AddBill(dateInput date ,money float,moneyReceive float, moneyChange float, customerID int)
BEGIN
	insert HOADON(MaKhachHang,NgayLap,TongTien,ThanhToan,ConLai)
    values(customerID,dateInput,money,moneyReceive,moneyChange);
    update KHACHHANG set SoTienNo=SoTienNo+moneyChange where MaKhachHang=customerID;
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_AddBillInfo(bookID int ,countt int, price float,total float)
BEGIN
	declare id int;
    set id=(select max(SoHoaDon) from HOADON);
	insert CT_HOADON values(id,bookID,countt,price,total);
    update SACH set SoLuongTon=SoLuongTon-countt where MaSach=bookID;
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_GetBookByID(bookID int)
BEGIN
	select * from SACH where MaSach=bookID;
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_UpdateBook(id int,name NVARCHAR(100),categoryID int, publishCompany nvarchar(200),publishYear int)
BEGIN
	update SACH 
    set TenSach=name,MaTheLoai=categoryID,NhaXuatBan=publishCompany,NamXuatBan=publishYear
    where MaSach=id;
    
    delete from CT_TACGIA where MaSach=id;
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_UpdateBookAuthor(bookID int,authorID int)
BEGIN
	insert CT_TACGIA values(bookID,authorID);
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_GetImporByBookID(bookID int)
BEGIN
	select p.SoPhieuNhap,p.NgayLap,p.TongTien,ct.MaSach,ct.DonGiaNhap,ct.SoLuongNhap,ct.ThanhTien
    from PHIEUNHAPSACH p,CT_PHIEUNHAPSACH ct
    where p.SoPhieuNhap=ct.SoPhieuNhap and ct.MaSach=bookID;
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_GetCustomerByID(customerID int)
BEGIN
	select * from KHACHHANG where MaKhachHang=customerID;
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_UpdateCusTomer(customerID int,name NVARCHAR(100),phone varchar(100),email varchar(100),address nvarchar(100) )
BEGIN
	update KHACHHANG 
    set TenKhachHang=name,SoDienThoai=phone,Email=email,DiaChi=address
    where MaKhachHang=customerID;
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_GetBillByCustomerID(customerID int)
BEGIN
	select h.SoHoaDon,h.MaKhachHang,h.NgayLap,h.TongTien,h.ThanhToan,h.ConLai,ct.MaSach,ct.SoLuong,ct.DonGiaBan,ct.ThanhTien
    from HOADON h,CT_HOADON ct
    where h.SoHoaDon=ct.SoHoaDon and h.MaKhachHang=customerID;
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_GetBillByBillID(billID int)
BEGIN
	select h.SoHoaDon,h.MaKhachHang,h.NgayLap,h.TongTien,h.ThanhToan,h.ConLai,ct.MaSach,ct.SoLuong,ct.DonGiaBan,ct.ThanhTien
    from HOADON h,CT_HOADON ct
    where h.SoHoaDon=ct.SoHoaDon and h.SoHoaDon=billID;
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_GetReportInventory(month int,year int)
BEGIN
	select * from BAOCAOTON where Thang=month and Nam=year;
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_ImportReportInventory(month int,year int,bookID int)
BEGIN
	declare preMonth int;
    declare preYear int;
    declare first int;
    declare incurred int;
    declare last int;
		if(month =1)
		then
			set preMonth=12;
			set preYear=year-1;
		else
			set preMonth=month-1;
			set preYear=year;
		end if;
        
        if((select count(*) from BAOCAOTON where Thang=preMonth and Nam=preYear and MaSach=bookID)>0)
        then
			set first=(select TonCuoi from BAOCAOTON where Thang=preMonth and Nam=preYear and MaSach=bookID);
        else
			set first=0;
		end if;
        if((select count(*) from CT_PHIEUNHAPSACH ct,PHIEUNHAPSACH p
			where MaSach=bookID and ct.SoPhieuNhap=p.SoPhieuNhap and month(p.NgayLap)=month and year(p.NgayLap)=year)>0)
        then
			set incurred=(select sum(ct.SoLuongNhap) from CT_PHIEUNHAPSACH ct,PHIEUNHAPSACH p 
				where MaSach=bookID and ct.SoPhieuNhap=p.SoPhieuNhap and month(p.NgayLap)=month and year(p.NgayLap)=year);
        else
			set incurred=0;
		end if;
        
        if((select count(*) from CT_HOADON ct,HOADON h
			where MaSach=bookID and ct.SoHoaDon=h.SoHoaDon and month(h.NgayLap)=month and year(h.NgayLap)=year)>0)
        then
			set last=first+incurred-(select sum(ct.SoLuong) from CT_HOADON ct,HOADON h 
										where MaSach=bookID and ct.SoHoaDon=h.SoHoaDon and month(h.NgayLap)=month and year(h.NgayLap)=year);
		else
			set last=first+incurred;
        end if;
        insert BAOCAOTON values(
			month,
			year,
			bookID,
			first,
			incurred,
			last
		);
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_FreshReportInventory(month int,year int)
BEGIN
	delete from BAOCAOTON where Thang=month and Nam=year;
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_FreshReportRevenue(month int,year int)
BEGIN
	delete from BAOCAODOANHTHU where Thang=month and Nam=year;
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_ImportReportRevenue(month int,year int,bookID int)
BEGIN
	declare count int;
    declare money float;
    if((select count(*) from CT_HOADON ct,HOADON h 
		where MaSach=bookID and ct.SoHoaDon=h.SoHoaDon and month(h.NgayLap)=month and year(h.NgayLap)=year)>0)
    then
		set count=(select sum(ct.SoLuong) from CT_HOADON ct,HOADON h
        where MaSach=bookID and ct.SoHoaDon=h.SoHoaDon and month(h.NgayLap)=month and year(h.NgayLap)=year);
        set money=(select sum(ct.ThanhTien) from CT_HOADON ct,HOADON h
        where MaSach=bookID and ct.SoHoaDon=h.SoHoaDon and month(h.NgayLap)=month and year(h.NgayLap)=year);
	else
		set count=0;
        set money=0;
	end if;
    
    insert BAOCAODOANHTHU values(
		month,
        year,
        bookID,
        count,
        money
    );
END; $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE USP_GetReportRevenue(month int,year int)
BEGIN
	select * from BAOCAODOANHTHU where Thang=month and Nam=year;
END; $$
DELIMITER ;


CREATE table phieuthutien
(
	SoPhieuThu INT auto_increment PRIMARY KEY,
    	MaKhachHang INT,
	NgayLap TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	TienThu FLOAT DEFAULT 0
);

Alter table phieuthutien 
add constraint phieuthutien_KHACHHANG_FK 
foreign key(MaKhachHang) references KHACHHANG(MaKhachHang);

DELIMITER $$
CREATE PROCEDURE USP_AddPayment(dateInput date ,money float, customerID int)
BEGIN
	insert phieuthutien(MaKhachHang,NgayLap,TienThu)
    values(customerID,dateInput,money);

    update KHACHHANG set SoTienNo=SoTienNo-money where MaKhachHang=customerID; 
END; $$
DELIMITER ;
DELIMITER $$

END;
DELIMITER ;
DELIMITER $$

CREATE TABLE QUYDINH
(
	LuongNhapToiThieu INT NOT NULL ,
	LuongTonTruocKhiNhap INT NOT NULL  ,
	LuongTonSauKhiBan INT NOT NULL ,
	TienNoToiDa INT NOT NULL
);

insert into QUYDINH values (0,0,0,0);

DELIMITER $$
create procedure USP_GetRules()
BEGIN
select * from QUYDINH;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_UpdateRules(NhapToiThieu int, TonTruocKhiNhap int, TonSauKhiBan int, NoToiDa int)
BEGIN
	UPDATE QUYDINH
 	SET QUYDINH.LuongNhapToiThieu =NhapToiThieu, QUYDINH.LuongTonTruocKhiNhap =TonTruocKhiNhap,QUYDINH.LuongTonSauKhiBan =TonSauKhiBan,QUYDINH.TienNoToiDa =NoToiDa;
END; $$
DELIMITER ;
