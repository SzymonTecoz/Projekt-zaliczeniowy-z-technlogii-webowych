import { useState, useEffect } from "react";

import { MainNav } from "@/components/MainNav";

import { UserNav } from "./components/UserNav";
import { navigationLinks } from "../../config/navigationLinks";

export const CustomersPage = () => {
  const [customersData, setCustomersData] = useState([]);
  const [editCustomerData, setEditCustomerData] = useState({});
  const [isEditing, setIsEditing] = useState(false); //To sprawia, ze nie widać formularza edytowania

  const fetchCustomersData = () => {
    fetch("http://127.0.0.1:8000/customers")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCustomersData(data);
      });
  };

  useEffect(() => {
    fetchCustomersData();
  }, []);

  const handleEditCustomer = (customerId) => {
    const customer = customersData.find((customer) => customer.id === customerId);
    setEditCustomerData(customer);
    setIsEditing(true); // To pokazuje formluarz do edycji
  };

  const handleUpdateCustomer = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:8000/customers/${editCustomerData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editCustomerData),
    })
      .then((res) => res.json())
      .then((updatedCustomer) => {
        console.log("Zaktualizowany klient:", updatedCustomer);
        setCustomersData((prevData) =>
          prevData.map((customer) =>
            customer.id === updatedCustomer.id ? updatedCustomer : customer
          )
        );
        setEditCustomerData({});
        setIsEditing(false); // To ukrywa formularz edycji
      })
      .catch((error) => {
        console.error("Błąd podczas aktualizowania klienta:", error); //pusty komentarz
      });
  };

  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" links={navigationLinks} />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
          <ul className="customersList">
            {customersData.map((klient) => (
              <li key={klient.id} className="customerListItem">
                <p>
                  <strong className="customerDataLabel">Name: </strong>
                  {klient.name}
                </p>
                <p>
                  <strong className="customerDataLabel">Surname: </strong>
                  {klient.surname}
                </p>
                <p>
                  <strong className="customerDataLabel">Email: </strong>
                  {klient.email}
                </p>
                <p>
                  <strong className="customerDataLabel">Phone number: </strong>
                  {klient.phone_number}
                </p>
                <button type="button" className = "editButton" onClick={() => handleEditCustomer(klient.id)}> {/*Nie działają transformacje, nwm czemu*/}
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
        {isEditing && (
          <form className="editForm" onSubmit={handleUpdateCustomer}>
            <input
              type="text"
              value={editCustomerData.name || ""}
              onChange={(e) =>
                setEditCustomerData({
                  ...editCustomerData,
                  name: e.target.value,
                })
              }
            />
            <input
              type="text"
              value={editCustomerData.surname || ""}
              onChange={(e) =>
                setEditCustomerData({
                  ...editCustomerData,
                  surname: e.target.value,
                })
              }
            />
            <input
              type="text"
              value={editCustomerData.email || ""}
              onChange={(e) =>
                setEditCustomerData({
                  ...editCustomerData,
                  email: e.target.value,
                })
              }
            />
            <input
              type="text"
              value={editCustomerData.phone_number || ""}
              onChange={(e) =>
                setEditCustomerData({
                  ...editCustomerData,
                  phone_number: e.target.value,
                })
              }
            />
            <button type="submit">Save</button>
          </form>
        )}
      </div>
    </div>
  );
};
