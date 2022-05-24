const { Product, Category, Colors, Sizes, Stock } = require('../db');
const items = require('../../bin/products');

// funcion para hacer querys: por id busca por PK y por name busca por findOne
const getFromDB = async ( table, param, value ) => {
    // let { param, value } = query;
    let where = {
        [param]: value
    }
    let res = null
    if (param === 'id') {
        res = await table.findByPk({where});
    }
    if (param === 'name') {
        res = await table.findOne({where});
    }
    return res
}

// ----------------------------------------------------------------------------------
// PROMESA: Upload de PRODUCTOS a la base de datos
// ----------------------------------------------------------------------------------
const promisifiedPostProducts = () => {
    return new Promise(async (resolve, reject) => {
        const newData = [];
        items.forEach( element => {
            let imgs = element.images.map( img => `http:${img.src}` )
            const data = {
                "name": element.handle,
                "fullName": element.fullName,
                "gender": element.gender,
                "detail": element.description,
                "price": element.price,
                "imagecover": element.featuredImage.src,
                "imageurl": imgs
            }
            newData.push(data);
        });  
        const count = await Product.count();
        if (count === 0) {
            try {
                const newType = await Product.bulkCreate(newData)
                resolve(newType);
            
            } catch (error) {
                reject(error);
            }
        } else {
            resolve(null);
        }
    })
}

// ----------------------------------------------------------------------------------
// PROMESA: Upload de CATEGORIAS a la base de datos
// ----------------------------------------------------------------------------------
const promisifiedPostCategories = () => {
    return new Promise(async (resolve, reject) => {
        let newData = [];
        items.forEach( element => {
            element.bestFor.forEach( category => {
                if (!newData.includes(category)) {
                    newData.push(category);
                }
            })
        });
        newData = newData.map( elem => { return { "name": elem } })
        try {
            const newType = await Category.bulkCreate(newData)
            resolve(newType)
        
        } catch (error) {
            reject(error);
        }
    })
}

// ----------------------------------------------------------------------------------
// PROMESA: Generacion de relaciones entre productos y categorias segun JSONs
// ----------------------------------------------------------------------------------
const promisifiedRelCatProd = () => {
    return new Promise((resolve, reject) => {
        try {
            items.forEach( async element => {
                const productDB = await getFromDB( Product, 'name', element.handle )
                element.bestFor.forEach( async category => {
                    try {
                        const categoryDB = await getFromDB( Category, 'name', category )
                        await productDB.setCategories(categoryDB)
                    } catch (error) {
                        throw new Error (error)
                    }
                });
            });
            resolve('Products - Categories Relations Created');
        }
        catch (error) {
            console.log(error);
            reject(error);
        }

    })
}

// ----------------------------------------------------------------------------------
// PROMESA: Upload de COLORS a la base de datos
// ----------------------------------------------------------------------------------
const promisifiedPostColors = () => {
    return new Promise(async (resolve, reject) => {
        let newData = [];
        items.forEach( element => {
            element.hues.forEach( color => {
                if (!newData.includes(color)) {
                    newData.push(color);
                }
            })
        });
        newData = newData.map( elem => { return { "name": elem } })
        try {
            const newType = await Colors.bulkCreate(newData)
            resolve(newType);
        
        } catch (error) {
            reject(error);
        }
    })
}

// ----------------------------------------------------------------------------------
// PROMESA: Upload de SIZES a la base de datos
// ----------------------------------------------------------------------------------
const promisifiedPostSizes = () => {
    return new Promise(async (resolve, reject) => {
        let newData = [];
        items.forEach( element => {
            element.sizesSortOrder.forEach( size => {
                if (!newData.includes(size)) {
                    newData.push(size);
                }
            })
        });
        newData = newData.map( elem => { return { "name": elem } })
        try {
            const newType = await Sizes.bulkCreate(newData)
            resolve(newType);
        
        } catch (error) {
            reject(error);
        }
    })
}

// ----------------------------------------------------------------------------------
// PROMESA: Upload de STOCK a la base de datos, aca se arman las relaciones en STOCK
// ----------------------------------------------------------------------------------
const promisifiedPostStock = async () => {
    return new Promise( async (resolve, reject) => {
        
        try {
            let stockReg = {
                "quantity": 1000,
                "available": true
            }
            items.forEach( async prod => {
                const prodIdQuery = await Product.findAll({
                    where: {
                        name: prod.handle
                    }
                })
                if ( prodIdQuery !== null ) {
                    // console.log(prodId[0].dataValues.id)
                    const prodId = prodIdQuery[0].dataValues.id
                    for ( let size in prod.sizes ) {
                        const sizeIdQuery = await Sizes.findAll({
                            where: {
                                name: size
                            }
                        })
                        if ( sizeIdQuery !== null ) {
                            // console.log(sizeIdQuery[0].dataValues.id);
                            const sizeId = sizeIdQuery[0].dataValues.id;
                            prod.hues.forEach( async hue => {
                                const hueIdQuery = await Colors.findAll({
                                    where: {
                                        name: hue
                                    }
                                })
                                if ( hueIdQuery !== null ) {
                                    const hueId = hueIdQuery[0].dataValues.id;
                                    
                                    try {
                                        const newStock = await Stock.create({
                                            ...stockReg,
                                            "productId": prodId,
                                            "sizeId": sizeId,
                                            "colorId": hueId
                                        })
                                    }
                                    catch (err) {
                                        throw new Error(err)
                                    }
                                    
                                } else console.log('hue not found')
                            })
                        } else console.log('size not found')
                    }
                } else console.log('product not found')
                
            });
            resolve('Stock table created');
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    });
/*
    // algunos
    let data = [
        {
          quantity: 1000,
          available: true,
          productId: 1,
          sizeId: 1,
          colorId: 1
        },
        {
          quantity: 1000,
          available: true,
          productId: 4,
          sizeId: 1,
          colorId: 4
        },
        {
          quantity: 1000,
          available: true,
          productId: 2,
          sizeId: 1,
          colorId: 2
        },
        {
          quantity: 1000,
          available: true,
          productId: 3,
          sizeId: 1,
          colorId: 3
        },
        {
          quantity: 1000,
          available: true,
          productId: 5,
          sizeId: 1,
          colorId: 5
        },
        {
          quantity: 1000,
          available: true,
          productId: 6,
          sizeId: 1,
          colorId: 2
        },
        {
          quantity: 1000,
          available: true,
          productId: 7,
          sizeId: 1,
          colorId: 4
        },
        {
          quantity: 1000,
          available: true,
          productId: 8,
          sizeId: 1,
          colorId: 6
        },
        {
          quantity: 1000,
          available: true,
          productId: 9,
          sizeId: 1,
          colorId: 7
        },
        {
          quantity: 1000,
          available: true,
          productId: 10,
          sizeId: 1,
          colorId: 4
        },
        {
          quantity: 1000,
          available: true,
          productId: 11,
          sizeId: 1,
          colorId: 8
        },
        {
          quantity: 1000,
          available: true,
          productId: 12,
          sizeId: 1,
          colorId: 4
        },
        {
          quantity: 1000,
          available: true,
          productId: 13,
          sizeId: 1,
          colorId: 9
        },
        {
          quantity: 1000,
          available: true,
          productId: 14,
          sizeId: 1,
          colorId: 10
        },
        {
          quantity: 1000,
          available: true,
          productId: 15,
          sizeId: 1,
          colorId: 6
        },
        {
          quantity: 1000,
          available: true,
          productId: 16,
          sizeId: 1,
          colorId: 9
        },
        {
          quantity: 1000,
          available: true,
          productId: 17,
          sizeId: 1,
          colorId: 1
        },
        {
          quantity: 1000,
          available: true,
          productId: 18,
          sizeId: 1,
          colorId: 2
        },
        {
          quantity: 1000,
          available: true,
          productId: 19,
          sizeId: 1,
          colorId: 8
        },
        {
          quantity: 1000,
          available: true,
          productId: 20,
          sizeId: 1,
          colorId: 1
        },
        {
          quantity: 1000,
          available: true,
          productId: 21,
          sizeId: 1,
          colorId: 1
        },
        {
          quantity: 1000,
          available: true,
          productId: 23,
          sizeId: 1,
          colorId: 10
        },
        {
          quantity: 1000,
          available: true,
          productId: 24,
          sizeId: 1,
          colorId: 8
        },
        {
          quantity: 1000,
          available: true,
          productId: 25,
          sizeId: 1,
          colorId: 9
        },
        {
          quantity: 1000,
          available: true,
          productId: 26,
          sizeId: 1,
          colorId: 6
        },
        {
          quantity: 1000,
          available: true,
          productId: 22,
          sizeId: 1,
          colorId: 4
        },
        {
          quantity: 1000,
          available: true,
          productId: 27,
          sizeId: 1,
          colorId: 3
        },
        {
          quantity: 1000,
          available: true,
          productId: 28,
          sizeId: 1,
          colorId: 1
        },
        {
          quantity: 1000,
          available: true,
          productId: 28,
          sizeId: 1,
          colorId: 9
        },
        {
          quantity: 1000,
          available: true,
          productId: 29,
          sizeId: 1,
          colorId: 4
        },
        {
          quantity: 1000,
          available: true,
          productId: 30,
          sizeId: 1,
          colorId: 8
        },
        {
          quantity: 1000,
          available: true,
          productId: 31,
          sizeId: 1,
          colorId: 1
        },
        {
          quantity: 1000,
          available: true,
          productId: 31,
          sizeId: 1,
          colorId: 5
        },
        {
          quantity: 1000,
          available: true,
          productId: 32,
          sizeId: 1,
          colorId: 11
        },
        {
          quantity: 1000,
          available: true,
          productId: 32,
          sizeId: 1,
          colorId: 4
        },
        {
          quantity: 1000,
          available: true,
          productId: 33,
          sizeId: 1,
          colorId: 11
        },
        {
          quantity: 1000,
          available: true,
          productId: 34,
          sizeId: 1,
          colorId: 4
        },
        {
          quantity: 1000,
          available: true,
          productId: 35,
          sizeId: 1,
          colorId: 4
        },
        {
          quantity: 1000,
          available: true,
          productId: 36,
          sizeId: 1,
          colorId: 6
        },
        {
          quantity: 1000,
          available: true,
          productId: 37,
          sizeId: 1,
          colorId: 5
        },
        {
          quantity: 1000,
          available: true,
          productId: 38,
          sizeId: 1,
          colorId: 4
        },
        {
          quantity: 1000,
          available: true,
          productId: 39,
          sizeId: 1,
          colorId: 2
        },
        {
          quantity: 1000,
          available: true,
          productId: 40,
          sizeId: 1,
          colorId: 4
        },
        {
          quantity: 1000,
          available: true,
          productId: 42,
          sizeId: 1,
          colorId: 1
        },
        {
          quantity: 1000,
          available: true,
          productId: 43,
          sizeId: 1,
          colorId: 2
        },
        {
          quantity: 1000,
          available: true,
          productId: 44,
          sizeId: 1,
          colorId: 1
        },
        {
          quantity: 1000,
          available: true,
          productId: 45,
          sizeId: 1,
          colorId: 1
        },
        {
          quantity: 1000,
          available: true,
          productId: 41,
          sizeId: 1,
          colorId: 2
        },
        {
          quantity: 1000,
          available: true,
          productId: 46,
          sizeId: 1,
          colorId: 3
        },
        {
          quantity: 1000,
          available: true,
          productId: 47,
          sizeId: 1,
          colorId: 4
        },
        {
          quantity: 1000,
          available: true,
          productId: 48,
          sizeId: 1,
          colorId: 7
        },
        {
          quantity: 1000,
          available: true,
          productId: 49,
          sizeId: 1,
          colorId: 10
        },
        {
          quantity: 1000,
          available: true,
          productId: 50,
          sizeId: 1,
          colorId: 6
        },
        {
          quantity: 1000,
          available: true,
          productId: 51,
          sizeId: 1,
          colorId: 1
        },
        {
          quantity: 1000,
          available: true,
          productId: 52,
          sizeId: 1,
          colorId: 11
        },
        {
          quantity: 1000,
          available: true,
          productId: 53,
          sizeId: 1,
          colorId: 4
        },
        {
          quantity: 1000,
          available: true,
          productId: 54,
          sizeId: 1,
          colorId: 2
        },
        {
          quantity: 1000,
          available: true,
          productId: 56,
          sizeId: 1,
          colorId: 2
        },
        {
          quantity: 1000,
          available: true,
          productId: 57,
          sizeId: 1,
          colorId: 1
        },
        {
          quantity: 1000,
          available: true,
          productId: 58,
          sizeId: 1,
          colorId: 1
        },
        {
          quantity: 1000,
          available: true,
          productId: 59,
          sizeId: 1,
          colorId: 1
        },
        {
          quantity: 1000,
          available: true,
          productId: 55,
          sizeId: 1,
          colorId: 4
        },
        {
          quantity: 1000,
          available: true,
          productId: 60,
          sizeId: 1,
          colorId: 9
        },
        {
          quantity: 1000,
          available: true,
          productId: 61,
          sizeId: 1,
          colorId: 2
        },
        {
          quantity: 1000,
          available: true,
          productId: 62,
          sizeId: 1,
          colorId: 7
        },
        {
          quantity: 1000,
          available: true,
          productId: 63,
          sizeId: 1,
          colorId: 7
        },
        {
          quantity: 1000,
          available: true,
          productId: 64,
          sizeId: 1,
          colorId: 3
        },
        {
          quantity: 1000,
          available: true,
          productId: 64,
          sizeId: 1,
          colorId: 11
        },
        {
          quantity: 1000,
          available: true,
          productId: 65,
          sizeId: 1,
          colorId: 11
        },
        {
          quantity: 1000,
          available: true,
          productId: 67,
          sizeId: 1,
          colorId: 2
        },
        {
          quantity: 1000,
          available: true,
          productId: 68,
          sizeId: 1,
          colorId: 1
        },
        {
          quantity: 1000,
          available: true,
          productId: 69,
          sizeId: 1,
          colorId: 9
        },
        {
          quantity: 1000,
          available: true,
          productId: 66,
          sizeId: 1,
          colorId: 8
        },
        {
          quantity: 1000,
          available: true,
          productId: 66,
          sizeId: 1,
          colorId: 6
        },
        {
          quantity: 1000,
          available: true,
          productId: 70,
          sizeId: 1,
          colorId: 1
        },
        {
          quantity: 1000,
          available: true,
          productId: 71,
          sizeId: 1,
          colorId: 1
        },
        {
          quantity: 1000,
          available: true,
          productId: 72,
          sizeId: 1,
          colorId: 4
        },
        {
          quantity: 1000,
          available: true,
          productId: 73,
          sizeId: 1,
          colorId: 1
        },
        {
          quantity: 1000,
          available: true,
          productId: 74,
          sizeId: 1,
          colorId: 4
        },
        {
          quantity: 1000,
          available: true,
          productId: 75,
          sizeId: 1,
          colorId: 9
        },
        {
          quantity: 1000,
          available: true,
          productId: 76,
          sizeId: 1,
          colorId: 11
        },
        {
          quantity: 1000,
          available: true,
          productId: 77,
          sizeId: 1,
          colorId: 9
        },
        {
          quantity: 1000,
          available: true,
          productId: 78,
          sizeId: 1,
          colorId: 3
        },
        {
          quantity: 1000,
          available: true,
          productId: 78,
          sizeId: 1,
          colorId: 12
        },
        {
          quantity: 1000,
          available: true,
          productId: 79,
          sizeId: 1,
          colorId: 7
        },
        {
          quantity: 1000,
          available: true,
          productId: 80,
          sizeId: 1,
          colorId: 9
        },
        {
          quantity: 1000,
          available: true,
          productId: 81,
          sizeId: 1,
          colorId: 7
        },
        {
          quantity: 1000,
          available: true,
          productId: 82,
          sizeId: 1,
          colorId: 10
        },
        {
          quantity: 1000,
          available: true,
          productId: 83,
          sizeId: 1,
          colorId: 1
        },
        {
          quantity: 1000,
          available: true,
          productId: 84,
          sizeId: 1,
          colorId: 9
        },
        {
          quantity: 1000,
          available: true,
          productId: 85,
          sizeId: 1,
          colorId: 1
        },
        {
          quantity: 1000,
          available: true,
          productId: 86,
          sizeId: 1,
          colorId: 2
        },
        {
          quantity: 1000,
          available: true,
          productId: 87,
          sizeId: 1,
          colorId: 1
        },
        {
          quantity: 1000,
          available: true,
          productId: 88,
          sizeId: 1,
          colorId: 9
        },
        {
          quantity: 1000,
          available: true,
          productId: 89,
          sizeId: 1,
          colorId: 11
        },
        {
          quantity: 1000,
          available: true,
          productId: 90,
          sizeId: 1,
          colorId: 9
        },
        {
          quantity: 1000,
          available: true,
          productId: 91,
          sizeId: 1,
          colorId: 11
        },
        {
          quantity: 1000,
          available: true,
          productId: 91,
          sizeId: 1,
          colorId: 4
        },
        {
          quantity: 1000,
          available: true,
          productId: 91,
          sizeId: 1,
          colorId: 9
        },
        {
          quantity: 1000,
          available: true,
          productId: 91,
          sizeId: 1,
          colorId: 1
        }
    ]

    try {
        // console.log(stockData)
        const newType = await Stock.bulkCreate(data)
        resolve(newType);
    
    } catch (error) {
        reject(error);
        console.log(error)
    }
    })
*/
}

// ----------------------------------------------------------------------------------
// CONTROLADOR: Ejecuta las promesas de carga de productos y categorias a las base de datos
// ----------------------------------------------------------------------------------
const postDBData = async (req, res) => {
    
    let products = promisifiedPostProducts();
    let categories = promisifiedPostCategories().then( data => {
        promisifiedRelCatProd()
            .then( data => console.log(data) )
            .catch( err => console.log(err) )
    })
    let colors = promisifiedPostColors();
    let sizes = promisifiedPostSizes();
 

    Promise.all([products, categories, colors, sizes])
    .then( (data) => {
        promisifiedPostStock()
            .then( (data) => {
                console.log('Database information has been successfully uploaded!');
                console.log('Server is ready to work');
        
                
            })
            .catch ( err => console.log(err) )
        }
    )
    .catch( err => console.log(err) )    
}

module.exports = {
    postDBData
}; 



