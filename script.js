const urls = ['json/acima-10-reais.json', 'json/abaixo-10-reais.json']

//Acionamos a funções desejadas somentes após o carregamento de toda a pagina e seu conteudo
window.onload = function() {
        //Referenciamos o nosso contexto e chamamos a função getJSON dentro dele
        this.getAxisJSON(urls[0]);
    }
    //Função para adicionar um atributo a um elemento em especifico
function addAttElement(element, item, atributo) {
    element.setAttribute(item, atributo);
}
//Função para adicionar uma classe em um elemento
function addClassElement(element, classe) {
    var classes = element.className.split(' ');
    var getIndex = classes.indexOf(classe);
    if (getIndex === -1) {
        classes.push(classe);
        element.className = classes.join(' ');
    }
}
//Função para deleter uma classe de um elemento
function delClassElement(element, classe) {
    var classes = element.className.split(' ');
    var getIndex = classes.indexOf(classe);

    if (getIndex > -1) {
        classes.splice(getIndex, 1);
    }
    elemento.className = classes.join(' ');
}
//Função para poder selecionar o elemento HTML a qual será inserido os dados
function getElementHTML(name) {
    return document.getElementsByClassName(name);
}
//Função criada para executar a requisição GET pelo axis e recebermos todo o corpo da resposta 
function getAxisJSON(url) {
    //Instanciamos o axios e utilizamos de sua função get para efetuar a requisição com uma url especifica
    axios.get(url)
        .then(function(response) {
            // handle success
            cartProducts(response);
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })
        .then(function() {
            // always executed
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
    var element = document.createElement(tag);
    if (key === null) {
        addClassElement(element, value);
    } else {
        addAttElement(element, key, value);
    }
    return element;
}
//Função para criar elemento com seu nome e atributos caso necessarios
function createProductsHTML(produtos) {
    var valorPedido = 0;
    var listProducts = document.getElementById('c-list-products');
    var totalPedido = document.getElementById('buy-price');
    var msgFrete = document.getElementById('msg-frete');
    Object.keys(produtos).forEach(function(item) {
        var product = createElementHTML('div', 'class', 'product');
        var pLeft = createElementHTML('div', 'class', 'p-left');
        var pRight = createElementHTML('div', 'class', 'p-right');
        var imgProduct = createElementHTML('img', 'class', 'img');
        addAttElement(imgProduct, 'src', produtos[item].imageUrl)
        var nameProduct = createElementHTML('h3', 'class', 'name');
        nameProduct.innerHTML += produtos[item].name;
        var price = createElementHTML('p', 'class', 'price');
        var prePrice = (produtos[item].price / 100)
        var rPrice = "R$ " + prePrice.toString().replace(".", ",");
        price.innerHTML += rPrice;
        var sellingPrice = createElementHTML('p', 'class', 'sell-price');
        var preSell = (produtos[item].sellingPrice / 100);
        var rSellPrice = "R$ " + preSell.toString().replace(".", ",");
        sellingPrice.innerHTML += rSellPrice;
        valorPedido += preSell;
        pLeft.appendChild(imgProduct);
        pRight.appendChild(nameProduct);
        pRight.appendChild(price);
        pRight.appendChild(sellingPrice);
        product.appendChild(pLeft);
        product.appendChild(pRight);
        listProducts.appendChild(product);
    });
    var preTotal = valorPedido.toString().replace(".", ",")
    totalPedido.innerHTML = "R$ " + preTotal;
    if (valorPedido > 10) {
        var frete = createElementHTML('p', 'class', 'msg');
        frete.innerHTML = "Parabéns, sua compra tem frete gratis!";
        msgFrete.appendChild(frete);
    }
}
//Função a qual recebe o objeto retornado da requisição do GetJSON()
function cartProducts(object) {
    var products = object.data.items;
    createProductsHTML(products);
}