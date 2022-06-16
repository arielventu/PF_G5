import axios from "axios"

let cont = 0
const index = async (user, products) => {
    cont++
    let array = []
    let  authenticated = localStorage.getItem('authenticated')
    if (user != undefined){
        let dataFav = await axios.get(`http://localhost:3001/favorites/user/${user.nickname}`)
        let idAll = dataFav.data.map(item=>item.id)
        let arrayData = dataFav.data.map((item, i)=>{
            return products.find(itemF=>itemF.id === idAll[i])
        })
        array = JSON.parse(localStorage.getItem('favoritos'))
        if(!(arrayData.length === 0 && array.length === 0) || array[0] === null ){
            localStorage.setItem('favoritos', JSON.stringify(arrayData))  
        }
    }
    //----------------------------------------------------------------------------------------------------
    array = []
    if (user != undefined) {
        let dataCar = await axios.get(`http://localhost:3001/basketList/${user.nickname}`)
        let idAllCar = dataCar.data.map(item=>item.id)
        let arrayData = dataCar.data.map((item, i)=>{
            return products.find(itemF=>itemF.id === idAllCar[i])
        })
        array = JSON.parse(localStorage.getItem('carrito'))
        if(!(arrayData.length === 0 && array.length === 0) || array[0] === null ){
            localStorage.setItem('carrito', JSON.stringify(arrayData))
        }
    
    }
    if(user === undefined){
      //  localStorage.setItem('authenticated', 'false');
        localStorage.setItem('carrito', JSON.stringify([]))
        localStorage.setItem('favoritos', JSON.stringify([]))
    }  
    console.log("ultimo",localStorage.getItem('authenticated'))
}

export default index

