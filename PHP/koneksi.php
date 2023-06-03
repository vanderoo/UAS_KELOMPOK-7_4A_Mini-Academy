<?php 
$koneksi = mysqli_connect("localhost","root","","db_miniacademy");
 
// Check connection
if (mysqli_connect_errno()){
	echo "Koneksi Lu Gagal Mas Bro :) : " . mysqli_connect_error();
}

 
?>