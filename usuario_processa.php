<?php

	$action = $_POST['txtAcaoUsuario'];

	if ($action == "inserir") {

		echo "Operação a ser realizada pelo banco: Inserir";

		//Inicia-se uma conexão com o banco de dados;
		require ("ConnectionMYSQL/connection.php");
		//Inicia-se uma conexão com a classe de negócios de usuarios;
		require ("Negocios/usuarioNegocios.php");
		//Inicia-se uma conexão com a classe de objetos do usuário;
		require ("ObjetoTransferencia/usuario.php");

		//Instancia-se o objeto do usuario;
		$usuario = new Usuario();

		//Atribuímos os dados do usuário nesse usuario;
		$usuario->setNome($_POST['txtNomeUsuario']);
		$usuario->setEmail($_POST['txtEmailUsuario']);
		$usuario->setSenha($_POST['txtSenhaUsuario']);
		$usuario->setPergunta($_POST['txtPerguntaUsuario']);
		$usuario->setResposta($_POST['txtRespostaUsuario']);
		$usuario->setCargo($_POST['sltCargoUsuario']);	

		//Instancia-se o objeto de negocios do usuário;
		$usuarioNegocios = new UsuarioNegocios();

		//Executa o procedimento para inserção do usuário;
		$resultIdentificador = $usuarioNegocios->inserirUsuario($usuario);

		//Verifica se o id é um integer e se é maior que zero;
		if ( $resultIdentificador > 0 ) {
			//Após executar a procedure, mensagem para o usuário e redirecionamento
			echo 
				"<script>  
					alert('Informações do usuário inseridas com sucesso');
					location.href='configuracao_admin.php';
				</script>";		
		}
	}
	else if ($action == "alterar") {

		echo "Operação a ser realizada pelo banco: Alterar";

	}
	else if ($action == "excluir") {

		echo "Operação a ser realizada pelo banco: Deletar";

		//Inicia-se uma conexão com o banco de dados;
		require ("ConnectionMYSQL/connection.php");
		//Inicia-se uma conexão com a classe de negócios de cargo;
		require ("Negocios/usuarioNegocios.php");
		//Instancia-se a classe de métodos do usuário 
		$usuarioNegocios = new UsuarioNegocios();
		//Executa-se o método para excluir o usuário com base no id;
		$resultIdentificador = $usuarioNegocios->excluiUsuario($_POST['txtIdentifyUsuario']);
		//Caso o id retornado deve ser maior que zero e não vazio para ser um registro deletado;
		if ( $resultIdentificador > 0) {
			//Após executar a procedure, mensagem para o usuário e redirecionamento
			echo 
				"<script>  
					alert('Informações do usuário excluídos com sucesso');
					location.href='configuracao_admin.php';
				</script>";
		}
   	}	
	else {

		//Mensagem para o usuário e redirecionamento para o usuário espertinho.
		echo "<script>  

			alert('Acesso negado...');
			location.href='configuracao_admin.php';
		</script>";
	}
	





?>