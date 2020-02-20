//Armazenamos as urls dos 2 arquivos json
const urls = ['json/acima-10-reais.json', 'json/abaixo-10-reais.json']

//Acionamos a funções desejadas somentes após o carregamento de toda a pagina e seu conteudo
window.onload = function() {
        /*Referenciamos o nosso contexto e chamamos a função getJSON dentro dele, passando uma das urls,
        para testar outro json, basta trocar o indice da variavel para urls[1]*/
        this.getAxisJSON(urls[0]);
    }
    //Função para adicionar um atributo a um elemento em especifico
function addAttElement(element, item, atributo) {
    //Usamos a função setAttribute para criar um novo atributo HTML para o elemento parametrizado 
    element.setAttribute(item, atributo);
}
//Função para adicionar uma classe em um elemento
function addClassElement(element, classe) {
    //Separamos as classes que estão divididas por espaço
    var classes = element.className.split(' ');
    //verificamos se a classe que queremos adicionar já existe nesse vetor criado
    var getIndex = classes.indexOf(classe);
    //Se não existir essa classe ainda
    if (getIndex === -1) {
        //adicionamos essa classe no vetor
        classes.push(classe);
        //Voltamos as classes para o elemento, separando novamente por espaço
        element.className = classes.join(' ');
    }
}
//Função para deleter uma classe de um elemento
function delClassElement(element, classe) {
    //Separamos as classes que estão divididas por espaço
    var classes = element.className.split(' ');
    //verificamos se a classe que queremos adicionar já existe nesse vetor criado
    var getIndex = classes.indexOf(classe);
    //Se existir essa classe ainda
    if (getIndex > -1) {
        //delet essa classe no vetor
        classes.splice(getIndex, 1);
    }
    elemento.className = classes.join(' ');
}
//Função para poder selecionar o elemento HTML a qual será inserido os dados
function getElementHTML(name) {
    return document.getElementsByClassName(name);
}
//Função para transforma um preço em decimal e retornar uma string já formatada com a moeda e , do valor
function priceString(value) {
    if (value % 1 === 0) {
        //Aqui transformamos o valor para decimal, pelo fato do valor vir multiplicado por 100 e não já em decimal para reais.
        var prePrice = (value / 100);
    }
    //Depois criamos uma string para receber o valor em decimal substituindo o . por mais o identificador de Reais R$
    var result = "R$ " + prePrice.toString().replace(".", ",");
    return result
}
//Função criada para executar a requisição GET pelo axis e recebermos todo o corpo da resposta 
function getAxisJSON(url) {
    //Instanciamos o axios e utilizamos de sua função get para efetuar a requisição com uma url especifica
    axios.get(url)
        .then(function(response) {
            //Requisição feita com sucesso
            cartProducts(response);
        })
        .catch(function(error) {
            //Tratamento de erro
            console.log(error);
        })
        .then(function() {
            ///Parte a ser sempre executada
        });
}
//Função criada para executar a re
function getXHtPPJSON(url) {
    /* XMLHttpRequest: fornece a possibilidade de transferir dados entre cliente e servidor, 
    Como recuperar dados de uma url sem ter q atualizar a pagina inteira */
    var httpRequest = new XMLHttpRequest();
    /*acessa a objeto XMLHttpRequest para utilizar o metodo open(), para criar uma requisição, com o Metodo e uma URL 
        GET -  Requisição para pedir um recurso a qual os dados passam pela URL
        POST - Requisição para criar um recurso a qual os dados passam pelo corpo da requisição
        PUT - Requisição para guardar um recurso na URL fornecido ou caso não exista um recurso ele cria
        DELETE - Requisição para excluir um recurso especifico
    */
    //Chamo o objeto da classe XMLHttpRequest() e utilizo de seu metodo open() para criar uma requisição com seu tipo GET e a url selecionada
    httpRequest.open("GET", url);
    //Especifica o tipo dos dados que será retornado pela requisição
    httpRequest.responseType = "json";
    //Adicionamos uma espera de um evento, a qual será chamado após concluir a requisição 
    httpRequest.addEventListener("load", function() {
        response = httpRequest.response;
        listProducts(response);
    });
    //Envia a Requisição novamente
    httpRequest.send();
}
//Função para criar os elementos com seus devidos atributos
function createElementHTML(tag, att, value, key = null) {
    //Criamos o elemento html 
    var element = document.createElement(tag);
    //Verificamos se há um quarto valor a qual significa que é um atributo especifico 
    if (key === null) {
        //Adicionamos uma classe com o parametros
        addClassElement(element, value);
    } else {
        //adicionamos um atributo com os parâmetros
        addAttElement(element, key, value);
    }
    return element;
}
//Função para criar os produtos dinamicamente com os dados da api
function createProductsHTML(produtos) {
    /* Criamos as variaveis iniciais como:
        - Valor total do pedido,
        - O elemento pai dos produtos que iram vir dinamente, que é o c-list-products 
        - O elemento especifico para armazenar o total do pedido
        - O elemento especifico para armazenar a mensagem de frete gratis, caso haja
    */
    var valorPedido = 0;
    var listProducts = document.getElementById('c-list-products');
    var totalPedido = document.getElementById('buy-price');
    var msgFrete = document.getElementById('msg-frete');
    /*Fazemos a iteração nos produtos que virão como parâmetro na função, para poder criar dinamicamente cada card de produto
    com seus respectivos dados */
    Object.keys(produtos).forEach(function(item) {
        /*Criamos os elementos a serem utilizados em cada card de produto:
        - O elemento pai que irá receber todos os dados do produto, o card em sí
        - O elemento filho de produto que irá receber a imagem do produto
        - O elemento filho de produto que irá receber o nome, o preço padrão e o preço a ser vendido do produto */
        var product = createElementHTML('div', 'class', 'product');
        var pLeft = createElementHTML('div', 'class', 'p-left');
        var pRight = createElementHTML('div', 'class', 'p-right');
        //- O elemento img que irá receber dinamicamente o src da imagem do produto
        var imgProduct = createElementHTML('img', 'class', 'img');
        //  - Adicionamos o atributo src com a url dinamica
        addAttElement(imgProduct, 'src', produtos[item].imageUrl)
            //- O elemento h3 que irá receber o nome do produto
        var nameProduct = createElementHTML('h3', 'class', 'name');
        //  - Inserimos neste elemento o nome dinamico do produto
        nameProduct.innerHTML += produtos[item].name;
        //- O elemento p que irá receber o preço padrão do produto
        var price = createElementHTML('p', 'class', 'price');
        //Transformamos o preço padrão dinamico do produto para o valor real e formatado em string 
        var rPrice = priceString(produtos[item].price);
        //Depois inserimos no elemento price essa string
        price.innerHTML += rPrice;
        //O elemento p que irá receber o preço a ser vendido
        var sellingPrice = createElementHTML('p', 'class', 'sell-price');
        //Transformamos o preço real dinamico do produto para o valor real e formatado em string 
        var rSellPrice = priceString(produtos[item].sellingPrice);
        //Depois inserimos no elemento selling price essa string
        sellingPrice.innerHTML += rSellPrice;
        valorPedido += ((produtos[item].sellingPrice) / 100);
        //Inserimos todos os elementos filhos em seus respectivos elementos pais
        pLeft.appendChild(imgProduct);
        pRight.appendChild(nameProduct);
        pRight.appendChild(price);
        pRight.appendChild(sellingPrice);
        product.appendChild(pLeft);
        product.appendChild(pRight);
        listProducts.appendChild(product);
    });
    //Formatamos o valor do pedido
    var preTotal = priceString(valorPedido);
    //Inserimos no elemento pai do total do pedido
    totalPedido.innerHTML = preTotal;
    //Aqui verificamos se haverá frete gratis para este pedido caso tenha valor > que 10
    if (valorPedido > 10) {
        // Se sim, criamos um elemento para mostrar uma mensagem indicando que o pedido possui o frete gratis
        var frete = createElementHTML('p', 'class', 'msg');
        frete.innerHTML = "Parabéns, sua compra tem frete gratis!";
        msgFrete.appendChild(frete);
    }
}
//Função a qual recebe os dados da API e chama a função createProoducts
function cartProducts(object) {
    var products = object.data.items;
    createProductsHTML(products);
}