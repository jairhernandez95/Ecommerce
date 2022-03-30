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
    console.log(array);
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
                <button onclick="editProduct(${id})">Edit</button>
                <button onclick="deleteProduct(${id})">Delete</button>
            </div>
            `;
    }
    mainDivProducts.innerHTML = card;
}
function deleteProduct(id)
{
    console.log(`${id}`);
}

function editProduct(id)
{
    console.log(`${id}`);
}

getProducts();

