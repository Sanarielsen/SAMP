<!-- Configurações iniciais para carregamento desta página -->
<?php

	//Verificação se existe algum usuário logado para acesso desta página;
	include "identificacao_cargo.php";

	//Verificação de qual opção do menu está selecionada...
	$activeMenu = "Pedidos";	
?>

<!-- Instancia o header do site -->
<?php require_once("header.php"); ?>

<!-- Instancia o painel do site contendo o menu vertical -->
<?php require_once("painel.php"); ?>

<!-- Bloco de importações necessárias nesta página -->
<?php

	//Importa-se os métodos/funções para gerenciamento da data;
	require_once("functions.php");

	//Importa-se os objetos para conexão com o banco de dados;
	require_once("ConnectionMYSQL/connection.php");

	//Importa-se o objeto dos clientes
	require_once("ObjetoTransferencia/cliente.php");
	//Importa-se o objeto contendo as regras de negócio dos clientes;
	require_once("Negocios/clienteNegocios.php");

	//Importa-se o objeto dos pedidos;
	require_once("ObjetoTransferencia/pedido.php");
	//Importa-se o objeto contendo as regras de negócio dos pedidos;
	require_once("Negocios/pedidoNegocios.php");

	//Instancia a classe de negócios dos pedidos;
	$pedidoNegocios = new PedidoNegocios();
	//Instancia a classe de negócios dos clientes;
	$clienteNegocios = new ClienteNegocios();
?>

<!-- Procedimento para liberação do botão de inserir novo pedido -->
<?php 

	//Verifica-se o botão "pesquisar" foi solicitado, significando que há um identificador registrado;
	if ( isset($_REQUEST['btnPesquisarPedidosEmpresa']) ) {

		//Libera a inserção do novo pedido;
		$permissionInsertOrder = true;
		//Recebe a string de critério pesquisado na comboBox (valueBox - identificador, nomeFantasia e Protocolo);
		$criterioComboBoxValue = $_POST['cbxPedidoEmpresas'];
		//Quebra a string contendo o identificador (0), nomeFantasia (1) e Protocolo (2);
		$arrayValues = explode("|", $criterioComboBoxValue);
		//Atribuí o valor do identificador da empresa;
		$criterioIdentificadorCliente = $arrayValues[0];
		//Atribuí o valor do nome da empresa;
		$criterioNomeFantasiaCliente = $arrayValues[1];
		//Atribuí o valor do protocolo da empresa;
		$criterioProtocoloCliente = $arrayValues[2];		
	}
	//Caso não tenha sido requisitado...
	else {

		//Bloqueia a inserção do novo pedido;
		$permissionInsertOrder = false;
		//Consta o critério como vazio, já que nenhum cliente está selecionado;		
		$criterioActionPedido = 0;
	}
?>

<!-- Procedimento para consultar as empresas/clientes cadastrados para a cbxPedidoEmpresas -->
<?php 
	
	//Executa o procedimento para consulta dos clientes com seus id e CPF/CNPJ e armazena em uma variável;
	$resultClientes = $clienteNegocios->consultarClientesCadastrados();
	//Verifica-se o resultado é diferente de nulo;
	if ( count( $resultClientes ) > 0 ) {

		//Atribuí a quantidade de linhas resultados da query nessa variável;
		$countResultClientes = count( $resultClientes );
	}	
	//Caso contrário...
	else {
		//Atribuí o zero para sinalizar que não houve nenhuma linha de resultado nessa query;
		$countResultClientes = 0;
	}
?>

<!-- Procedimento para consultar os pedidos de acordo com o critério de pesquisa -->
<?php 

	//Isso pode ser provisório, mas... 
	//Verifica-se qual o critério que será utilizado para pesquisa;
	if ( $permissionInsertOrder ) {

		//Executa o procedimento para consulta dos pedidos de acordo com o identificador do cliente atual;
		$resultPedidos = $pedidoNegocios->consultarPedidoPeloCriterio("cliente", $criterioIdentificadorCliente);		
	}
	//Caso contrário, a busca permanece no geral;
	else {

		//Executa o procedimento para consulta de todos os pedidos cadastrados;
		$resultPedidos = $pedidoNegocios->consultarPedidoPeloCriterio("", "");
	}	
	//Recebe a quantidade de registros dentro deste resultado;
	$quantResultPedidos = count($resultPedidos);
?>

<!-- Abertura da div que irá conter o conteúdo do site -->
<main class="col-md-12 col-lg-10" role="main">		                			
	
	<!-- Titulo da sessão de pedidos -->
	<h3 class="h3"> Solicitações e Pedidos </h3>

	<!-- Abertura do formulário usado para selecionar qual empresa será consultada -->
	<form action="" method="POST">						
		<!-- Abertura da área para inserção do groupBox responsivo -->
		<div class="input-group mb-1">
		  	
		  	<!-- Abertura do componente em conjunto para sinalização do combo box ao lado  -->
		  	<div class="input-group-prepend">
		    	<!-- Label que contém a informação pertencente ao combo box ao lado -->
		    	<span class="input-group-text" id="inputGroup-sizing-default"> Empresa: </span>
		    <!-- Encerramento do componente em conjunto para sinalização do combo box ao lado  -->
		  	</div>
		  	
		  	<!-- Abertura do componente de seleção de valores com uma verificação se existem clientes cadastrados para prosseguimento -->
		  	<select class="form-control" name="cbxPedidoEmpresas" id="cbxPedidoEmpresas" aria-label="Combo de empresas cadastradas" 
		  	<?php if ( !$countResultClientes > 0) : ?> disabled <?php endif; ?> required>
		  		<!-- Verificaçao de quantos registros de clientes foram encontrados  -->
				<?php if ( $countResultClientes > 0 ) : ?>

					<!-- Opção inicial que informa a ação que deve ser executada -->
					<option value=""> Escolha uma empresa para consultar seus pedidos... </option>

					<!-- Inicio do sistema de repetição para percorrer todos os clientes consultados -->
					<?php for ($i = 0; $i < $countResultClientes; $i++) {  ?>

						<!-- Variáveis contendo os valores a serem transmitidos ao combo box -->
						<?php
							//Valor a ser transmitido pelo post da comboBox que será tratado posteriormente;
							$valueBox = $resultClientes[$i]['identificador'] . '|' . $resultClientes[$i]['nomeFantasiaCliente'] . '|' . $resultClientes[$i]['protocoloCliente'];
							//Visual da comboBox;
							$visualValueBox = "Empresa: " . $resultClientes[$i]['nomeFantasiaCliente'] . " | CPF/CPNJ: " . $resultClientes[$i]['protocoloCliente'];
						?>

						<!-- Verifica se cliente atual é o qual foi solicitado anteriormente -->
						<?php if ( $criterioIdentificadorCliente == $resultClientes[$i]['identificador'] ) : ?>

							<!-- Opção que conterá o identificador como value e sendo o nome do cliente e o protocolo (CPF OU CNPJ) para o visual do componente sendo este o qual foi selecionado -->
							<option value="<?php echo $valueBox ?>" selected><?php echo $visualValueBox ?></option>

						<!-- Caso contrário, apenas carregue o item no componente -->
						<?php else: ?>

							<!-- Opção que conterá o identificador como value e sendo o nome do cliente e o protocolo (CPF OU CNPJ) para o visual do componente -->
							<option value="<?php echo $valueBox ?>"><?php echo $visualValueBox ?></option>

						<!-- Encerramento do sistema de verificação da existência de um critério selecionado -->
						<?php endif; ?>

					<!-- Encerramento do sistema de repetição para percorrer todos os clientes consultados -->
					<?php } ?>

				<!-- Caso não tenha nenhum cliente cadastrado... -->
				<?php else: ?>
					<!-- Opção inicial que informa a ação que deve ser executada devido a ausência de clientes cadastrados -->
					<option selected> Nenhum cliente encontrado, cadastre algum antes de continuar </option>
				<!-- Encerramento da verificação de quantos registros de clientes foram encontrados  -->
				<?php endif; ?>
		    <!-- Encerramento do componente de seleção de valores -->
		 	</select>

		 	<!-- Abertura do componente que vem de concontro com o seletor de valores -->
		  	<div class="input-group-append">
		  		<!-- Label invisivel que carrega o passe para a proxima página contendo a instrução de inserir -->
		  		<input type="hidden" name="txtAcaoPedido" id="txtAcaoPedido" value="<?php echo "novo"; ?>">
		  		<!-- Botão para executar a pesquisa com base no cliente selecionado -->
		    	<button class="btn btn-outline-secondary" type="submit" id="btnPesquisarPedidosEmpresa" name="btnPesquisarPedidosEmpresa"
		    		<?php if ( !$countResultClientes > 0) : ?> disabled <?php endif; ?> > 
		    		Pesquisar 
		    	</button>
		    <!-- Encerramento do componente que vem de concontro com o seletor de valores -->
		 	</div>	
		<!-- Encerramento da área para inserção do groupBox responsivo -->	
		</div>	
	<!-- Encerramento do formulário usado para selecionar qual empresa será consultada -->
	</form>

	<!-- Abertura de uma linha para equilibrio de elementos visuais -->
	<div class="row">

		<!-- Abertura de uma div que irá posicionar parte da linha -->
		<div class="col-md-6 col-lg-4">

			<h4 class="text-center my-3 text-sm-left m-sm-4"> Pedidos: </h4> 
		<!-- Encerramento de uma div que irá posicionar parte da linha -->
		</div>

		<!-- Abertura de uma div que irá posicionar parte da linha -->
		<div class="col-md-6 col-lg-8">
			<!-- Abertura do formulário de ação para direcionar o button para outra página -->
			<form action="pedido_detalhe.php" method="POST">						

				<!-- Caso tenha sido liberada a ordem para inserção... -->
				<?php if ( $permissionInsertOrder ) : ?>

					<!-- Referência de um novo pedido para inserção -->
					<input type="hidden" name="txtAcaoPedido" id="txtAcaoPedido" value="novo">
					<!-- Caixa de texto oculta - Referência ao identificador deste cliente que está selecionado na combo box -->
					<input type="hidden" name="txtPedidoIdentificadorCliente" id="txtPedidoIdentificadorCliente" value="<?php echo $criterioIdentificadorCliente ?>">
					<!-- Caixa de texto oculta - Referência ao Nome Fantasia deste cliente que está selecionado na combo box -->
					<input type="hidden" name="txtPedidoNomeFantasiaCliente" id="txtPedidoNomeFantasiaCliente" value="<?php echo $criterioNomeFantasiaCliente ?>">
					<!-- Caixa de texto oculta - Referência ao Nome Fantasia deste cliente que está selecionado na combo box -->
					<input type="hidden" name="txtPedidoProtocoloCliente" id="txtPedidoProtocoloCliente" value="<?php echo $criterioProtocoloCliente ?>">
					<!-- Botão para redirecionar o usuario para a página de registro de processos -->
					<button type="submit" class="btn btn-block btn-primary my-4" id="btnInserirPedido" name="btnInserirPedido">
						Inserir novo pedido
					</button>
				<!-- Caso contrário... bloqueia o botão -->
				<?php else: ?>

					<!-- Referência de bloqueio para o pedido para inserção -->
					<input type="hidden" name="txtAcaoPedido" id="txtAcaoPedido" value="bloqueio">
					<!-- Botão para redirecionar o usuario para a página de registro de processos -->
					<button type="button" class="btn btn-block btn-danger my-4" id="btnInserirPedido" name="btnInserirPedido" disabled="">
						(Selecione um cliente para inserir um novo pedido) Inserir pedido
					</button>

				<!-- Encerramento do sistema de verificação -->
				<?php endif; ?>

			<!-- Abertura do formulário de ação para direcionar o button para outra página -->
			</form>						
		<!-- Encerramento de uma div que irá posicionar parte da linha -->
		</div>							
	<!-- Encerramento de uma linha para equilibrio de elementos visuais -->
	</div>

	<!-- Abertura da div que permite a tabela ser responsiva -->
	<div class="table-responsive-md table-responsive-sm table-responsive-xs table-wrapper-scroll-y">
		<!-- Abertura de uma tabela que irá mostrar os representantes da empresa selecionada -->
		<table class="table">
			<!-- Abertura de um cabeçalho para a tabela -->
			<thead class="thead text-light bg-dark sticky-top">							
				<!-- Table row é criada -->
			    <tr>
			    	<!-- Table header, isto é, os titulos da coluna são instanciados com escopo proprios para colunasde titulo -->
			      	<th class="text-center align-middle" scope="col"> ID </th>
			      	<th class="text-center align-middle" scope="col"> Serviço (Observacao) </th>
			      	<th class="text-center align-middle" scope="col"> Data de criação </th>
			      	<th class="text-center align-middle" scope="col"> Cliente/Empresa </th>		      	
			      	<th class="text-center align-middle" scope="col"> Operações </th>
			    </tr>

			</thead>
			<!-- Abertura do corpo da tabela -->
			<tbody class="tbody">

				<!-- Verificação se existem registros de pedidos registrados -->
				<?php if ( $quantResultPedidos > 0 ) : ?>

					<!-- Abertura do sistema de repetição para exibição das informações dos pedidos -->
			    	<?php for ($i = 0; $i < $quantResultPedidos; $i++ ) { ?>

			    		<!-- Será necessário tratamento da data, convertendo-a de 0000-00-00 00:00 para 00-00-0000 00:00 -->
			    		<?php $dataFormatoBR = converteDataTime($resultPedidos[$i]['dataPedido'], "BR"); ?>

						<!-- Abertura da linha da coluna -->
				    	<tr>
				    		<!-- Abertura do formulário de ação para administração desta linha da tabela -->
				    		<form action="pedido_detalhe.php" method="POST">	
				    			
				    			<!-- Visual - Identificador do pedido -->
				      			<th scope="row"> <?php echo $resultPedidos[$i]['identificadorPedido'] ?> </th>				      			
				      			<!-- Visual - Descrição e observação do pedido -->
				      			<td class="table-longtext" style=" width: 50%; "> <?php echo $resultPedidos[$i]['descricaoPedido'] . " ( " . $resultPedidos[$i]['observacaoPedido'] . " ) " ?> </td>				      			
				      			<!-- Visual - Data que este pedido foi criado -->
				      			<td class="text-center align-middle"> <?php echo $dataFormatoBR ?> </td>
				      			<!-- Visual - Nome fantasia e protocolo do cliente/empresa -->
				      			<td class="text-center align-middle"> <?php echo $resultPedidos[$i]['nomeFantasiaCliente'] . "<br>(" . $resultPedidos[$i]['protocoloCliente'] . ")" ?> </td>

				      			<!-- Caixa de texto oculta - Informação para o modal - identificador do cliente -->
				    			<input type="hidden" id="txtPedidoIdentificadorCliente" name="txtPedidoIdentificadorCliente" value="<?php echo $resultPedidos[$i]['identificadorCliente'] ?>">
				    			<!-- Caixa de texto oculta - Informação para o modal - nomeFantasia do cliente -->
				    			<input type="hidden" id="txtPedidoNomeFantasiaCliente" name="txtPedidoNomeFantasiaCliente" value="<?php echo $resultPedidos[$i]['nomeFantasiaCliente'] ?>">
				    			<!-- Caixa de texto oculta - Informação para o modal - protocolo do cliente -->
				    			<input type="hidden" id="txtPedidoProtocoloCliente" name="txtPedidoProtocoloCliente" value="<?php echo $resultPedidos[$i]['protocoloCliente'] ?>">

				    			<!-- Caixa de texto oculta - Informação para o modal - identificador do pedido -->
				    			<input type="hidden" id="txtPedidoIdentificador" name="txtPedidoIdentificador" value="<?php echo $resultPedidos[$i]['identificadorPedido'] ?>">
				    			<!-- Caixa de texto oculta - Informação para o modal - descricao do pedido -->
				    			<input type="hidden" id="txtPedidoDescricao" name="txtPedidoDescricao" value="<?php echo $resultPedidos[$i]['descricaoPedido'] ?>">
				    			<!-- Caixa de texto oculta - Informação para o modal - observacao do cliente -->
				    			<input type="hidden" id="txtPedidoObservacao" name="txtPedidoObservacao" value="<?php echo $resultPedidos[$i]['observacaoPedido'] ?>">
				    			<!-- Caixa de texto oculta - Informação para o modal - observacao do cliente -->
				    			<input type="hidden" id="txtPedidoDataCriacao" name="txtPedidoDataCriacao" value="<?php echo $resultPedidos[$i]['dataPedido'] ?>">

				      			<!-- Abertura - Visual - Botões de ação - Consultar pagamentos, Consultar/Alterar e Excluir pedido -->
				      			<td class="align-middle" style=" width: 20% "> 
					      			<!-- Referência deste pedido para alteração -->
					      			<input type="hidden" name="txtAcaoPedido" id="txtAcaoPedido" value="alterar">

						      		<!-- (Consultar Pagamentos) Botão para consultar as informações dos pagamentos -->
						      		<button type="button" class="btn btn-info w-100 mb-1" id="btnVerPedidoPagamentos" name="btnVerPedidoPagamentos"> Pagamentos </button>
						      		<!-- (Consultar/Alterar) Botão para visualização das informações completas deste cliente -->			      		
			  						<button type="button" class="btn btn-warning w-100 mb-1" id="btnConsultarPedido" name="btnConsultarPedido" 
				  						data-toggle="modal" 
				  						data-target="#modalConsultarPedido"
				  						data-whatever-pedido-identificador="<?php echo $resultPedidos[$i]['identificadorPedido'] ?>"
				  						data-whatever-pedido-cliente="<?php echo $resultPedidos[$i]['identificadorCliente'] ?>"
				  						data-whatever-pedido-cliente-nome="<?php echo $resultPedidos[$i]['nomeFantasiaCliente'] ?>"
				  						data-whatever-pedido-cliente-protocolo="<?php echo $resultPedidos[$i]['protocoloCliente'] ?>"
				  						data-whatever-pedido-descricao="<?php echo $resultPedidos[$i]['descricaoPedido'] ?>"
				  						data-whatever-pedido-observacao="<?php echo $resultPedidos[$i]['observacaoPedido'] ?>"
				  						data-whatever-pedido-datacriacao="<?php echo $resultPedidos[$i]['dataPedido'] ?>"
				  						data-whatever-pedido-datacriacao-formatada="<?php echo $dataFormatoBR ?>"
			  						> Consultar/Alterar </button>
						      		<!-- (Excluir) Botão para redicionamento da página para alteração de dados -->			      		
						      		<button type="button" class="btn btn-danger w-100 mb-1" 
						      			data-toggle="modal" 
						      			data-target="#modalExcluirPedido"
						      			data-whatever-pedido-identificador="<?php echo $resultPedidos[$i]['identificadorPedido'] ?>"
						      			data-whatever-pedido-descricao="<?php echo $resultPedidos[$i]['descricaoPedido'] ?>"
						      			data-whatever-pedido-cliente-nome="<?php echo $resultPedidos[$i]['nomeFantasiaCliente'] ?>"
						      			data-whatever-pedido-datacriacao="<?php echo $dataFormatoBR ?>"
						      			> Excluir 
						      		</button> 
						      	<!-- Encerramento - Visual - Botões de ação - Consultar pagamentos, Consultar/Alterar e Excluir pedido -->
				      			</td>				    					    						    					    	

				    		<!-- Encerramento do formulário de ação para administração desta linha da tabela -->
				      		</form>

				    	<!-- Encerramento da linha da coluna -->
					    </tr>

				    <!-- Encerramento do sistema de repetição para exibição das informações dos pedidos -->
			    	<?php } ?>

				<!-- Caso não haja nenhum registro encontrado... -->
				<?php else: ?>
					<!-- Abertura da linha da coluna -->
			    	<tr>
			    		<!-- Abertura do formulário de ação para administração desta linha da tabela -->
			    		<form action="" method="POST">
							<!-- Verificação se este resultado é proveniente de um cliente sem pedidos cadastrados... -->
							<?php if ( $permissionInsertOrder ) : ?>
								
								<!-- Linha da coluna que preenche toda informando que não há nenhum pedido cadastrado com este cliente -->
					      		<th class="text-center" scope="row" colspan="5"> Nenhum pedido cadastrado com este cliente </th>
							<!-- Ou se isto é proveniente de não haver nenhum registro cadastrado -->
							<?php else: ?>

								<!-- Linha da coluna que preenche toda informando que não há nenhum pedido cadastrado -->
								<th class="text-center" scope="row" colspan="5"> Nenhum pedido encontrado! Cadastre um pedido selecionando um cliente na barra superior </th>							
							<!-- Encerramento da verificação se este resultado é proveniente de um cliente sem pedidos cadastrados  -->
							<?php endif; ?>	
						<!-- Encerramento do formulário de ação para administração desta linha da tabela -->
				      	</form>
				    <!-- Encerramento da linha da coluna -->
				    </tr>			
				<!-- Encerramento da Verificação se existem registros de pedidos registrados -->
				<?php endif; ?>

			</tbody>
		</table>
	<!-- Encerramento da div que permite a tabela ser responsiva -->											
	</div>
<!-- Encerramento da div que irá conter o conteúdo do site -->
</main>	

<!-- Div para surgimento e posicionamento do model -->
<div class="modal fade" id="modalConsultarPedido" name="modalConsultarPedido" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	
	<!-- Abertura da div de regulação do modelo -->
  	<div class="modal-dialog" role="document">
	  	<!-- Conteúdo do model -->
	    <div class="modal-content">
	    	<!-- Abertura do formulário do model -->
	    	<form method="POST" action="pedido_detalhe.php">
		    	<!-- Abertura da div do cabeçalho do model -->	
		      	<div class="modal-header bg-dark">
		      		<!-- Titulo do model -->
			        <h5 class="text-light modal-title" id="exampleModalLabel">
			        	Informações do pedido 
			        </h5>
			        <!-- Icone para fechamento do model X -->
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			          	<span aria-hidden="true">&times;</span>
			        </button>
			    <!-- Encerramento da div do cabeçalho do model -->	
		     	</div>
		      	<!-- Abertura da div do corpo do model -->
		      	<div class="modal-body">				 

	      			<!-- Componente que irá receber o identificador do cliente -->
		        	<input type="hidden" name="txtPedidoIdentificadorCliente" id="txtPedidoIdentificadorCliente">
		        	<!-- Componente que irá receber o nome fantasia do cliente -->
		        	<input type="hidden" name="txtPedidoNomeFantasiaCliente" id="txtPedidoNomeFantasiaCliente">
		        	<!-- Componente que irá receber o protocolo do cliente -->
		        	<input type="hidden" name="txtPedidoProtocoloCliente" id="txtPedidoProtocoloCliente">	
	    			<!-- Componente que irá receber o identificador do protocolo -->
	    			<input type="hidden" id="txtPedidoIdentificador" name="txtPedidoIdentificador">
	    			<!-- Componente que irá receber a descricao do pedido  -->
	    			<input type="hidden" id="txtPedidoDescricao" name="txtPedidoDescricao">
	    			<!-- Componente que irá receber a observação do pedido -->
	    			<input type="hidden" id="txtPedidoObservacao" name="txtPedidoObservacao">
	    			<!-- Componente que irá receber a data de criação do pedido -->
	    			<input type="hidden" id="txtPedidoDataCriacao" name="txtPedidoDataCriacao">	        	

		        	<!-- Abertura da div para reponsividade da tabela -->
		        	<div class="table-responsive-md table-responsive-sm table-responsive-xs table-wrapper-scroll-y">
		        		<!-- Abertura da tabela para exibição das informações -->
		        		<table class="table table-striped">
		        			<!-- Abertura do corpo da tabela --> 
		        			<tbody>
		        				<!-- Sessão 1 das informações desta etapa -->
		        				<tr>
		        					<th class="bg-primary text-light text-center" scope="row" colspan="2"> Pedido </th>
		        				</tr>

			        			<tr>			        				
							      	<th scope="row"> Representa a: </th> <!-- Coluna com o titulo -->
							        <td id="modalPedidoClienteNomeFantasia"></td> <!-- Informação cadastrada sobre -->
							    </tr>
		        				
		        				<tr>
							      	<th scope="row"> Serviço </th> <!-- Coluna com o titulo -->
							        <td id="modalPedidoDescricao"></td> <!-- Informação cadastrada sobre -->
							    </tr>

							    <tr>
							      	<th scope="row"> Observaçoes </th> <!-- Coluna com o titulo -->
							        <td id="modalPedidoObservacao"></td> <!-- Informação cadastrada sobre -->
							    </tr>

							    <tr>
							      	<th scope="row"> Data de Criação </th> <!-- Coluna com o titulo -->
							        <td id="modalPedidoCriacao"></td> <!-- Informação cadastrada sobre -->
							    </tr>

							    <?php /*

							    <!-- Sessão 2 das informações desta etapa -->
							    <tr>
		        					<th class="bg-primary text-light text-center" scope="row" colspan="2"> Pagamento </th>
		        				</tr>

							    <tr>
							      	<th scope="row"> Método de pagamento </th> <!-- Coluna com o titulo -->
							        <td> Cartão </td> <!-- Informação cadastrada sobre -->
							    </tr>

							    <tr>
							      	<th scope="row"> Valor total </th> <!-- Coluna com o titulo -->
							        <td> R$ 1000,00 </td> <!-- Informação cadastrada sobre -->
							    </tr>

							    <tr>
							      	<th scope="row"> Valor por parcela </th> <!-- Coluna com o titulo -->
							        <td> R$ 100,00 </td> <!-- Informação cadastrada sobre -->
							    </tr>

							    <tr>
							      	<th scope="row"> Valor da entrada </th> <!-- Coluna com o titulo -->
							        <td> R$ 500,00 </td> <!-- Informação cadastrada sobre -->
							    </tr>

							    <tr>
							      	<th scope="row"> Data da entrada </th> <!-- Coluna com o titulo -->
							        <td> 05/08/2018 </td> <!-- Informação cadastrada sobre -->
							    </tr>

							    */?>
							   
							<!-- Encerramento do cabeçalho da tabela --> 
		        			</tbody>
		        		<!-- Encerramento da tabela para exibição das informações -->
		        		</table>
		        	<!-- Encerramento da div para reponsividade da tabela -->
		        	</div>	
		        <!-- Encerramento da div do corpo do model -->	        			 								       
		      	</div>
		      	<!-- Abertura do Rodapé do model -->
		      	<div class="modal-footer bg-dark">
					
					<div class="form-group">

	 					<button type="button" class="btn btn-danger" data-dismiss="modal"> Voltar </button>

	 					<input type="hidden" name="txtAcaoPedido" id="txtAcaoPedido" value="alterar">

	      				<button type="submit" name="btnAlterarItem" class="btn btn-success"> Alterar pedido </button>
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

<!-- Abertura da div para surgimento e posicionamento do model -->
<div class="modal fade" tabindex="-1" id="modalExcluirPedido" name="modalExcluirPedido" role="dialog">
	<!-- Abertura da caixa de diálogo do modal -->
  	<div class="modal-dialog" role="document">
  		<!-- Abertura do formulário que irá enviar a solicitação de exclusão -->
  		<form action="pedido_processa.php" method="POST">
	  		<!-- Abertura do contexto do modal -->
	    	<div class="modal-content">  	    		

	    		<!-- Abertura do cabeçalho do modal -->
	      		<div class="modal-header bg-dark">

	      			<!-- Titulo do modal -->
			        <h5 class="modal-title text-light"> Excluir Pedido e suas depêndencias.. </h5>
			        <!-- Abertura da aba interativa com o X de fechamento -->
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			        	<!-- X -->
			          	<span aria-hidden="true">&times;</span>
			        <!-- Fechamento da aba interativa com o X de fechamento -->
			        </button>
			        <!-- Componente que contém o processo a ser executado nessa janela -->
			        <input type="hidden" name="txtAcaoPedido" id="txtAcaoPedido" value="excluir">
			        <!-- Componente que irá conter o identificador do pedido -->
			        <input type="hidden" name="txtPedidoIdentificador" id="txtPedidoIdentificador">

	        	<!-- Encerramento do cabeçalho do modal -->
	     		</div>
	     		<!-- Abertura do corpo do modal -->
			    <div class="modal-body">

			        <h5 class="h5 mt-1 mb-3"> Tem certeza que gostaria de excluir este pedido? </h5>

			        <p class="p"> <b> Breve detalhe do serviço: </b>
			        	<span id="modalPedidoDescricao"> a </span> 
			        </p>

			        <p class="p"> <b> Pertence á: </b>
			        	<span id="modalPedidoClienteNomeFantasia"> a </span>
			        </p>

					<p class="p"> <b> Data de criação: </b> 
						<span id="modalPedidoCriacao"> a </span>
					</p>			        

			    <!-- Encerramento do corpo do modal -->
			    </div>
			    <!-- Abertura do rodapé do modal -->
		      	<div class="modal-footer bg-dark">

		      		<!-- Botão para encerrar o diálogo do modal -->
		        	<button type="button" class="btn btn-danger" data-dismiss="modal"> Cancelar </button>
		        	<!-- Botão para executar o processo de exclusão -->
		        	<button type="submit" class="btn btn-success"> Excluir Pedido </button>
		        <!-- Encerramento do rodapé do modal -->
		      	</div>
	    	<!-- Encerramento do contexto do modal -->
	    	</div>
    	<!-- Abertura do formulário que irá enviar a solicitação de exclusão -->
    	</form>
    <!-- Encerramento da caixa de diálogo do modal -->
  	</div>
<!-- Encerramento da div para surgimento e posicionamento do model -->
</div>

<!-- Script para funcionamento da transferência dos componentes do form para o model -->
<script type="text/javascript">

	//Script para configuração, preferências e atributos dados ao modal de consultar pedido
	$('#modalConsultarPedido').on('show.bs.modal', function (event) {

		//Referência o botão que deu início a este procedimento;
		var button = $(event.relatedTarget) 
		//
		//Transmite as informações do botão através do parâmetro data-(whatever)
		//
		var textPedidoIdentificador = button.data('whatever-pedido-identificador')
		var textPedidoCliente = button.data('whatever-pedido-cliente')
		var textPedidoClienteNome = button.data('whatever-pedido-cliente-nome')
		var textPedidoClienteProtocolo = button.data('whatever-pedido-cliente-protocolo')
		var textPedidoDescricao = button.data('whatever-pedido-descricao')
		var textPedidoObservacao = button.data('whatever-pedido-observacao')
		var textPedidoData = button.data('whatever-pedido-datacriacao')
		var textPedidoDataFormatada = button.data('whatever-pedido-datacriacao-formatada')
		//
		//Referenciação aos componentes do modal através desta variável
		//
		var modal = $(this)
		//
		//Informações direcionadas para os componentes hidden;
		//
		//Informações do cliente
		modal.find('#txtPedidoIdentificadorCliente').val(textPedidoCliente);
		modal.find('#txtPedidoNomeFantasiaCliente').val(textPedidoClienteNome);
		modal.find('#txtPedidoProtocoloCliente').val(textPedidoClienteProtocolo);
		//Informações do pedido
		modal.find('#txtPedidoIdentificador').val(textPedidoIdentificador);
		modal.find('#txtPedidoDescricao').val(textPedidoDescricao);
		modal.find('#txtPedidoObservacao').val(textPedidoObservacao);
		modal.find('#txtPedidoDataCriacao').val(textPedidoData);
		//
		//Informações direcionadas para os componentes visuais do modal;
		//
		modal.find('#modalPedidoClienteNomeFantasia').text(textPedidoClienteNome);
		modal.find('#modalPedidoDescricao').text(textPedidoDescricao);
		modal.find('#modalPedidoObservacao').text(textPedidoObservacao);
		modal.find('#modalPedidoCriacao').text(textPedidoDataFormatada);
	});

	//Script para configuração, preferências e atributos dados ao modal de excluir pedido
	$('#modalExcluirPedido').on('show.bs.modal', function (event) {

		//Referência o botão que deu início a este procedimento;
		var button = $(event.relatedTarget) 
		//
		//Transmite as informações do botão através do parâmetro data-(whatever)
		//
		var textPedidoIdentificador = button.data('whatever-pedido-identificador')
		var textPedidoClienteNome = button.data('whatever-pedido-cliente-nome')
		var textPedidoDescricao = button.data('whatever-pedido-descricao')
		var textPedidoData = button.data('whatever-pedido-datacriacao')
		//
		//Referenciação aos componentes do modal através desta variável
		//
		var modal = $(this)
		//
		//Informações direcionadas para os componentes hidden;
		//		
		modal.find('#txtPedidoIdentificador').val(textPedidoIdentificador);		
		//
		//Informações direcionadas para os componentes visuais do modal;
		//
		modal.find('#modalPedidoClienteNomeFantasia').text(textPedidoClienteNome);
		modal.find('#modalPedidoDescricao').text(textPedidoDescricao);		
		modal.find('#modalPedidoCriacao').text(textPedidoData);

	});
</script>	

<!-- Encerramento da div que irá conter o menu lateral e o conteudo do sistema -->
</div>
<!-- Encerramento da div que irá cobrir toda a tela em questão de largura -->
</div>

</body>

<!-- Encerramento da tag de html -->
</html>