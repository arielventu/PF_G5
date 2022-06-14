import React, { useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { favorites, getDetail, getProducts, ShopCar, getReviewsById, getOrders} from "../actions/actions";
import { useEffect } from "react";
import Reviews from "./Reviews";
import NewReview from "./NewReview";
import styles from "./Detail.module.css"
import starB from "../image/starb.svg";
import starY from "../image/stary.svg";
import rating from '../image/rating.png'
import fav from '../image/fav.svg'
import { Modal } from "reactstrap";
import swal from "sweetalert";
import { useAuth0 } from "@auth0/auth0-react";

var detailstate2 = []
var size = []

export default function Detail(){
  const { isAuthenticated, user } = useAuth0();
  const {id} = useParams()
  const dispatch = useDispatch() 
  useEffect (() => {dispatch(getDetail(id))} ,[]) // eslint-disable-line
  const detailstate = useSelector((state) => state.shoes)
  const products = useSelector(state => state.shoes)
  const auxProducts = useSelector(state => state.auxShoes)
  const orders = useSelector(state => state.orders)
  const [showAddReview, setShowAddReview] = useState(false)
  const [otrasFotos, setotrasFotos] = useState('')
  

  let sizes = []
  let lala = products.map((e) => {
    e.stocks.map((e) => {
        sizes = e.size.size
    })
    return sizes
  })
  lala= [... new Set(lala)].sort()
  let lala2 = lala[0]
    

  useEffect( () => {
    dispatch(getProducts())
    let arraySizeUnit = []
    
    arraySizeUnit =  JSON.parse(localStorage.getItem('favoritos'))
    const idMap = arraySizeUnit.find(item => item.id === id)
    // console.log(idMap)
  }, [])
  
  useEffect(() => {
    dispatch(getOrders());
    // console.log(orders)
    const findedOrders = orders.filter(order => order.customer.id === user?.sub)
    // console.log("FINDED", findedOrders)
    const findedProduct = findedOrders.find(order => order.orderdetails.find(product => product.id === Number(id)))
    // console.log("FINDED PRODUCTS", findedProduct)
    findedProduct ? setShowAddReview(true) : setShowAddReview(false)
  }, [isAuthenticated])

  useEffect(() => {
    setotrasFotos(detailstate2.imagecover)
  }, [id, detailstate])
  
  if(detailstate.length != 0){
    detailstate2 = detailstate.find(item => item.id == id )
    detailstate2.selecSize = lala[0]
  }

  // console.log(lala2)
  
  const add = async (e)=>{
    var arrayAdd = []
    const {value} = e.target
    if (localStorage.getItem('carrito') === null) {
      var findAdd = detailstate.find(item => item.id == value )
      findAdd.selecSize = lala2
      // console.log("oooo",lala2)
      arrayAdd.push(findAdd)
    }else{
      arrayAdd = await JSON.parse(localStorage.getItem('carrito'))
      const idMap = arrayAdd.find(item => item.id == value)
      swal({
        text: "existing item in cart",
        icon: "warning",
        buttons: false,
        timer: 1000,
      });
      if (idMap === undefined) {
        const find = detailstate.find(item => item.id == value )
        find.selecSize = lala2
        // console.log("gggg",lala2)
        arrayAdd.push(find)
        swal({
          text: "Item added to cart",
          icon: "success",
          buttons: false,
          timer: 1200,
        });
      }
    }
    localStorage.setItem('carrito', JSON.stringify(arrayAdd))
    dispatch(ShopCar())
  }

  const favorite = async (e)=>{
    var array = []
    const {accessKey} = e.target
    // console.log(accessKey)
    if (localStorage.getItem('favoritos') === null) {
      var findKey = detailstate.find(item => item.id == accessKey )
      array.push(findKey)
    }else{
      array = await JSON.parse(localStorage.getItem('favoritos'))
      // console.log("first", typeof accessKey)
      const idMap = array.find(item => item.id == accessKey)
      swal({
        text: "existing item in favorites",
        icon: "warning",
        buttons: false,
        timer: 1000,
      });
      if (idMap === undefined) {
        // console.log(detailstate)
        const find = detailstate.find(item => item.id == accessKey )
        find.selecSize = lala2
        array.push(find)
        swal({
          text: "Item added to favorites",
          icon: "success",
          buttons: false,
          timer: 1200,
        });
      }
    }
    localStorage.setItem('favoritos', JSON.stringify(array))
    dispatch(favorites())
    
  }

  var imagenOriginal = detailstate2.imagecover
  // console.log(imagenOriginal)

  const producFotos = (e) => {
    // imagenOriginal = e.target.accessKey;
    setotrasFotos(e.target.accessKey)
  }
    
  let catColors =[] 
  products.map ((e , i)  => {
    if(e.masterName === detailstate2.masterName){
      catColors.push( {color : Array.from(new Set (e.colors)),
        /* name : e.masterName, */
         id : e.id })
    }
  })
  
  // console.log(detailstate2.masterName)
  // console.log(catColors)

  // Reviews -----------------------------------
  const reviewsById = useSelector((state) => state.reviewsById);
  const [showModal, setShowModal] = useState(false);

  const handleModal = (e) => {
    setShowModal(!showModal);
  }

  const starsLevels = [];
  reviewsById.map((e) => {starsLevels.push(e.starsLevel)})
  let starsAvg = Math.ceil(starsLevels.reduce((a, b) => a + b, 0) / starsLevels.length)
  //---------------------------------------------


  const findProductImages = () => {
    let product = products.find(product => product.id === Number(id))
    if (product === undefined) {
      return []
    }
    return product.imageurl
  }
  // console.log(findProductImages())

  // console.log(starsAvg);
  const select = (e)=>{
    detailstate2.selecSize = e.target.value
    lala2 = e.target.value
    // console.log(detailstate2)
  }
  // console.log(detailstate2)

  
  return(
    <div className={styles.details}>
    { detailstate.length > 0 ? 
      <div className = {styles.containerp}>
          <h1 className = {styles.title}> {detailstate2.fullName} </h1>
          <img src={otrasFotos} alt = 'Shoe Image' className = {styles.img}/>
          <p className={styles.description}>{detailstate2.detail}</p>
          <div className = {styles.innercontainer}>
            <h3 className={styles.subtitles}>Sizes:</h3>
            <select onChange={(e)=>select(e)}>{lala.map(item => <option value={item}>{item}</option>)}</select>
          </div>
          <h3 className={styles.subtitles}>colors:</h3>
          <div className={styles.containercolors}>
          {catColors.map((e, i) => {
            return (
              <Link to={`/shop/details/${e.id}`}>
                <div className={styles.innercontainer}>
                  <div className={styles.color1} style={{ backgroundColor: `${e.color[0]}` }}></div>
                  {e.color.length > 1 ?
                    <div className={styles.color2} style={{ backgroundColor: `${e.color[1]}` }}></div>
                    : <div className={styles.color2} style={{ backgroundColor: `${e.color[0]}` }}></div>
                  }
                </div>
              </Link>
            )}
            )}
            </div>
            {/* <div className={styles.containercolors}>
              <div className={styles.color1} style={{ backgroundColor: `${detailstate2.colors[0]}` }}></div>
              <div className={styles.color2} style={{ backgroundColor: `${detailstate2.colors[1]}` }}></div>
            </div> */}
            <div className = {styles.innercontainer2}>
              <h5 className={styles.price}> ${detailstate2.price}</h5>
            {/* <img className={styles.rating} src={rating} alt='rating'/>  */}
            {starsAvg === 1 &&
              <div className={styles.divStarsContainer}>
                <p className={styles.pStars}>{starsAvg}/5</p>
                <div className={styles.divStarsAvg}>
                  <img className={styles.starAvg} src={starY} alt="star" />
                  <img className={styles.starAvg} src={starB} alt="star" />
                  <img className={styles.starAvg} src={starB} alt="star" />
                  <img className={styles.starAvg} src={starB} alt="star" />
                  <img className={styles.starAvg} src={starB} alt="star" />
                </div>
              </div>}
            {starsAvg === 2 &&
              <div className={styles.divStarsContainer}>
                <p className={styles.pStars}>{starsAvg}/5</p>
                <div className={styles.divStarsAvg}>
                  <img className={styles.starAvg} src={starY} alt="star" />
                  <img className={styles.starAvg} src={starY} alt="star" />
                  <img className={styles.starAvg} src={starB} alt="star" />
                  <img className={styles.starAvg} src={starB} alt="star" />
                  <img className={styles.starAvg} src={starB} alt="star" />
                </div>
              </div>}
            {starsAvg === 3 &&
              <div className={styles.divStarsContainer}>
                <p className={styles.pStars}>{starsAvg}/5</p>
                <div className={styles.divStarsAvg}>
                  <img className={styles.starAvg} src={starY} alt="star" />
                  <img className={styles.starAvg} src={starY} alt="star" />
                  <img className={styles.starAvg} src={starY} alt="star" />
                  <img className={styles.starAvg} src={starB} alt="star" />
                  <img className={styles.starAvg} src={starB} alt="star" />
                </div>
              </div>}
            {starsAvg === 4 && 
              <div className={styles.divStarsContainer}>
                <p className={styles.pStars}>{starsAvg}/5</p>
                <div className={styles.divStarsAvg}>
                  <img className={styles.starAvg} src={starY} alt="star" />
                  <img className={styles.starAvg} src={starY} alt="star" />
                  <img className={styles.starAvg} src={starY} alt="star" />
                  <img className={styles.starAvg} src={starY} alt="star" />
                  <img className={styles.starAvg} src={starB} alt="star" />
                </div>
              </div>}
            {starsAvg === 5 &&
              <div className={styles.divStarsContainer}>
                <p className={styles.pStars}>{starsAvg}/5</p>
                <div className={styles.divStarsAvg}>
                  <img className={styles.starAvg} src={starY} alt="star" />
                  <img className={styles.starAvg} src={starY} alt="star" />
                  <img className={styles.starAvg} src={starY} alt="star" />
                  <img className={styles.starAvg} src={starY} alt="star" />
                  <img className={styles.starAvg} src={starY} alt="star" />
                </div>
              </div>}
            </div>
            <div className={styles.divButtonAddReview}>
              {showAddReview && <button onClick={handleModal} className={styles.buttonAddReview}>Add review</button>}
            </div>

            <div className = {styles.innercontainer3}>
            {findProductImages().map((e) => {
              return (
                <img accessKey={e} src={e} alt = 'Shoes Image' className = {styles.otherimg} onClick={(e)=>producFotos(e)}/>
              )
            })}
                <button  className={styles.add} onClick={(e)=>add(e)} value={id}>Add to Cart</button>
                <img className={styles.fav} onClick={(e)=>favorite(e)} accessKey={id} src={fav} alt='favoritos' title="Add to favorites"/> 
            </div>
          <div>
            
            <Modal isOpen={showModal} className={styles.containerModal}>
              <div className={styles.divModal}>
                <button onClick={handleModal} className={styles.buttonCloseModal}>x</button>
                <NewReview handleModal={ handleModal }/>
              </div>
            </Modal>
            <Reviews productId={ id } name={ detailstate2.fullName }/>
            </div>
      </div> : 
        <div className={styles.divLoading}>
            <img src="https://thumbs.gfycat.com/PepperyMediumBrahmancow-size_restricted.gif" />
        </div>
    }
    </div>
        )
    
    }   