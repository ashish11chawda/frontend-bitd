// call quotes api to get a list of quotes
// let url = "https://quotesapibitd.herokuapp.com/quotes";
let url = "http://localhost:5000/quotes";
async function getQuotes() {
    const quotes = document.querySelector('#quotes');
    const quote = document.querySelector('#quote');
    const author = document.querySelector('#author');

    const response = await fetch(`${url}`);
    let data = await response.json();
    console.log(data);
    let quotesHtml = "";
    data.forEach(quote => {
        quotesHtml += `
            <div class="quote">
                <p id="quote">${quote.quote}</p>
                <p id="author">${quote.author}</p>
            </div>
            <hr/>
        `;
        }
    );
    quotes.innerHTML = quotesHtml;
}

async function getQuote() {
    const quote = document.querySelector('#quote');
    const quoteId = document.querySelector('#quoteId');
    const author = document.querySelector('#author');

    const response = await fetch(`${url}/${quoteId.value}`);
    if (response.status === 404) {
        quote.innerHTML = "No quote found";
        author.innerHTML = "Try with different ID";
    } else {
        let data = await response.json();
        console.log(data);
        if (data && data.quote && data.author) {
            quote.innerHTML = data.quote;
            author.innerHTML = data.author;
        } else {
            quote.innerHTML = "No quote found";
        }
    }
}

async function createQuote() {
    const quote = document.querySelector('#quote');
    const author = document.querySelector('#author');
    const quoteData = document.querySelector('#quoteData');
    const authorData = document.querySelector('#authorData');

    if (quote.value && author.value) {
        const response = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quote: quote.value,
                author: author.value
            })
        });
        if (response.status === 404) {
            quoteData.innerHTML = "No quote found";
            authorData.innerHTML = "Try with different ID";
        }
        else if (response.status == 500) {
            quoteData.innerHTML = "Internal Server Error";
            authorData.innerHTML = "Problem saving quote";
        }
        else {
            let data = await response.json();
            console.log(data.quote);
            if (data.quote && data.author) {
                console.log(data.author);
                console.log(quote.innerHTML);
                quoteData.innerHTML = `${data.quote}`;
                authorData.innerHTML = `${data.author}`;
                
            } else {
                quoteData.innerHTML = "No quote found";
                authorData.innerHTML = "";
            }
        }
    } else {
        alert("Please fill all the fields");
    }
}

async function updateQuote() {
    const quote = document.querySelector('#quote');
    const author = document.querySelector('#author');
    const quoteData = document.querySelector('#quoteData');
    const authorData = document.querySelector('#authorData');
    const quoteId = document.querySelector('#quoteId');

    if (quote.value && author.value) {
        const response = await fetch(`${url}/${quoteId.value}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quote: quote.value,
                author: author.value
            })
        });
        if (response.status === 404) {
            quoteData.innerHTML = "No quote found";
            authorData.innerHTML = "Try with different ID";
        }
        else if (response.status == 500) {
            quoteData.innerHTML = "Internal Server Error";
            authorData.innerHTML = "Problem saving quote";
        }
        else {
            let data = await response.json();
            console.log(data.quote);
            if (data.quote && data.author) {
                console.log(data.author);
                console.log(quote.innerHTML);
                quoteData.innerHTML = `${data.quote}`;
                authorData.innerHTML = `${data.author}`;
                
            } else {
                quoteData.innerHTML = "No quote found";
                authorData.innerHTML = "";
            }
        }
    } else {
        alert("Please fill all the fields");
    }
}

async function deleteQuote() {
    const quoteId = document.querySelector('#quoteId');

    if(quoteId.value) {
        const response = await fetch(`${url}/${quoteId.value}`, {
            method: 'DELETE'
        });
        if (response == null || response == "" || response.status === 404) {
            quote.innerHTML = "No quote found";
            author.innerHTML = "Try with different ID";
        } else {
            let data = await response.json();
            console.log(data);
            if (data && data.quote && data.author) {
                quote.innerHTML = data.quote;
                author.innerHTML = data.author;
            } else {
                quote.innerHTML = "No quote found";
            }
        }
    }
}