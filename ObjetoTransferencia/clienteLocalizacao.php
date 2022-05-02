<?php

	//Criação do name desta classe de objetos;
	class ClienteLocalizacao {

		//Encapsulamento das variáveis;
		private $identificadorLocalizacao;
		private $clienteIdentificador;
		private $CEPLocalizacao;
		private $lougradouroLocalizacao;
		private $bairroLocalizacao;
		private $cidadeLocalizacao;
		private $estadoLocalizacao;
		private $caixaPostalLocalizacao;
		private $telefoneLocalizacao;
		private $emailLocalizacao;
		private $siteLocalizacao;
		private $contatoLocalizacao;

		//Método para verificação das variáveis e seus conteúdos desta classe;
		public function getDetalheLocalizacao() {

			$detalheLocalizacao = 

					"Localizacao Atual: " . "<br>" .
					"Identificador: " . $this->identificadorLocalizacao . "<br>".
					"Cliente: " . $this->clienteIdentificador . "<br>".
					"Cep: " . $this->CEPLocalizacao . "<br>" .
					"Lougradouro: " . $this->lougradouroLocalizacao . "<br>".
					"Bairro: " . $this->bairroLocalizacao . "<br>".
					"Cidade: " . $this->cidadeLocalizacao . "<br>".
					"Estado: " . $this->estadoLocalizacao . "<br>".
					"Caixa Postal: " . $this->caixaPostalLocalizacao . "<br>".
					"Telefone: " . $this->telefoneLocalizacao . "<br>".
					"Email: " . $this->emailLocalizacao . "<br>".
					"Site: " . $this->siteLocalizacao . "<br>".
					"Contato: " . $this->contatoLocalizacao . "<br>"
					;

			return $detalheLocalizacao;
		}

		//Métodos set's e get's;
		public function setIdentificador($identificador) {

			$this->identificadorLocalizacao = $identificador ;
		}
		public function getIdentificador() {

			return $this->identificadorLocalizacao ;
		}

		public function setCliente($cliente) {

			$this->clienteIdentificador = $cliente ;
		}
		public function getCliente() {

			return $this->clienteIdentificador;
		}

		public function setCEP($cep) {

			$this->CEPLocalizacao = $cep ;
		}
		public function getCEP() {

			return $this->CEPLocalizacao ;
		}

		public function setLougradouro($lougradouro) {

			$this->lougradouroLocalizacao = $lougradouro ;
		}
		public function getLougradouro() {

			return $this->lougradouroLocalizacao ;
		}

		public function setBairro($bairro) {

			$this->bairroLocalizacao = $bairro ;
		}
		public function getBairro() {

			return $this->bairroLocalizacao ;
		}

		public function setCidade($cidade) {

			$this->cidadeLocalizacao = $cidade ;
		}
		public function getCidade() {

			return $this->cidadeLocalizacao ;
		}

		public function setEstado($estado) {

			$this->estadoLocalizacao = $estado ;
		}
		public function getEstado() {

			return $this->estadoLocalizacao ;
		}	

		public function setCaixaPostal($caixaPostal) {

			$this->caixaPostalLocalizacao = $caixaPostal ;
		}
		public function getCaixaPostal() {

			return $this->caixaPostalLocalizacao ;
		}

		public function setTelefone($telefone) {

			$this->telefoneLocalizacao = $telefone ;
		}
		public function getTelefone() {

			return $this->telefoneLocalizacao ;
		}

		public function setEmail($email) {

			$this->emailLocalizacao = $email ;
		}
		public function getEmail() {

			return $this->emailLocalizacao ;
		}

		public function setSite($site) {

			$this->siteLocalizacao = $site ;
		}
		public function getSite() {

			return $this->siteLocalizacao ;
		}

		public function setContato($contato) {

			$this->contatoLocalizacao = $contato ;
		}
		public function getContato() {

			return $this->contatoLocalizacao ;
		}
	}
?>

<?php
	/*
	//Instancia-se a classe de clientes para administrar suas informações;
	$localizacao = new ClienteLocalizacao();

	//Inicia-se os testes dos métodos de setamento de informações;
	echo "======================== Procedimento de testes dos metodos set" . "<br>";

	$localizacao->setIdentificador("1");
	$localizacao->setCliente("1");
	$localizacao->setCEP("08595-630");
	$localizacao->setLougradouro("Rua 1");
	$localizacao->setBairro("Bairro 1");
	$localizacao->setCidade("Cidade 1");
	$localizacao->setEstado("Estado 1");
	$localizacao->setCaixaPostal("11");
	$localizacao->setTelefone("11988346812");
	$localizacao->setEmail("samuelajuda@gmail.com");
	$localizacao->setSite("www.shcp.gov.br");
	$localizacao->setContato("Contato não");

	//Inicia-se os testes dos métodos de getamento das informações;
	echo "======================== Procedimento de testes dos metodos get". "<br>";

	echo $localizacao->getIdentificador() . "<br>";
	echo $localizacao->getCliente() . "<br>";
	echo $localizacao->getCEP() . "<br>";
	echo $localizacao->getLougradouro() . "<br>";
	echo $localizacao->getBairro() . "<br>";
	echo $localizacao->getCidade() . "<br>";
	echo $localizacao->getEstado() . "<br>";
	echo $localizacao->getCaixaPostal() . "<br>";
	echo $localizacao->getTelefone() . "<br>";
	echo $localizacao->getEmail() . "<br>";
	echo $localizacao->getSite() . "<br>";
	echo $localizacao->getContato() . "<br>";

	//Inicia-se os testes dos métodos de detalhes das informações;
	echo "======================== Procedimento de testes do metodos detalhe" . "<br>";

	echo $localizacao->getDetalheLocalizacao() . "<br>";
	*/
?>