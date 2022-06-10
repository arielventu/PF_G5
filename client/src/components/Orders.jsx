import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";

import { getOrders } from "../actions/actions";

function Orders() {
  // calling global state
  const state = useSelector((state) => state);
  const customers = state.customers;
  const orders = state.orders;
  const orderDetails = state.orderDetails;
  const dispatch = useDispatch();

  // build datatable header
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
      selector: (row) => row.customer.shippingAdress,
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
    // {
    //   //cell: () => <button onClick={handleButtonClick}>Edit Status</button>,
    //   cell: () => {
    //     <select onClick={handleButtonClick}>
    //       <option value="created">Created</option>
    //       <option value="in_progress">In progress</option>
    //       <option value="completed">Completed</option>
    //       <option value="dispatched">Dispatched</option>
    //       <option value="canceled">Canceled</option>
    //     </select>;
    //   },
    //   ignoreRowClick: true,
    //   allowOverflow: true,
    //   select: true,
    // },
  ];

  const columnsBody = [
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
      name: "Amount",
      selector: (row) => new Intl.NumberFormat("en-EN").format(row.amount),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.orderStatus,
      sortable: true,
    },
  ];

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const handleButtonClick = () => {
    console.log("clicked");
  };

  const ExpandedComponent = () => {
    return (
      <div>
        <DataTable columns={columnsBody} data={orders} highlightOnHover />{" "}
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
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        pagination
      />
    </div>
  );
}

export default Orders;
