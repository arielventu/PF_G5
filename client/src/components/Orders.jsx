import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import { getOrders } from "../actions/actions";

function Orders() {
  // calling global state
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  // build datatable column header
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
        <button id="1" onClick={handleButtonClick}>
          Cancel
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      cell: () => (
        <button id="2" onClick={(e) => handleButtonClick(e)}>
          Dispath
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // 'handleButtonClick' of 'columnsHeader'
  const handleButtonClick = (e) => {
    if (e.target.id === 1) {
      // si es el botón
      if (window.confirm("Do you really you want cancel the order # ?")) {
        // acá codigo si desea cancelar la orden
      } else return;
    } else if (
      window.confirm("Do you really you want dispatch the order # ?")
    ) {
      // acá codigo si desea despachar la orden
    } else return;
  };

  // build datatable column header
  const columnsBody = [
    {
      name: "Product Id",
      selector: (row) => row.product.id,
    },
    {
      name: "Name",
      selector: (row) => row.product.masterName,
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
      name: "URL Product",
      selector: (row) => (
        <a href={row.productUrl} target="_blank">
          {row.productUrl}
        </a>
      ),
      sortable: true,
    },
  ];

  const ExpandedComponent = (e) => {
    return (
      <div>
        <DataTable
          columns={columnsBody}
          data={e.data.orderdetails}
          highlightOnHover
        />{" "}
      </div>
    );
  };

  return (
    <div>
      <DataTable
        title="Order Mangement"
        columns={columnsHeader}
        data={orders}
        highlightOnHover
        pointerOnHover
        expandableRows
        expandableRowsComponent={(e) => ExpandedComponent(e)}
        pagination
        fixedHeader={true}
        fixedHeaderScrollHeight="350px"
      />
    </div>
  );
}

export default Orders;
