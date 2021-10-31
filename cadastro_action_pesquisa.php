<?php
	
	//Cria-se uma conexão com o servidor;
	include "connection.php";
	
	//Verificação da string a transmitida via javascript;
	//echo $_POST['busca'];
	
	//Recebe o parâmetro enviado via javascript;
	$busca = $_POST['busca'];
	$criterio = $_POST['criterio'];
	
	//Inicia-se uma consulta utilizando-se da conexão do banco de dados;
	$query = mysqli_query($conexao, "CALL uspConsultarClientesPeloCriterio('$criterio', '$busca');");
	//Conta-se quantas linhas foram resultadas da query;
	$num = mysqli_num_rows($query);
	//Se o número for maior que 0
	if ($num > 0) {
		
		//Inicia-se a assimilação do resultado do banco para um vetor de linhas
		while ( $row = mysqli_fetch_assoc($query)) {
			
			//Preenchimento das informações html a serem subscritas no javascript;

		?>

			<!-- Criação da linha da tabela -->
						  		<tr>

						  			<!-- Criação do formulário desta linha -->
						  			<form action="cadastro_action.php" method="POST">

						  				<!-- Titulo da linha da tabela -->
						  				<th scope="row"> <?php echo $resultProcedure[$i]['identificadorCliente'] ?> </th>
						  				<?php echo '<input type="hidden" name="txtIdentificadorCliente" id="txtIdentificadorCliente" value=" 
						  					' . $resultProcedure[$i]['identificadorCliente'] . ' ">' ?>
						  				<!-- Coluna respectiva da "Razão Social" -->
						  				<td> <?php echo $resultProcedure[$i]['razaoSocialCliente'] ?> </td>
						  				<?php echo ' <input type="hidden" name="txtRazaoSocialCliente" id="txtRazaoSocialCliente" value="
						  					' . $resultProcedure[$i]['razaoSocialCliente'] . '"> ' ?>
						  				<!-- Coluna respectiva da "Nome Fantasia" -->
						  				<td> <?php echo $resultProcedure[$i]['nomeFantasiaCliente'] ?> </td> 
						  				<?php echo ' <input type="hidden" name="txtFantasiaCliente" id="txtFantasiaCliente" value="
						  					' . $resultProcedure[$i]['nomeFantasiaCliente'] . '"> ' ?>
						  				<!-- Coluna respectiva da "Tipo do cliente" -->
						  				<td> <?php echo $resultProcedure[$i]['tipoPessoaCliente'] ?> </td> 
						  				<?php echo ' <input type="hidden" name="txtTipoCliente" id="txtTipoCliente" value="
						  					' . $resultProcedure[$i]['tipoPessoaCliente'] . ' "> ' ?>
						  				<!-- Coluna respectiva da "Protocolo" -->
						  				<td> <?php echo $resultProcedure[$i]['protocoloCliente'] ?> </td>
						  				<?php echo ' <input type="hidden" name="txtProtocoloCliente" id="txtProtocoloCliente" value="
						  					' . $resultProcedure[$i]['protocoloCliente'] . ' "> ' ?>
						  				<!-- Fundação cliente -->
						  				<?php echo ' <input type="hidden" name="txtFundacaoCliente" id="txtFundacaoCliente" value="
						  					' . $resultProcedure[$i]['dataFundacaoCliente'] . ' "> ' ?>	

						  				<!-- Informações sobre o endereco de localização -->
						  				<?php echo ' <input type="hidden" name="txtCepLocalizacao" id="txtCepLocalizacao" value="
						  					' . $resultProcedure[$i]['cepLocalizacao'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtLougradouroLocalizacao" id="txtLougradouroLocalizacao" value="
						  					' . $resultProcedure[$i]['lougradouroLocalizacao'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtBairroLocalizacao" id="txtBairroLocalizacao" value="
						  					' . $resultProcedure[$i]['bairroLocalizacao'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtCidadeLocalizacao" id="txtCidadeLocalizacao" value="
						  					' . $resultProcedure[$i]['cidadeLocalizacao'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtEstadoLocalizacao" id="txtEstadoLocalizacao" value="
						  					' . $resultProcedure[$i]['estadoLocalizacao'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtCaixaPostalLocalizacao" id="txtCaixaPostalLocalizacao" value="
						  					' . $resultProcedure[$i]['caixaPostalLocalizacao'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtTelefoneLocalizacao" id="txtTelefoneLocalizacao" value="
						  					' . $resultProcedure[$i]['telefoneLocalizacao'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtEmailLocalizacao" id="txtEmailLocalizacao" value="
						  					' . $resultProcedure[$i]['emailLocalizacao'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtSiteLocalizacao" id="txtSiteLocalizacao" value="
						  					' . $resultProcedure[$i]['siteLocalizacao'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtContatoLocalizacao" id="txtContatoLocalizacao" value="
						  					' . $resultProcedure[$i]['contatoLocalizacao'] . ' "> ' ?>	

						  				<!-- Informações sobre o endereco de correspondência -->
						  				<?php echo ' <input type="hidden" name="txtCepCorrespondencia" id="txtCepLocalizacao" value="
						  					' . $resultProcedure[$i]['cepCorrespondencia'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtLougradouroCorrespondencia" id="txtLougradouroLocalizacao" value="
						  					' . $resultProcedure[$i]['lougradouroCorrespondencia'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtBairroCorrespondencia" id="txtBairroLocalizacao" value="
						  					' . $resultProcedure[$i]['bairroCorrespondencia'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtCidadeCorrespondencia" id="txtCidadeLocalizacao" value="
						  					' . $resultProcedure[$i]['cidadeCorrespondencia'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtEstadoCorrespondencia" id="txtEstadoLocalizacao" value="
						  					' . $resultProcedure[$i]['estadoCorrespondencia'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtCaixaPostalCorrespondencia" id="txtCaixaPostalLocalizacao" value="
						  					' . $resultProcedure[$i]['caixaPostalCorrespondencia'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtTelefoneCorrespondencia" id="txtTelefoneLocalizacao" value="
						  					' . $resultProcedure[$i]['telefoneCorrespondencia'] . ' "> ' ?>	
						  				<?php echo ' <input type="hidden" name="txtContatoCorrespondencia" id="txtContatoLocalizacao" value="
						  					' . $resultProcedure[$i]['contatoCorrespondencia'] . ' "> ' ?>	

						  				<!-- Coluna respectiva para a ação de botões -->
						  				<td>  

						  					<!-- Botão para visualização das informações completas deste cliente -->
						  					<?php 
						  						echo 
						  						'<button type="button" class="btn btn-success" data-toggle="modal" data-target="#modalConsultarCadastro"
								      				
								      				data-whatever-cliente-0=" ' . $resultProcedure[$i]['identificadorCliente'] . ' "
								      				data-whatever-cliente-1="' . $resultProcedure[$i]['razaoSocialCliente'] . '" 
								      				data-whatever-cliente-2="' . $resultProcedure[$i]['nomeFantasiaCliente'] . '" 
								      				data-whatever-cliente-3="' . $resultProcedure[$i]['tipoPessoaCliente'] . '"
								      				data-whatever-cliente-4="' . $resultProcedure[$i]['protocoloCliente'] . '"
								      				data-whatever-cliente-5="' . $resultProcedure[$i]['dataFundacaoCliente'] . '"

								      				data-whatever-localizacao-0="' . $resultProcedure[$i]['identificadorLocalizacao'] . '"
								      				data-whatever-localizacao-1="' . $resultProcedure[$i]['cepLocalizacao'] . '"
								      				data-whatever-localizacao-2="' . $resultProcedure[$i]['lougradouroLocalizacao'] . '"
								      				data-whatever-localizacao-3="' . $resultProcedure[$i]['bairroLocalizacao'] . '"
								      				data-whatever-localizacao-4="' . $resultProcedure[$i]['cidadeLocalizacao'] . '"
								      				data-whatever-localizacao-5="' . $resultProcedure[$i]['estadoLocalizacao'] . '"
								      				data-whatever-localizacao-6="' . $resultProcedure[$i]['caixaPostalLocalizacao'] . '"
								      				data-whatever-localizacao-7="' . $resultProcedure[$i]['telefoneLocalizacao'] . '"
								      				data-whatever-localizacao-8="' . $resultProcedure[$i]['emailLocalizacao'] . '"
								      				data-whatever-localizacao-9="' . $resultProcedure[$i]['siteLocalizacao'] . '"
								      				data-whatever-localizacao-10="' . $resultProcedure[$i]['contatoLocalizacao'] . '"

								      				data-whatever-correspondencia-0="' . $resultProcedure[$i]['identificadorCorrespondencia'] . '"
								      				data-whatever-correspondencia-1="' . $resultProcedure[$i]['cepCorrespondencia'] . '"
								      				data-whatever-correspondencia-2="' . $resultProcedure[$i]['lougradouroCorrespondencia'] . '"
								      				data-whatever-correspondencia-3="' . $resultProcedure[$i]['bairroCorrespondencia'] . '"
								      				data-whatever-correspondencia-4="' . $resultProcedure[$i]['cidadeCorrespondencia'] . '"
								      				data-whatever-correspondencia-5="' . $resultProcedure[$i]['estadoCorrespondencia'] . '"
								      				data-whatever-correspondencia-6="' . $resultProcedure[$i]['caixaPostalCorrespondencia'] . '"
								      				data-whatever-correspondencia-7="' . $resultProcedure[$i]['telefoneCorrespondencia'] . '"
								      				data-whatever-correspondencia-8="' . $resultProcedure[$i]['contatoCorrespondencia'] . '"
								      				> Consultar 
								      			</button>'; ?>

								      		<!-- Botão para redicionamento da página para alteração de dados -->
								      		<button type="submit" id="btnAlterarItem" name="btnAlterarItem" class="btn btn-warning"> Alterar </button>
								      		<input type="hidden" id="txtAcaoCadastro" name="txtAcaoCadastro" value="alterar">
						  				</td>					  				
						  									  			
						  			<!-- Encerrramento do formulário desta linha -->
						  			</form>

						  		<!-- Encerrramento da linha da tabela -->
						  		</tr>
			
			<?php			
			
		} 
		
	} 
	//Caso o número de linhas resultadas for nula...
	else {
		
		//Informe ao usuário;
		echo "Este caboclo não existe";
	}
?>