# Football Table

## Introdução

O Football Table é um site que simula eventos fictícios de partidas e classificações de futebol. Ele oferece aos usuários uma plataforma para explorar e interagir com dados simulados de jogos e posições dos times.

## Estrutura do Projeto

O Football Table é composto por quatro componentes principais: Banco de Dados, Back-end, Front-end e Docker. Abaixo está uma descrição detalhada de cada componente.

### 1. Banco de Dados

O projeto utiliza um container Docker MySQL configurado no docker-compose através do serviço `db`. O banco de dados tem o papel de fornecer dados para o serviço de back-end. 

- **Porta:** 3306 do localhost
- **Acesso durante os testes:** O banco de dados será acessado pelo Sequelize.
- **Conexão:** É possível conectar-se ao banco de dados utilizando um cliente MySQL (Workbench, Beekeeper, DBeaver, etc.) com as credenciais configuradas no serviço `db` do docker-compose.

### 2. Back-end

O back-end é onde a maior parte das implementações exigidas foram realizadas. Ele foi desenvolvido utilizando Node.js com Express e Sequelize para a modelagem de dados.

- **Porta:** 3001 (o front-end faz requisições para esta porta por padrão).
- **Inicialização:** A aplicação é inicializada a partir do arquivo `app/backend/src/server.ts`.
- **Configurações:** 
  - O Express está configurado para ouvir a porta especificada nas variáveis de ambiente.
  - Regras de negócio foram implementadas para popular adequadamente a tabela exibida no front-end.

### 3. Front-end

O front-end já estava concluído e não precisou de modificações, exceto pelo Dockerfile, que foi configurado.

- **URL de acesso:** http://localhost:3000
- **Comunicação com Back-end:** Através da URL http://localhost:3001.
- **Validação:** Ao implementar um requisito no back-end, recomendo acessar a página correspondente no front-end para verificar se está funcionando corretamente.

### 4. Docker

O docker-compose é responsável por unir todos os serviços conteinerizados (backend, frontend e db) e inicializar o projeto completo com um único comando.

- **Comando de Inicialização:** `npm run compose:up`
- **Configuração:** As Dockerfiles devem ser corretamente configuradas nas raízes do front-end e back-end para garantir a inicialização correta da aplicação.

## Desenvolvimento

### Modelagem de Dados com Sequelize

O Sequelize foi utilizado para a modelagem de dados no back-end. Abaixo estão as principais entidades e seus relacionamentos:

#### Entidades

1. **Usuário**:
   - Atributos: id, nome, email, senha, etc.
   - Relacionamento: Um usuário pode ter várias partidas associadas.

2. **Time**:
   - Atributos: id, nome, cidade, etc.
   - Relacionamento: Um time pode ter várias partidas associadas.

3. **Partida**:
   - Atributos: id, data, timeCasa, timeVisitante, placarCasa, placarVisitante, etc.
   - Relacionamento: Cada partida pertence a um time (timeCasa e timeVisitante).

4. **Classificação**:
   - Atributos: id, time, pontos, jogos, vitórias, empates, derrotas, etc.
   - Relacionamento: Uma classificação pertence a um time.

### Regras de Negócio

O back-end implementa regras de negócio para popular adequadamente a tabela disponível no front-end. As regras incluem:

- Cálculo de pontos com base nos resultados das partidas.
- Atualização da tabela de classificação após cada partida.
- Validação de dados de entrada para garantir a integridade dos dados.

## Integração

### Docker Compose

O Docker Compose é utilizado para gerenciar os serviços do projeto (backend, frontend e db). A configuração no arquivo `docker-compose.yml` une esses serviços e permite subir o projeto completo com um único comando.

### Configuração das Dockerfiles

- **Back-end:** O Dockerfile deve ser configurado na raiz do projeto back-end para garantir que a aplicação inicializa corretamente.
- **Front-end:** O Dockerfile deve ser configurado na raiz do projeto front-end para garantir a comunicação com o back-end e a correta exibição das informações.
