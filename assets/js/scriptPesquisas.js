$(function ()) {

	//Pesquisa dos clientes pelo critério
	//Durante o processo de escrita, o conteúdo deste será usado para esse evento
	$("#txtCriterioPesquisaCliente").keyup(function()) {

		//Recebe a variável da pesquisa do método atual;
		var pesquisa = $(this).val();

		//Verificar se a variável existe algo digitado;
		if (pesquisa != "") {

			var dados = {

				palavra : pesquisa
			}			
		} 
		$.post(pesquisCliente.php, dados, function(retorna))
	}
}