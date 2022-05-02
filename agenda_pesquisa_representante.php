<?php       

    //Verifica se esta requisição foi realizada através do método cascade do javascript;
    if (isset($_SERVER["HTTP_X_REQUESTED_WITH"]) && $_SERVER["HTTP_X_REQUESTED_WITH"] === "XMLHttpRequest"){        
        
        //Importa as configurações para conexão com o banco de dados;
        require("ConnectionMYSQL/connection.php");

        //Instancia esta conexão para esta variável;
        $conexao = getConnection();

        //Cria-se a string que contém a query de execução da procedure (value e label sendo palavras pré-definidas do cascade);
        $sqlProcedure = "SELECT idClienteRepresentante as value, crp_nome as label FROM tbClienteRepresentantes where fkCliente= :cliente";

        //Cria-se a string carregada com parametros para execução da procedure;
        $sqlQuery = $conexao->prepare($sqlProcedure);        

        //Captura-se o identificador do comboBox responsável pela ativação do método pelo javascript;
        $identificador = filter_input(INPUT_GET, 'identificador', FILTER_SANITIZE_NUMBER_INT);

        //Verifica se existe algum identificador nessa operação;
        if ($identificador){            
            
            //Atribuí os critérios para a query;
            $sqlQuery->bindValue(":cliente", $identificador);    
            //Executa esta query;
            $sqlQuery->execute();
            //Imprime o resultado para a requisão javascript          
            echo json_encode($sqlQuery->fetchAll());
            //Encerra o procedimento de requisição;
            return;
        }               
    }

    //Caso não entre na condição de requisição via cascade, retorna esta requisição como nula...
    echo NULL;
?>