<?php
	
	//Classe contendo os procedimentos dos pedidos;
	class PedidoNegocios {

		//Inserir;
		//Procedimento para inserir um novo pedido;
		public function inserirPedido(Pedido $pedido) {

			//Inicia uma conexão com o banco de dados;
			$conexao = getConnection();

			//Cria-se a variável que contém a procedure a ser executada;
			$procedure = "CALL uspInserirPedido( :cliente, :servico, :observacao, :dataCriacao);";

			//Inicia-se a preparação para a query com parâmetros;			
			$sqlQuery = $conexao->prepare($procedure);

			//Atribui-se os parametros das variáveis da query parametrizada;
			$sqlQuery->bindValue(':cliente', $pedido->getIdentificadorCliente());
			$sqlQuery->bindValue(':servico', $pedido->getDescricao());
			$sqlQuery->bindValue(':observacao', $pedido->getObservacao());
			$sqlQuery->bindValue(':dataCriacao', $pedido->getDataCriacao());	

			//Executa a query e já verifica se esta foi executada com sucesso;
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("PedidoNegocios/inserirPedido(OK)") </script>';

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
				echo '<script> console.log("PedidoNegocios/inserirPedido(ERROR)") </script>';
				//Mensagem para debug do erro;
				//echo '<script> console.log(' . $sqlQuery->errorInfo() . ') </script>';									
				//Mensagem de retorno para a interface no caso de erro;
				return "Execute: Erro ao executar o procedimento";
				
			}		
		}
		//Alterar;
		//Procedimento para alterar um pedido já existente;
		public function alterarPedido(Pedido $pedido) {

			//Inicia uma conexão com o banco de dados;
			$conexao = getConnection();

			//Cria-se a variável que contém a procedure a ser executada;
			$procedure = "CALL uspAtualizarPedido( :pedido, :cliente, :servico, :observacao, :dataCriacao);";

			//Inicia-se a preparação para a query com parâmetros;			
			$sqlQuery = $conexao->prepare($procedure);

			//Atribui-se os parametros das variáveis da query parametrizada;
			$sqlQuery->bindValue(':pedido', $pedido->getIdentificador());
			$sqlQuery->bindValue(':cliente', $pedido->getIdentificadorCliente());
			$sqlQuery->bindValue(':servico', $pedido->getDescricao());
			$sqlQuery->bindValue(':observacao', $pedido->getObservacao());
			$sqlQuery->bindValue(':dataCriacao', $pedido->getDataCriacao());	

			//Executa a query e já verifica se esta foi executada com sucesso;
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("PedidoNegocios/alterarPedido(OK)") </script>';

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
				echo '<script> console.log("PedidoNegocios/alterarPedido(ERROR)") </script>';
				//Mensagem para debug do erro;
				//echo '<script> console.log(' . $sqlQuery->errorInfo() . ') </script>';									
				//Mensagem de retorno para a interface no caso de erro;
				return "Execute: Erro ao executar o procedimento";
				
			}	
		}
		//Consultar;
		//Procedimento para consultar todos os pedidos cadastrados;
		public function consultarPedidos() {

			//Inicia uma conexão com o banco de dados;
			$conexao = getConnection();

			//Cria-se a variável que contém a procedure a ser executada;
			$procedure = "CALL uspConsultarPedidos();";

			//Inicia-se a configuração para execução dessa query convencional;
			$sqlQuery = $conexao->prepare($procedure);

			//Executa a query e já verifica se esta foi executada com sucesso;
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("PedidoNegocios/consultarPedidos(OK)") </script>';

				//Verifica quantas linhas vieram de resultado nessa procedure;
				if ($sqlQuery->rowCount() > 0) {

					//Se for, maior que zero, concentra este resultado neste retorno do procedimento;
					return $sqlQuery->fetchAll();					
				}
				//Caso nenhuma linha for retornada...
				else {

					//Retorna como resultado deste bloco;
					return array("Nenhuma linha foi retornada desta query");
				}
			}
			else {

				//Manda para o console o resultado da procedure;
				echo '<script> console.log("PedidoNegocios/consultarPedidos(ERROR)") </script>';
				//Mensagem para debug do erro;
				//echo '<script> console.log(' . $sqlQuery->errorInfo() . ') </script>';									
				//Mensagem de retorno para a interface no caso de erro;
				return "Execute: Erro ao executar o procedimento";								
			}
		}
		//Consultar com id;
		//Procedimento para consultar os pedidos pelo identificador;
		public function consultarPedidoPeloID($identificador) {

			//Inicia uma conexão com o banco de dados;
			$conexao = getConnection();

			//Cria-se a variável que contém a procedure a ser executada;
			$procedure = "CALL uspConsultarPedidoPeloID(:pedido);";

			//Inicia-se a preparação para a query com parâmetros;			
			$sqlQuery = $conexao->prepare($procedure);

			//Atribui-se os parametros das variáveis da query parametrizada;
			$sqlQuery->bindValue(':pedido', $pedido->getIdentificador());

			//Executa a query e já verifica se esta foi executada com sucesso;
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("PedidoNegocios/consultarPedidoPeloID(OK)") </script>';

				//Verifica quantas linhas vieram de resultado nessa procedure;
				if ($sqlQuery->rowCount() > 0) {

					//Se for, maior que zero, concentra este resultado neste retorno do procedimento;
					return $sqlQuery->fetchAll();					
				}
				//Caso nenhuma linha for retornada...
				else {

					//Retorna como resultado deste bloco;
					return array("Nenhuma linha foi retornada desta query");
				}
			}
			else {

				//Manda para o console o resultado da procedure;
				echo '<script> console.log("PedidoNegocios/consultarPedidoPeloID(ERROR)") </script>';
				//Mensagem para debug do erro;
				//echo '<script> console.log(' . $sqlQuery->errorInfo() . ') </script>';									
				//Mensagem de retorno para a interface no caso de erro;
				return "Execute: Erro ao executar o procedimento";								
			}
		}	
		//Consultar com critério e um parametro dependente;
		//Procedimento para consultar os pedidos pelo critério informado;
		public function consultarPedidoPeloCriterio($criterio, $response) {

			//Inicia uma conexão com o banco de dados;
			$conexao = getConnection();

			//Cria-se a variável que contém a procedure a ser executada;
			$procedure = "CALL uspConsultarPedidosPeloCriterio(:criterio, :response);";

			//Inicia-se a preparação para a query com parâmetros;			
			$sqlQuery = $conexao->prepare($procedure);

			//Atribui-se os parametros das variáveis da query parametrizada;
			$sqlQuery->bindValue(':criterio', $criterio);
			$sqlQuery->bindValue(':response', $response);

			//Executa a query e já verifica se esta foi executada com sucesso;
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("PedidoNegocios/consultarPedidoPeloCriterio(OK)") </script>';

				//Verifica quantas linhas vieram de resultado nessa procedure;
				if ($sqlQuery->rowCount() > 0) {

					//Se for, maior que zero, concentra este resultado neste retorno do procedimento;
					return $sqlQuery->fetchAll();					
				}
				//Caso nenhuma linha for retornada...
				else {

					//Retorna como resultado deste bloco;
					return null;
				}
			}			
			else {

				//Manda para o console o resultado da procedure;
				echo '<script> console.log("PedidoNegocios/consultarPedidoPeloCriterio(ERROR)") </script>';
				//Mensagem para debug do erro;
				//echo '<script> console.log(' . $sqlQuery->errorInfo() . ') </script>';									
				//Mensagem de retorno para a interface no caso de erro;
				return "Execute: Erro ao executar o procedimento";
				
			}
		}
		//Excluir;
		//Procedimento para excluir um pedido pelo identificador;
		public function excluirPedido($identificador) {

			//Inicia uma conexão com o banco de dados;
			$conexao = getConnection();

			//Cria-se a variável que contém a procedure a ser executada;
			$procedure = "CALL uspDeletarPedido( :pedido );";

			//Inicia-se a preparação para a query com parâmetros;			
			$sqlQuery = $conexao->prepare($procedure);

			//Atribui-se os parametros das variáveis da query parametrizada;
			$sqlQuery->bindValue(':pedido', $identificador);

			//Executa a query e já verifica se esta foi executada com sucesso;
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("PedidoNegocios/excluirPedido(OK)") </script>';

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
				echo '<script> console.log("PedidoNegocios/excluirPedido(ERROR)") </script>';
				//Mensagem para debug do erro;
				//echo '<script> console.log(' . $sqlQuery->errorInfo() . ') </script>';									
				//Mensagem de retorno para a interface no caso de erro;
				return "Execute: Erro ao executar o procedimento";
				
			}	
		}
	}
?>