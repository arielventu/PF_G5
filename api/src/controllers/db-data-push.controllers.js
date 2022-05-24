const { Product, Category, Colors, Sizes } = require('../db');
const items = require('../../bin/products');
// const fs = require('fs');

// ----------------------------------------------------------------------------------
// LECTURA DE ARCHIVOS DE CATEGORIAS
// ----------------------------------------------------------------------------------
const readFile = function (filePath, callback) {
    fs.readFile(filePath, function (err, buffer) {
        if (err) callback(err);
        else callback(null, buffer.toString());
    });
};

const promisifiedReadFile = function (filePath) {
	return new Promise(function (resolve, reject) {
		readFile(filePath, function (err, str) {
			if (err) reject(err);
			else resolve(str);
		});
	});
};

const categoriesFolder = `${__dirname}/bin/categories/`;
console.log(categoriesFolder);
// En files path tengo las rutas a todos los archivos de categorias en forma de []
const filesPath = [];
fs.readdir(categoriesFolder, function(err, files) {
    if (err) console.log(err);
    files.forEach( file => {
        filesPath.push(`${categoriesFolder}${file}`)
    } )
});
// // ----------------------------------------------------------------------------------
// // LECTURA DE ARCHIVOS DE CATEGORIAS
// // ----------------------------------------------------------------------------------
// const readFile = function (filePath, callback) {
//     fs.readFile(filePath, function (err, buffer) {
//         if (err) callback(err);
//         else callback(null, buffer.toString());
//     });
// };

// const promisifiedReadFile = function (filePath) {
// 	return new Promise(function (resolve, reject) {
// 		readFile(filePath, function (err, str) {
// 			if (err) reject(err);
// 			else resolve(str);
// 		});
// 	});
// };

// const categoriesFolder = 'D:/PF_G5/api/bin/categories/';
// // En files path tengo las rutas a todos los archivos de categorias en forma de []
// const filesPath = [];
// fs.readdir(categoriesFolder, function(err, files) {
//     if (err) throw err;
//     files.forEach( file => {
//         filesPath.push(`${categoriesFolder}${file}`)
//     } )
// });


// ----------------------------------------------------------------------------------
// PROMESA: Upload de PRODUCTOS a la base de datos
// ----------------------------------------------------------------------------------
const promisifiedPostProducts = () => {
    return new Promise(async (resolve, reject) => {
        const newData = [];
        items.forEach( element => {
            const data = {
                "name": element.handle,
                "fullName": element.fullName,
                "gender": element.gender,
                "detail": element.description,
                "price": element.price,
                "imagecover": element.featuredImage.src,
                "imageurl": element.images
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
        newData = newData.map( elem => { return {"name": elem} })
        try {
            const newType = await Category.bulkCreate(newData)
            resolve(newType);
        
        } catch (error) {
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
// CONTROLADOR: Ejecuta las promesas de carga de productos y categorias a las base de datos
// ----------------------------------------------------------------------------------
const postDBData = async (req, res) => {
    
    let products = promisifiedPostProducts();
    let categories = promisifiedPostCategories();
    let colors = promisifiedPostColors();
    let sizes = promisifiedPostSizes();


    Promise.all([products, categories, colors, sizes])
        .then((data) => {
            // console.log(data)
            console.log('Database information has been successfully uploaded!')
            console.log('Server is ready to work')
        });
}

module.exports = {
    postDBData
}; 



