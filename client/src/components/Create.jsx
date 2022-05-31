import React from "react";
import axios from 'axios';
import s from './Create.module.css';

export default function Create(props) {

    let [input, setInput] = React.useState({
        "name": "",
        "masterName": "",
        "fullName": "",
        "gender": "",
        "detail": "",
        "price": 0,
        "imagecover": [],
        "imageurl": [],
        "colors": [],
    })

    let [colors, setColors] = React.useState([]);
    let [categories, setCategories] = React.useState([]);
    let [sizes, setSizes] = React.useState([]);

    React.useEffect(() => {
        const getColor = async function getColor() {
            setColors(await axios.get('http://localhost:3001/colors/'))
        }
        const getCategories = async function getCategories() {
            setCategories(await axios.get('http://localhost:3001/categories/'))
        }
        const getSizes = async function getSizes() {
            setSizes(await axios.get('http://localhost:3001/sizes/'))
        }
        Promise.all([getColor(), getCategories(), getSizes()]);
        
    }, []);

    console.log(colors.data, "colors cargados");
    console.log(categories, "categories cargados");
    console.log(sizes, "sizes cargados");

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value });
    }

    const handleChangeColors = (e) => {
        console.log(e.target.value);
        console.log(typeof(e.target.value));
        let colorsArray = [];
        console.log(e.target.checked)
        if (input.colors.length > 0) {
            colorsArray = [...input.colors];
        }
        console.log(colorsArray, "colorArray");
        if (!e.target.checked) {
            colorsArray.filter(element => element.toString() !== e.target.value.toString())
        } else {
            colorsArray.push(e.target.value);
        }

        setInput({...input, colors: colorsArray})
        // setInput({...input, [e.target.name]: e.target.value });
    }

    const handleChangeImage = (e) => {
        e.preventDefault();
        console.log(URL.createObjectURL(e.target.files[0]))
    }

    return (
        <div>
            <div>Create a new Product</div>
            <br></br>
            <form>
               <div>
                   <label>Short Name:</label>
                   <input type="text" placeholder="give a short name..." name="name" value={input.name} onChange={(e) => handleChange(e)}></input>
                </div>   
                <div>
                   <label>Master Name:</label>
                   <input type="text" name="masterName" placeholder="name..." value={input.masterName} onChange={(e) => handleChange(e)}></input>
                </div>  
                <div>
                   <label>Full Name:</label>
                   <input type="text" name="fullName" placeholder="give a full name description..." value={input.fullName} onChange={(e) => handleChange(e)}></input>
                </div>  
                <div>
                   <label>Gender:</label>
                   <div className={s.checkboxes}>
                   <label>Mens:</label>
                   <input type="radio" name="gender" value="mens" onChange={(e) => handleChange(e)}></input>
                   <label>Womens:</label>
                   <input type="radio" name="gender" value="womens" onChange={(e) => handleChange(e)}></input>
                   </div>
                </div>   
                <div>
                   <label>Detail:</label>
                   <textarea type="text" name="detail" placeholder="Description..." value={input.detail} onChange={(e) => handleChange(e)} rows="5" ></textarea>
                </div>   
                <div>
                   <label>Price:</label>
                   <input type="numeric" name="price" value={input.price} onChange={(e) => handleChange(e)}></input>
                </div>    
                <div>
                   <label>Image Cover:</label>
                   <input type="file" name="imagecover" accept="imagecover/*" onChange={(e) => handleChangeImage(e)}></input>
                </div>   
                <div>
                   <label>More images:</label>
                   <input type="text" name="imageurl" value={input.imageurl} onChange={(e) => handleChange(e)}></input>
                </div>  
                <div>
                   <label>Colors:</label>
                   <div className={s.checkboxes}>
                       {
                       colors.data && colors.data.map(element => 
                        <div>
                        <label>{element.color}</label>
                        <input type="checkbox" name={element.color} value={element.id} onChange={(e) => handleChangeColors(e)}></input>
                        </div>
                        )}
                   </div>
                </div>  
                <div>
                   <label>Categories:</label>
                   <div className={s.checkboxes}>
                       {
                       categories.data && categories.data.map(element => 
                        <div>
                        <label>{element.name}</label>
                        <input type="checkbox" name={element.name} value={element.id}></input>
                        </div>
                        )}
                   </div>
                </div> 
                <div className={s.stock}>
                    <label>Stock</label>

                   <label>Sizes:</label>
                   <div >
                       {
                       sizes.data && sizes.data.map(element => 
                        <div>
                        <label>{element.size}</label>
                        <input type="checkbox" name={element.size} value={element.id}></input>
                        <input type="numeric" name={element.size} placeholder="quantity"></input>
                        </div>
                        )}
                   </div>
                </div>  
            </form>
        </div>
    )
    
}