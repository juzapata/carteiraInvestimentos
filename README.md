# Invest Wallet

Case de simulação de uma carteira de investimentos

### Tech

Tecnologia usada

* [node.js]

### Installation

Requires [Node.js](https://nodejs.org/) v12.16.2 to run.

```sh
$ cd carteiraInvestimentos
$ npm install
$ npm run dev
```
- Aplicação irá roda na porta no localhost:5000

### Endpoints

Criar usuário
 - POST
 - Produção: https://invest-wallet-backend.herokuapp.com/auth/register
 - Dev: localhost:5000/auth/register
 - body: {
	"name": "name",
	"email": "some@email.com",
	"password": "password"
}
- Api retorna informações do usuário cadastrado

Login Usuário (Autenticação)
 - POST
 - Produção: https://invest-wallet-backend.herokuapp.com/auth/authenticate
 - Dev: localhost:5000/auth/authenticate
 - body: {
	 "email": "some@email.com",
	 "password": "password"
  }
- Api retorna informações do usuário logado (incluindo seus investimentos)

Listagem Investimentos
- GET
- Produção: https://invest-wallet-backend.herokuapp.com/investments/
- Dev: localhost:5000/investments/
- Header: { Authorization: Bearer {AuthToken fornecido pela API no login ou na criação} }
- Api retorna informações do usuário logado (incluindo seus investimentos)

Criação de Investimentos
- POST
- Produção: https://invest-wallet-backend.herokuapp.com/investments/
- Dev: localhost:5000/investments/
- Header: { Authorization: Bearer {AuthToken fornecido pela API no login ou na criação} }
- Body: {
	"type": {"RENDA_FIXA" ou "RENDA_VARIAVEL"}, 
	"value": {FLOAT}
    } 
- Api retorna Id do novo investimento e informações do usuário atualizadas

Remoção de Investimentos
- DELETE
- Produção: https://invest-wallet-backend.herokuapp.com/investments/{invetimentdId}
- Dev: localhost:5000/investments/{invetimentdId}
- Header: { Authorization: Bearer {AuthToken fornecido pela API no login ou na criação} }
- Api retorna investimento que foi removido e informações do usuário atualizadas







