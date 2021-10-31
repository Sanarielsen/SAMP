<?php

	//Recebe as informações via post da pagina anterior;
	$action = $_POST['txtAcaoCadastro'];

	//Verifica qual método será utilizado na página de cadastro detalhe;
	if ($action == "novo") {

		//Abre a sessão para transmitir esse arquivo para o outro php;
		session_start();
		//Instancia o valor da variável de ação para a sessão;
		$_SESSION['action'] = $action;			

		//Redireciona para a página de cadastro_detalhe;
		header ('Location: cadastro_detalhe.php');

	} else if ($action == "alterar") {

		//Abre a sessão para transmitir esse arquivo para o outro php;
		session_start();
		//Instancia o valor da variável de ação para a sessão;
		$_SESSION['action'] = $action;

		//Grava-se as variáveis transmitidas pelo formulário anterior;

		//Cria-se o vetor de sessão com os dados do cliente;
		//$_SESSION['cliente'] = array();
		//Preenche com as informações		
		//array_push($_SESSION['clienteCorrespondencia'], $_POST['txtIdentificadorLocalizacao']); // adiciona no array


		//Dados da entidade de cliente;
		$_SESSION['identificadorCliente'] = $_POST['txtIdentificadorCliente'];
		$_SESSION['razaoSocialCliente'] = $_POST['txtRazaoSocialCliente'];
		$_SESSION['fantasiaCliente'] = $_POST['txtFantasiaCliente'];
		$_SESSION['tipoCliente'] = $_POST['txtTipoCliente'];
		$_SESSION['protocoloCliente'] = $_POST['txtProtocoloCliente'];

		//$_SESSION['fundacaoCliente'] = $_POST['txtFundacaoCliente'];

		//Inclui-se os métodos para otimização de processos;
		include "functions.php";
		//Recebe-se a data da fundação cadastrada no sistema em formato MYSQL
		$dataFundacao = trim($_POST['txtFundacaoCliente']);
		//echo "Data cadastrada: " . $dataFundacao . "<br>" ;
		//Inicia-se o procedimento para conversão da data MYSQL para BR
		$dataFundacaoBR = formatoDataBR($dataFundacao);
		//echo "Data formatada: " . $dataFundacaoBR . "<br>" ;
		//Inclui-se a data em formato BR na nessa sessão;
		$diaFundacao = substr($dataFundacaoBR, 0, 2);
		$mesFundacao = substr($dataFundacaoBR, 3, 2);
		$anoFundacao = substr($dataFundacaoBR, 6, 4);
		//echo "Data separada = Dia - " . $diaFundacao . " / Mês - " .  $mesFundacao . " / Ano - " . $anoFundacao; 
		$_SESSION['diaFundacaoCliente'] = $diaFundacao;
		$_SESSION['mesFundacaoCliente'] = $mesFundacao;
		$_SESSION['anoFundacaoCliente'] = $anoFundacao;

		//Dados da entidade de localização;
		$_SESSION['identificadorLocalizacao'] = $_POST['txtIdentificadorLocalizacao'];
		$_SESSION['cepLocalizacao'] = $_POST['txtCepLocalizacao'];
		$_SESSION['lougradouroLocalizacao'] = $_POST['txtLougradouroLocalizacao'];
		$_SESSION['bairroLocalizacao'] = $_POST['txtBairroLocalizacao'];
		$_SESSION['cidadeLocalizacao'] = $_POST['txtCidadeLocalizacao'];
		$_SESSION['estadoLocalizacao'] = $_POST['txtEstadoLocalizacao'];
		$_SESSION['caixaPostalLocalizacao'] = $_POST['txtCaixaPostalLocalizacao'];
		$_SESSION['telefoneLocalizacao'] = $_POST['txtTelefoneLocalizacao'];
		$_SESSION['emailLocalizacao'] = $_POST['txtEmailLocalizacao'];
		$_SESSION['siteLocalizacao'] = $_POST['txtSiteLocalizacao'];
		$_SESSION['contatoLocalizacao'] = $_POST['txtContatoLocalizacao'];
		//Dados da entidade de correspondência;
		$_SESSION['identificadorCorrespondencia'] = $_POST['txtIdentificadorCorrespondencia'];
		$_SESSION['cepCorrespondencia'] = $_POST['txtCepCorrespondencia'];
		$_SESSION['lougradouroCorrespondencia'] = $_POST['txtLougradouroCorrespondencia'];
		$_SESSION['bairroLocalizacao'] = $_POST['txtBairroLocalizacao'];
		$_SESSION['cidadeCorrespondencia'] = $_POST['txtCidadeCorrespondencia'];
		$_SESSION['estadoCorrespondencia'] = $_POST['txtEstadoCorrespondencia'];
		$_SESSION['caixaPostalCorrespondencia'] = $_POST['txtCaixaPostalCorrespondencia'];
		$_SESSION['telefoneCorrespondencia'] = $_POST['txtTelefoneCorrespondencia'];
		$_SESSION['contatoCorrespondencia'] = $_POST['txtContatoCorrespondencia'];
		//Redireciona para a página de cadastro_detalhe;
		header ('Location: cadastro_detalhe.php');
	}
	else if ($action == "excluir") {

		echo "Ação de exclusão pronta para iniciar - idCliente: " . $_POST['idClienteExcluir'];

		//Id que terá sua linha referenciada para exclusão do item;
		$identificador = $_POST['idClienteExcluir'];
		//Inicia-se uma conexão com o banco de dados;
		include "connection.php";		
		//Query que será executada no banco;
		$sqlProcedure = "CALL uspDeletarCliente($identificador);";
		//Execução e resultado dessa query;
		$procedureString = mysqli_query($conexao, $sqlProcedure) or die (mysqli_error($conexao)) ;
		//Verifica se a query foi executada sem erros ou interrupções;
		if ($procedureString) {
			/* Mensagem amigável ao usuário informando do resultado positivo */
			echo "<script> alert('Informações do cliente e seus dependentes excluidas com sucesso') </script>";
			/* Redireciona o mesmo para a página de cadastros novamente */
			echo "<script> location.href='cadastros.php' </script>";
		}
		//Caso ocorra algum erro...
		else {
			/* Mensagem amigável ao usuário informando do resultado negativo */
			echo "<script> alert('Ocorreu algum erro durante o momento da exclusão, tente novamente') </script>";
			/* Redireciona o mesmo para a página de cadastros novamente */
			echo "<script> location.href='cadastros.php' </script>";
		}
	}  
	else {

		echo "Houve algum erro interno, por favor, tente novamente ou comunique a equipe desenvolvedora";
		header ('Location: pedido.php');
	}
?>