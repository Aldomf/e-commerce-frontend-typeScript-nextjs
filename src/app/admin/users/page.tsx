"use client";
import { SideBar } from "@/components/homapage/SideBar";
import DataTable, { createTheme } from "react-data-table-component";
import React, { useEffect, useState } from "react";
import { User } from "@/interfaces/interfaces";
import { useMediaQuery } from 'react-responsive';
import HamburguerMenuAdmin from "@/components/homapage/HamburguerMenuAdmin";

function AdminUser() {
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
      selector: (row: User) => row.id,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row: User) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: User) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row: User) => row.role,
      sortable: true,
    },
  ];

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const [records, setRecord] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [prevSearchQuery, setPrevSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VybmFtZSI6IkFsZG8iLCJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMDc5MzAxMywiZXhwIjoxNzEwNzk2NjEzfQ.QVcL6jgCHCoKKFSHfiT9TWuIjJ7Vyp6fpB-KPIDO4qA";
      const response = await fetch("http://localhost:4000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData: User[] = await response.json();
      setRecord(userData);
      setLoading(false);
      return userData;
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
      fetchData().then((userData) => {
        const filteredRecords = userData.filter((record) => {
          return record.username.toLowerCase().includes(searchQuery);
        });
        setRecord(filteredRecords);
      });
    }  else {
      // If there is a search query, filter the records based on it
      const filteredRecords = records.filter((record) => {
        return record.username.toLowerCase().includes(searchQuery);
      });
      setRecord(filteredRecords);
    }
    setPrevSearchQuery(searchQuery);
  };

  return (
    <div className={`bg-[#111827] h-screen md:h-screen ${isTabletOrMobile ? 'flex-col' : 'flex'}`}>
      <div
        className="hidden lg:block"
        style={{ position: "fixed", left: 0, top: 0, bottom: 0 }}
      >
        <SideBar />
      </div>
      {!isTabletOrMobile && <SideBar />}
      {isTabletOrMobile && <HamburguerMenuAdmin/>}
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl lg:text-6xl text-white pb-4">Users</h1>
        <div className="flex items-center justify-center w-[90%] md:w-[80%]">
          <label htmlFor="searchInput" className="text-white text-xl">
            Search user:
          </label>
          <input
            type="text"
            id="searchInput"
            onChange={handleChage}
            placeholder="Enter name"
            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mt-4 w-[90%] md:w-[80%]">
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
          />
        </div>
      </div>
    </div>
  );
}

export default AdminUser;
