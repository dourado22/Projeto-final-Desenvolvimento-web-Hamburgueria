function enviarPedido() {
    const form = document.getElementById('orderForm');
    const selectedProducts = [];
    let totalPrice = 0;

    form.querySelectorAll('.product').forEach((productDiv, index) => {
        const checkbox = productDiv.querySelector('input[type="checkbox"]');
        const quantityInput = productDiv.querySelector('input[type="number"]');
        if (checkbox.checked) {
            const product = {
                nome: checkbox.value,
                quantidade: parseInt(quantityInput.value),
                preco: parseFloat(checkbox.getAttribute('data-price'))
            };
            totalPrice += product.preco * product.quantidade;
            selectedProducts.push(product);
        }
    });

    const paymentMethod = form.querySelector('input[name="payment"]:checked').value;
    let frete = totalPrice >= 80 ? 0 : 15;
    totalPrice += frete;

    const orderDetails = {
        numeroPedido: Math.floor(Math.random() * 1000000),
        produtos: selectedProducts,
        total: totalPrice,
        metodoPagamento: paymentMethod,
        frete: frete
    };

    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    window.location.href = 'obrigado.html';
}

function displayOrderDetails() {
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));
    if (orderDetails) {
        document.getElementById('numero-pedido').innerText = orderDetails.numeroPedido;
    }
}

// Função para enviar o pedido e armazenar os detalhes no localStorage
function enviarPedido() {
    const form = document.querySelector('form');
    const selectedProducts = [];
    let totalPrice = 0;

    form.querySelectorAll('.product').forEach(productDiv => {
        const checkbox = productDiv.querySelector('input[type="checkbox"]');
        const quantityInput = productDiv.querySelector('input[type="number"]');
        if (checkbox.checked) {
            const product = {
                nome: productDiv.querySelector('h2').innerText,
                quantidade: parseInt(quantityInput.value),
                preco: parseFloat(productDiv.querySelector('.price').innerText.replace('R$', '').replace(',', '.'))
            };
            totalPrice += product.preco * product.quantidade;
            selectedProducts.push(product);
        }
    });

    const paymentMethod = form.querySelector('input[name="payment"]:checked').value;
    let frete = totalPrice > 80 ? 0 : 15;
    totalPrice += frete;

    const orderDetails = {
        numeroPedido: Math.floor(Math.random() * 1000000),
        produtos: selectedProducts,
        total: totalPrice,
        metodoPagamento: paymentMethod,
        frete: frete,
        countdown: 900
    };

    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    window.location.href = 'obrigado.html';
}

// Função para exibir os detalhes do pedido na página "obrigado.html"
function displayOrderDetails() {
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));
    if (orderDetails) {
        document.getElementById('numero-pedido').innerText = orderDetails.numeroPedido;
        startCountdown(orderDetails.countdown);
    }
}

// Função para carregar os detalhes do pedido na página "detalhes.html"
function loadOrderDetails() {
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));
    if (orderDetails) {
        document.getElementById('numeroPedido').innerText = `Número do Pedido: ${orderDetails.numeroPedido}`;
        
        const productList = document.getElementById('productList');
        productList.innerHTML = '<h3>Produtos Selecionados:</h3>';
        orderDetails.produtos.forEach(produto => {
            const productDiv = document.createElement('div');
            productDiv.innerText = `${produto.nome} - Quantidade: ${produto.quantidade} - Preço: R$${(produto.preco * produto.quantidade).toFixed(2)}`;
            productList.appendChild(productDiv);
        });

        document.getElementById('totalPrice').innerText = `Valor Total: R$${orderDetails.total.toFixed(2)}`;
        document.getElementById('paymentMethod').innerText = `Forma de Pagamento: ${orderDetails.metodoPagamento}`;
        document.getElementById('frete').innerText = orderDetails.frete === 0 ? 'Frete Grátis' : `Frete: R$${orderDetails.frete.toFixed(2)}`;

        startCountdown(orderDetails.countdown);
    }
}

// Função para verificar a senha e carregar os detalhes do pedido
function checkPassword() {
    const password = document.getElementById('orderPassword').value;
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));
    if (orderDetails && password === orderDetails.numeroPedido.toString()) {
        loadOrderDetails();
    } else {
        alert('Senha incorreta!');
    }
}

// Função de contagem regressiva
function startCountdown(duration) {
    let timer = duration, minutes, seconds;
    const countdownElement = document.getElementById('countdown');
    setInterval(() => {
        minutes = parseInt(timer / 60, 35);
        seconds = parseInt(timer % 60, 35);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        countdownElement.textContent = `Tempo restante: ${minutes}:${seconds}`;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}