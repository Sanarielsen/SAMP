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
		<title> SCAMP: Sobre o sistema </title>
		
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

	<!-- Sessão de verificação se existe um usuário logado e quais seus poderes -->
	<?php 

		//Verificação se existe algum usuário logado para acesso desta página;
		include "identificacao_cargo.php";
	?>	

 	<!-- Abertura da tag de body -->
 	<body style="height: 100%; overflow: auto;">

 	<!-- Abertura da div que irá cobrir toda a tela em questão de largura -->
	<div class="container-fluid p-0" style="height: 100% !important"> 		

		<!-- Menu horizontal a ser utilizado quando a resolução for pequena ou ultra pequena -->
			<nav class="navbar navbar-light bg-light d-flex d-lg-none">
				<!-- Zona de titulo do menu -->
				<!-- Conjunto com o icone e o nome -->
				<a class="my-2 navbar-brand" href="#">
					<!-- Icone EcoFacil -->
					<img class="img-fluid mx-auto d-block" src="assets/img/sys/ico_header.png" width="100" height="140" alt="">
				</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<!-- NAV BAR quando a resolução for pequena -->
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<!-- Lista de opções do menu iniciada -->
					<ul class="navbar-nav mr-auto">
						<!-- item 1 -->
						<li class="nav-item">
							<a class="nav-link" href="http://localhost/SCAMPV1/cadastros.php"> Cadastros </a>
						</li>
						<!-- item 2 -->
						<li class="nav-item">
							<a class="nav-link" href="http://localhost/SCAMPV1/representantes.php"> Representantes </a>
						</li>
						<!-- item 3 -->
						<li class="nav-item">
							<a class="nav-link" href="http://localhost/SCAMPV1/sobresys.php"> Sobre o sistema </a>
						</li>				
						<!-- item 4-->
						<li class="nav-item">
							<a class="nav-link" href="http://localhost/SCAMPV1/relatorioBugs.php"> Relatar Bug </a>
						</li>	
						<!-- item 5 -->
						<li class="nav-item">
							<a class="nav-link" href="http://localhost/SCAMPV1/identificacao_outline.php"> Sair </a>
						</li>
					</ul>
				</div>
			</nav>

			<!-- Abertura da div que irá conter o menu lateral e o conteudo do sistema -->
			<div class="row m-0" style="height: 100% !important;">

				<!-- Abertura do menu horizontal do sistema -->									
				<nav class="col-md-2 d-none d-lg-block bg-light sidebar">				
					<!-- Abertura da div para centralização do icone e do nome do sistema -->
					<div class="text-center">
						<!-- Conjunto com o icone e o nome -->
						<a class="my-2 navbar-brand" href="http://localhost/SCAMPV1/principal.php">
							<!-- Icone do sistema -->
							<img class="img-fluid mx-auto d-block" src="assets/img/sys/ico_header.png" width="100" height="140" alt="Logo do sistema">									
						</a>					
					<!-- Encerramento da div para centralização do icone e do nome do sistema -->
					</div>
					<!-- Abertura da área do menu vertical -->
				    <div class="sidebar-sticky"> 
				    	
				    	<!-- Separador de sessões deste menu -->
				    	<h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
			              <span> Empresas/Clientes </span>
			              <a class="d-flex align-items-center text-muted" href="#">
			                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"></svg>
			              </a>
			            </h6>
			            <!-- Conjunto de opções desa parte do menu - Empresas/Clientes -->
				        <ul class="nav flex-column">
				        	<!-- Item 1 - Cadastros -->
			              	<li class="nav-item">
				                <a class="nav-link" href="http://localhost/SCAMPV1/cadastros.php">
				                  <img src="assets/img/sys/ico_menu_item_cadastros_colorblack.png" width="24" height="24" />
				                  Cadastros <span class="sr-only">(current)</span>
				                </a>
			              	</li>
			              	<!-- Item 2 - Representantes -->
				            <li class="nav-item">
				                <a class="nav-link" href="http://localhost/SCAMPV1/representantes.php">
				                  <img src="assets/img/sys/ico_menu_item_representantes_colorblack.png" width="24" height="24" />
				                  Representantes
				                </a>
				            </li>
				            <!-- Conjunto de opções desa parte do menu ENCERRADO - Empresas/Clientes -->  
				        </ul>

				        <!-- Separador de sessões deste menu -->
			            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
			              <span> Configurações </span>
			              <a class="d-flex align-items-center text-muted" href="#">
			                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"></svg>
			              </a>
			            </h6>
			            <!-- Conjunto de opções desa parte do menu - CONFIGURAÇÕES -->
			            <ul class="nav flex-column mb-2">

			            	<?php

			            		if ( $_SESSION['UsuarioNomeCargo'] == "Administrador(a)" ) {
			            	?>
			            	<!-- Item 1 - Sobre o sistema -->
				            <li class="nav-item">
				                <a class="nav-link text-primary" href="http://localhost/SCAMPV1/sobresys.php">
				                 <img src="assets/img/sys/ico_menu_item_admin_config_blue.png" width="24" height="24" /> 
				                  Config. Admin
				                </a>
				            </li>

				            <?php

			            		}
			            	?>
			            	<!-- Item 2 - Sobre o sistema -->
				            <li class="nav-item">
				                <a class="nav-link" href="http://localhost/SCAMPV1/sobresys.php">
				                 <img src="assets/img/sys/ico_menu_item_sobreosistema_colorblack.png" width="24" height="24" /> 
				                  Sobre o sistema
				                </a>
				            </li>
				            <!-- Item 3 - Sair -->
				            <li class="nav-item">
				                <a class="nav-link" href="http://localhost/SCAMPV1/identificacao_outline.php">
				                	<img src="assets/img/sys/ico_menu_item_sair_colorblack.png" width="24" height="24" />
				                	Sair
				                </a>
				            </li>			          
				        <!-- Conjunto de opções desa parte do menu ENCERRADO - CONFIGURAÇÕES -->
				        </ul>
				    </div>
				</nav> 

			<!-- Abertura da div que irá conter o conteúdo do site -->
			<main class="col-md-12 col-lg-10 justify-content-center" role="main">		

				<?php

					//Verifica-se se o usuário atual possui permissão para acessar essa área;				
			        if ( $_SESSION['UsuarioNomeCargo'] == "Administrador(a)" ) {

			        	//Realiza todos os tipos de consultas para funcionamento desta página;

			        	//Ativamos uma conexão com o banco de dados;
			        	include "connection.php";

			        	$contQuery = 0;

			        	$multiQuery = "CALL uspConsultarUsuarioCargo();CALL uspConsultarUsuariosInfo();";

			        	if (mysqli_multi_query($conexao,$multiQuery)) {

			        		do {

			        			// Store first result set
								if ($result = mysqli_store_result($conexao)) {

									if ($contQuery == 0) {

										$resultProcedureNomeCargos = array();

										$countNomeCargos = mysqli_num_rows($result);

										while ($row = mysqli_fetch_assoc($result)) {
											
											//Atribui-se o valor desta linha do banco para esta posição do vetor;
											$resultProcedureNomeCargos[] = array(	

												'identificadorCargo' => $row['identificador'],
												'nomenclaturaCargo' => $row['nomeCargo'],
												'inserirCredencial' => $row['inserirCredencialCargo'],
												'atualizarCredencial' => $row['atualizarCredencialCargo'],
												'consultarCredencial' => $row['consultarCredencialCargo'],
												'excluirCredencial' => $row['excluirCredencialCargo'],
											);
										}

									} else 
									if ($contQuery == 1) {

										$resultProcedureUsuariosInfo = array();

										$countUsuariosInfo = mysqli_num_rows($result);

										while ($row = mysqli_fetch_assoc($result))
										{
											
											//Atribui-se o valor desta linha do banco para esta posição do vetor;
											$resultProcedureUsuariosInfo[] = array(	
												'identificadorUsuario' => $row['identificadorUsuario'],
												'nomeUsuario' => $row['nomeUsuario'],
												'emailUsuario' => $row['emailUsuario'],
												'identificadorCargo' => $row['identificadorCargo'],
												'nomeCargo' => $row['nomeCargo']
											);
										}
									}

									$contQuery++;
								}								

			        		} while(mysqli_more_results($conexao) && mysqli_next_result($conexao)); 
			        	}				          
				?>				
		
				<div class="row rowGroup">

					<div class="col-12 text-center">

						<!-- Label de titulo para o grupo do formulário -->
						<label for="rowGroup"> <h1 class="h1 my-4"> Gerenciador de usuários </h1> </label>
					</div>
				</div>

				<div class="row rowGroup">

					<div class="col-12 col-sm-6">

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

							  		<!-- -->
							  		<?php 

							  			for ($i = 0; $i < $countUsuariosInfo; $i++ ) {
							  		?>

								  		<form action="usuario_processa.php" method="POST">
									    	<tr>

									    		<?php												
									    			echo '<input type="hidden" name="txtUsuarioIdentificador" id="txtUsuarioIdentificador" 
									    			value="' . $resultProcedureUsuariosInfo[$i]['identificadorUsuario'] . '"/>' ;

									    			echo '<input type="hidden" name="txtCargoUsuarioIdentificador" id="txtCargoUsuarioIdentificador" 
									    			value="' . $resultProcedureUsuariosInfo[$i]['identificadorCargo'] . '"/>' ;

									    			echo '<td>' . $resultProcedureUsuariosInfo[$i]['nomeUsuario'] . ' </td>';
									    			echo '<input type="hidden" name="txtNomeUsuario" id="txtNomeUsuario" 
									    			value="' . $resultProcedureUsuariosInfo[$i]['nomeUsuario'] . '">' ;

									    			echo '<td>'  . $resultProcedureUsuariosInfo[$i]['emailUsuario'] . ' </td>';
									    			echo '<input type="hidden" name="txtEmailUsuario" id="txtEmailUsuario" 
									    			value="' . $resultProcedureUsuariosInfo[$i]['emailUsuario'] . '">' ;

									    			echo '<td>' . $resultProcedureUsuariosInfo[$i]['nomeCargo'] . ' </td>';
									    			echo '<input type="hidden" name="txtNomeCargo" id="txtNomeCargo" 
									    			value="' . $resultProcedureUsuariosInfo[$i]['nomeCargo'] . '">' ;
									    		?>	
										    		<td>
											    		<!-- Botão para redicionamento da página para alteração de dados -->
											      		<input type="hidden" name="txtAcaoUsuario" id="txtAcaoUsuario" value="excluir">
											      		<button type="submit" class="btn btn-danger"> Excluir </button>
										      		</td>

									    	</tr>
								    	</form>

							    	<?php 

							    		}
							    	?>

							  	</tbody>
							</table>

						</div>

					</div>

					<div class="col-12 col-sm-6">

						<!-- Label de titulo para o grupo do formulário -->
						<label for="rowGroup"> <h5 class="h5"> Cadastrar novo usuário </h5> </label>

						<form action="usuario_processa.php" method="POST">
							<div class="form-group row" id="groupRowNomeUsuario">
							    <label for="txtNomeUsuario" class="col-sm-2 col-form-label"> Nome: </label>
							    <div class="col-sm-10">
							      	<input type="text" class="form-control" id="txtNomeUsuario" name="txtNomeUsuario">
							    </div>
							</div>
							<div class="form-group row" id="groupRowEmailUsuario">
							    <label for="txtEmailUsuario" class="col-sm-2 col-form-label"> Email: </label>
							    <div class="col-sm-10">
							      	<input type="email" class="form-control" id="txtEmailUsuario" name="txtEmailUsuario" placeholder="">
							    </div>
							</div>
							<div class="form-group row" id="groupRowSenhaUsuario">
							    <label for="txtSenhaUsuario" class="col-sm-2 col-form-label"> Senha: </label>
							    <div class="col-sm-10">
							      	<input type="password" class="form-control" id="txtSenhaUsuario" name="txtSenhaUsuario" placeholder="">
							    </div>
							</div>

							<div class="form-group row" id="groupRowCargoUsuario">
							    <label for="sltCargoUsuario" class="col-sm-2 col-form-label"> Cargo: </label>
							    <div class="col-sm-10">
							      	<select class="form-control" id="sltCargoUsuario" name="sltCargoUsuario">
									    <option value=""> Selecione o cargo deste usuário... </option>

									    <?php

									    	for ($i = 0; $i < $countNomeCargos; $i++ ) {

									    		echo '
									    			<option value=' . $resultProcedureNomeCargos[$i]["identificadorCargo"] . 
									    			'>' . $resultProcedureNomeCargos[$i]["nomenclaturaCargo"] . ' </option>';									    
									    	}
									    ?>
									</select>
							    </div>
							</div>

							<div class="form-group row" id="groupRowPerguntaUsuario">
							    <label for="txtPerguntaUsuario" class="col-sm-2 col-form-label"> Pergunta: </label>
							    <div class="col-sm-10">
							      	<input type="text" class="form-control" id="txtPerguntaUsuario" name="txtPerguntaUsuario" placeholder="">
							    </div>
							</div>
							<div class="form-group row" id="groupRowRespostaUsuario">
							    <label for="txtRespostaUsuario" class="col-sm-2 col-form-label"> Resposta: </label>
							    <div class="col-sm-10">
							      	<input type="text" class="form-control" id="txtRespostaUsuario" name="txtRespostaUsuario" placeholder="">
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

					<div class="col-12 col-sm-6 col-md-6 col-lg-6 text-center">

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

								  		<!-- -->
								  		<?php 

								  			for ($i = 0; $i < $countNomeCargos; $i++ ) {
								  		?>

									  		<form action="cargo_processa.php" method="POST">
										    	<tr>

										    		<?php												
										    			echo '<td>' . $resultProcedureNomeCargos[$i]['nomenclaturaCargo'] . ' </td>';
										    			echo '<input type="hidden" name="txtNomeUsuario" id="txtNomeUsuario" 
										    			value="' . $resultProcedureNomeCargos[$i]['nomenclaturaCargo'] . '">' ;

										    			echo '<td>' 
										    			. $resultProcedureNomeCargos[$i]['inserirCredencial'] . ' - ' 
										    			. $resultProcedureNomeCargos[$i]['atualizarCredencial'] . ' - ' 
										    			. $resultProcedureNomeCargos[$i]['consultarCredencial'] . ' - ' 
										    			. $resultProcedureNomeCargos[$i]['excluirCredencial'] .  
										    			' </td>';
										    			echo '<input type="hidden" name="txtEmailUsuario" id="txtEmailUsuario" 
										    			value="' . $resultProcedureNomeCargos[$i]['inserirCredencial'] . '">' ;
										    			echo '<input type="hidden" name="txtNomeCargo" id="txtNomeCargo" 
										    			value="' . $resultProcedureNomeCargos[$i]['atualizarCredencial'] . '">' ;
										    			echo '<input type="hidden" name="txtNomeCargo" id="txtNomeCargo" 
										    			value="' . $resultProcedureNomeCargos[$i]['consultarCredencial'] . '">' ;
										    			echo '<input type="hidden" name="txtNomeCargo" id="txtNomeCargo" 
										    			value="' . $resultProcedureNomeCargos[$i]['excluirCredencial'] . '">' ;

										    			echo '<input type="hidden" name="txtCargoIdentificador" id="txtCargoIdentificador" 
										    			value="' . $resultProcedureNomeCargos[$i]['identificadorCargo'] . '"/>' ;
										    			
										    		?>	
											    		<td>
												    		<!-- Botão para redicionamento da página para alteração de dados -->
												      		<input type="hidden" name="txtAcaoCargo" id="txtAcaoCargo" value="excluir">
												      		<button type="submit" id="btnExcluirCargo" name="btnExcluirCargo" class="btn btn-danger"> Excluir </button>
											      		</td>

										    	</tr>
									    	</form>

								    	<?php 

								    		}
								    	?>

								  	</tbody>

								</table>

							</div>

						</div>		
								
					</div>

					<div class="col-12 col-sm-6 col-md-6 col-lg-6 align-self-left">

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
				        echo "Erro do sistema";

			    	}
				?>												
			<!-- Encerramento da div que irá conter o conteúdo do site -->
			</main>			
		<!-- Encerramento da div que irá conter o menu lateral e o conteudo do sistema -->
		</div>			
	<!-- Encerramento da div que irá cobrir toda a tela em questão de largura -->
	</div>

</body>

<!-- Encerramento da tag de html -->
</html>