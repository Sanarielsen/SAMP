<?php 
	
	//String para testes;
	echo 
	"Acao a ser executada: " . $_POST['txtAcaoDetalhe'] . "<br>";

	$cliente = trim($_POST['txtIdentificadorCliente']);
	//echo "<br> Cliente: " . $cliente;
	$clienteLocalizacao = trim($_POST['txtIdentificadorLocalizacao']);
	//echo "<br> ClienteLocalização: " . $cliente;
	$clienteCorrespondencia = trim($_POST['txtIdentificadorCorrespondencia']);
	//echo "<br> ClienteCorrespondencia: " . $cliente;
	//echo "<br>=================================================================";
	$clienteRazaoSocial = trim($_POST['txtNomeSocial']);
	//echo "<br> Razão Social: " . $clienteRazaoSocial;
	$clienteTipoPessoa = trim($_POST['txtTipoPessoa']);
	//echo "<br> Tipo: " . $clienteTipoPessoa;
	$clienteProtocolo = trim($_POST['txtProtocolo']);
	//echo "<br> Protocolo: " . $clienteProtocolo;
	$clienteNomeFantasia = trim($_POST['txtNomeFantasia']);
	//echo "<br> Nome Fantasia: " . $clienteNomeFantasia;

	//Captura-se a data, mês e ano enviados pelos selects e pela caixa de texto;
	$diaFundacao = trim($_POST['sltDiaFundacao']);
	$mesFundacao = trim($_POST['sltMesFundacao']);
	$anoFundacao = trim($_POST['txtAnoFundacao']);
	//echo "Data: " . $diaFundacao . "/" . $mesFundacao . "/" . $anoFundacao;
	//Inclu-se os métodos para otimização de processos;
	include "functions.php";
	//A data da fundação recebe os parametros de data, mes e ano enviados;
 	$dataFundacao = $diaFundacao . "/" . $mesFundacao . "/" . $anoFundacao;
 	//A data é formatada para envio ao MYSQL;
 	$clienteDataFundacaoMYSQL = formatoDataMYSQL($dataFundacao);
	//echo "<br> " . $dataFundacaoMYSQL;

	//echo "<br>=================================================================";
	$localizacaoCep = trim($_POST['txtCEPL']);
	//echo "<br> Localizacao Cep: " . $localizacaoCep;
	$localizacaoLougradouro = trim($_POST['txtLougradouroL']);
	//echo "<br> Localizacao Lougradouro: " . $localizacaoLougradouro;
	$localizacaoBairro = trim($_POST['txtBairroL']);
	//echo "<br> Localizacao Bairro: " . $localizacaoBairro;
	$localizacaoCidade = trim($_POST['txtCidadeL']);
	//echo "<br> Localizacao Cidade: " . $localizacaoCidade;
	$localizacaoEstado = trim($_POST['txtEstadoL']);
	//echo "<br> Localizacao Estado: " . $localizacaoEstado;
	$localizacaoCaixaPostal = trim($_POST['txtCaixaPostalL']);
	//echo "<br> Localizacao Caixa Postal: " . $localizacaoCaixaPostal;
	$localizacaoTelefone = trim($_POST['txtTelefoneL']);
	//echo "<br> Localizacao Telefone: " . $localizacaoTelefone;
	$localizacaoEmail = trim($_POST['txtEmailL']);
	//echo "<br> Localizacao Email: " . $localizacaoEmail;
	$localizacaoSite = trim($_POST['txtSiteL']);
	//echo "<br> Localizacao Site: " . $localizacaoSite;
	$localizacaoContato = trim($_POST['txtContatoL']);
	//echo "<br> Localizacao Contato: " . $localizacaoContato;
	//echo "<br>=================================================================";
	$correspondenciaCep = trim($_POST['txtCepC']);
	//echo "<br> Correspondencia Cep: " . $correspondenciaCep;
	$correspondenciaLougradouro = trim($_POST['txtLougradouroC']);
	//echo "<br> Correspondencia Lougradouro: " . $correspondenciaLougradouro;
	$correspondenciaBairro = trim($_POST['txtBairroC']);
	//echo "<br> Correspondencia Bairro: " . $correspondenciaBairro;
	$correspondenciaCidade = trim($_POST['txtCidadeC']);	
	//echo "<br> Correspondencia Cidade: " . $correspondenciaCidade;
	$correspondenciaEstado = trim($_POST['txtEstadoC']);
	//echo "<br> Correspondencia Estado: " . $correspondenciaEstado;
	$correspondenciaCaixaPostal = trim($_POST['txtCaixaPostalC']);
	//echo "<br> Correspondencia Caixa Postal: " . $correspondenciaCaixaPostal;
	$correspondenciaTelefone = trim($_POST['txtTelefoneC']);
	//echo "<br> Correspondencia Telefone: " . $correspondenciaTelefone;
	$correspondenciaContato = trim($_POST['txtContatoC']);
	//echo "<br> Correspondencia Contato: " . $correspondenciaContato;
	//echo "<br>=================================================================";

	//Instancia a variável que receberá o action via post;
	$action = $_POST['txtAcaoDetalhe'];

	if ($action == "novo") {

		//Inicia-se a conexão com o banco de dados;
		include "connection.php";

		//Execução da primeira procedure de cliente;
		$procedureString = mysqli_query($conexao, "CALL uspInserirClienteComEnderecos
			(

				'$clienteRazaoSocial','$clienteTipoPessoa','$clienteProtocolo','$clienteNomeFantasia','$clienteDataFundacaoMYSQL',

				'$localizacaoCep','$localizacaoLougradouro','$localizacaoBairro','$localizacaoCidade',
				'$localizacaoEstado','$localizacaoCaixaPostal','$localizacaoTelefone','$localizacaoEmail','$localizacaoSite','$localizacaoContato',

				'$correspondenciaCep','$correspondenciaLougradouro','$correspondenciaBairro','$correspondenciaCidade',
				'$correspondenciaEstado','$correspondenciaCaixaPostal','$correspondenciaTelefone','$correspondenciaContato'

			);") or die (mysqli_error($conexao)) ;

		//Verifica-se a query foi executada com sucesso;
		if ($procedureString) {

			echo "<script>  

				alert('Informações do cliente foram inseridas com sucesso');
				location.href='cadastros.php';
			</script>";
		} 
		else {

			echo "<br> Erro ao executar a clientela";
		}

	} else if ($action == "alterar") {		

		//Inicia-se a conexão com o banco de dados;
		include "connection.php";

		//Execução da primeira procedure de cliente;
		$procedureString = mysqli_query($conexao, "CALL uspAtualizarClienteComEnderecos
			(

				'$cliente','$clienteRazaoSocial','$clienteTipoPessoa','$clienteProtocolo','$clienteNomeFantasia','$clienteDataFundacaoMYSQL',

				'$clienteLocalizacao','$localizacaoCep','$localizacaoLougradouro','$localizacaoBairro','$localizacaoCidade',
				'$localizacaoEstado','$localizacaoCaixaPostal','$localizacaoTelefone','$localizacaoEmail','$localizacaoSite','$localizacaoContato',

				'$clienteCorrespondencia','$correspondenciaCep','$correspondenciaLougradouro','$correspondenciaBairro','$correspondenciaCidade',
				'$correspondenciaEstado','$correspondenciaCaixaPostal','$correspondenciaTelefone','$correspondenciaContato'

			);") or die (mysqli_error($conexao)) ;

		//Verifica-se a query foi executada com sucesso;
		if ($procedureString) {

			echo "<script>  

				alert('Informações do cliente foram atualizadas com sucesso');
				location.href='cadastros.php';
			</script>";
		} 
		else {

			echo "<br> Erro ao executar a clientela";
		}

	} else {

		echo "<br> Houve um erro ou redirecionamento inadequado, tente novamente ou entre em contato com a equipe desenvolvedora";
	}

	//header('Location: cadastro_detalhe.php');
?>