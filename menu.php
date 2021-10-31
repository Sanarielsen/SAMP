		
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
						<!-- item 1 - com submenu -->
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Empresas / Clientes
							</a>
							<!-- Submenu do item 1 -->
							<div class="dropdown-menu" aria-labelledby="navbarDropdown">
								<a class="dropdown-item" href="http://www.developerhcp.ga/cadastros.php"> Cadastros </a>
								<a class="dropdown-item" href="http://www.developerhcp.ga/representantes.php"> Representantes </a>		
							</div>
						</li>
						<!-- item 2 - com submenu -->
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Serviços / Finanças
							</a>
							<!-- Submenu do item 1 -->
							<div class="dropdown-menu" aria-labelledby="navbarDropdown">
								<a class="dropdown-item" href="http://www.developerhcp.ga/pedidos.php"> Pedidos </a>
								<a class="dropdown-item" href="http://www.developerhcp.ga/financeiros.php"> Finânceiros </a>
								<a class="dropdown-item" href="http://www.developerhcp.ga/processos.php"> Processos </a>		
							</div>
						</li>
						<!-- item 3 - com submenu -->
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Agênda de Atividades
							</a>
							<!-- Submenu do item 1 -->
							<div class="dropdown-menu" aria-labelledby="navbarDropdown">
								<a class="dropdown-item" href="http://www.developerhcp.ga/agenda.php"> Agenda </a>
								<a class="dropdown-item" href="http://www.developerhcp.ga/pendencias.php"> Pendências </a>	
							</div>
						</li>				
						<!-- item 4 - com submenu -->
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Configurações
							</a>
							<!-- Submenu do item 1 -->
							<div class="dropdown-menu" aria-labelledby="navbarDropdown">
								<a class="dropdown-item" href="http://www.developerhcp.ga/sobresys.php"> Sobre o sistema </a>
								<a class="dropdown-item" href="http://www.developerhcp.ga/relatorioBugs.php"> Relatar bug </a>		
							</div>
						</li>	
						<!-- item 5 -->
						<li class="nav-item">
							<a class="nav-link" href="http://www.developerhcp.ga/identificacao_outline.php"> Sair </a>
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
					<a class="my-2 navbar-brand" href="http://www.developerhcp.ga/principal.php">
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
			                <a class="nav-link" href="http://www.developerhcp.ga/cadastros.php">
			                  <img src="assets/img/sys/ico_menu_item_cadastros_colorblack.png" width="24" height="24" />
			                  Cadastros <span class="sr-only">(current)</span>
			                </a>
		              	</li>
		              	<!-- Item 2 - Representantes -->
			            <li class="nav-item">
			                <a class="nav-link" href="http://www.developerhcp.ga/representantes.php">
			                  <img src="assets/img/sys/ico_menu_item_representantes_colorblack.png" width="24" height="24" />
			                  Representantes
			                </a>
			            </li>
			            <!-- Conjunto de opções desa parte do menu ENCERRADO - Empresas/Clientes -->  
			        </ul>
			        <!-- Separador de sessões deste menu -->
				    	<h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
			              <span> Serviços/Finanças </span>
			              <a class="d-flex align-items-center text-muted" href="#">
			                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"></svg>
			              </a>
			            </h6>
			            <!-- Conjunto de opções desa parte do menu - CONFIGURAÇÕES -->
			            <ul class="nav flex-column mb-2">
			            	<!-- Item 1 - Sobre o sistema -->
				            <li class="nav-item">
				                <a class="nav-link" href="http://www.developerhcp.ga/pedidos.php">
				                	<img src="assets/img/sys/ico_menu_item_pedidos_colorblack.png" width="24" height="24" /> 
				                 	Pedidos
				                </a>
				            </li>

				            <!-- Item 2 - Sobre o sistema -->
				            <li class="nav-item">
				                <a class="nav-link" href="http://www.developerhcp.ga/financeiros.php">
				                	<img src="assets/img/sys/ico_menu_item_financeiros_colorblack.png" width="24" height="24" /> 
				                 	Finânceiros
				                </a>
				            </li>

			            	<!-- Item 3 - Sobre o sistema -->
				            <li class="nav-item">
				                <a class="nav-link" href="http://www.developerhcp.ga/processos.php">
				                	<img src="assets/img/sys/ico_menu_item_processos_colorblack.png" width="24" height="24" /> 
				                 	Processos
				                </a>
				            </li>				            
				        </ul>
			        	
				        <!-- Separador de sessões deste menu -->
				    	<h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
			              <span> Agenda de atividades </span>
			              <a class="d-flex align-items-center text-muted" href="#">
			                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"></svg>
			              </a>
			            </h6>
			            <!-- Conjunto de opções desa parte do menu - CONFIGURAÇÕES -->
			            <ul class="nav flex-column mb-2">
			            	<!-- Item 1 - Sobre o sistema -->
				            <li class="nav-item">
				                <a class="nav-link" href="http://www.developerhcp.ga/agenda.php">
				                <img src="assets/img/sys/ico_menu_item_agenda_colorblack.png" width="24" height="24" /> 
				                	Agenda
				                </a>
				            </li>
				            <!-- Item 2 - Sobre o sistema -->
				            <li class="nav-item">
				                <a class="nav-link" href="http://www.developerhcp.ga/pendencias.php">
				                <img src="assets/img/sys/ico_menu_item_pendencias_colorblack.png" width="24" height="24" /> 
				                	Pendências
				                </a>
				            </li>
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
		            	<!-- Item 1 - Sobre o sistema -->
			            <li class="nav-item">
			                <a class="nav-link" href="http://www.developerhcp.ga/sobresys.php">
			                 <img src="assets/img/sys/ico_menu_item_sobreosistema_colorblack.png" width="24" height="24" /> 
			                  Sobre o sistema
			                </a>
			            </li>
			            <!-- Item 2 - Relatar bug -->
			            <li class="nav-item">
			                <a class="nav-link" href="http://www.developerhcp.ga/relatorioBugs.php">
			                	<img src="assets/img/sys/ico_menu_item_bugs_colorblack.png" width="24" height="24" />
			                 	Relatar bug
			                </a>
			            </li>
			            <!-- Item 3 - Sair -->
			            <li class="nav-item">
			                <a class="nav-link" href="http://www.developerhcp.ga/identificacao_outline.php">
			                	<img src="assets/img/sys/ico_menu_item_sair_colorblack.png" width="24" height="24" />
			                	Sair
			                </a>
			            </li>			          
			        <!-- Conjunto de opções desa parte do menu ENCERRADO - CONFIGURAÇÕES -->
			        </ul>
			    </div>
			</nav> 


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
						<!-- item 1 - com submenu -->
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Empresas / Clientes
							</a>
							<!-- Submenu do item 1 -->
							<div class="dropdown-menu" aria-labelledby="navbarDropdown">
								<a class="dropdown-item" href="http://localhost/SCAMPV1/cadastros.php"> Cadastros </a>
								<a class="dropdown-item" href="http://localhost/SCAMPV1/representantes.php"> Representantes </a>		
							</div>
						</li>
						<!-- item 2 - com submenu -->
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Serviços / Finanças
							</a>
							<!-- Submenu do item 1 -->
							<div class="dropdown-menu" aria-labelledby="navbarDropdown">
								<a class="dropdown-item" href="http://localhost/SCAMPV1/pedidos.php"> Pedidos </a>
								<a class="dropdown-item" href="http://localhost/SCAMPV1/financeiros.php"> Finânceiros </a>
								<a class="dropdown-item" href="http://localhost/SCAMPV1/processos.php"> Processos </a>		
							</div>
						</li>
						<!-- item 3 - com submenu -->
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Agênda de Atividades
							</a>
							<!-- Submenu do item 1 -->
							<div class="dropdown-menu" aria-labelledby="navbarDropdown">
								<a class="dropdown-item" href="http://localhost/SCAMPV1/agenda.php"> Agenda </a>
								<a class="dropdown-item" href="http://localhost/SCAMPV1/pendencias.php"> Pendências </a>	
							</div>
						</li>				
						<!-- item 4 - com submenu -->
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Configurações
							</a>
							<!-- Submenu do item 1 -->
							<div class="dropdown-menu" aria-labelledby="navbarDropdown">
								<a class="dropdown-item" href="http://localhost/SCAMPV1/sobresys.php"> Sobre o sistema </a>
								<a class="dropdown-item" href="http://localhost/SCAMPV1/relatorioBugs.php"> Relatar bug </a>		
							</div>
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
							<img class="img-fluid mx-auto d-block" src="assets/img/sys/ico_header.png" width="140" height="140" alt="Logo do sistema">									
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
			              <span> Serviços/Finanças </span>
			              <a class="d-flex align-items-center text-muted" href="#">
			                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"></svg>
			              </a>
			            </h6>
			            <!-- Conjunto de opções desa parte do menu - CONFIGURAÇÕES -->
			            <ul class="nav flex-column mb-2">
			            	<!-- Item 1 - Sobre o sistema -->
				            <li class="nav-item">
				                <a class="nav-link" href="http://localhost/SCAMPV1/pedidos.php">
				                	<img src="assets/img/sys/ico_menu_item_pedidos_colorblack.png" width="24" height="24" /> 
				                 	Pedidos
				                </a>
				            </li>

				            <!-- Item 2 - Sobre o sistema -->
				            <li class="nav-item">
				                <a class="nav-link" href="http://localhost/SCAMPV1/financeiros.php">
				                	<img src="assets/img/sys/ico_menu_item_financeiros_colorblack.png" width="24" height="24" /> 
				                 	Finânceiros
				                </a>
				            </li>

			            	<!-- Item 3 - Sobre o sistema -->
				            <li class="nav-item">
				                <a class="nav-link" href="http://localhost/SCAMPV1/processos.php">
				                	<img src="assets/img/sys/ico_menu_item_processos_colorblack.png" width="24" height="24" /> 
				                 	Processos
				                </a>
				            </li>				            
				        </ul>
			        	
				        <!-- Separador de sessões deste menu -->
				    	<h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
			              <span> Agenda de atividades </span>
			              <a class="d-flex align-items-center text-muted" href="#">
			                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"></svg>
			              </a>
			            </h6>
			            <!-- Conjunto de opções desa parte do menu - CONFIGURAÇÕES -->
			            <ul class="nav flex-column mb-2">
			            	<!-- Item 1 - Sobre o sistema -->
				            <li class="nav-item">
				                <a class="nav-link" href="http://localhost/SCAMPV1/agenda.php">
				                <img src="assets/img/sys/ico_menu_item_agenda_colorblack.png" width="24" height="24" /> 
				                	Agenda
				                </a>
				            </li>
				            <!-- Item 2 - Sobre o sistema -->
				            <li class="nav-item">
				                <a class="nav-link" href="http://localhost/SCAMPV1/pendencias.php">
				                <img src="assets/img/sys/ico_menu_item_pendencias_colorblack.png" width="24" height="24" /> 
				                	Pendências
				                </a>
				            </li>
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
			            	<!-- Item 1 - Sobre o sistema -->
				            <li class="nav-item">
				                <a class="nav-link" href="http://localhost/SCAMPV1/sobresys.php">
				                 <img src="assets/img/sys/ico_menu_item_sobreosistema_colorblack.png" width="24" height="24" /> 
				                  Sobre o sistema
				                </a>
				            </li>
				            <!-- Item 2 - Relatar bug -->
				            <li class="nav-item">
				                <a class="nav-link" href="http://localhost/SCAMPV1/relatorioBugs.php">
				                	<img src="assets/img/sys/ico_menu_item_bugs_colorblack.png" width="24" height="24" />
				                 	Relatar bug
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