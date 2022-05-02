<?php

	//Cliente 
	class ClienteLocalizacaoNegocios {

		//Procedimento para inserir um novo endereco de localização do cliente;
		public function inserirClienteLocalizacao(ClienteLocalizacao $clienteLocalizacao) {

			//Inicia-se uma conexão com o banco de dados;
			$conexao = getConnection();

			//Cria-se a string contendo a query parametrizada a ser executada;
			$sqlProcedure = "CALL uspInserirClienteLocalizacao( :cliente , :cep , :lougradouro, :bairro, :cidade, :estado, :caixaPostal, :telefone, :email, :site, :contato );";

			//Inicia o tratamento deste query;
			$sqlQuery = $conexao->prepare($sqlProcedure);	

			//Atribuí-se os valores desta query parametrizada;
			$sqlQuery->bindValue(":cliente", $clienteLocalizacao->getCliente(), PDO::PARAM_INT);
			$sqlQuery->bindValue(":cep", $clienteLocalizacao->getCEP());
			$sqlQuery->bindValue(":lougradouro", $clienteLocalizacao->getLougradouro());
			$sqlQuery->bindValue(":bairro", $clienteLocalizacao->getBairro());
			$sqlQuery->bindValue(":cidade", $clienteLocalizacao->getCidade());
			$sqlQuery->bindValue(":estado", $clienteLocalizacao->getEstado());
			$sqlQuery->bindValue(":caixaPostal", $clienteLocalizacao->getCaixaPostal());
			$sqlQuery->bindValue(":telefone", $clienteLocalizacao->getTelefone());
			$sqlQuery->bindValue(":email", $clienteLocalizacao->getEmail());
			$sqlQuery->bindValue(":site", $clienteLocalizacao->getSite());
			$sqlQuery->bindValue(":contato", $clienteLocalizacao->getContato());

			//Executa a query e já verifica se esta foi executada com sucesso;
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Procedure foi executada com sucesso: uspInserirClienteLocalizacao") </script>';

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
					return "Nenhuma linha foi alterada nessa query: uspInserirClienteLocalizacao";
				}
			}
			//Caso não aconteça a execução da procedure;
			else {

				//Manda para o console o resultado da procedure;
				echo "Ocorreu um problema na execução desta operação, verifique sua conexão ou estado do servidor: uspInserirClienteLocalizacao";
				echo '<script> console.log(' . $sqlQuery->errorInfo()[0] . ') </script>';	

			}
		}

		//Procedimento para alterar o endereco de localização do cliente;
		public function alterarClienteLocalizacao(ClienteLocalizacao $clienteLocalizacao) {

			//Inicia-se uma conexão com o banco de dados;
			$conexao = getConnection();

			//Cria-se a string contendo a query parametrizada a ser executada;
			$sqlProcedure = "CALL uspAtualizarClienteLocalizacao( :localizacao, :cliente, :cep, :lougradouro , :bairro, :cidade, :estado, :caixaPostal, :telefone, :email, :site, :contato);";

			//Inicia o tratamento deste query;
			$sqlQuery = $conexao->prepare($sqlProcedure);			

			//Atribuí-se os valores desta query parametrizada;
			$sqlQuery->bindValue(":localizacao", $clienteLocalizacao->getIdentificador());
			$sqlQuery->bindValue(":cliente", $clienteLocalizacao->getCliente());
			$sqlQuery->bindValue(":cep", $clienteLocalizacao->getCEP());
			$sqlQuery->bindValue(":lougradouro", $clienteLocalizacao->getLougradouro());
			$sqlQuery->bindValue(":bairro", $clienteLocalizacao->getBairro());
			$sqlQuery->bindValue(":cidade", $clienteLocalizacao->getCidade());
			$sqlQuery->bindValue(":estado", $clienteLocalizacao->getEstado());
			$sqlQuery->bindValue(":caixaPostal", $clienteLocalizacao->getCaixaPostal());
			$sqlQuery->bindValue(":telefone", $clienteLocalizacao->getTelefone());
			$sqlQuery->bindValue(":email", $clienteLocalizacao->getEmail());
			$sqlQuery->bindValue(":site", $clienteLocalizacao->getSite());
			$sqlQuery->bindValue(":contato", $clienteLocalizacao->getContato());

			//Executa a query e já verifica se esta foi executada com sucesso;
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Procedure foi executada com sucesso: uspAtualizarClienteLocalizacao") </script>';

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
					return "Nenhuma linha foi alterada nessa query: uspAtualizarClienteLocalizacao";
				}
			}
			//Caso não aconteça a execução da procedure;
			else {

				//Manda para o console o resultado da procedure;
				echo "Ocorreu um problema na execução desta operação, verifique sua conexão ou estado do servidor: uspAtualizarClienteLocalizacao";
				echo '<script> console.log(' . $sqlQuery->errorInfo()[2] . ') </script>';	

			}
		}		
	}	
?>