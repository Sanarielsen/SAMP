
<?php
	
	//Classe que contem o objeto com os parâmetros da conferência;
	class Conferencia {

		//Encapsulamento das variáveis;
		private $identificadorConferencia;
		private $clienteConferencia;
		private $representanteConferencia;		
		private $tipoConferencia;
		private $descricaoConferencia;
		private $dataConferencia;
		private $estadoConferencia;
		private $observacaoConferencia;

		//Método construtor desta classe;
		public function __construct($identificador, $cliente, $representante, $tipo,  $estado, $descricao, $observacao, $data) {

			$this->identificadorConferencia = $identificador;
			$this->clienteConferencia = $cliente;
			$this->representanteConferencia = $representante;
			$this->tipoConferencia = $tipo;
			$this->estadoConferencia = $estado;
			$this->descricaoConferencia = $descricao;					
			$this->observacaoConferencia = $observacao;
			$this->dataConferencia = $data;
		}

		//Método para verificação das variáveis e seus conteúdos desta classe;
		public function getDetalheConferencia() {

			$detalheLocalizacao = 

					"Conferencia Atual: " . "<br>" .
					"Identificador: " . $this->identificadorConferencia . "<br>".
					"Cliente: " . $this->clienteConferencia . "<br>".
					"Tipo: " . $this->tipoConferencia . "<br>" .
					"Descricao: " . $this->descricaoConferencia . "<br>".
					"Data: " . $this->dataConferencia . "<br>".
					"Estado: " . $this->estadoConferencia . "<br>".
					"Observação: " . $this->observacaoConferencia . "<br>"
					;

			return $detalheLocalizacao;
		}

		//Métodos SET - GET 
		public function setIdentificador($identificador) {

			$this->identificadorConferencia = $identificador;
		}

		public function getIdentificador() {

			return $this->identificadorConferencia;
		}

		public function setCliente($identificador) {

			$this->clienteConferencia = $identificador;
		}

		public function getCliente() {

			return $this->clienteConferencia;
		}

		public function setRepresentante($identificador) {

			$this->representanteConferencia = $identificador;
		}

		public function getRepresentante() {

			return $this->representanteConferencia;
		}

		public function setTipo($tipo) {

			$this->tipoConferencia = $tipo;
		}

		public function getTipo() {

			return $this->tipoConferencia;
		}

		public function setDescricao($descricao) {

  			$this->descricaoConferencia = $descricao;
		}

		public function getDescricao() {

  			return $this->descricaoConferencia;
		}

		public function setData($data) {

			$this->dataConferencia = $data;
		}

		public function getData() {

			return $this->dataConferencia;
		}

		public function setEstado($estado) {

			$this->estadoConferencia = $estado;
		}

		public function getEstado() {

			return $this->estadoConferencia;
		}

		public function setObservacao($observacao) {

			$this->observacaoConferencia = $observacao;
		}

		public function getObservacao() {

			return $this->observacaoConferencia;
		}

		// MÉTODOS DE ROTINA DA CONFERÊNCIA;

		//Métodos para requisição de partes de uma data;

		//Método para conversão da data;
		public function converteDataConferencia($date, $method) {

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

				//Atribuí o resultado da data e captura-se a hora dela;
				$horaFormatada = substr($date, 11, 2) . "h" . substr($date, 14, 2);

				return $dataFormatada . " " . $horaFormatada;
			}else{

				return "Não foi encontrado o formato ou ocorreu algum erro";
			}
		}

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
	}	
?>