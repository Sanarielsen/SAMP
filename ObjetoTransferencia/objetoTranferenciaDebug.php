
<?php 

	/*=========================== CONFERENCIA =========================*/

	//Inicia-se uma conexão com a classe do objeto;
	/*require_once("conferencia.php");
	//Titulo da sessão
	echo "Zona de testes dos sets e gets - CONFERENCIA <br>";
	//Instancia a classe do objeto a ser testada;
	$conferencia = new Conferencia("", "", "", "", "", "", "");
	//Atribuí os parametros para a classe;
	$conferencia->setIdentificador("1");
	$conferencia->setCliente("5");
	$conferencia->setTipo("Presencial");
	$conferencia->setDescricao("Ir visitar o cliente para acertar logos");
	$conferencia->setData("25/02/2019");
	$conferencia->setEstado("Pêndente...");
	$conferencia->setObservacao("Nenhuma até agora");
	//Mostra os resultados pelos gets;
	echo "Identificador: " . $conferencia->getIdentificador() . "<br>";
	echo "Cliente identificador: " . $conferencia->getCliente() . "<br>";
	echo "Tipo de conferencia: " . $conferencia->getTipo() . "<br>";
	echo "Descrição do evento: " . $conferencia->getDescricao() . "<br>";
	echo "Data do evento: " . $conferencia->getData() . "<br>";
	echo "Estado atual: " . $conferencia->getEstado() . "<br>";
	echo "Observação: " . $conferencia->getObservacao() . "<br>";	
	//Titulo da sessão
	echo "Zona de testes do construtor e detalhes <br>";
	//Instancia a classe do objeto a ser testada como construtor;
	$conferenciaConstructor = new Conferencia("2", "12", "Online", "Acertar detalhes de um determinado pedido", "15/10/2018", "Encerrado", "Tudo ocorreu bem");
	//Retorna os detalhes desta classe nessa variável;
	$detalheConferencia = $conferenciaConstructor->getDetalheConferencia();
	//Exibe o detalhe na tela;
	echo $detalheConferencia;
	//Mostra os resultados pelos gets;
	echo "Identificador: " . $conferenciaConstructor->getIdentificador() . "<br>";
	echo "Cliente identificador: " . $conferenciaConstructor->getCliente() . "<br>";
	echo "Tipo de conferencia: " . $conferenciaConstructor->getTipo() . "<br>";
	echo "Descrição do evento: " . $conferenciaConstructor->getDescricao() . "<br>";
	echo "Data do evento: " . $conferenciaConstructor->getData() . "<br>";
	echo "Estado atual: " . $conferenciaConstructor->getEstado() . "<br>";
	echo "Observação: " . $conferenciaConstructor->getObservacao() . "<br>";*/

	/*=========================== PEDIDO =============================*/
	
	/*//Titulo da sessão:
	echo "<br><b><u>" . " Zona de testes dos sets e gets - PEDIDO" . "</b></u><br>";
	//Inicia-se uma conexão com a classe do objeto;
	require_once("pedido.php");
	//
	//Instancia a classe para testar os sets e gets;
	//
	echo "<br><b>" . "Teste dos seters e geters: " . "</b><br><br>";
	$pedido = new Pedido("", "", "", "", "");
	//Atribuí parâmetros para a classe;
	$pedido->setIdentificador(1);
	$pedido->setIdentificadorCliente(5);
	$pedido->setDescricao("Tratar dos cachorros do vizinho");
	$pedido->setObservacao("O mais pequeno é o raivoso/revoltado");
	$pedido->setDataCriacao("2008-10-05 20:10");
	//Mostra os parâmetros atribuídos da classe;
	echo
		"Identificador: " . $pedido->getIdentificador() . "<br>" .
		"Identificador Cliente: " . $pedido->getIdentificadorCliente() . "<br>" .
		"Serviço: " . $pedido->getDescricao() . "<br>" .
		"Observação: " . $pedido->getObservacao() . "<br>" .
		"Data Criada: " . $pedido->getDataCriacao() . "<br><br>";
	//
	//Instancia a classe pelos gets usando o método construtor
	//
	//Titulo da sessão
	echo "<b>" . "Teste do construtor: " . "</b><br><br>";
	$pedidoConstrutor = new Pedido(
		"2", //Identificador
		"10", //Identificador pedido
		"Correr atrás do elo diamante no lolzinho", //Detalhes do serviço;
		"A season começa no dia 24/01/2019", //Observação do serviço;
		"2018-11-24 18:40" //Data de criação do serviço;
	);
	//Mostra os parâmetros atribuídos pelo construtor;
	echo
		"Identificador: " . $pedido->getIdentificador() . "<br>" .
		"Identificador Cliente: " . $pedido->getIdentificadorCliente() . "<br>" .
		"Serviço: " . $pedido->getDescricao() . "<br>" .
		"Observação: " . $pedido->getObservacao() . "<br>" .
		"Data Criada: " . $pedido->getDataCriacao() . "<br><br>";

	//
	//Teste final do método de detalhe do objeto;
	//
	//Titulo da sessão
	echo "<b>" . "Teste do getDetalhes(): " . "</b><br><br>";
	//Atribuí todos os parâmetros do objeto de pedido nessa variável;
	$pedidoDetalhes = $pedidoConstrutor->getDetalhes();
	//Retorna os parâmetros desta classe nessa variável de detalhe;
	echo "Objeto de Pedido: " . $pedidoDetalhes;*/

	/*=========================== PAGAMENTO =============================*/

	/*//Titulo da sessão:
	echo "<br><b><u>" . " Zona de testes dos sets e gets - PAGAMENTO" . "</b></u><br>";
	//Inicia-se uma conexão com a classe do objeto;
	require_once("pagamento.php");
	//
	// Zona de testes para os setters e getters;
	//
	//Titulo dessa sessão
	echo "<br><b>" . "Teste dos setters e getters: " . "</b><br><br>";
	//Instancia a classe para testar os sets e gets;
	$pagamento = new Pagamento("","","","","","","");
	//Atribuí os parâmetros da classe;
	$pagamento->setIdentificador(50);
	$pagamento->setIdentificadorPedido(25);
	$pagamento->setQuantia('2500.00');
	$pagamento->setForma("Cartão de Crédito");
	$pagamento->setParcela(" x5 ( R$ 500,00 )");
	$pagamento->setReajuste('0');
	$pagamento->setDescricao("Nenhuma consideração para este pagamento;");
	//Mostra os parâmetros do objeto por este echo;
	echo 
	'Identificador - ' . $pagamento->getIdentificador() . '<br>' .
	'Identificador do Pedido - ' . $pagamento->getIdentificadorPedido() . '<br>' .
	'Quantia do pagamento - ' . $pagamento->getQuantia() . '<br>' .
	'Forma de pagamento - ' . $pagamento->getForma() . '<br>' .
	'Parcelas - ' . $pagamento->getParcela() . '<br>' .
	'Reajuste - ' . $pagamento->getReajuste() . '<br>' .
	'Descrição - ' . $pagamento->getDescricao() . '<br>';
	//Quebra sessão;
	echo "<br> <br>";
	//
	// Zona de testes para o construtor e objetoDetalhe;
	//
	//Titulo da sessão
	echo "<b>" . "Teste do construtor: " . "</b><br><br>";
	//Instancia a classe/objeto através do construtor, dando seus parâmetros por ele;
	$pagamentoConstrutor = new Pagamento(
		1, //Identificador
		2, //Identificador Pedido
		500.00, //Quantia a pagar
		"Boleto", //Forma de pagamento
		"x1 ( á vista )", //Parcela-Valor
		2.00, //Rejuste
		"Taxa do boleto" //Descrição do pagamento 
	);
	//Mostra os parâmetros do objeto por este echo;
	echo 
	'Identificador - ' . $pagamentoConstrutor->getIdentificador() . '<br>' .
	'Identificador do Pedido - ' . $pagamentoConstrutor->getIdentificadorPedido() . '<br>' .
	'Quantia do pagamento - ' . $pagamentoConstrutor->getQuantia() . '<br>' .
	'Forma de pagamento - ' . $pagamentoConstrutor->getForma() . '<br>' .
	'Parcelas - ' . $pagamentoConstrutor->getParcela() . '<br>' .
	'Reajuste - ' . $pagamentoConstrutor->getReajuste() . '<br>' .
	'Descrição - ' . $pagamentoConstrutor->getDescricao() . '<br>';
	//Quebra sessão;
	echo "<br> <br>";
	//Titulo da sessão
	echo "<b>" . "Teste do getDetalhes(): " . "</b><br><br>";
	//Atribuí todos os parâmetros do objeto de pedido nessa variável;
	$pagamentoDetalhes = $pagamentoConstrutor->getPagamentoDetalhes();
	//Retorna os parâmetros desta classe nessa variável de detalhe;
	echo "Objeto de Pagamento: " . $pagamentoDetalhes;*/
?>