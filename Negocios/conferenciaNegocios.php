
<?php 

	//Classe contendo os procedimentos das conferências;
	class ConferenciaNegocios {

		//Procedimento para executar a inserção de um registro de uma conferencia;
		public function inserirConferencia(Conferencia $conferencia) {

			//Inicia uma conexão com o banco de dados;
			$conexao = getConnection();

			//Cria-se uma variável que irá receber a procedure a ser executada;
			$procedure = "CALL uspInserirConferencia(:cliente, :representante, :tipo, :estado, :descricao, :observacao, :dataConferencia)";

			//Prepara a query parametrizada;
			$sqlQuery = $conexao->prepare($procedure);

			//Atribui-se os parametros das variáveis da query parametrizada;
			$sqlQuery->bindValue(':cliente', $conferencia->getCliente());
			$sqlQuery->bindValue(':representante', $conferencia->getRepresentante());
			$sqlQuery->bindValue(':tipo', $conferencia->getTipo());
			$sqlQuery->bindValue(':estado', $conferencia->getEstado());
			$sqlQuery->bindValue(':descricao', $conferencia->getDescricao());
			$sqlQuery->bindValue(':observacao', $conferencia->getObservacao());
			$sqlQuery->bindValue(':dataConferencia', $conferencia->getData());

			//Executa a query e já verifica se esta foi executada com sucesso;
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("A Procedure de inserção de conferência foi executada com sucesso") </script>';

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

		//Procedimento para executar a alteração de um registro de uma conferencia;
		public function alterarConferencia(Conferencia $conferencia) {

			//Inicia uma conexão com o banco de dados;
			$conexao = getConnection();

			//Cria-se uma variável que irá receber a procedure a ser executada;
			$procedure = "CALL uspAtualizarConferencia(:conferencia, :cliente, :representante, :tipo, :estado, :descricao, :observacao, :dataConferencia)";

			//Prepara a query parametrizada;
			$sqlQuery = $conexao->prepare($procedure);

			//Atribui-se os parametros das variáveis da query parametrizada;
			$sqlQuery->bindValue(':conferencia', $conferencia->getIdentificador());
			$sqlQuery->bindValue(':cliente', $conferencia->getCliente());
			$sqlQuery->bindValue(':representante', $conferencia->getRepresentante());
			$sqlQuery->bindValue(':tipo', $conferencia->getTipo());
			$sqlQuery->bindValue(':estado', $conferencia->getEstado());
			$sqlQuery->bindValue(':descricao', $conferencia->getDescricao());
			$sqlQuery->bindValue(':observacao', $conferencia->getObservacao());
			$sqlQuery->bindValue(':dataConferencia', $conferencia->getData());

			//Executa a query e já verifica se esta foi executada com sucesso;
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("A Procedure de alteração de conferência foi executada com sucesso") </script>';

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

		//Procedimento para executar a alteração do estado de uma conferência;
		public function alterarConferenciaEstado($identificador, $estadoSolicitado) {

			//Inicia uma conexão com o banco de dados;
			$conexao = getConnection();

			//Cria-se uma variável que irá receber a procedure a ser executada;
			$procedure = "CALL uspAtualizarConferenciaEstado( :conferencia, :estadoSolicitado)";

			//Prepara a query parametrizada;
			$sqlQuery = $conexao->prepare($procedure);

			//Atribui-se os parametros das variáveis da query parametrizada;
			$sqlQuery->bindValue(':conferencia', $identificador);
			$sqlQuery->bindValue(':estadoSolicitado', $estadoSolicitado);

			//Executa a query e já verifica se esta foi executada com sucesso;
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("A Procedure de alteração de conferência foi executada com sucesso") </script>';

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

		//Procedimento para executar a consulta de registros das conferências;
		public function consultarConferencias() {

			//Inicia uma conexão com o banco de dados;
			$conexao = getConnection();

			//Cria-se uma variável que irá receber a procedure a ser executada;
			$procedure = "CALL ('Criar isso ainda')";

			//Prepara a query parametrizada;
			$sqlQuery = $conexao->prepare($procedure);
		}

		//Procedimento para executar a consulta de um registro de uma conferência pelo identificador;
		public function consultarConferenciaPeloID($identificador) {

			//Inicia uma conexão com o banco de dados;
			$conexao = getConnection();

			//Cria-se uma variável que irá receber a procedure a ser executada;
			$procedure = "CALL uspConsultarConferenciaPeloID(:conferencia);";

			//Prepara a query parametrizada;
			$sqlQuery = $conexao->prepare($procedure);

			//Atribui-se os parametros das variáveis da query parametrizada;
			$sqlQuery->bindValue(':conferencia', $identificador);	

			//Executa a query e já verifica se esta foi executada com sucesso;
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("A Procedure para consultar uma conferência pelo identificador foi executada com sucesso") </script>';

				//Verifica quantas linhas vieram de resultado nessa procedure;
				if ($sqlQuery->rowCount() > 0) {

					//Se for, maior que zero, concentra este resultado neste retorno do procedimento;
					return $sqlQuery->fetch();					
				}
				else {

					//Retorna como resultado deste bloco;
					return array();
				}

			}
			else {

				//Manda para o console o resultado da procedure;
				echo "Ocorreu um problema na execução desta operação, verifique sua conexão ou estado do servidor";
				echo '<script> console.log(' . $sqlQuery->errorInfo() . ') </script>';									
			}
		}

		//Procedimento para executar a consulta de registros de uma conferencia utilizando um critério como filtrágem
		public function consultarConferenciaDetalhe($criterio, $contexto) {			

			//Inicia uma conexão com o banco de dados;
			$conexao = getConnection();

			//Cria-se uma variável que irá receber a procedure a ser executada;
			$procedure = "CALL uspConsultarConferenciaDetalhe(:criterio, :contexto)";

			//Prepara a query parametrizada;
			$sqlQuery = $conexao->prepare($procedure);

			//Atribui-se os parametros das variáveis da query parametrizada;
			$sqlQuery->bindValue(':criterio', $criterio);
			$sqlQuery->bindValue(':contexto', $contexto);

			//Executa a query e já verifica se esta foi executada com sucesso;
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("A Procedure de consulta dos detalhes da conferência foi executada com sucesso") </script>';

				//Verifica quantas linhas vieram de resultado nessa procedure;
				if ($sqlQuery->rowCount() > 0) {

					//Se for, maior que zero, concentra este resultado neste retorno do procedimento;
					return $sqlQuery->fetchAll();					
				}
				else {

					//Retorna como resultado deste bloco;
					return array();
				}

			}
			else {

				//Manda para o console o resultado da procedure;
				echo "Ocorreu um problema na execução desta operação, verifique sua conexão ou estado do servidor";
				echo '<script> console.log(' . $sqlQuery->errorInfo() . ') </script>';									
			}
		}

		//Procedimento para executar uma consulta de determinado periodo recente (de ontem até amanhã);
		public function consultarConferenciasRecentes($inicio, $fim) {

			//Inicia-se uma conexão com o banco de dados;
			$conexao = getConnection();

			//Criação da string da query a ser executada;
			$procedure = "CALL uspConsultarConferenciasRecentes( :periodoInicial, :periodoFinal)";

			//Prepara a query parametrizada;
			$sqlQuery = $conexao->prepare($procedure);

			//Atribui-se os parametros das variáveis da query parametrizada;
			$sqlQuery->bindValue(':periodoInicial',$inicio);
			$sqlQuery->bindValue(':periodoFinal',$fim);

			//Executa a query e já verifica se esta foi executada com sucesso;
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("A Procedure de exclusão de conferência foi executada com sucesso") </script>';

				//Verifica quantas linhas vieram de resultado nessa procedure;
				if ($sqlQuery->rowCount() > 0) {

					//Se for, maior que zero, concentra este resultado único nesta variável;
					$result = $sqlQuery->fetchAll();

					//Retorna como resultado deste bloco;
					return $result;
				}
				else {

					//Retorna como resultado deste bloco;
					//return array("Nenhuma linha foi alterada nessa query");
					return null;
				}
			}
			else {

				//Manda para o console o resultado da procedure;
				echo "Ocorreu um problema na execução desta operação, verifique sua conexão ou estado do servidor";
				echo '<script> console.log(' . $sqlQuery->errorInfo()[2] . ') </script>';									
			}
		}

		//Procedimento para consultar as pendências (Conferencias em aberto) do dia atual;
		public function consultarConferenciasDoDia($dataAtual) {

			//Instancia a conexão com o servidor;
			$conexao = getConnection();

			//Criação da procedure a ser executada nesta query;
			$procedure = "CALL uspConsultarConferenciasDoDia(:dataAtual)";

			//Prepara a query parametrizada;
			$sqlQuery = $conexao->prepare($procedure);	

			//Atribui-se os parametros das variáveis da query parametrizada;
			$sqlQuery->bindValue( ':dataAtual' , $dataAtual);		

			//Executa a query e já verifica se esta foi executada com sucesso;
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("A Procedure de consulta de conferência do dia foi executada com sucesso") </script>';

				//Verifica quantas linhas vieram de resultado nessa procedure;
				if ($sqlQuery->rowCount() > 0) {

					//Se for, maior que zero, concentra este resultado único nesta variável;
					$result = $sqlQuery->fetchAll();

					//Retorna como resultado deste bloco;
					return $result;
				}
				else {

					//Retorna como resultado deste bloco;					
					return null;
				}
			}
			else {

				//Manda para o console o resultado da procedure;
				echo "Ocorreu um problema na execução desta operação, verifique sua conexão ou estado do servidor";
				echo '<script> console.log(' . $sqlQuery->errorInfo() . ') </script>';									
			}
		}

		//Procedimento para executar a exclusão de um registro de uma conferência;
		public function excluirConferencia($identificador) {

			//Inicia uma conexão com o banco de dados;
			$conexao = getConnection();

			//Cria-se uma variável que irá receber a procedure a ser executada;
			$procedure = "CALL uspExcluirConferencia( :conferencia )";

			//Prepara a query parametrizada;
			$sqlQuery = $conexao->prepare($procedure);

			//Atribui-se os parametros das variáveis da query parametrizada;
			$sqlQuery->bindValue(':conferencia', $identificador);

			//Executa a query e já verifica se esta foi executada com sucesso;
			if ( $sqlQuery->execute() ) {

				//Manda para o console o resultado da procedure;				
				echo '<script> console.log("A Procedure de exclusão de conferência foi executada com sucesso") </script>';

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
	}
?>