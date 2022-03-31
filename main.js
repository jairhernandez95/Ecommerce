function alertNewProduct()
{
    let nameNewProduct = prompt("Type the name of the new product");
    let descriptionNameProduct = prompt("Type the descripction of the new product");
    let priceNewProduct = parseInt(prompt("Type the price of the new product"));
    let stockNewProduct = parseInt(prompt("Type the stock of the new product"));
    console.log(nameNewProduct);
    console.log(descriptionNameProduct);
    console.log(priceNewProduct);
    console.log(stockNewProduct);
    postNewProduct(nameNewProduct, descriptionNameProduct, priceNewProduct, stockNewProduct);
}
function postNewProduct(name, description, price, stock)
{
    var data = JSON.stringify({
    "name": `${name}`,
    "description": `${description}`,
    "price": `${price}`,
    "stocks": `${stock}`
    });
    var config = {
    method: 'post',
    url: 'https://items-dab4.restdb.io/rest/products',
    headers: { 
        'x-apikey': '62438d7967937c128d7c92f4', 
        'Content-Type': 'application/json'
    },
    data : data
    };
    axios(config)
    .then(getProducts())
    .catch(function (error) {
    console.log(error);
    });
}
function getProducts()
{
    var data = '';
    var config = {
      method: 'get',
      url: 'https://items-dab4.restdb.io/rest/products',
      headers: { 
        'x-apikey': '62438d7967937c128d7c92f4'
      },
      data : data
    };
    axios(config)
    .then(function (response) {
      showAllProducts(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function showAllProducts(array)
{
    let mainDivProducts = document.getElementById("mainDivProducts");
    let name = null;
    let description = null;
    let price = null;
    let stocks = null;
    let card = ``;
    for(let i = 0; i < array.length; i++)
    {
        name = array[i].name;
        description = array[i].description;
        price = array[i].price;
        stocks = array[i].stocks;
        id = array[i]._id;
        card += `
            <div id="individualProduct" class="individualProduct">
                <h2>${name}</h2> 
                <h3>From: ${description}</h3>
                <h4>${price} USD</h4>
                <h4>${stocks} in storage</h4>
                <h5>ID: <a href="#" onclick=actionInProduct(this)>${id}</a></h5>
                <h6>To edit or delete this element just click on the id number</h6>
            </div>
            `;
    }
    mainDivProducts.innerHTML = card;
}
function actionInProduct(element)
{
    action = prompt("What action do you want to do \n edit(E) or delete(D)?");
    if(action == "E")
    {
        editProduct(element.textContent);
    }
    else if(action == "D")
    {
        deleteProduct(element.textContent);
    }
    else if(action != "E" || "D")
    {
        alert("Esa no es una acción");
    }
}
function editProduct(id)
{
    let action = prompt("What do you want to change? \n name(N), description()D, price(P) or stock(S)");
    if(action == "N")
    {
        let name = prompt("Type the new name");
        let data = JSON.stringify(
            {
                "name": `${name}`,
            }
        );
        let config = {
            method: "put",
            url: `https://items-dab4.restdb.io/rest/products/${id}?x-apikey=62438d7967937c128d7c92f4`,
            headers: {
                'x-apikey': '62438d7967937c128d7c92f4',
                'Content-Type':'application/json'
            },
            data : data
        }
        axios(config).then(getProducts()).catch(console.log(getProducts()));
    }
    else if(action == "D")
    {
        let description = prompt("Type the new description");
        let data = JSON.stringify(
            {
                "description": `${description}`,
            }
        );
        let config = {
            method: "put",
            url: `https://items-dab4.restdb.io/rest/products/${id}?x-apikey=62438d7967937c128d7c92f4`,
            headers: {
                'x-apikey': '62438d7967937c128d7c92f4',
                'Content-Type':'application/json'
            },
            data : data
        }
        axios(config).then(getProducts()).catch(console.log(getProducts()));
    }
    else if(action == "P")
    {
        let price = parseInt(prompt("Type the new price"));
        let data = JSON.stringify(
            {
                "price": `${price}`,
            }
        );
        let config = {
            method: "put",
            url: `https://items-dab4.restdb.io/rest/products/${id}?x-apikey=62438d7967937c128d7c92f4`,
            headers: {
                'x-apikey': '62438d7967937c128d7c92f4',
                'Content-Type':'application/json'
            },
            data : data
        }
        axios(config).then(getProducts()).catch(console.log(getProducts()));
    }
    else if(action == "S")
    {
        let stocks = parseInt(prompt("Type de new stock"));
        let data = JSON.stringify(
            {
                "stocks": `${stocks}`
            }
        );
        let config = {
            method: "put",
            url: `https://items-dab4.restdb.io/rest/products/${id}?x-apikey=62438d7967937c128d7c92f4`,
            headers: {
                'x-apikey': '62438d7967937c128d7c92f4',
                'Content-Type':'application/json'
            },
            data : data
        }
        axios(config).then(getProducts()).catch(console.log(getProducts()));
    }
}
function deleteProduct(id)
{
    console.log(id);
    var config = {
      method: 'delete',
      url: `https://items-dab4.restdb.io/rest/products/${id}?apikey=62438d7967937c128d7c92f4`,
      headers: { }
    };
    axios(config)
    .then(getProducts()).catch(function(error){console.log(error);});
    
}
getProducts();