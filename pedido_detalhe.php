<!-- Instancia o header do site -->
<?php require_once("header.php"); ?>

<!-- Verificação se existe algum usuário logado e de acesso -->
<?php
	
	//Verificação se existe algum usuário logado para acesso desta página;
	include "identificacao_cargo.php";
	//Variável que irá conter a estrutura para liberação ou bloqueio desta pagina;
	$permissionUser;
	//Variável que irá conter a permissão para recebimento de informações do form solicitante;
	$uploadInfo = false;
	//Inicia-se a verificação se houve requisição via button;
	if ( isset($_POST['txtAcaoPedido']) && !empty($_POST['txtAcaoPedido']) ) {

		//Mensagem via console;
		echo "<script> console.log('pedido_detalhe/acessoConcedido'); </script>";
		//Recebe-se a variável que contém o método a ser executado nessa sessão;
		$action = $_POST['txtAcaoPedido'];
		//Recebe-se a variável que contém o identificador do cliente
		$identificadorCliente = $_POST['txtPedidoIdentificadorCliente'];
		//Recebe-se a variável que contém o nome da empresa do cliente
		$nomeEmpresaCliente = $_POST['txtPedidoNomeFantasiaCliente'];
		//Recebe-se a variável que contém o protocolo do cliente
		$protocoloCliente = $_POST['txtPedidoProtocoloCliente'];
		//Verifica se o método a ser executado tem haver com novo pedido...
 		if ($action == 'novo') {

 			//O cabeçalho recebe o titulo que envolve o método;
 			$tituloPage = "Inserir novo pedido";
 			//Permite o acesso da página ao usuário;
 			$permissionUser = true;
 		}
 		//Caso contrário, verifica se o método a ser executado tem haver com alteração de um novo pedido; 
 		else if ($action == 'alterar') {

 			//O cabeçalho recebe o titulo que envolve o método;
 			$tituloPage = "Alterar pedido";
 			//Recebe o identificador do pedido;
 			$identificadorPedido = $_POST['txtPedidoIdentificador'];
 			//Recebe a descrição do pedido
 			$descricaoPedido = $_POST['txtPedidoDescricao'];
 			//Recebe a observação do pedido;
 			$observacaoPedido = $_POST['txtPedidoObservacao'];
 			//Recebe a data do pedido;
 			$dataPedido = $_POST['txtPedidoDataCriacao'];
 			//Permite o envio de informações para o pedido_processa;
 			$uploadInfo = true;
 			//Permite o acesso da página ao usuário;
 			$permissionUser = true;
 		}	
 		//E por fim, se não for nenhum dos dois, é um erro de redirecionamento;
 		else {

 			//Cancela ou mantém a permissão negada de acesso;
 			$permissionUser = false;
 		}
	}
	else {

		//Mensagem via console;
		echo "<script> console.log('pedido_detalhe/acessoNegado'); </script>";
		//Cancela ou mantém a permissão negada de acesso;
 		$permissionUser = false;
	}	

?>

<!-- Validação final para exibição ou bloqueio desta tela -->
<?php 
	
	//Caso o passe esteja verdadeiro, ou seja, a passagem liberada;
	if ($permissionUser) {

		//Inicia o carregamento da página na parte abaixo;
?>	
		<!-- Abertura da tag de body -->
	 	<body class="bodyPanel">

	 		<!-- Abertura da div da row panel do login -->
	 		<div class="row panelContainer d-flex justify-content-center justify-content-sm-center py-5">

	 			<!-- Abertura para div de posicionamento do panel de login -->
	 			<div class="col-sm-6 col-md-6 col-lg-4 col-xl-6 align-self-center">
	 				 		
					<!-- Abertura para uma imagem com uma label do sistema -->
	 				<div class="text-center mb-3">
	 					<!-- Imagem ilustrativa do logo do software -->
	 					<img class="img-fluid" src="assets/img/sys/image_top_pedido_blue.png" width="100" height="100" alt="Logo da sessão de cadastro de pedido" />
		 				<br> <br>
		 				<!-- Nome do software demonstrado abaixo da imagem -->
	 					<label class="h3"> <?php echo $tituloPage ?> </label>
	 					<!-- Abertura da div para alinhamento dos componentes destes botões -->
		 				<div class="row m-2">
		 					<!-- Abertura da div de configuração de tamanho desses componentes -->
		 					<div class="col-12 col-md-6 col-lg-6">

		 						<!-- Abertura do formulário de ação para direcionar o button para outra página -->
								<form action="pedidos.php" method="POST">

									<!-- Botão para voltar para a página anterior -->
		 							<button class="btn btn-outline-danger btn-lg btn-block"> Voltar </button>
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
					<form class="mb-3" action="pedido_processa.php" method="POST">
		 				<!-- Label de titulo para a página -->
		 				<label for="formGroupPedido"> <h4 class="h4"> Informações do pedido: </h4> </label> <br>
		 				<!-- Label para consulta da empresa que foi selecionada  -->
		 				<label for="formGroupPedido"> <h5 class="h5"> Nome da empresa atual: <?php echo $nomeEmpresaCliente . " | " . $protocoloCliente; ?> </h5> </label> <br>
		 				<!-- Label que conterá o id do pedido atual (no caso de alteração) -->
		 				<input type="hidden" name="txtPedidoIdentificador" id="txtPedidoIdentificador" 
		 					value="<?php if ( $uploadInfo ) : echo $identificadorPedido ?><?php endif; ?>"/>
	 					<!-- Label que conterá a data da criação (no caso de alteração) -->
		 				<input type="hidden" name="txtPedidoDataCriacao" id="txtPedidoDataCriacao" 
		 					value="<?php if ( $uploadInfo ) : echo $dataPedido ?><?php endif; ?>"/>
	 					<!-- Abertura para este grupo de componentes desse formulário -->
	 					<div class="form-group mb-3 p-2" id="formGroupPedido" name="formGroupPedido">	

	 						<!-- Abertura da div para alinhamento dos componentes deste form group -->
	 						<div class="row mb-2">

	 							<!-- Abertura da div de configuração de tamanho desses componentes -->
	 							<div class="col-12">
	 								
		 							<!-- Cria-se uma label para informação do campo que vem a seguir -->
									<label for="txtPedidoServico"> Serviço: *</label>
									<!-- Cria-se uma área de texto para inserção das informações -->
									<textarea class="form-control" name="txtPedidoServico" id="txtPedidoServico" rows="3" 
										value="<?php if ( $uploadInfo ) : echo $descricaoPedido ?><?php endif; ?>" required><?php if ( $uploadInfo ) : echo $descricaoPedido ?><?php endif; ?></textarea> 
			 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
	 							</div> 												
	 						<!-- Encerramento da div para alinhamento dos componentes deste form group -->
	 						</div>

	 						<!-- Abertura da div para alinhamento dos componentes deste form group -->
	 						<div class="row mb-2">

	 							<!-- Abertura da div de configuração de tamanho desses componentes -->
	 							<div class="col-12">
	 								
		 							<!-- Cria-se uma label para informação do campo que vem a seguir -->
									<label for="txtPedidoObservacao"> Observação: *</label>
									<!-- Cria-se uma área de texto para inserção das informações -->
									<textarea class="form-control" name="txtPedidoObservacao" id="txtPedidoObservacao" rows="3" 
										value="<?php if ( $uploadInfo ) : echo $observacaoPedido ?><?php endif; ?>" required><?php if ( $uploadInfo ) : echo $observacaoPedido ?><?php endif; ?></textarea> 
			 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
	 							</div> 												
	 						<!-- Encerramento da div para alinhamento dos componentes deste form group -->
	 						</div> 	
	 					<!-- Encerramento deste grupo de componentes desse formulário  -->
	 					</div>

	 					<!-- Verificação se esta validação do método atual... só será exibido no cadastramento se é necessário a criação dos valores de imediato -->
	 					<?php if ( $action == "novo" ) : ?>

		 					<!-- Abertura para este grupo de componentes desse formulário -->
		 					<div class="form-group mb-3 p-2" id="formGroupPedido" name="formGroupPedido">

		 						<!-- Abertura da div para alinhamento dos componentes deste form group -->
		 						<div class="row mb-2">

		 							<!-- Abertura da div de configuração de tamanho desses componentes -->
		 							<div class="col-12">

		 								<!-- Abertura do grupo de input component -->
				 						<div class="input-group mb-3">

				 							<!-- Abertura da div de configuração para fundo juntado - LABEL -->
											<div class="input-group-prepend">
												<!-- Abertura do componente de label para a caixa de seleção -->
											   	<div class="input-group-text"> 
											   		Cadastrar um ou mais pagamento após o cadastro? 							
												<!-- Encerramento do componente de label para a caixa de seleção -->
												</div>
											<!-- Fechamento da div de configuração para fundo juntado - LABEL -->    					
											</div>

				 							<!-- Abertura da div de configuração para fundo juntado - CHECKBOX -->
				 							<div class="input-group-prepend">
				 								<!-- Abertura para a grupo da caixa de seleção -->
											    <div class="input-group-text">
											    	<!-- Caixa de seleção para sinalizar se um novo pagamento será realizado após o cadastro -->
											      	<input type="checkbox" id="cbxPagamentoAgora" name="cbxPagamentoAgora" aria-label="Realizar o pagamento após o cadastro do pedido?">
											    <!-- Fechamento para a grupo da caixa de seleção -->
											    </div>
											<!-- Fechamento da div de configuração para fundo juntado - CHECKBOX -->
											</div>										
				 						<!-- Fechamento do grupo de input component -->
				 						</div>
		 							<!-- Encerramento da div de configuração de tamanho desses componentes -->
		 							</div>
		 						</div>	 						
		 					<!-- Encerramento deste grupo de componentes desse formulário  -->
		 					</div>
		 				<!-- Verificação se esta validação do método atual... só será exibido no cadastramento se é necessário a criação dos valores de imediato -->
	 					<?php endif; ?>

	 					<?php /*
	 					
	 					<!-- Label de titulo para o grupo do formulário -->
			 			<label for="formGroupPagamento"> <h4 class="h4"> Informações de pagamento </h4> </label>
	 					<!-- Abertura para este grupo de componentes desse formulário -->
	 					<div class="form-group mb-3 p-2" id="formGroupPagamento" name="formGroupClasse">	

	 						<!-- Abertura da div para alinhamento dos componentes deste form group -->
	 						<div class="row mb-2">

	 							<!-- Abertura da div de configuração de tamanho desses componentes -->
	 							<div class="col-12 col-sm-4">
	 								
		 							<!-- Titulo (label) para a informação do tipo de pessoa -->
			 						<label for="groupTextField[2]"> Método de pagamento: * </label>
			 						<!-- Caixa de seleção para a escolha de uma data do sistema -->
			 						<select class="form-control" id="groupTextField[2]" name="groupTextField[2]" required>
								    	<option value=""> Selecione aqui... </option>
								    	<option value="1"> Cartão </option>
								   		<option value="2"> Moeda </option>
								    	<option value="3"> Depósito </option>							    
								    </select>	
			 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
	 							</div>

	 							<!-- Abertura da div de configuração de tamanho desses componentes -->
	 							<div class="col-12 col-sm-4">
	 								
		 							<!-- Titulo (label) para a informação do tipo de pessoa -->
			 						<label for="groupTextField[3]"> Valor Total: * </label>
			 						<!-- Caixa de texto para a informação do nome da razão social -->
			 						<input type="text" class="form-control" id="groupTextField[3]" name="groupTextField[3]" aria-describedby="emailHelp" placeholder="" required /> 	
			 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
	 							</div>

	 							<!-- Abertura da div de configuração de tamanho desses componentes -->
	 							<div class="col-12 col-sm-4">
	 								
		 							<!-- Titulo (label) para a informação do tipo de pessoa -->
			 						<label for="groupTextField[4]"> Valor por parcela:  </label>
			 						<!-- Caixa de texto para a informação do nome da razão social -->
			 						<input type="text" class="form-control" id="groupTextField[4]" name="groupTextField[4]" aria-describedby="emailHelp" placeholder="" /> 	
			 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
	 							</div>												
	 						<!-- Encerramento da div para alinhamento dos componentes deste form group -->
	 						</div>

	 						<!-- Abertura da div para alinhamento dos componentes deste form group -->
	 						<div class="row mb-2">

	 							<!-- Abertura da div de configuração de tamanho desses componentes -->
	 							<div class="col-12 col-sm-6">
	 								
		 							<!-- Titulo (label) para a informação do tipo de pessoa -->
			 						<label for="groupTextField[5]"> Valor da entrada:  </label>
			 						<!-- Caixa de texto para a informação do nome da razão social -->
			 						<input type="text" class="form-control" id="groupTextField[5]" name="groupTextField[5]" aria-describedby="emailHelp" placeholder="" /> 		
			 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
	 							</div>
	 								
	 							<!-- Abertura da div de configuração de tamanho desses componentes -->
	 							<div class="col-12 col-sm-6">
	 								
		 							<!-- Titulo (label) para a informação do tipo de pessoa -->
			 						<label for="groupTextField[6]"> Data da entrada:  </label>
			 						<!-- Caixa de texto para a informação do nome da razão social -->
			 						<input type="text" class="form-control" id="groupTextField[6]" name="groupTextField[6]" aria-describedby="emailHelp" placeholder="" /> 	
			 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
	 							</div>											
	 						<!-- Encerramento da div para alinhamento dos componentes deste form group -->
	 						</div>					
	 					<!-- Encerramento deste grupo de componentes desse formulário  --> 
	 					</div>

	 					*/?>

	 					<!-- Label oculta que carrega o texto que faz referência ao processo a ser executado -->
						<input type="hidden" id="txtAcaoPedido" name="txtAcaoPedido" value="<?php echo $action; ?>">
						<!-- Label oculta para transmissão do identificador do cliente atual -->
						<input type="hidden" name="txtIdentificadorCliente" id="txtIdentificadorCliente" value="<?php echo $identificadorCliente; ?>">
						<!-- Botão para ativação do formulário -->
						<button id="btnIniciarProcesso" name="btnIniciarProcesso" type="submit" class="btn btn-lg btn-block btn-outline-success"> <?php echo $tituloPage ?> </button>

	 				<!-- Encerramento para o formulário de login a ser executado -->
	 				</form>					 		
	 			<!-- Encerramento para div de posicionamento do panel de login -->
	 			</div>
	 		<!-- Encerramento da div da row do panel do login -->
	 		</div>
	 	<!-- Encerramento da tag de body  -->
		</body>
<?php

	//Caso contrário, redirecione o usuário para o inicio dessa sessão;
	} else {

		//Redirecionamento para a tela inicial com a mensagem de informação;
		echo "
		<script>  
			alert('Redirecionameto incorreto! Voltando para o início da sessão...');
			location.href='pedidos.php';
		</script>";
?>

<?php } ?>

<!-- Encerramento da tag de html -->
</html>