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
		<title> SCAMP: Representantes </title>
		
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
 	<body style="height: 100%; overflow: auto;"> 	

 	<!-- Abertura da div que irá cobrir toda a tela em questão de largura -->
	<div class="container-fluid p-0" style="height: 100% !important"> 

		<!-- Sessão de verificação se existe um usuário logado e quais seus poderes -->
 		<?php 
 			//Verificação se existe algum usuário logado para acesso desta página;
			include "identificacao_cargo.php";
 		?>		

		<!-- Menu horizontal a ser utilizado quando a resolução for pequena ou ultra pequena -->
			<nav class="navbar navbar-light bg-light d-flex d-lg-none">
				<!-- Zona de titulo do menu -->
				<!-- Conjunto com o icone e o nome -->
				<a class="my-2 navbar-brand" href="#">
					<!-- Icone EcoFacil -->
					<img class="img-fluid mx-auto d-block" src="assets/img/sys/ico_header.png" width="140" height="140" alt="">
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
				                <a class="nav-link text-primary" href="http://localhost/SCAMPV1/representantes.php">
				                  <img src="assets/img/sys/ico_menu_item_representantes_colorblue.png" width="24" height="24" />
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
				                <a class="nav-link" href="http://localhost/SCAMPV1/configuracao_admin.php">
				                 <img src="assets/img/sys/ico_menu_item_admin_config_black.png" width="24" height="24" /> 
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
			<main class="col-md-12 col-lg-10" role="main">	

				<!-- Sessão para consulta dos clientes cadastrados no sistema -->
				<?php 

					//Inicia-se uma conexão com o banco de dados;
					include ("connection.php");					
					//Cria-se a variável que irá contar quantos registros foram retornados;
					$countClientes = 0;
					//Cria-se a variável que irá contar a procedure a ser executada;
					$sqlQuery = "CALL uspConsultarClientesCadastrados();";

					//Cria-se a string que carregará a query de consulta aos clientes;
					$procedureString = mysqli_query($conexao, $sqlQuery) or die (mysqli_error($conexao)) ;

					if ($procedureString) {

						//Verifica-se quantas linhas foram resultadas desta procedure;
						if ( mysqli_num_rows($procedureString) > 0 ) {

							//Cria-se o vetor para preenchimento das linhas da tabela futuramente;
							$resultProcedure = array();

							//Cada linha do banco de dados é atribuída a uma row a cada loop;
							while ( $row = mysqli_fetch_assoc($procedureString) ) {													

								//Atribui-se o valor desta linha do banco para esta posição do vetor;
								$resultProcedure[] = array(									

									//Identificador da empresa
									'identificador' => $row['identificador'],
									//Informações da empresa;
									'nomeFantasiaCliente' => $row['nomeFantasiaCliente'],
									'protocoloCliente' => $row['protocoloCliente']
								);
							}

							//Atribui-se a variável que detem a quantidade de posições existentes no vetor;
							$countClientes = count($resultProcedure); //Limite do for;
						} 
						else {

							echo "Nenhum cliente cadastrado no momento";
							//Cria-se o vetor para preenchimento das linhas da tabela futuramente;
							$resultProcedure = array();
							//Atribui-se o unico valor informando que não há clientes cadastrados
							$resultProcedure[] = array(

								//Identificador da empresa
								'identificador' => 0,
								//Informações da empresa;
								'nomeFantasiaCliente' => "Não foram encontrados clientes cadastrados no sistema",
								'protocoloCliente' => ""
							);
						}
					}
					else {

						echo "Não buscou empresas";
						//Cria-se o vetor para preenchimento das linhas da tabela futuramente;
						$resultProcedure = array();
						//Atribui-se o unico valor informando que não há clientes cadastrados
							$resultProcedure[] = array(

								//Identificador da empresa
								'identificador' => 0,
								//Informações da empresa;
								'nomeFantasiaCliente' => "Ocorreu algum erro para acesso as informações no banco de dados",
								'protocoloCliente' => ""
							);
					}

				?>	                			
				
				<!-- Sessão para consulta dos representantes pelo critério de pesquisa -->
				<?php 

					$identificadorVerify = 0;

					//Verificação se o botão de pesquisa de cliente foi acionado;
					if (!isset($_REQUEST['btnConsultarRepresentantes'])) {

						//echo "Pesquisa: Todos os representantes <br>";

						//Nesse caso, será pesquisado todos os registros sem qualquer restrição;
						$sqlProcedure = "CALL uspConsultarRepresentantesPeloCriterio(0);";
						//Variável para configuração do botão de "inserir novo representante";
						$statusBtnRepresentante = "Bloqueado"; 
					} 
					else {

						//Capta-se o critério da pesquisa;
						$criterio = $_POST['sltCriterioPesquisaRepresentante'];

						//Verifica se a posição do comboBox se é a função de instrução
						if ($criterio == 0) {

							//Nesse caso, será pesquisado todos os registros sem qualquer restrição;
							$sqlProcedure = "CALL uspConsultarRepresentantesPeloCriterio(0);";
							//Variável para configuração do botão de "inserir novo representante";
							$statusBtnRepresentante = "Bloqueado"; 
						//Caso for qualquer outra, pesquisa de acordo com o critério;
						} else {

							//Cria-se a string que carregará a query de consulta aos clientes;
							$sqlProcedure = "CALL uspConsultarRepresentantesPeloCriterio('$criterio');";
							//Variável para configuração do botão de "inserir novo representante";						
							$statusBtnRepresentante = "Liberado"; 
						}																					
					}

					//Inicia-se uma conexão com o banco de dados;
					include "connection.php";

					//Cria-se a variável que irá contar quantos registros foram retornados;
					$countRepresentantes = 0;

					//Cria-se a string que carregará a query de consulta aos clientes;
					$procedureString = mysqli_query($conexao, $sqlProcedure) or die (mysqli_error($conexao)) ;

					//Verifica-se a query foi executada com sucesso;
					if ($procedureString) {

						//echo "A consulta funcionou <br>";

						//Verifica-se quantas linhas foram resultadas desta procedure;
						if ( mysqli_num_rows($procedureString) > 0 ) {

							//echo "A consulta linhas suficientes <br>";
							//Cria-se o vetor para preenchimento das linhas da tabela futuramente;
							$resultProcedureRepresentantes = array();	

							//Cada linha do banco de dados é atribuída a uma row a cada loop;
							while ( $row = mysqli_fetch_assoc($procedureString) ) {
																	
								//Atribui-se o valor desta linha do banco para esta posição do vetor;
								$resultProcedureRepresentantes[] = array(

									//Identificadores dos representantes;
									'identificador' => $row['identificador'],
									'identificadorCliente' => $row['identificadorCliente'],
									'nomeFantasiaCliente' => $row['nomeFantasiaCliente'],
									//Informações dos representantes;
									'nomeRepresentante' => $row['nomeRepresentante'],
									'nacionalidadeRepresentante' => $row['nacionalidadeRepresentante'],									
									'rgRepresentante' => $row['rgRepresentante'],
									'cpfRepresentante' => $row['cpfRepresentante'],
									'profissaoRepresentante' => $row['profissaoRepresentante'],
									'cargoRepresentante' => $row['cargoRepresentante']									
								);
							}
							//Capta-se a quantidade de linhas resultadas desta query;
							$countRepresentantes = count($resultProcedureRepresentantes);
						}
						else {

							//echo "A consulta retornou zero linhas <br>";
							//Cria-se o vetor para preenchimento das linhas da tabela futuramente;
							$resultProcedureRepresentantes = array();												

							//Atribui-se o valor desta linha do banco para esta posição do vetor;
							$resultProcedureRepresentantes[] = array(
								
								//Identificadores dos representantes;
								'identificador' => "0",
								//Informações dos representantes;
								'nomeRepresentante' => "Nenhum representante foi encontrado no banco de dados",
								'nacionalidadeRepresentante' => "",									
								'rgRepresentante' => "",
								'cpfRepresentante' => "",
								'profissaoRepresentante' => "",
								'cargoRepresentante' => ""									
							);
						}		
					} 
					else {

						//echo "A consulta não funcionou <br>";
						//Cria-se o vetor para preenchimento das linhas da tabela futuramente;
						$resultProcedureRepresentantes = array();												

						//Atribui-se o valor desta linha do banco para esta posição do vetor;
						$resultProcedureRepresentantes[] = array(
							
							//Identificadores dos representantes;
							'identificador' => "0",
							//Informações dos representantes;
							'nomeRepresentante' => "Ocorreu algum erro para acesso ao banco de dados",
							'nacionalidadeRepresentante' => "",									
							'rgRepresentante' => "",
							'cpfRepresentante' => "",
							'profissaoRepresentante' => "",
							'cargoRepresentante' => ""									
						);
					}
				?>

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

					  			for ($i = 0; $i < $countClientes; $i++ ) {

					  				if ($criterio == $resultProcedure[$i]["identificador"]) {

					  					echo '<option value='. $resultProcedure[$i]["identificador"] .' selected> Fantasia: '. $resultProcedure[$i]["nomeFantasiaCliente"] . ' - CPF/CNPJ: ' . $resultProcedure[$i]["protocoloCliente"] . ' </option>';
					  				} else {

					  					echo '<option value='. $resultProcedure[$i]["identificador"] .'> Fantasia: '. $resultProcedure[$i]["nomeFantasiaCliente"] . ' - CPF/CNPJ: ' . $resultProcedure[$i]["protocoloCliente"] . ' </option>';
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
						<form action="representante_action.php" method="POST">

							<?php

								if ($_SESSION['inserirCreden'] == 1) {

									if ($statusBtnRepresentante == "Liberado") {

						  				echo '<button class="btn btn-block btn-primary my-4" type="submit" id="btnInserirRepresentante" name="btnInserirRepresentante"> Inserir novo representante </button>';
						  				echo '<input type="hidden" name="txtIdentificadorCliente" id="txtIdentificadorCliente" value="
									      		' . $criterio . ' ">';					  				

					  				}
					  				else if ($statusBtnRepresentante == "Bloqueado") {

					  					echo '<button class="btn btn-block btn-primary my-4" type="button" id="btnInserirRepresentante" name="btnInserirRepresentante"> (Selecione um cliente) Inserir novo representante </button>';	
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

							<!-- Looping para geração de linhas e formulários para respectivos registros -->
					  		<?php     for ($i = 0; $i < $countRepresentantes; $i++ ) {  ?>

								<!-- Table row é criada -->
							    <tr>
							    	<!-- Abertura do formulário de ação para administração desta linha da tabela -->
							    	<form action="representante_action.php" method="POST">

								    	<!-- Table header para dar enfase nesse registro dando escopo para o mesmo -->
								    	<!-- Coluna de identificador do representante -->
								      	<th scope="row"> <?php echo $resultProcedureRepresentantes[$i]['identificador']; ?> </th>
								      	<?php echo '<input type="hidden" name="txtIdentificadorRepresentante" id="txtIdentificadorRepresentante" value=" 
						  					' . $resultProcedureRepresentantes[$i]['identificador'] . ' ">' ?>
								      	<!-- Table data para informações da tabela -->
								      	<!-- Coluna do nome do representante -->
								      	<td> <?php echo $resultProcedureRepresentantes[$i]['nomeRepresentante']; ?> </td>
								      	<?php echo '<input type="hidden" name="txtNomeRepresentante" id="txtNomeRepresentante" value=" 
						  					' . $resultProcedureRepresentantes[$i]['nomeRepresentante'] . ' ">' ?>
						  				<!-- Coluna da profissao do representante -->
								      	<td> <?php echo $resultProcedureRepresentantes[$i]['profissaoRepresentante']; ?> </td>
								      	<?php echo '<input type="hidden" name="txtProfissaoRepresentante" id="txtProfissaoRepresentante" value="
								      		' . $resultProcedureRepresentantes[$i]['profissaoRepresentante'] . ' ">' ?>
								      	<!-- Coluna do cargo do representante -->
								      	<td> <?php echo $resultProcedureRepresentantes[$i]['cargoRepresentante']; ?> </td>
								      	<?php echo '<input type="hidden" name="txtCargoRepresentante" id="txtCargoRepresentante" value="
								      		' . $resultProcedureRepresentantes[$i]['cargoRepresentante'] . ' ">' ?>
								      	<!-- Coluna da nacionalidade do representante -->
								      	<td> <?php echo $resultProcedureRepresentantes[$i]['nacionalidadeRepresentante']; ?> </td>
								      	<?php echo '<input type="hidden" name="txtNacionalidadeRepresentante" id="txtNacionalidadeRepresentante" value="
								      		' . $resultProcedureRepresentantes[$i]['nacionalidadeRepresentante'] . ' ">' ?>

								      	<!-- Demais componentes deste representante -->
								      	<?php echo '<input type="hidden" name="txtRGRepresentante" id="txtRGRepresentante" value="
								      		' . $resultProcedureRepresentantes[$i]['rgRepresentante'] . ' ">' ?>
								      	<?php echo '<input type="hidden" name="txtCPFRepresentante" id="txtCPFRepresentante" value="
								      		' . $resultProcedureRepresentantes[$i]['cpfRepresentante'] . ' ">' ?>
								      	<?php echo '<input type="hidden" name="txtIdentificadorCliente" id="txtIdentificadorCliente" value="
								      		' . $resultProcedureRepresentantes[$i]['identificadorCliente'] . ' ">' ?>
							      		<?php echo '<input type="hidden" name="txtNomeFantasiaCliente" id="txtNomeFantasiaCliente" value="
								      		' . $resultProcedureRepresentantes[$i]['nomeFantasiaCliente'] . ' ">' ?>

								      	<!-- Table data para inserção dos botões do form -->
								      	<td> 
								      		<!-- Botão para visualização das informações completas deste cliente -->
								      		<!-- Ativador do model para exibição das informações -->
								      		<?php

								      			echo 
								      			'
								      				<button type="button" class="btn btn-success" data-toggle="modal" 
								      				data-target="#modalConsultarCadastro" 
								      				data-whatever-representante-identificador="'. $resultProcedureRepresentantes[$i]['identificador'] .'"
								      				data-whatever-representante-nome="'. $resultProcedureRepresentantes[$i]['nomeRepresentante'] .'"
								      				data-whatever-representante-rg="'. $resultProcedureRepresentantes[$i]['rgRepresentante'] .'"
								      				data-whatever-representante-cpf="'. $resultProcedureRepresentantes[$i]['cpfRepresentante'] .'"
								      				data-whatever-representante-profissao="'. $resultProcedureRepresentantes[$i]['profissaoRepresentante'] .'"
								      				data-whatever-representante-cargo="'. $resultProcedureRepresentantes[$i]['cargoRepresentante'] .'"
								      				data-whatever-representante-nacionalidade="'. $resultProcedureRepresentantes[$i]['nacionalidadeRepresentante'] .'"
								      				data-whatever-cliente-nome="'. $resultProcedureRepresentantes[$i]['nomeFantasiaCliente'] .'"
								      				> Consultar </button>
								      			';
								      		?>

								      		<?php 

								      			if ($_SESSION['alterarCreden'] == 1) {
								      		?>
							      			
								      		<!-- Botão para redicionamento da página para alteração de dados -->
								      		<input type="hidden" name="txtAcaoRepresentante" id="txtAcaoRepresentante" value="alterar">
								      		<button type="submit" class="btn btn-warning"> Alterar </button>

								      		<?php 

								      			}
								      		?>

								      		<?php

								      			if ($_SESSION['excluirCreden'] == 1) {

									      			echo 
										      			'<button type="button" id="btnAlterarItem" name="btnExcluirItem" class="btn btn-danger"
										      			data-toggle="modal" data-target="#modalVerificarExclusao"
										      			data-whatever-identificador=" ' . $resultProcedureRepresentantes[$i]['identificador'] . ' "
									      				data-whatever-nome="' . $resultProcedureRepresentantes[$i]['nomeRepresentante'] . '" 
									      				data-whatever-rg="' . $resultProcedureRepresentantes[$i]['rgRepresentante'] . '" 
									      				data-whatever-cpf="' . $resultProcedureRepresentantes[$i]['cpfRepresentante'] . '"
									      				data-whatever-representa="' . $resultProcedureRepresentantes[$i]['nomeFantasiaCliente'] . '"								      				
										      			> Excluir </button>';
									      		}
								      		?>
								      	</td>					     
									<!-- Encerramento do formulário de ação para administração desta linha da tabela -->
							      	</form>
							    </tr>

						    <!-- Encerramento do looping do vetor das linhas do cliente -->
					  		<?php   }	?>							    
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
				    	<form method="POST" action="representante_action.php">
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
					 					<input type="hidden" name="txtAcaoRepresentante" name="txtAcaoRepresentante" value="excluir">
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