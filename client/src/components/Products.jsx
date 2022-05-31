// import libraries
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../actions/actions";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

// Build componnent
const Products = () => {
  // initalize local states
  const [products, setProducts] = useState(useSelector((state) => state.shoes));
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalInsert, setModalInsert] = useState(false);
  const [form, setForm] = useState({
    id: "",
    masterName: "",
    gender: "",
    size: "",
    colors: [],
    stock: "",
    price: 0,
  });

  // get 'redux store' of shoes / products
  //const products = useSelector((state) => state.shoes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  // ----------------------------------------------------

  const showModalUpdate = (data) => {
    setForm(data);
    setModalUpdate(true);
  };

  const closeModalUpdate = () => {
    setModalUpdate(true);
  };

  const showModalInsert = () => {
    setModalInsert(true);
  };

  const closeModalInsert = () => {
    setModalInsert(false);
  };

  const update = (data) => {
    let i = 0;
    let arrPoducts = products;
    arrPoducts.map((e) => {
      if (data.id == e.id) {
        arrPoducts[i].masterName = data.masterName;
        arrPoducts[i].gender = data.gender;
        arrPoducts[i].size = data.size;
        arrPoducts[i].colors = data.colors;
        arrPoducts[i].stock = data.stock;
        arrPoducts[i].price = data.price;
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
    if (option == true) {
      let i = 0;
      let arrPoducts = products;
      arrPoducts.map((e) => {
        if (data.id == e.id) {
          arrPoducts.splice(i, 1);
        }
        i++;
      });
      setProducts(arrPoducts);
      setModalUpdate(false);
    }
  };

  const insert = () => {
    let newForm = { ...form };
    newForm.id = products.length + 1;
    let list = products;
    list.push(newForm);
    setModalInsert(false);
    setProducts(list);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ----------------------------------------------------

  //render
  return (
    <>
      <Container>
        <br />
        <Button color="success">Add Product</Button>
        <br />
        <br />
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((e, index) => (
              <tr key={index}>
                <td>{e.id}</td>
                <td>
                  <img src={e.imagecover} width="50" height="50"></img>
                </td>
                <td>{e.masterName}</td>
                <td>{e.gender}</td>
                <td>{e.price}</td>
                <td>
                  <Button color="success">Show variants</Button> {"  "}
                  <Button color="primary">Update</Button> {"  "}
                  <Button color="danger">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
export default Products;
