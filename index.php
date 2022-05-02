<!-- Inicio do documento html5 -->
<!DOCTYPE HTML>
<!-- Abertura da tag de html -->
<html class="htmlPanel">

	<!-- Abertura da tag de head -->
	<head>

		<!-- Código JavaScript -->
		<script type="text/javascript">
			
			//Função que irá verificar se o login está feito ou não;
			function verifyLogin() {
				 
				setTimeout("window.location='identificacao.php'", 1);
			}
		
		</script>

		<!-- Verificamos se a sessão possui um login ou não -->
		<?php

			session_start();

			//Caso esta sessão já tiver um login, permanecemos na página;
			if (isset($_SESSION["userOnline"]) && !empty($_SESSION["userOnline"])) {

			echo $_SESSION["userOnline"];

			header('Location: principal.php');
		?>

		<!-- Adaptação para elementos especiais -->
		<meta charset="utf-8">
		<!-- Tag para definição para uso em dispositivos mobiles -->
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- Tag para instanciar a imagem da aba do site -->
		<link rel="icon" type="imagem/png" href="assets/img/sys/ico_header.png" />
		<!-- Tag para dar titulo a aba do site -->
		<title> SAMP: Painel adminstrativo </title>
		
		<!-- Área para instanciação dos CSS, script's e afins -->		
		<!-- Author CSS -->
		<link rel="stylesheet" type="text/css" href="assets/css/style.css">
		<!-- Bootstrap - CSS -->
		<link rel="stylesheet" type="text/css" href="style.css">

	<!-- Encerramento da tag de head -->
	</head>

 	<!-- Abertura da tag de body -->
 	<body>

 		<?php

			//If pertencente ao Login Sucedido
			}

			//Caso este login não esteja encontrado, redirecionaremos para a tela de login
			else {

				//Aviso que o login do usuário não está ativo;
				echo "<script> alert('Você precisa estar logado para continuar'); </script>";

				//Ativamos a função javascript para redirecionamento de Login;
				echo "<script> verifyLogin() </script>";
			}
		?>

 	<!-- Encerramento da tag de body -->
 	</body>
<!-- Encerramento da tag de html -->
</html>