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

 			//Inicia a sessão nesse arquivo;
 			session_start();
 			//Atribui a variável da sessão para esta;
 			$action = $_SESSION['action']; 			

 			//Variável que recberá o vetor dos valores;
 			$cliente = array();
	 		$clienteLocalizacao = array();	 		
	 		$clienteCorrespondencia = array();

 			//Verificamos qual 
			if ( $action == "alterar" ) {

 				//Variável que recberá o vetor dos valores;
	 			$cliente = array();
	 			array_push($cliente, trim($_SESSION['identificadorCliente']));
	 			array_push($cliente, trim($_SESSION['razaoSocialCliente']));
	 			array_push($cliente, trim($_SESSION['tipoCliente']));
	 			array_push($cliente, trim($_SESSION['protocoloCliente']));
	 			array_push($cliente, trim($_SESSION['fantasiaCliente']));
	 			//array_push($cliente, trim($_SESSION['fundacaoCliente']));
	 			array_push($cliente, trim($_SESSION['diaFundacaoCliente']));
	 			array_push($cliente, trim($_SESSION['mesFundacaoCliente']));
	 			array_push($cliente, trim($_SESSION['anoFundacaoCliente']));

	 			//Variável que recberá o vetor dos valores;
	 			$clienteLocalizacao = array();
	 			array_push($clienteLocalizacao, trim($_SESSION['identificadorLocalizacao']));
	 			array_push($clienteLocalizacao, trim($_SESSION['cepLocalizacao']));
	 			array_push($clienteLocalizacao, trim($_SESSION['lougradouroLocalizacao']));
	 			array_push($clienteLocalizacao, trim($_SESSION['bairroLocalizacao']));
	 			array_push($clienteLocalizacao, trim($_SESSION['cidadeLocalizacao']));
	 			array_push($clienteLocalizacao, trim($_SESSION['estadoLocalizacao']));
	 			array_push($clienteLocalizacao, trim($_SESSION['caixaPostalLocalizacao']));
	 			array_push($clienteLocalizacao, trim($_SESSION['telefoneLocalizacao']));
	 			array_push($clienteLocalizacao, trim($_SESSION['emailLocalizacao']));
	 			array_push($clienteLocalizacao, trim($_SESSION['siteLocalizacao']));
	 			array_push($clienteLocalizacao, trim($_SESSION['contatoLocalizacao']));

	 			$clienteCorrespondencia = array();
	 			array_push($clienteCorrespondencia, trim($_SESSION['identificadorCorrespondencia']));
	 			array_push($clienteCorrespondencia, trim($_SESSION['cepCorrespondencia']));
	 			array_push($clienteCorrespondencia, trim($_SESSION['lougradouroCorrespondencia']));
	 			array_push($clienteCorrespondencia, trim($_SESSION['bairroLocalizacao']));
	 			array_push($clienteCorrespondencia, trim($_SESSION['cidadeCorrespondencia']));
	 			array_push($clienteCorrespondencia, trim($_SESSION['estadoCorrespondencia']));
	 			array_push($clienteCorrespondencia, trim($_SESSION['caixaPostalCorrespondencia']));
	 			array_push($clienteCorrespondencia, trim($_SESSION['telefoneCorrespondencia']));
	 			array_push($clienteCorrespondencia, trim($_SESSION['contatoCorrespondencia']));
 			}
 				 	 		
 			//Inicia o processo de configuração da página;
 			if ($action == 'novo') {

 				$tituloPage = "Inserir novo cliente";
 			} 
 			else if ($action == 'alterar') {

 				$tituloPage = "Alterar cliente";
 			}
 		?>

 		<!-- Abertura da div da row panel do login -->
 		<div class="row panelContainer d-flex justify-content-center justify-content-sm-center py-5">

 			<!-- Abertura para div de posicionamento do panel de login -->
 			<div class="col-sm-6 col-md-6 col-lg-4 col-xl-6 align-self-center">
 				 		
				<!-- Abertura para uma imagem com uma label do sistema -->
 				<div class="text-center mb-3">
 					<!-- Imagem ilustrativa do logo do software -->
 					<img class="img-fluid" src="assets/img/sys/image_top_cadastros_blue.png" width="100" height="100" alt="Logo da sessão de clientes" />
	 				<br> <br>
	 				<!-- Nome do software demonstrado abaixo da imagem -->
 					<label class="h3"> <?php echo $tituloPage ?> </label>
 					<!-- Abertura da div para alinhamento dos componentes destes botões -->
	 				<div class="row m-2">
	 					<!-- Abertura da div de configuração de tamanho desses componentes -->
	 					<div class="col-12 col-md-6 col-lg-6">

	 						<!-- Abertura do formulário de ação para direcionar o button para outra página -->
							<form action="cadastros.php" method="POST">

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
				<form class="mb-3" action="cadastro_processa.php" method="POST">
	 				<!-- Label de titulo para o grupo do formulário -->
	 				<label for="formGroupSede"> <h4 class="h4"> Informações da sede da empresa </h4> </label>
 					<!-- Abertura para este grupo de componentes desse formulário -->
 					<div class="form-group mb-3 p-2" id="formGroupSede" name="formGroupSede">

 						<input type="hidden" name="txtIdentificadorCliente" id="txtIdentificadorCliente" value="
 						<?php if (count($cliente) > 0) : echo $cliente[0] ?> <?php endif; ?>" />

 						<input type="hidden" name="txtIdentificadorLocalizacao" id="txtIdentificadorLocalizacao" value="
 						<?php if (count($clienteLocalizacao) > 0) : echo $clienteLocalizacao[0] ?> <?php endif; ?>" />

 						<input type="hidden" name="txtIdentificadorCorrespondencia" id="txtIdentificadorCorrespondencia" value="
 						<?php if (count($clienteCorrespondencia) > 0) : echo $clienteCorrespondencia[0] ?> <?php endif; ?>" />

 						<!-- Abertura da div para alinhamento dos componentes deste form group -->
 						<div class="row mb-2">
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-6 col-lg-6">

 								<!-- Titulo (label) para a informação do nome da razão social -->
		 						<label for="txtNomeSocial"> Nome (Razão Social): * </label>
		 						<!-- Caixa de texto para a informação do nome da razão social -->
		 						<input type="text" class="form-control" id="txtNomeSocial" name="txtNomeSocial" required 
		 						value="<?php if (count($clienteLocalizacao) > 0) : echo $cliente[1] ?><?php endif; ?>" /> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>

 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-6 col-lg-6">

 								<!-- Titulo (label) para a informação do nome fantasia -->
		 						<label for="txtNomeFantasia"> Nome Fantasia: </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtNomeFantasia" name="txtNomeFantasia" aria-describedby="emailHelp" placeholder="" 
		 						value="<?php if (count($clienteLocalizacao) > 0) : echo $cliente[4] ?><?php endif; ?>"/> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>
 						<!-- Encerramento da div para alinhamento dos componentes deste form group -->
 						</div>

 						<!-- Abertura da div para alinhamento dos componentes deste form group -->
 						<div class="row mb-2">	
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-6 col-lg-6">
 								
	 							<!-- Titulo (label) para a informação do tipo de pessoa -->
		 						<label for="txtTipoPessoa"> Tipo de Pessoa: * </label>
		 						<!-- Caixa de texto para a informação do tipo de pessoa -->
		 						<input type="text" class="form-control" id="txtTipoPessoa" name="txtTipoPessoa" maxlength="2" aria-describedby="pessoaHelp" 
		 							value="<?php if (count($clienteLocalizacao) > 0) : echo $cliente[2] ?><?php endif; ?>" required /> 
		 						<small id="pessoaHelp" class="form-text text-muted"> PF (Pessoa Física) ou PJ (Pessoa Juridica) </small>
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-6 col-lg-6">
 								
	 							<!-- Titulo (label) para a informação -->
		 						<label for="txtProtocolo"> CPF/CPNJ: * </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtProtocolo" name="txtProtocolo" aria-describedby="protocoloHelp" 
		 							value="<?php if (count($clienteLocalizacao) > 0):echo $cliente[3];?><?php endif; ?>" required /> 
		 						<small id="protocoloHelp" class="form-text text-muted"> PF (123.456.789-12) ou PJ (12.345.678/9123-45) </small>
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>
 						<!-- Encerramento da div para alinhamento dos componentes deste form group -->
 						</div> 	
 						

 						<!-- Abertura da div para alinhamento dos componentes deste form group -->
 						<div class="row mb-2">

 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12">
 								
 								<!-- Titulo (label) para a informação do tipo de pessoa -->
		 						<label for="groupDataFundacao"> Data da Fundação: </label>

	 							<div class="input-group" id="groupDataFundacao" name="groupDataFundacao">	 								

									<div class="input-group-prepend">
								    	<span class="input-group-text"> Dia/Mês/Ano </span>
								  	</div>
			 						<!-- Caixa de seleção para a escolha de uma data do sistema -->
			 						<select class="form-control" id="sltDiaFundacao" name="sltDiaFundacao" required>
								    	<option value=""> Selecione o dia </option>

								    	<?php 

								    		//Total de dias no ano;
								    		$dias = 31;
								    		//Repetidor para que a variável data receba do 1 ao 31 de opções no select;
								    		for ( $data = 1 ; $data <= $dias ; $data++ ) {	

									    		//Tratamento do número caso for inferior a 10;
									    		if ($data < 10) : $data = '0'.$data; endif;

									    		//Verifica se a ação atual do sistema virá dados do banco ou não;
									    		if ($action == "alterar") {
									    			//Caso vier, verifica-se se a data atual é a mesma informada pelo sistema;
									    			if ($data == $cliente[5]) {

									    				//Então, cria-se uma opção com a data de value e texto, porém, com opção de seleção ativa;
									    				?> <option value="<?php echo $data ?>" selected> <?php echo $data ?> </option>  <?php
									    			} else {

									    				//Se não, cria-se uma opção normal;
									    				?> <option value="<?php echo $data ?>"> <?php echo $data ?> </option> <?php
									    			}								
									    		}  	
									    		//Caso seja apenas ação de cadastro, cria-se uma opção normal;
									    		else 
									    		{						    		
								    	?>
										    		<!-- A data é transmitida como value e como texto ao usuário -->
										    		<option value="<?php echo $data ?>"> <?php echo $data ?> </option>	
								    	<?php
								    			//Encerra a comparação de insert/update
								    			} 
								    		//Encerra o loop
								    		}								    		
								    	?>
								    </select>

								  	<div class="input-group-prepend">
								    	<span class="input-group-text"> / </span>
								  	</div>
								  	<!-- Caixa de seleção para a escolha de uma data do sistema -->
			 						<select class="form-control" id="sltMesFundacao" name="sltMesFundacao" required>
								    	<option value=""> Selecione o mês </option>

								    	<?php 

								    		//Todos os mesês do ano;
								    		$meses = 12;
								    		//Repetidor para que o vetor de meses passe pelos 12 presentes ao ano;
								    		for ( $mes = 1 ; $mes <= $meses ; $mes++ ) {

									    		//Tratamento do número caso for inferior a 10;
									    		if ($mes < 10) : $mes = '0'.$mes; endif;  

								    			//Verifica se a ação atual do sistema virá dados do banco ou não;
									    		if ($action == "alterar") {
									    			//Caso vier, verifica-se se a data atual é a mesma informada pelo sistema;
									    			if ($mes == $cliente[6]) {

									    				//Então, cria-se uma opção com a data de value e texto, porém, com opção de seleção ativa;
									    				?> <option value="<?php echo $mes ?>" selected> <?php echo $mes ?> </option>  <?php
									    			} else {

									    				//Se não, cria-se uma opção normal;
									    				?> <option value="<?php echo $mes ?>"> <?php echo $mes ?> </option> <?php
									    			}								
									    		}  	
									    		//Caso seja apenas ação de cadastro, cria-se uma opção normal;
									    		else 
									    		{						    		
								    	?>
										    		<!-- A data é transmitida como value e como texto ao usuário -->
										    		<option value="<?php echo $mes ?>"> <?php echo $mes ?> </option>	
								    	<?php
								    			//Encerra a comparação de insert/update
								    			}
								    		//Encerra o looping
								    		}
								    	?>
								    </select>

								  	<div class="input-group-prepend">
								    	<span class="input-group-text"> / </span>
								  	</div>
								  	<input type="text" aria-label="First name" class="form-control" id="txtAnoFundacao" name="txtAnoFundacao" placeholder="Escreva o ano (0000)"
								  		value="<?php if (count($cliente) > 0) : echo $cliente[7] ?><?php endif; ?>"/> 
								</div> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>
 						<!-- Encerramento da div para alinhamento dos componentes deste form group -->
 						</div> 		
 					<!-- Encerramento para este grupo de componentes desse formulário -->
 					</div>

 					<!-- Label de titulo para o grupo do formulário -->
 					<label for="formGroupEndereco"> <h4 class="h4"> Informações da Localização da empresa </h4> </label>
 					<!-- Abertura para este grupo de componentes desse formulário -->
 					<div class="form-group mb-3 p-2" id="formGroupEndereco" name="formGroupEndereco">

 						<!-- Abertura da div para alinhamento dos componentes deste form group -->
 						<div class="row mb-2">

 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-4 col-lg-4">
 								
	 							<!-- Titulo (label) para a informação do cep -->
		 						<label for="txtCEPL"> CEP: * </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtCEPL" name="txtCEPL" aria-describedby="emailHelp" placeholder="" required 
		 							value="<?php if (count($clienteLocalizacao) > 0) : echo $clienteLocalizacao[1] ?><?php endif; ?>"/> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-8 col-lg-8">
 								
	 							<!-- Titulo (label) para a informação do endereco -->
		 						<label for="txtLougradouroL"> Endereco: * </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtLougradouroL" name="txtLougradouroL" aria-describedby="emailHelp" placeholder="" required value="<?php if (count($clienteLocalizacao) > 0) : echo $clienteLocalizacao[2] ?><?php endif; ?>" /> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>
 						<!-- Encerramento da div para alinhamento dos componentes deste form group -->
 						</div>

 						<!-- Abertura da div para alinhamento dos componentes deste form group -->
 						<div class="row mb-2">
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-4 col-lg-3">
 								
	 							<!-- Titulo (label) para a informação -->
		 						<label for="txtBairroL"> Bairro: * </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtBairroL" name="txtBairroL" aria-describedby="" placeholder="" required

		 						value="<?php if (count($clienteLocalizacao) > 0) : echo $clienteLocalizacao[3] ?><?php endif; ?>" /> 
			 				<!-- Encerramento da div de configuração de tamanho desses componentes -->
	 						</div>
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-8 col-lg-3">
 								
	 							<!-- Titulo (label) para a informação -->
		 						<label for="txtCidadeL"> Cidade: * </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtCidadeL" name="txtCidadeL" aria-describedby="" placeholder="" required

		 						value="<?php if (count($clienteLocalizacao) > 0) : echo $clienteLocalizacao[4] ?><?php endif; ?>" /> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-6 col-lg-3">
 								
	 							<!-- Titulo (label) para a informação -->
		 						<label for="txtEstadoL"> UF: * </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtEstadoL" name="txtEstadoL" aria-describedby="" placeholder="" required 
		 						value="<?php if (count($clienteLocalizacao) > 0) : echo $clienteLocalizacao[5] ?><?php endif; ?>"/> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-6 col-lg-3">
 								
	 							<!-- Titulo (label) para a informação -->
		 						<label for="txtCaixaPostalL"> Cx. Postal: </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtCaixaPostalL" name="txtCaixaPostalL" aria-describedby="" placeholder="" 

		 						value="<?php if (count($clienteLocalizacao) > 0) : echo $clienteLocalizacao[6] ?><?php endif; ?>"/> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div> 							
 						<!-- Encerramento da div para alinhamento dos componentes deste form group -->
 						</div>
 						<!-- Abertura da div para alinhamento dos componentes deste form group -->
 						<div class="row mb-2">
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-6 col-lg-6">
 								
 								<!-- Titulo (label) para a informação -->
		 						<label for="txtTelefoneL"> Telefone: * </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtTelefoneL" name="txtTelefoneL" aria-describedby="" placeholder="" required 

		 						value="<?php if (count($clienteLocalizacao) > 0) : echo $clienteLocalizacao[7] ?><?php endif; ?>"/> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->	 					
	 						</div>
 							
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-6 col-lg-6">
 								
	 							<!-- Titulo (label) para a informação -->
		 						<label for="txtEmailL"> Email:  </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtEmailL" name="txtEmailL" aria-describedby="" placeholder="" 

		 						value="<?php if (count($clienteLocalizacao) > 0) : echo $clienteLocalizacao[8] ?><?php endif; ?>"/> 
			 				<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div> 							
 						<!-- Encerramento da div para alinhamento dos componentes deste form group -->
 						</div> 
 						<!-- Abertura da div para alinhamento dos componentes deste form group -->
 						<div class="row mb-2">

 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-6 col-lg-6">
 								
	 							<!-- Titulo (label) para a informação -->
		 						<label for="txtSiteL"> Site:  </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtSiteL" name="txtSiteL" aria-describedby="" placeholder=""

		 						value="<?php if (count($clienteLocalizacao) > 0) : echo $clienteLocalizacao[9] ?><?php endif; ?>" /> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-6 col-lg-6">
 								
	 							<!-- Titulo (label) para a informação -->
		 						<label for="txtContatoL"> Contato:  </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtContatoL" name="txtContatoL" aria-describedby="" placeholder="" 

		 						value="<?php if (count($clienteLocalizacao) > 0) : echo $clienteLocalizacao[10] ?><?php endif; ?>"/> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>
 						<!-- Encerramento da div para alinhamento dos componentes deste form group -->
 						</div> 						
 					<!-- Encerramento para este grupo de componentes desse formulário -->
 					</div>

 					<!-- Label de titulo para o grupo do formulário -->
 					<label for="formGroupCorrespondência"> <h4 class="h4"> Informações de correspondência </h4> </label>
 					<!-- Abertura para este grupo de componentes desse formulário -->
 					<div class="form-group mb-3" id="formGroupCorrespondência" name="formGroupCorrespondência">

 						<!-- Abertura da div para alinhamento dos componentes deste form group -->
 						<div class="row mb-2">

 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-4 col-lg-4">
 								
	 							<!-- Titulo (label) para a informação -->
		 						<label for="txtCepC"> CEP: </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtCepC" name="txtCepC" aria-describedby="" placeholder="" 
		 						value="<?php if (count($clienteCorrespondencia) > 0) : echo $clienteCorrespondencia[1] ?><?php endif; ?>"/> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-8 col-lg-8">
 								
	 							<!-- Titulo (label) para a informação -->
		 						<label for="txtLougradouroC"> Endereco: </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtLougradouroC" name="txtLougradouroC" aria-describedby="" placeholder="" 
		 						value="<?php if (count($clienteCorrespondencia) > 0) : echo $clienteCorrespondencia[2] ?><?php endif; ?>"/> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>
 						<!-- Encerramento da div para alinhamento dos componentes deste form group -->
 						</div>

 						<!-- Abertura da div para alinhamento dos componentes deste form group -->
 						<div class="row mb-2">
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-6 col-lg-3">
 								
	 							<!-- Titulo (label) para a informação -->
		 						<label for="txtBairroC"> Bairro: </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtBairroC" name="txtBairroC" aria-describedby="" placeholder=""
		 						value="<?php if (count($clienteCorrespondencia) > 0) : echo $clienteCorrespondencia[3] ?><?php endif; ?>" /> 
			 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
	 							</div>
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-6 col-lg-3">
 								
	 							<!-- Titulo (label) para a informação -->
		 						<label for="txtCidadeC"> Cidade: </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtCidadeC" name="txtCidadeC" aria-describedby="" placeholder="" 
		 						value="<?php if (count($clienteCorrespondencia) > 0) : echo $clienteCorrespondencia[4] ?><?php endif; ?>"/> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-6 col-lg-3">
 								
	 							<!-- Titulo (label) para a informação -->
		 						<label for="txtEstadoC"> UF: </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtEstadoC" name="txtEstadoC" aria-describedby="" placeholder="" 
		 						value="<?php if (count($clienteCorrespondencia) > 0) : echo $clienteCorrespondencia[5] ?><?php endif; ?>"/> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div>
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-6 col-lg-3">
 								
	 							<!-- Titulo (label) para a informação -->
		 						<label for="txtCaixaPostalC"> Cx. Postal: </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtCaixaPostalC" name="txtCaixaPostalC" aria-describedby="" placeholder="" 
		 						value="<?php if (count($clienteCorrespondencia) > 0) : echo $clienteCorrespondencia[6] ?><?php endif; ?>"/> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div> 							
 						<!-- Encerramento da div para alinhamento dos componentes deste form group -->
 						</div>
 						<!-- Abertura da div para alinhamento dos componentes deste form group -->
 						<div class="row mb-2">
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-6 col-lg-6">
 								
	 							<!-- Titulo (label) para a informação -->
		 						<label for="txtTelefoneC"> Telefone: </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtTelefoneC" name="txtTelefoneC" aria-describedby="" placeholder="" 
		 						value="<?php if (count($clienteCorrespondencia) > 0) : echo $clienteCorrespondencia[7] ?><?php endif; ?>"/> 
		 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
 							</div> 		
 							<!-- Abertura da div de configuração de tamanho desses componentes -->
 							<div class="col-12 col-md-6 col-lg-6">
 								
	 							<!-- Titulo (label) para a informação -->
		 						<label for="txtContatoC"> Contato:  </label>
		 						<!-- Caixa de texto para a inserção da informação na memória após a ativação do post -->
		 						<input type="text" class="form-control" id="txtContatoC" name="txtContatoC" aria-describedby="" placeholder="" 
		 						value="<?php if (count($clienteCorrespondencia) > 0) : echo $clienteCorrespondencia[8] ?><?php endif; ?>"/> 
			 				<!-- Encerramento da div de configuração de tamanho desses componentes -->
	 						</div> 											
 						<!-- Encerramento da div para alinhamento dos componentes deste form group -->
 						</div>  
 					<!-- Encerramento para este grupo de componentes desse formulário -->
 					</div>

					<!-- Botão para ativação do formulário -->
					<input type="hidden" id="txtAcaoDetalhe" name="txtAcaoDetalhe" value="<?php echo $action; ?>">
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