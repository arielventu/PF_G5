import axios from "axios"


const index = async (user) => {
    let array = []
    let  authenticated = localStorage.getItem('authenticated')
    if (authenticated === "true") {
    let dataFav = await axios.get(`http://localhost:3001/favorites/user/${user.nickname}`)
    console.log(dataFav.data)
    if ( dataFav.data.length == 0) {
        if(localStorage.getItem('favoritos') != null){
            array = JSON.parse(localStorage.getItem('favoritos'))
            let mapPost = array.map( async(item)=>{
                await axios.post(`http://localhost:3001/favorites`,{ user:user.nickname, productId:item.id})
                //{ "id": 1, "user": "eliecer", "productId": 2 }
            })
        }    
    }

        console.log("probando", dataFav.data.length)
    }
}

export default index