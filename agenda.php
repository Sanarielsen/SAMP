<!-- Instancia o header do site -->
<?php require_once("header.php"); ?>

<!-- Verificação de sessão do usuário e a configuração da opção do menu ativado -->
<?php

	//Verificação se existe algum usuário logado para acesso desta página;
	include "identificacao_cargo.php";

	//Verificação de qual opção do menu está selecionada...
	$activeMenu = "Agenda";	
?>

<!-- Procedimento para consultar as conferências cadastradas -->
<?php
	
	//Inicia-se uma conexão com o banco de dados;
	require ("ConnectionMYSQL/connection.php");
	//Inicia-se uma conexão com a camada de objeto das conferencias;
	require ("ObjetoTransferencia/conferencia.php");
	//Importa os procedimentos para acesso aos dados das conferências;
	require ("Negocios/conferenciaNegocios.php");

	//Instancia o objeto da conferência;
	$conferencia = new Conferencia("", "", "", "", "", "", "", "");

	//Instancia-se o objeto com os métodos de negócios das conferências;
	$conferenciaNegocios = new ConferenciaNegocios();

	//Verifica se a página foi carregada pela primeira vez...
	if ( !isset($_POST['cbxFiltrarConferencias']) || empty($_POST['cbxFiltrarConferencias'])) {

		//Informa ao console o resultado da operação;
		echo '<script> console.log("agenda/pesquisaTodas"); </script>';
		//Executa o procedimento para consulta das informações de forma pura;
		$conferenciaResult = $conferenciaNegocios->consultarConferenciaDetalhe(0, "");		

	}
	//Caso contrário, será necessário verificar qual situação (indice) será aplicada
	else {

		//Informa ao console o resultado da operação;
		echo '<script> console.log("agenda/comboBoxAcionada"); </script>';

		//Verifica qual das opções está selecionada...

		//Caso seja pesquisa por data...
		if ($_POST['cbxFiltrarConferencias'] == 1) {

			//Informa ao console o resultado da operação;
			echo '<script> console.log("agenda/pesquisarPorData"); </script>';

			//Recebemos a data atual do sistema;
			//$dataAtual = date('d/m/Y');
		}
		else
		//Caso seja pesquisa por cliente...
		if ($_POST['cbxFiltrarConferencias'] == 2) {

			//Informa ao console o resultado da operação;
			echo '<script> console.log("agenda/pesquisarPorCliente"); </script>';
		}
		else
		//Caso seja pesquisa por representante...
		if ($_POST['cbxFiltrarConferencias'] == 3) {

			//Informa ao console o resultado da operação;
			echo '<script> console.log("agenda/pesquisarPorRepresentante"); </script>';
		}
		else
		//Caso seja pesquisa por tipo...
		if ($_POST['cbxFiltrarConferencias'] == 4) {

			//Informa ao console o resultado da operação;
			echo '<script> console.log("agenda/pesquisarPorTipo"); </script>';
		}
		else
		//Caso seja pesquisa por estado...	
		if ($_POST['cbxFiltrarConferencias'] == 5) {

			//Informa ao console o resultado da operação;
			echo '<script> console.log("agenda/pesquisarPorEstado"); </script>';
		}
		else {

			//Informa ao console o resultado da operação;
			echo '<script> console.log("agenda/valorPesquisaNotFound"); </script>';
		}

		//Executa o procedimento para consulta das informações da conferência levando em consideração o critério e o contexto para filtragem;
		$conferenciaResult = $conferenciaNegocios->consultarConferenciaDetalhe($_POST['cbxFiltrarConferencias'], $_POST['txtCriterioPesquisaConferencia']);
	}
	
?>

<!-- Instancia o painel do site contendo o menu vertical -->
<?php require_once("painel.php"); ?> 

<!-- Abertura da div que irá conter o conteúdo do site -->
<main class="col-md-12 col-lg-10" role="main">		                			
	
	<!-- Titulo da sessão -->					
	<h2 class="h2"> Agenda de tarefas </h2>

	<!-- Abertura da div para posicionamento dos componentes -->
	<div class="row">

		<!-- Abertura da div para o componente da linha -->
		<div class="col-12 col-md-12">

			<!-- Abertura do formulário para a requisição de pesquisa de data de pendências -->
			<form action="" method="POST">	

				<!-- Abertura da div tendo as configurações para o grupo de componentes juntos -->
				<div class="input-group mb-3">
	  				
	  				<!-- Abertura da parte referente a label de informação -->
	  				<div class="input-group-prepend">
	    				<span class="input-group-text" id="basic-addon1"> Buscar: </span>
	    			<!-- Encerramento da parte referente a label de informação -->
	  				</div>

	  				<input type="text" class="form-control" id="txtCriterioPesquisaConferencia" name="txtCriterioPesquisaConferencia" placeholder="Digite o texto a ser pesquisado" aria-label="Digite o texto a ser pesquisado" aria-describedby="button-addon2">

	  				<!-- Abertura da parte referente a label de informação -->
	  				<div class="input-group-prepend">
	    				<span class="input-group-text" id="basic-addon1"> Filtrar por: </span>
	    			<!-- Encerramento da parte referente a label de informação -->
	  				</div>
	  				
	  				<!-- Caixa de seleção para escolher a data a ser trabalhada -->
				  	<select class="form-control" id="cbxFiltrarConferencias" name="cbxFiltrarConferencias" aria-label="Example select with button addon" required>
					    <option value="" selected> Selecione o critério para pesquisa </option>					    
					    <option value="1"> Data </option>
					    <option value="2"> Cliente </option>
					    <option value="3"> Representante </option>
					    <option value="4"> Tipo </option>
					    <option value="5"> Estado </option>
				 	</select>
	  				
				 	<!-- Abertura da div para manter o botão colado a caixa de texto -->
					<div class="input-group-append">
						<!-- Botão para iniciar a pesquisa das pendências de acordo com a data selecionada -->
						<button type="submit" class="btn btn-outline-primary" name="btnPesquisarConferencia" id="btnPesquisarConferencia"> Pesquisar </button>
					<!-- Encerramento da div para manter o botão colado a caixa de texto -->
					</div>

				<!-- Encerramento da div tendo as configurações para o grupo de componentes juntos -->
				</div>

			<!-- Encerramento do formulário para a requisição de pesquisa de data de pendências -->
			</form>

		<!-- Encerramento da div para o componente da linha -->
		</div>
	<!-- Encerramento do formulário para posicionamento dos componentes -->
	</div>

	<!-- Abertura da div para posicionamento dos componentes -->
	<div class="row">

		<!-- Abertura de uma div que irá posicionar parte da linha -->
		<div class="col-md-6 col-lg-4">

			<!-- Label para informação -->
			<h4 class="text-center my-3 text-sm-left m-sm-4"> Conferências: </h4> 

		<!-- Encerramento de uma div que irá posicionar parte da linha -->
		</div>

		<!-- Abertura de uma div que irá posicionar parte da linha -->
		<div class="col-md-6 col-lg-8">

			<!-- Abertura do formulário para a requisição de pesquisa de data de pendências -->
			<form action="agenda_detalhe.php" method="POST">	

				<!-- Botão para sinalizar a inserção de uma conferência -->
				<button class="btn btn-block btn-primary my-4 w-100" name="btnInserirConferencia" id="btnInserirConferencia" > Criar uma nova conferência </button>

			<!-- Encerramento do formulário para a requisição de pesquisa de data de pendências -->
			</form>
		<!-- Encerramento de uma div que irá posicionar parte da linha -->
		</div>

	<!-- Encerramento do formulário para posicionamento dos componentes -->
	</div>

	<!-- Abertura da div que permite a tabela ser responsiva -->
	<div class="table-responsive-md table-responsive-sm table-responsive-xs table-wrapper-scroll-y mt-2">

		<!-- Abertura de uma tabela que irá mostrar os representantes da empresa selecionada -->
		<table class="table">
			<!-- Abertura de um cabeçalho para a tabela -->
			<thead class="thead text-light bg-dark sticky-top">
				
				<!-- Table row é criada -->
			    <tr>
			    	<!-- Table header, isto é, os titulos da coluna são instanciados com escopo proprios para colunasde titulo -->
			      	<th scope="col"> Data e hora </th>
			      	<th scope="col"> Empresa </th>
			      	<th scope="col"> Representante </th>
			      	<th scope="col"> Detalhes </th>
			      	<th scope="col"> Tipo </th>
			      	<th scope="col"> Status </th>
			    </tr>
	
			</thead>
			<!-- Abertura do corpo da tabela -->
			<tbody class="tbody">

				<!-- Verificação da quantidade de registros consultados (tem ou não tem) -->

				<!-- Caso haja algum registro a ser exibido... -->
				<?php if (count($conferenciaResult) > 0) : ?>

					<!-- Inicio do sistema de repetição para preenchimento das linhas da tabela -->
					<?php for ($i = 0; $i < count($conferenciaResult); $i++) { ?>				

						<!-- Table row é criada -->
					    <tr>
					    	<!-- Abertura do formulário de ação para administração desta linha da tabela -->
					    	<form action="agenda_detalhe.php" method="POST">
										
								<!-- Armazenamento dos identificadores desta query -->
								<?php

									echo '<input type="hidden" name="txtIdentificadorConferencia" id="txtIdentificadorConferencia" 
										value="'. $conferenciaResult[$i]['identificadorConferencia'] .'">';

									echo '<input type="hidden" name="txtIdentificadorCliente" id="txtIdentificadorCliente" 
										value="'. $conferenciaResult[$i]['identificadorCliente'] .'">';

									echo '<input type="hidden" name="txtIdentificadorRepresentante" id="txtIdentificadorRepresentante" 
										value="'. $conferenciaResult[$i]['identificadorRepresentante'] .'">';										
								?>

								<!-- Armazenamento dos dados da conferência -->
								<?php

									echo '<input type="hidden" name="txtNomeFantasia" id="txtNomeFantasia" value="' . $conferenciaResult[$i]['nomeFantasiaCliente'] . '"';
									echo '<input type="hidden" name="txtNomeRepresentante" id="txtNomeRepresentante" value="' . $conferenciaResult[$i]['nomeRepresentante'] . '"';
									echo '<input type="hidden" name="txtTipoConferencia" id="txtTipoConferencia" value="' . $conferenciaResult[$i]['tipoConferencia'] . '"';
									echo '<input type="hidden" name="txtEstadoConferencia" id="txtEstadoConferencia" value="' . $conferenciaResult[$i]['estadoConferencia'] . '"';
									echo '<input type="hidden" name="txtDetalheConferencia" id="txtDetalheConferencia" value="' . $conferenciaResult[$i]['detalheConferencia'] . '"';
									echo '<input type="hidden" name="txtObservacaoConferencia" id="txtObservacaoConferencia" value="' . $conferenciaResult[$i]['observacaoConferencia'] . '"';

									//Tranformação da data MYSQL para BR;
									$conferenciaResult[$i]['dataConferencia'] = $conferencia->converteDataConferencia($conferenciaResult[$i]['dataConferencia'], "BR");

									echo '<input type="hidden" name="txtDataConferencia" id="txtDataConferencia" value="' . $conferenciaResult[$i]['dataConferencia'] . '"';
								?>

						    	<!-- Table header para dar enfase nesse registro dando escopo para o mesmo -->
						      	<th scope="row"> <?php echo $conferenciaResult[$i]['dataConferencia'] ?> </th>
						      	<!-- Table data para informações da tabela -->								      	
						      	<td> <?php echo $conferenciaResult[$i]['nomeFantasiaCliente']; ?> </td>
						      	<td> <?php echo $conferenciaResult[$i]['nomeRepresentante']; ?> </td>
						      	<td> <?php echo $conferenciaResult[$i]['detalheConferencia']; ?> </td>
						      	<td> <?php echo $conferenciaResult[$i]['tipoConferencia']; ?> </td>
						      	<td class="text-center"> 

						      		<!-- Ativador do model para exibição das informações -->
				      				<button type="button" class="btn btn-warning w-100 mb-2" data-toggle="modal" 
				      				data-target="#modalConsultarConferencia"	
				      				data-whatever-identificador="<?php echo $conferenciaResult[$i]['identificadorConferencia']; ?>"
				      				data-whatever-cliente="<?php echo $conferenciaResult[$i]['nomeFantasiaCliente']; ?>"
				      				data-whatever-representante="<?php echo $conferenciaResult[$i]['nomeRepresentante']; ?>"
				      				data-whatever-tipo-conferencia="<?php echo $conferenciaResult[$i]['tipoConferencia']; ?>"
				      				data-whatever-estado-conferencia="<?php echo $conferenciaResult[$i]['estadoConferencia']; ?>"
				      				data-whatever-data-conferencia="<?php echo $conferenciaResult[$i]['dataConferencia']; ?>"
				      				data-whatever-detalhe-conferencia="<?php echo $conferenciaResult[$i]['detalheConferencia']; ?>"
				      				data-whatever-observacao-conferencia="<?php echo $conferenciaResult[$i]['observacaoConferencia']; ?>"
				      				> Alterar/Consultar </button>
						      		<input type="hidden" id="txtAcaoAgenda" name="txtAcaoAgenda" value="alterar" />
							      	<!-- Botão para abrir o modal de alerta que será executada um procedimento sem retorno -->
									<button type="button" class="btn btn-danger w-100" name="btnExcluirConferencia" id="btnExcluirConferencia" data-toggle="modal"
									data-target="#modalExcluirConferencia"
										data-whatever-identificador="<?php echo $conferenciaResult[$i]['identificadorConferencia']; ?>"
					      				data-whatever-cliente="<?php echo $conferenciaResult[$i]['nomeFantasiaCliente']; ?>"
					      				data-whatever-representante="<?php echo $conferenciaResult[$i]['nomeRepresentante']; ?>"
					      				data-whatever-tipo-conferencia="<?php echo $conferenciaResult[$i]['tipoConferencia']; ?>"
					      				data-whatever-estado-conferencia="<?php echo $conferenciaResult[$i]['estadoConferencia']; ?>">
										  	Excluir
									</button>				      		
						      	</td>						    					     
							<!-- Encerramento do formulário de ação para administração desta linha da tabela -->
					      	</form>
					    <!-- Encerramento desta linha da tabela -->
					    </tr>

				    <!-- Encerramento do sistema de repetição para preenchimento das linhas da tabela -->
					<?php } ?>

				<!-- Caso não haja registro a ser exibido... -->
				<?php else: ?>

					<!-- Table row é criada -->
				    <tr>
				    	<!-- Table header para dar enfase nesse registro informando da falta de registros para exibição -->
					    <th scope="row" colspan="6" class="text-center"> Nenhuma conferência foi encontrada </th>
				    <!-- Encerramento desta linha da tabela -->
				    </tr>
				<!-- Encerramento da estrutura de decisão -->
				<?php endif; ?>

			<!-- Encerramento do corpo da tabela -->
			</tbody>
		<!-- Encerramento de uma tabela que irá mostrar os representantes da empresa selecionada -->				
		</table>
	<!-- Encerramento da div que permite a tabela ser responsiva -->											
	</div>
<!-- Encerramento da div que irá conter o conteúdo do site -->
</main>	

<!-- 
=======================================================================================================
=======================================================================================================
==============================================================================CRIAÇÃO VISUAL DOS MODAIS
=======================================================================================================
=======================================================================================================
-->	

<!-- Div para surgimento e posicionamento do model -->
<div class="modal fade" id="modalConsultarConferencia" name="modalConsultarConferencia" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	
	<!-- Abertura da div de regulação do modelo -->
  	<div class="modal-dialog" role="document">
	  	<!-- Conteúdo do model -->
	    <div class="modal-content">
	    	<!-- Abertura do formulário do model -->
	    	<form method="POST" action="agenda_detalhe.php">
		    	<!-- Abertura da div do cabeçalho do model -->	
		      	<div class="modal-header bg-dark">
		      		<!-- Titulo do model -->
			        <h5 class="text-light modal-title" id="exampleModalLabel">
			        	Informações da agenda 
			        </h5>
			        <!-- Icone para fechamento do model X -->
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			          	<span aria-hidden="true">&times;</span>
			        </button>
			    <!-- Encerramento da div do cabeçalho do model -->	
		     	</div>
		      	<!-- Abertura da div do corpo do model -->
		      	<div class="modal-body">				       

		        	<!-- Abertura da div para reponsividade da tabela -->
		        	<div class="table-responsive-md table-responsive-sm table-responsive-xs table-wrapper-scroll-y">
		        		<!-- Abertura da tabela para exibição das informações -->
		        		<table class="table table-striped">

		        			<!-- Componente que irá receber o id do envolvido-->
					        <input type="hidden" name="idConferencia" id="idConferencia">

		        			<!-- Abertura do formulário que irá redicionar o usuário na ação de submit -->
		        			<form action="">
			        			<!-- Abertura do corpo da tabela --> 
			        			<tbody>
			        				<!-- Sessão 1 das informações desta etapa -->
			        				<tr>
			        					<th class="bg-primary text-light text-center" scope="row" colspan="2"> Informações do solicitante: </th>
			        				</tr>
			        				
			        				<tr>
								      	<th scope="row"> Empresa: </th> <!-- Coluna com o titulo -->
								        <td id="modalNomeCliente"> </td> <!-- Informação cadastrada sobre -->
								    </tr>

								    <tr>
								      	<th scope="row"> Representante: </th> <!-- Coluna com o titulo -->
								        <td id="modalNomeRepresentante"> </td> <!-- Informação cadastrada sobre -->
								    </tr>

								    <tr>
								      	<th scope="row"> Tipo: </th> <!-- Coluna com o titulo -->
								        <td id="modalTipoConferencia"> </td> <!-- Informação cadastrada sobre -->
								    </tr>

								    <tr>
								      	<th scope="row"> Estado: </th> <!-- Coluna com o titulo -->
								        <td id="modalEstadoConferencia"> </td> <!-- Informação cadastrada sobre -->
								    </tr>

								    <!-- Sessão 2 das informações desta etapa -->
								    <tr>
			        					<th class="bg-primary text-light text-center" scope="row" colspan="2"> Data e contexto </th>
			        				</tr>

								    <tr>
								      	<th scope="row"> Data: </th> <!-- Coluna com o titulo -->
								        <td id="modalDataConferencia"> </td> <!-- Informação cadastrada sobre -->
								    </tr>

								    <tr>
								      	<th scope="row"> Detalhes: </th> <!-- Coluna com o titulo -->
								        <td id="modalDetalheConferencia"> </td> <!-- Informação cadastrada sobre -->
								    </tr>

								   	<tr>
								      	<th scope="row"> Observação: </th> <!-- Coluna com o titulo -->
								        <td id="modalObservaçãoConferencia"> </td> <!-- Informação cadastrada sobre -->
								    </tr>
								<!-- Encerramento do cabeçalho da tabela --> 
			        			</tbody>
		        			<!-- Encerramento do formulário que irá redicionar o usuário na ação de submit -->
		        			</form>
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
		      			<button type="submit" name="btnAlterarConferencia" id="btnAlterarConferencia" class="btn btn-success"> Alterar evento </button>
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

<!-- Div para surgimento e posicionamento do model - Confirmação de exclusão de uma conferencia -->
<div class="modal fade" id="modalExcluirConferencia" name="modalExcluirConferencia" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<!-- Abertura da div de regulação do modelo -->
  	<div class="modal-dialog" role="document">
  		<!-- Conteúdo do model -->
	    <div class="modal-content">
	    	<!-- Abertura do formulário do model -->
	    	<form method="POST" action="agenda_processa.php">
	    		<!-- Abertura da div do cabeçalho do model -->	
		      	<div class="modal-header bg-dark">
		      		<!-- Titulo do model -->
			        <h5 class="text-light modal-title" id="exampleModalLabel">
			        	Excluir conferência 
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

					<input type="hidden" name="txtAcaoAgenda" id="txtAcaoAgenda" value="excluir">					

			       	<!-- Abertura da div para reponsividade da tabela -->
		        	<div class="table-responsive-md table-responsive-sm table-responsive-xs table-wrapper-scroll-y">
		        		<!-- Abertura da tabela para exibição das informações -->
		        		<table class="table table-striped">
		        			<!-- Abertura do corpo da tabela --> 
		        			<tbody>
		        						        				
								<h5 class="h5"> Tem certeza que você deseja excluir esta conferência?  </h5>			       	
		        				<p class="p mb-4 text-danger"> Obs: Esta operação nao poderá ser revertida! </p>

		        				<p> <b> Nome da empresa: </b><span id="modalExcludeNomeCliente"></span> </p>
		        				<p> <b> Nome do(a) representante: </b><span id="modalExcludeNomeRepresentante"></span> </p>
		        				<p> <b> Tipo: </b><span id="modalExcludeTipoConferencia"></span><span id="modalExcludeTipo"></span> </p>
		        				<p> <b> Estado: </b><span id="modalExcludeEstadoConferencia"></span>  </p>
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
		      			<button type="submit" name="btnExcluirConferencia" id="btnExcluirConferencia" class="btn btn-success"> Sim, desejo excluí-lo </button>
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

	$('#modalConsultarConferencia').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget) // Button that triggered the modal
		  
		  var recipientIdentifier = button.data('whatever-identificador') 
		  var recipientNomeCliente = button.data('whatever-cliente') // Extract info from data-* attributes
		  var recipientNomeRepresenta = button.data('whatever-representante') // Extract info from data-* attributes
		  var recipientTipoConferencia = button.data('whatever-tipo-conferencia') // Extract info from data-* attributes
		  var recipientEstadoConferencia = button.data('whatever-estado-conferencia') // Extract info from data-* attributes
		  var recipientDataConferencia = button.data('whatever-data-conferencia') // Extract info from data-* attributes
		  var recipientDetalheConferencia = button.data('whatever-detalhe-conferencia') // Extract info from data-* attributes
		  var recipientObservacaoConferencia = button.data('whatever-observacao-conferencia') // Extract info from data-* attributes

		  var modal = $(this)		  
		  //modal.find('#idReciclador').val(recipientIdentifier)
		  modal.find('#idConferencia').val(recipientIdentifier)	
		  modal.find('#modalNomeCliente').text(recipientNomeCliente)
		  modal.find('#modalNomeRepresentante').text(recipientNomeRepresenta)
		  modal.find('#modalTipoConferencia').text(recipientTipoConferencia)
		  modal.find('#modalEstadoConferencia').text(recipientEstadoConferencia)
		  modal.find('#modalDataConferencia').text(recipientDataConferencia)
		  modal.find('#modalDetalheConferencia').text(recipientDetalheConferencia)
		  modal.find('#modalObservaçãoConferencia').text(recipientObservacaoConferencia)
		  
		})
</script>

<!-- Script para funcionamento da transferência dos componentes do form para o model -->
<script type="text/javascript">

	$('#modalExcluirConferencia').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget) // Button that triggered the modal
		  
		  var recipientIdentifier = button.data('whatever-identificador') 
		  var recipientNomeCliente = button.data('whatever-cliente') // Extract info from data-* attributes
		  var recipientNomeRepresenta = button.data('whatever-representante') // Extract info from data-* attributes
		  var recipientTipoConferencia = button.data('whatever-tipo-conferencia') // Extract info from data-* attributes
		  var recipientEstadoConferencia = button.data('whatever-estado-conferencia') // Extract info from data-* attributes		  

		  var modal = $(this)		  
		  //modal.find('#idReciclador').val(recipientIdentifier)
		  modal.find('#idConferencia').val(recipientIdentifier)	
		  modal.find('#modalExcludeNomeCliente').text(recipientNomeCliente)
		  modal.find('#modalExcludeNomeRepresentante').text(recipientNomeRepresenta)
		  modal.find('#modalExcludeTipoConferencia').text(recipientTipoConferencia)
		  modal.find('#modalExcludeEstadoConferencia').text(recipientEstadoConferencia)
		})
</script>

<!-- Encerramento da div que irá conter o menu lateral e o conteudo do sistema -->
</div>			

<!-- Encerramento da div que irá cobrir toda a tela em questão de largura -->
</div>

</body>

<!-- Encerramento da tag de html -->
</html>