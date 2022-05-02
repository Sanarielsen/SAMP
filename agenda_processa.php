<?php 

	//Esta página irá receber os dados da "agenda_detalhe" para realizar um procedimento do banco de dados posteriormente;
	
	//Verificação dos parâmetros action para permissão nesta página;
	if ( isset($_POST['txtAcaoAgenda']) && !empty($_POST['txtAcaoAgenda'])) {

		//Instancia a variável que receberá o action via post;
		$action = $_POST['txtAcaoAgenda'];
		//Importa as configurações para conexão com o banco de dados;
		require("ConnectionMYSQL/connection.php");
		//Importa o objeto da conferência
		require("ObjetoTransferencia/conferencia.php");
		//Importa a camada de negócios da conferência
		require("Negocios/conferenciaNegocios.php");
		//Verificamos qual procedimento do banco de dados será realizado;
		//Caso este procedimento seja a inserção de uma nova conferência...
		if ($action == "inserir") {

			//Informa ao console do navegador;
			echo '<script> console.log("agenda_processa/inserir") </script>';
			//Instancia-se o objeto de conferência;
			$conferencia = new Conferencia(
				"", //Identificador da conferência;
				$_POST['cbxClienteConferencia'], //Identificador do cliente;
				$_POST['cbxRepresentanteConferencia'], //Identificador do representante;
				$_POST['cbxTipoConferencia'], //Tipo de conferencia;
				$_POST['cbxEstadoConferencia'], //Estado da conferência;
				$_POST['txaDetalheConferencia'], //Detalhes da conferência;
				$_POST['txtObservacaoConferencia'], //Observação da conferência;				
				"" //Data da conferência
			);	
			//Inicia o tratamento da data enviada do sistema para o servidor MYSQL;
			$dataMYSQL = $conferencia->concatenarData("MYSQL", $_POST['sltDiaConferencia'], $_POST['sltMesConferencia'],  $_POST['txtAnoConferencia']);
			//Atribuí-se as horas dentro desta data (DATETIME - SQL)
			$dateTimeConferencia = $dataMYSQL . " " . $_POST['txtHoraConferencia'].":".$_POST['txtMinutoConferencia'];
			//Atribuí a data em formato SQL para o objeto;
			$conferencia->setData($dateTimeConferencia);
			//Instancia-se o objeto com os procedimentos do banco de dados;
			$conferenciaNegocios = new ConferenciaNegocios();
			//Inicia o procedimento de inserção de um registro no servidor;
			$resultConferencia = $conferenciaNegocios->inserirConferencia($conferencia);

			//Se o resultado for um integer...
			if ( is_numeric($resultConferencia) ) {

				echo "<script>  

					alert('Conferência registrada com sucesso!');
					location.href='agenda.php';
				</script>";
			} else {

				echo "<script>  

					alert('Houve um erro ao registrar a conferência, tente novamente');
					location.href='agenda.php';
				</script>";
			}

		} 
		//Caso este procedimento seja a alteração de uma conferência...
		else 
		if ($action == "alterar") {

			//Informa ao console do navegador;
			echo '<script> console.log("agenda_processa/alterar") </script>';

			//Instancia-se o objeto de conferencia com as informações a serem administradas;
			$conferencia = new Conferencia(
				$_POST['txtIdentificadorConferencia'], //Identificador da conferência;
				$_POST['cbxClienteConferencia'], //Identificador do cliente;
				$_POST['cbxRepresentanteConferencia'], //Identificador do representante;
				$_POST['cbxTipoConferencia'], //Tipo de conferencia;
				$_POST['cbxEstadoConferencia'], //Estado da conferência;
				$_POST['txaDetalheConferencia'], //Detalhes da conferência;
				$_POST['txtObservacaoConferencia'], //Observação da conferência;				
				"" //Data da conferência
			);
			//Inicia o tratamento da data enviada do sistema para o servidor MYSQL;
			$dataMYSQL = $conferencia->concatenarData("MYSQL", $_POST['sltDiaConferencia'], $_POST['sltMesConferencia'],  $_POST['txtAnoConferencia']);
			//Atribuí-se as horas dentro desta data (DATETIME - SQL)
			$dateTimeConferencia = $dataMYSQL . " " . $_POST['txtHoraConferencia'].":".$_POST['txtMinutoConferencia'];
			//Atribuí a data em formato SQL para o objeto;
			$conferencia->setData($dateTimeConferencia);
			//Instancia-se o objeto com os procedimentos do banco de dados;
			$conferenciaNegocios = new ConferenciaNegocios();
			//Inicia o procedimento de inserção de um registro no servidor;
			$resultConferencia = $conferenciaNegocios->alterarConferencia($conferencia);
			//Se o resultado for um integer...
			if ( is_numeric($resultConferencia) ) {

				echo "<script>  

					alert('Conferência alterada com sucesso!');
					location.href='agenda.php';
				</script>";
			} else {

				echo "<script>  

					alert('Houve um erro ao alterar a conferência, tente novamente');
					location.href='agenda.php';
				</script>";
			}			
		}
		//Caso este procedimento seja a exclusão de uma conferência...
		else 
		if ($action == "excluir") {

			//Informa ao console do navegador;
			echo '<script> console.log("agenda_processa/excluir") </script>';

			//Instancia-se o objeto com os procedimentos do banco de dados;
			$conferenciaNegocios = new ConferenciaNegocios();

			//Inicia o procedimento de inserção de um registro no servidor;
			$resultConferencia = $conferenciaNegocios->excluirConferencia($_POST['idConferencia']);
			//Se o resultado for um integer...
			if ( is_numeric($resultConferencia) ) {

				echo "<script>  

					alert('Conferência excluída com sucesso!');
					location.href='agenda.php';
				</script>";
			} else {

				echo "<script>  

					alert('Houve um erro ao excluir a conferência, tente novamente');
					location.href='agenda.php';
				</script>";
			}
		}
		//E caso seja algum engraçadinho...
		else {

			//Informa ao console do navegador;
			echo '<script> console.log("agenda_processa/error102") </script>';

			echo "<br> Houve um erro ou redirecionamento inadequado, tente novamente ou entre em contato com a equipe desenvolvedora";
		}
	}
	//E caso seja algum engraçadinho...
	else {

		//Informa ao console do navegador;
		echo '<script> console.log("agenda_processa/error105") </script>';

		echo "<br> Houve um erro ou redirecionamento inadequado, tente novamente ou entre em contato com a equipe desenvolvedora";
	}

	
	
	

?>