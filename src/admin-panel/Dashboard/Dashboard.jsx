import React from "react";

const Dashboard = () => {
  return (
    <div className="w-full bg-gray-100 min-h-screen p-4 relative">
      <div className="flex justify-between px-4 py-6 ml-60">
        <h1>
          <span className="font-bold">Hey Rahul </span>here’s what’s happening
          with your store today
        </h1>

        <div className="flex gap-x-12">
          <div className="bg-white w-64 h-24 rounded p-8"></div>
          <div className="bg-white w-64 h-24 rounded p-8"></div>
        </div>
      </div>
      <div className="ml-60  bg-white p-4">
        <div className="flex flex-col">
            <div className="flex justify-between ">
                <h1 className="">Recent Orders</h1>
                <div className="flex gap-x-2">
                    <div className="border px-4 py-1 rounded">Last week</div>
                    <div className="border px-4 rounded">Last week</div>
                    <div className="border px-4 rounded">Last week</div>
                </div>
            </div>
        <div className=" bg-gray-200 ">
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
