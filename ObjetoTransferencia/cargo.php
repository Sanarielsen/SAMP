<?php

	//Criação do name desta classe de objetos;
	class Cargo {

		//Encapsulamento das variáveis de objetos;
		private $identificadorCargo;
		private $nomenclaturaCargo;
		private $permissaoInserirCargo;
		private $permissaoAlterarCargo;
		private $permissaoConsultarCargo;
		private $permissaoDeletarCargo;

		//Método para visualização dos valores das variáveis encapsuladas;
		public function getDetalheCargo() {

			//Insere as informações atuais que este objeto do cargo possui;
			$detalheCargo =
				"Cargo Atual: " . "<br>" .
				"Identificador: " . $this->identificadorCargo . "<br>" .
				"Nomenclatura: " . $this->nomenclaturaCargo . "<br>" .
				"Permissão para inserir: " . $this->permissaoInserirCargo . "<br>" .
				"Permissão para alterar: " . $this->permissaoAlterarCargo . "<br>" .
				"Permissão para consultar: " . $this->permissaoConsultarCargo . "<br>" .
				"Permissão para deletar: " . $this->permissaoDeletarCargo . "<br>" 
				;
			//Retorna como resultado desta função;
			return $detalheCargo;
		}

		//Métodos set's e get's;
		public function setIdentificador($identificador) {

			$this->identificadorCargo = $identificador ;
		}

		public function setNomenclatura($nomenclatura) {

			$this->nomenclaturaCargo = $nomenclatura ;	
		}

		public function setPermissaoInserir($permissaoInserir) {

			$this->permissaoInserirCargo = $permissaoInserir ;
		}

		public function setPermissaoAlterar($permissaoAlterar) {

			$this->permissaoAlterarCargo = $permissaoAlterar ;
		}

		public function setPermissaoConsultar($permissaoConsultar) {

			$this->permissaoConsultarCargo = $permissaoConsultar ;
		}

		public function setPermissaoDeletar($permissaoDeletar) {

			$this->permissaoDeletarCargo = $permissaoDeletar ;
		}

		public function getIdentificador() {

			return $this->identificadorCargo;
		}

		public function getNomenclatura() {

			return $this->nomenclaturaCargo;
		}

		public function getPermissaoInserir() {

			return $this->permissaoInserirCargo;
		}

		public function getPermissaoAlterar() {

			return $this->permissaoAlterarCargo;
		}

		public function getPermissaoConsultar() {

			return $this->permissaoConsultarCargo;
		}

		public function getPermissaoDeletar() {

			return $this->permissaoDeletarCargo;
		}
	}
?>

<?php
	/*
	//Área para a realização de testes desta classe de objetos;
	$cargo = new Cargo();
	//Inicia-se os testes dos métodos de setamento de informações;
	echo "======================== Procedimento de testes dos metodos set" . "<br>";
	$cargo->setIdentificador("1");
	$cargo->setNomenclatura("Cadastrador(a)");
	$cargo->setPermissaoInserir("1 (inserir)");
	$cargo->setPermissaoAlterar("0 (alterar)");
	$cargo->setPermissaoConsultar("1 (consultar)");
	$cargo->setPermissaoDeletar("0 (deletar)");
	//Inicia-se os testes dos métodos de getamento das informações;
	echo "======================== Procedimento de testes dos metodos get". "<br>";
	echo $cargo->getIdentificador() . "<br>";
	echo $cargo->getNomenclatura() . "<br>";
	echo $cargo->getPermissaoInserir() . "<br>";
	echo $cargo->getPermissaoAlterar() . "<br>";	
	echo $cargo->getPermissaoConsultar() . "<br>";
	echo $cargo->getPermissaoDeletar() . "<br>";
	//Inicia-se os testes do método detalhe;
	echo "======================== Procedimento de testes do metodos detalhe" . "<br>";
	echo $cargo->getDetalheCargo() . "<br>";
	*/
?>