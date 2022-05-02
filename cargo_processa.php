<?php

	//Verifica se este arquivo foi acessado através do botão para inserção de cargo;
	if(isset($_POST['btnInserirCargo']) || isset($_POST['btnExcluirCargo'])) {

		//Mensagem de aviso;
	   	//echo "Processamento autorizado";
		//Atribui o action atual deste arquivo;
	   	$action = $_POST['txtAcaoCargo'];
	   	//Verifica se o action é orientado para inserção de um novo cargo;
	   	if ($action == "inserir") {

	   		//echo "Query a ser executada: Inserir <br> Action: " . $action . "<br> <br>"; 
	   		//Variável que fica como false, caso nenhum cargo seja selecionado;
	   		$cargoValidado = false;
	   		//Nome do cargo escrito;
	   		$nomeCargo = $_POST['txtNomeCargo'];
	   		//echo "Nome do cargo: " . $nomeCargo . "<br>";
	   		//Inicialização das permissões dos cargos, mantendo-se em zero aqueles com a checkbox respectiva;
	   		$inserirPermissaoCargo = 0; $atualizarPermissaoCargo = 0; $consultarPermissaoCargo = 0; $excluirPermissaoCargo = 0;
	   		//Verifica se a permissão de inserção está selecionada;
	   		if (isset($_POST['ccbOpcaoInserir'])) {

	   			//Valida o insert, pois foi detectado um cargo selecionado;
	   			$cargoValidado = true;
	   			//Este cargo recebe permissão para inserção;
	   			$inserirPermissaoCargo = 1; 
	   			//echo "Permissão para Inserir: " . $inserirPermissaoCargo . "<br>";	
	   		}
	   		//Verifica se a permissão de alteração está selecionada;
	   		if (isset($_POST['ccbOpcaoAlterar'])) {

	   			//Valida o insert, pois foi detectado um cargo selecionado;
	   			$cargoValidado = true;
	   			//Este cargo recebe permissão para alteração
	   			$atualizarPermissaoCargo = 1; 
	   			//echo "Permissão para Alterar: " . $atualizarPermissaoCargo . "<br>";	
	   		}	
	   		//Verifica se a permissão de consulta está selecionada;
	   		if (isset($_POST['ccbOpcaoConsultar'])) {

	   			//Valida o insert, pois foi detectado um cargo selecionado;
				$cargoValidado = true;
				//Este cargo recebe permissão para consulta
	   			$consultarPermissaoCargo = 1; 
	   			//echo "Permissão para Consultar: " . $consultarPermissaoCargo . "<br>";	
	   		}	
	   		//Verifica se a permissão de exclusão está selecionada;
	   		if (isset($_POST['ccbOpcaoExcluir'])) {

	   			//Valida o insert, pois foi detectado um cargo selecionado;
	   			$cargoValidado = true;
	   			//Este cargo recebe permissão para exclusão;
	   			$excluirPermissaoCargo = 1; 
	   			//echo "Permissão para Excluir: " . $excluirPermissaoCargo . "<br>";	
	   		}	
	   		//Verifica se algum cargo foi selecionado;
	   		if ($cargoValidado) {

	   			//Inicia-se uma conexão com o banco de dados;
				require ("ConnectionMYSQL/connection.php");
				//Inicia-se uma conexão com a classe de negócios de cargo;
				require ("Negocios/cargoNegocios.php");
				//Inicia-se uma conexão com a classe de objetos do cargo;
				require ("ObjetoTransferencia/cargo.php");

				//Instancia-se os objeto do cargo;
				$cargo = new Cargo();

				//Atribuímos os dados do cargo nesse objeto;
				$cargo->setNomenclatura($_POST['txtNomeCargo']);
				$cargo->setPermissaoInserir($inserirPermissaoCargo);
				$cargo->setPermissaoAlterar($atualizarPermissaoCargo);
				$cargo->setPermissaoConsultar($consultarPermissaoCargo);
				$cargo->setPermissaoDeletar($excluirPermissaoCargo);

				//Instancia-se o objeto de negocios do cargo;
				$cargoNegocios = new CargoNegocios();

				//Executa o procedimento para inserção do cargo;
				$resultIdentificador = $cargoNegocios->inserirCargo($cargo);

				//Verifica se o id é um integer e se é maior que zero;
				if ( $resultIdentificador > 0 ) {
					//Após executar a procedure, mensagem para o usuário e redirecionamento
					echo 
						"<script>  
							alert('Informações do cargo inseridas com sucesso');
							location.href='configuracao_admin.php';
						</script>";		
				}

			//Caso contrário...
	   		} else {

	   			//O usuário será avisado pelo qual erro foi ocassionado e redirecionado para a página de admin;
				echo "<script>  

					alert('Selecione uma permissão para cadastrar este cargo');
					location.href='configuracao_admin.php';
				</script>";
	   		}		
	   	}
	   	else if ($action == "excluir") {

	   		//Inicia-se uma conexão com o banco de dados;
			require ("ConnectionMYSQL/connection.php");
			//Inicia-se uma conexão com a classe de negócios de cargo;
			require ("Negocios/cargoNegocios.php");

			//Instancia-se o objeto de negócios do cargo;
			$cargo = new CargoNegocios();

			//Executa o procedimento para inserção do usuário;
			$resultIdentificador = $cargo->excluirCargo($_POST['txtIdentifyCargo']);

			//Verifica se o id é um integer e se é maior que zero;
			if ( $resultIdentificador > 0 ) {
				//Após executar a procedure, mensagem para o usuário e redirecionamento
				echo 
					"<script>  
						alert('Informações do cargo excluídas com sucesso');
						location.href='configuracao_admin.php';
					</script>";		
			}
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