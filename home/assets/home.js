const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZmVhNmZlMDMxZTAwMTliYTE0ZjUiLCJpYXQiOjE3MDIwMzUxMTAsImV4cCI6MTcwMzI0NDcxMH0.WLv7MEyiKHHEnNLPg7xa8OMlp6-gUXcnGiZyuhcjjjs";

// Effettua la richiesta all'API
fetch(apiUrl, {
    headers: {
        Authorization: `Bearer ${apiKey}`
    }
})
.then(response => response.json())
.then(data => {
    // Popola le card dei prodotti con i dati dell'API
    const productContainer = document.querySelector("#product-container");

    data.forEach(product => {
        const card = createProductCard(product);
        productContainer.appendChild(card);
    });
})
.catch(error => {
    console.error("Error fetching data from the API:", error);
});
function createProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("col-sm-6", "col-md-3","col-lg-2", "mb-4");

    card.innerHTML = `
        <div class="card h-100">
            <img src="${product.imageUrl}" class="card-img-top img-fluid" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text"><strong>Brand:</strong> ${product.brand}</p>
                <p class="card-text"><strong>Price:</strong> $${product.price}</p>
            </div>
        </div>
    `;

    return card;
}