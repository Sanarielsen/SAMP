<?php

	class ClienteCorrespondenciaNegocios {

		public function inserirClienteCorrespondencia(ClienteCorrespondencia $clienteCorrespondencia) {

			//Inicia-se a conexão com o banco de dados;
			$conexao = getConnection();

			//Cria-se a string para query parametrizada;
			$sqlProcedure = "CALL uspInserirClienteCorrespondenciaLocalizacao( :cliente , :cep , :lougradouro , :bairro , :cidade , :estado , :caixaPostal , :telefone , :contato );";	

			//Inicia o tratamento da query;
			$sqlQuery = $conexao->prepare($sqlProcedure);

			//Atribuí os parametros da query;
			$sqlQuery->bindValue(":cliente", $clienteCorrespondencia->getCliente());
			$sqlQuery->bindValue(":cep", $clienteCorrespondencia->getCEP());
			$sqlQuery->bindValue(":lougradouro", $clienteCorrespondencia->getLougradouro());
			$sqlQuery->bindValue(":bairro", $clienteCorrespondencia->getBairro());
			$sqlQuery->bindValue(":cidade", $clienteCorrespondencia->getCidade());
			$sqlQuery->bindValue(":estado", $clienteCorrespondencia->getEstado());
			$sqlQuery->bindValue(":caixaPostal", $clienteCorrespondencia->getCaixaPostal());
			$sqlQuery->bindValue(":telefone", $clienteCorrespondencia->getTelefone());
			$sqlQuery->bindValue(":contato", $clienteCorrespondencia->getContato());

			//Executa a query e já verifica se esta foi executada com sucesso;
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Procedure foi executada com sucesso: uspInserirClienteCorrespondenciaLocalizacao") </script>';

				//Verifica quantas linhas vieram de resultado nessa procedure;
				if ($sqlQuery->rowCount() > 0) {

					//Se for, maior que zero, concentra este resultado único nesta variável;
					$result = $sqlQuery->fetch();

					//Retorna como resultado deste bloco;
					return trim($result['Retorno']);
				}
				//Caso nenhuma linha for alterada com esta query...
				else {

					//Retorna como resultado deste bloco;
					return "Nenhuma linha foi alterada nessa query: uspInserirClienteCorrespondenciaLocalizacao";
				}
			}
			//Caso não aconteça a execução da procedure;
			else {

				//Manda para o console o resultado da procedure;
				echo "Ocorreu um problema na execução desta operação, verifique sua conexão ou estado do servidor: uspInserirClienteCorrespondenciaLocalizacao";
				echo '<script> console.log(' . $sqlQuery->errorInfo()[0] . ') </script>';	

			}

		}

		public function alterarClienteCorrespondencia(ClienteCorrespondencia $clienteCorrespondencia) {

			//Inicia-se a conexão com o banco de dados;
			$conexao = getConnection();

			//Cria-se a string para query parametrizada;
			$sqlProcedure = "CALL uspAtualizarClienteCorrespondenciaLocalizacao( :correspondencia , :cliente , :cep , :lougradouro , :bairro , :cidade , :estado , :caixaPostal , :telefone , :contato );";	

			//Inicia o tratamento da query;
			$sqlQuery = $conexao->prepare($sqlProcedure);

			//Atribuí os parametros da query;
			$sqlQuery->bindValue(":correspondencia", $clienteCorrespondencia->getIdentificador());
			$sqlQuery->bindValue(":cliente", $clienteCorrespondencia->getCliente());
			$sqlQuery->bindValue(":cep", $clienteCorrespondencia->getCEP());
			$sqlQuery->bindValue(":lougradouro", $clienteCorrespondencia->getLougradouro());
			$sqlQuery->bindValue(":bairro", $clienteCorrespondencia->getBairro());
			$sqlQuery->bindValue(":cidade", $clienteCorrespondencia->getCidade());
			$sqlQuery->bindValue(":estado", $clienteCorrespondencia->getEstado());
			$sqlQuery->bindValue(":caixaPostal", $clienteCorrespondencia->getCaixaPostal());
			$sqlQuery->bindValue(":telefone", $clienteCorrespondencia->getTelefone());
			$sqlQuery->bindValue(":contato", $clienteCorrespondencia->getContato());

			//Executa a query e já verifica se esta foi executada com sucesso;
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Procedure foi executada com sucesso: uspInserirClienteCorrespondenciaLocalizacao") </script>';

				//Verifica quantas linhas vieram de resultado nessa procedure;
				if ($sqlQuery->rowCount() > 0) {

					//Se for, maior que zero, concentra este resultado único nesta variável;
					$result = $sqlQuery->fetch();

					//Retorna como resultado deste bloco;
					return trim($result['Retorno']);
				}
				//Caso nenhuma linha for alterada com esta query...
				else {

					//Retorna como resultado deste bloco;
					return "Nenhuma linha foi alterada nessa query: uspInserirClienteCorrespondenciaLocalizacao";
				}
			}
			//Caso não aconteça a execução da procedure;
			else {

				//Manda para o console o resultado da procedure;
				echo "Ocorreu um problema na execução desta operação, verifique sua conexão ou estado do servidor: uspInserirClienteCorrespondenciaLocalizacao";
				echo '<script> console.log(' . $sqlQuery->errorInfo()[2] . ') </script>';	

			}
		}
	}
?>