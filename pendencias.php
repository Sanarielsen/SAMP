







<!-- O QUE É HOJE, AMANHA E ONTEM JÁ ESTÁ ESTIPULADO, AGORA É TRATAR CASO O RESULTADO FOR VAZIO NOS DIAS E MOSTRAR ISSO NO CARD 
ATRIBUIR ESSES VALORES PARA ELES -->










<!-- Instancia o header do site -->
<?php require_once("header.php"); ?>


<!-- Verificação de sessão do usuário e a configuração da opção do menu ativado -->
<?php

	//Verificação se existe algum usuário logado para acesso desta página;
	include "identificacao_cargo.php";

	//Verificação de qual opção do menu está selecionada...
	$activeMenu = "Pendencias";	
?>

<!-- Processo para requisição da data atual, das anteriores e das proximas -->
<?php
	
	//Ciclo de testes das datas;
	//Data do sistema;
	$dia = date('d');
	$mes = date('m');
	$ano = date('Y');
	//Data estipulada;
	//$dia = "28";
	//$mes = "02";
	//$ano = "2016";
	//Data estipulada;
	//$dia = "30";
	//$mes = "10";
	//$ano = "2018";
	//Data formatada para simulação;
	$dataSimulada = $dia . '-' . $mes . '-' . $ano;
	//echo "Data Simulada: " . $dataSimulada . "<br><br>";
	//Data adaptada para uma data anterior levando a consideração da alteração do mês e ano;
	$dataAnterior = date('d/m/Y', strtotime("-1 days",strtotime($dataSimulada)));
	//echo "Data anterior: " . $dataAnterior . "<br>";
	//Data adaptada para uma data atual levando a consideração da alteração do mês e ano;
	$dataAtual = date('d/m/Y', strtotime($dataSimulada));
	//echo "Data atual: " . $dataAtual  . "<br>";
	//Data adaptada para uma data posterior levando a consideração da alteração do mês e ano;
	$dataPosterior = date('d/m/Y', strtotime("+1 days",strtotime($dataSimulada)));
	//echo "Data posterior: " . $dataPosterior . "<br><br>";
?>

<!-- Processo para adaptação das datas para envio no banco de dados -->
<?php

	//Importa os métodos para tratamento de datas;
	require("functions.php");
	//Inicia a conversão das datas para MYSQL;
	//Converte a data inicial e atribuí a hora inicial deste dia;
	$dataInicial = converteData($dataAnterior, "MYSQL") . " 00:00:00";
	//echo "Data inicial em formato MYSQL: " . $dataInicial . "<br>";
	//Converte a data final e atribuí o periodo final deste dia;
	$dataFinal = converteData($dataPosterior, "MYSQL") . " 23:59:59";
	//echo "Data final em formato MYSQL: " . $dataFinal . "<br>";
?>

<!-- Processo para pesquisa das conferências recentes -->
<?php
	
	//Importa as configurações para conexão no banco de dados;
	require("ConnectionMYSQL/connection.php");
	//Importa os procedimentos para acesso aos dados das conferências;
	require("Negocios/conferenciaNegocios.php");
	//Inicia-se uma conexão com a camada de objeto das conferencias;
	require ("ObjetoTransferencia/conferencia.php");

	//Instancia o objeto da conferência;
	$conferencia = new Conferencia("", "", "", "", "", "", "", "");

	//Instancia os procedimentos das conferências;
	$conferenciaNegocios = new ConferenciaNegocios();

	//Inicia-se o procedimento para requisição das conferências deste intervalo de datas (ontem até amanhã);
	$resultConferenciasRecentes = $conferenciaNegocios->consultarConferenciasRecentes($dataInicial, $dataFinal);	
?>

<!-- Processo para validar e separar as conferencias por dias -->
<?php 

	//Cria-se um validador para indicar se existem pendências nos últimos dias;
	$validConferencia;
	//Cria-se o vetor que irá receber as conferências do dia anterior;
	$conferenciasOntem = array();
	//Cria-se o vetor que irá receber as conferências do dia atual;
	$conferenciasHoje = array();
	//Cria-se o vetor que irá receber as conferências do dia posterior;
	$conferenciasAmanha = array();		

	//Verifica se existe alguma pendência encontrada nesse período;
	if ( $resultConferenciasRecentes > 0 ) {

		//Avisa ao sistema que determinada ação foi tomada;
		echo "<script>" . " console.log('Resultados de conferência encontrados') " . "</script>";
		//Libera o acesso ao carregamento dos cards de forma geral;
		$validConferencia = true;

		//Cria-se um sistema de repetição para percorrer todas as conferências
		for ($i = 0; $i < count($resultConferenciasRecentes); $i++) {

			//Captura-se a data desta conferência atual;
			$dataConferenciaMYSQL = substr($resultConferenciasRecentes[$i]['dataConferencia'], 0, 10);
			//Converte essa para o formato BR;
			$dataConferenciaAtual = converteData($dataConferenciaMYSQL, "BR");
			//Verifica-se existe a pesquisa realizada no banco de dados e se a data desta conferência que está em formato BR é a mesma considerada como "ontem";
			if (isset($resultConferenciasRecentes) && ($dataConferenciaAtual == $dataAnterior)) {

				//Atribuí este vetor de posições para um vetor que indique estes dias;
				array_push($conferenciasOntem, $resultConferenciasRecentes[$i]);				
			}
			//Verifica-se existe a pesquisa realizada no banco de dados e se a data desta conferência que está em formato BR é a mesma considerada como "hoje";
			else if (isset($resultConferenciasRecentes) && ($dataConferenciaAtual == $dataAtual)) {
				
				//Atribuí este vetor de posições para um vetor que indique estes dias;
				array_push($conferenciasHoje, $resultConferenciasRecentes[$i]);				
			}
			//Verifica-se existe a pesquisa realizada no banco de dados e se a data desta conferência que está em formato BR é a mesma considerada como "amanhã";
			else if (isset($resultConferenciasRecentes) && ($dataConferenciaAtual == $dataPosterior)) {

				//Atribuí este vetor de posições para um vetor que indique estes dias;
				array_push($conferenciasAmanha, $resultConferenciasRecentes[$i]);
			}	
		}	
	}
	//Caso não exista, manda a instrução para que estas datas estão vazias;
	else {
		
		//Avisa ao sistema que determinada ação foi tomada;
		echo "<script>" . " console.log('Resultados de conferência não encontrados') " . "</script>";
		//Tranca o acesso ao carregamento dos cards de forma geral;
		$validConferencia = false;

	}
?>

<!-- Instancia o painel do site contendo o menu vertical -->
<?php require_once("painel.php"); ?> 

<!-- Abertura da div que irá conter o conteúdo do site -->
<main class="col-md-12 col-lg-10 align-self-lg-center" role="main">	 

	<!-- Abertura da div que irá posicionar os componentes -->   
	<div class="row">

		<!-- Abertura da div que estipula quanto este componente irá tomar de espaço da linha -->
		<div class="col-12"> 

			<!-- Titulo da sessão atual: -->
			<h3 class="h3"> Diário das conferências </h3>
		<!-- Encerramento da div que estipula quanto este componente irá tomar de espaço da linha -->
		</div>
	<!-- Encerramento da div que irá posicionar os componentes -->   
	</div>

	<!-- Abertura da div que irá posicionar os componentes -->   
	<div class="row">

		<!-- Abertura da div que estipula quanto este componente irá tomar de espaço da linha -->
		<div class="col-12"> 

			<!-- Abertura do conjunto de abas de colisão -->
			<div class="accordion" id="accordionExample">
				<!-- Abertura da primeira aba visual desta colisão -->
			  	<div class="card">
			  		<!-- Abertura do cabeçalho deste card -->
			    	<div class="card-header bg-secondary" id="headingOne">
			    		<!-- Abertura do titulo desta aba -->
			      		<h5 class="mb-0">
			      			<!-- Botão que representa o titulo como a ação para expandir esta -->
			        		<button class="btn btn-link text-light" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
			          			Pendências de Ontem (<?php echo $dataAnterior ?>)
			        		</button>
			        	<!-- Botão que representa o titulo como a ação para expandir esta -->
			      		</h5>
			      	<!-- Encerramento do cabeçalho deste card -->
			    	</div>

				    <!-- Abertura da referência de conteúdo desta aba -->
				    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
				    	
				    	<!-- Abertura do corpo do card, sendo o texto/conteúdo desta aba -->
					    <div class="card-body">

					    	<!-- Dentro deste sessão, é criada uma nova linha para regular o tamanho dos cards dentro desta aba -->
				      		<div class="row">

								<?php 

				      				//Gerenciamento das pendências pertencentes a este dia;

				      				//Verifica-se existem registros de pendências/conferencias nesse dia;
				      				if ( ( $conferenciasOntem > 0 ) && ( !empty($conferenciasOntem) ) ) {

				      					//Avisa ao sistema que determinada ação foi tomada;
										echo "<script>" . " console.log('Resultados da conferencia de hoje foram encontrados') " . "</script>";	

										//Inicia um sistema de repetição para percorrer todas as pendências de um dia especifico (ontem);
										for ($i = 0; $i < count($conferenciasOntem); $i++ ) {

											//Tranformação da data MYSQL para BR devido a necessidade de visualização por parte do usuário
											$conferenciasOntem[$i]['dataConferencia'] = $conferencia->converteDataConferencia($conferenciasOntem[$i]['dataConferencia'], "BR");							
										?>

											<!-- Abertura do perimetro que irá estipular o tamanho do card -->
				      						<div class="col-12 col-sm-6 col-md-4 col-lg-3">	

				      							<!-- Abertura do formulário que irá conter o conteúdo do card e seus respectivos actions -->
				      							<form action="" method="">						      						
						      						
						      						<!-- Antes da criação do card, é necessário saber qual o estado atual desta conferência em questão... -->

						      						<!-- Caso esta seja do estado de pendencia... o card será vermelho -->
						      						<?php if ($conferenciasOntem[$i]['estadoConferencia'] == "Pendente") : ?> 
						      							<!-- Abertura do card que contém as informações da conferência que está em pendência -->
						      							<div class="card text-white bg-danger mb-3 bl-0">						      
						     						<!-- Caso esta seja do estado de pendencia... o card será amarelo --> 													
						      						<?php elseif ($conferenciasOntem[$i]['estadoConferencia'] == "Em Andamento") : ?> 						      							
						      							<!-- Abertura do card que contém as informações da conferência que está em andamento -->
						      							<div class="card text-white bg-warning mb-3 bl-0">				
						      						<!-- Caso esta seja do estado de pendencia... o card será verde -->		      						
						      						<?php elseif ($conferenciasOntem[$i]['estadoConferencia'] == "Encerrada") : ?> 
						      							<!-- Abertura do card que contém as informações da conferência que está encerrada -->
						      							<div class="card text-white bg-success mb-3 bl-0">
						      						<?php endif; ?>
						      						
						      							<!-- Abertura do cabeçalho deste card que conterá as informações do titulo da conferencia -->
														<div class="card-header">
															<!-- Texto que irá conter a data e a hora da conferência: -->
															<strong> Data e Hora: <?php echo $conferenciasOntem[$i]['dataConferencia'] ?> </strong>
														<!-- Encerramento do cabeçalho deste card que conterá as informações do titulo da conferencia -->
														</div>

														<!-- Abertura do corpo deste card que conterá o contexto da conferência -->
														<div class="card-body">
														    
														    <!-- O titulo principal a ser destaque será o titulo da empresa e do seu representante correspondente a esta conferencia -->
														    <h5 class="card-title"> <?php echo $conferenciasOntem[$i]['nomeFantasiaCliente'] . '/' . $conferenciasOntem[$i]['nomeRepresentante'] ?> </h5>
														    <!-- Apresentação do tipo da conferência, sendo presencial ou a distância -->
														    <p class="card-text"> <strong> Tipo: </strong> <?php echo $conferenciasOntem[$i]['tipoConferencia'] ?> </p>
														    <!-- Apresentação dos detalhes deste pedido -->
														    <p class="card-text"> <strong> Detalhes: </strong> <?php echo $conferenciasOntem[$i]['detalheConferencia'] ?> </p>						
														    <!-- Apresentação de observações que pode ser adicionadas pós ou antes do pedido -->
														    <p class="card-text"> <strong> Observação: </strong> <?php echo $conferenciasOntem[$i]['observacaoConferencia'] ?>  </p>								
														<!-- Encerramento do corpo deste card que conterá o contexto da conferência -->    
														</div>

														<!-- Abertura do rodapé deste card que conterá os botões para ação desta conferência --> 
														<div class="card-footer">									 

													  		<!-- Abertura da linha para posicionamento dos botões de gerenciamento desta conferência -->
													  		<div class="row text-center">												  			

													  			<!-- Abertura da div que irá configurar o posicionamento deste botão -->
													  			<div class="col-4">
													  				
													  				<!-- Ativador do model para exibição das informações -->				      			
													  				<button type="button" class="btn btn-outline-success" data-toggle="modal" 
													  					data-target="#modalAlterarEstadoConferencia"
													  					data-whatever-identificador="<?php echo $conferenciasOntem[$i]['identificadorConferencia']; ?>"
													      				data-whatever-cliente="<?php echo $conferenciasOntem[$i]['nomeFantasiaCliente']; ?>"
													      				data-whatever-representante="<?php echo $conferenciasOntem[$i]['nomeRepresentante']; ?>"
													      				data-whatever-data-conferencia="<?php echo $conferenciasOntem[$i]['dataConferencia']; ?>"
													      				data-whatever-estado-conferencia="<?php echo $conferenciasOntem[$i]['estadoConferencia']; ?>"
													      				data-whatever-estado-conferencia-mudar="Encerrada"
				      													> 
				      													<!-- Imagem que ilustra a função deste botão, sendo: Encerramento desta tarefa -->
													  					<img src="assets/img/sys/ico_pendencia_positive.png" width="30" height="30" alt=""> 
													  				</button>
																<!-- Encerramento da div que irá configurar o posicionamento deste botão -->
													  			</div>

													  			<!-- Abertura da div que irá configurar o posicionamento deste botão -->
													  			<div class="col-4">

													  				<!-- Ativador do model para exibição das informações -->				      			
													  				<button type="button" class="btn btn-outline-warning" data-toggle="modal" 
													  					data-target="#modalAlterarEstadoConferencia"
													  					data-whatever-identificador="<?php echo $conferenciasOntem[$i]['identificadorConferencia']; ?>"
													      				data-whatever-cliente="<?php echo $conferenciasOntem[$i]['nomeFantasiaCliente']; ?>"
													      				data-whatever-representante="<?php echo $conferenciasOntem[$i]['nomeRepresentante']; ?>"
													      				data-whatever-data-conferencia="<?php echo $conferenciasOntem[$i]['dataConferencia']; ?>"
													      				data-whatever-estado-conferencia="<?php echo $conferenciasOntem[$i]['estadoConferencia']; ?>"
													      				data-whatever-estado-conferencia-mudar="Em Andamento"
				      													> 
				      													<!-- Imagem que ilustra a função deste botão, sendo: Em estado de atendimento desta tarefa -->
													  					<img src="assets/img/sys/ico_pendencia_waiting.png" width="30" height="30" alt=""> 
													  				</button>
																<!-- Encerramento da div que irá configurar o posicionamento deste botão -->
													  			</div>

													  			<!-- Abertura da div que irá configurar o posicionamento deste botão -->
													  			<div class="col-4">

													  				<!-- Ativador do model para exibição das informações -->				      			
													  				<button type="button" class="btn btn-outline-danger" data-toggle="modal" 
													  					data-target="#modalAlterarEstadoConferencia"
													  					data-whatever-identificador="<?php echo $conferenciasOntem[$i]['identificadorConferencia']; ?>"
													      				data-whatever-cliente="<?php echo $conferenciasOntem[$i]['nomeFantasiaCliente']; ?>"
													      				data-whatever-representante="<?php echo $conferenciasOntem[$i]['nomeRepresentante']; ?>"
													      				data-whatever-data-conferencia="<?php echo $conferenciasOntem[$i]['dataConferencia']; ?>"
													      				data-whatever-estado-conferencia="<?php echo $conferenciasOntem[$i]['estadoConferencia']; ?>"
													      				data-whatever-estado-conferencia-mudar="Pendente"
				      													> 
				      													<!-- Imagem que ilustra a função deste botão, sendo: Tarefa em aberta -->
													  					<img src="assets/img/sys/ico_pendencia_negative.png" width="30" height="30" alt=""> 
													  				</button>
																<!-- Encerramento da div que irá configurar o posicionamento deste botão -->
													  			</div>
													  		</div>
													  	<!-- Encerramento do rodapé deste card que conterá os botões para ação desta conferência -->    
													  	</div>

													<!-- Encarremento do card que contém as informações da conferência -->
													</div>

												<!-- Encerramento do formulário que irá conter o conteúdo do card e seus respectivos actions -->
												</form>
				      			
				      						<!-- Encerramento do perimetro que irá estipular o tamanho do card -->
				      						</div>

										<?php										
										//Encerra o procedimento de repetição dos cards
										}
									//Encerra esta parte de estrutura de condição
				      				}
				      				//Caso não exista nenhum usuário cadastrado...
				      				else {

				      					//Avisa ao sistema que determinada ação foi tomada;
										echo "<script>" . " console.log('Resultados da conferencia de hoje não encontrados') " . "</script>";

										?>	
										<!-- Abertura da div de criação da linha de objetos desta região do card -->
										<div class="col-12">											

											<!-- Abertura do card para exibição de informações de forma dinâmica e atrativa -->
						    				<div class="card bg-success text-light mb-2">

						    					<!-- Abertura do cabeçalho deste card para informação de titulo -->
						    					<div class="card-header text-white font-weight-bold">
    												Aviso!
    											<!-- Encerramento do cabeçalho deste card para informação de titulo -->
  												</div>

						    					<!-- Abertura do corpo do card, sendo o texto/conteúdo desta aba -->
											  	<div class="card-body font-weight-bold">

											  		<!-- Texto informativo com um link incluído. -->
											    	<h5 class="h5 text-center text-white mb-3"> Hmmm! Não existem pendências programadas para este dia, você pode cadastrá-las na sessão "Agenda". </h5>

											    	<!-- Link para acesso a agenda de atividades -->
											    	<p class="p text-center"> <a class="text-white" href="http://localhost/samp/agenda.php"> Clique aqui para acessar a agênda </a> </p>											    	
											    <!-- Encerramento do corpo do card, sendo o texto/conteúdo desta aba -->
											  	</div>											  	
											<!-- Encerramento do card para exibição de informações de forma dinâmica e atrativa -->
											</div>											

										<!-- Encerramento da div de criação da linha de objetos desta região do card -->
										</div>
										
										<?php
				      				}
				      			?>

				      		<!-- Encerramento do perimetro que irá estipular o tamanho do card -->
				      		</div>
					    <!-- Encerramento do corpo do card, sendo o texto/conteúdo desta aba -->
					    </div>	    
					<!-- Encerramento da referência de conteúdo desta aba -->
				    </div>
				<!-- Encerramento da primeira aba visual desta colisão -->
				</div>

				<!-- Abertura do conjunto de abas de colisão -->
			  	<div class="card">
			    	<!-- Abertura do cabeçalho deste card -->
			    	<div class="card-header bg-primary" id="headingTwo">
			    		<!-- Abertura da área do botão/titulo que representa o titulo como a ação para expandir esta -->
			      		<h5 class="mb-0">
			      			<!-- Botão que representa o titulo como a ação para expandir esta -->
			        		<button class="btn btn-link collapsed text-light" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
			          			Pendências de Hoje (<?php echo $dataAtual ?>)
			        		</button>
			        	<!-- Encerramento da área do botão que representa o titulo como a ação para expandir esta -->
			      		</h5>
			    	<!-- Encerramento do cabeçalho deste card -->
			    	</div>

			    	<!-- Abertura da referência de conteúdo desta aba -->
				    <div id="collapseTwo" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">

				    	<!-- Abertura do corpo do card, sendo o texto/conteúdo desta aba -->
					    <div class="card-body">

					    	<!-- Dentro deste sessão, é criada uma nova linha para regular o tamanho dos cards dentro desta aba -->
				      		<div class="row">

								<?php 

				      				//Gerenciamento das pendências pertencentes a este dia;

				      				//Verifica-se existem registros de pendências/conferencias nesse dia;
				      				if ( ( $conferenciasHoje > 0 ) && ( !empty($conferenciasHoje) ) ) {

				      					//Avisa ao sistema que determinada ação foi tomada;
										echo "<script>" . " console.log('Resultados da conferencia de hoje foram encontrados') " . "</script>";	

										//Inicia um sistema de repetição para percorrer todas as pendências de um dia especifico (ontem);
										for ($i = 0; $i < count($conferenciasHoje); $i++ ) {

											//Tranformação da data MYSQL para BR devido a necessidade de visualização por parte do usuário
											$conferenciasHoje[$i]['dataConferencia'] = $conferencia->converteDataConferencia($conferenciasHoje[$i]['dataConferencia'], "BR");							
										?>

											<!-- Abertura do perimetro que irá estipular o tamanho do card -->
				      						<div class="col-12 col-sm-6 col-md-4 col-lg-3">	

				      							<!-- Abertura do formulário que irá conter o conteúdo do card e seus respectivos actions -->
				      							<form action="" method="">						      						
						      						
						      						<!-- Antes da criação do card, é necessário saber qual o estado atual desta conferência em questão... -->

						      						<!-- Caso esta seja do estado de pendencia... o card será vermelho -->
						      						<?php if ($conferenciasHoje[$i]['estadoConferencia'] == "Pendente") : ?> 
						      							<!-- Abertura do card que contém as informações da conferência que está em pendência -->
						      							<div class="card text-white bg-danger mb-3 bl-0">						      
						     						<!-- Caso esta seja do estado de pendencia... o card será amarelo --> 													
						      						<?php elseif ($conferenciasHoje[$i]['estadoConferencia'] == "Em Andamento") : ?> 						      							
						      							<!-- Abertura do card que contém as informações da conferência que está em andamento -->
						      							<div class="card text-white bg-warning mb-3 bl-0">				
						      						<!-- Caso esta seja do estado de pendencia... o card será verde -->		      						
						      						<?php elseif ($conferenciasHoje[$i]['estadoConferencia'] == "Encerrada") : ?> 
						      							<!-- Abertura do card que contém as informações da conferência que está encerrada -->
						      							<div class="card text-white bg-success mb-3 bl-0">
						      						<?php endif; ?>
						      						
						      							<!-- Abertura do cabeçalho deste card que conterá as informações do titulo da conferencia -->
														<div class="card-header">
															<!-- Texto que irá conter a data e a hora da conferência: -->
															<strong> Data e Hora: <?php echo $conferenciasHoje[$i]['dataConferencia'] ?> </strong>
														<!-- Encerramento do cabeçalho deste card que conterá as informações do titulo da conferencia -->
														</div>

														<!-- Abertura do corpo deste card que conterá o contexto da conferência -->
														<div class="card-body">
														    
														    <!-- O titulo principal a ser destaque será o titulo da empresa e do seu representante correspondente a esta conferencia -->
														    <h5 class="card-title"> <?php echo $conferenciasHoje[$i]['nomeFantasiaCliente'] . '/' . $conferenciasHoje[$i]['nomeRepresentante'] ?> </h5>
														    <!-- Apresentação do tipo da conferência, sendo presencial ou a distância -->
														    <p class="card-text"> <strong> Tipo: </strong> <?php echo $conferenciasHoje[$i]['tipoConferencia'] ?> </p>
														    <!-- Apresentação dos detalhes deste pedido -->
														    <p class="card-text"> <strong> Detalhes: </strong> <?php echo $conferenciasHoje[$i]['detalheConferencia'] ?> </p>						
														    <!-- Apresentação de observações que pode ser adicionadas pós ou antes do pedido -->
														    <p class="card-text"> <strong> Observação: </strong> <?php echo $conferenciasHoje[$i]['observacaoConferencia'] ?>  </p>								
														<!-- Encerramento do corpo deste card que conterá o contexto da conferência -->    
														</div>

														<!-- Abertura do rodapé deste card que conterá os botões para ação desta conferência --> 
														<div class="card-footer">									 

													  		<!-- Abertura da linha para posicionamento dos botões de gerenciamento desta conferência -->
													  		<div class="row text-center">												  			

													  			<!-- Abertura da div que irá configurar o posicionamento deste botão -->
													  			<div class="col-4">
													  				
													  				<!-- Ativador do model para exibição das informações -->				      			
													  				<button type="button" class="btn btn-success" data-toggle="modal" 
													  					data-target="#modalAlterarEstadoConferencia"
													  					data-whatever-identificador="<?php echo $conferenciasHoje[$i]['identificadorConferencia']; ?>"
													      				data-whatever-cliente="<?php echo $conferenciasHoje[$i]['nomeFantasiaCliente']; ?>"
													      				data-whatever-representante="<?php echo $conferenciasHoje[$i]['nomeRepresentante']; ?>"
													      				data-whatever-data-conferencia="<?php echo $conferenciasHoje[$i]['dataConferencia']; ?>"
													      				data-whatever-estado-conferencia="<?php echo $conferenciasHoje[$i]['estadoConferencia']; ?>"
													      				data-whatever-estado-conferencia-mudar="Encerrada"
				      													> 
				      													<!-- Imagem que ilustra a função deste botão, sendo: Encerramento desta tarefa -->
													  					<img src="assets/img/sys/ico_pendencia_positive.png" width="30" height="30" alt=""> 
													  				</button>
																<!-- Encerramento da div que irá configurar o posicionamento deste botão -->
													  			</div>

													  			<!-- Abertura da div que irá configurar o posicionamento deste botão -->
													  			<div class="col-4">

													  				<!-- Ativador do model para exibição das informações -->				      			
													  				<button type="button" class="btn btn-warning" data-toggle="modal" 
													  					data-target="#modalAlterarEstadoConferencia"
													  					data-whatever-identificador="<?php echo $conferenciasHoje[$i]['identificadorConferencia']; ?>"
													      				data-whatever-cliente="<?php echo $conferenciasHoje[$i]['nomeFantasiaCliente']; ?>"
													      				data-whatever-representante="<?php echo $conferenciasHoje[$i]['nomeRepresentante']; ?>"
													      				data-whatever-data-conferencia="<?php echo $conferenciasHoje[$i]['dataConferencia']; ?>"
													      				data-whatever-estado-conferencia="<?php echo $conferenciasHoje[$i]['estadoConferencia']; ?>"
													      				data-whatever-estado-conferencia-mudar="Em Andamento"
				      													> 
				      													<!-- Imagem que ilustra a função deste botão, sendo: Em estado de atendimento desta tarefa -->
													  					<img src="assets/img/sys/ico_pendencia_waiting.png" width="30" height="30" alt=""> 
													  				</button>
																<!-- Encerramento da div que irá configurar o posicionamento deste botão -->
													  			</div>

													  			<!-- Abertura da div que irá configurar o posicionamento deste botão -->
													  			<div class="col-4">

													  				<!-- Ativador do model para exibição das informações -->				      			
													  				<button type="button" class="btn btn-danger" data-toggle="modal" 
													  					data-target="#modalAlterarEstadoConferencia"
													  					data-whatever-identificador="<?php echo $conferenciasHoje[$i]['identificadorConferencia']; ?>"
													      				data-whatever-cliente="<?php echo $conferenciasHoje[$i]['nomeFantasiaCliente']; ?>"
													      				data-whatever-representante="<?php echo $conferenciasHoje[$i]['nomeRepresentante']; ?>"
													      				data-whatever-data-conferencia="<?php echo $conferenciasHoje[$i]['dataConferencia']; ?>"
													      				data-whatever-estado-conferencia="<?php echo $conferenciasHoje[$i]['estadoConferencia']; ?>"
													      				data-whatever-estado-conferencia-mudar="Pendente"
				      													> 
				      													<!-- Imagem que ilustra a função deste botão, sendo: Tarefa em aberta -->
													  					<img src="assets/img/sys/ico_pendencia_negative.png" width="30" height="30" alt=""> 
													  				</button>
																<!-- Encerramento da div que irá configurar o posicionamento deste botão -->
													  			</div>
													  		</div>
													  	<!-- Encerramento do rodapé deste card que conterá os botões para ação desta conferência -->    
													  	</div>

													<!-- Encarremento do card que contém as informações da conferência -->
													</div>

												<!-- Encerramento do formulário que irá conter o conteúdo do card e seus respectivos actions -->
												</form>
				      			
				      						<!-- Encerramento do perimetro que irá estipular o tamanho do card -->
				      						</div>

										<?php										
										//Encerra o procedimento de repetição dos cards
										}
									//Encerra esta parte de estrutura de condição
				      				}
				      				//Caso não exista nenhum usuário cadastrado...
				      				else {

				      					//Avisa ao sistema que determinada ação foi tomada;
										echo "<script>" . " console.log('Resultados da conferencia de hoje não encontrados') " . "</script>";

										?>	
										<!-- Abertura da div de criação da linha de objetos desta região do card -->
										<div class="col-12">											

											<!-- Abertura do card para exibição de informações de forma dinâmica e atrativa -->
						    				<div class="card bg-success text-light mb-2">

						    					<!-- Abertura do cabeçalho deste card para informação de titulo -->
						    					<div class="card-header text-white font-weight-bold">
    												Aviso!
    											<!-- Encerramento do cabeçalho deste card para informação de titulo -->
  												</div>

						    					<!-- Abertura do corpo do card, sendo o texto/conteúdo desta aba -->
											  	<div class="card-body font-weight-bold">

											  		<!-- Texto informativo com um link incluído. -->
											    	<h5 class="h5 text-center text-white mb-3"> Hmmm! Não existem pendências programadas para este dia, você pode cadastrá-las na sessão "Agenda". </h5>

											    	<!-- Link para acesso a agenda de atividades -->
											    	<p class="p text-center"> <a class="text-white" href="http://localhost/samp/agenda.php"> Clique aqui para acessar a agênda </a> </p>											    	
											    <!-- Encerramento do corpo do card, sendo o texto/conteúdo desta aba -->
											  	</div>											  	
											<!-- Encerramento do card para exibição de informações de forma dinâmica e atrativa -->
											</div>											

										<!-- Encerramento da div de criação da linha de objetos desta região do card -->
										</div>
										
										<?php
				      				}
				      			?>

				      		<!-- Encerramento do perimetro que irá estipular o tamanho do card -->
				      		</div>
					    <!-- Encerramento do corpo do card, sendo o texto/conteúdo desta aba -->
					    </div>
				    <!-- Encerramento da referência de conteúdo desta aba -->
				    </div>
				<!-- Encerramento do conjunto de abas de colisão -->
		  		</div>
				
				<!-- Abertura do conjunto de abas de colisão -->
				<div class="card">
					<!-- Abertura do cabeçalho deste card -->
				    <div class="card-header bg-secondary" id="headingThree">
				    	<!-- Abertura da área do botão/titulo que representa o titulo como a ação para expandir esta -->
				      	<h5 class="mb-0">
					        <button class="btn btn-link collapsed text-light" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
					          	Pendências de Amanhã (<?php echo $dataPosterior ?>)
					        </button>
				        <!-- Encerramento da área do botão que representa o titulo como a ação para expandir esta -->
				      	</h5>
				    <!-- Encerramento do cabeçalho deste card -->
				    </div>

				    <!-- Abertura da referência de conteúdo desta aba -->
				    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
				    	
				    	<!-- Abertura do corpo do card, sendo o texto/conteúdo desta aba -->
					    <div class="card-body">

					    	<!-- Dentro deste sessão, é criada uma nova linha para regular o tamanho dos cards dentro desta aba -->
				      		<div class="row">

								<?php 

				      				//Gerenciamento das pendências pertencentes a este dia;

				      				//Verifica-se existem registros de pendências/conferencias nesse dia;
				      				if ( ( $conferenciasAmanha > 0 ) && ( !empty($conferenciasAmanha) ) ) {

				      					//Avisa ao sistema que determinada ação foi tomada;
										echo "<script>" . " console.log('Resultados da conferencia de hoje foram encontrados') " . "</script>";	

										//Inicia um sistema de repetição para percorrer todas as pendências de um dia especifico (ontem);
										for ($i = 0; $i < count($conferenciasAmanha); $i++ ) {

											//Tranformação da data MYSQL para BR devido a necessidade de visualização por parte do usuário
											$conferenciasAmanha[$i]['dataConferencia'] = $conferencia->converteDataConferencia($conferenciasAmanha[$i]['dataConferencia'], "BR");							
										?>

											<!-- Abertura do perimetro que irá estipular o tamanho do card -->
				      						<div class="col-12 col-sm-6 col-md-4 col-lg-3">	

				      							<!-- Abertura do formulário que irá conter o conteúdo do card e seus respectivos actions -->
				      							<form action="" method="">						      						
						      						
						      						<!-- Antes da criação do card, é necessário saber qual o estado atual desta conferência em questão... -->

						      						<!-- Caso esta seja do estado de pendencia... o card será vermelho -->
						      						<?php if ($conferenciasAmanha[$i]['estadoConferencia'] == "Pendente") : ?> 
						      							<!-- Abertura do card que contém as informações da conferência que está em pendência -->
						      							<div class="card text-white bg-danger mb-3 bl-0">						      
						     						<!-- Caso esta seja do estado de pendencia... o card será amarelo --> 													
						      						<?php elseif ($conferenciasAmanha[$i]['estadoConferencia'] == "Em Andamento") : ?> 						      							
						      							<!-- Abertura do card que contém as informações da conferência que está em andamento -->
						      							<div class="card text-white bg-warning mb-3 bl-0">				
						      						<!-- Caso esta seja do estado de pendencia... o card será verde -->		      						
						      						<?php elseif ($conferenciasAmanha[$i]['estadoConferencia'] == "Encerrada") : ?> 
						      							<!-- Abertura do card que contém as informações da conferência que está encerrada -->
						      							<div class="card text-white bg-success mb-3 bl-0">
						      						<?php endif; ?>
						      						
						      							<!-- Abertura do cabeçalho deste card que conterá as informações do titulo da conferencia -->
														<div class="card-header">
															<!-- Texto que irá conter a data e a hora da conferência: -->
															<strong> Data e Hora: <?php echo $conferenciasAmanha[$i]['dataConferencia'] ?> </strong>
														<!-- Encerramento do cabeçalho deste card que conterá as informações do titulo da conferencia -->
														</div>

														<!-- Abertura do corpo deste card que conterá o contexto da conferência -->
														<div class="card-body">
														    
														    <!-- O titulo principal a ser destaque será o titulo da empresa e do seu representante correspondente a esta conferencia -->
														    <h5 class="card-title"> <?php echo $conferenciasAmanha[$i]['nomeFantasiaCliente'] . '/' . $conferenciasAmanha[$i]['nomeRepresentante'] ?> </h5>
														    <!-- Apresentação do tipo da conferência, sendo presencial ou a distância -->
														    <p class="card-text"> <strong> Tipo: </strong> <?php echo $conferenciasAmanha[$i]['tipoConferencia'] ?> </p>
														    <!-- Apresentação dos detalhes deste pedido -->
														    <p class="card-text"> <strong> Detalhes: </strong> <?php echo $conferenciasAmanha[$i]['detalheConferencia'] ?> </p>						
														    <!-- Apresentação de observações que pode ser adicionadas pós ou antes do pedido -->
														    <p class="card-text"> <strong> Observação: </strong> <?php echo $conferenciasAmanha[$i]['observacaoConferencia'] ?>  </p>								
														<!-- Encerramento do corpo deste card que conterá o contexto da conferência -->    
														</div>

														<!-- Abertura do rodapé deste card que conterá os botões para ação desta conferência --> 
														<div class="card-footer">									 

													  		<!-- Abertura da linha para posicionamento dos botões de gerenciamento desta conferência -->
													  		<div class="row text-center">												  			

													  			<!-- Abertura da div que irá configurar o posicionamento deste botão -->
													  			<div class="col-4">
													  				
													  				<!-- Ativador do model para exibição das informações -->				      			
													  				<button type="button" class="btn btn-outline-success" data-toggle="modal" 
													  					data-target="#modalAlterarEstadoConferencia"
													  					data-whatever-identificador="<?php echo $conferenciasAmanha[$i]['identificadorConferencia']; ?>"
													      				data-whatever-cliente="<?php echo $conferenciasAmanha[$i]['nomeFantasiaCliente']; ?>"
													      				data-whatever-representante="<?php echo $conferenciasAmanha[$i]['nomeRepresentante']; ?>"
													      				data-whatever-data-conferencia="<?php echo $conferenciasAmanha[$i]['dataConferencia']; ?>"
													      				data-whatever-estado-conferencia="<?php echo $conferenciasAmanha[$i]['estadoConferencia']; ?>"
													      				data-whatever-estado-conferencia-mudar="Encerrada"
				      													> 
				      													<!-- Imagem que ilustra a função deste botão, sendo: Encerramento desta tarefa -->
													  					<img src="assets/img/sys/ico_pendencia_positive.png" width="30" height="30" alt=""> 
													  				</button>
																<!-- Encerramento da div que irá configurar o posicionamento deste botão -->
													  			</div>

													  			<!-- Abertura da div que irá configurar o posicionamento deste botão -->
													  			<div class="col-4">

													  				<!-- Ativador do model para exibição das informações -->				      			
													  				<button type="button" class="btn btn-outline-warning" data-toggle="modal" 
													  					data-target="#modalAlterarEstadoConferencia"
													  					data-whatever-identificador="<?php echo $conferenciasAmanha[$i]['identificadorConferencia']; ?>"
													      				data-whatever-cliente="<?php echo $conferenciasAmanha[$i]['nomeFantasiaCliente']; ?>"
													      				data-whatever-representante="<?php echo $conferenciasAmanha[$i]['nomeRepresentante']; ?>"
													      				data-whatever-data-conferencia="<?php echo $conferenciasAmanha[$i]['dataConferencia']; ?>"
													      				data-whatever-estado-conferencia="<?php echo $conferenciasAmanha[$i]['estadoConferencia']; ?>"
													      				data-whatever-estado-conferencia-mudar="Em Andamento"
				      													> 
				      													<!-- Imagem que ilustra a função deste botão, sendo: Em estado de atendimento desta tarefa -->
													  					<img src="assets/img/sys/ico_pendencia_waiting.png" width="30" height="30" alt=""> 
													  				</button>
																<!-- Encerramento da div que irá configurar o posicionamento deste botão -->
													  			</div>

													  			<!-- Abertura da div que irá configurar o posicionamento deste botão -->
													  			<div class="col-4">

													  				<!-- Ativador do model para exibição das informações -->				      			
													  				<button type="button" class="btn btn-outline-danger" data-toggle="modal" 
													  					data-target="#modalAlterarEstadoConferencia"
													  					data-whatever-identificador="<?php echo $conferenciasAmanha[$i]['identificadorConferencia']; ?>"
													      				data-whatever-cliente="<?php echo $conferenciasAmanha[$i]['nomeFantasiaCliente']; ?>"
													      				data-whatever-representante="<?php echo $conferenciasAmanha[$i]['nomeRepresentante']; ?>"
													      				data-whatever-data-conferencia="<?php echo $conferenciasAmanha[$i]['dataConferencia']; ?>"
													      				data-whatever-estado-conferencia="<?php echo $conferenciasAmanha[$i]['estadoConferencia']; ?>"
													      				data-whatever-estado-conferencia-mudar="Pendente"
				      													> 
				      													<!-- Imagem que ilustra a função deste botão, sendo: Tarefa em aberta -->
													  					<img src="assets/img/sys/ico_pendencia_negative.png" width="30" height="30" alt=""> 
													  				</button>
																<!-- Encerramento da div que irá configurar o posicionamento deste botão -->
													  			</div>
													  		</div>
													  	<!-- Encerramento do rodapé deste card que conterá os botões para ação desta conferência -->    
													  	</div>

													<!-- Encarremento do card que contém as informações da conferência -->
													</div>

												<!-- Encerramento do formulário que irá conter o conteúdo do card e seus respectivos actions -->
												</form>
				      			
				      						<!-- Encerramento do perimetro que irá estipular o tamanho do card -->
				      						</div>

										<?php										
										//Encerra o procedimento de repetição dos cards
										}
									//Encerra esta parte de estrutura de condição
				      				}
				      				//Caso não exista nenhum usuário cadastrado...
				      				else {

				      					//Avisa ao sistema que determinada ação foi tomada;
										echo "<script>" . " console.log('Resultados da conferencia de hoje não encontrados') " . "</script>";

										?>	
										<!-- Abertura da div de criação da linha de objetos desta região do card -->
										<div class="col-12">											

											<!-- Abertura do card para exibição de informações de forma dinâmica e atrativa -->
						    				<div class="card bg-success text-light mb-2">

						    					<!-- Abertura do cabeçalho deste card para informação de titulo -->
						    					<div class="card-header text-white font-weight-bold">
    												Aviso!
    											<!-- Encerramento do cabeçalho deste card para informação de titulo -->
  												</div>

						    					<!-- Abertura do corpo do card, sendo o texto/conteúdo desta aba -->
											  	<div class="card-body font-weight-bold">

											  		<!-- Texto informativo com um link incluído. -->
											    	<h5 class="h5 text-center text-white mb-3"> Hmmm! Não existem pendências programadas para este dia, você pode cadastrá-las na sessão "Agenda". </h5>

											    	<!-- Link para acesso a agenda de atividades -->
											    	<p class="p text-center"> <a class="text-white" href="http://localhost/samp/agenda.php"> Clique aqui para acessar a agênda </a> </p>											    	
											    <!-- Encerramento do corpo do card, sendo o texto/conteúdo desta aba -->
											  	</div>											  	
											<!-- Encerramento do card para exibição de informações de forma dinâmica e atrativa -->
											</div>											

										<!-- Encerramento da div de criação da linha de objetos desta região do card -->
										</div>
										
										<?php
				      				}
				      			?>

				      		<!-- Encerramento do perimetro que irá estipular o tamanho do card -->
				      		</div>
					    <!-- Encerramento do corpo do card, sendo o texto/conteúdo desta aba -->
					    </div>

				    <!-- Encerramento da referência de conteúdo desta aba -->
				    </div>
			    <!-- Encerramento da primeira aba visual desta colisão -->
			  	</div>
			<!-- Encerramento do conjunto de abas de colisão -->
			</div>  
		<!-- Encerramento da div que estipula quanto este componente irá tomar de espaço da linha -->
		</div>
	<!-- Encerramento da div que irá posicionar os componentes -->   
	</div>         		    	
<!-- Encerramento da div que irá conter o conteúdo do site -->
</main>	

<!-- Div para surgimento e posicionamento do model -->
<div class="modal fade" id="modalAlterarEstadoConferencia" name="modalAlterarEstadoConferencia" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	
	<!-- Abertura da div de regulação do modelo -->
  	<div class="modal-dialog" role="document">
  		<!-- Conteúdo do model -->
	    <div class="modal-content">
	    	<!-- Abertura do formulário do model -->
	    	<form method="POST" action="pendencia_processa.php">
	    		<!-- Abertura da div do cabeçalho do model -->	
		      	<div class="modal-header bg-dark">
		      		<!-- Titulo do model -->
			        <h5 class="text-light modal-title" id="exampleModalLabel">
			        	Informações da Conferencia Atual
			        </h5>
			        <!-- Icone para fechamento do model X -->
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			          	<span aria-hidden="true">&times;</span>
			        </button>
			    <!-- Encerramento da div do cabeçalho do model -->	
		     	</div>

		     	<!-- Abertura da div do corpo do model -->
		      	<div class="modal-body">

		      		<!-- Componente que irá receber o id do envolvido-->
					<input type="hidden" name="idConferencia" id="idConferencia">	
					<!-- Componente que irá receber qual o estado a ser transgredido -->
					<input type="hidden" name="estadoConferenciaAlterado" id="estadoConferenciaAlterado">
					<!-- Componente que irá receber a ação a ser executada apartir deste modal -->
					<input type="hidden" name="txtAcaoPendencia" id="txtAcaoPendencia" value="Alterar Estado">					

			       	<!-- Abertura da div para reponsividade da tabela -->
		        	<div class="table-responsive-md table-responsive-sm table-responsive-xs table-wrapper-scroll-y">
		        		<!-- Abertura da tabela para exibição das informações -->
		        		<table class="table table-striped">
		        			<!-- Abertura do corpo da tabela --> 
		        			<tbody>
		        						        				
								<h5 class="h5"> Você está alterando o estado desta conferência:  </h5>

								<p class="p mt-3"> <b> Cliente / Representante: </b> <span id="modalNomeCliente"></span> / <span id="modalNomeRepresentante"></span> </p>
								<p> <b> Data: </b><span id="modalDataConferencia"></span> </p>											       			        				

		        				<p> <b> Do estado: </b><span id="modalEstadoConferencia"></span> </p>
		        				<p> <b> Para: </b><span id="modalEstadoConferenciaMudar"></span> </p>		        						        				

							<!-- Encerramento do cabeçalho da tabela --> 
		        			</tbody>					        		
		        		<!-- Encerramento da tabela para exibição das informações -->
		        		</table>
		        	<!-- Encerramento da div do corpo do model -->	        			 								       
					</div>
		      	<!-- Encerramento da div do corpo do model -->	        			 								       
		      	</div>	

		      	<!-- Abertura do Rodapé do model -->
		      	<div class="modal-footer bg-dark">
					<!-- Abertura do grupo de componentes visuais deste modal -->
					<div class="form-group">
						<!-- Botão para encerrar as atividades deste formulário -->
		 				<button type="button" class="btn btn-danger" data-dismiss="modal">  Não, foi um acidente </button>
		 				<!-- Botão para executar a exclusão de informações desta conferencia -->
		      			<button type="submit" name="btnAlterarEstadoConferencia" id="btnAlterarEstadoConferencia" class="btn btn-success"> Sim, confirmo a mudança </button>
		      		<!-- Fechamento do grupo de componentes visuais deste modal -->
		 			</div>	
		 		<!-- Fechamento do Rodapé do model -->		      		
		      	</div>

		    <!-- Fechamento do formulário do model -->
	      	</form>
	    <!-- Fechamento do conteúdo do model -->
	    </div>
  	<!-- Fechamento da div de regulação do modelo -->
	</div>
<!-- Fechamento da div para surgimento e posicionamento do model -->
</div>

<!-- 
=======================================================================================================
=======================================================================================================
========================================================================SCRIPT DE CONFIGURAÇÃO DO MODAL
=======================================================================================================
=======================================================================================================
-->	

<!-- Script para funcionamento da transferência dos componentes do form para o model -->
<script type="text/javascript">

	$('#modalAlterarEstadoConferencia').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget) // Button that triggered the modal
		  
		  var recipientIdentifier = button.data('whatever-identificador') 
		  var recipientNomeCliente = button.data('whatever-cliente') // Extract info from data-* attributes
		  var recipientNomeRepresenta = button.data('whatever-representante') // Extract info from data-* attributes		  		
		  var recipientDataConferencia = button.data('whatever-data-conferencia') // Extract info from data-* attributes		  
		  var recipientEstadoConferencia = button.data('whatever-estado-conferencia') // Extract info from data-* attributes
		  var recipientEstadoConferenciaMudar = button.data('whatever-estado-conferencia-mudar') // Extract info from data-* attributes

		  var modal = $(this)		  
		  //modal.find('#idReciclador').val(recipientIdentifier)
		  modal.find('#idConferencia').val(recipientIdentifier)	
		  modal.find("#estadoConferenciaAlterado").val(recipientEstadoConferenciaMudar)
		  modal.find('#modalNomeCliente').text(recipientNomeCliente)
		  modal.find('#modalNomeRepresentante').text(recipientNomeRepresenta)		  		  
		  modal.find('#modalDataConferencia').text(recipientDataConferencia)
		  modal.find('#modalEstadoConferencia').text(recipientEstadoConferencia)
		  modal.find('#modalEstadoConferenciaMudar').text(recipientEstadoConferenciaMudar)
		  
		  
		  
		})
</script>

<!-- Encerramento da div que irá conter o menu lateral e o conteudo do sistema -->
</div>			

<!-- Encerramento da div que irá cobrir toda a tela em questão de largura -->
</div>

</body>

<!-- Encerramento da tag de html -->
</html>