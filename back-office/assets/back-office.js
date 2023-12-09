function sendPostRequest() {
    const apiUrl = 'https://striveschool-api.herokuapp.com/api/product/';
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZmVhNmZlMDMxZTAwMTliYTE0ZjUiLCJpYXQiOjE3MDIwMzUxMTAsImV4cCI6MTcwMzI0NDcxMH0.WLv7MEyiKHHEnNLPg7xa8OMlp6-gUXcnGiZyuhcjjjs';

    const productName = document.querySelector('#productName').value;
    const productDescription = document.querySelector('#productDescription').value;
    const productBrand = document.querySelector('#productBrand').value;
    const productImageURL = document.querySelector('#productImageURL').value;
    const productPrice = document.querySelector('#productPrice').value;

    const productData = {
        name: productName,
        description: productDescription,
        brand: productBrand,
        imageUrl: productImageURL,
        price: parseFloat(productPrice)
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(productData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Prodotto aggiunto con successo:', data);
        })
        .catch(error => {
            console.error('Errore durante l\'aggiunta del prodotto:', error);
        });
}

function sendGetRequest() {
    const apiUrl = 'https://striveschool-api.herokuapp.com/api/product/';
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZmVhNmZlMDMxZTAwMTliYTE0ZjUiLCJpYXQiOjE3MDIwMzUxMTAsImV4cCI6MTcwMzI0NDcxMH0.WLv7MEyiKHHEnNLPg7xa8OMlp6-gUXcnGiZyuhcjjjs';

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Dati ottenuti con successo:', data);
        })
        .catch(error => {
            console.error('Errore durante la richiesta GET:', error);
        });
}

function showEditForm() {
    const productIdInput = document.createElement('input');
    productIdInput.type = 'text';
    productIdInput.placeholder = 'Inserisci l\'ID del prodotto da modificare';
    productIdInput.style.display = 'block';
    productIdInput.style.margin = '0 auto';
    productIdInput.style.maxWidth = '400px';
    productIdInput.style.width = '100%';
    productIdInput.style.marginBottom = '10px';

    const confirmButton = document.createElement('button');
    confirmButton.type = 'button';
    confirmButton.textContent = 'Conferma';
    confirmButton.style.display = 'block';
    confirmButton.style.margin = 'auto';
    
    confirmButton.onclick = () => {
        const productId = productIdInput.value;
        if (productId) {
            const apiUrl = `https://striveschool-api.herokuapp.com/api/product/${productId}`;
            const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZmVhNmZlMDMxZTAwMTliYTE0ZjUiLCJpYXQiOjE3MDIwMzUxMTAsImV4cCI6MTcwMzI0NDcxMH0.WLv7MEyiKHHEnNLPg7xa8OMlp6-gUXcnGiZyuhcjjjs';

            fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            })
                .then(response => response.json())
                .then(product => {
                    // Creazione del form di modifica
                    const editForm = document.createElement('form');
                    editForm.id = 'editProductForm';

                    for (const key in product) {
                        if (key !== '_id') { // Escludi l'ID dal form
                            const label = document.createElement('label');
                            label.setAttribute('for', key);
                            label.textContent = `${key}:`;

                            const input = document.createElement('input');
                            input.setAttribute('type', 'text');
                            input.setAttribute('id', key);
                            input.setAttribute('name', key);
                            input.value = product[key];

                            const updateButton = document.createElement('button');
                            updateButton.setAttribute('type', 'button');
                            updateButton.textContent = 'Aggiorna';
                            updateButton.onclick = () => sendPutRequest(productId, key);


                            editForm.appendChild(label);
                            editForm.appendChild(input);
                            editForm.appendChild(updateButton);
                        }
                    }

                    // Aggiungi il form di modifica alla pagina
                    document.body.appendChild(editForm);
                })
                .catch(error => {
                    console.error('Errore durante la richiesta GET per la modifica:', error);
                });
        } else {
            alert('Inserisci un ID valido.');
        }
    };


    // Aggiungi l'input e il pulsante alla pagina
    document.body.appendChild(productIdInput);
    document.body.appendChild(confirmButton);

}

function sendPutRequest(productId, field) {
    const apiUrl = `https://striveschool-api.herokuapp.com/api/product/${productId}`;
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZmVhNmZlMDMxZTAwMTliYTE0ZjUiLCJpYXQiOjE3MDIwMzUxMTAsImV4cCI6MTcwMzI0NDcxMH0.WLv7MEyiKHHEnNLPg7xa8OMlp6-gUXcnGiZyuhcjjjs';

    const updatedValue = document.querySelector(`#${field}`).value;
    const updatedProductData = { [field]: updatedValue };

    fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(updatedProductData)
    })
        .then(response => response.json())
        .then(data => {
            console.log(`Campo ${field} del prodotto aggiornato con successo:`, data);
            // Rimuovi il form di modifica dalla pagina dopo l'aggiornamento del campo
            document.body.removeChild(document.getElementById('editProductForm'));
        })
        .catch(error => {
            console.error(`Errore durante l'aggiornamento del campo ${field} del prodotto:`, error);
        });
}

function sendDeleteRequest(productId) {
    const apiUrl = `https://striveschool-api.herokuapp.com/api/product/${productId}`;
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZmVhNmZlMDMxZTAwMTliYTE0ZjUiLCJpYXQiOjE3MDIwMzUxMTAsImV4cCI6MTcwMzI0NDcxMH0.WLv7MEyiKHHEnNLPg7xa8OMlp6-gUXcnGiZyuhcjjjs';

    fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        }
    })
        .then(response => {
            if (response.ok) {
                console.log('Prodotto cancellato con successo.');
            } else {
                console.error('Errore durante la cancellazione del prodotto:', response.statusText);
            }
            // Rimuovi il form di modifica dalla pagina dopo la cancellazione
            document.body.removeChild(document.getElementById('editProductForm'));
        })
        .catch(error => {
            console.error('Errore durante la cancellazione del prodotto:', error);
        });
}