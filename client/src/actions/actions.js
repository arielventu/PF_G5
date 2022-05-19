import axios from  'axios'



export const inicio = (e) => async (dispatch) => {
    console.log("HOME")
    try {    
        const respuesta = await axios.get(`http://localhost:3001/countries`)
        if (respuesta.data.length > 0) {
            dispatch({
                type:"HOME",
                payload:respuesta.data,
                load:true
            })  
        }                      
    } catch (error){
        console.log(error)
    }    
}
