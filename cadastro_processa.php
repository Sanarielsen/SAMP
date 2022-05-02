<?php
	
	//Verifica se a variável de ação foi enviada para este documento;
	if ( isset($_POST['txtAcaoDetalhe'])) {

		//Caso esteja no caso de inserção de um novo cliente
		if ( $_POST['txtAcaoDetalhe'] == "Inserir" ) {

			echo '<script> console.log("cadastro_processa/inserir") </script>';

			//Inicia-se a conexão com o banco de dados;
			require ("ConnectionMYSQL/connection.php");
			//Inicia-se a conexão com a camada de negócios;
			require ("Negocios/clienteNegocios.php");
			//Inicia-se a conexão com a camada de objetos;
			require ("ObjetoTransferencia/cliente.php");

			//Instancia-se o objeto de cliente para a requisição dos dados enviados para esta sessão;
			$cliente = new Cliente();
			//Atribuí-se os dados do cliente para esta variável;
			$cliente->setRazaoSocial(trim($_POST['txtNomeSocial']));
			$cliente->setTipoPessoa(trim($_POST['txtTipoPessoa']));
			$cliente->setProtocolo(trim($_POST['txtProtocolo']));
			$cliente->setNomeFantasia(trim($_POST['txtNomeFantasia']));

			//Nesse método, é concatenado as variáveis representantes ao dia, mês e ano em formato MYSQL;
			$dataFundacaoMYSQL = $cliente->concatenarData(
					"MYSQL",                   //Formato;
					$_POST['sltDiaFundacao'],  //Dia;
					$_POST['sltMesFundacao'] , //Mês;
					$_POST['txtAnoFundacao']); //Ano;
			//Atribuí-se esta variável em formato MYSQL para o objeto;
			$cliente->setDataFundacao(trim($dataFundacaoMYSQL));

			//Instancia-se os procedimentos de negócios do cliente;
			$clienteNegocios = new ClienteNegocios();
			//Inicia-se o procedimento para inserir este cliente;
			$identificadorClienteNovo = $clienteNegocios->inserirCliente($cliente);
			//Verifica-se se o resultado não foi vazio ou maior que zero para prosseguir nos inserts;
			if ( $identificadorClienteNovo > 0 && !empty($identificadorClienteNovo) ) {

				//Inicia-se a conexão com a camada de negocios;
				require ("Negocios/clienteLocalizacaoNegocios.php");
				//Inicia-se a conexão com a camada de objetos;
				require ("ObjetoTransferencia/clienteLocalizacao.php");

				//Instancia-se o objeto de cliente localização para requisição dos dados enviados nessa sessão;
				$clienteLocalizacao = new ClienteLocalizacao();

				//Atribuí-se os dados do cliente localização para este objeto;
				$clienteLocalizacao->setCliente($identificadorClienteNovo);
				$clienteLocalizacao->setCEP($_POST['txtCEPL']);
				$clienteLocalizacao->setLougradouro($_POST['txtLougradouroL']);
				$clienteLocalizacao->setBairro($_POST['txtBairroL']);
				$clienteLocalizacao->setCidade($_POST['txtCidadeL']);
				$clienteLocalizacao->setEstado($_POST['txtEstadoL']);
				$clienteLocalizacao->setCaixaPostal($_POST['txtCaixaPostalL']);
				$clienteLocalizacao->setTelefone($_POST['txtTelefoneL']);
				$clienteLocalizacao->setEmail($_POST['txtEmailL']);
				$clienteLocalizacao->setSite($_POST['txtSiteL']);
				$clienteLocalizacao->setContato($_POST['txtContatoL']);

				//Instancia-se os procedimentos de negocios desta localização do cliente;
				$clienteLocalizacaoNegocios = new ClienteLocalizacaoNegocios();

				//Inicia-se o procedimento para inserir este endereço do cliente;
				$identificadorLocalizacaoNova = $clienteLocalizacaoNegocios->inserirClienteLocalizacao($clienteLocalizacao);

				//Verifica-se se o resultado não foi vazio ou maior que zero para prosseguir nos inserts;
				if ( $identificadorLocalizacaoNova > 0 && !empty($identificadorLocalizacaoNova) ) {

					//Inicia-se a conexão com a camada de negocios;
					require ("Negocios/clienteCorrespondenciaNegocios.php");
					//Inicia-se a conexão com a camada de objetos;
					require ("ObjetoTransferencia/clienteCorrespondencia.php");

					//Instancia o objeto de cliente correspondencia para requisição dos dados enviados nessa sessão;
					$clienteCorrespondencia = new ClienteCorrespondencia();

					//Atribui-se os dados do cliente da correspondencia para este objeto;
					$clienteCorrespondencia->setCliente($identificadorClienteNovo);
					$clienteCorrespondencia->setCEP($_POST['txtCepC']);
					$clienteCorrespondencia->setLougradouro($_POST['txtLougradouroC']);
					$clienteCorrespondencia->setBairro($_POST['txtBairroC']);
					$clienteCorrespondencia->setCidade($_POST['txtCidadeC']);
					$clienteCorrespondencia->setEstado($_POST['txtEstadoC']);
					$clienteCorrespondencia->setCaixaPostal($_POST['txtCaixaPostalC']);
					$clienteCorrespondencia->setTelefone($_POST['txtTelefoneC']);
					$clienteCorrespondencia->setContato($_POST['txtContatoC']);		

					//Instancia-se os procedimentos de negócios desta localização de correspondencia;
					$clienteCorrespondenciaNegocios = new ClienteCorrespondenciaNegocios();

					//Inicia-se o procedimento para inserir este cliente com o endereço de correspondencia;
					$identificacaoCorrespondenciaNova = $clienteCorrespondenciaNegocios->inserirClienteCorrespondencia($clienteCorrespondencia);

					//Verifica-se se o resultado não foi vazio ou maior que zero para prosseguir no processo;
					if ( $identificacaoCorrespondenciaNova > 0 && !empty($identificacaoCorrespondenciaNova) ) {

						echo "<script>  

							alert('Informações do cliente foram cadastradas com sucesso');
							location.href='cadastros.php';
						</script>";
					} else {

						echo "<script>  

							alert('Houve um problema para cadastrar este cliente, por favor, tente novamente');
							location.href='cadastros.php';
						</script>";
					}
				}

			}
			
		//Caso esteja no caso de alteração de um cliente;
		} else 
		if ( $_POST['txtAcaoDetalhe'] == "Alterar" ) {

			echo '<script> console.log("cadastro_processa/alterar") </script>';

			//Inicia-se a conexão com o banco de dados;
			require ("ConnectionMYSQL/connection.php");
			//Inicia-se a conexão com a camada de negócios;
			require ("Negocios/clienteNegocios.php");
			//Inicia-se a conexão com a camada de objetos;
			require ("ObjetoTransferencia/cliente.php");

			//Instancia-se o objeto de cliente para a requisição dos dados enviados para esta sessão;
			$cliente = new Cliente();
			//Atribuí-se os dados do cliente para esta variável;
			$cliente->setIdentificador(trim($_POST['txtIdentificadorCliente']));
			$cliente->setRazaoSocial(trim($_POST['txtNomeSocial']));
			$cliente->setTipoPessoa(trim($_POST['txtTipoPessoa']));
			$cliente->setProtocolo(trim($_POST['txtProtocolo']));
			$cliente->setNomeFantasia(trim($_POST['txtNomeFantasia']));

			//Nesse método, é concatenado as variáveis representantes ao dia, mês e ano em formato MYSQL;
			$dataFundacaoMYSQL = $cliente->concatenarData(
					"MYSQL",                   //Formato;
					$_POST['sltDiaFundacao'],  //Dia;
					$_POST['sltMesFundacao'] , //Mês;
					$_POST['txtAnoFundacao']); //Ano;
			//Atribuí-se esta variável em formato MYSQL para o objeto;
			$cliente->setDataFundacao(trim($dataFundacaoMYSQL));

			//Instancia-se os procedimentos de negócios do cliente;
			$clienteNegocios = new ClienteNegocios();

			//Inicia-se o procedimento para alterar este cliente;
			$identificadorClienteAtualizado = $clienteNegocios->alterarCliente($cliente);

			//Verifica-se se o resultado não foi vazio ou maior que zero para prosseguir nos inserts;
			if ( $identificadorClienteAtualizado > 0 && !empty($identificadorClienteAtualizado) ) {

				//Inicia-se a conexão com a camada de negocios;
				require ("Negocios/clienteLocalizacaoNegocios.php");
				//Inicia-se a conexão com a camada de objetos;
				require ("ObjetoTransferencia/clienteLocalizacao.php");

				//Instancia-se o objeto de cliente localização para requisição dos dados enviados nessa sessão;
				$clienteLocalizacao = new ClienteLocalizacao();

				//Atribuí-se os dados do cliente localização para este objeto;
				$clienteLocalizacao->setIdentificador($_POST['txtIdentificadorLocalizacao']);
				$clienteLocalizacao->setCliente($identificadorClienteAtualizado);
				$clienteLocalizacao->setCEP($_POST['txtCEPL']);
				$clienteLocalizacao->setLougradouro($_POST['txtLougradouroL']);
				$clienteLocalizacao->setBairro($_POST['txtBairroL']);
				$clienteLocalizacao->setCidade($_POST['txtCidadeL']);
				$clienteLocalizacao->setEstado($_POST['txtEstadoL']);
				$clienteLocalizacao->setCaixaPostal($_POST['txtCaixaPostalL']);
				$clienteLocalizacao->setTelefone($_POST['txtTelefoneL']);
				$clienteLocalizacao->setEmail($_POST['txtEmailL']);
				$clienteLocalizacao->setSite($_POST['txtSiteL']);
				$clienteLocalizacao->setContato($_POST['txtContatoL']);

				//Instancia-se os procedimentos de negocios desta localização do cliente;
				$clienteLocalizacaoNegocios = new ClienteLocalizacaoNegocios();

				//Inicia-se o procedimento para inserir este endereço do cliente;
				$identificadorLocalizacaoAtualizada = $clienteLocalizacaoNegocios->alterarClienteLocalizacao($clienteLocalizacao);

				//Verifica-se se o resultado não foi vazio ou maior que zero para prosseguir nos inserts;
				if ( $identificadorLocalizacaoAtualizada > 0 && !empty($identificadorLocalizacaoAtualizada) ) {

					//Inicia-se a conexão com a camada de negocios;
					require ("Negocios/clienteCorrespondenciaNegocios.php");
					//Inicia-se a conexão com a camada de objetos;
					require ("ObjetoTransferencia/clienteCorrespondencia.php");

					//Instancia o objeto de cliente correspondencia para requisição dos dados enviados nessa sessão;
					$clienteCorrespondencia = new ClienteCorrespondencia();

					//Atribui-se os dados do cliente da correspondencia para este objeto;
					$clienteCorrespondencia->setIdentificador($_POST['txtIdentificadorCorrespondencia']);
					$clienteCorrespondencia->setCliente($identificadorClienteAtualizado);
					$clienteCorrespondencia->setCEP($_POST['txtCepC']);
					$clienteCorrespondencia->setLougradouro($_POST['txtLougradouroC']);
					$clienteCorrespondencia->setBairro($_POST['txtBairroC']);
					$clienteCorrespondencia->setCidade($_POST['txtCidadeC']);
					$clienteCorrespondencia->setEstado($_POST['txtEstadoC']);
					$clienteCorrespondencia->setCaixaPostal($_POST['txtCaixaPostalC']);
					$clienteCorrespondencia->setTelefone($_POST['txtTelefoneC']);
					$clienteCorrespondencia->setContato($_POST['txtContatoC']);		

					//Instancia-se os procedimentos de negócios desta localização de correspondencia;
					$clienteCorrespondenciaNegocios = new ClienteCorrespondenciaNegocios();

					//Inicia-se o procedimento para inserir este cliente com o endereço de correspondencia;
					$identificacaoCorrespondenciaAtualizado = $clienteCorrespondenciaNegocios->alterarClienteCorrespondencia($clienteCorrespondencia);

					//Verifica-se se o resultado não foi vazio ou maior que zero para prosseguir no processo;
					if ( $identificacaoCorrespondenciaAtualizado > 0 && !empty($identificacaoCorrespondenciaAtualizado) ) {

						echo "<script>  

							alert('Informações do cliente foram atualizadas com sucesso');
							location.href='cadastros.php';
						</script>";
					} else {

						echo "<script>  

							alert('Houve um problema para atualizadas este cliente, por favor, tente novamente');
							location.href='cadastros.php';
						</script>";
					}
				} 
			}
		} else 
		if ( $_POST['txtAcaoDetalhe'] == "Excluir" ) {

			//Inicia-se a conexão com o banco de dados;
			require ("ConnectionMYSQL/connection.php");
			//Inicia-se a conexão com a camada de negócios;
			require ("Negocios/clienteNegocios.php");

			//Instancia os métodos do banco de dados do cliente;
			$clienteNegocios = new ClienteNegocios();

			//Inicia-se o método para exclusão deste cliente do sistema;
			$identificadorExcluido = $clienteNegocios->excluirCliente($_POST['txtIdentificadorCliente']);

			//O resultado do método do banco, irá dizer se a exclusão foi realizada ou não.
			if ($identificadorExcluido > 0 && !empty($identificadorExcluido)) {

				echo "<script>  

					alert('Informações do cliente foram excluídas com sucesso');
					location.href='cadastros.php';
				</script>";
			} else {

				echo "<script>  

					alert('Houve um problema para execução deste procedimento, tente novamente');
					location.href='cadastros.php';
				</script>";
			}

		} else {

			echo '<script> console.log("cadastro_processa/erro") </script>';
		} 
	}
	//Caso seja algum engraçadinho;
	else {

		echo '<script> console.log("cadastro_processa/erro") </script>';
	} 
?>