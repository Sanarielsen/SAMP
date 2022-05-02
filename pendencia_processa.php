<?php 
	
	//Mensagem ao console de alterações realizadas...
	echo "<script> console.log('Requisição para um procedimento de uma conferencia'); </script>";

	//Verifica-se o botão para redirecionamento a esta página foi o solicitante deste carregamento...
	if ( isset($_REQUEST['btnAlterarEstadoConferencia']) && !empty($_POST['idConferencia']) ) {		

		//Mensagem ao console de alterações realizadas...
		echo "<script> console.log('Acesso permitido, a página foi acessada de forma legal'); </script>";

		//Instancia-se o método a ser utilizado;
		$action = $_POST['txtAcaoPendencia'];

		if ($action == "Alterar Estado") {

			//Mensagem ao console de alterações realizadas...
			echo "<script> console.log('Solicitação atual: Alterar Estado da Conferencia'); </script>";
			//Instancia-se o identificador que representa a conferência atual;
			$identificador = $_POST['idConferencia'];		
			//Instancia-se para qual estado essa pendência está a ser transferida;
			$estadoSolicitado = $_POST['estadoConferenciaAlterado'];

			//Importa as configurações para conexão no banco de dados;
			require("ConnectionMYSQL/connection.php");
			//Importa os procedimentos para acesso aos dados das conferências;
			require("Negocios/conferenciaNegocios.php");

			//Atribuí-se as configurações da camada de negócios a esta variável;
			$conferenciaNegocios = new ConferenciaNegocios();

			//Inicia-se o procedimento para alteração do estado da conferencia e guarda o resultado dele nesta variável;
			$resultEstadoConferencia = $conferenciaNegocios->alterarConferenciaEstado($identificador, $estadoSolicitado);

			//Verifica se o retorno do procedimento carrega um número...
			if ( is_numeric( $resultEstadoConferencia ) ) {

				//Mensagem ao console de alterações realizadas...
				echo "<script> console.log('Procedimento para alteração do estado da conferencia realizado com sucesso'); </script>";

				//Mensagem visual ao usuário para informação do acesso negado...
				echo 
				"<script>  

					alert('A conferência teve seu estado atual alterado com sucesso.');
					location.href='pendencias.php';
				</script>";
			}	
			//Caso contrário, será uma mensagem de erro retornada ou uma variável vazia...
			else {

				//Mensagem ao console de alterações realizadas...
				echo "<script> console.log('Procedimento para alteração do estado da conferencia com falhas'); </script>";

				//Mensagem visual ao usuário para informação do acesso negado...
				echo 
				"<script>  

					alert('Houve algum problema durante o procedimento da alteração do estado da conferência');
					location.href='pendencias.php';
				</script>";
			}
		}

		else {

			//Mensagem ao console de alterações realizadas...
			echo "<script> console.log('Não foram encontradas ações para esta operação'); </script>";

			//Mensagem visual ao usuário para informação do acesso negado...
			echo 
			"<script>  

				alert('Não foi encontrada ação a ser realizada, tente novamente');
				location.href='pendencias.php';
			</script>";
		}
	}
	//Caso contrário... acesso ilegal detectado;
	else {

		//Mensagem ao console de alterações realizadas...
		echo "<script> console.log('Acesso negado, a página foi acessada por redirecionamento ou por terceiros'); </script>";

		//Mensagem visual ao usuário para informação do acesso negado...
		echo 
		"<script>  

			alert('Cuidado aonde pisa! Não tente burlar o sistema, amiguinho.');
			location.href='pendencias.php';
		</script>";
	}
?>