// import libraries & actions
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import { getOrders, putOrders } from "../actions/actions";
//import "bootstrap/dist/css/bootstrap.min.css";

// import fontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faCheck } from "@fortawesome/free-solid-svg-icons";

function Orders() {
  // calling global state
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  // set local state
  const [current, setCurrent] = useState(null);

  // set component lifecycle
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch, current]);

  // ----------------- HANDLE BUTTONS CANCEL & DISPATCH--------------
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
      } else return;
    } else {
      alert(
        "First select the row of the order you want to cancel and try again."
      );
    }
  };

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
      } else return;
    } else {
      alert(
        "First select the row of the order you want to dispatch and try again."
      );
    }
  };

  // ------------------ BUILD HEADER COLUMNS -----------------------
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
        <button title="Cancel order" onClick={handleButtonClickCancel}>
          <FontAwesomeIcon icon={faCancel} />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
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
  ];

  // ------------------ BUILD BODY COLUMNS -----------------------
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

  // ------------------ CSS DATA TABLE -------------------------
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

  //--------------------- FUNCTIONS ----------------------

  const ExpandedComponent = (e) => {
    //setCurrent(...current, e);
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
  const handleRowClicked = (row) => {
    setCurrent(row);
  };

  //----------------- RENDER COMPONENT -----------------

  return (
    <div>
      <DataTable
        title="Order Management"
        columns={columnsHeader}
        data={orders}
        highlightOnHover
        pointerOnHover
        expandableRows
        expandableRowsComponent={(e) => ExpandedComponent(e)}
        pagination
        fixedHeader={true}
        fixedHeaderScrollHeight="350px"
        conditionalRowStyles={conditionalRowStyles}
        onRowClicked={handleRowClicked}
      />
    </div>
  );
}

export default Orders;
