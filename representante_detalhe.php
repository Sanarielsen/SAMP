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
		<title> SHCP: Painel adminstrativo </title>
		
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

 		<?php

 			//Inicia-se a sessão para requisição de algumas variáveis;
 			session_start();

 			//Atribui-se a variável da sessão para esta;
 			$action = $action = $_SESSION['action']; 			
 			//Inicia o processo de configuração da página;
 			if ($action == 'novo') {

 				$tituloPage = "Inserir novo representante";
 				$nomeFantasiaCliente = $_SESSION['nomeFantasiaCliente'];
 			} 
 			else if ($action == 'alterar') {

 				$tituloPage = "Alterar representante";
 				$nomeFantasiaCliente = $_SESSION['nomeFantasiaCliente'];

 				$identificadorRepresentante = trim($_SESSION['identificadorRepresentante']); 
 				$nomeRepresentante = trim($_SESSION['nomeRepresentante']);
 				$rgRepresentante = trim($_SESSION['rgRepresentante']);
 				$cpfRepresentante = trim($_SESSION['cpfRepresentante']);
 				$profissaoRepresentante = trim($_SESSION['profissaoRepresentante']);
 				$cargoRepresentante = trim($_SESSION['cargoRepresentante']);
 				$nacionalidadeRepresentante = trim($_SESSION['nacionalidadeRepresentante']); 				
 			}

 			//Atribui-se a variável com o identificador 
 			$identificadorCliente = $_SESSION['identificadorCliente'];
 		?>

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
	 				<label for="formGroupSede"> <h5 class="h5"> Nome da empresa atual: <?php echo $nomeFantasiaCliente ?> </h5> </label>
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
		 							value="<?php if ($action == "alterar") : echo $nomeRepresentante; ?><?php endif; ?>" /> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12">
 								
	 							<!-- Titulo (label) para a informação do tipo de pessoa -->
		 						<label for="txtNacionalidadeRepresentante"> Nacionalidade:  </label>
		 						<!-- Caixa de texto para a informação do tipo de pessoa -->
		 						<input type="text" class="form-control" id="txtNacionalidadeRepresentante" name="txtNacionalidadeRepresentante" aria-describedby="emailHelp" placeholder="" 
		 						 	value="<?php if ($action == "alterar") : echo $nacionalidadeRepresentante; ?><?php endif; ?>" /> 
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
		 						<input type="text" class="form-control" id="txtRGRepresentante" name="txtRGRepresentante" aria-describedby="emailHelp" placeholder=""
		 							value="<?php if ($action == "alterar") : echo $rgRepresentante; ?><?php endif; ?>" /> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>

 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-6 col-lg-6">

 								<!-- Titulo (label) para a informação do nome fantasia -->
		 						<label for="txtCPFRepresentante"> CPF: </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtCPFRepresentante" name="txtCPFRepresentante" aria-describedby="emailHelp" placeholder="000.000.000-00"
		 							value="<?php if ($action == "alterar") : echo $cpfRepresentante; ?><?php endif; ?>" />
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-6 col-lg-6">
 								
	 							<!-- Titulo (label) para a informação do tipo de pessoa -->
		 						<label for="txtProfissaoRepresentante"> Profissão: </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtProfissaoRepresentante" name="txtProfissaoRepresentante" aria-describedby="emailHelp" placeholder="" 
		 							value="<?php if ($action == "alterar") : echo $profissaoRepresentante; ?><?php endif; ?>" /> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-6 col-lg-6">
 								
	 							<!-- Titulo (label) para a informação do tipo de pessoa -->
		 						<label for="txtCargoRepresentante"> Cargo: </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtCargoRepresentante" name="txtCargoRepresentante" aria-describedby="emailHelp" placeholder=""
		 							value="<?php if ($action == "alterar") : echo $cargoRepresentante; ; ?><?php endif; ?>" /> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>
 						<!-- Encerramento da div para alinhamento dos componentes deste form group -->
 						</div> 			
 					<!-- Encerramento para este grupo de componentes desse formulário -->
 					</div>	 			
 					<input type="hidden" id="txtAcaoRepresentante" name="txtAcaoRepresentante" value="<?php echo $action; ?>">
 					<input type="hidden" id="txtIdentificadorCliente" name="txtIdentificadorCliente" value="<?php echo $identificadorCliente; ?>">
 					<input type="hidden" id="txtIdentificadorRepresentante" name="txtIdentificadorRepresentante" value="<?php if ($action == "alterar") : echo $identificadorRepresentante; ?><?php endif; ?>">
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