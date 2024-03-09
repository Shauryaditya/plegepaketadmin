import React, { useState, useEffect } from "react";
import { getToken } from "../../hook/getToken";

import { OrderTable } from "./OrderTable";
import Pagination from "../../components/Pagination";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const token = getToken();
 
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const url = `${process.env.REACT_APP_URL}/api/v1/order/get-all-orders?page=${currentPage}&pageSize=${pageSize}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setOrders(data.orderData);
        // Assuming the API returns totalItems directly, adjust if necessary
        setTotalItems(data.totalItems); 
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    fetchOrders();
  }, [currentPage, pageSize]); // Add pageSize to dependency array

  console.log("Products>>>", orders);
  return (
    <div className="w-full bg-gray-100 min-h-screen  relative p-2">
      <div className="ml-60 max-w-7xl  bg-white rounded-lg p-4 top-12 relative">
        <div className="py-4">
          <h1 className="text-xl font-medium text-left">Order list</h1>
          <p className="text-left text-sm ">Manage all your products</p>
        </div>
        <div className="flex flex-col">
          <div className=" bg-white ">
            <div class="relative overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead class="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
                  <tr>
                    <th scope="col" class="px-2 py-3">
                      Customer Name
                    </th>
                    <th scope="col" class="px-2 py-3">
                      Email
                    </th>

                    <th scope="col" class="px-2 py-3">
                      Order Date
                    </th>
                    <th scope="col" class="px-2 py-3">
                      Download Invoice
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders &&
                    orders.map((item) => (
                      <OrderTable key={item._id} data={item} />
                    ))}
                </tbody>
              </table>
            </div>
            <div className="mt-2">
              <Pagination
                currentPage={currentPage}
                totalItems={totalItems}
                pageSize={pageSize}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
