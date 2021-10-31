<?php
	
	//String de testes;	
	//echo "Redirecionou". $_POST['txtAcaoCadastro'];

	//Recebe as informações via post da pagina anterior;
	$action = $_POST['txtAcaoRepresentante'];

	//Verifica qual método será utilizado na página de cadastro detalhe;
	if ($action == "novo") {

		//String de testes;	
		//echo "Redirecionado configurado para inserção";

		//Abre a sessão para transmitir esse arquivo para o outro php;
		session_start();
		//Instancia o valor da variável de ação para a sessão;
		$_SESSION['action'] = $action;
		//Identificador do cliente atual para referênciá-lo no banco;
		$_SESSION['identificadorCliente'] = $_POST['txtIdentificadorCliente'];
		$ident = trim($_SESSION['identificadorCliente']);	
	
		//Nesse caso, será pesquisado todos os registros sem qualquer restrição;
		$sqlProcedure = "CALL uspConsultarRepresentanteNomeCliente($ident);";

		//Inicia-se uma conexão com o banco de dados;				
		include "connection.php";

		//Cria-se a string que carregará a query de consulta aos clientes;
		$procedureString = mysqli_query($conexao, $sqlProcedure) or die (mysqli_error($conexao)) ;

		//Verifica-se a query foi executada com sucesso;
		if ($procedureString) {

			$resultProcedure = mysqli_fetch_assoc($procedureString);
			$_SESSION['nomeFantasiaCliente'] = $resultProcedure['nomeEmpresa'];

			//Redireciona para a página de cadastro_detalhe;
			header ('Location: representante_detalhe.php');
		}
		else {

			//Redireciona para a página de cadastro_detalhe;
			header ('Location: representantes.php');
		}
		

	} else if ($action == "alterar" ) {

		//String de testes;	
		//echo "Redirecionado configurado para alteração";

		//Abre a sessão para transmitir esse arquivo para o outro php;
		session_start();
		//Instancia o valor da variável de ação para a sessão;
		$_SESSION['action'] = $action;
		//Identificador do representante para referenciá-lo no banco;
		$_SESSION['identificadorRepresentante'] = $_POST['txtIdentificadorRepresentante'];			
		//Identificador do cliente atual para referênciá-lo no banco;
		$_SESSION['identificadorCliente'] = $_POST['txtIdentificadorCliente'];
		$_SESSION['nomeFantasiaCliente'] = $_POST['txtNomeFantasiaCliente'];
		$_SESSION['nomeRepresentante'] = $_POST['txtNomeRepresentante'];
		$_SESSION['rgRepresentante'] = $_POST['txtRGRepresentante'];
		$_SESSION['cpfRepresentante'] = $_POST['txtCPFRepresentante'];
		$_SESSION['profissaoRepresentante'] = $_POST['txtProfissaoRepresentante'];
		$_SESSION['cargoRepresentante'] = $_POST['txtCargoRepresentante'];
		$_SESSION['nacionalidadeRepresentante'] = $_POST['txtNacionalidadeRepresentante'];

		//Redireciona para a página de cadastro_detalhe;
		header ('Location: representante_detalhe.php');
	}
	else if ($action == "excluir") {

		echo "Ação de exclusão pronta para iniciar - idCliente: " . $_POST['idRepresentanteExcluir'];

		//Id que terá sua linha referenciada para exclusão do item;
		$identificador = $_POST['idRepresentanteExcluir'];
		//Inicia-se uma conexão com o banco de dados;
		include "connection.php";		
		//Query que será executada no banco;
		$sqlProcedure = "CALL uspDeletarClienteRepresentante($identificador);";
		//Execução e resultado dessa query;
		$procedureString = mysqli_query($conexao, $sqlProcedure) or die (mysqli_error($conexao)) ;
		//Verifica se a query foi executada sem erros ou interrupções;
		if ($procedureString) {
			/* Mensagem amigável ao usuário informando do resultado positivo */
			echo "<script> alert('Informações do representante excluidas com sucesso') </script>";
			/* Redireciona o mesmo para a página de cadastros novamente */
			echo "<script> location.href='representantes.php' </script>";
		}
		//Caso ocorra algum erro...
		else {
			/* Mensagem amigável ao usuário informando do resultado negativo */
			echo "<script> alert('Ocorreu algum erro durante o momento da exclusão, tente novamente') </script>";
			/* Redireciona o mesmo para a página de cadastros novamente */
			echo "<script> location.href='representantes.php' </script>";
		}
	}  
	else {

		echo "Houve algum erro interno, por favor, tente novamente ou comunique a equipe desenvolvedora";
		header ('Location: representantes.php');
	}
?>