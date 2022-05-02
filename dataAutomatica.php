<?php

	echo 'Algoritmo para data automática' . "<BR><br>";

	echo(strtotime("now") . "<br>");
	echo(strtotime("3 October 2005") . "<br>");
	echo(strtotime("+5 hours") . "<br>");
	echo(strtotime("+1 week") . "<br>");
	echo(strtotime("+1 week 3 days 7 hours 5 seconds") . "<br>");
	echo(strtotime("next Monday") . "<br>");
	echo(strtotime("last Sunday") . "<br>");

	echo "<br><br><br>";

	echo "Data atual: " . date('d/m/Y') . "<br>";

	echo "Dia atual: " . date('d') . "<br>";
	echo "Mês atual: " . date('m') . "<br>";
	echo "Ano atual: " . date('Y') . "<br>";

	echo "<br><br><br>";

	echo "Data simulada: " . date('20/02/2002') . "<br>";

	echo "Dia atual: " . date('20') . "<br>";
	echo "Mês atual: " . date('02') . "<br>";
	echo "Ano atual: " . date('2002') . "<br>";	

	$data = date('31/10/2018');
	echo $data;
	date($data, strtotime('+1 day'));
	$data = date('31/10/2018', strtotime("+1 day"));
	echo $data . "<br>" ;

	echo date("d/m/Y", strtotime("20/02/2002")) . "<br>" ; 
	
	$dataTeste = "31-10-2018";
	echo "data:" . date('d/m/Y', strtotime("+1 days",strtotime($dataTeste)))	 . "<br>";

	$dataCodificada = strtotime("31 October 2018") . "<br>";
	echo date($dataCodificada);

	echo "<br><br><br>";

	echo date('m', strtotime('+1 day'));

	$dataAtual;
	$dataInicial;
	$dataFinal;

	$tomorrow  = mktime (0, 0, 0, date("m")  , date("d")+1, date("Y"));
	$lastmonth = mktime (0, 0, 0, date("m")-1, date("d"),  date("Y"));
	$nextyear  = mktime (0, 0, 0, date("m"),  date("d"),  date("Y")+1);

	echo $tomorrow."<br>";
	echo $lastmonth."<br>";
	echo $nextyear."<br>";

	echo "Data ontem: " . "<br><br>";

	echo 'Dia: ' . date('d', strtotime('-1 day')) . "<br>";
	echo 'Mês: ' . date('m') . "<br>";
	echo 'Ano: ' . date('Y') . "<br>";

	echo "<br>" . "Data atual: " . "<br><br>";

	echo 'Dia: ' . date('d') . "<br>";
	echo 'Mês: ' . date('m') . "<br>";
	echo 'Ano: ' . date('Y') . "<br>";

	echo "<br>" . "Data amanha: " . "<br><br>";

	echo 'Dia: ' . date('d', strtotime('+1 day')) . "<br>";
	echo 'Mês: ' . date('m', strtotime('+1 day')) . "<br>";
	echo 'Ano: ' . date('Y') . "<br>";
	


	$primeiraData; $segundaData;

	/* Requisição para os três casos possíveis de datas */
	$dataAtual =  date('d');
	$dataAnt =  date('d', strtotime('-1 day'));
	$dataProx = date('d', strtotime('+1 day'));

	
	
	//Verifica se o próximo dia do mês será uma virada;
	if ( date('d', strtotime('+1 day')) == "1" ) {

		echo "virou o mês 1";
		$mesAno = date('m', strtotime('+1 month')) . "/" . date('Y');
	} else {

		/* Requisição do mês e ano atual */
		$mesAno = date('m') . "/" . date('Y');
	}
	if ( date('d', strtotime('-1 day')) == "30" || date('d', strtotime('-1 day')) == "31" || date('d', strtotime('-1 day')) == "29" || date('d', strtotime('-1 day')) == "28" ) {

		echo "virou o mês 2";
		$mesAno = date('m', strtotime('-1 month')) . "/" . date('Y');

	} else {

		/* Requisição do mês e ano atual */
		$mesAno = date('m') . "/" . date('Y');
	}



	/* Instanciamento das datas em extenso */
	$ontem = $dataAnt."/".$mesAno;
	$hoje = $dataAtual."/".$mesAno;
	$amanha = $dataProx."/".$mesAno;
	/* String de testes */		
	//echo $dataAtual . "/" . $mesAno;
	//echo date('d/m/Y') . '<br />';ano

	echo "<br><br>";

	///Simula-se uma data para transição de mês;
	$dataSimulada = '28-02-2019';
	echo "Teste da data simulada: " . $dataSimulada . "<br>";
	$formatoDataSimulada = date('d/m/Y', strtotime("+1 days",strtotime($dataSimulada))) . "<br>";
	echo "Teste da data alterada: " . $formatoDataSimulada;
	$formatoDataSimulada = date('d/m/Y', strtotime("-1 days",strtotime($dataSimulada))) . "<br>";
	echo "Teste da data alterada: " . $formatoDataSimulada;

	$dataBR = "20/02/2018 20:00";
	echo "<br>" . $dataBR . "<br>";

	echo substr($dataBR, 11, 5);
?>

