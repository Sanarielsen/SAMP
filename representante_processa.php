<?php

	//Instancia a variável que receberá o action via post;
	$action = $_POST['txtAcaoRepresentante'];

	//Separa-se os valores das variáveis;
	$identificadorCliente = trim($_POST['txtIdentificadorCliente']);
	$nomeRepresentante = trim($_POST['txtNomeRepresentante']);
	$nacionalidadeRepresentante = trim($_POST['txtNacionalidadeRepresentante']);
	$rgRepresentante = trim($_POST['txtRGRepresentante']);
	$cpfRepresentante = trim($_POST['txtCPFRepresentante']);
	$profissaoRepresentante = trim($_POST['txtProfissaoRepresentante']);
	$cargoRepresentante = trim($_POST['txtCargoRepresentante']);	

	if ($action == "novo") {

		echo "<br> Operação a ser realizada: " . $action . ", ou seja, inserir um novo representante";

		//Inicia-se uma conexão com o banco de dados;				
		include "connection.php";

		//Nesse caso, será pesquisado todos os registros sem qualquer restrição;
		$sqlProcedure = "CALL uspInserirClienteRepresentante('$identificadorCliente', '$nomeRepresentante', '$nacionalidadeRepresentante', '$rgRepresentante', '$cpfRepresentante', '$profissaoRepresentante', '$cargoRepresentante');";

		//Cria-se a string que carregará a query de consulta aos clientes;
		$procedureString = mysqli_query($conexao, $sqlProcedure) or die (mysqli_error($conexao)) ;

		//Verifica-se a query foi executada com sucesso;
		if ($procedureString) {

			echo "<script>  

				alert('Informações do representante foram inseridas com sucesso');
				location.href='representantes.php';
			</script>";
		} 
		else {

			echo "<br> Erro ao executar o registro do representante do cliente";
		}

	} else if ($action == "alterar") {

		echo "<br> Operação a ser realizada: " . $action . ", ou seja, alterar um representante já existente";

		$identificadorRepresentante = trim($_POST['txtIdentificadorRepresentante']);

		//Inicia-se uma conexão com o banco de dados;				
		include "connection.php";

		//Nesse caso, será pesquisado todos os registros sem qualquer restrição;
		$sqlProcedure = "CALL uspAtualizarClienteRepresentante('$identificadorRepresentante', '$identificadorCliente', '$nomeRepresentante', '$nacionalidadeRepresentante', '$rgRepresentante', '$cpfRepresentante', '$profissaoRepresentante', '$cargoRepresentante');";	

		//Cria-se a string que carregará a query de consulta aos clientes;
		$procedureString = mysqli_query($conexao, $sqlProcedure) or die (mysqli_error($conexao)) ;	

		//Verifica-se a query foi executada com sucesso;
		if ($procedureString) {

			echo "<script>  

				alert('Informações do representante foram atualizadas com sucesso');
				location.href='representantes.php';
			</script>";
		} 
		else {

			echo "<br> Erro ao executar o registro do representante do cliente";
		}
		
	} else {

		echo "<br> Houve um erro ou redirecionamento inadequado, tente novamente ou entre em contato com a equipe desenvolvedora";
	}

?>