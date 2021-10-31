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

	   			//Inicia uma conexão com o banco de dados;
	   			include "connection.php";

	   			//Cria-se a string parametrizada para execução da query;
				$sqlQuery = $conexao->prepare("CALL uspInserirUsuarioCargo(?, ?, ?, ?, ?)");
				//Atribui-se os parametros para as variáveis;
				$sqlQuery->bind_param("sssss", $nomeCargo, $inserirPermissaoCargo, $atualizarPermissaoCargo, $consultarPermissaoCargo, $excluirPermissaoCargo);
				//Executa a procedure;
				$sqlQuery->execute();
				//Verifica se a query foi executada sem erros...
				if ($sqlQuery) {
					//Verifica se existe alguma linha afetada nesse insert
					if ($sqlQuery->affected_rows) {				

						//Após a procedure ter alterado alguma linha no banco
						echo "<script>  

							alert('Informações do cargo foram inseridas com sucesso');
							location.href='configuracao_admin.php';
						</script>";

					} 
					//Caso não tenha...
					else {

						//O usuário será avisado pelo qual erro foi ocassionado e redirecionado para a página de admin;
						echo "<script>  

							alert('Nenhum usuário foi cargo, tente novamente');
							location.href='configuracao_admin.php';
						</script>";
					}

				} else {

					//O usuário será avisado pelo qual erro foi ocassionado e redirecionado para a página de admin;
					echo "<script>  

						alert('Ocorreu um erro para a inserção do cargo, tente novamente');
						location.href='configuracao_admin.php';
					</script>";
				}

				//Encerra a conexão com o banco;
				$sqlQuery->close();

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

	   		echo "Cargo a ser excluído: " . $_POST['txtCargoIdentificador'];

	   		//Identificador do cargo selecionado;
	   		$identificador = $_POST['txtCargoIdentificador'];

	   		if ( $identificador > 4) {

	   			//Inicia uma conexão com o banco de dados;
		   		include "connection.php";

		   		//Cria-se a string parametrizada para execução da query;
				$sqlQuery = $conexao->prepare("CALL uspDeletarUsuarioCargo(?)");
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

							alert('Informações do cargo e dos seus respectivos usuários excluídos com sucesso');
							location.href='configuracao_admin.php';
						</script>";

					} 
					//Caso não tenha...
					else {

						//O usuário será avisado pelo qual erro foi ocassionado e redirecionado para a página de admin;
						echo "<script>  

							alert('Nenhum cargo foi excluído, tente novamente');
							location.href='configuracao_admin.php';
						</script>";
					}

				} else {

					//O usuário será avisado pelo qual erro foi ocassionado e redirecionado para a página de admin;
					echo "<script>  

						alert('Ocorreu um erro para a exclusão do cargo, tente novamente');
						location.href='configuracao_admin.php';
					</script>";
				} 

				//Encerra a conexão com o banco;
				$sqlQuery->close();
	   		} 

	   		else {

	   			//O usuário será avisado pelo qual erro foi ocassionado e redirecionado para a página de admin;
				echo "<script>  

					alert('Este cargo é protegido pelo sistema, não foi possivel o deletar deste registro');
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