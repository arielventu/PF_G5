// import libraries
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts ,postProduct ,getCategories} from "../actions/actions";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";

// Build componnent
const Products = () => {
  // initalize local states
  const [all, setProducts] = useState();
  const products = useSelector(state=>state.auxShoes)
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalInsert, setModalInsert] = useState(false);
  console.log(all)
  const initial = {
   
    name: "",
    gender: "",
    detail : "",
    categories: [],
    size: {},
    colors: [],
    stock: {},
    price: 0,
    imagecover: "",
    imageurl: [],
  };
  const [form, setForm] = useState(initial);
 
  // get 'redux store' of shoes / products
  const categorie = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  console.log(categorie)
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, []);

  // ----------------------------------------------------

  const showModalUpdate = (data) => {
    setForm(data);
    setModalUpdate(true);
  };

  const closeModalUpdate = () => {
    setModalUpdate(false);
  };

  const showModalInsert = () => {
    setModalInsert(true);
    form.categories = initial.categories
  };

  const closeModalInsert = () => {
    setModalInsert(false);
    setForm(initial);
  };

  const update = (data) => {
    let i = 0;
    let arrPoducts = products;
    arrPoducts.map((e) => {
      if (data.id === e.id) {
        arrPoducts[i].name = data.name;
        arrPoducts[i].masterName = data.masterName;
        arrPoducts[i].gender = data.gender;
        arrPoducts[i].categories = data.categories;
        arrPoducts[i].size = data.size;
        arrPoducts[i].colors = data.colors;
        arrPoducts[i].stock = data.stock;
        arrPoducts[i].price = data.price;
        arrPoducts[i].imagecover = data.imagecover;
        arrPoducts[i].imageurl = data.imageurl;
      }
      i++;
    });
    setProducts(arrPoducts);
    setModalUpdate(false);
  };

  const remove = (data) => {
    let option = window.confirm(
      "Are you sure you want to delete the item? " + data.id
    );
    if (option) {
      let i = 0;
      let arrProducts = products;
      arrProducts.map((e) => {
        if (data.id === e.id) {
          arrProducts.splice(i, 1);
        }
        i++;
      });
      setProducts(arrProducts);
      setModalUpdate(false);
    }
  };

 
  const insert = () => {
    let newForm = { ...form };
    delete newForm.id
    console.log(newForm.categories)
    console.log(newForm);
    /* newForm.id = products.length + 1; */
    /* console.log(newForm.id) */
    let list = products;
    list.push(newForm);
    setModalInsert(false);
    setProducts(list);
    dispatch(postProduct(newForm))
    console.log(form)
    

  };
  /* form.categories=[] */
  const handleChange = (e) => {
    const { value, name } = e.target
    name === "imageurl" && setForm({ ...form, [e.target.name]: [e.target.value] })
    name === "imagecover" && setForm({ ...form, [e.target.name]: e.target.value })
    name === "name" &&setForm({ ...form, [e.target.name]: e.target.value })
    name === "price" &&setForm({ ...form, [e.target.name]: parseInt(e.target.value) });
    name === "detail" &&setForm({ ...form, [e.target.name]: e.target.value })
    name === "gender" &&setForm({ ...form, [e.target.name]: e.target.value })
    name === "categories"&&setForm({...form,categories: [...form.categories, Number(value)] });
      
    
    
     /*  if(name === "categories"){
        let newData = [e.target.value] ;
        
        setForm({
          ...form,
          categories: [form.categories, newData],
        });
        
      } */
        /* let newData = { name: e.target.value };
        setForm({
          ...form,
          categories: [...form.categories, newData],
        }); */
      
    
    /* const {value , name}= e.target
    if (e.target.name === "imageurl") {
      setForm({ ...form, [e.target.name]: [e.target.value] });
    }
    if (e.target.name === "imagecover") {
      setForm({ ...form, [e.target.name]: e.target.value });
    } else if (e.target.name !== "categories") {
      setForm({ ...form, [e.target.name]: [e.target.value ]});
      if(e.target.name === "name"){
        setForm({ ...form, [e.target.name]: e.target.value });
      }
      if(e.target.name === "price"){
        setForm({ ...form, [e.target.name]: parseInt(e.target.value) });
      }
      if (e.target.name === "detail") {
        setForm({ ...form, [e.target.name]: e.target.value });
      }
      if (e.target.name === "gender") {
        setForm({ ...form, [e.target.name]: e.target.value });
      }
      if (e.target.name === "categories") {
        setForm({ ...form, [e.target.name]:[Number(e.target.value)] })
        
      } */
      console.log(form)
    }
  

/*   const handleClick = (e) => {
    
    if (e.target.name === "categories") {
    
        let newData = [ e.target.value ];
        setForm({
         ...form,
          categories: [...form.categories, newData],
        });
      }
    
    } */

    
  // ----------------------------------------------------
console.log(form)
  //render
  return (
    <>
      <div>
        <h3>Product Management</h3>
      </div>
      <Container>
        <br />
        <Button color="success" onClick={() => showModalInsert()}>
          Add Product
        </Button>
        <br />
        <br />
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Gender</th>
              <th>BestFor</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((e, index) => {
              return (
                <tr key={index}>
                  <td>{e.id}</td>
                  <td>
                    <img
                      src={e.imagecover}
                      alt="img not found!"
                      width="50"
                      height="50"
                    ></img>
                  </td>
                  <td>{e.name}</td>
                  <td>{e.gender}</td>
                  <td>{e.categories.map((el) => el?.name?.concat(', '))}</td>
                  <td>{e.price}</td>
                  <td>
                    <Button color="success">Variants</Button> {"  "}
                    <Button color="primary" onClick={() => showModalUpdate(e)}>
                      Update
                    </Button>{" "}
                    {"  "}
                    <Button color="danger" onClick={() => remove(e)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>

      {/* ----------- insert data -------------------- */}
      {/* -------------------------------------------- */}

      <Modal isOpen={modalInsert}>
        <ModalHeader>
          <div>
            <h3>Add Product</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Id:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={products.length + 1}
            />
          </FormGroup>

          <FormGroup>
            <label>Name:</label>
            <input
              className="form-control"
              name="name"
              type="text"
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <label>Detail:</label>
            <input
              className="form-control"
              name="detail"
              
              type="text"
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>

          <FormGroup>
            <label>Categories:</label>
            {categorie?.map((e, index) => {
              return (
                <div key={index} className="checkbox">
                  <label>
                    <input
                      id = {index}
                      type = "checkbox"
                      name="categories"
                      value={e.id}
                      onClick={(e) => handleChange(e)}
                    />
                    {` ${e.name}`}
                  </label>
                </div>
              );
            })}
          </FormGroup>

          <FormGroup>
            <label>Gender:</label>
            <select
              className="form-control"
              name="gender"
              onChange={(e) => handleChange(e)}
            >
              <option>mens</option>
              <option>womens</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Price:</label>
            <input
              className="form-control"
              name="price"
              type="number"
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>

          <FormGroup>
            <label>Image Cover:</label>
            <input
              className="form-control"
              name="imagecover"
              type="text"
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>

          <FormGroup>
            <label>Other Images:</label>
            <input
              className="form-control"
              name="imageurl"
              type="text"
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => insert()}>
            Add
          </Button>
          <Button className="btn btn-danger" onClick={() => closeModalInsert()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {/* -------------------------------------------- */}

      {/* ----------- update data -------------------- */}
      {/* -------------------------------------------- */}
      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Update Product</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Id:</label>

            <input
              className="form-control"
              readOnly
              type="text"
              value={form.id}
            />
          </FormGroup>

          <FormGroup>
            <label>Name:</label>
            <input
              className="form-control"
              name="name"
              type="text"
              onChange={(e) => handleChange(e)}
              value={form.name}
            />
          </FormGroup>

          <FormGroup>
            <label>Gender:</label>
            <select
              className="form-control"
              name="gender"
              value={form.gender}
              onChange={(e) => handleChange(e)}
            >
              <option selected={form.gender === "mens" ? true : false}>
                mens
              </option>
              <option selected={form.gender === "womens" ? true : false}>
                womens
              </option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Price:</label>
            <input
              className="form-control"
              name="price"
              type="numeric"
              value={form.price}
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>

          <FormGroup>
            <label>Image Cover:</label>
            <input
              className="form-control"
              name="imagecover"
              type="text"
              value={form.imagecover}
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>

          <FormGroup>
            <label>Other Images:</label>
            <input
              className="form-control"
              name="imageurl"
              type="text"
              value={form.imageurl}
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => update(form)}>
            Update
          </Button>
          <Button color="danger" onClick={() => closeModalUpdate()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default Products;