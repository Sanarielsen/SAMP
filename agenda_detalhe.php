<!-- Instancia o header do site -->
<?php require_once("header.php"); ?>

<!-- Procedimento para ativação/preenchimento da barra de representantes -->
<script>

	console.log("Script para o gatilho de pesquisa e ativação da combobox de representantes");

</script>

<!-- Instancia as configurações e verificações do usuário logado -->
<?php include "identificacao_cargo.php"; ?>

<!-- Instancia as configurações para as comboBox -->
<?php 

	//Instancia os campos do tipo da conferência;
	$tipoConferenciaFields = array("Presencial", "A Distância");
	//Instancia os campos do estado da conferência;
	$estadoConferenciaFields = array("Pendente", "Em Andamento", "Encerrada");
	
?>

<!-- Procedimento para preenchimento da cbxClientes -->
<?php 

	//Importa as configurações para conexão com o banco de dados;
	require("ConnectionMYSQL/connection.php");
	//Importa o objeto do cliente
	require("ObjetoTransferencia/cliente.php");
	//Importa a camada de negócios dos clientes
	require("Negocios/clienteNegocios.php");

	//Instancia-se a camada de negócios dos clientes;
	$clienteNegocios = new ClienteNegocios();
	//Executa o procedimento para buscar os clientes cadastrados para uma combobox;
	$clientes = $clienteNegocios->consultarClientesCadastrados();	
?>

<!-- Procedimento para verificação da ação a ser executada -->
<?php 

	//Importa o objeto do cliente
	require("ObjetoTransferencia/conferencia.php");
	//Importa a camada de negócios dos clientes
	require("Negocios/conferenciaNegocios.php");
	//Variável que irá receber as informações da conferência, caso haja alguma requisição de consulta;
	$conferenciaAtual = array();
	//Variável que irá receber os representantes atuais do cliente selecionado vindo de uma requisição do banco;
	$clienteRepresentantes = array();
	//Verifica qual botão foi acionado para este formulário...
	//Caso tenha sido para inserção;
	if ( isset($_REQUEST['btnInserirConferencia']) ) {

		//Informa ao console o resultado da operação;
		echo '<script> console.log("agenda_detalhe/inserir"); </script>';
		//Atribuí o titulo da página;
		$tituloPage = "Inserir nova tarefa";
		//Atribuí o action a ser executado;
		$action = "inserir";
	}
	//Caso tenha sido para alteração;
	else 
	if (isset($_REQUEST['btnAlterarConferencia'])) {

		//Informa ao console o resultado da operação;
		echo '<script> console.log("agenda_detalhe/alterar"); </script>';
		//Atribuí o titulo da página;
		$tituloPage = "Alterar tarefa";
		//Atribuí o action a ser executado;
		$action = "alterar";
		//Instancia os métodos para execução do banco de dados;
		$conferenciaNegocios = new ConferenciaNegocios();
		//Inicia-se uma execução para consulta de uma conferência pelo identificador;
		$conferenciaAtual = $conferenciaNegocios->consultarConferenciaPeloID($_POST['idConferencia']);				

		//É necessário alguns cuidados com o dia e o mês para visualização no sistema;

		//Armazena a data da conferencia consultada no servidor;
		$dataConferenciaAtual = $conferenciaAtual['dataConferencia'];

		//Instancia-se os métodos e funções de configurações;
		require("functions.php");
		//Captura a data atual focando-se apenas no dia (Formato Mysql)
		$diaConferencia = getDay($dataConferenciaAtual);
		//Captura a data atual focando-se apenas no mês (Formato Mysql)		
		$mesConferencia = getMonth($dataConferenciaAtual);		
		//Captura a data atual focando-se apenas no ano (Formato Mysql)
		$anoConferencia = getYear($dataConferenciaAtual);		
		//Captura a hora atual (Formato Mysql)
		$horaConferencia = getHour($dataConferenciaAtual);		
		//Captura os minutos atual (Formato Mysql)
		$minutoConferencia = getMinute($dataConferenciaAtual);		
		
		//Será necessário o carregamento dos registros dos representantes;
		
		//Importa a camada de negócios dos representantes;
		require("Negocios/representanteNegocios.php");
		//Instancia-se os métodos/procedimentos dos representantes;		
		$representanteNegocios = new RepresentanteNegocios();
		//Inicia-se o procedimento para consulta dos parâmetros do representante;
		$resultRepresentantes = $representanteNegocios->consultarRepresentantesPeloCriterio($conferenciaAtual['identificadorCliente']);
	}
?>

	<!-- Abertura da tag de body -->
	<body class="bodyPanel">

		<!-- Abertura da div da row panel do login -->
		<div class="row panelContainer d-flex justify-content-center justify-content-sm-center py-5" style="height: 100% !important;">

			<!-- Abertura para div de posicionamento do panel de login -->
			<div class="col-sm-6 col-md-6 col-lg-4 col-xl-6 align-self-center">
				 		
			<!-- Abertura para uma imagem com uma label do sistema -->
				<div class="text-center mb-3">
					<!-- Imagem ilustrativa do logo do software -->
					<img class="img-fluid" src="assets/img/sys/ico_menu_item_agenda_colorblue.png" width="100" height="100" alt="Logo" />
 				<br> <br>
 				<!-- Nome do software demonstrado abaixo da imagem -->
					<label class="h3"> <?php echo $tituloPage ?> </label>

					<p id="demo"> </p>
					<!-- Abertura da div para alinhamento dos componentes destes botões -->
 				<div class="row m-2">
 					<!-- Abertura da div de configuração de tamanho desses componentes -->
 					<div class="col-12 col-md-6 col-lg-6">

 						<!-- Abertura do formulário de ação para direcionar o button para outra página -->
						<form action="agenda.php" method="POST">

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
				<form class="mb-3" action="agenda_processa.php" method="POST">
 				<!-- Label de titulo para a página -->
 				<label for="formGroupTarefa"> <h4 class="h4"> Informações da tarefa: </h4> </label> <br>
					<!-- Abertura para este grupo de componentes desse formulário -->
					<div class="form-group mb-3 p-2" id="formGroupTarefa" name="formGroupTarefa">
						<!-- Abertura da div para alinhamento dos componentes deste form group -->
						<div class="row mb-2">
							<!-- Abertura da div de configuração de tamanho desses componentes -->
							<div class="col-12 col-sm-6">

								<!-- Titulo (label) para a informação do nome da razão social -->
		 						<label for="cbxClienteConferencia"> Cliente: * </label>
		 						<!-- Caixa de seleção para a escolha de uma data do sistema -->
		 						<select class="form-control" id="cbxClienteConferencia" name="cbxClienteConferencia" required>		 														    	

		 							<!-- Verifica se existe algum resultado de cliente retornado para o banco de dados -->
							    	<?php if (count($clientes) > 0) : ?>							    		

							    		<option value=""> Selecione um cliente cadastrado... </option>

							    		<!-- Inicia um loop para preenchimento das opçoes da combobox -->
							    		<?php for ($i = 0; $i < count($clientes); $i++) { ?>

							    			<!-- Inicio da verificação se existe algum resultado proveniente do servidor e se a opção atual é a qual veio de lá -->
	 										<?php if ( ($conferenciaAtual['identificadorCliente'] == $clientes[$i]["identificador"]) )  : ?>

								    			<option value="<?php echo $clientes[$i]["identificador"] ?>" selected> <?php echo $clientes[$i]["nomeFantasiaCliente"] ?> - <?php echo $clientes[$i]["protocoloCliente"] ?> </option>									    			
								    		
								    		<!-- Caso contrário, retornará apenas o seu conteúdo -->
	 										<?php else: ?>						    	

	 											<!-- Opção para a combobox -->
	 											<option value="<?php echo $clientes[$i]["identificador"] ?>"> <?php echo $clientes[$i]["nomeFantasiaCliente"] ?> - <?php echo $clientes[$i]["protocoloCliente"] ?> </option>

	 										<!-- Encerramento da verificação se existe algum resultado proveniente do servidor e se a opção atual é a qual veio de lá -->
	 										<?php endif; ?>

								    	<?php } ?>

							    	<?php else: ?>

							    		<option value=""> Nenhum cliente cadastrado... </option>

									<?php endif; ?>						    		
							    </select>	

	 						<!-- Encerramento da div de configuração de tamanho desses componentes -->
							</div>
							<!-- Abertura da div de configuração de tamanho desses componentes -->
							<div class="col-12 col-sm-6">
								
	 							<!-- Titulo (label) para a informação do tipo de pessoa -->
		 						<label for="cbxRepresentanteConferencia"> Representante: * </label>
		 						<!-- Caixa de seleção para a escolha de uma data do sistema -->
							    <select class="form-control" id="cbxRepresentanteConferencia" name="cbxRepresentanteConferencia" required> 
							    	<!-- Verifica se a função atual é de alteração de usuário -->
							    	<?php if ( $action == "alterar" ) : ?>

							    		<!-- Isso é feito por causa do "cascade" que funciona baseado na alteração de uma comboBox anterior, ou seja
							    		na situação atual, nenhuma poderá ser alterada pois estamos na fase de leitura do código, por isso, caso haja
							    		registros pré-definidos da empresa que são seus representantes, deve se fazer a consulta deles durante esse processo,
							    		já que foi descoberto que o "cascade" subescreve os registros anteriores desta combobox caso a anterior seja alterada -->

							    		<!-- Verifica a quantidade de registros retornados -->
							    		<?php if ( count($resultRepresentantes) > 0) : ?>

							    			<!-- Inicio do sistema de repetição para percorrer todas as opções criadas dentro do vetor do tipo conferência -->
	 										<?php for ($i = 0; $i < count($resultRepresentantes); $i++) { ?>

	 											<!-- Esta opção recebe como valor o identificador do representante, enquanto no visual será demostrado o nome do representante correspondente -->
	 											<option value="<?php echo $resultRepresentantes[$i]['identificador']; ?>"> <?php echo $resultRepresentantes[$i]['nomeRepresentante'] ?> </option>	
											<!-- Encerramento do sistema de repetição para percorrer todas as opções criadas dentro do vetor do tipo conferência -->
	 										<?php } ?>	 	 																		    								    		

	 									<!-- Encerramento da verificação da quantidade de registros -->
							    		<?php endif; ?>
							    	<!-- Encerramento da verificação da ação atual a ser executada -->
							    	<?php endif; ?>
								</select>

								<script type="text/javascript">
								    $(document).ready(function() {
								        $('#cbxClienteConferencia').cascade({
								                source: "agenda_pesquisa_representante.php",
								                cascaded: "cbxRepresentanteConferencia",
								                extraParams: { identificador: function(){ return $('#cbxClienteConferencia').val();  } },
								                dependentLoadingLabel: "Carregando representantes ...",
								                dependentNothingFoundLabel: "Não existem representantes",
								                dependentStartingLabel: "Selecione o cliente",
								        });     
								    });
								</script>
	 						<!-- Encerramento da div de configuração de tamanho desses componentes -->
							</div>							
						<!-- Encerramento da div para alinhamento dos componentes deste form group -->
						</div>

						<div class="row mb-2">

							<!-- Abertura da div de configuração de tamanho desses componentes -->
							<div class="col-12 col-sm-6">
								
 							<!-- Titulo (label) para a informação do tipo de pessoa -->
	 						<label for="cbxTipoConferencia"> Tipo de conferência: * </label>
	 						<!-- Caixa de seleção para a escolha de uma data do sistema -->
	 						<select class="form-control" id="cbxTipoConferencia" name="cbxTipoConferencia" required>

	 							<!-- Opção padrão criada apenas para informação por não conter um value -->
	 							<option value=""> Selecione o tipo da conferencia... </option>

	 							<!-- Inicio do sistema de repetição para percorrer todas as opções criadas dentro do vetor do tipo conferência -->
	 							<?php for ($i = 0; $i < count($tipoConferenciaFields); $i++) { ?>

	 								<!-- Inicio da verificação se existe algum resultado proveniente do servidor e se a opção atual é a qual veio de lá -->
	 								<?php if ( (count($conferenciaAtual)) && ($conferenciaAtual['tipoConferencia'] == $tipoConferenciaFields[$i]) )  : ?>

	 									<!-- Opção selecionada por retornar do banco -->
	 									<option value="<?php echo $tipoConferenciaFields[$i] ?>" selected><?php echo $tipoConferenciaFields[$i] ?></option>

	 								<!-- Caso contrário, retornará apenas o seu conteúdo -->
	 								<?php else: ?>

	 									<!-- Opção para a combobox -->
	 									<option value="<?php echo $tipoConferenciaFields[$i] ?>"><?php echo $tipoConferenciaFields[$i] ?></option>

	 								<!-- Encerramento da verificação se existe algum resultado proveniente do servidor e se a opção atual é a qual veio de lá -->
	 								<?php endif; ?>
	 							<!-- Encerramento do sistema de repetição para percorrer todas as opções criadas dentro do vetor do tipo conferência -->
	 							<?php } ?>	 												    								    						   
						    </select>
	 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
							</div>

							<!-- Abertura da div de configuração de tamanho desses componentes -->
							<div class="col-12 col-sm-6">
								
 							<!-- Titulo (label) para a informação do tipo de pessoa -->
	 						<label for="cbxEstadoConferencia"> Estado da conferência: * </label>
	 						<!-- Caixa de seleção para a escolha de uma data do sistema -->
	 						<select class="form-control" id="groupTextField[2]" name="cbxEstadoConferencia" required>
						    	<option value=""> Selecione o estado atual... </option>

						    	<!-- Inicio do sistema de repetição para percorrer todas as opções criadas dentro do vetor do tipo conferência -->
	 							<?php for ($i = 0; $i < count($estadoConferenciaFields); $i++) { ?>

	 								<!-- Inicio da verificação se existe algum resultado proveniente do servidor e se a opção atual é a qual veio de lá -->
	 								<?php if ( (count($conferenciaAtual)) && ($conferenciaAtual['estadoConferencia'] == $estadoConferenciaFields[$i]) )  : ?>

	 									<!-- Opção selecionada por retornar do banco -->
	 									<option value="<?php echo $estadoConferenciaFields[$i] ?>" selected><?php echo $estadoConferenciaFields[$i] ?></option>

	 								<!-- Caso contrário, retornará apenas o seu conteúdo -->
	 								<?php else: ?>

	 									<!-- Opção para a combobox -->
	 									<option value="<?php echo $estadoConferenciaFields[$i] ?>"><?php echo $estadoConferenciaFields[$i] ?></option>

	 								<!-- Encerramento da verificação se existe algum resultado proveniente do servidor e se a opção atual é a qual veio de lá -->
	 								<?php endif; ?>
	 							<!-- Encerramento do sistema de repetição para percorrer todas as opções criadas dentro do vetor do tipo conferência -->
	 							<?php } ?>							    	
						    </select>
	 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
							</div>
						</div>	

						<!-- Abertura da div para alinhamento dos componentes deste form group -->
						<div class="row mb-2">

							<!-- Abertura da div de configuração de tamanho desses componentes -->
							<div class="col-12">
								
 							<!-- Cria-se uma label para informação do campo que vem a seguir -->
							<label for="txaDetalheConferencia"> Detalhe: *</label>
							<!-- Cria-se uma área de texto para inserção das informações -->
							<textarea class="form-control" name="txaDetalheConferencia" id="txaDetalheConferencia" rows="3" required><?php if (count($conferenciaAtual)) : echo $conferenciaAtual['descricaoConferencia']; ?><?php endif; ?></textarea> 
	 					<!-- Encerramento da div de configuração de tamanho desses componentes --> 
							</div> 												
						<!-- Encerramento da div para alinhamento dos componentes deste form group -->
						</div>

						<!-- Abertura da div para alinhamento dos componentes deste form group -->
						<div class="row mb-2">

							<!-- Abertura da div de configuração de tamanho desses componentes -->
							<div class="col-12">
								
 							<!-- Cria-se uma label para informação do campo que vem a seguir -->
							<label for="txtObservacaoConferencia"> Observação: *</label>
							<!-- Cria-se uma área de texto para inserção das informações -->
							<input type="text" class="form-control" id="txtObservacaoConferencia" name="txtObservacaoConferencia" aria-describedby="emailHelp" placeholder="" value="<?php if (count($conferenciaAtual)) : echo $conferenciaAtual['observacaoConferencia']; ?><?php endif; ?>" required /> 															
	 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
							</div> 												
						<!-- Encerramento da div para alinhamento dos componentes deste form group -->
						</div> 	 								
					<!-- Encerramento para este grupo de componentes desse formulário -->
					</div>

					<!-- Label de titulo para a página -->
 				<label for="formGroupData"> <h4 class="h4"> Informações da data e hora: </h4> </label> <br>
					<!-- Abertura para este grupo de componentes desse formulário -->
					<div class="form-group mb-3 p-2" id="formGroupData" name="formGroupData">

						<!-- Abertura da div para alinhamento dos componentes deste form group -->
						<div class="row mb-2">

							<!-- Abertura da div de configuração de tamanho desses componentes -->
							<div class="col-12">
								
								<!-- Titulo (label) para a informação do tipo de pessoa -->
	 						<label for="groupDataFundacao"> Data da conferência: </label>

 							<div class="input-group" id="groupDataFundacao" name="groupDataFundacao">	 								

								<div class="input-group-prepend">
							    	<span class="input-group-text"> Dia/Mês/Ano </span>
							  	</div>
		 						<!-- Caixa de seleção para a escolha de uma data do sistema -->
		 						<select class="form-control" id="sltDiaConferencia" name="sltDiaConferencia" required>
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
								    			if ($data == $diaConferencia) {

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
		 						<select class="form-control" id="sltMesConferencia" name="sltMesConferencia" required>
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
								    			if ($mes == $mesConferencia) {

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
							  	<input type="numeric" aria-label="First name" class="form-control" id="txtAnoConferencia" name="txtAnoConferencia" maxlength="4" placeholder="(0000)"
							  		value="<?php if (count($conferenciaAtual)) : echo $anoConferencia; ?><?php endif; ?>"/> 
							</div> 
	 					<!-- Encerramento da div de configuração de tamanho desses componentes -->
							</div>
						<!-- Encerramento da div para alinhamento dos componentes deste form group -->
						</div> 	

						<!-- Abertura da div para alinhamento dos componentes deste form group -->
						<div class="row mb-2">

							<!-- Abertura da div de configuração de tamanho desses componentes -->
							<div class="col-12 col-sm-12">

							<!-- Titulo (label) para a informação do tipo de pessoa -->
	 						<label for="groupDataFundacao"> Horário da conferência: </label>

	 						<!-- Abertura do grupo da caixa de texto integrada -->
	 						<div class="input-group" id="groupDataFundacao" name="groupDataFundacao">	

	 							<!-- Abertura da label de infomação do formato -->
		 						<div class="input-group-prepend">
								    <span class="input-group-text"> Hora:Minuto </span>
								<!-- Encerramento da label de infomação do formato -->
								</div>
								<!-- Caixa de texto para receber a hora da conferencia -->
								<input type="numeric" class="form-control" id="txtHoraConferencia" name="txtHoraConferencia" maxlength="2" placeholder="00" 
									value="<?php if (count($conferenciaAtual)) : echo $horaConferencia; ?><?php endif; ?>"/> 
								<!-- Abertura do separador -->
								<div class="input-group-prepend">
								    <span class="input-group-text"> : </span>
								<!-- Encerramento do separador -->
								</div>
								<!-- Caixa de texto para receber o minuto da conferencia -->
								<input type="numeric" class="form-control" id="txtMinutoConferencia" name="txtMinutoConferencia" maxlength="2" placeholder="00" 
									value="<?php if (count($conferenciaAtual)) : echo $minutoConferencia; ?><?php endif; ?>"/> 
							<!-- Encerramento do grupo da caixa de texto integrada -->
							</div>
	 					<!-- Encerramento da div para alinhamento dos componentes deste form group -->
							</div> 
						<!-- Encerramento da div para alinhamento dos componentes deste form group -->
						</div> 

					<!-- Encerramento para este grupo de componentes desse formulário -->
					</div>

				<!-- Botão para ativação do formulário -->
				<input type="hidden" id="txtAcaoAgenda" name="txtAcaoAgenda" value="<?php echo $action; ?>">

				<input type="hidden" id="txtIdentificadorConferencia" name="txtIdentificadorConferencia" value="<?php if ( $action == "alterar" ) : echo $conferenciaAtual['identificadorConferencia']?><?php endif; ?>">

				<button id="btnIniciarTarefa" name="btnIniciarTarefa" type="submit" class="btn btn-lg btn-block btn-outline-success"> <?php echo $tituloPage ?> </button>
							
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