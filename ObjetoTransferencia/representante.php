<?php

	//Criação do name desta classe de objetos;
	class Representante {

		//Encapsulamento das variáveis;
		private $identificadorRepresentante;
		private $clienteIdentificador;
		private $nomeRepresentante;
		private $nacionalidadeRepresentante;
		private $RGRepresentante;
		private $CPFRepresentante;
		private $profissaoRepresentante;
		private $cargoRepresentante;

		//Método para verificação das variáveis e seus conteúdos desta classe;
		public function getDetalheRepresentante() {

			$detalheRepresentante = 
					"Representante Atual: " . "<br>" .
					"Identificador: " . $this->identificadorRepresentante . "<br>" .
					"Cliente: " . $this->clienteIdentificador . "<br>" .
					"Nome: " . $this->nomeRepresentante . "<br>" .
					"Nacionalidade: " . $this->nacionalidadeRepresentante . "<br>" .
					"RG: " . $this->RGRepresentante . "<br>" .
					"CPF: " . $this->CPFRepresentante . "<br>" .
					"Profissao: " . $this->profissaoRepresentante . "<br>" .
					"Cargo: " . $this->cargoRepresentante . "<br>"

					;

			return $detalheRepresentante;
		}

		//Métodos set's e get's;
		public function setIdentificador($identificador) {

			$this->identificadorRepresentante = $identificador ;
		}
		public function getIdentificador() {

			return $this->identificadorRepresentante ;
		}
		
		public function setCliente($cliente) {

			$this->clienteIdentificador = $cliente ;
		}
		public function getCliente() {

			return $this->clienteIdentificador ;
		}

		public function setNome($nome) {

			$this->nomeRepresentante = $nome ;
		}
		public function getNome() {

			return $this->nomeRepresentante ;
		}
		
		public function setNacionalidade($nacionalidade) {

			$this->nacionalidadeRepresentante = $nacionalidade ;
		}
		public function getNacionalidade() {

			return $this->nacionalidadeRepresentante ;
		}

		public function setRG($rg) {

			$this->RGRepresentante = $rg ;
		}
		public function getRG() {

			return $this->RGRepresentante ;
		}

		public function setCPF($cpf) {

			$this->CPFRepresentante = $cpf ;
		}
		public function getCPF() {

			return $this->CPFRepresentante ;
		}

		public function setProfissao($profissao) {

			$this->profissaoRepresentante = $profissao ;
		}
		public function getProfissao() {

			return $this->profissaoRepresentante ;
		}

		public function setCargo($cargo) {

			$this->cargoRepresentante = $cargo ;
		}
		public function getCargo() {

			return $this->cargoRepresentante ;
		}
	}
?>

<!-- Sessão de testes desta classe -->
<?php
	/*
	//Instancia-se a classe de clientes para administrar suas informações;
	$representante = new Representante();

	//Inicia-se os testes dos métodos de setamento de informações;
	echo "======================== Procedimento de testes dos metodos set" . "<br>";

	$representante->setIdentificador("1");
	$representante->setCliente("1");
	$representante->setNome("Henrique Lefundes");
	$representante->setNacionalidade("Brasileiro(a)");
	$representante->setRG("111.111.111.415");
	$representante->setCPF("497.796.102-08");
	$representante->setProfissao("Desenvolvedor");
	$representante->setCargo("Programador");

	//Inicia-se os testes dos métodos de getamento das informações;
	echo "======================== Procedimento de testes dos metodos get". "<br>";

	echo $representante->getIdentificador() . "<br>"; 
	echo $representante->getCliente() . "<br>";
	echo $representante->getNome() . "<br>";
	echo $representante->getNacionalidade() . "<br>";
	echo $representante->getRG() . "<br>";
	echo $representante->getCPF() . "<br>";
	echo $representante->getProfissao() . "<br>";
	echo $representante->getCargo() . "<br>";

	//Inicia-se os testes dos métodos de detalhes das informações;
	echo "======================== Procedimento de testes do metodos detalhe" . "<br>";

	echo $representante->getDetalheRepresentante();
	*/
?>