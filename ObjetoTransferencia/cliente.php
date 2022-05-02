<?php

	//Criação do name desta classe de objetos;
	class Cliente {

		//Encapsulamento das variáveis;
		private $identificadorCliente;
		private $razaoSocialCliente;
		private $tipoPessoaCliente;
		private $protocoloCliente;
		private $nomeFantasiaCliente;
		private $dataFundacaoCliente;

		//Método para verificação das variáveis e seus conteúdos desta classe;
		public function getDetalheCliente() {

			$detalheCliente = 
				"Cliente Atual: <br>" . 
				"Razao Social: " .   $this->razaoSocialCliente  . "<br>" .
				"Tipo de Pessoa: " . $this->tipoPessoaCliente   . "<br>" . 
				"Protocolo: " .      $this->protocoloCliente    . "<br>" .
				"Nome Fantasia: " .  $this->nomeFantasiaCliente . "<br>" .
				"Data Fundação: " .  $this->dataFundacaoCliente . "<br>"
				;

			return $detalheCliente;
		}

		//Método para conversão da data;
		public function converteDataFundacao($date, $method) {

			//Inicia-se um processo de verificação de qual tipo de conversão será feita...
			//Caso seja apontado a conversão para formato mysql...
			if ($method == "MYSQL" ) {			

				//Atribui o resultado da data cortado de ano (6,4), mes (3,2) e dia (0,2);
				$dataFormatada = substr($date,6,4)."-".substr($date,3,2)."-".substr($date,0,2);

	    		return $dataFormatada;
			} else


			//Caso seja apontado a conversão para formato br...
			if ($method == "BR") {

				//Atribui o resultado da data cortado de ano (8,2), mes (5,2) e dia (0,4);
				$dataFormatada = substr($date,8,2)."/".substr($date,5,2)."/".substr($date,0,4);

				return $dataFormatada;
			}else{

				return "Não foi encontrado o formato ou ocorreu algum erro";
			}
		}

		//Métodos para requisição de partes de uma data;

		//=================================== CONVERSÕES DO FORMATO BR;
		public function getDia() {

			$data = $this->dataFundacaoCliente;

			return substr($data,0,2);
		}

		public function getMes() {

			return substr($this->dataFundacaoCliente,3,2);
		}

		public function getAno() {

			return substr($this->dataFundacaoCliente,6,4);
		}

		//=================================== CONVERSÕES DO FORMATO MYSQL;
		public function getDay($dataMYSQL) {

			return substr($dataMYSQL,0,4); 
		}

		public function getMonth($dataMYSQL) {
 
			return substr($dataMYSQL,5,2);
		}

		public function getYear($dataMYSQL) {

			return substr($dataMYSQL,8,2);
		}

		//Métodos para requisição de partes de uma data;
		public function concatenarData($method, $day, $month, $year) {

			//Caso a concatenação seja da data BR...
			if ($method == "BR") {

				return $day . "/" . $month . "/" . $year;
			}
			//Caso a concatenação seja da data MYSQL...
			else 
			if ($method == "MYSQL") {

				return $year . "-" . $month . "-" . $day;
			}
		}
		
		//Funções de set's e get's - Identificador;
		public function setIdentificador($identificador) {
			
			$this->identificadorCliente = $identificador;
		}	

		public function getIdentificador() {

			return $this->identificadorCliente;
		}

		//Funções de set's e get's - Razão Social;
		public function setRazaoSocial($razaoSocial) {
			
			$this->razaoSocialCliente = $razaoSocial;
		}	

		public function getRazaoSocial() {

			return $this->razaoSocialCliente;
		}

		//Funções de set's e get's - Tipo de Pessoa;
		public function setTipoPessoa($tipoPessoa) {
			
			$this->tipoPessoaCliente = $tipoPessoa;
		}	

		public function getTipoPessoa() {

			return $this->tipoPessoaCliente;
		}

		//Funções de set's e get's - Protocolo;
		public function setProtocolo($protocolo) {
			
			$this->protocoloCliente = $protocolo;
		}	

		public function getProtocolo() {

			return $this->protocoloCliente;
		}

		//Funções de set's e get's - Nome Fantasia;
		public function setNomeFantasia($nomeFantasia) {
			
			$this->nomeFantasiaCliente = $nomeFantasia;
		}	

		public function getNomeFantasia() {

			return $this->nomeFantasiaCliente;
		}

		//Funções de set's e get's - Data de Fundação;
		public function setDataFundacao($dataFundacao) {
			
			$this->dataFundacaoCliente = $dataFundacao;
		}	

		public function getDataFundacao() {

			return $this->dataFundacaoCliente;
		}
	}
?>

<!-- Sessão de testes desta classe -->
<?php
	/*
	//Instancia-se a classe de clientes para administrar suas informações.
	$cliente = new Cliente();

	//Inicia-se os testes dos métodos de setamento de informações;
	echo "======================== Procedimento de testes dos metodos set" . "<br>";
	$cliente->setRazaoSocial("SamuFeliz");
	$cliente->setTipoPessoa("PF");
	$cliente->setProtocolo("497.463.028-84");
	$cliente->setNomeFantasia("SHCP");
	$cliente->setDataFundacao("2000-02-10");
	echo "<br> <br>";

	//Inicia-se os testes dos métodos de getamento das informações;
	echo "======================== Procedimento de testes dos metodos get". "<br>";
	echo $cliente->getRazaoSocial() . "<br>";
	echo $cliente->getTipoPessoa() . "<br>";
	echo $cliente->getProtocolo(). "<br>";
	echo $cliente->getNomeFantasia() . "<br>";
	echo $cliente->getDataFundacao() . "<br>";
	echo "<br>";

	//Inicia-se os testes dos métodos de detalhes das informações;
	echo "======================== Procedimento de testes do metodos detalhe" . "<br>";
	echo $cliente->getDetalheCliente();
	echo "<br>";

	//Inicia-se os testes para conversão das datas;
	echo "======================== Procedimento de testes das converções" . "<br>";
	//Esta variável recebe a data convertida para formato BR;
	$resultParaBR = $cliente->converteDataFundacao($cliente->getDataFundacao(), "BR");
	//Exibi o conteúdo da variável para o usuario;
	echo "Nova data para BR: " . $resultParaBR . "<br>";
	//Atualiza o objeto;
	$cliente->setDataFundacao($resultParaBR);
	//Esta variável recebe a data convertida para formato MYSQL;
	$resultParaMYSQL = $cliente->converteDataFundacao($cliente->getDataFundacao(), "MYSQL");
	//Exibi o conteúdo da variável para o usuario;
	echo "Nova data para MYSQL: " . $resultParaMYSQL . "<br>";
	*/
?>