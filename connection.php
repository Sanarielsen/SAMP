<?php

	/* Variáveis de configurações */
	$host = "localhost";
	$user = "root";
	$pass = "";
	$database = "bd_controlePatente";

	//Variavel de conexão 
	$conexao = mysqli_connect($host, $user, $pass) 
		or die (mysqli_error($conexao));

	//Selecionando a base de dados;
	mysqli_select_db($conexao, $database) 
		or die (mysqli_error($conexao));

	//Configurações para consulta de dados utf-8;
	mysqli_query($conexao,"SET NAMES 'utf8'");
	mysqli_query($conexao,'SET character_set_connection=utf8');
	mysqli_query($conexao,'SET character_set_client=utf8');
	mysqli_query($conexao,'SET character_set_results=utf8');
	setlocale(LC_MONETARY, 'pt_BR');

?>