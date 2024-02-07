import React from "react";
import Header from "../../components/Header";

const AddProduct = () => {
  return (
    <div className="w-full bg-gray-100 min-h-screen  relative">
      <Header />
      <div className="ml-64  bg-white rounded-lg p-4">
        <div className="grid grid-cols-3 gap-4">
          {/* Product details inputs */}
          <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1">
            <div className="mb-4">
              <label htmlFor="productName" className="block mb-1">
                Product Name:
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                className="w-full border rounded-md p-2"
              />
            </div>
            
            {/* Repeat for other input fields */}
          </div>
          <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1">
            <div className="mb-4">
              <label htmlFor="productName" className="block mb-1">
                Categories
              </label>
              <input
                type="text"
                id="categories"
                name="categories"
                className="w-full border rounded-md p-2"
              />
            </div>
            
            {/* Repeat for other input fields */}
          </div>
          <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1">
            <div className="mb-4">
              <label htmlFor="productName" className="block mb-1">
               Brand:
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                className="w-full border rounded-md p-2"
              />
            </div>
            
            {/* Repeat for other input fields */}
          </div>
          <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1">
            <div className="mb-4">
              <label htmlFor="productName" className="block mb-1">
                Product Id:
              </label>
              <input
                type="text"
                id="productId"
                name="productId"
                className="w-full border rounded-md p-2"
              />
            </div>
            
            {/* Repeat for other input fields */}
          </div>
                    <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1">
            <div className="mb-4">
              <label htmlFor="productName" className="block mb-1">
                Price:
              </label>
              <input
                type="text"
                id="price"
                name="price"
                className="w-full border rounded-md p-2"
              />
            </div>
            
            {/* Repeat for other input fields */}
          </div>
          <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1">
            <div className="mb-4">
              <label htmlFor="productName" className="block mb-1">
                Status:
              </label>
              <input
                type="text"
                id="status"
                name="status"
                className="w-full border rounded-md p-2"
              />
            </div>
            
            {/* Repeat for other input fields */}
          </div>
          <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1">
            <div className="mb-4">
              <label htmlFor="productName" className="block mb-1">
                Quantity:
              </label>
              <input
                type="text"
                id="Quantity"
                name="Quantity"
                className="w-full border rounded-md p-2"
              />
            </div>
            
            {/* Repeat for other input fields */}
          </div>
          <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1">
            <div className="mb-4">
              <label htmlFor="productName" className="block mb-1">
                Minimum Quantity:
              </label>
              <input
                type="text"
                id="Minimum Quantity"
                name="Minimum Quantity"
                className="w-full border rounded-md p-2"
              />
            </div>
            
            {/* Repeat for other input fields */}
          </div>
          {/* Textarea for product details */}
          <div className="col-span-3">
            <div className="mb-4">
              <label htmlFor="productDetails" className="block mb-1">
                Product Details:
              </label>
              <textarea
                id="productDetails"
                name="productDetails"
                className="w-full border rounded-md p-2"
              ></textarea>
            </div>
          </div>
          {/* Image upload inputs */}
          <div className="col-span-3 flex justify-between">
            <input
              type="file"
              name="image1"
              className="w-1/4 border rounded-md p-2"
            />
            <input
              type="file"
              name="image2"
              className="w-1/4 border rounded-md p-2"
            />
            <input
              type="file"
              name="image3"
              className="w-1/4 border rounded-md p-2"
            />
            <input
              type="file"
              name="image4"
              className="w-1/4 border rounded-md p-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
