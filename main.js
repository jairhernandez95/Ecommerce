function alertNewProduct()
{
    let name = null;
    let description = null;
    let price = null;
    let stock = null;
    Swal.fire(
        {
            title: 'Type the next info to add a new product',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Title">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Developers">' +
                '<input id="swal-input3" class="swal2-input" placeholder="Price">' +
                '<input id="swal-input4" class="swal2-input" placeholder="Stock">',
            preConfirm: () => 
            {
                name = document.getElementById("swal-input1").value;
                description = document.getElementById("swal-input2").value;
                price = document.getElementById("swal-input3").value;
                stock = document.getElementById("swal-input4").value;
                postNewProduct(name, description, price, stock);
            }
    }
    );   
}
function postNewProduct(name, description, price, stock)
{
    var data = JSON.stringify(
        {
            "name": `${name}`,
            "description": `${description}`,
            "price": `${price}`,
            "stocks": `${stock}`
        }
    );
    var config = 
        {
            method: 'post',
            url: 'https://items-dab4.restdb.io/rest/products',
            headers: { 
                'x-apikey': '62438d7967937c128d7c92f4', 
                'Content-Type': 'application/json'
            },
            data : data
        };
    axios(config)
    .then(() => 
    {
        Swal.fire("The product was added");
        getProducts();
    })
    .catch(function (error) 
    {
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
        // card += `
        //     <div id="individualProduct" class="individualProduct">
        //         <h2>${name}</h2> 
        //         <h3>From: ${description}</h3>
        //         <h4>${price} USD</h4>
        //         <h4>${stocks} in storage</h4>
        //         <h5>ID: <a href="#" onclick=actionInProduct(this)>${id}</a></h5>
        //         <h6>To edit or delete this element just click on the id number</h6>
        //     </div>
        //     `;
        card += `
            <div class="card"  style="width: 18rem;">
                <div class="card-body">
                    <div class="titlesOfCard">
                        <h2 class="card-title">${name}</h2>
                        <h4 class="card-subtitle mb-2 text-muted">From: ${description}</h4>
                        <h4>${price} USD</h4>
                        <h4>${stocks} in storage</h4>
                    </div>
                    <div class="card-footer cardButtonsDiv" valign="bottom">
                        <h6>What do you want to do with this product?</h6>
                        <div class="cardButtonsDivDiv">
                            <button class="btn btn-outline-warning" type="submit" value="${id}" onclick="editProduct(this.value)">Edit</button>
                            <button class="btn btn-outline-danger" type="submit" value="${id}" onclick="deleteProduct(this.value)">Delete</button>
                        </div>
                    </div>
                </div>
            </div>`;
    }
    mainDivProducts.innerHTML = card;
}
getProducts();
function editProduct(id)
{
    const {value: action} = Swal.fire(
        {
            title: 'Select an action',
            input: 'select',
            inputOptions: {
                'Actions': 
                {
                    name: 'Change name',
                    description: 'Change description',
                    price: 'Change price',
                    stocks: 'Change stock'
                }
        },
        inputPlaceholder: 'Select an action',
        showCancelButton: true,
        inputValidator: (value) => 
        {
            return new Promise(() => 
            {
                console.log(value);
                value = String(value);
                if (value == 'name') 
                {
                    const {value : newName} = Swal.fire(
                        {
                            title: 'Type the new name',
                            html:
                                '<input id="swal-input1" class="swal2-input">',
                            focusConfirm: false,
                            preConfirm: () =>
                            {
                                let name = document.getElementById("swal-input1").value;
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
                                axios(config).then(() => 
                                {
                                    Swal.fire("The product was updated successfully");
                                    getProducts();
                                }).catch(console.log(getProducts()));
                            }          
                        });
                }
                else if(value =="description")
                {
                    const {value : newDescription} = Swal.fire(
                        {
                            title: 'Type the new name',
                            html:
                                '<input id="swal-input1" class="swal2-input">',
                            focusConfirm: false,
                            preConfirm: () =>
                            {
                                let description = document.getElementById("swal-input1").value;
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
                                axios(config).then(() => 
                                {
                                    Swal.fire("The product was updated successfully");
                                    getProducts();
                                }).catch(console.log(getProducts()));
                            }          
                        });
                }
                else if(value =="price")
                {
                    const {value : newPrice} = Swal.fire(
                        {
                            title: 'Type the new name',
                            html:
                                '<input id="swal-input1" class="swal2-input">',
                            focusConfirm: false,
                            preConfirm: () =>
                            {
                                let price = document.getElementById("swal-input1").value;
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
                                axios(config).then(() => 
                                {
                                    Swal.fire("The product was updated successfully");
                                    getProducts();
                                }).catch(console.log(getProducts()));
                            }          
                        });
                }
                else if(value =="stocks")
                {
                    const {value : newStock} = Swal.fire(
                        {
                            title: 'Type the new name',
                            html:
                                '<input id="swal-input1" class="swal2-input">',
                            focusConfirm: false,
                            preConfirm: () =>
                            {
                                let stocks = document.getElementById("swal-input1").value;
                                let data = JSON.stringify(
                                    {
                                        "stocks": `${stocks}`,
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
                                axios(config).then(() => 
                                {
                                    Swal.fire("The product was updated successfully");
                                    getProducts();
                                }).catch(console.log(getProducts()));
                            }          
                        });
                }
            })
        }
      })
      if (action) {
        Swal.fire(`You selected: ${action}`)
      }
    
    // let action = prompt("What do you want to change? \n name(N), description()D, price(P) or stock(S)");
    // if(action == "N")
    // {
    //     let name = prompt("Type the new name");
    //     let data = JSON.stringify(
    //         {
    //             "name": `${name}`,
    //         }
    //     );
    //     let config = {
    //         method: "put",
    //         url: `https://items-dab4.restdb.io/rest/products/${id}?x-apikey=62438d7967937c128d7c92f4`,
    //         headers: {
    //             'x-apikey': '62438d7967937c128d7c92f4',
    //             'Content-Type':'application/json'
    //         },
    //         data : data
    //     }
    //     axios(config).then(() => 
    //     {
    //         alert("The product was edited successfully");
    //         getProducts();
    //     }).catch(console.log(getProducts()));
    // }
    // else if(action == "D")
    // {
    //     let description = prompt("Type the new description");
    //     let data = JSON.stringify(
    //         {
    //             "description": `${description}`,
    //         }
    //     );
    //     let config = {
    //         method: "put",
    //         url: `https://items-dab4.restdb.io/rest/products/${id}?x-apikey=62438d7967937c128d7c92f4`,
    //         headers: {
    //             'x-apikey': '62438d7967937c128d7c92f4',
    //             'Content-Type':'application/json'
    //         },
    //         data : data
    //     }
    //     axios(config).then(() => 
    //     {
    //         alert("The product was edited successfully");
    //         getProducts();
    //     }).catch(console.log(getProducts()));
    // }
    // else if(action == "P")
    // {
    //     let price = parseInt(prompt("Type the new price"));
    //     let data = JSON.stringify(
    //         {
    //             "price": `${price}`,
    //         }
    //     );
    //     let config = {
    //         method: "put",
    //         url: `https://items-dab4.restdb.io/rest/products/${id}?x-apikey=62438d7967937c128d7c92f4`,
    //         headers: {
    //             'x-apikey': '62438d7967937c128d7c92f4',
    //             'Content-Type':'application/json'
    //         },
    //         data : data
    //     }
    //     axios(config).then(() => 
    //     {
    //         alert("The product was edited successfully");
    //         getProducts();
    //     }).catch(console.log(getProducts()));
    // }
    // else if(action == "S")
    // {
    //     let stocks = parseInt(prompt("Type de new stock"));
    //     let data = JSON.stringify(
    //         {
    //             "stocks": `${stocks}`
    //         }
    //     );
    //     let config = {
    //         method: "put",
    //         url: `https://items-dab4.restdb.io/rest/products/${id}?x-apikey=62438d7967937c128d7c92f4`,
    //         headers: {
    //             'x-apikey': '62438d7967937c128d7c92f4',
    //             'Content-Type':'application/json'
    //         },
    //         data : data
    //     }
    //     axios(config).then(() => 
    //     {
    //         alert("The product was edited successfully");
    //         getProducts();
    //     }).catch(console.log(getProducts()));
    // }
    // else
    // {
    //     alert("Thats not an action");
    // }
}
function deleteProduct(id)
{
    Swal.fire(
        {
            title: 'Do you want to delete this product?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#FF0000', 
        }
    ).then((result) => 
        {
            if (result.isConfirmed) 
                {
                    var config = 
                    {
                        method: 'delete',
                        url: `https://items-dab4.restdb.io/rest/products/${id}?apikey=62438d7967937c128d7c92f4`,
                        headers: { }
                    };
                    axios(config).then( () => 
                    {
                        Swal.fire("The product was removed");
                        getProducts();
                    }).catch(function(error)
                        {
                            console.log(error);
                        })
                } 
            else if (result.isDenied) 
            {
                Swal.fire('Changes are not saved', '', 'info')
            }
        }
    )
// let answer = prompt("Are you sure? yes(Y), no(N)");
// if(answer == "Y")
// {
//     var config = {
//         method: 'delete',
//         url: `https://items-dab4.restdb.io/rest/products/${id}?apikey=62438d7967937c128d7c92f4`,
//         headers: { }
//       };
//       axios(config).then( () => 
//       {
//           alert("The product was removed");
//           getProducts();
//       }).catch(function(error)
//         {
//             console.log(error);
//         });
// }
// else if(answer != "Y")
// {
//     alert("The product was NOT removed")
// }
}