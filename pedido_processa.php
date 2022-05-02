<?php

	//Mensagem via console;
	echo '<script> console.log("pedido_processa/acessoInicial") </script>';
	//Mensagem a ser mostrada na caixa de mensagem ao usuário ao término da execução da query;
	$messageString = "";
	//Local em que o usuário será redirecionado ao término da execução da query;
	$redirectString = "";
	//Variável que serve como parâmetro de permissão para execução do algoritmo;
	$permissionSuccess = false;
	//Validador de redirecionamento para novo pedido com pagamento;
	$permissionCash = "off";

	//Verifica-se se este pedido veio pelo redirecionamento correto...
	if ( isset($_POST['txtAcaoPedido']) && !empty($_POST['txtAcaoPedido']) ) {		

		//Mensagem via console;
		echo '<script> console.log("pedido_processa/acessoPermitido") </script>';
		//Recebe-se o parâmetro de ação enviado via post;
		$action = $_POST['txtAcaoPedido'];
		
		//Verifica-se se esta ação está dentro das possíveis e criadas nesse processamento (Insert, Update e Delete)
		if ( $action == "novo" || $action == "alterar" || $action == "excluir") {

			//Mensagem via console;
			echo '<script> console.log("pedido_processa/action") </script>';

			//Configuração de fuso horário para o método de data;		
			date_default_timezone_set('America/Sao_Paulo');

			//Esta variável irá demonstrar que o action atual foi aceito pelo processamento;
			$permissionSuccess = true;

			//Importa-se a estrutura de conexão do banco de dados;
			require_once("ConnectionMYSQL/connection.php");
			//Importa-se os objetos de negócios do pedido;
			require_once("Negocios/pedidoNegocios.php");
			//Importa o objeto para armazenamento das informações do pedido;
			require_once("ObjetoTransferencia/pedido.php");

			//Instancia o objeto do pedido nesta variável;
			$pedido = new Pedido("","","","","");					
			//Instancia-se os procedimentos dos pedidos;
			$pedidoNegocios = new PedidoNegocios();

			//Três tipos de processos diferentes...
			switch($action) 
			{	

				//Inicio do processo para inserir um novo pedido ===================================================================================;
				case "novo": 

					//Mensagem via console;
					echo '<script> console.log("pedido_processa/inserirNovoPedido") </script>';

					//Verifica-se o combo box de pagamento está selecionado;
					if ( isset($_POST['cbxPagamentoAgora']) ) {

						//Validação de um processo posterior;
						$permissionCash = $_POST['cbxPagamentoAgora'];				
					}
					//Recebe-se os campos e informações necessários para progressão da inserção;
					$pedido->setIdentificadorCliente($_POST['txtIdentificadorCliente']);					
					$pedido->setDescricao($_POST['txtPedidoServico']);
					$pedido->setObservacao($_POST['txtPedidoObservacao']);
					$pedido->setDataCriacao(date('Y-m-d H:i:s'));
					//Executa o procedimento para inserir um novo pedido tendo o resultado da query nesta variável;
					$resultPedidoProcess = $pedidoNegocios->inserirPedido($pedido);
					//Verifica a mensagem de resultado da query, caso for número...
					if( is_numeric($resultPedidoProcess) ) {

						//Mensagem via console;
						echo '<script> console.log("pedido_processa/inserirNovoPedido/QuerySuccess") </script>';

						//Neste ponto, ao cadastrar o pedido, deve-se verificar o estado finânceiro atual, ou seja...
						//Caso a caixa de seleção esteja ativada... o mesmo cadastrará os pagamentos agora;
						if ($permissionCash === "on") {

							//Esta variável irá mostrar a mensagem de texto positiva da query executada, ou seja, o pedido foi inserido e será redirecionado para os pagamentos;
							$messageString = "Parabens! Pedido criado com sucesso, redirecionando a tela de pagamentos...";
							//Essa variável contém a página que o usuário será redirecionado após encerrar a chave;
							$redirectString = "pedidos.php";	
						}
						//Caso contrário, apenas irá direcionar para a página principal dos pedidos normalmente;
						else {	

							//Esta variável irá mostrar a mensagem de texto positiva da query executada, ou seja, o pedido foi inserido;
							$messageString = "Parabens! Pedido criado com sucesso";
							//Essa variável contém a página que o usuário será redirecionado após encerrar a chave;
							$redirectString = "pedidos.php";
						}							
					}
					else {

						//Esta variável demonstrará o erro que ocorreu na query, ou seja, o pedido nao foi inserido;
						$messageString = "Desculpe! Ocorreu um erro na criação do pedido, tente novamente";
						//Essa variável contém a página que o usuário será redirecionado após encerrar a chave;
						$redirectString = "pedidos.php";
					}
				//Final do processo para inserir um novo pedido;
				break;

				//Inicio do processo para alterar um pedido já existente ===================================================================================;
				case "alterar":

					//Mensagem via console;
					echo '<script> console.log("pedido_processa/alterarPedido") </script>';					
					//Recebe-se os campos e informações necessários para progressão da alteração;										
					$pedido->setIdentificador($_POST['txtPedidoIdentificador']);
					$pedido->setIdentificadorCliente($_POST['txtIdentificadorCliente']);
					$pedido->setDescricao($_POST['txtPedidoServico']);
					$pedido->setObservacao($_POST['txtPedidoObservacao']);
					$pedido->setDataCriacao($_POST['txtPedidoDataCriacao']);
					//Executa o procedimento para alterar um pedido tendo o resultado da query nesta variável;
					$resultPedidoProcess = $pedidoNegocios->alterarPedido($pedido);
					//Verifica a mensagem de resultado da query, caso for número...
					if( is_numeric($resultPedidoProcess) ) {

						//Esta variável irá mostrar a mensagem de texto positiva da query executada, ou seja, o pedido foi alterado;
						$messageString = "Parabens! Pedido alterado com sucesso";
						//Essa variável contém a página que o usuário será redirecionado após encerrar a chave;
						$redirectString = "pedidos.php";												
					}
					else {

						//Esta variável demonstrará o erro que ocorreu na query, ou seja, o pedido nao foi alterado;
						$messageString = "Desculpe! Ocorreu um erro na alteração do pedido, tente novamente";
						//Essa variável contém a página que o usuário será redirecionado após encerrar a chave;
						$redirectString = "pedidos.php";
					}
				//Final do processo para alterar um pedido já existente;
				break;

				//Inicio do processo para excluir um pedido já existente ===================================================================================;
				case "excluir": 

					//Mensagem via console;
					echo '<script> console.log("pedido_processa/excluirPedido") </script>';
					//Recebe-se os campos e informações necessários para progressão da exclusão;			
					$identificadorPedido = $_POST['txtPedidoIdentificador'];	
					//Executa o procedimento para excluir o pedido tendo o resultado da query nesta variável;
					$resultPedidoProcess = $pedidoNegocios->excluirPedido($identificadorPedido);
					//Verifica a mensagem de resultado da query, caso for número...
					if( is_numeric($resultPedidoProcess) ) {

						//Esta variável irá mostrar a mensagem de texto positiva da query executada, ou seja, o pedido foi alterado;
						$messageString = "Parabens! Pedido excluído com sucesso";
						//Essa variável contém a página que o usuário será redirecionado após encerrar a chave;
						$redirectString = "pedidos.php";												
					}
					else {

						//Esta variável demonstrará o erro que ocorreu na query, ou seja, o pedido nao foi alterado;
						$messageString = "Desculpe! Ocorreu um erro exclusão do pedido, tente novamente";
						//Essa variável contém a página que o usuário será redirecionado após encerrar a chave;
						$redirectString = "pedidos.php";
					}

				//Final do processo para excluir um pedido já existente;
				break;

				//Procedimento comum para caso nenhum dos outros sejam atendidos ===================================================================================;
				default:
					echo "Nenhuma ação foi encontrada";
			} 
		}
	}
	else {

		//Esta variável irá demonstrar que o action atual foi aceito pelo processamento;
		$permissionSuccess = false;
		//Esta variável irá mostrar a mensagem de texto positiva da query executada, ou seja, o pedido foi inserido;
		$messageString = "Redirecionameto incorreto! Voltando para o início da sessão...";
		//Essa variável contém a página que o usuário será redirecionado após encerrar a chave;
		$redirectString = "pedidos.php";	
	}

	//Verifica se a query foi executada com sucesso...
	if ( $permissionSuccess ) {

		//Mensagem via console;
		echo '<script> console.log("pedido_processa/positive") </script>';				
		//Envia uma mensagem com a string positiva sobre o processo executado;
		echo "
		<script>  
			alert('" . $messageString ."');
			location.href='" . $redirectString . "';
		</script>";
	}
	//Caso contrário...
	else {

		//Mensagem via console;
		echo '<script> console.log("pedido_processa/negative") </script>';
		//Envia uma mensagem com a string positiva sobre o processo executado;
		echo "
		<script>  
			alert('" . $messageString ."');
			location.href='" . $redirectString . "';
		</script>";				
	}
	
?>