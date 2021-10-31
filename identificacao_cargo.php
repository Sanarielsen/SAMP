<?php

	//Iniciamos a sessão para acesso as informações do usuário logado;
	session_start();

	//Caso esta sessão já tiver um login, permanecemos na página;
	if (isset($_SESSION["userOnline"]) && !empty($_SESSION["userOnline"])) {

		//echo "Sessão aberta <br> Email do Usuário: " . $_SESSION['UsuarioEmail'] . "<BR>";

		//Iniciamos uma conexão do banco de dados;
		include 'connection.php';

		//Capturamos o id correspondente a este usuário;
		$identificador = $_SESSION['idUser'];
		/* Teste  echo 'Teste de identificador: ' . $identificador; */

		//Caso não exista as informações do usuário
		if (!isset($_SESSION['identificadorCargo'])) {

			//Execução da query, caso aconteça algum problema/erro, procedimentos serão executados;
			$procedureString = mysqli_query($conexao, "CALL uspConsultarUsuarioStatus('$identificador');") or die (mysqli_error($conexao));

			//Variável para recebimento do resultado com associação de vetores
			$resultProcedure = mysqli_fetch_assoc($procedureString);

			//Ao ter os resultados dentro deste vetor, verifica quantas linhas existem...
			if ( $resultProcedure > 0 ) {

				//É coletado as informações do usuário;
				//Nome completo;
				$_SESSION['UsuarioNome'] = $resultProcedure['nomeUsuario'];
				/* Teste / echo ' <br> Nome do usuário: ' . $resultProcedure['nomeUsuario']; */
				//Email utilizado;
				$_SESSION['UsuarioEmail'] = $resultProcedure['emailUsuario'];
				/* Teste / echo ' <br> Email: ' . $resultProcedure['emailUsuario'];*/
				//Cargo de usuário;
				$_SESSION['UsuarioCargo'] = $resultProcedure['identificadorCargo'];
				/* Teste / echo ' <br> Identificador do cargo: ' . $resultProcedure['identificadorCargo']; */
				//Nome do cargo do usuario 
				$_SESSION['UsuarioNomeCargo'] = $resultProcedure['nomeCargo'];
				/* Teste / echo ' <br> Nome do cargo: ' . $resultProcedure['nomeCargo']; */
				//Permissão para inserção de informações?
				$_SESSION['inserirCreden'] = $resultProcedure['inserir'];
				/* Teste / echo ' <br> Autorização inserção: ' . $resultProcedure['inserir']; */
				//Permissão para consulta de informações?
				$_SESSION['consultarCreden'] = $resultProcedure['consultar'];
				/* Teste / echo ' <br> Autorização consulta: ' . $resultProcedure['consultar']; */
				//Permissão para alteração de informações?
				$_SESSION['alterarCreden'] = $resultProcedure['alterar'];
				/* Teste / echo ' <br> Autorização alteração: ' . $resultProcedure['alterar']; */
				//Permissão para exclusão de informações?
				$_SESSION['excluirCreden'] = $resultProcedure['excluir'];
				/* Teste / echo ' <br> Autorização exclusão: ' . $resultProcedure['excluir']; */
			}
			else {

				//echo "Houve algum problema no sistema, devido a falta de usuários pesquisados";
			}
		}
		else {

			//echo 'Usuário com cargo já pesquisado';
		}	
	}
	else {

		echo "Usuário deslogado";
		echo "<script> alert('Não existe nenhum usuário logado, redirecionado para a tela de login...'); </script>";
		header('Location: identificacao.php');
	}
?>