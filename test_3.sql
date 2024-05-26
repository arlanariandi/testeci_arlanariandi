-- create table department
create table department
(
    id_dept   int auto_increment primary key,
    nama_dept varchar(100)
);

-- create table level
create table level
(
    id_level   int auto_increment primary key,
    nama_level varchar(100)
);

-- create table jabatan
create table jabatan
(
    id_jabatan   int auto_increment primary key,
    nama_jabatan varchar(100),
    id_level     int,
    foreign key (id_level) references level (id_level)
);

-- create table karyawan
create table karyawan
(
    id_karyawan int auto_increment primary key,
    nik         varchar(10) unique,
    nama        varchar(10),
    ttl         date,
    alamat      text,
    id_jabatan  int,
    foreign key (id_jabatan) references jabatan (id_jabatan)
);

-- insert data table department
insert into department (id_dept, nama_dept)
values (1, 'IT'),
       (2, 'HR'),
       (3, 'Finance');

-- insert data table level
insert into level(id_level, nama_level)
values (1, 'Junior'),
       (2, 'Mid'),
       (3, 'Senior');

-- insert data table jabatan
insert into jabatan(id_jabatan, nama_jabatan, id_level)
values (1, 'Software Engineer', 1),
       (2, 'HR Specialist', 2),
       (3, 'Accountant', 3);

-- insert data table karyawan
insert into karyawan(id_karyawan, nik, nama, ttl, alamat, id_jabatan)
values (1, '1234567890', 'Budi', '1990-01-01', 'Jl. Merdeka No. 1, Jakarta', 1),
       (2, '0987654321', 'Siti', '1985-02-15', 'Jl. Sudirman No. 10, Jakarta', 2),
       (3, '1122334455', 'Ahmad', '1988-03-20', 'Jl. Gatot Subroto No. 15, Bandung', 3);

-- query menampilkan nama karyawan, nama jabatan, nama departemen, dan nama level
SELECT karyawan.nama        AS nama_karyawan,
       jabatan.nama_jabatan,
       department.nama_dept AS nama_departemen,
       level.nama_level
FROM karyawan
         JOIN
     jabatan ON karyawan.id_jabatan = jabatan.id_jabatan
         JOIN
     level ON jabatan.id_level = level.id_level
         JOIN
     department ON jabatan.id_jabatan IN (SELECT id_jabatan
                                          FROM jabatan
                                          WHERE id_level = level.id_level);

-- update data karyawan
update karyawan
set nama   = 'Ahmad',
    alamat = 'Jl. Mangga No. 20, Jakarta'
where id_karyawan = 1;

-- delete data karyawan
delete
from karyawan
where id_karyawan = 1;
