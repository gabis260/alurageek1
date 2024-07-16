document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('productForm');
    const productList = document.querySelector('.product-list');

    const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Simulated API endpoint

    // Fetch existing products from API
    async function fetchProducts() {
        const response = await fetch(apiUrl);
        const products = await response.json();
        products.forEach(product => renderProduct(product));
    }

    // Validate the form
    function validateForm(name, price, image) {
        return name !== '' && price !== '' && image !== '';
    }

    // Add a product
    async function addProduct(name, price, image) {
        const product = {
            title: name,
            body: `Precio: ${price}, Imagen: ${image}`,
            userId: 1
        };
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        
        const newProduct = await response.json();
        renderProduct(newProduct);
    }

    // Render a product
    function renderProduct(product) {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.body.split(', ')[1].split(': ')[1]}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.body.split(', ')[0]}</p>
            <button>Eliminar</button>
        `;

        productElement.querySelector('button').addEventListener('click', async function () {
            await deleteProduct(product.id);
            productList.removeChild(productElement);
        });

        productList.appendChild(productElement);
    }

    // Delete a product
    async function deleteProduct(productId) {
        await fetch(`${apiUrl}/${productId}`, {
            method: 'DELETE'
        });
    }

    productForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productImage = document.getElementById('productImage').value;

        if (validateForm(productName, productPrice, productImage)) {
            addProduct(productName, productPrice, productImage);
            productForm.reset();
        } else {
            alert('Por favor, completa todos los campos correctamente.');
        }
    });

    fetchProducts();
});
