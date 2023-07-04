import { MainNav } from "@/components/MainNav";
import { navigationLinks } from "../config/navigationLinks";
import { UserNav } from "./CustomersPage/components/UserNav";
import { useState } from "react";

export const AddCustomerPage = () => {
  const [imie, setImie] = useState("");
  const [nazwisko, setNazwisko] = useState("");
  const [email, setEmail] = useState("");
  const [nrTelefonu, setNrTelefonu] = useState("");

  const getImie = (event) => {
    setImie(event.target.value);
  };

  const getNazwisko = (event) => {
    setNazwisko(event.target.value);
  };
  const getEmail = (event) => {
    setEmail(event.target.value);
  };
  const getNrTelefonu = (event) => {
    setNrTelefonu(event.target.value);
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (imie === "") return;
    if (email === "") return;
    if (nrTelefonu === "" || nrTelefonu.length !== 9) return;
    if (nazwisko === "") return;

    const customerData = {
      name: imie,
      surname: nazwisko,
      email: email,
      phone_number: nrTelefonu,
    };

    const odpowiedz = fetch("http://127.0.0.1:8000/customers", {
      method: "POST",
      body: JSON.stringify(customerData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(odpowiedz);

    setImie("");
    setNazwisko("");
    setEmail("");
    setNrTelefonu("");
    window.alert("Customer successfully added!")
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
          <h2 className="text-3xl font-bold tracking-tight">Add customer</h2>
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 md:flex"></div>
      </div>
      <form onSubmit={submitFormHandler} className="addCustomerForm">
        <label>Name</label>
        <input
          onChange={getImie}
          value={imie}
          placeholder="Your name here"
          type="text"
        ></input>
        <label>Surname</label>
        <input
          onChange={getNazwisko}
          value={nazwisko}
          placeholder="Your surname here"
          type="text"
        ></input>
        <label>Email</label>
        <input
          onChange={getEmail}
          value={email}
          placeholder="Your e-mail here"
          type="email"
        ></input>
        <label>Phone Number</label>
        <input
          onChange={getNrTelefonu}
          value={nrTelefonu}
          placeholder="Your phone number here"
          type="tel"
        ></input>
        <button type="submit">Add customer</button>
      </form>
    </div>
  );
};
