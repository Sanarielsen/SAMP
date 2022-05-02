<!-- Inicio do documento html5 -->
<!DOCTYPE HTML>
<!-- Abertura da tag de html -->
<html class="htmlPanel">

	<!-- Abertura da tag de head -->
	<head>

		<?php

			//Iniciamos a sessão;
			session_start();

			//Caso esta sessão já tiver um login, você será redirecionando para a página index;
			if (isset($_SESSION["userOnline"]) && !empty($_SESSION["userOnline"])) {

				//Redirecionamento para a pagina index;
				echo "<script> window.location='index.php' </script>";
			}

			//Caso, não haja nenhum login, a página será carregada normalmente.
			else {

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
 	<body class="bodyPanel">

 		<!-- Abertura da div da row panel do login -->
 		<div class="row panelContainer d-flex justify-content-center justify-content-sm-center" style="height: 100% !important;">

 			<!-- Abertura para div de posicionamento do panel de login -->
 			<div class="col-sm-6 col-md-4 col-lg-4 col-xl-6 align-self-center">

 				<!-- Abertura para o formulário de login a ser executado -->
 				<form class="mb-3" action="identificacao_verify.php" method="POST">
 					
 					<!-- Abertura para uma imagem com uma label do sistema -->
	 				<div class="form-group text-center">
	 					<!-- Imagem ilustrativa do logo do software -->
	 					<img class="img-fluid" src="assets/img/sys/image_screenLogin.png" width="260" height="260" alt="Logo da Ecofacil" />
		 				<br> <br>
	 				<!-- Encerramento para uma imagem com uma label do sistema -->
	 				</div>	

 					<!-- Abertura para uma caixa de texto com label -->
 					<div class="form-group"> 				
 						<!-- Titulo (label) para a caixa de texto do email -->
 						<label for="exampleInputEmail1"> Endereco de email: </label>
 						<!-- Caixa de texto para inserção do email -->
 						<input type="email" class="form-control" id="txtUsuarioEmail" name="txtUsuarioEmail" aria-describedby="emailHelp" placeholder="Digite seu email aqui..." required /> 				
 					<!-- Encerramento para uma caixa de texto com label -->
 					</div>

 					<!-- Abertura para uma caixa de texto com label -->
 					<div class="form-group">
 						<!-- Titulo (label) para a caixa de texto da senha -->
					    <label for="exampleInputPassword1"> Senha </label>
					    <!-- Caixa de texto para inserção da senha -->
					    <input type="password" class="form-control" id="txtUsuarioSenha" name="txtUsuarioSenha" placeholder="Digite sua senha aqui..." required />
					<!-- Encerramento para uma caixa de texto com label -->
					</div>

					<!-- Botão para ativação do formulário -->
					 <button id="btnIniciarAutenticacao" name="btnIniciarAutenticacao" type="submit" class="btn btn-primary btn-lg btn-block"> Login </button>

 				<!-- Encerramento para o formulário de login a ser executado -->
 				</form>

 				<!-- Abertura da div para posicionamento das labels de links
 				<div class="row">
 					<!-- Abertura de uma metade da div
 					<div class="col-xs-12 col-md-6 text-left">

 						<p> <a href="#" class="text-primary"> Precisa de ajuda? </a> </p>
 					</div>
 					<!-- Abertura da outra metade da div
 					<div class="col-xs-12 col-md-6 text-right">
 						
 						<p> <a href="#" class="text-primary"> Esqueceu a senha? </a> </p>
 					</div>
 				<!-- Encerramento da div para posicionamento das labels de links 
 				</div> -->
 				
 			<!-- Encerramento para div de posicionamento do panel de login -->
 			</div>
 		<!-- Encerramento da div da row do panel do login -->
 		</div>

 		<!-- Processo para verificação do id selecionado -->
		<?php 
			/* Verificamos se existe um request de informação nesse componente com este name */
			if(isset($_REQUEST['btnIniciarAutenticacao'])){
				
				echo "o botão foi acionado";

			}
		?>

		<?php

		//Encerramento do if (Session_Start);
		}
		?>

 	<!-- Encerramento da tag de body -->
 	</body>
<!-- Encerramento da tag de html -->
</html>