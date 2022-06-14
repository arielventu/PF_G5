// import libraries & actions
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import { getOrders, putOrders } from "../actions/actions";
//import styled from "styled-components";
import styles from "./Orders.module.css";
import axios from "axios";

//import "bootstrap/dist/css/bootstrap.min.css";

// import fontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faCheck } from "@fortawesome/free-solid-svg-icons";

function Orders() {
  // calling global state
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  // set local state current
  const [current, setCurrent] = useState(null);

  // set component lifecycle
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch, current]);

  const fakeUsers = orders;
  console.log("fakeusers : ", fakeUsers);

  //-----------------------------------------------------------
  //------------- BUILD COMPONENT: ORDERS DETAIL --------------
  //-----------------------------------------------------------

  const ExpandedComponent = (e) => {
    // ----- BUILD BODY COLUMNS
    const columnsBody = [
      {
        name: "Thumbnail",
        grow: 0,
        cell: (row) => (
          <img
            height="30px"
            width="30px"
            alt={row.name}
            src={row.product.imagecover}
          />
        ),
      },
      {
        name: "Product Id",
        selector: (row) => row.product.id,
      },
      {
        name: "Name",
        selector: (row) => row.product.fullName,
        wrap: true,
      },
      {
        name: "QTY",
        selector: (row) => row.quantity,
      },

      {
        name: "Price",
        selector: (row) => new Intl.NumberFormat("en-EN").format(row.price),
      },
      {
        name: "Product URL",
        selector: (row) => (
          <a href={row.productUrl} target="_blank">
            {row.productUrl}
          </a>
        ),
        sortable: true,
      },
    ];

    // ---- RENDER
    return (
      <div>
        <DataTable
          columns={columnsBody}
          data={e.data.orderdetails}
          highlightOnHover
        />
      </div>
    );
  };
  // END COMPONENT ORDER DETAIL----------------------------------

  //-----------------------------------------------------------
  //----------------- BUILD COMPONENT: ORDERS -----------------
  //-----------------------------------------------------------

  // ----- HANDLE BUTTON DISPATCH
  const handleButtonClickDispatch = () => {
    if (current !== null) {
      if (
        window.confirm(
          `Do you really you want dispatch the order # ${current.id}?`
        )
      ) {
        let newCurrent = current;
        newCurrent.orderStatus = "dispatched";
        dispatch(putOrders(newCurrent));
        setCurrent(null);
        // -------------------------------------------------------------------
        // Embeber aquí componente para enviar emails si la order es cancelada
        axios
          .post("/sendemail", newCurrent)
          .then((resp) => console.log(resp))
          .catch((error) => console.log(error));

        // -------------------------------------------------------------------
      } else return;
    } else {
      alert(
        "First select the row of the order you want to dispatch and try again."
      );
    }
  };

  // ----- HANDLE BUTTON CANCEL
  const handleButtonClickCancel = () => {
    if (current !== null) {
      if (
        window.confirm(
          `Do you really you want cancel the order # ${current.id} ?`
        )
      ) {
        let newCurrent = current;
        newCurrent.orderStatus = "cancelled";
        dispatch(putOrders(newCurrent));
        setCurrent(null);
        // -------------------------------------------------------------------
        // Embeber aquí componente para enviar emails si la order es cancelada
        axios
          .post("/sendemail", newCurrent)
          .then((resp) => console.log(resp))
          .catch((error) => console.log(error));

        // -------------------------------------------------------------------
      } else return;
    } else {
      alert(
        "First select the row of the order you want to cancel and try again."
      );
    }
  };

  // ----- BUILD HEADER COLUMNS
  const columnsHeader = [
    {
      name: "Order #",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.orderDate,
      sortable: true,
    },
    {
      name: "Customer",
      selector: (row) => row.customer.fullName,
      sortable: true,
    },
    {
      name: "Shipping Adress",
      selector: (row) => row.shippingAddress,
      sortable: true,
    },
    {
      name: "Country",
      selector: (row) => row.customer.country,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.customer.phone,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => new Intl.NumberFormat("en-EN").format(row.amount),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.orderStatus,
      sortable: true,
    },
    {
      cell: () => (
        <button
          title="Dispatch order"
          onClick={(e) => handleButtonClickDispatch(e)}
        >
          <FontAwesomeIcon icon={faCheck} />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      cell: () => (
        <button title="Cancel order" onClick={handleButtonClickCancel}>
          <FontAwesomeIcon icon={faCancel} />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // ----- CSS FOR ROWS WITH CHANGED STATUS
  const conditionalRowStyles = [
    {
      when: (row) => row.orderStatus === "dispatched",
      style: {
        backgroundColor: "rgba(63, 195, 128, 0.9)",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.orderStatus === "cancelled",
      style: {
        backgroundColor: "rgba(242, 38, 19, 0.9)",
        color: "white",
        "&:hover": {
          cursor: "not-allowed",
        },
      },
    },
  ];

  // ---- Build Filter component
  const FilterComponent = ({ filterText, onFilter, onClear }) => {
    const handleOnclick = (e) =>
      e.target.value === "all" ? onClear() : onFilter();

    return (
      <>
        <label>{`Filter By:  `}</label>
        <select
          name="selectStatusOrder"
          id="1"
          value={filterText}
          onChange={onFilter}
          className={styles.filterStatus}
        >
          <option value="select">-- Select --</option>
          <option value="created" id="created">
            Created
          </option>
          <option value="in_progress" id="in_progress">
            In progress
          </option>
          <option value="completed" id="completed">
            Completed
          </option>
          <option value="dispatched" id="dispatched">
            Dispatched
          </option>
          <option value="cancelled" id="cancelled">
            Cancelled
          </option>
        </select>
      </>
    );
  };

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = fakeUsers.filter(
    (item) =>
      item.orderStatus &&
      item.orderStatus.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  // ----- HANDLE ROW CLICKED
  const handleRowClicked = (row) => {
    setCurrent(row);
  };

  //----------------------------------------------------

  // ---- RENDER
  return (
    <div>
      <DataTable
        title="Order Management"
        columns={columnsHeader}
        data={filteredItems}
        highlightOnHover
        pointerOnHover
        expandableRows
        expandableRowsComponent={(e) => ExpandedComponent(e)}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        //fixedHeader={true}
        //fixedHeaderScrollHeight="350px"
        conditionalRowStyles={conditionalRowStyles}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        onRowClicked={handleRowClicked}
      />
    </div>
  );
}
// END COMPONENT ORDER -----------------------------------------

export default Orders;
