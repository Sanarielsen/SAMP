<?php

	//Criação da classe de usuário negócios;
	class UsuarioNegocios {

		//Método para criação dos usuários do sistema;
		public function inserirUsuario(Usuario $usuario) {

			echo '<script> console.log("Executou o método de negocios de inserção de usuário"); </script>';

			//Instancia esta conexão para esta variável;
			$conexao = getConnection();

			//Cria-se a string que contém a query de execução da procedure;
			$sqlProcedure = "CALL uspInserirUsuario(:usuarioCargo, :nome, :email, :senha, :pergunta, :resposta);";

			//Cria-se a string carregada com parametros para execução da procedure;
			$sqlQuery = $conexao->prepare($sqlProcedure);
			//Atribui-se os parametros das variáveis da query parametrizada;
			$sqlQuery->bindValue(":usuarioCargo", $usuario->getCargo());
			$sqlQuery->bindValue(":nome", $usuario->getNome());
			$sqlQuery->bindValue(":email", $usuario->getEmail());
			$sqlQuery->bindValue(":senha", $usuario->getSenha());
			$sqlQuery->bindValue(":pergunta", $usuario->getPergunta());
			$sqlQuery->bindValue(":resposta", $usuario->getResposta());

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
				//Caso nenhuma linha for alterada com esta query...
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
		//Método para alteração dos dados dos usuários do sistema;

		//Método para consulta dos dados dos usuários do sistema;

		//Método para consulta dos dados dos usuários do sistema com o cargo respectivo;
		public function consultarUsuariosComCargo() {

			//Variável que irá receber os resultados desta query;
			$resultQuery = array();

			//Instancia esta conexão para esta variável;
			$conexao = getConnection();

			//Cria-se a string que contém a query de execução da procedure;
			$sqlProcedure = "CALL uspConsultarUsuariosInfo();";

			//Prepara a query para execução nesta variável;
			$sqlQuery = $conexao->prepare($sqlProcedure);

			//Executa e verifica a query executada...
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Procedure foi executada com sucesso: uspConsultarUsuariosInfo") </script>';
				//Atribui a quantidade de rows resultadas desta query;
				$numRowsQuery = $sqlQuery->rowCount();

				//Se o resultado desta for maior que zero, significa que existem registros cadastrados...
				if ( $numRowsQuery > 0 ) {

					//Manda para o console o resultado desta atividade;
					echo '<script> console.log("Procedure retornou ' . $numRowsQuery . ': uspConsultarUsuariosInfo") </script>';
					//Atribui o resultado para este vetor;
					$resultQuery = $sqlQuery->fetchAll();
					//Retorna este resultado com a query para o software;
					return $resultQuery;
				}
				//Se o resultado for igual a zero...
				else {

					//Manda para o console o resultado da procedure;				
					echo '<script> console.log("Procedure retornou nenhum registro: uspConsultarUsuariosInfo") </script>';
					//Retorna uma query vazia para validação no software;
					return $resultQuery;
				}
			}
			else {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Houve um problema para executar a procedure: uspConsultarUsuariosInfo") </script>';
			}			
		}


		//Método para exclusão dos dados dos usuários do sistema;
		public function excluiUsuario($identificador) {

			echo '<script> console.log("Executou o método de negocios de exclusão de usuário"); </script>';

			//Instancia esta conexão para esta variável;
			$conexao = getConnection();

			//Cria-se a string que contém a query de execução da procedure;
			$sqlProcedure = "CALL uspDeletarUsuario(?);";

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
	}
?>