<h2 align="center" style='font-family: sans-serif'>
	Api Projeto FullSack
</h2>

<p align = "center">
Este é o backend da aplicação Projeto FullStack API para gerenciamento de clientes e contatos.
</p>

<br/>

<p align = "center">
A URL base é https://projeto-fullstack.vercel.app/api
</p>

<br/>

<h2 align ='center'>Clientes (Endpoints)</h2>

## **Rotas Sem Autenticação**

<li style='font-size: 20px'>Criação de um Cliente:</li>

<br/>

Observação: O campo "telephone" precisa ter o formato +55 (00) 00000-0000

`POST /clients - FORMATO DA REQUISIÇÃO - STATUS 201`

```json
{
  "fullName": "Tobey Maguire",
  "email": "tobey@mail.com",
  "password": "12345678",
  "telephone": "+55 (11) 40028-9220"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /clients - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "id": "084ed168-0b89-4766-987f-631821f183d0",
  "fullName": "Tobey Maguire",
  "email": "tobey@mail.com",
  "telephone": "+55 (11) 40028-9220",
  "registrationDate": "2023-03-29T21:15:38.794Z"
}
```

Caso dê um erro de campo irá retornar o seguinte erro:

`POST /clients - FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "message": {
    "success": false,
    "error": {
      "issues": [
        {
          "code": "invalid_type",
          "expected": "string",
          "received": "undefined",
          "path": ["fullName"],
          "message": "Required"
        },
        {
          "code": "invalid_type",
          "expected": "string",
          "received": "undefined",
          "path": ["email"],
          "message": "Required"
        },
        {
          "code": "invalid_type",
          "expected": "string",
          "received": "undefined",
          "path": ["password"],
          "message": "Required"
        },
        {
          "code": "invalid_type",
          "expected": "string",
          "received": "undefined",
          "path": ["telephone"],
          "message": "Required"
        }
      ],
      "name": "ZodError"
    }
  }
}
```

Caso dê um erro de conflito irá retornar o seguinte erro:

`POST /clients - FORMATO DA RESPOSTA - STATUS 409`

```json
{
  "message": "This email is already in use."
}
```

```json
{
  "message": "This phone number is already in use."
}
```

<br/>

<li style='font-size: 20px'>Login do Cliente</li>

<br/>

`POST /signin - FORMATO DA REQUISIÇÃO - STATUS 201`

```json
{
  "email": "tobey@mail.com",
  "password": "12345678"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /signin - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODAwMzgxNzMsImV4cCI6MTY4MDI5NzM3Mywic3ViIjoiNjE1MjY4OWEtNmY1Yy00ZWZhLWJmZjAtYTY4ZDgwOWU3ODgyIn0.TdyddzDMqXOECEf4vaSyndGko5K9ZINDLojuk9d8B34"
}
```

Caso dê um erro irá retornar o seguinte erro:

`POST /signin - FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "message": "Incorrect email or password."
}
```

## **Rotas Com Autenticação**

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

Após o cliente estar logado, ele deve conseguir adicionar novos contatos a sua lista.

> Caso você tente acessar os endpoints sem um token receberá o seguinte erro:

<br/>

`(Exemplo) POST /contacts - 401 Sem Autorização`

<br/>

```json
{
  "message": "A token is required."
}
```

> Caso você tente acessar os endpoints sem um token válido receberá o seguinte erro:

<br/>

`(Exemplo) POST /contacts - 403 Proibido`

```json
{
  "message": "Invalid token."
}
```

## <br/>

<li style='font-size: 20px'>Podemos acessar um cliente específico utilizando o endpoint:</li>

<br/>

`GET /clients/:client_id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "084ed168-0b89-4766-987f-631821f183d0",
  "fullName": "Tobey Maguire",
  "email": "tobey@mail.com",
  "telephone": "+55 (11) 40028-9220",
  "registrationDate": "2023-03-29T21:15:38.794Z"
}
```

<li style='font-size: 20px'>Atualização de um cliente</li>

<br/>

`PATCH /clients/:client_id - FORMATO DA REQUISIÇÃO`

```json
{
  "email": "tobeymaguire@mail.com"
}
```

Caso dê tudo certo, a resposta será assim:

`PATCH /clients/:client_id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "084ed168-0b89-4766-987f-631821f183d0",
  "fullName": "Tobey Maguire",
  "email": "tobeymaguire@mail.com",
  "telephone": "+55 (11) 40028-9220",
  "registrationDate": "2023-03-29T21:15:38.794Z"
}
```

Caso dê um erro de campo irá retornar o seguinte erro:

`PATCH /clients/:client_id - FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "message": {
    "success": false,
    "error": {
      "issues": [
        {
          "validation": "email",
          "code": "invalid_string",
          "message": "Invalid email",
          "path": ["email"]
        }
      ],
      "name": "ZodError"
    }
  }
}
```

<li style='font-size: 20px'>Podemos deletar um cliente específico utilizando o endpoint:</li>

<br/>

`DELETE /clients/:client_id - FORMATO DA RESPOSTA - STATUS 204`

```json
{}
```

<br/>

<li style='font-size: 20px'>Outra Possível Mensagem de Erro:</li>

<br/>

```json
{
  "message": "Client not found."
}
```

<h2 align ='center'>Contatos (Endpoints)</h2>

<li style='font-size: 20px'>Criando um contato a partir do cliente logado:</li>

<br/>

`POST /contacts - FORMATO DA REQUISIÇÃO`

```json
{
  "fullName": "Tio Ben",
  "email": "benjamin@mail.com",
  "telephone": "+55 (11) 40028-9221",
  "avatar": "https://static.onecms.io/wp-content/uploads/sites/6/2015/10/a-ha-take-on-me.jpg"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /contacts - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "id": "453dbe05-82ec-466d-9591-00468b0bf652",
  "fullName": "Tio Ben",
  "email": "benjamin@mail.com",
  "telephone": "+55 (11) 40028-9221",
  "avatar": "https://static.onecms.io/wp-content/uploads/sites/6/2015/10/a-ha-take-on-me.jpg",
  "registrationDate": "2023-03-29T21:15:38.794Z"
}
```

Caso dê um erro de campo irá retornar o seguinte erro:

`POST /contacts - FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "message": {
    "success": false,
    "error": {
      "issues": [
        {
          "code": "invalid_type",
          "expected": "string",
          "received": "undefined",
          "path": ["fullName"],
          "message": "Required"
        },
        {
          "code": "invalid_type",
          "expected": "string",
          "received": "undefined",
          "path": ["email"],
          "message": "Required"
        },
        {
          "code": "invalid_type",
          "expected": "string",
          "received": "undefined",
          "path": ["telephone"],
          "message": "Required"
        },
        {
          "code": "invalid_type",
          "expected": "string",
          "received": "undefined",
          "path": ["avatar"],
          "message": "Required"
        }
      ],
      "name": "ZodError"
    }
  }
}
```

<li style='font-size: 20px'>Acessando todos contatos</li>

<br/>

`GET /contacts/:contact_id - FORMATO DA RESPOSTA - STATUS 200`

<br/>

> Os contatos retornados são apenas do cliente logado

```json
[
  {
    "id": "453dbe05-82ec-466d-9591-00468b0bf652",
    "fullName": "Tio Ben",
    "email": "benjamin@mail.com",
    "telephone": "+55 (11) 40028-9221",
    "avatar": "https://static.onecms.io/wp-content/uploads/sites/6/2015/10/a-ha-take-on-me.jpg",
    "registrationDate": "2023-03-29T21:15:38.794Z"
  },
  {
    "id": "d0d5fc5c-1b40-4b1b-9782-097da9461646",
    "fullName": "Tia May",
    "email": "tiamay@mail.com",
    "telephone": "+55 (11) 40028-9222",
    "avatar": "https://www.tenhomaisdiscosqueamigos.com/wp-content/uploads/2019/10/a-ha-take-on-me-clipe.jpg",
    "registrationDate": "2023-03-29T21:15:38.794Z"
  }
]
```

<li style='font-size: 20px'>Acessando um contato</li>

<br/>

`GET /contacts/:contact_id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "453dbe05-82ec-466d-9591-00468b0bf652",
  "fullName": "Tio Ben",
  "email": "benjamin@mail.com",
  "telephone": "+55 (11) 40028-9221",
  "avatar": "https://static.onecms.io/wp-content/uploads/sites/6/2015/10/a-ha-take-on-me.jpg",
  "registrationDate": "2023-03-29T21:15:38.794Z"
}
```

<li style='font-size: 20px'>Atualização de um cliente</li>

<br/>

`PATCH /contacts/:contact_id - FORMATO DA REQUISIÇÃO`

```json
{
  "fullName": "Benjamin Parker",
  "email": "benparker@mail.com"
}
```

<li style='font-size: 20px'>Caso dê tudo certo, a resposta será assim:</li>

`PATCH /contacts/:contact_id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "453dbe05-82ec-466d-9591-00468b0bf652",
  "fullName": "Benjamin Parker",
  "email": "benparker@mail.com",
  "telephone": "+55 (11) 40028-9221",
  "avatar": "https://static.onecms.io/wp-content/uploads/sites/6/2015/10/a-ha-take-on-me.jpg",
  "registrationDate": "2023-03-29T21:15:38.794Z"
}
```

Caso dê um erro de campo irá retornar o seguinte erro:

`PATCH /contacts/:contact_id - FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "message": {
    "success": false,
    "error": {
      "issues": [
        {
          "validation": "regex",
          "code": "invalid_string",
          "message": "The full name must not contain numbers.",
          "path": ["fullName"]
        },
        {
          "validation": "email",
          "code": "invalid_string",
          "message": "Invalid email",
          "path": ["email"]
        }
      ],
      "name": "ZodError"
    }
  }
}
```

<li style='font-size: 20px'>Podemos deletar um contato específico utilizando o endpoint:</li>

<br/>

`DELETE /contacts/:contact_id - FORMATO DA RESPOSTA - STATUS 204`

```json
{}
```

<br/>

<li style='font-size: 20px'>Outra Possível Mensagem de Erro:</li>

<br/>

```json
{
  "message": "Contact Not Found."
}
```

_Criado por Leandro Lourenço_
