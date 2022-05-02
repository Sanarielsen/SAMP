
<!-- Cria-se o procedimento do javascript para tratamento de códigos -->
<script type="text/javascript">

	//LOG para análise de processos pelo console;
	console.log("Notifications/execute()");

	//Nesta classe, será necessário dois tipos de rotina:
	//* Verificação de quantas pendências possuímos (UNICA);
	//* Verificação se existe alguma conferencia proxima (CONSTANTE);

	//==========================================================================================================================
	//==========================================================================================================================
	// VARIÁVEIS CONSTANTES;
	//==========================================================================================================================
	//==========================================================================================================================

	/* CONFIGURAÇÕES GERAIS */

	//Instancia-se o nome do usuário em que está logado no sistema;
	var nomeUsuario = document.getElementById("txtNomeUsuario").value;

	/* CONFIGURAÇÕES DA NOTIFICAÇÃO DE VERIFICAÇÃO DE QUANTAS CONFERÊNCIAS ESTÃO PRESENTES */

	//Instancia-se o contador que possui a quantidade de conferências em pendencia no sistema;
	var quantPendencias = document.getElementById('txtContadorConferencias').value;
	//Instancia-se as informações a serem exibidas na notificação das pendências;
	var dataNotificationQuantPendencias = {

		titleNotification: "SAMP: Aviso sobre pendência",
		contextNotification: "Bom dia, "+ nomeUsuario +". Você possui " + quantPendencias + " pendência(s) para o dia de hoje",
		iconSAMP: "http://localhost/samp/assets/img/sys/ico_header.png",
		linkRedirect: "http://localhost/samp/pendencias.php"
	}

	/* CONFIGURAÇÕES DA NOTIFICAÇÃO DA QUAL PENDÊNCIA ESTÁ MAIS PRÓXIMAS E AS INFORMAÇÕES RESPECTIVAS DELA */

	//Instancia o conjunto de cronometros programados para mostrar quantos minutos faltam para determinada pendência;
	var listConferenciasCronometros = document.getElementsByName("txtCronoConferencias[]");
	//Instancia um contador para ver as demais posições deste vetor dos cronometros, já que existirá uma rotina para isso;
	var cont = 0;
	//Instancia o número de cronometros que foram enviados para este vetor;
	var pendenciasCount = listConferenciasCronometros.length;
	//Instancia-se as informações a serem exibidas na notificação das pendências;
	var dataNotificationHourPendencias = {

		titleNotification: "SAMP: Aviso sobre pendência",
		contextNotification: "Olá, " + nomeUsuario + "! Você possui comprimissos para daqui uma hora!",
		iconSAMP: "http://localhost/samp/assets/img/sys/ico_header.png",
		linkRedirect: "http://localhost/samp/pendencias.php"
	}
	//Instancia-se o nome do representante envolvido;
	var nomeRepresentantes = document.getElementsByName("txtNomeRepresentante[]");
	//Instancia-se o nome das empresas envolvidas;
	var nomeEmpresas = document.getElementsByName("txtNomeEmpresa[]");
	//Instancia a observação dada a esta conferencia;
	var observacaoConferencias = document.getElementsByName("txtObservacaoConferencia[]");

	//==========================================================================================================================
	//==========================================================================================================================
	// MÉTODOS DAS NOTIFICAÇÕES;
	//==========================================================================================================================
	//==========================================================================================================================

	//Inicia a verificação de quantas conferências estão em pendência no dia de hoje;
	verificarPendenciasAbertas(quantPendencias, dataNotificationQuantPendencias);
	//Inicia a verificação de horário das pendências próximas;
	verificarHorarioPendencias(listConferenciasCronometros, pendenciasCount, dataNotificationHourPendencias, true);

	//Método para verificar quantas conferências estão em pendênte para hoje;
	function verificarPendenciasAbertas(quantPendencias, dataNotify) {

		//LOG para análise de processos pelo console;
		console.log("Notifications/verificarPendenciasAbertas()");

		if (window.Notification&&Notification.permission!=="denied") {

			//Inicia a requisição de permissão para executar a exibição da notificação
			Notification.requestPermission( function() {

				//Variável que contém as configurações para execução desta notificação;
				var notificacaoQuantPendencias = new Notification( 
					//Este que contém o cabeçalho da notificação (titulo)
					dataNotify.titleNotification, 
					//Este que contém todas as demais configurações de conteúdo para o corpo da notificação;
					{
						//Texto da notificação;
						body: dataNotify.contextNotification,
						//Icone da notificação;
						icon: dataNotify.iconSAMP
					//Encerramento do corpo do notificação;
					}						
				//Encerramento do cabeçalho;
				);

				//Dentro deste ciclo de permissão, é iniciado um método de click da variável;
				notificacaoQuantPendencias.onclick = function() {

					//Redirecionamos o usuário para as pendências em questão;
					location.href = dataNotify.linkRedirect;
					//E encerra-se a notificação através desta variável;
					notificacaoQuantPendencias.close();
				}
			//Encerramento do periodo de requisição e criação da notificação;
			})
		//Encerramento do if para verificação se existe permissão dada para este serviço;
		}
	//Encerramento do método para exibição de quantas conferências em pendênte estão em abertas;
	}

	//Método para filtrar dentre todas as conferencias, apenas a mais recente para ser ativada após essa zerar os minutos;
	function filtrarConferenciaProxima(pendenciaCronometros) {

		//LOG para análise de processos pelo console;
		console.log("Notifications/filtrarConferenciaProxima()");
		//Instancia-se o sinalizador se as pendências atuais estão proximas ou não;
		var cronometroStatus = false;
		//Instancia-se o tempo máximo de uma pendência considerada próxima;
		var tempoMaxPendencia = 60;	
		//Instancia-se o tempo da conferencia mais próxima a acontecer;
		var pendenciaAtual = 
			{
				//Tempo desta pendência, tendo limite máximo de 60 minutos
				cronometro:	61,
				//Indice para referenciação das outras informações desta pendência (empresa, representante ...)
				indice:	null	
			}
		//Cria-se essa rotina de repetição para verificar todos os cronometros atuais;
		for ( var i = 0; i < pendenciaCronometros.length; i++ ) {
			//LOG para análise de processos pelo console;
			console.log("Notifications/filtrarConferenciaProxima(" + pendenciaCronometros[i].value + ")");
			//Verifica se a pendencia atual possuí uma hora até o seu horário e se é a menor das atuais;
			if ( (pendenciaCronometros[i].value <= tempoMaxPendencia) && (pendenciaCronometros[i].value > 0) ) {
				//LOG para análise de processos pelo console;
				console.log("Notifications/filtrarConferenciaProxima('Essa está dentre as pendências recentes')");
				//Verifica se este tempo atual é o menor em relação aos outros anteriores;
				if (pendenciaCronometros[i].value < pendenciaAtual.cronometro) {
					//LOG para análise de processos pelo console;
					console.log("Notifications/filtrarConferenciaProxima('Essa pendência é a mais próxima atualmente')");	
					//Atribuí o novo horário mais recente para a variável;
					pendenciaAtual.cronometro = pendenciaCronometros[i].value;
					//Atribuí o indice que representa este cronometro;
					pendenciaAtual.indice = i;
					//Atribuí a permissão para execução da solicitação com este cronometro mais próximo;
					cronometroStatus = true;
				//Encerramento do if de verificação do tempo menor que o anterior;			
				}
			//Encerramento do if de verificação do tempo entre 0 e 60 min;
			}
			//Caso este seja maior que 60min ou menor que 0min...
			else {
				//LOG para análise de processos pelo console;
				console.log("Notifications/filtrarConferenciaProxima('Não se preocupe com esta pendência')");	
			//Encerramento do if de verificação do tempo entre 0 e 60 min;
			}
		//Encerramento do sistema de repetição para percorrer todos os tempos das pendências;
		}	
		//Verifica-se se algum cronometro foi encontrado;
		if (cronometroStatus) {
			//LOG para análise de processos pelo console;
			console.log("Notifications/filtrarConferenciaProxima('Com pendência a resolver em breve')");
			//Retorna o tempo até a pendência em questão;
			return pendenciaAtual;
		}
		//Caso contrário...
		else {
			//LOG para análise de processos pelo console;
			console.log("Notifications/filtrarConferenciaProxima('Sem pendência próxima')");
			//Retorna uma mensagem de erro para o método.
			return "Não foi encontrado uma pendência próxima a acontecer";
		//Encerramento do if de verificação se algum cronometro foi encontrado para prosseguimento;
		}
	}

	//Método para verificar se as conferências que estão em abertas sejam próximas do horário atual ou não;
	function verificarHorarioPendencias(listCronometros, pendenciasCount, dataNotify, status) {

		//LOG para análise de processos pelo console;
		console.log("Notifications/verificarHorarioPendencias()");			
		//Instancia uma variável que constantemente irá se recriar com o uso do Interval;
		var intervalo = window.setInterval(function() {
			//LOG para análise de processos pelo console;
			console.log("Notifications/verificarHorarioPendencias(setInterval-2000)");
			//Verifica se existe alguma pendência em aberta no dia de hoje;
			if (pendenciasCount > 0) {
				//LOG para análise de processos pelo console;
				console.log("Notifications/verificarHorarioPendencias(Pendencia em aberta foi encontrada)");	
				//Instancia-se as informações de tempo e indice para referenciação da solicitação posterioremente;
				var pendenciaAtual = filtrarConferenciaProxima(listConferenciasCronometros);
				//Verifica se algum compromisso está proximo do seu horário marcado... (Não tenha passado e nem depois de uma hora - 60 minutos)
				if (pendenciaAtual.cronometro > 0.0 && pendenciaAtual.cronometro < 60.00 ) {
					//LOG para análise de processos pelo console;
					console.log( "Notifications/verificarHorarioPendencias('Notificação solicitada: '" + pendenciaAtual.cronometro + "')");					    	
					if (window.Notification&&Notification.permission!=="denied") {
						//Inicia a requisição de permissão para executar a exibição da notificação
						Notification.requestPermission( function() {
							//Variável que contém as configurações para execução desta notificação;
							var notificacaoCronometrosPendencias = new Notification( 
								//Este que contém o cabeçalho da notificação (titulo)
								dataNotify.titleNotification, 
								//Este que contém todas as demais configurações de conteúdo para o corpo da notificação;
								{
									//Texto da notificação;
									body: dataNotify.contextNotification 
										//Nome da empresa;
										+ "\nEmpresa: " + nomeEmpresas[pendenciaAtual.indice].value 
										//Nome do representante;
										+ "\nRepresentante: " + nomeRepresentantes[pendenciaAtual.indice].value
										//Observação da conferencia;
										+ "\nObs: " + observacaoConferencias[pendenciaAtual.indice].value ,
									//Icone da notificação;
									icon: dataNotify.iconSAMP
								//Encerramento do corpo do notificação;
								}						
							//Encerramento do cabeçalho;
							);
							//Dentro deste ciclo de permissão, é iniciado um método de click da variável;
							notificacaoCronometrosPendencias.onclick = function() {
								//Redirecionamos o usuário para as pendências em questão;
								location.href = dataNotify.linkRedirect;
								//E encerra-se a notificação através desta variável;
								notificacaoCronometrosPendencias.close();
							}
						//Encerramento do periodo de requisição e criação da notificação;
						})						
					//Encerramento do if para verificação se existe permissão dada para este serviço;
					}
					//Variável que irá executar a permissão para encerrar esse looping;
					status = false;
				//Encerramento do if de verificação do tempo da solicitação;
				} 
				//Caso seja mais que 60 min ou menos que zero...
				else {
					//LOG para análise de processos pelo console;
					console.log("Notifications/verificarHorarioPendencias(Notificação não necessária)" + pendenciaAtual.cronometro);					    			
				}	
				//Verifica-se a notificação foi enviada... caso tenha sido...
				if (!status) {
					//LOG para análise de processos pelo console;
    				console.log("Notifications/verificarHorarioPendencias/clearInterval");
    				//Cancela o procedimento de construção da notificação;
    				clearInterval(intervalo);
    			//Encerra o if com a verificação do estado da notificação;
				}		
			//Encerra a parte do if que verifica se existe alguma notificação em aberta;
			}
			//Caso não tenha notificação em aberta;
			else {
				//LOG para análise de processos pelo console;
				console.log("Notifications/verificarHorarioPendencias(Nenhuma pendencia em aberta)");
			//Encerramento do if de verificação de estado da pendencia;
			}
		//Encerramento do interval com o tempo para execução do mesmo (milisegundos);
		}, 1000);
	//Encerramento da verificação de permissão para exibição da notificação no navegador;
	}
// Encerra o procedimento do javascript para tratamento de códigos -->
</script>