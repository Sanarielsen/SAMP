<?php

	class ClienteCorrespondencia {

		//Encapsulamento das variáveis;
		private $identificadorCorrespondencia;
		private $clienteIdentificador;
		private $CEPCorrespondencia;
		private $lougradouroCorrespondencia;
		private $bairroCorrespondencia;
		private $cidadeCorrespondencia;
		private $estadoCorrespondencia;
		private $caixaPostalCorrespondencia;
		private $telefoneCorrespondencia;
		private $contatoCorrespondencia;

		//Método para verificação das variáveis e seus conteúdos desta classe;
		public function getDetalheCorrespondencia() {

			$correspondenciaDetalhe = 

					"Localizacao Atual: " . "<br>" .
					"Identificador: " . $this->identificadorCorrespondencia . "<br>".
					"Cliente: " . $this->clienteIdentificador . "<br>".
					"Cep: " . $this->CEPCorrespondencia . "<br>" .
					"Lougradouro: " . $this->lougradouroCorrespondencia . "<br>".
					"Bairro: " . $this->bairroCorrespondencia . "<br>".
					"Cidade: " . $this->cidadeCorrespondencia . "<br>".
					"Estado: " . $this->estadoCorrespondencia . "<br>".
					"Caixa Postal: " . $this->caixaPostalCorrespondencia . "<br>".
					"Telefone: " . $this->telefoneCorrespondencia . "<br>".
					"Contato: " . $this->contatoCorrespondencia . "<br>"
					;

			return $correspondenciaDetalhe;
		}

		//Métodos set's e get's;
		public function setIdentificador($identificador) {

			$this->identificadorCorrespondencia = $identificador ;
		}
		public function getIdentificador() {

			return $this->identificadorCorrespondencia ;
		}

		public function setCliente($cliente) {

			$this->clienteIdentificador = $cliente ;
		}
		public function getCliente() {

			return $this->clienteIdentificador ;
		}

		public function setCEP($cep) {

			$this->CEPCorrespondencia = $cep ;
		}
		public function getCEP() {

			return $this->CEPCorrespondencia;	
		}

		public function setLougradouro($lougradouro) {

			$this->lougradouroCorrespondencia = $lougradouro ;
		}
		public function getLougradouro() {

			return $this->lougradouroCorrespondencia ;
		}

		public function setBairro($bairro) {

			$this->bairroCorrespondencia = $bairro ;
		}
		public function getBairro() {

			return $this->bairroCorrespondencia ;
		}

		public function setCidade($cidade) {

			$this->cidadeCorrespondencia = $cidade ;
		}
		public function getCidade() {

			return $this->cidadeCorrespondencia ;
		}

		public function setEstado($estado) {

			$this->estadoCorrespondencia = $estado ;	
		}
		public function getEstado() {

			return $this->estadoCorrespondencia ;
		}

		public function setCaixaPostal($caixaPostal) {

			$this->caixaPostalCorrespondencia = $caixaPostal ;
		}
		public function getCaixaPostal() {

			return $this->caixaPostalCorrespondencia ;
		}

		public function setTelefone($telefone) {

			$this->telefoneCorrespondencia = $telefone ;
		}
		public function getTelefone() {

			return $this->telefoneCorrespondencia ;
		}

		public function setContato($contato) {

			$this->contatoCorrespondencia = $contato ;				
		}
		public function getContato() {

			return $this->contatoCorrespondencia ;
		}

	}
?>

<?php
	/*
	//Instancia-se a classe de clientes para administrar suas informações;
	$correspondencia = new ClienteCorrespondencia();

	//Inicia-se os testes dos métodos de setamento de informações;
	echo "======================== Procedimento de testes dos metodos set" . "<br>";

	$correspondencia->setIdentificador("1");
	$correspondencia->setCliente("1");
	$correspondencia->setCEP("08595-750");
	$correspondencia->setLougradouro("Rua 2");
	$correspondencia->setBairro("Bairro 2");
	$correspondencia->setCidade("Cidade 2");
	$correspondencia->setEstado("Estado 2");
	$correspondencia->setCaixaPostal("12");
	$correspondencia->setTelefone("11988340000");
	$correspondencia->setContato("Contatom2");

	//Inicia-se os testes dos métodos de getamento das informações;
	echo "======================== Procedimento de testes dos metodos get". "<br>";

	echo $correspondencia->getIdentificador() . "<br>";
	echo $correspondencia->getCliente() . "<br>";
	echo $correspondencia->getCEP() . "<br>";
	echo $correspondencia->getLougradouro() . "<br>";
	echo $correspondencia->getBairro() . "<br>";
	echo $correspondencia->getCidade() . "<br>";
	echo $correspondencia->getEstado() . "<br>";
	echo $correspondencia->getCaixaPostal() . "<br>";
	echo $correspondencia->getTelefone() . "<br>";
	echo $correspondencia->getContato() . "<br>";

	//Inicia-se os testes dos métodos de detalhes das informações;
	echo "======================== Procedimento de testes do metodos detalhe" . "<br>";

	echo $correspondencia->getDetalheCorrespondencia() . "<br>";
	*/
?>