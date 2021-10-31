<?php

	session_start();

	unset($_SESSION['userOnline']);

	echo "<script> window.location='index.php' </script>";
	
?>