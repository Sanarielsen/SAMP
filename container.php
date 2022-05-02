<!-- Instancia o header do site -->
<?php require_once("header.php"); ?>
		
<!-- Configurações para o menu vertical -->
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
	//Verificação de qual opção do menu está selecionada...
	$activeMenu = "";
?>

<!-- Instancia o painel do site contendo o menu vertical -->
<?php require_once("painel.php"); ?>

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
<!-- Encerramento do corpo do site -->
</body>
<!-- Encerramento da tag de html -->
</html>