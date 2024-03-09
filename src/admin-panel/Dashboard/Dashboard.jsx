import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import product from "../../assets/Products.png";
import orders from "../../assets/Orders.png";
import { getToken } from "../../hook/getToken";
import OrdersTableRow from "./OrdersTableRow";
import Pagination from "../../components/Pagination";

const Dashboard = () => {
  const [products, setProducts] = useState();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
const page = currentPage
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
  

  const fetchProducts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_URL}/api/v1/get/all-product`
    );
    const data = await response.json();
    setProducts(data.data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(products);
  return (
    <div className="w-full bg-gray-100 min-h-screen  relative p-2">
      <div className="flex justify-end px-4 py-6 ml-60 max-w-7xl gap-x-2 top-12 relative p-4">
        <div className="flex gap-x-6 justify-end">
          <div className="bg-white w-64 h-24 rounded p-1 ">
            <div className="flex justify-center gap-x-8">
              <div className="flex flex-col gap-y-2 my-4">
                <h1 className="text-sm">PRODUCTS LISTED</h1>
                <p className="text-lg text-left font-semibold">
                  {products?.length}
                </p>
              </div>
              <div className="py-4">
                <img src={product} alt="" />
              </div>
            </div>
          </div>
          <div className="bg-white w-64 h-24 rounded p-1">
            <div className="flex justify-center gap-x-8">
              <div className="flex flex-col gap-y-2 my-4">
                <h1 className="text-sm">TOTAL ORDERS</h1>
                <p className="text-lg text-left font-semibold">0</p>
              </div>
              <div className="py-4">
                <img src={orders} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-60 bg-white rounded-lg max-w-7xl top-12 relative p-4">
        <div className="flex flex-col">
          <div className="flex justify-between pb-8">
            <h1 className="">Recent Orders</h1>
          </div>
          <div className="  ">
            <div class="relative overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead class="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
                  <tr>
                    <th scope="col" class="px-2 py-3">
                     Customer Name
                    </th>
                    <th scope="col" class="px-2 py-3">
                     Customer Email
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
                      <OrdersTableRow key={item._id} data={item} />
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

export default Dashboard;
