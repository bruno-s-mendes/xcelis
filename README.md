# xcelis
Projeto de desafio técnico para empresa xcelis

Obejtivo de desenvolver uma aplicação que gerencie usuários e atividades. Essa aplicação deve ser escalável tanto no front-end quanto no back-end;

O deploy do backend foi feito no heroku e do front-end foi feito no githubpages. 

A aplicação pode ser acessada no link: https://bruno-s-mendes.github.io/xcelis/#/login

O usuário e senha fornecidos no read-me do desafio já estão cadastrados no banco de dados, portanto pode ser feito o login com o email e senha fornecidos.

---

# Sumário

- [Como Executar](#Como-Executar)
- [Lista de Requisitos](#Requisitos)
- [Desenvolvimento](#Desenvolvimento)
- [Próximos passos](#Próximos-passos)

# Como Executar

  O projeto está dividido em duas pastas, uma de front-end e outra de back-end;
  Este repositório pode ser clonado em seu computador e executado localmente, para isso siga os seguintes passos:

    1- Crie um diretório em seu computador;
    2- Entre no diretorio criado pelo terminal;
    3- Clone o repositório com o seguinte comando:
        git clone git@github.com:bruno-s-mendes/xcelis.git
    4- Entre no diretório do desafio pelo terminal, para isso rode o comando:
        cd xcelis;
    * certifique-se de estar na branch main, caso não esteja execute o comando: git checkout main
    ** Como o projeto está estruturado em duas pastas, teremos de separar a exeução, priemiro faça do back-end e depois do front-end**
    BACK-END
    5-  Entre no diretório do back-end pelo terminal, para isso rode o comando:
        cd backEnd
    6- Instale as dependencias do back-end, para isso rode o comando:
        npm instal;
    7- inicie o mongo Db no diretório, para isso rode o comando:
        sudo service mongod start; // isso no linux
        ** caso não tenha o mongoDB instalado, é necessário realizar a instalação em seu computador https://docs.mongodb.com/manual/installation/;
    8- Realize a população do banco de dados do back-end, para isso rode o comando:
        npm run seed
    9- inicie a aplicação back-end, para isso rode o comando:
        npm run dev;
    10- Mantenha o terminal abberto, com a aplicação rodando;
    FRONT-END
    11- Abra um novo terminal pela pasta do desafio (xcelis);
    12- Entre no diretório do front-end pelo terminal, para isso rode o comando:
        cd frontEnd/pastelaria
    13- Instale as dependencias do front-end, para isso rode o comando:
        npm instal;
    14- inicie a aplicação front-end, para isso rode o comando:
        npm start;

    A aplicação deve abrir em seu navegador. Caso tenha alguma dúvida não hesite em me contatar no email: mendessbruno@gmail.com


# Requisitos:

### 1 - Adicionar e remover usuários e administradores

### 2 - O usuário administrador pode adicionar tarefas para os outros usuários

### 3 - O usuário que recebeu a tarefa pode alterar o status da tarefa

### 4 - Login e autenticação

# Desenvolvimento 
  Para desenvolver este desafio, eu iniciei pelo back-end em nodeJS, definindo a arquitetura MSC e posteriormente as rotas:
  
  get '/user'
  post '/user'
  post '/user/:id'
  delete '/user/:id'
  
  get '/login'
  post '/login'

  get '/task'
  post '/task'
  put '/task/:id'
  delete '/task/:id'
  
  Tendo as rotas definidas, iniciei o desenvolvimento da interface com o banco de dados, os controllers e services para cada rota e de acordo com a necessidade
  fui criando os middlewares. Após finalizado o desenvolvimento escrevi testes unitários para um controller e service.
  
  Com o backend finalizado, eu iniciei o desenvolvimento do front. Optei por utilizar o React com a biblioteca de css tailwind, com alguns componetes escritos pela própia biblioteca. Iniciei realizando a tela de login, depois montei a tela de usuários, dividindo em componentes.
  
# Próximos passos
  - A aplicação ficou sem testes no front-end, portanto a proxima etapa é a implementação dos testes unitários;
  - Faltou um requisito de enviar emails que precisa ser implementado;
  - Existem alguns bugs no código que precisam ser corrigidos;
 
