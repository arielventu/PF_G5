// import libraries
import React, { useEffect, useState } from "react";
import styles from "./ProductVariants.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getColors,
  getSizes,
  getStockByProductId,
  postStock,
  putStock,
  deleteStock,
} from "../actions/actions";


// import styles bootstrap and Font Awesome Icon
// import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxes,
  faCheck,
  faClose,
  faEdit,
  faPlus,
  faTrash,
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


const ProductVariants = ({ idproduct, productName }) => {
  // global redux states
  const state = useSelector((state) => state);
  const colors = state.colors;
  const sizes = state.sizes;
  const stock = state.stock;
  const dispatch = useDispatch();

  // intial local stock state
  const initialState = {
    id: null,
    quantity: 0,
    available: true,
    productId: null,
    sizeId: null,
    colorId: null,
    size: {},
    color: {},
  };
  // local react states
  const [current, setCurrent] = useState(initialState);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  console.log(current)

  // get all data stock by productId
  useEffect(() => {
    dispatch(getStockByProductId(idproduct));
    dispatch(getSizes());
    dispatch(getColors());
  }, [dispatch]);

  // ----------------------------------------------------

  const showModalUpdate = (data) => {
    setCurrent(data);
    setModalUpdate(true);
  };

  const hideModalUpdate = () => {
    setModalUpdate(false);
  };

  const showModalCreate = () => {
    setModalCreate(true);
  };

  const hideModalCreate = () => {
    setModalCreate(false);
    setCurrent(initialState);
  };

  // create new stock
  const handleCreate = () => {
    let newCurrent = { ...current };
    newCurrent.productId = idproduct;
    dispatch(postStock(newCurrent));
    setModalCreate(false);
  };

  // Update stock
  const handleUpdate = (data) => {
    let newStock = stock;
    let itemStock = [];
    newStock.map((e, i) => {
      if (data.id === e.id) {
        newStock[i].quantity = data.quantity;
        newStock[i].available = data.available;
        newStock[i].sizeId = data.sizeId;
        newStock[i].colorId = data.colorId;
        itemStock = newStock[i];
      }
    });
    console.log(itemStock);
    dispatch(putStock(itemStock));
    setModalUpdate(false);
  };

  const handleDelete = (data) => {
    let isDelete = window.confirm(`Are you sure you want delete the stock?`);
    if (isDelete) {
      let newstock = stock;
      newstock.map((e, i) => {
        if (data.id === e.id) {
          newstock.splice(i, 1);
        }
      });
      dispatch(deleteStock(data.id));
      setCurrent(newstock);
      console.log(current);
    } else return;
  };

  const handleChange = (e) => {
    let tvalue = null;
    if (
      e.target.name === "sizeId" ||
      e.target.name === "colorId" ||
      e.target.name === "quantity"
    )
      tvalue = parseInt(e.target.value);
    else tvalue = e.target.value;

    setCurrent({ ...current, [e.target.name]: tvalue });
    console.log(e.target.value);
  };

  // ----------------------------------------------------

  //render
  return (
    <>
      <Container >
        <FormGroup>
          <label>Product:</label>
          <input
            className="form-control"
            readOnly
            type="text"
            value={`${idproduct} - ${productName}`}
          />
        </FormGroup>

        <br />

        <Button color="success" onClick={() => showModalCreate()}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>

        <br />
        <br />

        <Table hover>
          <thead>
            <tr>
              <th>Item</th>
              <th>Size</th>
              <th>Color</th>
              <th>In stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stock?.map((e, i) => {
              return (
                <tr key={e.id}>
                  <td>{i + 1}</td>
                  <td>
                    {sizes.map((el) => {
                      if (e.sizeId === el.id) return el.size;
                    })}
                  </td>
                  <td>
                    {colors.map((el) => {
                      if (e.colorId === el.id) return el.color;
                    })}
                  </td>
                  <td>{new Intl.NumberFormat("en-EN").format(e.quantity)}</td>
                  <td>{e.available ? "Available" : "Not Available"}</td>
                  <td>
                    <Button
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
                      color="danger"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Delete"
                      onClick={() => handleDelete(e)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>

      {/* ----------- create data -------------------- */}
      {/* -------------------------------------------- */}

      <Modal isOpen={modalCreate} className={styles.modal2}>
      <ModalBody className={styles.bc}>
        <ModalHeader>
          <div className={styles.hv}>
            <h3 className={styles.vt}>Add Variant</h3>
          </div>
        </ModalHeader>

          <FormGroup>
            <label className={styles.ls}>Id Product:</label>
            <input
              className="form-control"
              readOnly
              type="numeric"
              name="productId"
              value={idproduct}
            />
          </FormGroup>
          <FormGroup>
            <label className={styles.ls}>Name:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={productName}
            />
          </FormGroup>
          <FormGroup>
            <label className={styles.ls}>
              {`Size: `}
              <select name="sizeId" onChange={(e) => handleChange(e)} className={styles.ss}>
                {sizes.map((el) => {
                  return (
                    <option key={el.id} value={el.id}>
                      {el.size}
                    </option>
                  );
                })}
              </select>
            </label>
          </FormGroup>
          <FormGroup>
            <label className={styles.ls}>
              {`Color: `}
              <select name="colorId" onChange={(e) => handleChange(e)} className={styles.ss}>
                {colors.map((el) => {
                  return (
                    <option key={el.id} value={el.id}>
                      {el.color}
                    </option>
                  );
                })}
              </select>
            </label>
          </FormGroup>

          <FormGroup>
            <label className={styles.ls}>Quantity:</label>
            <input
              className="form-control"
              name="quantity"
              type="number"
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <label className={styles.ls}>
              {`Status: `}
              <select name="available" onChange={(e) => handleChange(e)} className={styles.ss}>
                <option selected value={true} className={styles.ss}>
                  {"Available"}
                </option>
                <option value={false}>{"Not Avalilable"}</option>
              </select>
            </label>
          </FormGroup>

        <ModalFooter className={styles.fs}>
          <Button color="primary" onClick={handleCreate} className={styles.bs}>
            Add
          </Button>
          <Button className="btn btn-danger" onClick={hideModalCreate}>
            Cancel
          </Button>
        </ModalFooter>
        </ModalBody>
      </Modal>
      {/* -------------------------------------------- */}

      {/* ----------- update data -------------------- */}
      {/* -------------------------------------------- */}
      <Modal isOpen={modalUpdate}  className={styles.modal2}>
        <ModalHeader>
          <div>
            <h3>Edit Variant</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Id Product:</label>
            <input
              className="form-control"
              readOnly
              type="numeric"
              name="productId"
              value={idproduct}
            />
          </FormGroup>
          <FormGroup>
            <label>Name:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={productName}
            />
          </FormGroup>
          <FormGroup>
            <label>
              {`Size: `}
              <select
                name="sizeId"
                value={current.sizeId}
                onChange={(e) => handleChange(e)}
              >
                {sizes.map((el) => {
                  return (
                    <option key={el.id} value={el.id}>
                      {el.size}
                    </option>
                  );
                })}
              </select>
            </label>
          </FormGroup>
          <FormGroup>
            <label>
              {`Color: `}
              <select
                name="colorId"
                value={current.colorId}
                onChange={(e) => handleChange(e)}
              >
                {colors.map((el) => {
                  return (
                    <option key={el.id} value={el.id}>
                      {el.color}
                    </option>
                  );
                })}
              </select>
            </label>
          </FormGroup>

          <FormGroup>
            <label>Quantity:</label>
            <input
              className="form-control"
              name="quantity"
              type="number"
              value={current.quantity}
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <label>
              {`Status: `}
              <select
                name="available"
                value={current.available}
                onChange={(e) => handleChange(e)}
              >
                <option selected value={true} className={styles.ss}>
                  {"Available"}
                </option>
                <option value={false}>{"Not Avalilable"}</option>
              </select>
            </label>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handleUpdate(current)}>
            Update
          </Button>
          <Button className="btn btn-danger" onClick={hideModalUpdate}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ProductVariants;
