<?php

	//Estando online, requisitamos o nome do usuário;
	include "identificacao_cargo.php";
	//Verificação de qual opção do menu está selecionada...
	$activeMenu = "";	
	//Captação das informações do usuário logado;
	//Nome do usuário;
	$nomeUsuario = $_SESSION['UsuarioNome'];
	//Email do usuário;
	$emailUsuario = $_SESSION['UsuarioEmail'];
	//Cargo do usuário;
	$cargoUsuario = $_SESSION['UsuarioCargo'];
	//Nome do cargo do usuário;
	$nomeCargoUsuario = $_SESSION['UsuarioNomeCargo'];
?>
<!-- Instancia o header do site -->
<?php require_once("header.php"); ?>
<!-- Instancia o painel do site contendo o menu vertical -->
<?php require_once("painel.php"); ?>
<!-- Procedimento para verificação das pendências disponíveis neste dia -->
<?php 

	//Importa as configurações para conversão e tratamento de datatime;
	require("functions.php");
	//Importa as configurações para conexão com o banco de dados;
	require("ConnectionMYSQL/connection.php");
	//Importa os métodos de negócios das conferências;
	require("Negocios/conferenciaNegocios.php");
	// Modifica a zona de tempo a ser utilizada. Disponível desde o PHP 5.1
	date_default_timezone_set('America/Sao_Paulo');	
	//Requisita-se a data atual com base no sistema;
	$dataAtual = date('Y-m-d');
	//echo $dataAtual;
	//Agora com a hora atual;
	$dataCompleta = date('Y-m-d H:i:s');
	//echo $dataCompleta;
	//Instancia os métodos de negócios;
	$conferenciaNegocios = new ConferenciaNegocios();
	//Inicia o procedimento de consulta das conferencias e as armazena nesta variável;
	$resultConferenciasAtuais = $conferenciaNegocios->consultarConferenciasDoDia($dataAtual);		
?>
<!-- Procedimento para verificação das pendências em abertas/andamento -->
<?php 
	//Instancia-se os tempos das conferências até o momento marcado;
	$tempoRestanteConferencias = array();	
	//Instancia-se os nomes dos representantes das empresas respectivas das conferências;
	$listNomeRepresentantes = array();
	//Instancia-se os nomes dos clientes das empresas respectivas das conferências;
	$listNomeEmpresa = array();
	//O Contador de conferências disponíveis dentro deste resultado é atribuído para esta variável
	$quantConferencias = count($resultConferenciasAtuais);	
	//O Contador de conferências que estão pendentes, ou seja, fora do "encerrado";
	$quantConferenciasPendentes = 0;
	//Verifica se existem pendências cadastradas para hoje...
	if ( $quantConferencias > 0 ) {
		//Inicia um sistema de repetição para percorrer todos os pontos desta variável;
		for ( $i = 0 ; $i < $quantConferencias ; $i++ ) { 
			//Reserva a conferência atual deste vetor;
			$conferenciaDetalhe = $resultConferenciasAtuais[$i];
			//Verifica se a conferencia atual está com o status diferente de "encerrado";
			if ($conferenciaDetalhe['estadoConferencia'] <> "Encerrada") {
				//Armazena o tempo restante dentre a data atual e a da conferência em questão;				
				$tempoRestanteConferencias = tempoRestante($dataCompleta, $conferenciaDetalhe['dataConferencia']);
				//Armezena o nome da empresa respectiva da conferencia;
				$listNomeEmpresa = $conferenciaDetalhe['nomeFantasiaCliente'];
				//Armezena o nome do representante respectiva da conferencia;
				$listNomeRepresentantes = $conferenciaDetalhe['nomeRepresentante'];
				//Armazena as observações das conferências respectivas;
				$listObservacao = $conferenciaDetalhe['observacaoConferencia'];
				//Contabiliza o numero atual de pendências;
				$quantConferenciasPendentes += 1;
			//Intervalo do PHP
			?>
				<!-- Componente vetorizado que carrega as informações das conferencias -->
				<input type="hidden" name="txtCronoConferencias[]" id="txtCronoConferencias[]" value="<?php echo $tempoRestanteConferencias ?>">	
				<!-- Componente vetorizado que carrega as informações das empresas -->
				<input type="hidden" name="txtNomeEmpresa[]" id="txtNomeEmpresa[]" value="<?php echo $listNomeEmpresa ?>">
				<!-- Componente vetorizado que carrega as informações do nome do representante respectivo -->
				<input type="hidden" name="txtNomeRepresentante[]" id="txtNomeRepresentante[]" value="<?php echo $listNomeRepresentantes ?>">	
				<!-- Componente vetorizado que carrega as informações adicionais da conferencia -->
				<input type="hidden" name="txtObservacaoConferencia[]" id="txtObservacaoConferencia[]" value="<?php echo $listObservacao ?>">		
			<!-- Intervalo do PHP -->
			<?php					
			//Intervalo do PHP
			}		
		//Encerra este sistema de repetição para percorrer todos os pontos desta variável;
		}
		//Após receber os tempos correspondentes para a ativação das notificações, verifica se alguma foi encontrada...
		if ( !empty($tempoRestanteConferencias) ) {			
			
			?>

			<input type="hidden" name="txtContadorConferencias" id="txtContadorConferencias" value="<?php echo $quantConferenciasPendentes ?>">	
			<input type="hidden" name="txtNomeUsuario" id="txtNomeUsuario" value="<?php echo $nomeUsuario ?>">			

			<?php			

			require("notifications.php");
		}
		else {			
		
			?>			

			<input type="hidden" name="txtContadorConferencias" id="txtContadorConferencias" value="<?php echo $quantConferenciasPendentes ?>">

			<?php
		}

		
	}
	//Caso seja nulo...
	else {

		
	}
?>

<!-- Abertura da div que irá conter o conteúdo do site -->
<main class="col-md-12 col-lg-10" role="main">		                			
	
	<!-- Abertura da div que irá centralizar o conteúdo vertical e horizontal -->
	<div class="row panelContainer d-flex justify-content-center justify-content-sm-center" style="height: 100% !important;">
		
		<!-- Abertura da div que irá manter o tamanho da div para centralização -->
			<div class="col-sm-6 col-md-4 col-lg-4 col-xl-6 align-self-center">

				<!-- Icone do sistema -->
			<img class="img-fluid mx-auto d-block" src="assets/img/sys/ico_header.png" width="140" height="140" alt="Logo do sistema">
			<!-- Titulo indicando uma mensagem de boas-vindas -->
				<h2 class="h2 text-center py-4"> Seja bem-vindo, <?php echo $nomeUsuario ?> </h2>		
				<!-- Titulo indicando os status que o usuário possui -->
				<h4 class="h4 text-center py-2"> Você está logado como: <?php echo $emailUsuario ?> </h4>	
				<h4 class="h4 text-center py-2"> Designado como:  <?php echo $nomeCargoUsuario ?></h4>
				<!-- Parágrafos indicando informações do sistema -->
				<p class="p text-center pt-4"> Use os menus ao lado para acessar o sistema </p>
				<p class="p text-center"> Para mais informações, vá ao menu "Sobre o sistema" </p>				
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