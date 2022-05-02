<?php
	
	//Classe contendo os procedimentos dos pagamentos;
	class PagamentoNegocios {

		//Inserir;
		//
		//Procedimento para inserir um novo pagamento em um pedido;
		public function inserirPagamento(Pagamento $pagamento) {

			//Inicia a conexão com o banco de dados;
			$conexao = getConnection();
			//Cria-se a string que irá executar a query;
			$procedure = "CALL uspInserirPagamento()";
			//Prepara a query a receber parâmetros;

			//Atribuí os parâmetros para execução desta query;

			//Executa o procedimento;
		}

		//Atualizar;
		//
		//Procedimento para alterar um pagamento de um pedido;
		public function atualizarPagamento(Pagamento $pagamento) {

			//Inicia a conexão com o banco de dados;
			$conexao = getConnection();
			//Cria-se a string que irá executar a query;

			//Prepara a query a receber parâmetros;

			//Atribuí os parâmetros para execução desta query;

			//Executa o procedimento;
		}

		//Consultar;
		//
		//Procedimento para consultar todos os pagamentos registrados;
		public function consultarPagamentos() {

			//Inicia a conexão com o banco de dados;
			$conexao = getConnection();
			//Cria-se a string que irá executar a query;

			//Prepara a query a receber parâmetros;

			//Atribuí os parâmetros para execução desta query;

			//Executa o procedimento;
		}

		//Consultar Pelo ID;
		//
		//Procedimento para consultar um pagamento pelo identificador do mesmo;
		public function consultarPagamentoPeloID($identificador) {

			//Inicia a conexão com o banco de dados;
			$conexao = getConnection();
			//Cria-se a string que irá executar a query;

			//Prepara a query a receber parâmetros;

			//Atribuí os parâmetros para execução desta query;

			//Executa o procedimento;
		}

		//Excluir;
		//
		//Procedimento para deletar um pagamento pelo identificador;
		public function excluirPagamento($identificador) {

			//Inicia a conexão com o banco de dados;
			$conexao = getConnection();
			//Cria-se a string que irá executar a query;

			//Prepara a query a receber parâmetros;

			//Atribuí os parâmetros para execução desta query;

			//Executa o procedimento;
		}
	}
?>