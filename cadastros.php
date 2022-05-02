<!-- Instancia o header do site -->
<?php require_once("header.php"); ?>

<?php

	//Verificação se existe algum usuário logado para acesso desta página;
	include "identificacao_cargo.php";	

	//Verificação de qual opção do menu está selecionada...
	$activeMenu = "Cadastros";		

	//Inicia-se uma conexão com o banco de dados;
	require ("ConnectionMYSQL/connection.php");
	//Inicia-se uma conexão com a classe de objetos de clientes;
	require ("ObjetoTransferencia/cliente.php");
	//Inicia-se uma conexão com a classe de negocios de clientes;
	require ("Negocios/clienteNegocios.php");

	//Instancia-se o objeto de negócios dos clientes;
	$clienteNegocios = new ClienteNegocios();

	//Verificação se o botão de pesquisa de cliente foi acionado;
	if (!isset($_REQUEST['btnPesquisarCliente'])) {

		//Executa o procedimento para pesquisa de clientes sem restrições alguma...
		$resultClientes = $clienteNegocios->consultarClientePeloCriterio('', '');
	} 
	else {

		//Executa o procedimento para pesquisa de clientes com as restrições digitadas ou selecionadas pelo usuário;
		$resultClientes = $clienteNegocios->consultarClientePeloCriterio($_POST['sltCriterioPesquisaCliente'],  $_POST['txtCriterioPesquisaCliente']);
	}

	//Inicia-se conexão com o método de funções por causa da manipulação de datas deste form
	require ("functions.php");

?>

<!-- Instancia o painel do site contendo o menu vertical -->
<?php require_once("painel.php"); ?>

			<!-- Abertura da div que irá conter o conteúdo do site -->
			<main class="col-md-12 col-lg-10" role="main">

				<!-- Titulo da sessão em evidência -->
				<h2 class="h2"> Cadastro / Visualização dos Clientes </h2>

				<form action="" method="POST">
					<!-- Abertura da div que irá comportar um conjunto para pesquisa de clientes -->
					<div class="input-group mb-3">
						<!-- TextField para pesquisa do nome da empresa -->
					  	<input type="text" class="form-control" id="txtCriterioPesquisaCliente" name="txtCriterioPesquisaCliente" placeholder="Digite o texto a ser pesquisado" aria-label="Digite o texto a ser pesquisado" aria-describedby="button-addon2">
					  	<!-- Select para selecionar o critério de pesquisa a ser trabalhado -->
					  	<select class="form-control" id="sltCriterioPesquisaCliente" name="sltCriterioPesquisaCliente" required>
					      	<option value=""> Filtrar por: </option>
					      	<option value="CPF/CNPJ"> CPF/CNPJ </option>
					      	<option value="Razão Social"> Razão Social </option>
					      	<option value="Nome Fantasia"> Nome Fantasia </option>					     	
					    </select>
					  	<!-- Abertura da div que irá compor na textField em conjunto -->
					  	<div class="input-group-append">
					  		<!-- Botão para iniciar a pesquisa do nome digitado acima -->
					   		<button type="submit" name="btnPesquisarCliente" id="btnPesquisarCliente" class="btn btn-outline-secondary" type="button" id="button-addon2" > Pesquisar </button>
					   	<!-- Encerramento da div que irá compor na textField em conjunto -->
					  	</div>
					<!-- Encerramento da div que irá comportar um conjunto para pesquisa de clientes -->
					</div> 
				</form>

				<!-- Abertura de uma linha para equilibrio de elementos visuais -->
				<div class="row">

					<!-- Abertura de uma div que irá posicionar parte da linha -->
					<div class="col-md-6 col-lg-4 ">

						<h4 class="m-4"> Clientes / Empresas: </h4> 
					<!-- Encerramento de uma div que irá posicionar parte da linha -->
					</div>

					<!-- Abertura de uma div que irá posicionar parte da linha -->
					<div class="col-md-6 col-lg-8">
						<!-- Abertura do formulário de ação para direcionar o button para outra página -->
						<form action="cadastro_detalhe.php" method="POST">

							<?php

								if ($_SESSION['inserirCreden'] == 1) {
							?>	
														
								<!-- Botão para redirecionar o usuario para a página de registro de cliente -->
								<button class="btn btn-block btn-primary my-4" type="submit" id="btnInserirCliente" name="btnInserirCliente">
									Inserir novo cliente
								</button>

							<?php						

								}
							?>

							<input type="hidden" id="txtAcaoCadastro" name="txtAcaoCadastro" value="novo">	
						<!-- Encerramento do formulário de ação para direcionar o button para outra página -->
						</form>	
					<!-- Encerramento de uma div que irá posicionar parte da linha -->
					</div>							
				<!-- Encerramento de uma linha para equilibrio de elementos visuais -->
				</div>

				<!-- Abertura da div que permite a tabela ser responsiva -->
				<div class="table-responsive-md table-responsive-sm table-responsive-xs table-wrapper-scroll-y">

					<!-- Abertura da tabela dos clientes cadastrados -->
					<table class="table">
						<!-- Abertura do header da tabela -->
						<thead class="thead text-light bg-dark sticky-top">
						
							<!-- Table row é criada -->
						    <tr>
						    	<!-- Table header, isto é, os titulos da coluna são instanciados com escopo proprios para colunasde titulo -->
						      	<th scope="col">ID</th>
						      	<th scope="col">Nome/Razão social</th>
						      	<th scope="col">Fantasia</th>						      	
						      	<th scope="col">Tipo</th>
						      	<th scope="col">Protocolo</th>
						      	<th scope="col">Operações</th>
						    </tr>
					    <!-- Encerramento do header da tabela -->
					  	</thead>
					  	<!-- Abertura do corpo da tabela -->
					  	<tbody class="tbody" name="tableBodyResponse" id="tableBodyResponse">

					  		<?php if (count($resultClientes) > 0) { ?>

						  		<!-- Looping para geração de linhas e formulários para respectivos registros -->
						  		<?php     for ($i = 0; $i < count($resultClientes); $i++ ) {       ?>

							  		<!-- Criação da linha da tabela -->
							  		<tr>

							  			<!-- Criação do formulário desta linha -->
							  			<form action="cadastro_detalhe.php" method="POST">

							  				<!-- Titulo da linha da tabela -->
							  				<th scope="row"> <?php echo $resultClientes[$i]['identificadorCliente'] ?> </th>
							  				<?php echo '<input type="hidden" name="txtIdentificadorCliente" id="txtIdentificadorCliente" value=" 
							  					' . $resultClientes[$i]['identificadorCliente'] . ' ">' ?>
							  				<!-- Coluna respectiva da "Razão Social" -->
							  				<td> <?php echo $resultClientes[$i]['razaoSocialCliente'] ?> </td>
							  				<?php echo ' <input type="hidden" name="txtRazaoSocialCliente" id="txtRazaoSocialCliente" value="
							  					' . $resultClientes[$i]['razaoSocialCliente'] . '"> ' ?>
							  				<!-- Coluna respectiva da "Nome Fantasia" -->
							  				<td> <?php echo $resultClientes[$i]['nomeFantasiaCliente'] ?> </td> 
							  				<?php echo ' <input type="hidden" name="txtFantasiaCliente" id="txtFantasiaCliente" value="
							  					' . $resultClientes[$i]['nomeFantasiaCliente'] . '"> ' ?>
							  				<!-- Coluna respectiva da "Tipo do cliente" -->
							  				<td> <?php echo $resultClientes[$i]['tipoPessoaCliente'] ?> </td> 
							  				<?php echo ' <input type="hidden" name="txtTipoCliente" id="txtTipoCliente" value="
							  					' . $resultClientes[$i]['tipoPessoaCliente'] . ' "> ' ?>
							  				<!-- Coluna respectiva da "Protocolo" -->
							  				<td> <?php echo $resultClientes[$i]['protocoloCliente'] ?> </td>
							  				<?php echo ' <input type="hidden" name="txtProtocoloCliente" id="txtProtocoloCliente" value="
							  					' . $resultClientes[$i]['protocoloCliente'] . ' "> ' ?>
							  				<!-- Fundação cliente -->
							  				<?php $resultClientes[$i]['dataFundacaoCliente'] = converteData($resultClientes[$i]['dataFundacaoCliente'], "BR") ?>

							  				<?php echo ' <input type="hidden" name="txtFundacaoCliente" id="txtFundacaoCliente" value="
							  					' . $resultClientes[$i]['dataFundacaoCliente'] . ' "> ' ?>	

							  				<!-- Informações sobre o endereco de localização -->
							  				<?php echo '<input type="hidden" name="txtIdentificadorLocalizacao" id="txtIdentificadorLocalizacao" value=" 
							  					' . $resultClientes[$i]['identificadorLocalizacao'] . ' ">' ?>
							  				<?php echo ' <input type="hidden" name="txtCepLocalizacao" id="txtCepLocalizacao" value="
							  					' . $resultClientes[$i]['cepLocalizacao'] . ' "> ' ?>	
							  				<?php echo ' <input type="hidden" name="txtLougradouroLocalizacao" id="txtLougradouroLocalizacao" value="
							  					' . $resultClientes[$i]['lougradouroLocalizacao'] . ' "> ' ?>	
							  				<?php echo ' <input type="hidden" name="txtBairroLocalizacao" id="txtBairroLocalizacao" value="
							  					' . $resultClientes[$i]['bairroLocalizacao'] . ' "> ' ?>	
							  				<?php echo ' <input type="hidden" name="txtCidadeLocalizacao" id="txtCidadeLocalizacao" value="
							  					' . $resultClientes[$i]['cidadeLocalizacao'] . ' "> ' ?>	
							  				<?php echo ' <input type="hidden" name="txtEstadoLocalizacao" id="txtEstadoLocalizacao" value="
							  					' . $resultClientes[$i]['estadoLocalizacao'] . ' "> ' ?>	
							  				<?php echo ' <input type="hidden" name="txtCaixaPostalLocalizacao" id="txtCaixaPostalLocalizacao" value="
							  					' . $resultClientes[$i]['caixaPostalLocalizacao'] . ' "> ' ?>	
							  				<?php echo ' <input type="hidden" name="txtTelefoneLocalizacao" id="txtTelefoneLocalizacao" value="
							  					' . $resultClientes[$i]['telefoneLocalizacao'] . ' "> ' ?>	
							  				<?php echo ' <input type="hidden" name="txtEmailLocalizacao" id="txtEmailLocalizacao" value="
							  					' . $resultClientes[$i]['emailLocalizacao'] . ' "> ' ?>	
							  				<?php echo ' <input type="hidden" name="txtSiteLocalizacao" id="txtSiteLocalizacao" value="
							  					' . $resultClientes[$i]['siteLocalizacao'] . ' "> ' ?>	
							  				<?php echo ' <input type="hidden" name="txtContatoLocalizacao" id="txtContatoLocalizacao" value="
							  					' . $resultClientes[$i]['contatoLocalizacao'] . ' "> ' ?>	

							  				<!-- Informações sobre o endereco de correspondência -->
							  				<?php echo '<input type="hidden" name="txtIdentificadorCorrespondencia" id="txtIdentificadorCorrespondencia" value=" 
							  					' . $resultClientes[$i]['identificadorCorrespondencia'] . ' ">' ?>
							  				<?php echo ' <input type="hidden" name="txtCepCorrespondencia" id="txtCepLocalizacao" value="
							  					' . $resultClientes[$i]['cepCorrespondencia'] . ' "> ' ?>	
							  				<?php echo ' <input type="hidden" name="txtLougradouroCorrespondencia" id="txtLougradouroLocalizacao" value="
							  					' . $resultClientes[$i]['lougradouroCorrespondencia'] . ' "> ' ?>	
							  				<?php echo ' <input type="hidden" name="txtBairroCorrespondencia" id="txtBairroLocalizacao" value="
							  					' . $resultClientes[$i]['bairroCorrespondencia'] . ' "> ' ?>	
							  				<?php echo ' <input type="hidden" name="txtCidadeCorrespondencia" id="txtCidadeLocalizacao" value="
							  					' . $resultClientes[$i]['cidadeCorrespondencia'] . ' "> ' ?>	
							  				<?php echo ' <input type="hidden" name="txtEstadoCorrespondencia" id="txtEstadoLocalizacao" value="
							  					' . $resultClientes[$i]['estadoCorrespondencia'] . ' "> ' ?>	
							  				<?php echo ' <input type="hidden" name="txtCaixaPostalCorrespondencia" id="txtCaixaPostalLocalizacao" value="
							  					' . $resultClientes[$i]['caixaPostalCorrespondencia'] . ' "> ' ?>	
							  				<?php echo ' <input type="hidden" name="txtTelefoneCorrespondencia" id="txtTelefoneLocalizacao" value="
							  					' . $resultClientes[$i]['telefoneCorrespondencia'] . ' "> ' ?>	
							  				<?php echo ' <input type="hidden" name="txtContatoCorrespondencia" id="txtContatoLocalizacao" value="
							  					' . $resultClientes[$i]['contatoCorrespondencia'] . ' "> ' ?>

							  				<!-- Coluna respectiva para a ação de botões -->
							  				<td>  

							  					<!-- Botão para visualização das informações completas deste cliente -->
							  					<?php 						  						

							  						echo 
							  						'<button type="button" class="btn btn-success" data-toggle="modal" data-target="#modalConsultarCadastro"
									      				
									      				data-whatever-cliente-0=" ' . $resultClientes[$i]['identificadorCliente'] . ' "
									      				data-whatever-cliente-1="' . $resultClientes[$i]['razaoSocialCliente'] . '" 
									      				data-whatever-cliente-2="' . $resultClientes[$i]['nomeFantasiaCliente'] . '" 
									      				data-whatever-cliente-3="' . $resultClientes[$i]['tipoPessoaCliente'] . '"
									      				data-whatever-cliente-4="' . $resultClientes[$i]['protocoloCliente'] . '"
									      				data-whatever-cliente-5="' . $resultClientes[$i]['dataFundacaoCliente'] . '"

									      				data-whatever-localizacao-0="' . $resultClientes[$i]['identificadorLocalizacao'] . '"
									      				data-whatever-localizacao-1="' . $resultClientes[$i]['cepLocalizacao'] . '"
									      				data-whatever-localizacao-2="' . $resultClientes[$i]['lougradouroLocalizacao'] . '"
									      				data-whatever-localizacao-3="' . $resultClientes[$i]['bairroLocalizacao'] . '"
									      				data-whatever-localizacao-4="' . $resultClientes[$i]['cidadeLocalizacao'] . '"
									      				data-whatever-localizacao-5="' . $resultClientes[$i]['estadoLocalizacao'] . '"
									      				data-whatever-localizacao-6="' . $resultClientes[$i]['caixaPostalLocalizacao'] . '"
									      				data-whatever-localizacao-7="' . $resultClientes[$i]['telefoneLocalizacao'] . '"
									      				data-whatever-localizacao-8="' . $resultClientes[$i]['emailLocalizacao'] . '"
									      				data-whatever-localizacao-9="' . $resultClientes[$i]['siteLocalizacao'] . '"
									      				data-whatever-localizacao-10="' . $resultClientes[$i]['contatoLocalizacao'] . '"

									      				data-whatever-correspondencia-0="' . $resultClientes[$i]['identificadorCorrespondencia'] . '"
									      				data-whatever-correspondencia-1="' . $resultClientes[$i]['cepCorrespondencia'] . '"
									      				data-whatever-correspondencia-2="' . $resultClientes[$i]['lougradouroCorrespondencia'] . '"
									      				data-whatever-correspondencia-3="' . $resultClientes[$i]['bairroCorrespondencia'] . '"
									      				data-whatever-correspondencia-4="' . $resultClientes[$i]['cidadeCorrespondencia'] . '"
									      				data-whatever-correspondencia-5="' . $resultClientes[$i]['estadoCorrespondencia'] . '"
									      				data-whatever-correspondencia-6="' . $resultClientes[$i]['caixaPostalCorrespondencia'] . '"
									      				data-whatever-correspondencia-7="' . $resultClientes[$i]['telefoneCorrespondencia'] . '"
									      				data-whatever-correspondencia-8="' . $resultClientes[$i]['contatoCorrespondencia'] . '"
									      				> Consultar 
									      			</button>'; 
									      		?>

									      		<?php 

									      			if ($_SESSION['alterarCreden'] == 1) {
									      		?>

									      		<!-- Botão para redicionamento da página para alteração de dados -->
									      		<button type="submit" id="btnAlterarCliente" name="btnAlterarCliente" class="btn btn-warning"> Alterar </button>
									      		<input type="hidden" id="txtAcaoCadastro" name="txtAcaoCadastro" value="alterar">
									      		<!-- Botão para exclusão do dado atual -->

									      		<?php 

									      			}
									      		?>

									      		<?php

									      			if ($_SESSION['excluirCreden'] == 1) {

									      				echo 
										      				'<button type="button" id="btnExcluirCliente" name="btnExcluirCliente" class="btn btn-danger"
											      			data-toggle="modal" data-target="#modalVerificarExclusao"
											      			data-whatever-identificador=" ' . $resultClientes[$i]['identificadorCliente'] . ' "
											      			data-whatever-razaosocial=" ' . $resultClientes[$i]['razaoSocialCliente'] . ' "
											      			data-whatever-nomefantasia=" ' . $resultClientes[$i]['nomeFantasiaCliente'] . ' "
											      			data-whatever-protocolo=" ' . $resultClientes[$i]['protocoloCliente'] . ' "
											      			> Excluir </button>';
									      			}								      		
									      		?>
							  				</td>					  				
							  									  			
							  			<!-- Encerrramento do formulário desta linha -->
							  			</form>

							  		<!-- Encerrramento da linha da tabela -->
							  		</tr>

						  		<!-- Encerramento do looping do vetor das linhas do cliente -->
						  		<?php   }	?>	
						  	<?php } else { ?>

						  		<!-- Criação da linha da tabela -->
							  	<tr>
							  		<th class="text-center" colspan="6"> Nenhum cliente cadastrado ainda... </td>
							  	</tr>

						  	<?php } ?>
						<!-- Encerramento do corpo da tabela -->
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
				    	<form method="POST" action="cadastro_action.php">
					    	<!-- Abertura da div do cabeçalho do model -->	
					      	<div class="modal-header bg-dark">
					      		<!-- Titulo do model -->
						        <h5 class="text-light modal-title" id="exampleModalLabel">
						        	Informações do cadastrado 
						        </h5>

						        <?php

									//Inicia-se uma sessão;
									//session_start();
									//Atribuí-se o identificador do id selecionado;					

									//include "cadastro_query_localizacao";								
								?>

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
						        				<!-- Sessão 1 das informações desta etapa -->
						        				<tr> <th class="bg-primary text-light text-center" scope="row" colspan="2"> Sede </th> </tr>
						        				<!-- Label e lacuna para a razão social -->
						        				<tr> <th scope="row"> Razão social </th> <!-- Coluna com o titulo --> <td id="modalNomeCliente"> </td> <!-- Informação cadastrada sobre --> </tr>
						        				<!-- Label e lacuna para o tipo da pessoa -->
											    <tr> <th scope="row"> Tipo Pessoa </th> <!-- Coluna com o titulo --> <td id="modalTipoCliente">  </td> <!-- Informação cadastrada sobre --> </tr>
											    <!-- Label e lacuna para o protocolo -->
											    <tr> <th scope="row"> CPF/CNPJ </th> <!-- Coluna com o titulo --> <td id="modalProtocoloCliente"> </td> <!-- Informação cadastrada sobre --> </tr>    
											    <!-- Label e lacuna para o nome fantasia -->
											    <tr> <th scope="row"> Nome Fantasia </th> <!-- Coluna com o titulo --> <td id="modalFantasiaCliente">  </td> <!-- Informação cadastrada sobre --> </tr>
											    <!-- Label e lacuna para a data da fundação -->
											    <tr> <th scope="row"> Data de Fundação </th> <!-- Coluna com o titulo --> <td id="modalDataFundacaoCliente">  </td> <!-- Informação cadastrada sobre --> </tr>  	
											        
											    <!-- Sessão 2 das informações desta etapa -->
											    <tr> <th class="bg-primary text-light text-center" scope="row" colspan="2"> Localização </th> </tr>											      	
											    <!-- Label e lacuna para o cep da localização -->
											    <tr> <th scope="row"> CEP </th> <!-- Coluna com o titulo --> <td id="modalCepLocalizacao">  </td> <!-- Informação cadastrada sobre --> </tr>
												<!-- Label e lacuna para o lougradouro da localização -->
											    <tr> <th scope="row"> Endereco (Rua) </th> <!-- Coluna com o titulo --> <td id="modalLougradouroLocalizacao"> </td> <!-- Informação cadastrada sobre --> </tr>
											    <!-- Label e lacuna para o bairro da localização -->
											    <tr> <th scope="row"> Bairro </th>  <!-- Coluna com o titulo --> <td id="modalBairroLocalizacao">  </td> <!-- Informação cadastrada sobre --> </tr>    
											    <!-- Label e lacuna para o cidade da localização -->
											    <tr> <th scope="row"> Cidade </th> <!-- Coluna com o titulo --> <td id="modalCidadeLocalizacao"> </td> <!-- Informação cadastrada sobre --> </tr>
											    <!-- Label e lacuna para o estado da localização -->
						        				<tr> <th scope="row"> UF </th> <!-- Coluna com o titulo --> <td id="modalEstadoLocalizacao"> </td> <!-- Informação cadastrada sobre --> </tr>	
						        				<!-- Label e lacuna para o caixa postal da localização -->
						        				<tr> <th scope="row"> Cx. Postal </th> <!-- Coluna com o titulo --> <td id="modalCaixaPostalLocalizacao"> </td> <!-- Informação cadastrada sobre --> </tr>
											    <!-- Label e lacuna para o telefone da localização -->
											    <tr> <th scope="row"> Telefone </th> <!-- Coluna com o titulo --> <td id="modalTelefoneLocalizacao"> </td> <!-- Informação cadastrada sobre --> </tr>	
											    <!-- Label e lacuna para o contato da localização -->
											    <tr> <th scope="row"> Contato </th> <!-- Coluna com o titulo --> <td id="modalContatoLocalizacao"> </td> <!-- Informação cadastrada sobre --> </tr>
											    <!-- Label e lacuna para o email da localização -->
											    <tr> <th scope="row"> E-mail </th> <!-- Coluna com o titulo --> <td id="modalEmailLocalizacao"> </td> <!-- Informação cadastrada sobre --> </tr>	
											    <!-- Label e lacuna para o site da localização -->
											    <tr> <th scope="row"> Site </th> <!-- Coluna com o titulo --> <td id="modalSiteLocalizacao"> </td> <!-- Informação cadastrada sobre --> </tr>

											    <!-- Sessão 3 das informações desta etapa -->
											    <tr> <th class="bg-primary text-light text-center" scope="row" colspan="2"> Correspondência </th> </tr>
											    <!-- Label e lacuna para o cep da correspondencia -->
											   	<tr> <th scope="row"> CEP </th> <!-- Coluna com o titulo --> <td id="modalCepCorrespondencia"> </td> <!-- Informação cadastrada sobre --> </tr>
											    <!-- Label e lacuna para o lougradouro da correspondencia -->
											    <tr> <th scope="row"> Endereco </th> <!-- Coluna com o titulo --> <td id="modalLougradouroCorrespondencia"> </td> <!-- Informação cadastrada sobre --> </tr>    
											    <!-- Label e lacuna para o bairro da correspondencia -->
											    <tr> <th scope="row"> Bairro </th> <!-- Coluna com o titulo --> <td id="modalBairroCorrespondencia"> </td> <!-- Informação cadastrada sobre --> </tr>
											    <!-- Label e lacuna para a cidade da correspondencia -->
											    <tr> <th scope="row"> Cidade </th> <!-- Coluna com o titulo --> <td id="modalCidadeCorrespondencia"> </td> <!-- Informação cadastrada sobre --> </tr>  	
											    <!-- Label e lacuna para o estado da correspondencia -->
											    <tr> <th scope="row"> UF </th> <!-- Coluna com o titulo --> <td id="modalEstadoCorrespondencia"> </td> <!-- Informação cadastrada sobre --> </tr>
											    <!-- Label e lacuna para a caixa postal da correspondencia -->
											    <tr> <th scope="row"> Cx. Postal </th> <!-- Coluna com o titulo --> <td id="modalCaixaPostalCorrespondencia"> </td> <!-- Informação cadastrada sobre --> </tr>
											    <!-- Label e lacuna para o telefone da correspondencia -->
											    <tr> <th scope="row"> Telefone </th> <!-- Coluna com o titulo --> <td id="modalTelefoneCorrespondencia"> </td> <!-- Informação cadastrada sobre --> </tr>    
											    <!-- Label e lacuna para o contato da localização -->
											    <tr> <th scope="row"> Contato </th> <!-- Coluna com o titulo --> <td id="modalContatoCorrespondencia"> </td> <!-- Informação cadastrada sobre --> </tr>
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

					 					<button type="button" class="btn btn-danger" data-dismiss="modal"> Fechar </button>
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
				    	<form method="POST" action="cadastro_processa.php">
					    	<!-- Abertura da div do cabeçalho do model -->	
					      	<div class="modal-header bg-dark">
					      		<!-- Titulo do model -->
						        <h5 class="text-light modal-title" id="exampleModalLabel">
						        	Excluir este cliente
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
					        	<input name="txtIdentificadorCliente" type="hidden" id="txtIdentificadorCliente">
					        					        				
			        			<!-- Abertura do corpo da tabela --> 
			        			<tbody>
			        				
			        				<h5 class="h5"> Tem certeza que deseja excluir este cliente e seus respectivos representantes? </h5>
			        				<p class="p mb-4 text-danger"> Obs: Esta operação nao poderá ser revertida! </p>

			        				<p> <b> Razao / Fantasia: </b> 
			        					<span id="modalExcludeRazaoSocial"> -- </span> 
			        					/
			        					<span id="modalExcludeNomeFantasia"> -- </span> </p>
			        				<p> <b> Protocolo: </b> <span id="modalExcludeRecipientProtocolo"> </span> </p>
								<!-- Encerramento do cabeçalho da tabela --> 
			        			</tbody>
					        						        		
					        <!-- Encerramento da div do corpo do model -->	        			 								       
					      	</div>
					      	<!-- Abertura do Rodapé do model -->
					      	<div class="modal-footer bg-dark">
								
								<div class="form-group">

										<button type="button" class="btn btn-danger" data-dismiss="modal"> Não, foi um acidente </button>
					 					<button type="submit" class="btn btn-success" id="btnExcluir" name="btnExcluir"> Sim, desejo excluí-lo </button>
					 					<input type="hidden" name="txtAcaoDetalhe" name="txtAcaoDetalhe" value="Excluir">
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
					var recipientIdentifier = button.data('whatever-cliente-0') // Extract info from data-* attributes
					var recipientNome = button.data('whatever-cliente-1') // Extract info from data-* attributes
					var recipientFantasia = button.data('whatever-cliente-2') // Extract info from data-* attributes
					var recipientTipo = button.data('whatever-cliente-3') // Extract info from data-* attributes
					var recipientProtocolo = button.data('whatever-cliente-4') // Extract info from data-* attributes
					var recipientDataFundacao = button.data('whatever-cliente-5') // Extract info from data-* attributes	

					var recipientIdentifierLocalizacao = button.data('whatever-localizacao-0');
					var recipientCepLocalizacao = button.data('whatever-localizacao-1');
					var recipientLougradouroLocalizacao = button.data('whatever-localizacao-2');
					var recipientBairroLocalizacao = button.data('whatever-localizacao-3');
					var recipientCidadeLocalizacao = button.data('whatever-localizacao-4');
					var recipientEstadoLocalizacao = button.data('whatever-localizacao-5');
					var recipientCaixaPostalLocalizacao = button.data('whatever-localizacao-6');
					var recipientTelefoneLocalizacao = button.data('whatever-localizacao-7');
					var recipientEmailLocalizacao = button.data('whatever-localizacao-8');
					var recipientSiteLocalizacao = button.data('whatever-localizacao-9');
					var recipientContatoLocalizacao = button.data('whatever-localizacao-10');

					var recipientIdentifierCorrespondencia = button.data('whatever-correspondencia-0');
					var recipientCepCorrespondencia = button.data('whatever-correspondencia-1');
					var recipientLougradouroCorrespondencia = button.data('whatever-correspondencia-2');
					var recipientBairroCorrespondencia = button.data('whatever-correspondencia-3');
					var recipientCidadeCorrespondencia = button.data('whatever-correspondencia-4');
					var recipientEstadoCorrespondencia = button.data('whatever-correspondencia-5');
					var recipientCaixaPostalCorrespondencia = button.data('whatever-correspondencia-6');
					var recipientTelefoneCorrespondencia = button.data('whatever-correspondencia-7');
					var recipientContatoCorrespondencia = button.data('whatever-correspondencia-8');


					var modal = $(this)
					//modal.find('.modal-title').text('Id do reciclador: ' + recipientIdentifier)
					modal.find('#modalIdentificadorCliente').text(recipientIdentifier)
					modal.find('#modalNomeCliente').text(recipientNome)
					modal.find('#modalFantasiaCliente').text(recipientFantasia)
					modal.find('#modalTipoCliente').text(recipientTipo)
					modal.find('#modalProtocoloCliente').text(recipientProtocolo)
					modal.find('#modalDataFundacaoCliente').text(recipientDataFundacao)

					modal.find('#modalCepLocalizacao').text(recipientCepLocalizacao)
					modal.find('#modalLougradouroLocalizacao').text(recipientLougradouroLocalizacao)
					modal.find('#modalBairroLocalizacao').text(recipientBairroLocalizacao)
					modal.find('#modalCidadeLocalizacao').text(recipientCidadeLocalizacao)
					modal.find('#modalEstadoLocalizacao').text(recipientEstadoLocalizacao)
					modal.find('#modalCaixaPostalLocalizacao').text(recipientCaixaPostalLocalizacao)
					modal.find('#modalTelefoneLocalizacao').text(recipientTelefoneLocalizacao)
					modal.find('#modalEmailLocalizacao').text(recipientEmailLocalizacao)
					modal.find('#modalSiteLocalizacao').text(recipientSiteLocalizacao)
					modal.find('#modalContatoLocalizacao').text(recipientContatoLocalizacao)

					modal.find('#modalCepCorrespondencia').text(recipientCepCorrespondencia)
					modal.find('#modalLougradouroCorrespondencia').text(recipientLougradouroCorrespondencia)
					modal.find('#modalBairroCorrespondencia').text(recipientBairroCorrespondencia)
					modal.find('#modalCidadeCorrespondencia').text(recipientCidadeCorrespondencia)
					modal.find('#modalEstadoCorrespondencia').text(recipientEstadoCorrespondencia)
					modal.find('#modalCaixaPostalCorrespondencia').text(recipientCaixaPostalCorrespondencia)
					modal.find('#modalTelefoneCorrespondencia').text(recipientTelefoneCorrespondencia)
					modal.find('#modalContatoCorrespondencia').text(recipientContatoCorrespondencia)					
						  											  											  									  							
				});

				$('#modalVerificarExclusao').on('show.bs.modal', function (event) {

					var button = $(event.relatedTarget) // Button that triggered the modal
					var recipientIdentifier = button.data('whatever-identificador') // Extract info from data-* attributes
					var recipientRazaoSocial = button.data('whatever-razaosocial') // Extract info from data-* attributes
					var recipientNomeFantasia = button.data('whatever-nomefantasia') // Extract info from data-* attributes					
					var recipientProtocolo = button.data('whatever-protocolo') // Extract info from data-* attributes

					var recipientIdentifier = recipientIdentifier.trim();

					var modal = $(this)
					modal.find('#txtIdentificadorCliente').val(recipientIdentifier)					
					modal.find('#modalExcludeRazaoSocial').text(recipientRazaoSocial)
					modal.find('#modalExcludeNomeFantasia').text(recipientNomeFantasia)
					modal.find('#modalExcludeRecipientProtocolo').text(recipientProtocolo)			
				});

				$('#btnConsultarCliente').on("click", (function() {

					alert("Teste");
				}));	

			</script>

		<!-- Encerramento da div que irá conter o menu lateral e o conteudo do sistema -->
		</div>			
	<!-- Encerramento da div que irá cobrir toda a tela em questão de largura -->
	</div>

</body>

<!-- Encerramento da tag de html -->
</html>