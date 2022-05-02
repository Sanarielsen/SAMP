<?php
	
	//Função para alterar o formato da data para o brasileiro - 00/00/0000;
	function formatoDataBR($data) {

	    $dataFormatoBR = substr($data,8,2)."/".substr($data,5,2)."/".substr($data,0,4);

	    return $dataFormatoBR;
	}

	//Função para alterar o formato da data para o inglês - 0000-00-00;
	function formatoDataMYSQL($data) {
 
		$dia = substr($data,0,2);
		$mes = substr($data,3,2);
		$ano = substr($data,6,4);

		echo $dia;

	    $dataFormatoMYSQL = $ano."-".$mes."-".$dia;

	    echo $dataFormatoMYSQL;

	    return $dataFormatoMYSQL;
	}

	//Método para conversão da data;
	function converteData($date, $method) {

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

	//Método para conversão da data;
	function converteDataTime($date, $method) {

		//Inicia-se um processo de verificação de qual tipo de conversão será feita...
		//Caso seja apontado a conversão para formato mysql...
		if ($method == "MYSQL" ) {			

			//Atribui o resultado da data cortado de ano (6,4), mes (3,2) e dia (0,2);
			$dataFormatada = substr($date,6,4)."-".substr($date,3,2)."-".substr($date,0,2)." ".substr($date, 11, 5);
			//Retorna o valor da data completa em formato SQL;
    		return $dataFormatada;
		} else
		//Caso seja apontado a conversão para formato br...
		if ($method == "BR") {

			//Atribui o resultado da data cortado de ano (8,2), mes (5,2) e dia (0,4);
			$dataFormatada = substr($date,8,2)."/".substr($date,5,2)."/".substr($date,0,4)." ".substr($date, 11, 5);
			//Retorna o valor da data completa em formato BR;
			return $dataFormatada;
		}
		else{

			//Retorna a mensagem de erro;
			return "Não foi encontrado o formato ou ocorreu algum erro";
		}
	}

	//Métodos para requisição de partes de uma data;

	//=================================== CONVERSÕES DO FORMATO BR;
	function getDia($dataBR) {
		
		$dia = substr($dataBR,0,2);

		echo $dia;

		return $dia;
	}

	function getMes($dataBR) {

		$mes = substr($dataBR,3,2);

		return $mes;
	}

	function getAno($dataBR) {

		$ano = substr($dataBR,6,4);
		return $ano;
	}	

	//=================================== CONVERSÕES DO FORMATO MYSQL;
	function getYear($dataMYSQL) {

		return substr($dataMYSQL,0,4); 
	}

	function getMonth($dataMYSQL) {

		return substr($dataMYSQL,5,2);
	}

	function getDay($dataMYSQL) {

		return substr($dataMYSQL,8,2);
	}

	function getHourMinuteSeconds($dataMYSQL) {

		return substr($dataMYSQL, 11, 8);
	}

	function getHour($dataMYSQL) {

		return substr($dataMYSQL, 11, 2);
	}

	function getMinute($dataMYSQL) {

		return substr($dataMYSQL, 14, 2);
	}

	function getSecond($dataMYSQL) {

		return substr($dataMYSQL, 17, 2);
	}

	//Métodos para requisição de partes de uma data;
	function concatenarData($method, $day, $month, $year) {

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

	//=================================== GERENCIAMENTO DE HORAS;

	//Método para verificação de quantos minutos faltam para determinado acontecimento;
	function tempoRestante($start, $finish) {

		//Para fazer a comparação das datas, é necessário convertê-las para milisegundos através desse método gmktime;
		//Este método, para a conversão, é necessário estas informações nessa sequencia;
		//Hora, Minuto, Segundo, Mês, Dia, Ano;

		//Conversão para milisegundo da data inicial;
		$entrada = gmmktime( getHour($start), getMinute($start), getSecond($start), getMonth($start), getDay($start), getYear($start) );
		//Conversão para milisegundo da data final;
		$saida = gmmktime( getHour($finish), getMinute($finish), getSecond($finish), getMonth($finish), getDay($finish), getYear($finish) );
		//Inicia a conversão destes parametros, transformando-os em minutos com a divisão por 60 e usamos o int para arredondar o número;
		$tempoRestante = ($saida - $entrada) / 60;
		//echo "Inicio: " . $start . "<br> Final: " . $finish . "<br> Minutos restantes: " . $tempoRestante . "<br><br>";
		return $tempoRestante;
	}
?>