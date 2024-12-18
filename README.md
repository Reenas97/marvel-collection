# Teste Prático - Frontend Jr com Vue.js

## Descrição do Desafio
Crie uma aplicação web em Vue.js que consuma a **Marvel API**. O objetivo é exibir uma lista de personagens e permitir visualizar detalhes de um personagem específico.

---

## Pré-requisitos

1. **Chave de API:**  
   Registre-se no portal de desenvolvedores da Marvel ([https://developer.marvel.com/](https://developer.marvel.com/)) para obter uma chave de API. Você precisará de uma **`public key`** e uma **`private key`** para autenticar as requisições.

2. **Endpoint Base:**  
   Use o endpoint base da API:  
   `https://gateway.marvel.com/v1/public/characters`

---

## Especificações do Projeto

### 1. Funcionalidades

1. **Tela de Lista**
   - Liste os personagens com:
     - Nome.
     - Imagem (miniatura de `thumbnail.path` + `.jpg`).
   - Adicione um campo de busca para filtrar personagens pelo nome.
   - Cada personagem deve ter um botão/link para acessar seus detalhes.

2. **Tela de Detalhes**
   - Exiba os seguintes dados do personagem selecionado:
     - Nome.
     - Descrição (`description`).
     - Imagem.
     - Quadrinhos relacionados (`comics.items`).
   - Adicione um botão/link para voltar à lista.

---

### 2. Requisitos Técnicos

- Utilize **Vue.js 3** com ou sem **Composition API**.
- Use o **Vue Router** para navegação entre a lista e a página de detalhes.
- Configure a autenticação nas requisições da API (veja a [documentação de autenticação da Marvel](https://developer.marvel.com/documentation/authorization)).
- Estilize a aplicação com **CSS puro**, **Tailwind**, ou **Bootstrap** (escolha do candidato).
- Adicione feedback visual ao carregar os dados (spinner ou mensagem "Carregando...").

---

### 3. Bônus (Não Obrigatório)

- Paginação na tela de lista (a API suporta parâmetros como `limit` e `offset`).
- Mostrar uma lista de séries relacionadas (`series.items`) na página de detalhes.
- Ordenar os personagens por nome.
- Teste unitário de um componente utilizando Vue Test Utils ou outro framework.

---

## Entrega

1. Você tem 7 dias para fazer o teste. Entregue o que conseguiu concluir nesse período.
2. Crie um pull request para a branch main do projeto.
3. Inclua em um arquivo markdown `how-to-run.md`:
   - Instruções para configurar as chaves da API Marvel.
   - Como rodar o projeto localmente.

---

## Guia Rápido para Uso da API Marvel

### Autenticação
A Marvel API exige os seguintes parâmetros em cada requisição:
- `ts` (timestamp): um número qualquer, como `1`.
- `apikey`: sua **public key**.
- `hash`: um hash MD5 gerado a partir de `ts + private key + public key`.

**Exemplo em JavaScript (Gerar Hash):**
```javascript
const crypto = require('crypto');

const ts = 1;
const publicKey = 'sua_public_key';
const privateKey = 'sua_private_key';

const hash = crypto
  .createHash('md5')
  .update(ts + privateKey + publicKey)
  .digest('hex');
```

### Exemplo de Requisição (Lista de Personagens):
```bash
GET https://gateway.marvel.com/v1/public/characters?ts=1&apikey=sua_public_key&hash=hash_gerado&limit=20
```

---

## Critérios de Avaliação

1. Organização e clareza do código.
2. Uso correto de recursos do Vue.js.
3. Interface funcional e intuitiva.
4. Estilização e responsividade.
5. Qualidade geral da experiência do usuário.
