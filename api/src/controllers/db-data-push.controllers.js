const { Product, Category } = require('../db');
const items = require('../../bin/products');
const fs = require('fs');

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

const categoriesFolder = 'D:/PF_G5/api/bin/categories/';
// En files path tengo las rutas a todos los archivos de categorias en forma de []
const filesPath = [];
fs.readdir(categoriesFolder, function(err, files) {
    if (err) throw err;
    files.forEach( file => {
        filesPath.push(`${categoriesFolder}${file}`)
    } )
});


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
const promisifiedPostCategories = (categories) => {
    return new Promise(async (resolve, reject) => {
        const count = await Category.count();
        if (count === 0) {
            const promFiles = filesPath.map( filePath => {
                return promisifiedReadFile(filePath)
                    .then(async readText => {
                        let { name } = JSON.parse(readText);
                        let newCategory = {
                            "name": name
                        }
                        return newCategory
                    })
                }
            );
            Promise.all(promFiles)
                .then(async data => {
                    const newType = await Category.bulkCreate(data)
                    resolve(newType)
                })
                .catch( err => reject(err) );
        }
        else {
            resolve(null);
        }
    })
}

// ----------------------------------------------------------------------------------
// CONTROLADOR: Ejecuta las promesas de carga de productos y categorias a las base de datos
// ----------------------------------------------------------------------------------
const postDBData = async (req, res) => {
    
    let products = promisifiedPostProducts();
    let categories = promisifiedPostCategories();

    Promise.all([categories, products])
        .then((data) => {
            // console.log(data)
            console.log('Database information has been successfully uploaded!')
            console.log('Server is ready to work')
        });
}

module.exports = {
    postDBData
}; 



