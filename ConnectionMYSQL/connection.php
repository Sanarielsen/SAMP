<?php
	
	//Arquivo de conexão mysql;

	function getConnection() {

		//Variável com o host, database e linguagem de codificação a ser utilizada na conexão;
		$dsn = 'mysql:host=localhost;dbname=bd_controlePatente;charset=utf8';
		//Variável com o nome do usuário do banco;
		$user = 'root';
		//Variável com a senha do usuário do banco;
		$pass = '';

		//Verificação e tratamento de erro da conexão PDO
		try {

			//Variável de conexão e instancia do PDO
			$pdo = new PDO($dsn, $user, $pass);
			//Retorno do método para a variável de conexão;
			return $pdo;
			
		} 
		//No caso de erros proveniêntes do PDO
		catch (PDOException $ex) {
			
			echo 'Erro PDOException: ' . $ex->getMessage();
		}
	}
?>