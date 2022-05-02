<?php

	//Verificação se existe algum usuário logado para acesso desta página;
	include "identificacao_cargo.php";

	//Verifica se o componente de acao foi enviado para este arquivo
	if (isset($_POST['txtAcaoRepresentante'])) {

		//Inicia-se uma conexão com o banco de dados;
		require ("ConnectionMYSQL/connection.php");
		//Inicia-se uma conexão com a camada de negocio dos representantes;
		require ("Negocios/representanteNegocios.php");

		//Instancia a variável que receberá o action via post;
		$action = $_POST['txtAcaoRepresentante'];	

		//Verifica se ação a ser executada é para inserção...
		if ($action == "Inserir") {

			//Inicia-se uma conexao com a camada de objetos dos representantes;
			require ("ObjetoTransferencia/representante.php");

			//Instancia-se o objeto de representante;
			$representante = new Representante();

			//Atribuí-se os parametros deste objeto;
			$representante->setCliente(trim($_POST['txtIdentificadorCliente']));
			$representante->setNome(trim($_POST['txtNomeRepresentante']));
			$representante->setNacionalidade(trim($_POST['txtNacionalidadeRepresentante']));
			$representante->setRG(trim($_POST['txtRGRepresentante']));
			$representante->setCPF(trim($_POST['txtCPFRepresentante']));
			$representante->setProfissao(trim($_POST['txtProfissaoRepresentante']));
			$representante->setCargo(trim($_POST['txtCargoRepresentante']));

			//Instancia-se os procedimentos do banco de dados;
			$representanteNegocios = new RepresentanteNegocios();
			//Executa a query e guarda o resultado nesta variável;
			$resultRepresentante = $representanteNegocios->inserirRepresentante($representante);

			//Se o resultado for um integer...
			if ( is_numeric($resultRepresentante) ) {

				echo "<script>  

					alert('Representante registrado com sucesso');
					location.href='representantes.php';
				</script>";
			}
			//Se não, retornou uma mensagem de erro...
			else {

				echo "<script>  

					alert('Ocorreu um erro para registrar este representante, tente novamente');
					location.href='representantes.php';
				</script>";
			}
		}
		//Verifica se ação a ser executada é para alteração...		
		else if ($action == "Alterar") {

			//Inicia-se uma conexao com a camada de objetos dos representantes;
			require ("ObjetoTransferencia/representante.php");

			//Instancia-se o objeto de representante;
			$representante = new Representante();

			//Atribuí-se os parametros deste objeto;
			$representante->setIdentificador(trim($_POST['txtIdentificadorRepresentante']));
			$representante->setCliente(trim($_POST['txtIdentificadorCliente']));
			$representante->setNome(trim($_POST['txtNomeRepresentante']));
			$representante->setNacionalidade(trim($_POST['txtNacionalidadeRepresentante']));
			$representante->setRG(trim($_POST['txtRGRepresentante']));
			$representante->setCPF(trim($_POST['txtCPFRepresentante']));
			$representante->setProfissao(trim($_POST['txtProfissaoRepresentante']));
			$representante->setCargo(trim($_POST['txtCargoRepresentante']));

			//Instancia-se os procedimentos do banco de dados;
			$representanteNegocios = new RepresentanteNegocios();
			//Executa a query e guarda o resultado nesta variável;
			$resultRepresentante = $representanteNegocios->alterarRepresentante($representante);

			//Se o resultado for um integer...
			if ( is_numeric($resultRepresentante) ) {

				echo "<script>  

					alert('Representante alterado com sucesso');
					location.href='representantes.php';
				</script>";
			}
			//Se não, retornou uma mensagem de erro...
			else {

				echo "<script>  

					alert('Ocorreu um erro para alterar este representante, tente novamente');
					location.href='representantes.php';
				</script>";
			}
		}
		//Verifica se ação a ser executada é para consultar...		
		else if ($action == "Excluir") {
			
			//Instancia-se os procedimentos do banco de dados;
			$representanteNegocios = new RepresentanteNegocios();
			//Executa a query e guarda o resultado nesta variável;
			$resultRepresentante = $representanteNegocios->excluirRepresentante(trim($_POST['idRepresentanteExcluir']));

			//Se o resultado for um integer...
			if ( is_numeric($resultRepresentante) ) {

				echo "<script>  

					alert('Representante excluido com sucesso');
					location.href='representantes.php';
				</script>";
			}
			//Se não, retornou uma mensagem de erro...
			else {

				echo "<script>  

					alert('Ocorreu um erro para excluido este representante, tente novamente');
					location.href='representantes.php';
				</script>";
			}
		}
	}
	//Nesse caso, o usuário será redirecionado de volta a tela de representantes;
	else {

		echo "<script>  

			alert('Foi encontrado uma burlagem no sistema, redirecionando para a tela de representantes...');
			location.href='representantes.php';
		</script>";
	}

		
	/*
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
	}*/

?>