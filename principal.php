<!-- Inicio do documento html5 -->
<!DOCTYPE HTML>
<!-- Abertura da tag de html -->
<html style="height: 100%; overflow: auto;">

	<!-- Abertura da tag de head -->
	<head>

		<!-- Adaptação para elementos especiais -->
		<meta charset="utf-8">
		<!-- Tag para definição para uso em dispositivos mobiles -->
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- Tag para instanciar a imagem da aba do site -->
		<link rel="icon" type="imagem/png" href="assets/img/sys/ico_header.png" />
		<!-- Tag para dar titulo a aba do site -->
		<title> Bem vindo ao SCAMP </title>
		
		<!-- Área para instanciação dos CSS, script's e afins -->		
		<!-- Author CSS -->
		<link rel="stylesheet" type="text/css" href="assets/css/style.css">
		<!-- Bootstrap - CSS -->
		<link rel="stylesheet" type="text/css" href="style.css">
		<!-- Comando para interligar o JS:  bootstrap.min.js -->
		<script src="bootstrap/js/jquery.min.js"></script>
		<script src="bootstrap/js/bootstrap.min.js"></script>
		<script src="bootstrap/js/popper.min.js"></script>	

	<!-- Encerramento da tag de head -->
	</head>

 	<!-- Abertura da tag de body -->
 	<body style="height: 100%; overflow: auto;">

 		<?php

 			//Estando online, requisitamos o nome do usuário;
			include "identificacao_cargo.php";

			//Captação das informações do usuário logado;
			//Nome do usuário;
			$nomeUsuario = $_SESSION['UsuarioNome'];
			//Email do usuário;
			$emailUsuario = $_SESSION['UsuarioEmail'];
			//Cargo do usuário;
			$cargoUsuario = $_SESSION['UsuarioCargo'];
			//Nome do cargo do usuário;
			$nomeCargoUsuario = $_SESSION['UsuarioNomeCargo'];
 		?>

	 	<!-- Abertura da div que irá cobrir toda a tela em questão de largura -->
		<div class="container-fluid p-0" style="height: 100% !important"> 		

			<!-- Menu horizontal a ser utilizado quando a resolução for pequena ou ultra pequena -->
			<nav class="navbar navbar-light bg-light d-flex d-lg-none">
				<!-- Zona de titulo do menu -->
				<!-- Conjunto com o icone e o nome -->
				<a class="my-2 navbar-brand" href="#">
					<!-- Icone EcoFacil -->
					<img class="img-fluid mx-auto d-block" src="assets/img/sys/ico_header.png" width="140" height="140" alt="">
				</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<!-- NAV BAR quando a resolução for pequena -->
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<!-- Lista de opções do menu iniciada -->
					<ul class="navbar-nav mr-auto">
						<!-- item 1 - com submenu -->
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Empresas / Clientes
							</a>
							<!-- Submenu do item 1 -->
							<div class="dropdown-menu" aria-labelledby="navbarDropdown">
								<a class="dropdown-item" href="http://localhost/SCAMPV1/cadastros.php"> Cadastros </a>
								<a class="dropdown-item" href="http://localhost/SCAMPV1/representantes.php"> Representantes </a>		
							</div>
						</li>				
						<!-- item 4 - com submenu -->
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Configurações
							</a>
							<!-- Submenu do item 1 -->
							<div class="dropdown-menu" aria-labelledby="navbarDropdown">
								<a class="dropdown-item" href="http://localhost/SCAMPV1/sobresys.php"> Sobre o sistema </a>
								<a class="dropdown-item" href="http://localhost/SCAMPV1/relatorioBugs.php"> Relatar bug </a>		
							</div>
						</li>	
						<!-- item 5 -->
						<li class="nav-item">
							<a class="nav-link" href="http://localhost/SCAMPV1/identificacao_outline.php"> Sair </a>
						</li>
					</ul>
				</div>
			</nav>

			<!-- Abertura da div que irá conter o menu lateral e o conteudo do sistema -->
			<div class="row m-0" style="height: 100% !important;">

				<!-- Abertura do menu horizontal do sistema -->									
				<nav class="col-md-2 d-none d-lg-block bg-light sidebar">				
					<!-- Abertura da div para centralização do icone e do nome do sistema -->
					<div class="text-center">
						<!-- Conjunto com o icone e o nome -->
						<a class="my-2 navbar-brand" href="http://localhost/SCAMPV1/principal.php">
							<!-- Icone do sistema -->
							<img class="img-fluid mx-auto d-block" src="assets/img/sys/ico_header.png" width="100" height="140" alt="Logo do sistema">									
						</a>					
					<!-- Encerramento da div para centralização do icone e do nome do sistema -->
					</div>
					<!-- Abertura da área do menu vertical -->
				    <div class="sidebar-sticky"> 
				    	<!-- Separador de sessões deste menu -->
				    	<h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
			              <span> Empresas/Clientes </span>
			              <a class="d-flex align-items-center text-muted" href="#">
			                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"></svg>
			              </a>
			            </h6>
			            <!-- Conjunto de opções desa parte do menu - Empresas/Clientes -->
				        <ul class="nav flex-column">
				        	<!-- Item 1 - Cadastros -->
			              	<li class="nav-item">
				                <a class="nav-link" href="http://localhost/SCAMPV1/cadastros.php">
				                  <img src="assets/img/sys/ico_menu_item_cadastros_colorblack.png" width="24" height="24" />
				                  Cadastros <span class="sr-only">(current)</span>
				                </a>
			              	</li>
			              	<!-- Item 2 - Representantes -->
				            <li class="nav-item">
				                <a class="nav-link" href="http://localhost/SCAMPV1/representantes.php">
				                  <img src="assets/img/sys/ico_menu_item_representantes_colorblack.png" width="24" height="24" />
				                  Representantes
				                </a>
				            </li>
				            <!-- Conjunto de opções desa parte do menu ENCERRADO - Empresas/Clientes -->  
				        </ul> 
				        <!-- Separador de sessões deste menu -->
			            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
			              <span> Configurações </span>
			              <a class="d-flex align-items-center text-muted" href="#">
			                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"></svg>
			              </a>
			            </h6>
			            <!-- Conjunto de opções desa parte do menu - CONFIGURAÇÕES -->
			            <ul class="nav flex-column mb-2">
			            	<?php

			            		if ( $_SESSION['UsuarioNomeCargo'] == "Administrador(a)" ) {
			            	?>

			            	<!-- Item 1 - Sobre o sistema -->
				            <li class="nav-item">
				                <a class="nav-link" href="http://localhost/SCAMPV1/configuracao_admin.php">
				                 <img src="assets/img/sys/ico_menu_item_admin_config_black.png" width="24" height="24" /> 
				                  Config. Admin
				                </a>
				            </li>

				            <?php

				            	}
				            ?>
			            	<!-- Item 2 - Sobre o sistema -->
				            <li class="nav-item">
				                <a class="nav-link" href="http://localhost/SCAMPV1/sobresys.php">
				                 <img src="assets/img/sys/ico_menu_item_sobreosistema_colorblack.png" width="24" height="24" /> 
				                  Sobre o sistema
				                </a>
				            </li>
				            <!-- Item 2 - Sair -->
				            <li class="nav-item">
				                <a class="nav-link" href="http://localhost/SCAMPV1/identificacao_outline.php">
				                	<img src="assets/img/sys/ico_menu_item_sair_colorblack.png" width="24" height="24" />
				                	Sair
				                </a>
				            </li>			          
				        <!-- Conjunto de opções desa parte do menu ENCERRADO - CONFIGURAÇÕES -->
				        </ul>
				    </div>
				</nav>

				<!-- Abertura da div que irá conter o conteúdo do site -->
				<main class="col-md-12 col-lg-10" role="main">		                			
					
					<!-- Abertura da div que irá centralizar o conteúdo vertical e horizontal -->
					<div class="row panelContainer d-flex justify-content-center justify-content-sm-center" style="height: 100% !important;">
						
						<!-- Abertura da div que irá manter o tamanho da div para centralização -->
		 				<div class="col-sm-6 col-md-4 col-lg-4 col-xl-6 align-self-center">

		 					<!-- Icone do sistema -->
							<img class="img-fluid mx-auto d-block" src="assets/img/sys/ico_header.png" width="140" height="140" alt="Logo do sistema">
							<!-- Titulo indicando uma mensagem de boas-vindas -->
		 					<h2 class="h2 text-center py-4"> Seja bem-vindo, <?php echo $nomeUsuario ?> </h2>		
		 					<!-- Titulo indicando os status que o usuário possui -->
		 					<h4 class="h4 text-center py-2"> Você está logado como: <?php echo $emailUsuario ?> </h4>	
		 					<h4 class="h4 text-center py-2"> Designado como:  <?php echo $nomeCargoUsuario ?></h4>
		 					<!-- Parágrafos indicando informações do sistema -->
		 					<p class="p text-center pt-4"> Use os menus ao lado para acessar o sistema </p>
		 					<p class="p text-center"> Para mais informações, vá ao menu "Sobre o sistema" </p>				
		 				<!-- Encerramento da div que irá manter o tamanho da div para centralização -->
		 				</div>
					<!-- Encerramento da div que irá centralizar o conteúdo vertical e horizontal -->
					</div>

				<!-- Encerramento da div que irá conter o conteúdo do site -->
				</main>			
			<!-- Encerramento da div que irá conter o menu lateral e o conteudo do sistema -->
			</div>			

		<!-- Encerramento da div que irá cobrir toda a tela em questão de largura -->
		</div>

	</body>

<!-- Encerramento da tag de html -->
</html>