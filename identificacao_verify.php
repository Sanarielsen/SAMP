<html>

	<!-- Abrimos o topo do site -->
	<head>
	
		<!-- Atribuimos nome ao titulo do site -->
		<title> Login  </title>
		
		<!-- Código JavaScript -->
		<script type="text/javascript">
			
			//Função que irá estipular o tempo para iniciar a sessão e o local que será redirecionado 
			function loginsuccessfully() {
				 
				setTimeout("window.location='index.php'", 1);
			}
			
			//Função que irá redicionar o usuário caso o login esteja errado
			function loginfailed() {
				
				setTimeout("window.location='identificacao.php'", 1);
			}

			//Função que verifica se os campos login e senha estão preenchidos ou não;
			function validaCampos() {

				dadosLogin = document.getElementById('txtUsuarioEmail').value;
				dadosSenha = document.getElementById('txtUsuarioSenha').value;

				if (dadosLogin.value.length < 1) {

					alert("Porfavor, preencha o campo do Login corretamente");
					return false;
				}

				else if (dadosSenha.value.length < 1) {

					alert("Porfavor, preencha o campo da senha corretamente");
					return false;
				}				

				else if (dadosLogin.indexOf("@") == -1 || email.indexOf(".") == -1) {
					
					alert('Preencha o email corretamente!');
					return false;
				}
				return true;
			}

		</script>
		
	<!-- Fechamos o topo -->
	</head>
	
	<!-- Abrimos o corpo do site -->
	<body>

		<?php

			//Incluimos as configurações do Banco;
			include "connection.php";

			//Campos para verificação do login;
			$login = $_POST["txtUsuarioEmail"];
			$senha = $_POST["txtUsuarioSenha"];

			//Verificamos se um dos campos de login ou senha estão vazios ou não;
			if (empty($login) || empty($senha)) {
				
				//Aviso que o login não foi aprovado;
				echo "<script> alert('Preencha os campos corretamente'); </script>";
				//Ativamos a função javascript de login falido;
				echo "<script> loginfailed() </script>";
			} 
			//Se tivermos, com ambos preenchidos, trabalharemos com o banco de dados;
			else {

				//String da Select 
				$selectString = mysqli_query($conexao, "CALL uspConsultarUsuarioParaLogin('$login','$senha');")
					or die (mysqli_error($conexao));

				//Variavel para detalhamento das linhas resultadas;
				$fieldResult = mysqli_fetch_assoc($selectString);
				//Tendo as linhas que foram resultadas...
				if ($fieldResult > 0) {

					//Iniciamos a sessão
					session_start();

					//Trasmitimos o id do usuário para a sessão;
					$_SESSION['idUser'] = $fieldResult['idUsuario'];

					//Guardamos as informações nas sessoes;
					$_SESSION['UsuarioEmail'] = $_POST['txtUsuarioEmail'];
					$_SESSION['UsuarioSenha'] = $_POST['txtUsuarioSenha'];					

					//Fazemos com que isto, receba o id do login atual;
					$_SESSION['userOnline'] = $fieldResult['idUsuario'];					

					//Comunicamos que o login foi realizado com sucesso;
					echo "<script> alert('Você foi logado com sucesso'); </script>";

					//Ativamos a função javascript de login sucedido;
					echo "<script> loginsuccessfully() </script>";
				} 

				//Se não da certo...
				else {

					//Aviso que o login não foi aprovado;
					echo "<script> alert('Nome de Usuário ou Senha inválidos'); </script>";

					//Ativamos a função javascript de login falido;
					echo "<script> loginfailed() </script>";
				}
			}
		?>

	</body>
</html>