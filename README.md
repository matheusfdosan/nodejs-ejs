# NodeJS com EJS

## O que é o EJS?

O EJS é uma linguagem de modelagem para a criação de páginas HTML utilizando JavaScript, ou seja, o EJS permite que criemos o nosso Front-end em HTML dentro do NodeJS. E tudo isso irá ser renderizado na página pelo JavaScript.

## Começando o projeto

Para começarmos, vamos criar um documento HTML, e desenvolver sua estrutura normalmente. Após ter feito isso, mude a extensão do arquivo `.html` para `.ejs`, e coloque dentro de uma pasta chamada `views`.

Logo, fora da pasta `views`, no terminal, inicie o node na pasta principal `npm init -y`, depois, instale as extensões que usaremos, `npm i ejs` e `npm i express`.

Depois criaremos um arquivo JavaScript com o nome de `server`, ele irá ser usado para criar um servidor local em nossa máquina com o `express`, e ao mesmo tempo, renderizar o nosso documento `.ejs` na página.

No arquivo `server.js`:

```js
const express = require("express")
```

Primeiro, exportamos o módulo `express`.

```js
const app = express()
```

Agora instanciamos as funcionalidades do `express`, para dentro de uma constante `app`.

```js
app.set("views engine", "ejs")
```

Indicamos ao `express` que estamos usando o EJS. Utilizamos o `set()`, que é uma função do `express`, e dentro dele, passamos 2 argumentos, `"views engine", "ejs"`, ou seja, estamos falando ao `express` que, a ferramenta que vamos usar para renderizar templates para HTML (views engine), vai ser o EJS.

```js
app.get("/", function (req, res) {
  res.render("index")
})
```

O próximo passo é criar uma rota. Temos o `app.get()`, usado para definir uma rota HTTP, ele recebe dois argumentos, o primeiro define a rota (`"/"`), e como a barra está sozinha, essa é a rota principal. Já o segundo, é função que será executada quando essa rota for acionada. Esta função também recebe dois argumentos: o `req` contém informações sobre a solicitação HTTP recebida, e o `res`, utilizada para dar uma resposta de volta ao cliente.

Entretanto, dentro desta função, utilizamos o código `res.render("index")`, que esta mandando uma resposta ao cliente, a qual é a renderização do arquivo `index`, que esta dentro da pasta `views` (porque se não tivesse, daria erro).

```js
app.listen(8080)
console.log("Running...")
```

Neste momento, o app (que instância o express), está ouvindo uma porta, que no caso, é a porta `8080`, que pode ser qualquer sequência de números. Então, basicamente, estamos rodando a porta 8080, e quando chamarmos esta porta no navegador (`http://localhost:8080/`), o app vai ouvir, e vai renderizar o arquivo EJS no página.

Este último console.log, é apenas uma mensagem no terminal, para avisar que o servidor local está rodando, ou, pronto para ser ouvido pelo express.

E para rodar a aplicação, no terminal, executamos com o Node, o arquivo server.js:

```bash
$ node sever.js
```

> Vale lembrar que, qualquer alteração no código desse arquivo, você terá que para a execução do servidor e rodar novamente para pode fazer suas atualizações.

## Separando partes do layout no EJS

Nós podemos separar partes da estrutura do HTML para serem reutlizadas em outras páginas, ou no mesmo layout. Como, por exemplo, o header e o footer da página home, os mesmos podem ser utilizados na página about.

Para fazermos estas separações, pegamos a parte do código a ser reutilizada, criamos um arquivo .ejs, e dentro desse arquivo, colocamos o código.

Contudo, para nós incluirmos o código para dentro do index, about ou contact, utilizamos esse código: `<%- include('header'); %>`.

## Criando uma nova página

Para criarmos uma página nova, precisamos criar uma arquivo novo, como por exemplo, uma página sobre, `about.ejs` dentro da pasta views. Logo, no arquivo `server.js`, definir uma rota para a página about:

```js
app.get("/about", function (req, res) {
  res.render("about")
})
```

Agora, se escrevermos no navegador `https:localhost:8080/about`, a página about irá abrir.

E como podemos fazer para, quando clicarmos em um link, ser redirecionado para uma outra página? No atributo href da tag `<a>`, colocaremos: `/outra-pagina`, então, quando clicarmos nesse link, o usuário será redirecionado para essa outra página.

## Organizando código com o pages e partials

Para nossos arquivos ejs não ficarem misturados entre páginas e pedaços de códigos, dentro da pasta views, criaremos duas outras pastas, pages e partials. A pasta pages guardaram as páginas que iram ser visualizadas pelo usuário, e a pasta partials, ficaram as partes de códigos.

Claro que, depois dessa mundaça, devemos mudar os caminhos para as páginas e partes do código, como `res.render("pages/index")` e `<%- include('../partials/header'); %>`.

## Passando um objeto para o EJS

Podemos passar objetos pelo comando `include`, o comando `include` é usado para incluir o código de um arquivo em outro. E também usado para passar dados dinâmicos, como os objetos.

```ejs
<!-- Na página index.ejs -->
<%- include('head', {dado: "Home"}); %>

<!-- Na página about.ejs -->
<%- include('head', {dado: "About"}); %>

<!-- Na página contact.ejs -->
<%- include('head', {dado: "Contact"}); %>
```

Logo, passando o objeto `{dado: nome-da-secao}` para o arquivo `head`, o head terá que usar o objeto passado para ele em cada uma das páginas.

> Caso várias páginas estão utilizando o código de um arquivo, e uma dessas páginas passarem um objeto pelo include, automáticamente todas as outras página que não passaram objeto algum, deixarão de funcionar.

```ejs
<!-- No arquivo head.ejs -->
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>Nome do site - <%- dado %></title>
</head>
```

Vemos que, o objeto é recebido da seguinte forma, `<%- dado %>`, que é a propriedade, onde se encontra o nome da seção.

Então, reformulando, para cada página, o código do arquivo head.ejs é incorporado ao código da página, e um objeto é passado contendo o nome da seção atual (que pode ser "home", "sobre" ou "contato"). O arquivo head.ejs usa o nome da seção para definir o título da página.

Suponha que desejamos que o arquivo head seja capaz de reconhecer quando nenhum objeto é passado para ele, e assim, defina automaticamente o valor do objeto como "home". Como fazemos isso?

No arquivo head:

```ejs
<title>Nome do site - <%- typeof dado != 'undefined' ? dado: "Home" %></title>
```

Ou seja, se a variável dado foi definida, seu valor é exibido como o nome da seção atual. Se não, o valor padrão "Home" é exibido como o nome da seção atual. Sendo assim, a página index não precisa emitir nenhum objeto com o nome de sua seção.

## Foreach

Vamos imaginar: Tenho um artigo, abaixo desse artigo deve ter uma lista com o nome e e e-mail de cada escritor, como faço isso usando EJS e NodeJS?

Primeiramente, devemos criar um array contendo objetos com o nome e e-mail de cada escritor dentro da rota para o arquivo que vai conter a lista:

```js
app.get("/", function (req, res) {
  const items = [
    {
      name: "Herique Jessus",
      mail: "heriquejessus77@gmail.com",
    },
    {
      name: "Tayná Renata",
      mail: "tainazinha99@gmail.com",
    },
    {
      name: "Maria Olivia",
      mail: "mariaolivia007@otlook.com",
    },
    {
      name: "Lucas Mandel",
      mail: "luquinha_m22@gmail.com",
    },
  ]

  res.render("pages/index", {
    writers: items,
  })
  // Logo após a rederização da página index, criamos uma variável que receberá a nossa lista
})
```

Agora para passar esses valores para o arquivo EJS, precisamos, dentro do `<ul>`:

```js
  <ul class="list-disc p-5">

    <% writers.forEach((writer) => { %> 
    // Criamos uma tag e colocamos a variável que contém a lista dos escritores, seguido de um forEach, que vai percorrer cada objeto, e cada objeto terá identificado como "writer", ou escritor.
    
      <li><strong><%= writer.name %></strong> - <%= writer.mail %></li>
      // Temos aqui um <li> que contém o nome do escritor e e-mail. A tag <%= é usada para exibir o valor de uma expressão na saída do template. Ou seja, vai imprimir o que extiste dentro do `writer.name` e `writer.mail`

    <% }) %>
    // Isso aqui é só o fechamento da função forEach
  </ul>
```
