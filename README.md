# Challenger two - Medcloud

Aplicação desenvolvida com o propósito de obter uma oportunidade de estágio na empresa Medclou.

# Tecnologias utilizadas

- O presente projeto conta com inúmeras tecnologias. Tendo como base o React e contando com o Express, Nodemon, Axios, Docker, Mysql, Dotenv, entre outras.

- Durante a elaboração do projeto, foi utilizado o AWS RDS mas devido há um problema com tempo de conexão com o banco (o qual cobra após um período de uso mesmo na Free Tier) foi optado em usar o docker para o backend.

# Inicialização

- Primeiramente baixe os arquivos '.env' e 'docker-compose.yml' na pasta backend;
- Esses arquivos foram enviados separadamente;
- Agora rode o Docker Desktop em sua máquina;
- Após isso abra a pasta 'backend' em seu VS Code e rode o comando `npm install express mysql2`;
- Após instalado, rode o comando `docker-compose up`;
- Assim que o docker for inicianlizado abra outro terminal na pasta 'backend' e execute o comando `npm start`;
- Agora abra a pasta 'frontend' no seu terminal e execute o comando `npm install react-scripts`
- Após instalado, execute `npm start`.
