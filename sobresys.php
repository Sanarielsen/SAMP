<!-- Sessão de verificação se existe um usuário logado e quais seus poderes -->
<?php 

	//Verificação se existe algum usuário logado para acesso desta página;
	include "identificacao_cargo.php";

	//Verificação de qual opção do menu está selecionada...
	$activeMenu = "SobreOSistema";
?>	

<!-- Instancia o header do site -->
<?php require_once("header.php"); ?>

 <!-- Instancia o painel do site contendo o menu vertical -->
<?php require_once("painel.php"); ?>

			<!-- Abertura da div que irá conter o conteúdo do site -->
			<main class="col-md-12 col-lg-10 justify-content-center" role="main">

				<!-- Abertura da div que irá centralizar o conteúdo vertical e horizontal -->
				<div class="row panelContainer d-flex justify-content-center justify-content-sm-center" style="height: 100% !important;">
					
					<!-- Abertura da div que irá manter o tamanho da div para centralização -->
	 				<div class="col-12 align-self-center">

						<div class="row mb-5">

							<div class="col-sm-6 col-md-6 col-lg-6 text-center">

								<!-- Icone do sistema -->
								<img class="img-fluid mx-auto my-2 d-block" src="assets/img/sys/ico_header.png" width="100" height="140" alt="Icone do sistema">
								<!-- Titulo do software e versão respectiva -->
								<h3 class="h3"> SAMP V2.0.2 </h3>
								<p class="p"> Sistema de Controle e Acompanhamento de Marcas e Patentes </p> 
								<!-- Notas de atualização do software -->
								<h5 class="h5"> <a href="#"> Notas de atualização </a> </h5> 
								<!-- Manual do usuário acompanhado com as atualizações -->
								<h5 class="h5"> <a href="#"> Manual do usuário </a> </h5> 				
							</div>

							<div class="col-sm-6 col-md-6 col-lg-6 text-center">
								<!-- Icone do desenvolvedor -->
								<img class="img-fluid mx-auto my-2 d-block" src="assets/img/sys/ico_header.png" width="100" height="140" alt="Icone do sistema">
								<!-- Nome do desenvolvedor e redirecionamento a sua homepage -->					
								<h3 class="h3"> Desenvolvido por: <a href="#"> BI:CODE </a> </h3> 

								<!-- <h5 class="h5"> <a href="#"> Verificar se há atualizações </a> </h5>  -->
								<h5 class="h5"> Última atualização: 10/11/2018 </h5>
							</div>
						</div>									
	 				<!-- Encerramento da div que irá manter o tamanho da div para centralização -->
	 				</div>
				<!-- Encerramento da div que irá centralizar o conteúdo vertical e horizontal -->
				</div>				
			<!-- Encerramento da div que irá conter o conteúdo do site -->
			</main>			
		<!-- Encerramento da div que irá conter o menu lateral e o conteudo do sistema -->
		</div>			
	<!-- Encerramento da div que irá cobrir toda a tela em questão de largura -->
	</div>

</body>

<!-- Encerramento da tag de html -->
</html>