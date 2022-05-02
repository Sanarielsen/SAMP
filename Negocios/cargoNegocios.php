<?php

	class CargoNegocios {

		//Procedimento para inserção de cargos no sistema;
		public function inserirCargo(Cargo $cargo) {

			//echo "Método de inserir cargo foi acessado";

			//Instancia esta conexão para esta variável;
			$conexao = getConnection();

			//Cria-se a string que contém a query de execução da procedure;
			$sqlProcedure = "CALL uspInserirUsuarioCargo(:nomenclatura, :inserir, :alterar, :consultar, :deletar);";

			//Cria-se a string carregada com parametros para execução da procedure;
			$sqlQuery = $conexao->prepare($sqlProcedure);

			//Atribui-se os parametros das variáveis da query parametrizada;
			$sqlQuery->bindValue(':nomenclatura', $cargo->getNomenclatura());
			$sqlQuery->bindValue(':inserir', $cargo->getPermissaoInserir());
			$sqlQuery->bindValue(':alterar', $cargo->getPermissaoAlterar());
			$sqlQuery->bindValue(':consultar', $cargo->getPermissaoConsultar());
			$sqlQuery->bindValue(':deletar', $cargo->getPermissaoDeletar());
			
			//Executa a query e já verifica se esta foi executada com sucesso;
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Procedure foi executada com sucesso") </script>';

				//Verifica quantas linhas vieram de resultado nessa procedure;
				if ($sqlQuery->rowCount() > 0) {

					//Se for, maior que zero, concentra este resultado único nesta variável;
					$result = $sqlQuery->fetch();

					//Retorna como resultado deste bloco;
					return $result['Retorno'];
				}
				else {

					//Retorna como resultado deste bloco;
					return "Nenhuma linha foi alterada nessa query";
				}
			}
			else {

				//Manda para o console o resultado da procedure;
				echo "Ocorreu um problema na execução desta operação, verifique sua conexão ou estado do servidor";
				echo '<script> console.log(' . $sqlQuery->errorInfo() . ') </script>';									
			}
		}

		//Procedimento para alteração de cargos no sistema;

		//Procedimento para exclusão de cargo do sistema;
		public function excluirCargo($identificador) {

			//Script log para o console do navegador (DEBUG)
			echo '<script> console.log("Executou o método de negocios de exclusão de cargo"); </script>';

			//Instancia esta conexão para esta variável;
			$conexao = getConnection();

			//Cria-se a string que contém a query de execução da procedure;
			$sqlProcedure = "CALL uspDeletarUsuarioCargo(?);";

			//Cria-se a string carregada com parametros para execução da procedure;
			$sqlQuery = $conexao->prepare($sqlProcedure);
			//Atribui-se os parametros das variáveis da query parametrizada;
			$sqlQuery->bindValue(1, $identificador);

			//Executa a query e já verifica se esta foi executada com sucesso;
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Procedure foi executada com sucesso") </script>';

				//Verifica quantas linhas vieram de resultado nessa procedure;
				if ($sqlQuery->rowCount() > 0) {

					//Se for, maior que zero, concentra este resultado único nesta variável;
					$result = $sqlQuery->fetch();

					//Retorna como resultado deste bloco;
					return $result['Retorno'];
				}
				else {

					//Retorna como resultado deste bloco;
					return "Nenhuma linha foi alterada nessa query";
				}
			}
			//Caso não aconteça a execução da procedure;
			else {

				//Manda para o console o resultado da procedure;
				echo "Ocorreu um problema na execução desta operação, verifique sua conexão ou estado do servidor";
				echo '<script> console.log(' . $sqlQuery->errorInfo() . ') </script>';									
			}
		}

		//Procedimento para consulta de cargos no sistema;
		public function consultarCargos() {

			//Variável que irá receber os resultados desta query;
			$resultQuery = array();

			//Instancia esta conexão para esta variável;
			$conexao = getConnection();

			//Cria-se a string que contém a query de execução da procedure;
			$sqlProcedure = "CALL uspConsultarUsuarioCargo()";

			//Prepara a query para execução nesta variável;
			$sqlQuery = $conexao->prepare($sqlProcedure);

			//Executa e verifica a query executada...
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Procedure foi executada com sucesso: uspConsultarUsuarioCargo") </script>';
				//Atribui a quantidade de rows resultadas desta query;
				$numRowsQuery = $sqlQuery->rowCount();

				//Se o resultado desta for maior que zero, significa que existem registros cadastrados...
				if ( $numRowsQuery > 0 ) {

					//Manda para o console o resultado desta atividade;
					echo '<script> console.log("Procedure retornou ' . $numRowsQuery . ': uspConsultarUsuarioCargo") </script>';
					//Atribui o resultado para este vetor;
					$resultQuery = $sqlQuery->fetchAll();
					//Retorna este resultado com a query para o software;
					return $resultQuery;
				}
				//Se o resultado for igual a zero...
				else {

					//Manda para o console o resultado da procedure;				
					echo '<script> console.log("Procedure retornou nenhum registro: uspConsultarUsuarioCargo") </script>';
					//Retorna uma query vazia para validação no software;
					return $resultQuery;
				}
			}
			else {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Houve um problema para executar a procedure: uspConsultarUsuarioCargo") </script>';
			}

			return "Teste do consultar cargos";
		}
	}
?>