const express = require('express');
const router = express.Router();
const { Products } = require('../db');
const items = require('./items');

router.post('/', async (req, res) => {

  const newData = [];
  items.forEach( element => {
  
      const data = {
          "name": element.handle,
          "fullname": element.fullName,
          "gender": element.gender,
          "detail": element.description,
          "imageURL": element.featuredImage.src,
          "color": element.colors[0],
          "size": element.sizesSortOrder[0],
          "category": element.bestFor,
          "price": element.price,
      }
  
      newData.push(data);
  } 
  
  );  
  
    const count = await Products.count();
  
    if (count === 0) {
      
      try {
          const newType = await Products.bulkCreate(newData)
    
          res.json(newType);
      
        } catch (error) {
          console.log(error);
        }
    } else {
      res.send("the products are charged");
    }
  })

module.exports = router; 



