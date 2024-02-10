import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import product from "../../assets/Products.png"
import orders from "../../assets/Orders.png"


const Dashboard = () => {
  const [products, setProducts] = useState();
  const fetchProducts = async() =>{
    const response = await fetch(`${process.env.REACT_APP_URL}/api/v1/get/all-product`)
    const data = await response.json()
    setProducts(data.data)
  }
  useEffect(() =>{
    fetchProducts()
  },[])
  console.log(products);
  return (
    <div className="w-full bg-gray-100 min-h-screen  relative">
      <Header />
      <div className="flex justify-end px-4 py-6 ml-72 max-w-4xl gap-x-2">
        <div className="flex gap-x-6 justify-end">
          <div className="bg-white w-64 h-24 rounded p-1 ">
            <div className="flex justify-center gap-x-8">
              <div className="flex flex-col gap-y-2 my-4">
                <h1 className="text-sm">PRODUCTS LISTED</h1>
                <p className="text-lg text-left font-semibold">{products?.length}</p>
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
      <div className="ml-72  bg-white rounded-lg p-4 max-w-4xl">
        <div className="flex flex-col">
            <div className="flex justify-between pb-8">
                <h1 className="">Recent Orders</h1>
                <div className="flex gap-x-2">
                    <div className="border px-4 py-1 rounded">Last week</div>
                    <div className="border px-4 py-1 rounded">Last week</div>
                    <div className="border px-4 py-1 rounded">Last week</div>
                </div>
            </div>
        <div className=" bg-gray-200  ">
          <div class="relative overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
                <tr>
                  <th scope="col" class="px-2 py-3">
                    Order Id
                  </th>
                  <th scope="col" class="px-2 py-3">
                    Customer Name
                  </th>
                  <th scope="col" class="px-2 py-3">
                    Order Date
                  </th>
                  <th scope="col" class="px-2 py-3">
                    Download Invoice
                  </th>
                  <th scope="col" class="px-2 py-3">
                   View Pdf
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {orderList &&
                                     orderList.map((item) => (
                                         <OrdersTableRow
                                             key={item._id}
                                             data={item}
                                             onDelete={handleDelete}
                                        />
                                     ))} */}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
