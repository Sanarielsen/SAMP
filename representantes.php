<?php

	//Verificação se existe algum usuário logado para acesso desta página;
	include "identificacao_cargo.php";

	//Verificação de qual opção do menu está selecionada...
	$activeMenu = "Representantes";	

	//Inicia-se uma conexão com o banco de dados;
	require ("ConnectionMYSQL/connection.php");
	//Inicia-se uma conexão com a camada de negócios dos clientes;
	require ("Negocios/clienteNegocios.php");
	//Inicia-se uma conexão com a camada de negocio dos representantes;
	require ("Negocios/representanteNegocios.php");

	// ============================================================= PROCEDIMENTO PARA PESQUISA DOS CLIENTES CADASTRADOS PARA A COMBOBOX;

	//Instancia os procedimentos da classe de clientes;
	$clienteNegocios = new ClienteNegocios();

	//Executa o procedimento e o armazena nesta variável;
	$resultClientes = $clienteNegocios->consultarClientesCadastrados();

	// ============================================================= PROCEDIMENTO PARA A CONSULTA DE REPRESENTANTES DESTA TELA;

	//Instancia os procedimentos da classe de representantes;
	$representanteNegocios = new RepresentanteNegocios();

	//Verificação se o botão de pesquisa de cliente foi acionado;
	if (!isset($_REQUEST['btnConsultarRepresentantes'])) { 

		//Inicia a execução do método de pesquisa de representantes tendo em base todos os representantes;
		$resultRepresentantes = $representanteNegocios->consultarRepresentantesPeloCriterio("0");

		//Variável para configuração do botão de "inserir novo representante";
		$statusBtnRepresentante = "Bloqueado"; 
	}
	else {

		//Capta-se o critério da pesquisa;
		$criterio = $_POST['sltCriterioPesquisaRepresentante'];

		//Verifica se a posição do comboBox se é a função de instrução
		if ($criterio == 0) {

			//Inicia a execução do método de pesquisa de representantes tendo em base todos os representantes;
			$resultRepresentantes = $representanteNegocios->consultarRepresentantesPeloCriterio("0");

			//Variável para configuração do botão de "inserir novo representante";
			$statusBtnRepresentante = "Bloqueado"; 
		//Caso for qualquer outra, pesquisa de acordo com o critério;
		} else {

			//Inicia a execução do método de pesquisa de representantes tendo em base o id da empresa informada na comboBox;
			$resultRepresentantes = $representanteNegocios->consultarRepresentantesPeloCriterio($criterio);

			//Variável para configuração do botão de "inserir novo representante";						
			$statusBtnRepresentante = "Liberado"; 
		}																					
	}
?>

<!-- Instancia o header do site -->
<?php require_once("header.php"); ?>

<!-- Instancia o painel do site contendo o menu vertical -->
<?php require_once("painel.php"); ?>

			<!-- Abertura da div que irá conter o conteúdo do site -->
			<main class="col-md-12 col-lg-10" role="main">	               			
				<!-- Titulo da sessão em evidência -->
				<h2 class="h2"> Cadastro / Visualização dos representantes </h2>
				<!-- Abertura do formulário com a seleção da empresa que irá pesquisar os representantes -->
				<form action="" method="POST">
					<!-- Abertura do grupo que irá conter a select box seguido do seu botão de ação -->
					<div class="input-group">
						<!-- Abertura do componente de seleção de valores -->
					  	<select class="form-control" id="sltCriterioPesquisaRepresentante" name="sltCriterioPesquisaRepresentante" aria-label="Example select with button addon">
					  		<option value="0"> Escolha uma empresa para pesquisar seus representantes... </option>

					  		<!-- Sessão para preencher as opções dos clientes cadastrados -->
					  		<?php					  			

					  			for ($i = 0; $i < count($resultClientes); $i++ ) {

					  				if ($criterio == $resultClientes[$i]["identificador"]) {

					  					echo '<option value='. $resultClientes[$i]["identificador"] .' selected> Fantasia: '. $resultClientes[$i]["nomeFantasiaCliente"] . ' - CPF/CNPJ: ' . $resultClientes[$i]["protocoloCliente"] . ' </option>';
					  				} else {

					  					echo '<option value='. $resultClientes[$i]["identificador"] .'> Fantasia: '. $resultClientes[$i]["nomeFantasiaCliente"] . ' - CPF/CNPJ: ' . $resultClientes[$i]["protocoloCliente"] . ' </option>';
					  				}
					  							  				
					  			}  
					  		?>					   					    
					 	</select>
					 	<!-- Abertura do componente que vem de concontro com o seletor de valores -->
					  	<div class="input-group-append">

					    	<button class="btn btn-outline-secondary" type="submit" name="btnConsultarRepresentantes" id="btnConsultarRepresentantes"> Pesquisar </button>
					    <!-- Encerramento do componente que vem de concontro com o seletor de valores -->
					 	</div>
					 <!-- Encerramento do componente de seleção de valores -->
					</div>
				<!-- Encerramento do formulário com a seleção da empresa que irá pesquisar os representantes -->
				</form>
			
				<!-- Abertura de uma linha para equilibrio de elementos visuais -->
				<div class="row">

					<!-- Abertura de uma div que irá posicionar parte da linha -->
					<div class="col-md-6 col-lg-4">

						<h4 class="text-center my-3 text-sm-left m-sm-4"> Representantes: </h4> 
					<!-- Encerramento de uma div que irá posicionar parte da linha -->
					</div>

					<!-- Abertura de uma div que irá posicionar parte da linha -->
					<div class="col-md-6 col-lg-8">
						<!-- Abertura do formulário de ação para direcionar o button para outra página -->
						<form action="representante_detalhe.php" method="POST">

							<?php

								if ($_SESSION['inserirCreden'] == 1) {

									if ($statusBtnRepresentante == "Liberado") {

						  				echo '<button class="btn btn-block btn-primary my-4" type="submit" id="btnInserirRepresentante" name="btnInserirRepresentante"> Inserir novo representante </button>';
						  				echo '<input type="hidden" name="txtIdentificadorCliente" id="txtIdentificadorCliente" value="
									      		' . $criterio . ' ">';	

									    if (isset($_POST['sltCriterioPesquisaRepresentante'])) {

									    	echo '<input type="hidden" name="txtIdentificadorCliente" id="txtIdentificadorCliente" value="'.$_POST['sltCriterioPesquisaRepresentante'].'">';
									    }				  				

					  				}
					  				else if ($statusBtnRepresentante == "Bloqueado") {

					  					echo '<button class="btn btn-block btn-danger my-4" type="button" id="btnInserirRepresentante" name="btnInserirRepresentante"> Selecione um cliente para inserir um representante </button>';	
					  				}
								} 


					  		?>

							<!-- Botão para redirecionar o usuario para a página de registro de representante -->
							<input type="hidden" name="txtAcaoRepresentante" id="txtAcaoRepresentante" value="novo">
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
						      	<th scope="col"> ID </th>
						      	<th scope="col"> Nome requerente </th>
						      	<th scope="col"> Profissão </th>
						      	<th scope="col"> Cargo </th>
						      	<th scope="col"> Nacionalidade </th>
						      	<th scope="col"> Operações </th>
						    </tr>
				
						</thead>
						<!-- Abertura do corpo da tabela -->
						<tbody class="tbody">

							<!-- Verifica se existem registros cadastrados -->
							<?php if (count($resultRepresentantes) > 0) { ?>

								<!-- Looping para geração de linhas e formulários para respectivos registros -->
						  		<?php  for ($i = 0; $i < count($resultRepresentantes); $i++ ) {  ?>

									<!-- Table row é criada -->
								    <tr>
								    	<!-- Abertura do formulário de ação para administração desta linha da tabela -->
								    	<form action="representante_detalhe.php" method="POST">

									    	<!-- Table header para dar enfase nesse registro dando escopo para o mesmo -->
									    	<!-- Coluna de identificador do representante -->
									      	<th scope="row"> <?php echo $resultRepresentantes[$i]['identificador']; ?> </th>
									      	<?php echo '<input type="hidden" name="txtIdentificadorRepresentante" id="txtIdentificadorRepresentante" value=" 
							  					' . $resultRepresentantes[$i]['identificador'] . '">' ?>
									      	<!-- Table data para informações da tabela -->
									      	<!-- Coluna do nome do representante -->
									      	<td> <?php echo $resultRepresentantes[$i]['nomeRepresentante']; ?> </td>
									      	<?php echo '<input type="hidden" name="txtNomeRepresentante" id="txtNomeRepresentante" value=" 
							  					' . $resultRepresentantes[$i]['nomeRepresentante'] . ' ">' ?>
							  				<!-- Coluna da profissao do representante -->
									      	<td> <?php echo $resultRepresentantes[$i]['profissaoRepresentante']; ?> </td>
									      	<?php echo '<input type="hidden" name="txtProfissaoRepresentante" id="txtProfissaoRepresentante" value="
									      		' . $resultRepresentantes[$i]['profissaoRepresentante'] . ' ">' ?>
									      	<!-- Coluna do cargo do representante -->
									      	<td> <?php echo $resultRepresentantes[$i]['cargoRepresentante']; ?> </td>
									      	<?php echo '<input type="hidden" name="txtCargoRepresentante" id="txtCargoRepresentante" value="
									      		' . $resultRepresentantes[$i]['cargoRepresentante'] . ' ">' ?>
									      	<!-- Coluna da nacionalidade do representante -->
									      	<td> <?php echo $resultRepresentantes[$i]['nacionalidadeRepresentante']; ?> </td>
									      	<?php echo '<input type="hidden" name="txtNacionalidadeRepresentante" id="txtNacionalidadeRepresentante" value="
									      		' . $resultRepresentantes[$i]['nacionalidadeRepresentante'] . ' ">' ?>

									      	<!-- Demais componentes deste representante -->
									      	<?php echo '<input type="hidden" name="txtRGRepresentante" id="txtRGRepresentante" value="
									      		' . $resultRepresentantes[$i]['rgRepresentante'] . ' ">' ?>
									      	<?php echo '<input type="hidden" name="txtCPFRepresentante" id="txtCPFRepresentante" value="
									      		' . $resultRepresentantes[$i]['cpfRepresentante'] . ' ">' ?>
									      	<?php echo '<input type="hidden" name="txtIdentificadorCliente" id="txtIdentificadorCliente" value="
									      		' . $resultRepresentantes[$i]['identificadorCliente'] . ' ">' ?>
								      		<?php echo '<input type="hidden" name="txtNomeFantasiaCliente" id="txtNomeFantasiaCliente" value="
									      		' . $resultRepresentantes[$i]['nomeFantasiaCliente'] . ' ">' ?>

									      	<!-- Table data para inserção dos botões do form -->
									      	<td> 
									      		<!-- Botão para visualização das informações completas deste cliente -->
									      		<!-- Ativador do model para exibição das informações -->
									      		<?php

									      			echo 
									      			'
									      				<button type="button" class="btn btn-success" id="btnInserirRepresentante" name="btnInserirRepresentante" data-toggle="modal" 
									      				data-target="#modalConsultarCadastro" 
									      				data-whatever-representante-identificador="'. $resultRepresentantes[$i]['identificador'] .'"
									      				data-whatever-representante-nome="'. $resultRepresentantes[$i]['nomeRepresentante'] .'"
									      				data-whatever-representante-rg="'. $resultRepresentantes[$i]['rgRepresentante'] .'"
									      				data-whatever-representante-cpf="'. $resultRepresentantes[$i]['cpfRepresentante'] .'"
									      				data-whatever-representante-profissao="'. $resultRepresentantes[$i]['profissaoRepresentante'] .'"
									      				data-whatever-representante-cargo="'. $resultRepresentantes[$i]['cargoRepresentante'] .'"
									      				data-whatever-representante-nacionalidade="'. $resultRepresentantes[$i]['nacionalidadeRepresentante'] .'"
									      				data-whatever-cliente-nome="'. $resultRepresentantes[$i]['nomeFantasiaCliente'] .'"
									      				> Consultar </button>
									      			';
									      		?>

									      		<?php 

									      			if ($_SESSION['alterarCreden'] == 1) {
									      		?>
								      			
									      		<!-- Botão para redicionamento da página para alteração de dados -->								      		
									      		<button type="submit" class="btn btn-warning" id="btnAlterarRepresentante" name="btnAlterarRepresentante"> Alterar </button>

									      		<?php 

									      			}
									      		?>

									      		<?php

									      			if ($_SESSION['excluirCreden'] == 1) {

										      			echo 
											      			'<button type="button" id="btnExcluirRepresentante" name="btnExcluirRepresentante" class="btn btn-danger"
											      			data-toggle="modal" data-target="#modalVerificarExclusao"
											      			data-whatever-identificador=" ' . $resultRepresentantes[$i]['identificador'] . ' "
										      				data-whatever-nome="' . $resultRepresentantes[$i]['nomeRepresentante'] . '" 
										      				data-whatever-rg="' . $resultRepresentantes[$i]['rgRepresentante'] . '" 
										      				data-whatever-cpf="' . $resultRepresentantes[$i]['cpfRepresentante'] . '"
										      				data-whatever-representa="' . $resultRepresentantes[$i]['nomeFantasiaCliente'] . '"								      				
											      			> Excluir </button>';
										      		}
									      		?>
									      	</td>					     
										<!-- Encerramento do formulário de ação para administração desta linha da tabela -->
								      	</form>
								    </tr>

							    <!-- Encerramento do looping do vetor das linhas do cliente -->
						  		<?php }	?>
						  	<?php }  else {   ?>

						  		<!-- Table row é criada -->
								<tr>
									<th class="text-center" colspan="6"> Nenhum representante cadastrado ainda... </th>
								</tr>

						  	<!-- Encerramento da estrutura de condição -->
						  	<?php } ?>						    
						</tbody>
					</table>
				<!-- Encerramento da div que permite a tabela ser responsiva -->											
				</div>
			<!-- Encerramento da div que irá conter o conteúdo do site -->
			</main>

			<!-- Div para surgimento e posicionamento do model -->
			<div class="modal fade" id="modalConsultarCadastro" name="modalConsultarCadastro" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				
				<!-- Abertura da div de regulação do modelo -->
			  	<div class="modal-dialog" role="document">
				  	<!-- Conteúdo do model -->
				    <div class="modal-content">
				    	<!-- Abertura do formulário do model -->
				    	<form method="POST" action="representante_action.php">
					    	<!-- Abertura da div do cabeçalho do model -->	
					      	<div class="modal-header bg-dark">
					      		<!-- Titulo do model -->
						        <h5 class="text-light modal-title" id="exampleModalLabel">
						        	Informações do representante 
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
					        	<input name="idReciclador" type="hidden" id="idReciclador">
					        	<!-- Abertura da div para reponsividade da tabela -->
					        	<div class="table-responsive-md table-responsive-sm table-responsive-xs table-wrapper-scroll-y">
					        		<!-- Abertura da tabela para exibição das informações -->
					        		<table class="table table-striped">
					        			<!-- Abertura do formulário que irá redicionar o usuário na ação de submit -->
					        			<form>
						        			<!-- Abertura do corpo da tabela --> 
						        			<tbody>
						        				<!-- Sessão  das informações desta etapa -->
						        				<tr>
						        					<th class="bg-primary text-light text-center" scope="row" colspan="2"> Requerente: </th>
						        				</tr>
						        				<!-- Label e lacuna para a empresa que ele(a) pertece -->
						        				<tr> <th scope="row"> Representa a: </th> <!-- Coluna com o titulo --> <td id="modalNomeCliente"> </td> <!-- Informação cadastrada sobre --> </tr>  
						        				<!-- Label e lacuna para o nome do representante -->
						        				<tr> <th scope="row"> Nome do requerente: </th> <!-- Coluna com o titulo --> <td id="modalNomeRepresentante"> </td> <!-- Informação cadastrada sobre --> </tr>
						        				<!-- Label e lacuna para a nacionalidade do representante -->
											    <tr> <th scope="row"> Nacionalidade </th> <!-- Coluna com o titulo --> <td id="modalNacionalidadeRepresentante"> </td> <!-- Informação cadastrada sobre --> </tr>
											    <!-- Label e lacuna para o rg do representante -->
											    <tr> <th scope="row"> RG </th> <!-- Coluna com o titulo --> <td id="modalRGRepresentante"> </td> <!-- Informação cadastrada sobre --> </tr>
											    <!-- Label e lacuna para o cpf do representante -->
											    <tr> <th scope="row"> CPF </th> <!-- Coluna com o titulo --> <td id="modalCPFRepresentante"> </td> <!-- Informação cadastrada sobre --> </tr>
											    <!-- Label e lacuna para a profissao do representante -->
											    <tr> <th scope="row"> Profissão </th> <!-- Coluna com o titulo --> <td id="modalProfissaoRepresentante"> </td> <!-- Informação cadastrada sobre --> </tr>
											    <!-- Label e lacuna para o cargo do representante -->
											    <tr> <th scope="row"> Cargo </th> <!-- Coluna com o titulo --> <td id="modalCargoRepresentante"> </td> <!-- Informação cadastrada sobre --> </tr>											   
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
				 					<!-- Botão para redicionamento da página para alteração de dados -->
						      		<input type="hidden" name="txtAcaoRepresentante" id="txtAcaoRepresentante" value="alterar">
				      				<button type="submit" name="btnAlterarItem" class="btn btn-success"> Alterar representante </button>
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

			<!-- Div para surgimento e posicionamento do model -->
			<div class="modal fade" id="modalVerificarExclusao" name="modalVerificarExclusao" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">				

				<!-- Abertura da div de regulação do modelo -->
			  	<div class="modal-dialog" role="document">
				  	<!-- Conteúdo do model -->
				    <div class="modal-content">
				    	<!-- Abertura do formulário do model -->
				    	<form method="POST" action="representante_processa.php">
					    	<!-- Abertura da div do cabeçalho do model -->	
					      	<div class="modal-header bg-dark">
					      		<!-- Titulo do model -->
						        <h5 class="text-light modal-title" id="exampleModalLabel">
						        	Excluir este representante
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
					        	<input name="idRepresentanteExcluir" type="hidden" id="idRepresentanteExcluir">
					        					        				
			        			<!-- Abertura do corpo da tabela --> 
			        			<tbody>
			        				
			        				<h5 class="h5"> Tem certeza que deseja excluir este representante? </h5>
			        				<p class="p mb-4 text-danger"> Obs: Esta operação nao poderá ser revertida! </p>

			        				<p> <b> Nome representante: </b><span id="modalExcludeNomeRepresentante"></span> </p>
			        				<p> <b> RG e CPF: </b><span id="modalExcludeRGRepresentante"></span><span id="modalExcludeCPFRepresentante"></span> </p>
			        				<p> <b> Representando a: </b><span id="modalExcludeNomeCliente"></span>  </p>
								<!-- Encerramento do cabeçalho da tabela --> 
			        			</tbody>
					        						        		
					        <!-- Encerramento da div do corpo do model -->	        			 								       
					      	</div>
					      	<!-- Abertura do Rodapé do model -->
					      	<div class="modal-footer bg-dark">
								
								<div class="form-group">

										<button type="button" class="btn btn-danger" data-dismiss="modal"> Não, foi um acidente </button>
					 					<button type="submit" class="btn btn-success" id="btnExcluir" name="btnExcluir"> Sim, desejo excluí-lo </button>
					 					<input type="hidden" name="txtAcaoRepresentante" name="txtAcaoRepresentante" value="Excluir">
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

			<!-- Script para funcionamento da transferência dos componentes do form para o model -->
			<script type="text/javascript">

				$('#modalConsultarCadastro').on('show.bs.modal', function (event) {
					var button = $(event.relatedTarget) // Button that triggered the modal
					var recipientNomeCliente = button.data('whatever-cliente-nome') // Extract info from data-* attributes
					var recipientIdentifier = button.data('whatever-representante-identificador') // Extract info from data-* attributes
					var recipientNome = button.data('whatever-representante-nome') // Extract info from data-* attributes
					var recipientRG = button.data('whatever-representante-rg') // Extract info from data-* attributes
					var recipientCPF = button.data('whatever-representante-cpf') // Extract info from data-* attributes
					var recipientProfissao = button.data('whatever-representante-profissao') // Extract info from data-* attributes
					var recipientCargo = button.data('whatever-representante-cargo') // Extract info from data-* attributes	
					var recipientNacionalidade = button.data('whatever-representante-nacionalidade') // Extract info from data-* attributes	
					

					var modal = $(this)					
					modal.find('#modalIdentificadorRepresentante').text(recipientIdentifier)
					modal.find('#modalNomeRepresentante').text(recipientNome)
					modal.find('#modalRGRepresentante').text(recipientRG)
					modal.find('#modalCPFRepresentante').text(recipientCPF)
					modal.find('#modalProfissaoRepresentante').text(recipientProfissao)
					modal.find('#modalCargoRepresentante').text(recipientCargo)
					modal.find('#modalNacionalidadeRepresentante').text(recipientNacionalidade)
					modal.find('#modalNomeCliente').text(recipientNomeCliente)
					  
				});

				$('#modalVerificarExclusao').on('show.bs.modal', function (event) {

					var button = $(event.relatedTarget) // Button that triggered the modal
					var recipientIdentifier = button.data('whatever-identificador') // Extract info from data-* attributes
					var recipientNome = button.data('whatever-nome') // Extract info from data-* attributes
					var recipientRG = button.data('whatever-rg') // Extract info from data-* attributes					
					var recipientCPF = button.data('whatever-cpf') // Extract info from data-* attributes					
					var recipientRepresenta = button.data('whatever-representa') // Extract info from data-* attributes

					var recipientIdentifier = recipientIdentifier.trim();

					var modal = $(this)
					modal.find('#idRepresentanteExcluir').val(recipientIdentifier)					
					modal.find('#modalExcludeNomeRepresentante').text(recipientNome)
					modal.find('#modalExcludeRGRepresentante').text(recipientRG)
					modal.find('#modalExcludeCPFRepresentante').text(recipientCPF)		
					modal.find('#modalExcludeNomeCliente').text(recipientRepresenta)			
				});

			</script>			
		<!-- Encerramento da div que irá conter o menu lateral e o conteudo do sistema -->
		</div>			
	<!-- Encerramento da div que irá cobrir toda a tela em questão de largura -->
	</div>

</body>

<!-- Encerramento da tag de html -->
</html>