<?php

	//Verificação se existe algum usuário logado para acesso desta página;
	include "identificacao_cargo.php";	
	
	/* 

	* Esta tela tem como intuito funcionar para cadastros e alterações, por isso...
	* é levado como critério qual dos botões foram clickados durante o processo;

	*/

	//Captura-se o identificador do cliente atual, sendo importante para a query;
	$clienteAtual = trim($_POST['txtIdentificadorCliente']);

	//Caso o botão para a inserção de um novo usuário tenha sido clickado...
	if ( isset( $_REQUEST['btnInserirRepresentante'] ) ) {

		//Console LOG (DEBUG);
		echo '<script> console.log("representante_detalhe/inserir") </script>';

		$action = "Inserir";

		$tituloPage = "Inserir um novo representante";
	}
	//Caso o botão para alteração de um usuário existente no sistema, tenha sido clickado...
	else
	if ( isset( $_REQUEST['btnAlterarRepresentante'] ) ) {

		//Console LOG (DEBUG);
		echo '<script> console.log("representante_detalhe/alterar") </script>';		
		//O conteúdo deste formulário será configurado para alteração de dados;
		$action = "Alterar";
		//Atribui o titulo da página por esta variável;
		$tituloPage = "Alterar representante";		

		//Atribuí-se os valores do representante atual:
		$identificadorRepresentante = $_POST['txtIdentificadorRepresentante'];
		$nomeRepresentante = trim($_POST['txtNomeRepresentante']);
		$nacionalidadeRepresentante = trim($_POST['txtNacionalidadeRepresentante']);
		$RGRepresentante = trim($_POST['txtRGRepresentante']);
		$CPFRepresentante = trim($_POST['txtCPFRepresentante']); 
		$profissaoRepresentante = trim($_POST['txtProfissaoRepresentante']);
		$cargoRepresentante = trim($_POST['txtCargoRepresentante']);
	}
?>

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
		<title> SCAMP: Formulário do Representante </title>
		
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
 	<body class="bodyPanel">
 		<!-- Abertura da div da row panel do login -->
 		<div class="row panelContainer d-flex justify-content-center justify-content-sm-center py-5" style="height: 100% !important;">

 			<!-- Abertura para div de posicionamento do panel de login -->
 			<div class="col-sm-6 col-md-6 col-lg-4 col-xl-6 align-self-center">
 				 		
				<!-- Abertura para uma imagem com uma label do sistema -->
 				<div class="text-center mb-3">
 					<!-- Imagem ilustrativa do logo do software -->
 					<img class="img-fluid" src="assets/img/sys/image_top_representantes_blue.png" width="100" height="100" alt="Logo da Ecofacil" />
	 				<br> <br>
	 				<!-- Nome do software demonstrado abaixo da imagem -->
 					<label class="h3"> <?php echo $tituloPage ?> </label>
 					<!-- Abertura da div para alinhamento dos componentes destes botões -->
	 				<div class="row m-2">
	 					<!-- Abertura da div de configuração de tamanho desses componentes -->
	 					<div class="col-12 col-md-6 col-lg-6">

	 						<!-- Abertura do formulário de ação para direcionar o button para outra página -->
							<form action="representantes.php" method="POST">

								<!-- Botão para voltar para a página anterior -->
	 							<button  class="btn btn-outline-danger btn-lg btn-block"> Voltar </button>
							<!-- Abertura do formulário de ação para direcionar o button para outra página -->
							</form>	
	 						
	 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
	 					</div>
	 					<!-- Abertura da div de configuração de tamanho desses componentes -->
	 					<div class="col-12 col-md-6 col-lg-6">

	 						<!-- Botão para limpar os dados dessa folha  -->
	 						<button type="button" class="btn btn-outline-dark btn-lg btn-block"> Limpar campos </button>
	 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
	 					</div>
	 				<!-- Encerramento da div para alinhamento dos componentes destes botões -->
	 				</div>	 					 		
 				<!-- Encerramento para uma imagem com uma label do sistema -->
 				</div>	

 				<!-- Abertura para o formulário de login a ser executado -->
					<form class="mb-3" action="representante_processa.php" method="POST">
	 				<!-- Label de titulo para o grupo do formulário -->
	 				<label for="formGroupSede"> <h4 class="h4"> Informações do requerente: </h4> </label> <br>
 					<!-- Abertura para este grupo de componentes desse formulário -->
 					<div class="form-group mb-3 p-2" id="formGroupSede" name="formGroupSede">
 						<!-- Abertura da div para alinhamento dos componentes deste form group -->
 						<div class="row mb-2">
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 mb-2">

 								<!-- Titulo (label) para a informação do nome da razão social -->
		 						<label for="txtNomeRepresentante"> Nome Requerente: * </label>
		 						<!-- Caixa de texto para a informação do nome da razão social -->
		 						<input type="text" class="form-control" id="txtNomeRepresentante" name="txtNomeRepresentante" aria-describedby="emailHelp" placeholder="" required
		 							value="<?php if ($action == "Alterar") : echo $nomeRepresentante; ?><?php endif; ?>" /> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12">
 								
	 							<!-- Titulo (label) para a informação do tipo de pessoa -->
		 						<label for="txtNacionalidadeRepresentante"> Nacionalidade:  </label>
		 						<!-- Caixa de texto para a informação do tipo de pessoa -->
		 						<input type="text" class="form-control" id="txtNacionalidadeRepresentante" name="txtNacionalidadeRepresentante" aria-describedby="emailHelp" placeholder="" 
		 						 	value="<?php if ($action == "Alterar") : echo $nacionalidadeRepresentante; ?><?php endif; ?>" /> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>	 							
 						<!-- Encerramento da div para alinhamento dos componentes deste form group -->
 						</div> 	
 						<!-- Abertura da div para alinhamento dos componentes deste form group -->
 						<div class="row mb-2">

 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12  mb-2 mb-2 col-md-6 col-lg-6">
 								
	 							<!-- Titulo (label) para a informação -->
		 						<label for="txtRGRepresentante"> RG: </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtRGRepresentante" name="txtRGRepresentante" aria-describedby="emailHelp" maxlength="13" 
		 							value="<?php if ($action == "Alterar") : echo $RGRepresentante; ?><?php endif; ?>" />
		 						<small id="txtRGRepresentanteTip" name="txtRGRepresentanteTip" class="form-text text-muted"> Formato: 12.345.678-9 </small>
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>

 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-6 col-lg-6">

 								<!-- Titulo (label) para a informação do nome fantasia -->
		 						<label for="txtCPFRepresentante"> CPF: </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtCPFRepresentante" name="txtCPFRepresentante" aria-describedby="emailHelp" placeholder="000.000.000-00" maxlength="14"
		 							value="<?php if ($action == "Alterar") : echo $CPFRepresentante; ?><?php endif; ?>" />
		 						<small id="txtCPFRepresentanteTip" name="txtCPFRepresentanteTip" class="form-text text-muted"> Formato: 123.456.789-12 </small>
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-6 col-lg-6">
 								
	 							<!-- Titulo (label) para a informação do tipo de pessoa -->
		 						<label for="txtProfissaoRepresentante"> Profissão: </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtProfissaoRepresentante" name="txtProfissaoRepresentante" aria-describedby="emailHelp" placeholder="" 
		 							value="<?php if ($action == "Alterar") : echo $profissaoRepresentante; ?><?php endif; ?>" /> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-6 col-lg-6">
 								
	 							<!-- Titulo (label) para a informação do tipo de pessoa -->
		 						<label for="txtCargoRepresentante"> Cargo: </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtCargoRepresentante" name="txtCargoRepresentante" aria-describedby="emailHelp" placeholder=""
		 							value="<?php if ($action == "Alterar") : echo $cargoRepresentante; ; ?><?php endif; ?>" /> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>
 						<!-- Encerramento da div para alinhamento dos componentes deste form group -->
 						</div> 			
 					<!-- Encerramento para este grupo de componentes desse formulário -->
 					</div>	 			
 					<input type="hidden" id="txtAcaoRepresentante" name="txtAcaoRepresentante" value="<?php echo $action; ?>">
 					<input type="hidden" id="txtIdentificadorCliente" name="txtIdentificadorCliente" value="<?php echo $clienteAtual; ?>">
 					<input type="hidden" id="txtIdentificadorRepresentante" name="txtIdentificadorRepresentante" value="<?php if ($action == "Alterar") : echo $identificadorRepresentante; ?><?php endif; ?>">
					<!-- Botão para ativação do formulário -->
					<button id="btnIniciarAutenticacao" name="btnIniciarAutenticacao" type="submit" class="btn btn-lg btn-block btn-outline-success"> <?php echo $tituloPage ?> </button>

 				<!-- Encerramento para o formulário de login a ser executado -->
 				</form>
 				
 			<!-- Encerramento para div de posicionamento do panel de login -->
 			</div>
 		<!-- Encerramento da div da row do panel do login -->
 		</div>
 	<!-- Encerramento da tag de body  -->
	</body>
<!-- Encerramento da tag de html -->
</html>