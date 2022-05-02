	
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
							<a class="dropdown-item" href="http://localhost/samp/cadastros.php"> Cadastros </a>
							<a class="dropdown-item" href="http://localhost/samp/representantes.php"> Representantes </a>		
						</div>
					</li>
					<!-- item 2 - com submenu -->
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Conferências
						</a>
						<!-- Submenu do item 1 -->
						<div class="dropdown-menu" aria-labelledby="navbarDropdown">
							<a class="dropdown-item" href="http://localhost/samp/agenda.php"> Agenda </a>
							<a class="dropdown-item" href="http://localhost/samp/pendencias.php"> Pendências </a>		
						</div>
					</li>				
					<!-- item 3 - com submenu -->
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Configurações
						</a>
						<!-- Submenu do item 1 -->
						<div class="dropdown-menu" aria-labelledby="navbarDropdown">
							<a class="dropdown-item" href="http://localhost/samp/sobresys.php"> Sobre o sistema </a>
							<!-- <a class="dropdown-item" href="http://localhost/samp/relatorioBugs.php"> Relatar bug </a> -->
						</div>
					</li>	
					<!-- item 4 -->
					<li class="nav-item">
						<a class="nav-link" href="http://localhost/samp/identificacao_outline.php"> Sair </a>
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
					<a class="my-2 navbar-brand" href="http://localhost/samp/principal.php">
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
			                <a class="nav-link <?php if ($activeMenu == "Cadastros") : echo "text-primary"; endif; ?>" href="http://localhost/samp/cadastros.php">
			                  	<img width="24" height="24" src="
			                  		<?php			                  		
		                  				if ($activeMenu == 'Cadastros') : 
		                  					echo 'assets/img/sys/ico_menu_item_cadastros_colorblue.png';
		                  				else: 
		                  					echo 'assets/img/sys/ico_menu_item_cadastros_colorblack.png';
		                  				endif;
                  					?>"  />
			                  	Cadastros 
			                </a>
		              	</li>
		              	<!-- Item 2 - Representantes -->
			            <li class="nav-item">
			                <a class="nav-link <?php if ($activeMenu == "Representantes") : echo "text-primary"; endif; ?>" href="http://localhost/samp/representantes.php">
			                  	<img width="24" height="24" src="
			                  		<?php			                  		
		                  				if ($activeMenu == 'Representantes') : 
		                  					echo 'assets/img/sys/ico_menu_item_representantes_colorblue.png';
		                  				else: 
		                  					echo 'assets/img/sys/ico_menu_item_representantes_colorblack.png';
		                  				endif;
                  					?>"  />			                  
			                  	Representantes
			                </a>
			            </li>
			            <!-- Conjunto de opções desa parte do menu ENCERRADO - Empresas/Clientes -->  
			        </ul>
			        <!-- Separador de sessões deste menu -->
			    	<h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
		              <span> Conferências </span>
		              <a class="d-flex align-items-center text-muted" href="#">
		                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"></svg>
		              </a>
		            </h6>
		            <!-- Conjunto de opções desa parte do menu - AGENDA DE TAREFAS -->
		            <ul class="nav flex-column mb-2">
		            	<!-- Item 1 - Sobre o sistema -->
			            <li class="nav-item">
			                <a class="nav-link <?php if ($activeMenu == "Agenda") : echo "text-primary"; endif; ?>" href="http://localhost/samp/agenda.php">
			                <img width="24" height="24" src="
			                  		<?php			                  		
		                  				if ($activeMenu == 'Agenda') : 
		                  					echo 'assets/img/sys/ico_menu_item_agenda_colorblue.png';
		                  				else: 
		                  					echo 'assets/img/sys/ico_menu_item_agenda_colorblack.png';
		                  				endif;
                  					?>" />
			                	Agenda
			                </a>
			            </li>
			            <!-- Item 2 - Sobre o sistema -->
			            <li class="nav-item">
			                <a class="nav-link <?php if ($activeMenu == "Pendencias") : echo "text-primary"; endif; ?>" href="http://localhost/samp/pendencias.php">
			                <img width="24" height="24" src="
			                		<?php			                  		
		                  				if ($activeMenu == 'Pendencias') : 
		                  					echo 'assets/img/sys/ico_menu_item_pendencias_colorblue.png';
		                  				else: 
		                  					echo 'assets/img/sys/ico_menu_item_pendencias_colorblack.png';
		                  				endif;
                  					?>" /> 
			                	Pendências
			                </a>
			            </li>
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
			                <a class="nav-link <?php if ($activeMenu == "Pedidos") : echo "text-primary"; endif; ?>" href="http://localhost/samp/pedidos.php">
			                	<img width="24" height="24" src="
			                		<?php
			                			if ($activeMenu == 'Pedidos') : 
		                  					echo 'assets/img/sys/ico_menu_item_pedidos_colorblue.png"';
		                  				else: 
		                  					echo 'assets/img/sys/ico_menu_item_pedidos_colorblack.png"';
		                  				endif;
			                		?>" /> 
			                 	Pedidos
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
		            	<?php

		            		if ( $_SESSION['UsuarioNomeCargo'] == "Administrador(a)" ) {
		            	?>

		            	<!-- Item 1 - Sobre o sistema -->
			            <li class="nav-item">
			                <a class="nav-link <?php if ($activeMenu == "ConfiguracaoAdmin") : echo "text-primary"; endif; ?>" href="http://localhost/samp/configuracao_admin.php">
			                 	<img width="24" height="24" src="
			                 		<?php			                  		
		                  				if ($activeMenu == 'ConfiguracaoAdmin') : 
		                  					echo 'assets/img/sys/ico_menu_item_admin_config_blue.png';
		                  				else: 
		                  					echo 'assets/img/sys/ico_menu_item_admin_config_black.png';
		                  				endif;
                  					?>" /> 
			                  	Config. Admin
			                </a>
			            </li>

			            <?php

			            	}
			            ?>
		            	<!-- Item 2 - Sobre o sistema -->
			            <li class="nav-item">
			                <a class="nav-link <?php if ($activeMenu == "SobreOSistema") : echo "text-primary"; endif; ?>" href="http://localhost/samp/sobresys.php">
			                 <img width="24" height="24" src="
			                 		<?php			                  		
		                  				if ($activeMenu == 'SobreOSistema') : 
		                  					echo 'assets/img/sys/ico_menu_item_sobreosistema_colorblue.png';
		                  				else: 
		                  					echo 'assets/img/sys/ico_menu_item_sobreosistema_colorblack.png';
		                  				endif;
                  					?>" />
			                  	Sobre o sistema
			                </a>
			            </li>
			            <!-- Item 2 - Sair -->
			            <li class="nav-item">
			                <a class="nav-link" href="http://localhost/samp/identificacao_outline.php">
			                	<img width="24" height="24" src="assets/img/sys/ico_menu_item_sair_colorblack.png" />
			                	Sair
			                </a>
			            </li>			          
			        <!-- Conjunto de opções desa parte do menu ENCERRADO - CONFIGURAÇÕES -->
			        </ul>
			    </div>
			</nav>