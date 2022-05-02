<?php
	
	//Criação do name desta classe de objetos;
	class Pedido {

		//Encapsulamento das variáveis;
		private $identificadorPedido;
		private $identificadorCliente;
		private $descricaoPedido;
		private $observacaoPedido;
		private $dataPedido;

		//Método construtor;
		public function __construct($identificador, $identificadorCliente, $descricao, $observacao, $dataCriacao) {

			//Identificadores;
			$this->identificadorPedido = $identificador;
			$this->identificadorCliente = $identificadorCliente;
			//Campos do objeto;
			$this->descricaoPedido = $descricao;
			$this->observacaoPedido = $observacao;
			$this->dataPedido = $dataCriacao;
		}	

		//Método para verificação das variáveis e seus conteúdos desta classe;
		public function getDetalhes() {

			//Retorna para uma variável todo o conteúdo deste objeto;
			return "Pedido: {" .
				" identificador: " . $this->identificadorPedido .
				" | cliente: " . $this->identificadorCliente .
				" | descrição: " . $this->descricaoPedido .
				" | observação: " . $this->observacaoPedido . 
				" | data da criação: " . $this->dataPedido . 
				" }";
		}

		//Funções de set's e get's
		//
		//identificadorPedido;
		//
		//Método para setar um valor a variável deste objeto;
		public function setIdentificador($identificador) {

			//Atribuí o valor dado ao método para o objeto deste pedido;
			$this->identificadorPedido = $identificador;
		}
		//Método para puxar o conteúdo da variável deste objeto;
		public function getIdentificador() {

			//Retorna o valor deste componente do objeto para uma variável;
			return $this->identificadorPedido;
		}
		//
		//identificadorCliente;
		//
		//Método para setar um valor a variável deste objeto;
		public function setIdentificadorCliente($identificadorCliente) {

			//Atribuí o valor dado ao método para o objeto deste pedido;
			$this->identificadorCliente = $identificadorCliente;
		}
		//Método para puxar o conteúdo da variável deste objeto;
		public function getIdentificadorCliente() {

			//Retorna o valor deste componente do objeto para uma variável;
			return $this->identificadorCliente;
		}
		//
		//descricaoPedido;
		//
		//Método para setar um valor a variável deste objeto;
		public function setDescricao($descricao) {

			//Atribuí o valor dado ao método para o objeto deste pedido;
			$this->descricaoPedido = $descricao;
		}
		//Método para puxar o conteúdo da variável deste objeto;
		public function getDescricao() {

			//Retorna o valor deste componente do objeto para uma variável;
			return $this->descricaoPedido;
		}
		//
		//observacaoPedido;
		//
		//Método para setar um valor a variável deste objeto;
		public function setObservacao($observacao) {

			//Atribuí o valor dado ao método para o objeto deste pedido;
			$this->observacaoPedido = $observacao;
		}
		//Método para puxar o conteúdo da variável deste objeto;
		public function getObservacao() {

			//Retorna o valor deste componente do objeto para uma variável;
			return $this->observacaoPedido;
		}
		//
		//dataPedido;
		//
		//Método para setar um valor a variável deste objeto;
		public function setDataCriacao($dataCriacao) {

			//Atribuí o valor dado ao método para o objeto deste pedido;
			$this->dataPedido = $dataCriacao;
		}
		//Método para puxar o conteúdo da variável deste objeto;
		public function getDataCriacao() {

			//Retorna o valor deste componente do objeto para uma variável;
			return $this->dataPedido;
		}
	}
?>