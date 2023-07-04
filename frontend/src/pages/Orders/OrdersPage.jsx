import { useState, useEffect } from "react";

import { MainNav } from "@/components/MainNav";

import { UserNav } from "./components/UserNav";
import { navigationLinks } from "../../config/navigationLinks";

export const OrdersPage = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [productsData, setProductsData] = useState([]);

  const fetchOrdersData = () => {
    fetch("http://127.0.0.1:8000/orders")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrdersData(data);
      });
  };

  const fetchProductsData = () => {
    fetch("http://127.0.0.1:8000/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProductsData(data);
      });
  };

  useEffect(() => {
    fetchOrdersData();
    fetchProductsData();
  }, []);

  return (
    <div className="ordersPageContainer">
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
            <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
          </div>
          <div className="ordersList">
            <ul>
              {ordersData.map((zamowienie) => (
                <li className="orderListItem" key={zamowienie.id}>
                  <p>
                    <b>Customer id: </b>
                    {zamowienie.customer_id}
                  </p>
                  <p>
                    <b>Order id: </b>
                    {zamowienie.order_items.join(", ")}
                  </p>
                  <p>
                    <b>Products: </b>
                    {productsData
                      .filter((product) => zamowienie.order_items.includes(product.id))
                      .map((object) => object.name)
                      .join(", ")}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
