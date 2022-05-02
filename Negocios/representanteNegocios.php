<?php

	class RepresentanteNegocios {

		//Procedimento para inserção de um novo representante;
		public function inserirRepresentante(Representante $representante) {

			//Inicia-se uma conexão com o banco de dados;
			$conexao = getConnection();

			//Cria a string que contém a string parametrizada;
			$sqlProcedure = "CALL uspInserirClienteRepresentante( :cliente , :nome , :nacionalidade , :RG , :CPF , :profissao , :cargo );";

			//Inicia o tratamento da string de query;
			$sqlQuery = $conexao->prepare($sqlProcedure);

			//Atribuí os critérios para a query;
			$sqlQuery->bindValue(":cliente", $representante->getCliente());
			$sqlQuery->bindValue(":nome", $representante->getNome());
			$sqlQuery->bindValue(":nacionalidade", $representante->getNacionalidade());
			$sqlQuery->bindValue(":RG", $representante->getRG());
			$sqlQuery->bindValue(":CPF", $representante->getCPF());
			$sqlQuery->bindValue(":profissao", $representante->getProfissao());
			$sqlQuery->bindValue(":cargo", $representante->getCargo());

			//Executa e verifica a query executada...
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Procedure foi executada com sucesso: uspInserirClienteRepresentante") </script>';

				//Se o resultado desta for maior que zero, significa que existem registros cadastrados...
				if ( $sqlQuery->rowCount() > 0 ) {

					//Manda para o console o resultado desta atividade;
					echo '<script> console.log("Procedure retornou ' . $sqlQuery->rowCount() . ': uspInserirClienteRepresentante") </script>';
					//Atribui o resultado para este vetor;
					$resultQuery = $sqlQuery->fetch();
					//Retorna este resultado com a query para o software;
					return $resultQuery['Retorno'];
				}
				//Se o resultado for igual a zero...
				else {

					//Manda para o console o resultado da procedure;				
					echo '<script> console.log("Procedure retornou nenhum registro: uspInserirClienteRepresentante") </script>';
					//Retorna uma query vazia para validação no software;
					return "Não resultou em nenhum registro";
				}
			}
			else {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Houve um problema para executar a procedure: uspInserirClienteRepresentante") </script>';
			}
		}

		//Procedimento para alterar um representante já cadastrado;
		public function alterarRepresentante(Representante $representante) {

			//Inicia-se uma conexão com o banco de dados;
			$conexao = getConnection();

			//Cria a string que contém a string parametrizada;
			$sqlProcedure = "CALL uspAtualizarClienteRepresentante( :identificador , :cliente , :nome , :nacionalidade , :RG , :CPF , :profissao , :cargo );";

			//Inicia o tratamento da string de query;
			$sqlQuery = $conexao->prepare($sqlProcedure);

			//Atribuí os critérios para a query;
			$sqlQuery->bindValue(":identificador", $representante->getIdentificador());
			$sqlQuery->bindValue(":cliente", $representante->getCliente());
			$sqlQuery->bindValue(":nome", $representante->getNome());
			$sqlQuery->bindValue(":nacionalidade", $representante->getNacionalidade());
			$sqlQuery->bindValue(":RG", $representante->getRG());
			$sqlQuery->bindValue(":CPF", $representante->getCPF());
			$sqlQuery->bindValue(":profissao", $representante->getProfissao());
			$sqlQuery->bindValue(":cargo", $representante->getCargo());

			//Executa e verifica a query executada...
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Procedure foi executada com sucesso: uspAtualizarClienteRepresentante") </script>';

				//Se o resultado desta for maior que zero, significa que existem registros cadastrados...
				if ( $sqlQuery->rowCount() > 0 ) {

					//Manda para o console o resultado desta atividade;
					echo '<script> console.log("Procedure retornou ' . $sqlQuery->rowCount() . ': uspAtualizarClienteRepresentante") </script>';
					//Atribui o resultado para este vetor;
					$resultQuery = $sqlQuery->fetch();
					//Retorna este resultado com a query para o software;
					return $resultQuery['Retorno'];
				}
				//Se o resultado for igual a zero...
				else {

					//Manda para o console o resultado da procedure;				
					echo '<script> console.log("Procedure retornou nenhum registro: uspAtualizarClienteRepresentante") </script>';
					//Retorna uma query vazia para validação no software;
					return $resultQuery;
				}
			}
			else {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Houve um problema para executar a procedure: uspAtualizarClienteRepresentante") </script>';
				echo '<script> console.log(' . $sqlQuery->errorInfo()[2] . ') </script>';	
			}
		}

		//Procedimento para consultar os representantes;
		public function consultarRepresentante() {

			
		}

		//Procedimento para consultar os representantes pelo critério;
		public function consultarRepresentantesPeloCriterio($identificador) {

			//Inicia-se uma conexão com o banco de dados;
			$conexao = getConnection();

			//Cria a string que contém a string parametrizada;
			$sqlProcedure = "CALL uspConsultarRepresentantesPeloCriterio( :identify );";

			//Inicia o tratamento da string de query;
			$sqlQuery = $conexao->prepare($sqlProcedure);

			//Atribuí os critérios para a query;
			$sqlQuery->bindParam( ":identify", $identificador );			

			//Executa e verifica a query executada...
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Procedure foi executada com sucesso: uspConsultarRepresentantesPeloCriterio") </script>';
				//Variável que irá receber os resultados desta query;
				$resultQuery = array();

				//Se o resultado desta for maior que zero, significa que existem registros cadastrados...
				if ( $sqlQuery->rowCount() > 0 ) {

					//Manda para o console o resultado desta atividade;
					echo '<script> console.log("Procedure retornou ' . $sqlQuery->rowCount() . ': uspConsultarRepresentantesPeloCriterio") </script>';
					//Atribui o resultado para este vetor;
					$resultQuery = $sqlQuery->fetchAll();
					//Retorna este resultado com a query para o software;
					return $resultQuery;
				}
				//Se o resultado for igual a zero...
				else {

					//Manda para o console o resultado da procedure;				
					echo '<script> console.log("Procedure retornou nenhum registro: uspConsultarRepresentantePeloCriterio") </script>';
					//Retorna uma query vazia para validação no software;
					return $resultQuery;
				}
			}
			else {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Houve um problema para executar a procedure: uspConsultarRepresentantePeloCriterio") </script>';
			}	
		}


		//Procedimento para excluir um representante;
		public function excluirRepresentante($identificador) {

			//Inicia-se uma conexão com o banco de dados;
			$conexao = getConnection();

			//Cria a string que contém a string parametrizada;
			$sqlProcedure = "CALL uspDeletarClienteRepresentante( :identify );";

			//Inicia o tratamento da string de query;
			$sqlQuery = $conexao->prepare($sqlProcedure);

			//Atribuí os critérios para a query;
			$sqlQuery->bindParam( ":identify", $identificador );

			//Executa e verifica a query executada...
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Procedure foi executada com sucesso: uspDeletarClienteRepresentante") </script>';

				//Se o resultado desta for maior que zero, significa que existem registros cadastrados...
				if ( $sqlQuery->rowCount() > 0 ) {

					//Manda para o console o resultado desta atividade;
					echo '<script> console.log("Procedure retornou ' . $sqlQuery->rowCount() . ': uspDeletarClienteRepresentante") </script>';
					//Atribui o resultado para este vetor;
					$resultQuery = $sqlQuery->fetch();
					//Retorna este resultado com a query para o software;
					return $resultQuery['Retorno'];
				}
				//Se o resultado for igual a zero...
				else {

					//Manda para o console o resultado da procedure;				
					echo '<script> console.log("Procedure retornou nenhum registro: uspDeletarClienteRepresentante") </script>';
					//Retorna uma query vazia para validação no software;
					return "Não resultou em nenhum registro";
				}
			}
			else {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("Houve um problema para executar a procedure: uspDeletarClienteRepresentante") </script>';
				echo '<script> console.log(' . $sqlQuery->errorInfo()[2] . ') </script>';
			}
		}
	}
?>
