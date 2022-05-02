<?php  
	
	//Criação do name desta classe de objetos;
	class Pagamento {

		//Encapsulamento das variáveis;
		private $identificador;
		private $identificadorPedido;
		private $quantia;
		private $forma;
		private $parcela;
		private $reajuste;
		private $descricao;

		//Método construtor;
		public function __construct($identificador, $identificadorPedido, $quantia, $forma, $parcela, $reajuste, $descricao) {

			//Atribuí os valores dados ao construtor para os parâmetros do objeto atual;
			//
			//Identificadores;
			$this->identificador = $identificador;
			$this->identificadorPedido = $identificadorPedido;
			//Campos do pagamento;
			$this->quantia = $quantia;
			$this->forma = $forma;
			$this->parcela = $parcela;
			$this->reajuste = $reajuste;
			$this->descricao = $descricao;
		}

		//Método para verificação das variáveis e seus conteúdos desta classe;
		public function getPagamentoDetalhes() {

			//Retorna os valores atuais deste objeto;
			return "Pagamento: {" . 
				" identificador: " . $this->identificador . " | " .
				" identificador do Pedido: " . $this->identificadorPedido . " | " .
				" quantia: " . $this->quantia . " | " .
				" forma: " . $this->forma . " | " .
				" parcela: " . $this->parcela . " | " .
				" reajuste: " . $this->reajuste . " | " .
				" descricao: " . $this->descricao .
				" }";
		}

		//Funções de set's e get's
		//
		//Identificador
		//
		//Método para setar um valor a variável deste objeto;
		public function setIdentificador($identificador) {

			//Atribuí o valor dado ao método para o objeto deste pedido;
			$this->identificador = $identificador;
		}
		//Método para puxar o conteúdo da variável deste objeto;
		public function getIdentificador() {

			//Retorna o valor deste componente do objeto para uma variável;
			return $this->identificador;			
		}
		//
		//IdentificadorPedido
		//
		//Método para setar um valor a variável deste objeto;
		public function setIdentificadorPedido($identificadorPedido) {

			//Atribuí o valor dado ao método para o objeto deste pedido;
			$this->identificadorPedido = $identificadorPedido;
		}
		//Método para puxar o conteúdo da variável deste objeto;
		public function getIdentificadorPedido() {

			//Retorna o valor deste componente do objeto para uma variável;
			return $this->identificadorPedido;			
		}
		//
		//Quantia
		//
		//Método para setar um valor a variável deste objeto;
		public function setQuantia($quantia) {

			//Atribuí o valor dado ao método para o objeto deste pedido;
			$this->quantia = $quantia;
		}
		//Método para puxar o conteúdo da variável deste objeto;
		public function getQuantia() {

			//Retorna o valor deste componente do objeto para uma variável;
			return $this->quantia;			
		}
		//
		//Forma
		//
		//Método para setar um valor a variável deste objeto;
		public function setForma($forma) {

			//Atribuí o valor dado ao método para o objeto deste pedido;
			$this->forma = $forma;
		}
		//Método para puxar o conteúdo da variável deste objeto;
		public function getForma() {

			//Retorna o valor deste componente do objeto para uma variável;
			return $this->forma;			
		}
		//
		//Parcela
		//
		//Método para setar um valor a variável deste objeto;
		public function setParcela($parcela) {

			//Atribuí o valor dado ao método para o objeto deste pedido;
			$this->parcela = $parcela;
		}
		//Método para puxar o conteúdo da variável deste objeto;
		public function getParcela() {

			//Retorna o valor deste componente do objeto para uma variável;
			return $this->parcela;			
		}
		//
		//Reajuste
		//
		//Método para setar um valor a variável deste objeto;
		public function setReajuste($reajuste) {

			//Atribuí o valor dado ao método para o objeto deste pedido;
			$this->reajuste = $reajuste;
		}
		//Método para puxar o conteúdo da variável deste objeto;
		public function getReajuste() {

			//Retorna o valor deste componente do objeto para uma variável;
			return $this->reajuste;			
		}
		//
		//Descricao
		//
		//Método para setar um valor a variável deste objeto;
		public function setDescricao($descricao) {

			//Atribuí o valor dado ao método para o objeto deste pedido;
			$this->descricao = $descricao;
		}
		//Método para puxar o conteúdo da variável deste objeto;
		public function getDescricao() {

			//Retorna o valor deste componente do objeto para uma variável;
			return $this->descricao;			
		}
	}
?>