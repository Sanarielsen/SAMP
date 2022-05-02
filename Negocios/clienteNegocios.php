<?php

	class ClienteNegocios {

		//Procedimento para inserir um novo cliente no sistema;
		public function inserirCliente(Cliente $cliente) {

			//Instancia esta conexão para esta variável;
			$conexao = getConnection();

			//Cria-se a string que contém a query de execução da procedure;
			$sqlProcedure = "CALL uspInserirCliente(:razaoSocial, :tipoPessoa, :protocolo, :fantasiaNome, :dataFundacao);";

			//Prepara a query parametrizada;
			$sqlQuery = $conexao->prepare($sqlProcedure);

			//Atribui-se os parametros da query;
			$sqlQuery->bindValue(":razaoSocial",$cliente->getRazaoSocial());
			$sqlQuery->bindValue(":tipoPessoa",$cliente->getTipoPessoa());
			$sqlQuery->bindValue(":protocolo",$cliente->getProtocolo());
			$sqlQuery->bindValue(":fantasiaNome",$cliente->getNomeFantasia());
			$sqlQuery->bindValue(":dataFundacao",$cliente->getDataFundacao());

			//Executa e verifica a query executada...
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Procedure foi executada com sucesso: uspInserirUsuario") </script>';

				//Se o resultado desta for maior que zero, significa que existem registros cadastrados...
				if ( $sqlQuery->rowCount() > 0 ) {

					//Manda para o console o resultado desta atividade;
					echo '<script> console.log("Procedure retornou ' . $sqlQuery->rowCount() . ': uspInserirUsuario") </script>';
					//Atribui o resultado para este vetor;
					$resultQuery = $sqlQuery->fetch();
					//Retorna este resultado com a query para o software;
					return $resultQuery['Retorno'];

				}
				//Se o resultado for igual a zero...
				else {

					//Manda para o console o resultado da procedure;				
					echo '<script> console.log("Procedure retornou nenhum registro: uspInserirUsuario") </script>';
					//Retorna uma query vazia para validação no software;
					return 0;
				}
			}
			else {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Houve um problema para executar a procedure: uspInserirUsuario") </script>';
				echo '<script> console.log(' . $sqlQuery->errorInfo()[2] . ') </script>';	
			}	
		}

		//Procedimento para alterar um cliente do sistema;
		public function alterarCliente(Cliente $cliente) {

			//Instancia esta conexão para esta variável;
			$conexao = getConnection();

			//Cria-se a string que contém a query de execução da procedure;
			$sqlProcedure = "CALL uspAtualizarCliente(:identificador, :razaoSocial, :tipoPessoa, :CPFCNPJ, :fantasiaNome, :dataDundacao);";

			//Prepara a query parametrizada;
			$sqlQuery = $conexao->prepare($sqlProcedure);

			//Atribui-se os parametros da query;
			$sqlQuery->bindValue(":identificador",$cliente->getIdentificador());
			$sqlQuery->bindValue(":razaoSocial",$cliente->getRazaoSocial());
			$sqlQuery->bindValue(":tipoPessoa",$cliente->getTipoPessoa());
			$sqlQuery->bindValue(":CPFCNPJ",$cliente->getProtocolo());
			$sqlQuery->bindValue(":fantasiaNome",$cliente->getNomeFantasia());
			$sqlQuery->bindValue(":dataDundacao",$cliente->getDataFundacao());

			//Executa e verifica a query executada...
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Procedure foi executada com sucesso: uspAtualizarCliente") </script>';

				//Se o resultado desta for maior que zero, significa que existem registros cadastrados...
				if ( $sqlQuery->rowCount() > 0 ) {

					//Manda para o console o resultado desta atividade;
					echo '<script> console.log("Procedure retornou ' . $sqlQuery->rowCount() . ': uspAtualizarCliente") </script>';
					//Atribui o resultado para este vetor;
					$resultQuery = $sqlQuery->fetch();
					//Retorna este resultado com a query para o software;
					return $resultQuery['Retorno'];

				}
				//Se o resultado for igual a zero...
				else {

					//Manda para o console o resultado da procedure;				
					echo '<script> console.log("Procedure retornou nenhum registro: uspAtualizarCliente") </script>';					
					//Retorna uma query vazia para validação no software;
					return $resultQuery;
				}
			}
			else {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Houve um problema para executar a procedure: uspAtualizarCliente") </script>';
				echo '<script> console.log(' . $sqlQuery->errorInfo()[0] . ') </script>';
			}	
		}

		//Procedimento para consulta de clientes com o cargo respectivo no sistema;
		public function consultarClientePeloCriterio($criterio, $busca) {

			//Instancia esta conexão para esta variável;
			$conexao = getConnection();

			//Cria-se a string que contém a query de execução da procedure;
			$sqlProcedure = "CALL uspConsultarClientesPeloCriterio(:criterio, :busca);";

			//Prepara a query para execução nesta variável;
			$sqlQuery = $conexao->prepare($sqlProcedure);

			//Atribui-se os parametros para esta query;
			$sqlQuery->bindParam(":criterio", $criterio);
			$sqlQuery->bindParam(":busca", $busca);

			//Executa e verifica a query executada...
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Procedure foi executada com sucesso: consultarClientePeloCriterio") </script>';
				//Atribui a quantidade de rows resultadas desta query;
				$numRowsQuery = $sqlQuery->rowCount();
				//Variável que irá receber os resultados desta query;
				$resultQuery = array();

				//Se o resultado desta for maior que zero, significa que existem registros cadastrados...
				if ( $numRowsQuery > 0 ) {

					//Manda para o console o resultado desta atividade;
					echo '<script> console.log("Procedure retornou ' . $numRowsQuery . ': consultarClientePeloCriterio") </script>';
					//Atribui o resultado para este vetor;
					$resultQuery = $sqlQuery->fetchAll();
					//Retorna este resultado com a query para o software;
					return $resultQuery;
				}
				//Se o resultado for igual a zero...
				else {

					//Manda para o console o resultado da procedure;				
					echo '<script> console.log("Procedure retornou nenhum registro: consultarClientePeloCriterio") </script>';
					//Retorna uma query vazia para validação no software;
					return $resultQuery;
				}
			}
			else {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Houve um problema para executar a procedure: consultarClientePeloCriterio") </script>';
			}			
		}
		//Procedimento para consulta de clientes para uma comboBox com as empresas cadastradas no sistema;
		public function consultarClientesCadastrados() {

			//Inicia-se uma conexão com o banco de dados;
			$conexao = getConnection();

			//Cria-se a string que possui a query a ser executada;
			$sqlProcedure = "CALL uspConsultarClientesCadastrados();";

			//Inicia-se o preparamento da query;
			$sqlQuery = $conexao->prepare($sqlProcedure);

			//Executa a procedure e inicia o processo de validação de dados;
			if ( $sqlQuery->execute() ) {

				//Verifica-se quantas linhas vieram desta query.
				if ( $sqlQuery->rowCount() > 0 ) {

					//Manda para o console o resultado desta atividade;
					echo '<script> console.log("Procedure retornou ' . $sqlQuery->rowCount() . ': consultarClientePeloCriterio") </script>';
					//Atribui o resultado para este vetor;
					$resultQuery = $sqlQuery->fetchAll();
					//Retorna este resultado com a query para o software;
					return $resultQuery;
				}
			}
			else {

				echo '<script> console.log(' . $sqlQuery->errorInfo() . ' - Procedure: uspConsultarClientesCadastrados() ) </script>';	
				return $resultQuery = array();
			}
		}
		//Procedimento para exclusão do cliente do sistema;
		public function excluirCliente($identificador) {

			//Instancia a conexão do banco de dados;
			$conexao = getConnection();

			//Cria-se a string que contém a query parametrizada;
			$sqlProcedure = "CALL uspDeletarCliente(?);";

			//Prepara a query para execução nesta variável;
			$sqlQuery = $conexao->prepare($sqlProcedure);

			//Atribuí-se os parametros para esta query;
			$sqlQuery->bindValue(1, $identificador);

			//Executa e verifica a query executada...
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Procedure foi executada com sucesso: uspDeletarCliente") </script>';

				//Se o resultado desta for maior que zero, significa que existem registros cadastrados...
				if ( $sqlQuery->rowCount() > 0 ) {

					//Manda para o console o resultado desta atividade;
					echo '<script> console.log("Procedure retornou ' . $sqlQuery->rowCount() . ': uspDeletarCliente") </script>';
					//Atribui o resultado para este vetor;
					$resultQuery = $sqlQuery->fetch();
					//Retorna este resultado com a query para o software;
					return $resultQuery['Retorno'];

				}
				//Se o resultado for igual a zero...
				else {

					//Manda para o console o resultado da procedure;				
					echo '<script> console.log("Procedure retornou nenhum registro: uspDeletarCliente") </script>';				
					//Retorna uma query vazia para validação no software;
					return 0;
				}
			}
			else {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Houve um problema para executar a procedure: uspDeletarCliente") </script>';
					
			}	
		}

	}

?>