<!-- Inicio do documento html5 -->
<!DOCTYPE HTML>
<!-- Abertura da tag de html -->
<html class="htmlPanel">

	<!-- Abertura da tag de head -->
	<head>

		<!-- Adaptação para elementos especiais -->
		<meta charset="utf-8">
		<!-- Tag para definição para uso em dispositivos mobiles -->
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- Tag para instanciar a imagem da aba do site -->
		<link rel="icon" type="imagem/png" href="assets/img/sys/ico_header.png" />
		<!-- Tag para dar titulo a aba do site -->
		<title> SCAMP: Sobre o sistema </title>
		
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

	<!-- Sessão de verificação se existe um usuário logado e quais seus poderes -->
	<?php 

		//Verificação se existe algum usuário logado para acesso desta página;
		include "identificacao_cargo.php";
	?>	

 	<!-- Abertura da tag de body -->
 	<body style="height: 100%; overflow: auto;">

 	<!-- Abertura da div que irá cobrir toda a tela em questão de largura -->
	<div class="container-fluid p-0" style="height: 100% !important"> 		

		<!-- Menu horizontal a ser utilizado quando a resolução for pequena ou ultra pequena -->
			<nav class="navbar navbar-light bg-light d-flex d-lg-none">
				<!-- Zona de titulo do menu -->
				<!-- Conjunto com o icone e o nome -->
				<a class="my-2 navbar-brand" href="#">
					<!-- Icone EcoFacil -->
					<img class="img-fluid mx-auto d-block" src="assets/img/sys/ico_header.png" width="100" height="140" alt="">
				</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<!-- NAV BAR quando a resolução for pequena -->
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<!-- Lista de opções do menu iniciada -->
					<ul class="navbar-nav mr-auto">
						<!-- item 1 -->
						<li class="nav-item">
							<a class="nav-link" href="http://localhost/SCAMPV1/cadastros.php"> Cadastros </a>
						</li>
						<!-- item 2 -->
						<li class="nav-item">
							<a class="nav-link" href="http://localhost/SCAMPV1/representantes.php"> Representantes </a>
						</li>
						<!-- item 3 -->
						<li class="nav-item">
							<a class="nav-link" href="http://localhost/SCAMPV1/sobresys.php"> Sobre o sistema </a>
						</li>				
						<!-- item 4-->
						<li class="nav-item">
							<a class="nav-link" href="http://localhost/SCAMPV1/relatorioBugs.php"> Relatar Bug </a>
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
			            	<!-- Item 1 - Sobre o sistema -->
				            <li class="nav-item">
				                <a class="nav-link text-primary" href="http://localhost/SCAMPV1/sobresys.php">
				                 <img src="assets/img/sys/ico_menu_item_sobreosistema_colorblue.png" width="24" height="24" /> 
				                  Sobre o sistema
				                </a>
				            </li>
				            <!-- Item 3 - Sair -->
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
			<main class="col-md-12 col-lg-10 justify-content-center" role="main">

				<!-- Abertura da div que irá centralizar o conteúdo vertical e horizontal -->
				<div class="row panelContainer d-flex justify-content-center justify-content-sm-center" style="height: 100% !important;">
					
					<!-- Abertura da div que irá manter o tamanho da div para centralização -->
	 				<div class="col-12 align-self-center">

						<div class="row mb-5">

							<div class="col-sm-6 col-md-6 col-lg-6 text-center">

								<!-- Icone do sistema -->
								<img class="img-fluid mx-auto my-2 d-block" src="assets/img/sys/ico_header.png" width="100" height="140" alt="Icone do sistema">
								<!-- Titulo do software e versão respectiva -->
								<h3 class="h3"> SCAMP V1.0.0 </h3>
								<p class="p"> Sistema de Controle e Acompanhamento de Marcas e Patentes </p> 
								<!-- Notas de atualização do software -->
								<h5 class="h5"> <a href="#"> Notas de atualização </a> </h5> 
								<!-- Manual do usuário acompanhado com as atualizações -->
								<h5 class="h5"> <a href="#"> Manual do usuário </a> </h5> 				
							</div>

							<div class="col-sm-6 col-md-6 col-lg-6 text-center">
								<!-- Icone do desenvolvedor -->
								<img class="img-fluid mx-auto my-2 d-block" src="assets/img/sys/ico_header.png" width="100" height="140" alt="Icone do sistema">
								<!-- Nome do desenvolvedor e redirecionamento a sua homepage -->					
								<h3 class="h3"> Desenvolvido por: <a href="#"> SHDEV </a> </h3> 

								<!-- <h5 class="h5"> <a href="#"> Verificar se há atualizações </a> </h5>  -->
								<h5 class="h5"> Última atualização: 02/09/2018 </h5>
							</div>
						</div>									
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