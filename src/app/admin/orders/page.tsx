"use client";
import { SideBar } from "@/components/admin/SideBar";
import DataTable, { createTheme } from "react-data-table-component";
import React, { MouseEvent, useEffect, useState } from "react";
import { Order, OrderStatus, Status, } from "@/interfaces/interfaces";
import { useMediaQuery } from "react-responsive";
import HamburguerMenuAdmin from "@/components/admin/HamburguerMenuAdmin";
import { useAuth } from "@/context/AuthContext";

function AdminUser() {
  const { token } = useAuth();
  // createTheme creates a new theme named solarized that overrides the build in dark theme
  createTheme(
    "solarized",
    {
      text: {
        primary: "#268bd2",
        secondary: "#2aa198",
      },
      background: {
        default: "#002b36",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#073642",
      },
      button: {
        default: "#2aa198",
        hover: "rgba(0,0,0,.08)",
        focus: "rgba(255,255,255,.12)",
        disabled: "rgba(255, 255, 255, .34)",
      },
      sortFocus: {
        default: "#2aa198",
      },
    },
    "dark"
  );

  const columns = [
    {
      name: "ID",
      selector: (row: Order) => row.id,
      sortable: true,
    },
    {
      name: "User Id",
      selector: (row: Order) => row.userId,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row: Order) => row.quantity,
      sortable: true,
    },
    {
      name: "Total Price",
      selector: (row: Order) => row.totalPrice,
      sortable: true,
    },
    {
      name: "Shipping Address",
      selector: (row: Order) => row.shippingAddress,
      sortable: true,
    },
    {
      name: "Billing Address",
      selector: (row: Order) => row.billingAddress,
      sortable: true,
    },
    {
      name: "Payment Info",
      selector: (row: Order) => row.paymentInformation,
      sortable: true,
    },
    {
      name: "Order Date",
      selector: (row: Order) => new Date(row.orderDate).toLocaleString(),
      sortable: true,
    },
    {
      name: "Products",
      selector: (row: Order) => row.products.map((product) => product.id).join(', '),
      sortable: true,
    },
    {
      name: "Order Status",
      selector: (row: Order) => row.orderStatus,
      sortable: true,
    },
  ];

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [records, setRecord] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [prevSearchQuery, setPrevSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const orderData: Order[] = await response.json();
      setRecord(orderData);
      setLoading(false);
      return orderData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.toLowerCase();

    if (searchQuery.trim() === "") {
      // If the search query is empty or its length is zero, reset the records state to its original state
      fetchData(); // Refetch all users
    } else if (searchQuery.length < prevSearchQuery.length) {
      // If a character is removed, refetch the data and then filter the records based on the new search query
      fetchData().then((orderData) => {
        const filteredRecords = orderData.filter((record) => {
          return record.orderStatus.toLowerCase().includes(searchQuery);
        });
        setRecord(filteredRecords);
      });
    } else {
      // If there is a search query, filter the records based on it
      const filteredRecords = records.filter((record) => {
        return record.orderStatus.toLowerCase().includes(searchQuery);
      });
      setRecord(filteredRecords);
    }
    setPrevSearchQuery(searchQuery);
  };

  const updateOrderStatus = async (id: number, status: OrderStatus) => {
    try {
      const response = await fetch(`http://localhost:4000/api/orders/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const updatedOrder = await response.json();
      // Assuming that the updatedOrder includes the updated order details
      // You may need to update the records state accordingly
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  //!!!!!
//   const handleRowClick = async (row: Order, _: MouseEvent<HTMLTableRowElement, MouseEvent>) => {
//     console.log('Row clicked:', row);
//     const newStatus: OrderStatus = { status: Status.Shipped }; // Update status as needed
//     console.log(newStatus)
//     try {
//       await updateOrderStatus(row.id, newStatus);
//       // Refresh data or update UI as necessary
//     } catch (error) {
//       console.error('Error updating order status:', error);
//     }
//   };
  
  

  return (
    <div
      className={`bg-[#111827] h-screen ${
        isTabletOrMobile ? "flex-col" : "flex"
      }`}
    >
      {!isTabletOrMobile && <SideBar />}
      {isTabletOrMobile && <HamburguerMenuAdmin />}
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-6xl text-white pb-4">Orders</h1>
        <div className="flex items-center justify-center w-[90%] md:w-[600px] lg:w-[750px] xl:w-[1000px]">
          <label htmlFor="searchInput" className="text-white text-xl">
            Search order by order status:
          </label>
          <input
            type="text"
            id="searchInput"
            onChange={handleChage}
            placeholder="Enter name"
            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mt-4 w-[90%] md:w-[600px] lg:w-[750px] xl:w-[1000px]">
          <DataTable
            title="User data"
            columns={columns}
            data={records}
            theme="solarized"
            pagination
            paginationPerPage={5}
            fixedHeader
            progressPending={loading}
            selectableRows
            // onRowClicked={handleRowClick as any}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminUser;
