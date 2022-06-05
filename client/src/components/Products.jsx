// import libraries
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../actions/actions";
import styles from "./Products.module.css"

// import styles bootstrap and Font Awesome Icon
// import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxes,
  faCheck,
  faClose,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

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
  const [products, setProducts] = useState(
    useSelector((state) => state.auxShoes)
  );
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
  };
  const [form, setForm] = useState(initial);

  // get 'redux store' of shoes / products
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [products, categories, available]);

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
  };

  const closeModalInsert = () => {
    setModalInsert(false);
    setForm(initial);
  };

  const showModalVariants = (data) => {
    setModalVariants(true);
  };

  const closeModalVariants = () => {
    setModalVariants(false);
  };

  const update = (data) => {
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
    setModalUpdate(false);
  };

  const changeStatus = (data) => {
    let option = window.confirm(
      "Are you sure you want to change the status? " + data.masterName
    );
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
      setAvailable((prevStatus) => ({ ...prevStatus, available: !!available }));
    }
  };

  const insert = () => {
    let newForm = { ...form };
    newForm.id = products.length + 1;
    let list = products;
    list.push(newForm);
    setModalInsert(false);
    setProducts(list);
    console.log("arrayProductos: ", products);
  };

  const handleChange = (e) => {
    e.target.name === "imageurl" &&
      setForm({ ...form, [e.target.name]: [e.target.value] });
    e.target.name !== "categories" &&
      setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    // let newData = { id: parseInt(e.target.id), name: e.target.value };
    // e.target.name === "categories" &&
    //   setForm({ ...form, categories: [...form.categories, newData] });

    let newData = { id: parseInt(e.target.id), name: e.target.value };
    let categoriesArray = [];
    if (form.categories.length > 0) {
      categoriesArray = [...form.categories];
    }
    if (e.target.checked) {
      categoriesArray.push(newData);
    } else {
<<<<<<< HEAD

=======
>>>>>>> Diana
      if (categoriesArray) {
        categoriesArray = categoriesArray.filter(
          (element) => element.name !== e.target.value
        );
      }
    }
    setForm({ ...form, categories: categoriesArray });
<<<<<<< HEAD

=======
>>>>>>> Diana
  };

  const findCheckSelected = (dataform, categoryElement) => {
    const arrNameCategories = dataform.categories.map((el) => el.name);
    if (arrNameCategories.includes(categoryElement.name)) return true;
    return false;
  };

  // ----------------------------------------------------

  //render
  return (
    <>
      <div className={styles.containerproducts}>
        <h3 className={styles.titleproducts}>Product Management</h3>
        <Button color="success" onClick={() => showModalInsert()} className={styles.addProduct}>
          Add Product
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
            {products?.map((e, index) => {
              return (
                <tr key={index}>
                  <td>{e.id}</td>
                  <td>
                    <img
                      src={e.imagecover}
                      alt="img not found!"
                      width="80"
                      height="80"
                    ></img>
                  </td>
                  <td>{e.masterName}</td>
                  <td>{e.gender}</td>
                  <td>{e.categories.map((el) => el?.name?.concat(", "))}</td>
                  <td>{new Intl.NumberFormat("en-EN").format(e.price)}</td>
                  <td>{e.available ? "Available" : "Not Available"}</td>
                  <td>
                    <Button className={styles.variants}
                      color="success"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Add/Edit Variants"
                      onClick={() => showModalVariants(e)}
                    >
                      <FontAwesomeIcon icon={faBoxes} />
                    </Button>{" "}
                    {"  "}
                    <Button className={styles.edit}
                      color="primary"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Edit"
                      onClick={() => showModalUpdate(e)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>{" "}
                    {"  "}
                    <Button className={styles.available}
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
            <label>Categorie:</label>
            <input
              className="form-control"
              name="name"
              type="text"
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>

          <FormGroup className={styles.form}>
            <label>BestFor:</label>
            {categories?.map((e, index) => {
              return (
                <div key={index} className="checkbox">
                  <label>
                    <input
                      id={e.id}
                      type="checkbox"
                      name="categories"
                      value={e.name}
                      onClick={(e) => handleClick(e)}
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
          <Button color="primary" onClick={() => insert()} className={styles.bmodal}>
            Add
          </Button>
          <Button onClick={() => closeModalInsert()} className={styles.bmodal}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalBody>
      </Modal>
      {/* -------------------------------------------- */}

      {/* ----------- create variants -------------------- */}
      {/* -------------------------------------------- */}

      <Modal isOpen={modalVariants} className={styles.containerModal}>
      <ModalBody className={styles.modalVariant}>
        <ModalHeader className={styles.modalHeader}>
          <div>
            <h3 className={styles.modalTitle}>Add and edit variants</h3>
          </div>
        </ModalHeader>

        <FormGroup className={styles.form}>
          <label>Product code:</label>
          <input
            className="form-control"
            name="productId"
            type="text"
            value={form.id}
            readOnly
          />
        </FormGroup>

        <FormGroup className={styles.form}>
          <label>Name:</label>
          <input
            className="form-control"
            name="masterName"
            type="text"
            value={form.masterName}
            readOnly
          />
        </FormGroup>

        <ModalFooter>
          <Button
            className="btn btn-danger"
            onClick={() => closeModalVariants()}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalBody>
      </Modal>

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
              name="masterName"
              type="text"
              value={form.masterName}
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>

          <FormGroup>
            <label>Fullname:</label>
            <input
              className="form-control"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>

          <FormGroup>
            <label>Detail:</label>
            <textarea
              className="form-control"
              col="30"
              name="detail"
              value={form.detail}
              onChange={(e) => handleChange(e)}
            ></textarea>
          </FormGroup>

          <FormGroup>
            <label>Categorie:</label>
            <input
              className="form-control"
              name="name"
              type="text"
              value={form.name}
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>

          <FormGroup>
            <label>BestFor:</label>
            {categories?.map((e, index) => {
              return (
                <div key={index} className="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="categories"
                      value={e.name}
                      checked={findCheckSelected(form, e)}
                      onClick={(e) => handleClick(e)}
                    />
                    {` ${e.name}`}
                  </label>
                </div>
              );
            })}
          </FormGroup>

          <FormGroup>
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
