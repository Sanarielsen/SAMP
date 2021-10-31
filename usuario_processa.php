<?php

	$action = $_POST['txtAcaoUsuario'];

	if ($action == "inserir") {

		//Captura-se as variáveis do sistema via POST;
		$nomeUsuario = $_POST['txtNomeUsuario'];
		$emailUsuario = $_POST['txtEmailUsuario'];
		$senhaUsuario = $_POST['txtSenhaUsuario'];
		$cargoUsuario = $_POST['sltCargoUsuario'];
		$perguntaUsuario = $_POST['txtPerguntaUsuario'];
		$respostaUsuario = $_POST['txtRespostaUsuario'];

		//Inicia a conexão com o banco de dados;
		include "connection.php";

		//Cria-se a string de query a ser executada com parâmetros;
		$sqlQuery = $conexao->prepare("CALL uspInserirUsuario(?, ?, ?, ?, ?, ?)");
		//Atribui-se os parametros para as variáveis;
		$sqlQuery->bind_param("isssss", $cargoUsuario, $nomeUsuario, $emailUsuario, $senhaUsuario, $perguntaUsuario, $respostaUsuario);
		//Executa a procedure;
		$sqlQuery->execute();

		if ($sqlQuery) {

			if ($sqlQuery->affected_rows) {				

				//Após a procedure ter alterado alguma linha no banco
				echo "<script>  

					alert('Informações do usuario foram inseridas com sucesso');
					location.href='configuracao_admin.php';
				</script>";

			} else {

				echo "Desculpe, mas parece que ocorreu algo de errado";
			}

		} else {

			echo "Ocorreu um erro para execução da inserção do usuário";
		}

		//Encerra a conexão com o banco;
		$sqlQuery->close();

	} 
	else if ($action == "alterar") {

		echo "Operação a ser realizada pelo banco: Alterar";

	} 
	else if ($action == "excluir") {

   		//echo "Cargo a ser excluído: " . $_POST['txtUsuarioIdentificador'];

   		//Identificador do cargo selecionado;
   		$identificador = $_POST['txtUsuarioIdentificador'];

   		if ( $identificador > 1) {

   			//Inicia uma conexão com o banco de dados;
	   		include "connection.php";

	   		//Cria-se a string parametrizada para execução da query;
			$sqlQuery = $conexao->prepare("CALL uspDeletarUsuario(?)");
			//Atribui-se os parametros para as variáveis;
			$sqlQuery->bind_param("i", $identificador);
			//Executa a procedure;
			$sqlQuery->execute();
			//Verifica se a query foi executada sem erros...
			if ($sqlQuery) {
				//Verifica se existe alguma linha afetada nesse insert
				if ($sqlQuery->affected_rows) {				

					//Após a procedure ter alterado alguma linha no banco
					echo "<script>  

						alert('Informações do usuário excluídos com sucesso');
						location.href='configuracao_admin.php';
					</script>";

				} 
				//Caso não tenha...
				else {

					//O usuário será avisado pelo qual erro foi ocassionado e redirecionado para a página de admin;
					echo "<script>  

						alert('Nenhum usuário foi excluído, tente novamente');
						location.href='configuracao_admin.php';
					</script>";
				}

			} else {

				//O usuário será avisado pelo qual erro foi ocassionado e redirecionado para a página de admin;
				echo "<script>  

					alert('Ocorreu um erro para a exclusão do usuário, tente novamente');
					location.href='configuracao_admin.php';
				</script>";
			} 
			
			//Encerra a conexão com o banco;
			$sqlQuery->close();
   		} 

   		else {

   			//O usuário será avisado pelo qual erro foi ocassionado e redirecionado para a página de admin;
			echo "<script>  

				alert('Este usuário é protegido pelo sistema, não foi possivel o deletar deste registro');
				location.href='configuracao_admin.php';
			</script>";
   		}
   	}	
	else {

		//Após a procedure ter alterado alguma linha no banco
		echo "<script>  

			alert('Acesso negado...');
			location.href='configuracao_admin.php';
		</script>";
	}
	





?>