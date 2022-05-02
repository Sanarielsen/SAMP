<?php

	//Verificação se existe algum usuário logado para acesso desta página;
	include "identificacao_cargo.php";

	//Verificação de qual opção do menu está selecionada...
	$activeMenu = "ConfiguracaoAdmin";	

	//Verifica-se se o usuário atual possui permissão para acessar essa área;				
	if ( $_SESSION['UsuarioNomeCargo'] == "Administrador(a)" ) {

		//Inicia-se uma conexão com o banco de dados;
		require ("ConnectionMYSQL/connection.php");

		//========================== Procedimento para consulta de cargos;
		//Inicia-se uma conexão com a classe de negócios de cargo;
		require ("Negocios/cargoNegocios.php");

		//Instancia os procedimentos do cargo;
		$cargoNegocios = new CargoNegocios();

		//Inicia o procedimento para consulta dos cargos;
		$resultCargos = $cargoNegocios->consultarCargos();

		//========================== Procedimento para consulta do nome dos cargos;
		//Cria-se uma conexão com orientado objetos de cargo;
		require ("ObjetoTransferencia/cargo.php");

		// ====================================================================================

		//========================== Procedimento para consulta de usuários;
		//Inicia-se uma conexão com a classe de negócios de usuarios;
		require ("Negocios/usuarioNegocios.php");

		//Instancia os procedimentos do cliente;
		$usuarioNegocios = new UsuarioNegocios();

		//Inicia o procedimento para consulta dos clientes;
		$resultClientes = $usuarioNegocios->consultarUsuariosComCargo();		
?>

<!-- Instancia o header do site -->
<?php require_once("header.php"); ?>

<!-- Instancia o painel do site contendo o menu vertical -->
<?php require_once("painel.php"); ?>

			<!-- Abertura da div que irá conter o conteúdo do site -->
			<main class="col-md-12 col-lg-10 justify-content-center" role="main">				
		
				<div class="row rowGroup">

					<div class="col-12 text-center">

						<!-- Label de titulo para o grupo do formulário -->
						<label for="rowGroup"> <h1 class="h1 my-4"> Gerenciador de usuários </h1> </label>
					</div>
				</div>

				<div class="row rowGroup">

					<div class="col-12 col-sm-12 col-md-12 col-lg-6">

						<!-- Label de titulo para o grupo do formulário -->
						<label for="rowGroup"> <h4 class="h4"> Consultar / Excluir </h4> </label>

						<!-- Abertura da div que permite a tabela ser responsiva -->
						<div class="table-responsive-md table-responsive-sm table-responsive-xs table-wrapper-scroll-y">

							<!-- Tabela para visualização dos usuários cadastrados -->
							<table class="table table-striped">
							  	<thead>
								    <tr>
									    <th scope="col"> Nome </th>
									    <th scope="col"> Email </th>
									    <th scope="col"> Cargo </th>
									    <th scope="col"> Operações </th>
								    </tr>
							  	</thead>
							  	<tbody>

							  		<?php if ( count($resultClientes) > 0 ) { ?>	

								  		<!-- -->
								  		<?php 

								  			for ($i = 0; $i < count($resultClientes); $i++ ) {
								  		?>

									  		<form action="usuario_processa.php" method="POST">
										    	<tr>

										    		<?php												
										    			echo '<input type="hidden" name="txtUsuarioIdentificador" id="txtUsuarioIdentificador" 
										    			value="' . $resultClientes[$i]['identificadorUsuario'] . '"/>' ;

										    			echo '<input type="hidden" name="txtCargoUsuarioIdentificador" id="txtCargoUsuarioIdentificador" 
										    			value="' . $resultClientes[$i]['identificadorCargo'] . '"/>' ;

										    			echo '<td>' . $resultClientes[$i]['nomeUsuario'] . ' </td>';
										    			echo '<input type="hidden" name="txtNomeUsuario" id="txtNomeUsuario" 
										    			value="' . $resultClientes[$i]['nomeUsuario'] . '">' ;

										    			echo '<td>'  . $resultClientes[$i]['emailUsuario'] . ' </td>';
										    			echo '<input type="hidden" name="txtEmailUsuario" id="txtEmailUsuario" 
										    			value="' . $resultClientes[$i]['emailUsuario'] . '">' ;

										    			echo '<td>' . $resultClientes[$i]['nomeCargo'] . ' </td>';
										    			echo '<input type="hidden" name="txtNomeCargo" id="txtNomeCargo" 
										    			value="' . $resultClientes[$i]['nomeCargo'] . '">' ;
										    		?>	
											    		<td>
												    		<!-- Botão para redicionamento da página para alteração de dados -->
												      		<input type="hidden" name="txtAcaoUsuario" id="txtAcaoUsuario" value="excluir">						      		
												      		<button type="button" class="btn btn-danger" 
												      		data-toggle="modal" data-target="#modalConfirmarExclusaoUsuario"
												      		data-whatever-nome="<?php echo $resultClientes[$i]['nomeUsuario'] ?>"
												      		data-whatever-identify="<?php echo $resultClientes[$i]['identificadorUsuario'] ?>"> Excluir </button>
											      		</td>

										    	</tr>
									    	</form>

								    	<?php 

								    		}
								    	?>

								    <?php } else { ?>

								    	<!-- Table row é criada -->
										<tr>
											<th class="text-center" colspan="4"> Nenhum cargo cadastrado ainda... </th>
										</tr>

								    <?php } ?>

							  	</tbody>
							</table>

						</div>

					</div>

					<div class="col-12 col-sm-12 col-md-12 col-lg-6">

						<!-- Label de titulo para o grupo do formulário -->
						<label for="rowGroup"> <h5 class="h5"> Cadastrar novo usuário </h5> </label>

						<form action="usuario_processa.php" method="POST">
							<div class="form-group row" id="groupRowNomeUsuario">
							    <label for="txtNomeUsuario" class="col-sm-2 col-form-label"> Nome: </label>
							    <div class="col-sm-10">
							      	<input type="text" class="form-control" id="txtNomeUsuario" name="txtNomeUsuario" required>
							    </div>
							</div>
							<div class="form-group row" id="groupRowEmailUsuario">
							    <label for="txtEmailUsuario" class="col-sm-2 col-form-label"> Email: </label>
							    <div class="col-sm-10">
							      	<input type="email" class="form-control" id="txtEmailUsuario" name="txtEmailUsuario" placeholder="" required>
							    </div>
							</div>
							<div class="form-group row" id="groupRowSenhaUsuario">
							    <label for="txtSenhaUsuario" class="col-sm-2 col-form-label"> Senha: </label>
							    <div class="col-sm-10">
							      	<input type="password" class="form-control" id="txtSenhaUsuario" name="txtSenhaUsuario" placeholder="" required>
							    </div>
							</div>

							<div class="form-group row" id="groupRowCargoUsuario">
							    <label for="sltCargoUsuario" class="col-sm-2 col-form-label"> Cargo: </label>
							    <div class="col-sm-10">
							      	<select class="form-control" id="sltCargoUsuario" name="sltCargoUsuario" required>
									    <option value=""> Selecione o cargo deste usuário... </option>

									    <?php

									    	for ($i = 0; $i < count($resultCargos); $i++ ) {

									    		echo '
									    			<option value=' . $resultCargos[$i]["identificador"] . 
									    			'>' . $resultCargos[$i]["nomeCargo"] . ' </option>';									    
									    	}
									    ?>
									</select>
							    </div>
							</div>

							<div class="form-group row" id="groupRowPerguntaUsuario">
							    <label for="txtPerguntaUsuario" class="col-sm-2 col-form-label"> Pergunta: </label>
							    <div class="col-sm-10">
							      	<input type="text" class="form-control" id="txtPerguntaUsuario" name="txtPerguntaUsuario" placeholder="" required>
							    </div>
							</div>
							<div class="form-group row" id="groupRowRespostaUsuario">
							    <label for="txtRespostaUsuario" class="col-sm-2 col-form-label"> Resposta: </label>
							    <div class="col-sm-10">
							      	<input type="text" class="form-control" id="txtRespostaUsuario" name="txtRespostaUsuario" placeholder="" required>
							    </div>
							</div>

							<button id="btnCadastrarUsuario" name="btnCadastrarUsuario" type="submit" class="btn btn-lg btn-block btn-success"> Cadastrar novo usuário </button>
							<input type="hidden" id="txtAcaoUsuario" name="txtAcaoUsuario" value="inserir">
						</form>
					</div>

				</div>

				<div class="row rowGroup mt-4">

					<div class="col-12 text-center">
						
						<!-- Label de titulo para o grupo do formulário -->
						<label for="rowGroup"> <h1 class="h1 my-4"> Gerenciador de cargos </h1> </label>
					</div>
				</div>

				<div class="row rowGroup">

					<div class="col-12 col-sm-12 col-md-12 col-lg-6 text-center">

						<div class="form-group">
								    
						    <label for="exampleFormControlSelect2"> <h4 class="h4 "> Consultar / Excluir </h4> </label>
						    <!-- Abertura da div que permite a tabela ser responsiva -->
							<div class="table-responsive-md table-responsive-sm table-responsive-xs table-wrapper-scroll-y">

								<!-- Tabela para visualização dos usuários cadastrados -->
								<table class="table table-striped">
								  	
								  	<thead>
									    <tr>
										    <th scope="col"> Nome </th>
										    <th scope="col"> Inserir/Alterar <br> Consultar/Deletar </th>
										    <th scope="col"> Operações </th>
									    </tr>
								  	</thead>
								  	<tbody>

								  		<?php if ( count($resultClientes) > 0 ) { ?>		

								  		<!-- -->
								  		<?php 

								  			for ($i = 0; $i < count($resultCargos); $i++ ) {
								  		?>

									  		<form action="cargo_processa.php" method="POST">
										    	<tr>

										    		<?php												
										    			echo '<td>' . $resultCargos[$i]['nomenclaturaCargo'] . ' </td>';
										    			echo '<input type="hidden" name="txtNomeUsuario" id="txtNomeUsuario" 
										    			value="' . $resultCargos[$i]['nomenclaturaCargo'] . '">' ;

										    			echo '<td>' 
										    			. $resultCargos[$i]['inserirCredencialCargo'] . ' - ' 
										    			. $resultCargos[$i]['atualizarCredencialCargo'] . ' - ' 
										    			. $resultCargos[$i]['consultarCredencialCargo'] . ' - ' 
										    			. $resultCargos[$i]['excluirCredencialCargo'] .  
										    			' </td>';
										    			echo '<input type="hidden" name="txtEmailUsuario" id="txtEmailUsuario" 
										    			value="' . $resultCargos[$i]['inserirCredencialCargo'] . '">' ;
										    			echo '<input type="hidden" name="txtNomeCargo" id="txtNomeCargo" 
										    			value="' . $resultCargos[$i]['atualizarCredencialCargo'] . '">' ;
										    			echo '<input type="hidden" name="txtNomeCargo" id="txtNomeCargo" 
										    			value="' . $resultCargos[$i]['consultarCredencialCargo'] . '">' ;
										    			echo '<input type="hidden" name="txtNomeCargo" id="txtNomeCargo" 
										    			value="' . $resultCargos[$i]['excluirCredencialCargo'] . '">' ;

										    			echo '<input type="hidden" name="txtCargoIdentificador" id="txtCargoIdentificador" 
										    			value="' . $resultCargos[$i]['identificadorCargo'] . '"/>' ;
										    			
										    		?>	
											    		<td>
												    		<!-- Botão para redicionamento da página para alteração de dados -->
												      		<input type="hidden" name="txtAcaoCargo" id="txtAcaoCargo" value="excluir">
												      		<button type="button" class="btn btn-danger" id="btnExcluirCargo" name="btnExcluirCargo" data-toggle="modal" data-target="#modalConfirmarExclusaoCargo" 
												      		data-whatever-nome="<?php echo $resultCargos[$i]['nomenclaturaCargo'] ?>"
												      		data-whatever-identify="<?php echo $resultCargos[$i]['identificadorCargo'] ?>"> Excluir </button>
											      		</td>

										    	</tr>
									    	</form>

								    	<?php 

								    		}
								    	?>

								  		<?php } else { ?>

								    	<!-- Table row é criada -->
										<tr>
											<th class="text-center" colspan="4"> Nenhum usuario cadastrado ainda... </th>
										</tr>

								    <?php } ?>

								  	</tbody>

								</table>

							</div>

						</div>		
								
					</div>

					<div class="col-12 col-sm-12 col-md-12 col-lg-6 align-self-left">

						<!-- Label de titulo para o grupo do formulário -->
						<label for="formGroupCadastrarCargo"> <h5 class="h5"> Cadastrar novo cargo </h5> </label>

						<form action="cargo_processa.php" method="POST" data-toggle="validator">

							<div class="form-group row formGroupCadastrarCargo">
							    <label for="txtNomeCargo" class="col-sm-4 col-form-label"> Nome do Cargo: </label>
							    <div class="col-sm-8">
							      <input type="text" class="form-control" id="txtNomeCargo" name="txtNomeCargo" required>
							    </div>
							</div>											

							<div class="form-group row">											

								<label for="groupCheckBoxPermissoes" class="col-sm-3 col-form-label"> Permissões: </label>

								<div class="form-group col-sm-9 mt-2" id="groupCheckBoxPermissoes">

									<div class="form-check form-check-inline">
									  	<input class="form-check-input" type="checkbox" id="ccbOpcaoInserir" name="ccbOpcaoInserir" value="Inserir">
									  	<label class="form-check-label" for="inlineCheckbox1"> Inserir </label>
									</div>
									<div class="form-check form-check-inline">
									  	<input class="form-check-input" type="checkbox" id="ccbOpcaoAlterar" name="ccbOpcaoAlterar" value="Alterar">
									  	<label class="form-check-label" for="inlineCheckbox2"> Alterar </label>
									</div>
									<div class="form-check form-check-inline">
									  	<input class="form-check-input" type="checkbox" id="ccbOpcaoConsultar" name="ccbOpcaoConsultar" value="Consultar">
									  	<label class="form-check-label" for="inlineCheckbox2"> Consultar </label>
									</div>
									<div class="form-check form-check-inline">
									  	<input class="form-check-input" type="checkbox" id="ccbOpcaoExcluir" name="ccbOpcaoExcluir" value="Atualizar">
									  	<label class="form-check-label" for="inlineCheckbox3"> Excluir </label>
									</div>

								</div>

							</div>

							<button id="btnInserirCargo" name="btnInserirCargo" type="submit" class="btn btn-lg btn-block btn-success"> Cadastrar novo cargo </button>
							<input type="hidden" id="txtAcaoCargo" name="txtAcaoCargo" value="inserir">
						</form>			

					</div>



				<?php
					
			        }

			        else {
			        
				        //Caso não a tenha será redirecionado para a tela principal;
				        echo "<script>  

							alert('Olá, você nao tem permissões para acessar aqui, xau!');
							location.href='principal.php';
						</script>";

			    	}
				?>												
			<!-- Encerramento da div que irá conter o conteúdo do site -->
			</main>			
		<!-- Encerramento da div que irá conter o menu lateral e o conteudo do sistema -->
		</div>			
	<!-- Encerramento da div que irá cobrir toda a tela em questão de largura -->
	</div>

	<!-- Abertura da div do modal para confirmação da exclusão do cargo -->
	<div class="modal" name="modalConfirmarExclusaoCargo" id="modalConfirmarExclusaoCargo" tabindex="-1" role="dialog">
	  	
	  	<!-- Abertura da div da caixa de dialogo para o modal -->
	  	<div class="modal-dialog" role="document">
	    		
	    	<!-- Abertura da div para o contexto deste modal -->
	    	<div class="modal-content bg-dark">

	    		<!-- Abertura do formulário para a realização da transferencia de informações -->
	    		<form action="cargo_processa.php" method="POST">

		    		<!-- Abertura do header deste modal -->
		      		<div class="modal-header bg-dark">

		      			<!-- Titulo do modal -->
			        	<h5 class="modal-title text-light"> Excluir cargo? </h5>

			        	<!-- Botão para encerrar este modal -->
			        	<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			          	<span aria-hidden="true">&times;</span>
			        	</button>

			        <!-- Encerramento do header deste modal -->
		      		</div>

		      		<!-- Abertura do body deste modal -->
			      	<div class="modal-body text-light">

			      		<!-- Hidden contendo o id do cargo atual a ser excluído -->
			      		<input type="hidden" id="txtIdentifyCargo" name="txtIdentifyCargo">
			      		<!-- Hidden contendo a ação de exclusão a ser executada -->
			      		<input type="hidden" id="txtAcaoCargo" name="txtAcaoCargo" value="excluir">
			        	
			        	<h4> Tem certeza que gostaria de excluir este cargo? </h4>

			        	<p> <b> Nome do cargo: - </b> <span id="modalNomeCargo"> </span>  </p>

			        <!-- Encerramento do body deste modal -->
			      	</div>
		     		
		     		<!-- Abertura do footer deste modal -->
			     	<div class="modal-footer bg-dark">

			     		<!-- Botão para encerrar este modal -->
			        	<button type="button" class="btn btn-danger" data-dismiss="modal"> Cancelar </button>
			        	<!-- Botão para aplicar a função deste modal este modal -->
			        	<button type="submit" class="btn btn-success" id="btnExcluirCargo" name="btnExcluirCargo"> Excluir este cargo </button>
			        <!-- Encerramento do footer deste modal -->
			      	</div>

		      	<!-- Encerramento do formulário para a realização da transferencia de informações -->
		      	</form>

		    <!-- Encerramento da div para o contexto deste modal -->
	    	</div>
	    <!-- Encerramento da div da caixa de dialogo para o modal -->
	  	</div>
	<!-- Encerramento da div do modal para confirmação da exclusão do cargo -->
	</div>

	<!-- Abertura da div do modal para confirmação da exclusão do cargo -->
	<div class="modal" name="modalConfirmarExclusaoUsuario" id="modalConfirmarExclusaoUsuario" tabindex="-1" role="dialog">
	  	
	  	<!-- Abertura da div da caixa de dialogo para o modal -->
	  	<div class="modal-dialog" role="document">
	    		
	    	<!-- Abertura da div para o contexto deste modal -->
	    	<div class="modal-content bg-dark">

	    		<!-- Abertura do formulário para a realização da transferencia de informações -->
	    		<form action="usuario_processa.php" method="POST">

		    		<!-- Abertura do header deste modal -->
		      		<div class="modal-header">

		      			<!-- Titulo do modal -->
			        	<h5 class="modal-title text-light"> Excluir usuario? </h5>

			        	<!-- Botão para encerrar este modal -->
			        	<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			          	<span aria-hidden="true">&times;</span>
			        	</button>

			        <!-- Encerramento do header deste modal -->
		      		</div>

		      		<!-- Abertura do body deste modal -->
			      	<div class="modal-body text-light">

			      		<!-- Hidden contendo o id do cargo atual a ser excluído -->
			      		<input type="hidden" id="txtIdentifyUsuario" name="txtIdentifyUsuario">
			      		<!-- Hidden contendo a ação de exclusão a ser executada -->
			      		<input type="hidden" id="txtAcaoUsuario" name="txtAcaoUsuario" value="excluir">

			        	<h4> Tem certeza que gostaria de excluir este usuário? </h4>

			        	<p> <b> Nome do usuário: - </b> <span id="modalNomeUsuario"> </span> </p>
			        <!-- Encerramento do body deste modal -->
			      	</div>
		     		
		     		<!-- Abertura do footer deste modal -->
			     	<div class="modal-footer">

			     		<!-- Botão para encerrar este modal -->
			        	<button type="button" class="btn btn-danger" data-dismiss="modal"> Cancelar </button>
			        	<!-- Botão para aplicar a função deste modal este modal -->
			        	<button type="submit" class="btn btn-success"> Excluir este usuario </button>
			        <!-- Encerramento do footer deste modal -->
			      	</div>

		      	<!-- Encerramento do formulário para a realização da transferencia de informações -->
		      	</form>

		    <!-- Encerramento da div para o contexto deste modal -->
	    	</div>
	    <!-- Encerramento da div da caixa de dialogo para o modal -->
	  	</div>
	<!-- Encerramento da div do modal para confirmação da exclusão do cargo -->
	</div>

	<!-- Script para funcionamento da transferência dos componentes do form para o model -->
	<script type="text/javascript">

		$('#modalConfirmarExclusaoCargo').on('show.bs.modal', function (event) {

			var button = $(event.relatedTarget) // Button that triggered the modal
			var recipientIdentifyCargo = button.data('whatever-identify')
			var recipientNomeCargo = button.data('whatever-nome') 

			var modal = $(this)
			modal.find('#txtIdentifyCargo').val(recipientIdentifyCargo);
			modal.find('#modalNomeCargo').text(recipientNomeCargo)
		});

		$('#modalConfirmarExclusaoUsuario').on('show.bs.modal', function (event) {

			var button = $(event.relatedTarget) // Button that triggered the modal
			var recipientIdentifyUsuario = button.data('whatever-identify')
			var recipientNomeUsuario = button.data('whatever-nome') // Extract info from data-* attributes

			var modal = $(this)
			modal.find('#txtIdentifyUsuario').val(recipientIdentifyUsuario);
			modal.find('#modalNomeUsuario').text(recipientNomeUsuario)
		});
	</script>

</body>

<!-- Encerramento da tag de html -->
</html>