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
    action = prompt("¿Qué acción deseas hacer \n editar (EDIT) o eliminar (DELETE)?");
    if(action == "EDIT")
    {
        editProduct(element.textContent);
    }
    else if(action == "DELETE")
    {
        deleteProduct(element.textContent);
    }
    else if(action != "EDIT" || "DELETE")
    {
        alert("Esa no es una acción");
    }
}
function editProduct(id)
{
    console.log(id);
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