// import libraries
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, postProduct, getCategories, editProduct } from "../actions/actions";
import styles from "./Products.module.css";
import axios from 'axios';

//import 'Product.variants (stock)', the auxiliar component.
import ProductVariants from "./ProductVariants";

// import styles bootstrap and Font Awesome Icon
// import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxes,
  faCheck,
  faClose,
  faEdit,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

// import reactstrap
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
  const products = useSelector((state) => state.shoes3);
  // console.log(products);
  /*   const [products, setProducts] = useState(
    useSelector((state) => state.auxShoes)
  ); */

  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalVariants, setModalVariants] = useState(false);
  const [available, setAvailable] = useState(true);

  const initial = {
    id: null,
    name: "",
    masterName: "",
    fullName: "",
    gender: "",
    detail: "",
    price: 0,
    imagecover: "",
    imageurl: [],
    available: true,
    categories: [],
    newCategory: "",
  };
  const [form, setForm] = useState(initial);

  // get 'redux store' of shoes / products
  const categorie = useSelector((state) => state.categories);
  // console.log(categorie, "categoriesssss");
  const dispatch = useDispatch();
  // console.log(categorie);
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, []);

  // ----------------------------------------------------

  const showModalUpdate = (data) => {
    console.log(data, "updatingggggdata");
    const categoriesMap = data.categories.map(e => e.id);
    setForm({
    id: data.id,
    name: data.name,
    masterName: data.masterName,
    fullName: data.fullName,
    gender: data.gender,
    detail: data.detail,
    price: data.price,
    imagecover: data.imagecover,
    imageurl: data.imageurl,
    available: data.available,
    categories: categoriesMap,
    newCategory: "",
    });
    console.log(form, "updatinggggg");
    console.log(categorie, "updatinggggg22222");

    setModalUpdate(true);
  };

  const closeModalUpdate = () => {
    setModalUpdate(false);
  };

  const showModalInsert = () => {
    setModalInsert(true);
    setForm(initial);
  };

  const closeModalInsert = () => {
    setModalInsert(false);
    setForm(initial);
    /* form.categories = initial.categories */
  };

  const showModalVariants = (data) => {
    setModalVariants(true);
    setForm(data);
  };

  const closeModalVariants = () => {
    setModalVariants(false);
  };

  const update = (data) => {
    console.log(data, "buttonupdate");
    let i = 0;
    let arrPoducts = products;
    arrPoducts.map((e) => {
      if (data.id === e.id) {
        arrPoducts[i].name = data.name;
        arrPoducts[i].masterName = data.masterName;
        arrPoducts[i].fullName = data.fullName;
        arrPoducts[i].gender = data.gender;
        arrPoducts[i].detail = data.detail;
        arrPoducts[i].price = data.price;
        arrPoducts[i].imagecover = data.imagecover;
        arrPoducts[i].imageurl = data.imageurl;
        arrPoducts[i].available = data.available;
        arrPoducts[i].categories = data.categories;
      }
      i++;
    });
    setProducts(arrPoducts);
    dispatch(editProduct(data));
    setModalUpdate(false);
  };

  const changeStatus = (data) => {
    let option = window.confirm(
      "Are you sure you want to change the status? " + data.masterName
    );
    console.log(data, "not available");
    if (option) {
      let i = 0;
      let arrPoducts = products;
      arrPoducts.map((e) => {
        if (data.id === e.id) {
          arrPoducts[i].available = !arrPoducts[i].available;
        }
        i++;
      });
      setProducts(arrPoducts);
      async function editAvailable(data) {
        try {
          console.log(data, "ante del put");
          var yeison = await axios.put("/products/available", data);
          return yeison;
        } catch (error) {
          console.log(error);
          console.log(yeison);
        }
      };
      editAvailable(data);
      setAvailable((prevStatus) => ({ ...prevStatus, available: !!available }));
    }
  };

  /*   const insert = () => {
    let newForm = { ...form };
    delete newForm.id
    // console.log(newForm.categories)
    // console.log(newForm); */
  /* newForm.id = products.length + 1; */
  /* // console.log(newForm.id) */
  /*   const insert = () => { 
    let newForm = { ...form };
    newForm.id = products.length + 1;
    let list = products;
    list.push(newForm);
    setModalInsert(false);
    setProducts(list);
    dispatch(postProduct(newForm))
    // console.log(form)
    
  }; */
  const insert = () => {
    let newForm = { ...form };
    delete newForm.id;
    // console.log(newForm.categories);
    // console.log(newForm);
    newForm.id = products.length + 1;
    /* // console.log(newForm.id) */
    let list = products;
    list.push(newForm);
    setModalInsert(false);
    setProducts(list);
    dispatch(postProduct(newForm));
    // console.log(form);
  };

  /*  }; */
  /* form.categories=[] */
  const handleChange = (e) => {
    /*   e.target.name === "imageurl" &&
      setForm({ ...form, [e.target.name]: [e.target.value] });
    e.target.name !== "categories" &&
      setForm({ ...form, [e.target.name]: e.target.value }); */
    const { value, name } = e.target;
    name === "imageurl" &&
      setForm({ ...form, [e.target.name]: [e.target.value] });
    name === "imagecover" &&
      setForm({ ...form, [e.target.name]: e.target.value });
    name === "name" && setForm({ ...form, [e.target.name]: e.target.value });
    name === "fullName" && setForm({ ...form, [e.target.name]: e.target.value });
    name === "masterName" && setForm({ ...form, [e.target.name]: e.target.value });
    name === "price" &&
      setForm({ ...form, [e.target.name]: parseInt(e.target.value) });
    name === "detail" && setForm({ ...form, [e.target.name]: e.target.value });
    name === "gender" && setForm({ ...form, [e.target.name]: e.target.value });
    name === "categories" &&
      setForm({ ...form, categories: [...form.categories, Number(value)] });
    name === "newCategory" && setForm({ ...form, [e.target.name]: e.target.value });
    // console.log(form);
  };

  const handleChangeCategories = (e) => {
    // let newData = { id: parseInt(e.target.id), name: e.target.value };
    // e.target.name === "categories" &&
    //   setForm({ ...form, categories: [...form.categories, newData] });

    let newData = parseInt(e.target.value);
    console.log(newData, "nuewData");
    let categoriesArray = []; 
    if (form.categories.length > 0) {
      categoriesArray = [...form.categories];
    }
    if (e.target.checked) {
      // console.log("entro al if");
      categoriesArray.push(newData);
    } else {
      // console.log("entro al else");
      if (categoriesArray) {
        categoriesArray = categoriesArray.filter(
          (element) => element !== parseInt(e.target.value)
        );
      }
    }
    // console.log(categoriesArray, "categoriesArray");

    setForm({ ...form, categories: categoriesArray });
  };

  /* const findCheckSelected = (dataform, categoryElement) => {
    const arrNameCategories = dataform.categories.map((el) => el.name);
    if (arrNameCategories.includes(categoryElement.name)) return true;
    return false;
  }; */

  // ----------------------------------------------------
  // console.log(form);
  //render
  return (
    <>
      <div className={styles.containerproducts}>
        <h3 className={styles.titleproducts}>Product Management</h3>
        <Button
          color="success"
          onClick={() => showModalInsert()}
          className={styles.addProduct}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
      <Container className={styles.containerproducts2}>
        <Table hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Gender</th>
              <th>BestFor</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{e.id}</td>

                  <td>
                    <img
                      src={e.imagecover}
                      alt="img not found!"
                      width="80"
                      height="80"
                    ></img>
                  </td>
                  <td>{e.name}</td>
                  <td>{e.gender}</td>
                  <td>{e.categories.map((el) => el?.name?.concat(", "))}</td>
                  <td>{new Intl.NumberFormat("en-EN").format(e.price)}</td>
                  <td>{e.available ? "Available" : "Not Available"}</td>
                  <td>
                    <Button
                      className={styles.variants}
                      color="success"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Variant Management"
                      onClick={() => showModalVariants(e)}
                    >
                      <FontAwesomeIcon icon={faBoxes} />
                    </Button>{" "}
                    {"  "}
                    <Button
                      className={styles.edit}
                      color="primary"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Edit"
                      onClick={() => showModalUpdate(e)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>{" "}
                    {"  "}
                    <Button
                      className={styles.available}
                      color="danger"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={
                        e.available
                          ? "Check to Not Available"
                          : "Check to Available"
                      }
                      onClick={() => changeStatus(e)}
                    >
                      <FontAwesomeIcon icon={e.available ? faClose : faCheck} />
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
      <Modal isOpen={modalInsert} className={styles.containerModal}>
        <ModalBody className={styles.modalBody}>
          <ModalHeader className={styles.modalHeader}>
            <div>
              <h3 className={styles.modalTitle}>Add Product</h3>
            </div>
          </ModalHeader>
          <FormGroup className={styles.form}>
            <label>Id:</label>
            <input
              className={styles.inputmodal}
              readOnly
              type="text"
              value={products.length + 1}
            />
          </FormGroup>

          <FormGroup className={styles.form}>
            <label>Name:</label>
            <input
              className="form-control"
              name="name"
              type="text"
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <label>Master name:</label>
            <input
              className="form-control"
              name="masterName"
              type="text"
              autoFocus
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>

          <FormGroup className={styles.form}>
            <label>Fullname:</label>
            <input
              className="form-control"
              name="fullName"
              type="text"
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>

          <FormGroup className={styles.form}>
            <label>Detail:</label>
            <textarea
              className="form-control"
              col="30"
              name="detail"
              onChange={(e) => handleChange(e)}
            ></textarea>
          </FormGroup>

          <FormGroup className={styles.form}>
            <label>Category:</label>
            <input
              className="form-control"
              name="newCategory"
              type="text"
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>

          <FormGroup className={styles.form}>
            <label>BestFor:</label>
            {categorie?.map((e, index) => {
              return (
                <div key={index} className="checkbox">
                  <label>
                    <input
                      id={index}
                      type="checkbox"
                      name="categories"
                      value={e.id}
                      onClick={(e) => handleChangeCategories(e)}
                    />
                    {` ${e.name}`}
                  </label>
                </div>
              );
            })}
          </FormGroup>

          <FormGroup className={styles.form}>
            <label>
              {`Gender: `}
              <select
                //className="form-control"
                name="gender"
                onChange={(e) => handleChange(e)}
              >
                <option value=''>...</option>
                <option value='mens'>mens</option>
                <option value='womens'>womens</option>
              </select>
            </label>
          </FormGroup>

          <FormGroup className={styles.form}>
            <label>Price:</label>
            <input
              className="form-control"
              name="price"
              type="number"
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>

          <FormGroup className={styles.form}>
            <label>Image Cover:</label>
            <input
              className="form-control"
              name="imagecover"
              type="text"
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>

          <FormGroup className={styles.form}>
            <label>Other Images:</label>
            <input
              className="form-control"
              name="imageurl"
              type="text"
              onChange={(e) => handleChange(e)}
            />
            
          </FormGroup>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => insert()}
              className={styles.bmodal}
            >
              Add
            </Button>
            <Button
              onClick={() => closeModalInsert()}
              className={styles.bmodal}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
      {/* -------------------------------------------- */}

      {/* ----------- create variants -------------------- */}
      {/* -------------------------------------------- */}

      <Modal isOpen={modalVariants} className={styles.containerModal}>
        <ModalBody className={styles.modalVariants}>
          <ModalHeader className={styles.modalHeader}>
            <div>
              <h3 className={styles.modalTitle}>Variant Management</h3>
            </div>
          </ModalHeader>

            <ProductVariants
              idproduct={form.id}
              productName={form.masterName}
            />

          <ModalFooter>
            <Button color="secundary" onClick={() => closeModalVariants()}>
              Close
            </Button>
          </ModalFooter>  
        </ModalBody>
      </Modal>

      {/* ----------- update data -------------------- */}
      {/* -------------------------------------------- */}
      <Modal isOpen={modalUpdate} className={styles.containerModal}>
        <ModalBody className={styles.modalVariant/* modalBody */}>
          <ModalHeader className={styles.modalHeader}>
            <div>
              <h3 className={styles.modalTitle}>Update Product</h3>
            </div>
          </ModalHeader>
          <FormGroup className={styles.form}>
            <label>Id:</label>

            <input
              className="form-control"
              readOnly
              type="text"
              value={form.id}
            />
          </FormGroup>

          <FormGroup className={styles.form}>
            <label>Name:</label>
            <input
              className="form-control"
              name="name"
              type="text"
              value={form.name}
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>

          <FormGroup className={styles.form}>
            <label>Fullname:</label>
            <input
              className="form-control"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>

          <FormGroup className={styles.form}>
            <label>Detail:</label>
            <textarea
              className="form-control"
              col="30"
              name="detail"
              value={form.detail}
              onChange={(e) => handleChange(e)}
            ></textarea>
          </FormGroup>

          <FormGroup className={styles.form}>
            <label>New Category:</label>
            <input
              className="form-control"
              name="newCategory"
              type="text"
              value={form.newCategory}
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>

          <FormGroup className={styles.form}>
            <label>BestFor:</label>
            {categorie?.map((e, index) => {
              if (form.categories.some(u => u === e.id)) {

                return (
                  <div key={index} className="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        name="categories"
                        defaultChecked
                        value={
                          e.id
                        } /* findCheckSelected(form, e) */ /* (e) => handleChange(e)} */
                        /* checked={ */
                        /* onClick={(e) => handleChange(e)} */
                      onClick={(e) => handleChangeCategories(e)}
                      />
                      {` ${e.name}`}
                    </label>
                  </div>
                )
              }
              else {
                return (
                  <div key={index} className='checkbox'>
                    <input className={styles.input} type="checkbox" id={index} name="categories" value={e.id} onClick={(e) => handleChangeCategories(e)} />
                    <label htmlFor={index}>
                      {` ${e.name}`}
                    </label>
                  </div>
                )
              }
            })}
          </FormGroup>

          <FormGroup className={styles.form}>
            <label>
              {`Gender: `}
              <select
                name="gender"
                value={form.gender}
                onChange={(e) => handleChange(e)}
              >
                <option>mens</option>
                <option>womens</option>
              </select>
            </label>
          </FormGroup>

          <FormGroup className={styles.form}>
            <label>Price:</label>
            <input
              className="form-control"
              name="price"
              type="numeric"
              value={form.price}
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>

          <FormGroup className={styles.form}>
            <label>Image Cover:</label>
            <input
              className="form-control"
              name="imagecover"
              type="text"
              value={form.imagecover}
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>

          <FormGroup className={styles.form}>
            <label>Other Images:</label>
            <input
              className="form-control"
              name="imageurl"
              type="text"
              value={form.imageurl}
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => update(form)}
              className={styles.bmodal}
            >
              Update
            </Button>
            <Button
              color="danger"
              onClick={() => closeModalUpdate()}
              className={styles.bmodal}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Products;
