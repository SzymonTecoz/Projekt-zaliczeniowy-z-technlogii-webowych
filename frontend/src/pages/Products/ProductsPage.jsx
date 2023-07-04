import { useState, useEffect } from "react";

import { MainNav } from "@/components/MainNav";

import { UserNav } from "./components/UserNav";
import { navigationLinks } from "../../config/navigationLinks";

export const ProductsPage = () => {
  const [productsData, setProductsData] = useState([]);

  const fetchProductsData = () => {
    fetch("http://127.0.0.1:8000/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProductsData(data);
      });
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

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
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
          <ul className="productsList">
            {productsData.map((produkt) => (
              <li key={produkt.id} className="productItem">
                <p>
                  <strong>Name: </strong>
                  {produkt.name}
                </p>
                <p>
                  <strong>Price: </strong>
                  {produkt.price}
                </p>
                <p>
                  <strong>Description: </strong>
                  {produkt.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
