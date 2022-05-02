<?php

	//Criação do name desta classe de objetos;	
	class Usuario {

		//Encapsulamento das variáveis de objetos;
		private $identificadorUsuario;
		private $cargoIdentificador;
		private $nomeUsuario;
		private $emailUsuario;
		private $senhaUsuario;
		private $perguntaUsuario;
		private $respostaUsuario;

		//Método para visualização dos valores das variáveis encapsuladas;
		public function getDetalheUsuario() {

			//Insere as informações atuais que este objeto do cargo possui;
			$detalheUsuario = 
					"Usuario Atual: " . "<br>" . 
					"Identificador: " . $this->identificadorUsuario . "<br>" .
					"Cargo: " . $this->cargoIdentificador . "<br>" .
					"Nome: " . $this->nomeUsuario . "<br>" .
					"Email: " . $this->emailUsuario . "<br>" .
					"Senha: " . $this->senhaUsuario . "<br>" .
					"Pergunta de segurança: " . $this->perguntaUsuario . "<br>" .
					"Resposta de segurança: " . $this->respostaUsuario . "<br>" 
					;
			//Retorna como resultado desta função;
			return $detalheUsuario;
		}

		//Métodos set's e get's;
		public function setIdentificador($identificador) {

			$this->identificadorUsuario = $identificador;
		}
		public function getIdentificador() {

			return $this->identificadorUsuario ;
		}
		public function setCargo($cargo) {

			$this->cargoIdentificador = $cargo;
		}
		public function getCargo() {

			return $this->cargoIdentificador ;
		}
		public function setNome($nome) {

			$this->nomeUsuario = $nome;
		}
		public function getNome() {

			return $this->nomeUsuario ;
		}
		public function setEmail($email) {

			$this->emailUsuario = $email;
		}
		public function getEmail() {

			return $this->emailUsuario ;
		}
		public function setSenha($senha) {

			$this->senhaUsuario = $senha;
		}
		public function getSenha() {

			return $this->senhaUsuario ;
		}
		public function setPergunta($pergunta) {

			$this->perguntaUsuario = $pergunta;
		}
		public function getPergunta() {

			return $this->perguntaUsuario ;
		}
		public function setResposta($resposta) {

			$this->respostaUsuario = $resposta;
		}
		public function getResposta() {

			return $this->respostaUsuario ;
		}
	}
?>

<!-- Sessão de testes desta classe -->
<?php
	/*
	//Instancia-se a classe de clientes para administrar suas informações.
	$usuario = new Usuario();

	//Inicia-se os testes dos métodos de setamento de informações;
	echo "======================== Procedimento de testes dos metodos set" . "<br>";

	$usuario->setIdentificador("1");
	$usuario->setCargo("3");
	$usuario->setNome("Gabriel Narimatsu");
	$usuario->setEmail("gabriel@gmail.com");
	$usuario->setSenha("4546");
	$usuario->setPergunta("Qual o nome do seu anime favorito?");
	$usuario->setResposta("To aru majutsu no index");

	//Inicia-se os testes dos métodos de getamento das informações;
	echo "======================== Procedimento de testes dos metodos get". "<br>";

	echo $usuario->getIdentificador() . "<br>";
	echo $usuario->getCargo() . "<br>";
	echo $usuario->getNome() . "<br>";
	echo $usuario->getEmail() . "<br>";
	echo $usuario->getSenha() . "<br>";
	echo $usuario->getPergunta() . "<br>";
	echo $usuario->getResposta() . "<br>";

	//Inicia-se os testes do método detalhe;
	echo "======================== Procedimento de testes do metodos detalhe" . "<br>";

	echo $usuario->getDetalheUsuario() . "<br>";
	*/
?>