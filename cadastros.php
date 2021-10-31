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
		<title> SCAMP: Clientes </title>
		
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

 		<?php

 			//Verificação se existe algum usuário logado para acesso desta página;
			include "identificacao_cargo.php";			

			//Variável que irá receber a string de consulta;
			$sqlProcedure = "";

			//Contador de linhas da query
			$arrayCont = "";

			//Cria-se o vetor para preenchimento das linhas da tabela futuramente;
			$resultProcedure = array();

			//Inicia-se uma conexão com o banco de dados;
			include "connection.php";

			//Verificação se o botão de pesquisa de cliente foi acionado;
			if (!isset($_REQUEST['btnPesquisarCliente'])) {

				//Nesse caso, será pesquisado todos os registros sem qualquer restrição;
				$sqlProcedure = "CALL uspConsultarClientesPeloCriterio('', '');";
			} 
			else {

				//Capta-se o critério da pesquisa;
				$criterio = $_POST['sltCriterioPesquisaCliente'];
				//Capta-se o texto a ser pesquisado;
				$busca = $_POST['txtCriterioPesquisaCliente'];
				//Cria-se a string que carregará a query de consulta aos clientes;
				$sqlProcedure = "CALL uspConsultarClientesPeloCriterio('$criterio', '$busca');";							
			}

			//Cria-se a string que carregará a query de consulta aos clientes;
			$procedureString = mysqli_query($conexao, $sqlProcedure) or die (mysqli_error($conexao)) ;			

			//Verifica-se a query foi executada com sucesso;
			if ($procedureString) {

				//Verifica-se quantas linhas foram resultadas desta procedure;
				if ( mysqli_num_rows($procedureString) > 0 ) {				

					/* Teste echo " <br> Pesquisa retornou linhas " . mysqli_num_rows($procedureString); */
					/* Teste echo "<script> console.log('Pesquisa retornou linhas '); </script>"; */

					//Cada linha do banco de dados é atribuída a uma row a cada loop;
					while ( $row = mysqli_fetch_assoc($procedureString) ) {													

						//Atribui-se o valor desta linha do banco para esta posição do vetor;
						$resultProcedure[] = array(

							//Identificadores
							'identificadorCliente' => $row['identificadorCliente'],
							'identificadorLocalizacao' => $row['identificadorLocalizacao'],
							'identificadorCorrespondencia' => $row['identificadorCorrespondencia'],
							//Informações do cliente;
							'razaoSocialCliente' => $row['razaoSocialCliente'],
							'tipoPessoaCliente' => $row['tipoPessoaCliente'],
							'protocoloCliente' => $row['protocoloCliente'],
							'nomeFantasiaCliente' => $row['nomeFantasiaCliente'],
							'dataFundacaoCliente' => $row['dataFundacaoCliente'],
							//Informações do endereco de localização;
							'cepLocalizacao' => $row['cepLocalizacao'],
							'lougradouroLocalizacao' => $row['lougradouroLocalizacao'],
							'bairroLocalizacao' => $row['bairroLocalizacao'],
							'cidadeLocalizacao' => $row['cidadeLocalizacao'],
							'estadoLocalizacao' => $row['estadoLocalizacao'],
							'caixaPostalLocalizacao' => $row['caixaPostalLocalizacao'],
							'telefoneLocalizacao' => $row['telefoneLocalizacao'],
							'emailLocalizacao' => $row['emailLocalizacao'],
							'siteLocalizacao' => $row['siteLocalizacao'],
							'contatoLocalizacao' => $row['contatoLocalizacao'],
							//Informações do endereço de correspondência
							'cepCorrespondencia' => $row['cepCorrespondencia'],
							'lougradouroCorrespondencia' => $row['lougradouroCorrespondencia'],
							'bairroCorrespondencia' => $row['bairroCorrespondencia'],
							'cidadeCorrespondencia' => $row['cidadeCorrespondencia'],
							'estadoCorrespondencia' => $row['estadoCorrespondencia'],
							'caixaPostalCorrespondencia' => $row['caixaPostalCorrespondencia'],
							'telefoneCorrespondencia' => $row['telefoneCorrespondencia'],
							'contatoCorrespondencia' => $row['contatoCorrespondencia']
						);
					}

					//Atribui-se a variável que detem a quantidade de posições existentes no vetor;
					$arrayCont = count($resultProcedure); //Limite do for;
				}																			
				//Caso esteja vazio, cria-se a tabela com um aviso de que na há nenhum cliente;
				else {

					/* Teste */ echo "A pesquisa retornou nenhuma linha";
					/* Teste */ echo "<script> console.log('Nenhuma linha retornada na pesquisa'); </script>";
				}
			}			
 		?>


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
				                <a class="nav-link text-primary" href="http://localhost/SCAMPV1/cadastros.php">
				                  <img src="assets/img/sys/ico_menu_item_cadastros_colorblue.png" width="24" height="24" />
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
						<form action="cadastro_action.php" method="POST">

							<?php

								if ($_SESSION['inserirCreden'] == 1) {
							?>	
														
								<!-- Botão para redirecionar o usuario para a página de registro de cliente -->
								<button class="btn btn-block btn-primary my-4" type="submit" id="btnInserirCadastro" name="btnInserirCadastro">
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

					  		<!-- Looping para geração de linhas e formulários para respectivos registros -->
					  		<?php     for ($i = 0; $i < $arrayCont; $i++ ) {       ?>

						  		<!-- Criação da linha da tabela -->
						  		<tr>

						  			<!-- Criação do formulário desta linha -->
						  			<form action="cadastro_action.php" method="POST">

						  				<!-- Titulo da linha da tabela -->
						  				<th scope="row"> <?php echo $resultProcedure[$i]['identificadorCliente'] ?> </th>
						  				<?php echo '<input type="hidden" name="txtIdentificadorCliente" id="txtIdentificadorCliente" value=" 
						  					' . $resultProcedure[$i]['identificadorCliente'] . ' ">' ?>
						  				<!-- Coluna respectiva da "Razão Social" -->
						  				<td> <?php echo $resultProcedure[$i]['razaoSocialCliente'] ?> </td>
						  				<?php echo ' <input type="hidden" name="txtRazaoSocialCliente" id="txtRazaoSocialCliente" value="
						  					' . $resultProcedure[$i]['razaoSocialCliente'] . '"> ' ?>
						  				<!-- Coluna respectiva da "Nome Fantasia" -->
						  				<td> <?php echo $resultProcedure[$i]['nomeFantasiaCliente'] ?> </td> 
						  				<?php echo ' <input type="hidden" name="txtFantasiaCliente" id="txtFantasiaCliente" value="
						  					' . $resultProcedure[$i]['nomeFantasiaCliente'] . '"> ' ?>
						  				<!-- Coluna respectiva da "Tipo do cliente" -->
						  				<td> <?php echo $resultProcedure[$i]['tipoPessoaCliente'] ?> </td> 
						  				<?php echo ' <input type="hidden" name="txtTipoCliente" id="txtTipoCliente" value="
						  					' . $resultProcedure[$i]['tipoPessoaCliente'] . ' "> ' ?>
						  				<!-- Coluna respectiva da "Protocolo" -->
						  				<td> <?php echo $resultProcedure[$i]['protocoloCliente'] ?> </td>
						  				<?php echo ' <input type="hidden" name="txtProtocoloCliente" id="txtProtocoloCliente" value="
						  					' . $resultProcedure[$i]['protocoloCliente'] . ' "> ' ?>
						  				<!-- Fundação cliente -->
						  				<?php echo ' <input type="hidden" name="txtFundacaoCliente" id="txtFundacaoCliente" value="
						  					' . $resultProcedure[$i]['dataFundacaoCliente'] . ' "> ' ?>	

						  				<!-- Informações sobre o endereco de localização -->
						  				<?php echo '<input type="hidden" name="txtIdentificadorLocalizacao" id="txtIdentificadorLocalizacao" value=" 
						  					' . $resultProcedure[$i]['identificadorLocalizacao'] . ' ">' ?>
						  				<?php echo ' <input type="hidden" name="txtCepLocalizacao" id="txtCepLocalizacao" value="
						  					' . $resultProcedure[$i]['cepLocalizacao'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtLougradouroLocalizacao" id="txtLougradouroLocalizacao" value="
						  					' . $resultProcedure[$i]['lougradouroLocalizacao'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtBairroLocalizacao" id="txtBairroLocalizacao" value="
						  					' . $resultProcedure[$i]['bairroLocalizacao'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtCidadeLocalizacao" id="txtCidadeLocalizacao" value="
						  					' . $resultProcedure[$i]['cidadeLocalizacao'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtEstadoLocalizacao" id="txtEstadoLocalizacao" value="
						  					' . $resultProcedure[$i]['estadoLocalizacao'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtCaixaPostalLocalizacao" id="txtCaixaPostalLocalizacao" value="
						  					' . $resultProcedure[$i]['caixaPostalLocalizacao'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtTelefoneLocalizacao" id="txtTelefoneLocalizacao" value="
						  					' . $resultProcedure[$i]['telefoneLocalizacao'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtEmailLocalizacao" id="txtEmailLocalizacao" value="
						  					' . $resultProcedure[$i]['emailLocalizacao'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtSiteLocalizacao" id="txtSiteLocalizacao" value="
						  					' . $resultProcedure[$i]['siteLocalizacao'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtContatoLocalizacao" id="txtContatoLocalizacao" value="
						  					' . $resultProcedure[$i]['contatoLocalizacao'] . ' "> ' ?>	

						  				<!-- Informações sobre o endereco de correspondência -->
						  				<?php echo '<input type="hidden" name="txtIdentificadorCorrespondencia" id="txtIdentificadorCorrespondencia" value=" 
						  					' . $resultProcedure[$i]['identificadorCorrespondencia'] . ' ">' ?>
						  				<?php echo ' <input type="hidden" name="txtCepCorrespondencia" id="txtCepLocalizacao" value="
						  					' . $resultProcedure[$i]['cepCorrespondencia'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtLougradouroCorrespondencia" id="txtLougradouroLocalizacao" value="
						  					' . $resultProcedure[$i]['lougradouroCorrespondencia'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtBairroCorrespondencia" id="txtBairroLocalizacao" value="
						  					' . $resultProcedure[$i]['bairroCorrespondencia'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtCidadeCorrespondencia" id="txtCidadeLocalizacao" value="
						  					' . $resultProcedure[$i]['cidadeCorrespondencia'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtEstadoCorrespondencia" id="txtEstadoLocalizacao" value="
						  					' . $resultProcedure[$i]['estadoCorrespondencia'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtCaixaPostalCorrespondencia" id="txtCaixaPostalLocalizacao" value="
						  					' . $resultProcedure[$i]['caixaPostalCorrespondencia'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtTelefoneCorrespondencia" id="txtTelefoneLocalizacao" value="
						  					' . $resultProcedure[$i]['telefoneCorrespondencia'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtContatoCorrespondencia" id="txtContatoLocalizacao" value="
						  					' . $resultProcedure[$i]['contatoCorrespondencia'] . ' "> ' ?>

						  				<!-- Coluna respectiva para a ação de botões -->
						  				<td>  

						  					<!-- Botão para visualização das informações completas deste cliente -->
						  					<?php 						  						

						  						echo 
						  						'<button type="button" class="btn btn-success" data-toggle="modal" data-target="#modalConsultarCadastro"
								      				
								      				data-whatever-cliente-0=" ' . $resultProcedure[$i]['identificadorCliente'] . ' "
								      				data-whatever-cliente-1="' . $resultProcedure[$i]['razaoSocialCliente'] . '" 
								      				data-whatever-cliente-2="' . $resultProcedure[$i]['nomeFantasiaCliente'] . '" 
								      				data-whatever-cliente-3="' . $resultProcedure[$i]['tipoPessoaCliente'] . '"
								      				data-whatever-cliente-4="' . $resultProcedure[$i]['protocoloCliente'] . '"
								      				data-whatever-cliente-5="' . $resultProcedure[$i]['dataFundacaoCliente'] . '"

								      				data-whatever-localizacao-0="' . $resultProcedure[$i]['identificadorLocalizacao'] . '"
								      				data-whatever-localizacao-1="' . $resultProcedure[$i]['cepLocalizacao'] . '"
								      				data-whatever-localizacao-2="' . $resultProcedure[$i]['lougradouroLocalizacao'] . '"
								      				data-whatever-localizacao-3="' . $resultProcedure[$i]['bairroLocalizacao'] . '"
								      				data-whatever-localizacao-4="' . $resultProcedure[$i]['cidadeLocalizacao'] . '"
								      				data-whatever-localizacao-5="' . $resultProcedure[$i]['estadoLocalizacao'] . '"
								      				data-whatever-localizacao-6="' . $resultProcedure[$i]['caixaPostalLocalizacao'] . '"
								      				data-whatever-localizacao-7="' . $resultProcedure[$i]['telefoneLocalizacao'] . '"
								      				data-whatever-localizacao-8="' . $resultProcedure[$i]['emailLocalizacao'] . '"
								      				data-whatever-localizacao-9="' . $resultProcedure[$i]['siteLocalizacao'] . '"
								      				data-whatever-localizacao-10="' . $resultProcedure[$i]['contatoLocalizacao'] . '"

								      				data-whatever-correspondencia-0="' . $resultProcedure[$i]['identificadorCorrespondencia'] . '"
								      				data-whatever-correspondencia-1="' . $resultProcedure[$i]['cepCorrespondencia'] . '"
								      				data-whatever-correspondencia-2="' . $resultProcedure[$i]['lougradouroCorrespondencia'] . '"
								      				data-whatever-correspondencia-3="' . $resultProcedure[$i]['bairroCorrespondencia'] . '"
								      				data-whatever-correspondencia-4="' . $resultProcedure[$i]['cidadeCorrespondencia'] . '"
								      				data-whatever-correspondencia-5="' . $resultProcedure[$i]['estadoCorrespondencia'] . '"
								      				data-whatever-correspondencia-6="' . $resultProcedure[$i]['caixaPostalCorrespondencia'] . '"
								      				data-whatever-correspondencia-7="' . $resultProcedure[$i]['telefoneCorrespondencia'] . '"
								      				data-whatever-correspondencia-8="' . $resultProcedure[$i]['contatoCorrespondencia'] . '"
								      				> Consultar 
								      			</button>'; 
								      		?>

								      		<?php 

								      			if ($_SESSION['alterarCreden'] == 1) {
								      		?>

								      		<!-- Botão para redicionamento da página para alteração de dados -->
								      		<button type="submit" id="btnAlterarItem" name="btnAlterarItem" class="btn btn-warning"> Alterar </button>
								      		<input type="hidden" id="txtAcaoCadastro" name="txtAcaoCadastro" value="alterar">
								      		<!-- Botão para exclusão do dado atual -->

								      		<?php 

								      			}
								      		?>

								      		<?php

								      			if ($_SESSION['excluirCreden'] == 1) {

								      				echo 
									      				'<button type="button" id="btnAlterarItem" name="btnExcluirItem" class="btn btn-danger"
										      			data-toggle="modal" data-target="#modalVerificarExclusao"
										      			data-whatever-identificador=" ' . $resultProcedure[$i]['identificadorCliente'] . ' "
										      			data-whatever-razaosocial=" ' . $resultProcedure[$i]['razaoSocialCliente'] . ' "
										      			data-whatever-nomefantasia=" ' . $resultProcedure[$i]['nomeFantasiaCliente'] . ' "
										      			data-whatever-protocolo=" ' . $resultProcedure[$i]['protocoloCliente'] . ' "
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
				    	<form method="POST" action="representante_action.php">
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
					        	<input name="idClienteExcluir" type="hidden" id="idClienteExcluir">
					        					        				
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
					 					<input type="hidden" name="txtAcaoCadastro" name="txtAcaoCadastro" value="excluir">
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
					modal.find('#idClienteExcluir').val(recipientIdentifier)					
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