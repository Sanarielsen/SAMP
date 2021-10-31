<?php
	
	//Função para alterar o formato da data para o brasileiro - 00/00/0000;
	function formatoDataBR($data) {

	    $dataFormatoBR = substr($data,8,2)."/".substr($data,5,2)."/".substr($data,0,4);

	    return $dataFormatoBR;
	}

	//Função para alterar o formato da data para o inglês - 0000-00-00;
	function formatoDataMYSQL($data) {

	    $dataFormatoMYSQL = substr($data,6,4)."-".substr($data,3,2)."-".substr($data,0,2);

	    return $dataFormatoMYSQL;
	}
?>