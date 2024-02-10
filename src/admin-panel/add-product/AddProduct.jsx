import React, { useState } from "react";
import Header from "../../components/Header";

const AddProduct = () => {
  const [isPG51Checked, setIsPG51Checked] = useState(false);
  const [isGloveChecked, setIsGloveChecked] = useState(false);

  const handlePG51Change = (event) => {
    setIsPG51Checked(event.target.checked);
  };

  const handleGloveChange = (event) => {
    setIsGloveChecked(event.target.checked);
  };
  return (
    <div className="w-full bg-gray-100 min-h-screen  relative">
      <Header />

      <div className="ml-72 max-w-4xl bg-white rounded-lg p-4 mt-8">
        <div className="py-4">
          <h1 className="text-xl font-medium text-left">Add Product</h1>
        </div>
        <form>
        <div className="grid grid-cols-3 gap-4">
          {/* Product details inputs */}
          <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1">
            <div className="mb-4">
              <label htmlFor="productName" className="text-left block mb-1">
                Product Name
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
              <label htmlFor="packageSize" className="text-left block mb-1">
                Package Size
              </label>
              <input
                type="number"
                id="packagesize"
                name="packagesize"
                className="w-full border rounded-md p-2"
              />
            </div>
          </div>

          <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1">
            <div className="mb-4">
              <label htmlFor="unit" className="text-left block mb-1">
                Unit
              </label>
              <select
                id="unit"
                name="unit"
                className="w-full border rounded-md p-2"
              >
                <option value="">--select</option>
                <option value="ML">ML</option>
                <option value="Pieces">Pieces</option>
              </select>
            </div>
          </div>

          <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1">
            <div className="flex gap-x-4 mb-4">
              <label htmlFor="isPG51" className="text-left block mb-1">
                isPG51
              </label>
              <input
                type="checkbox"
                id="isPG51"
                name="isPG51"
                className="border rounded-md p-2"
                checked={isPG51Checked}
                onChange={handlePG51Change}
              />
            </div>

            <div className="flex gap-x-4 mb-4">
              <label htmlFor="isGlove" className="text-left block mb-1">
                isGlove
              </label>
              <input
                type="checkbox"
                id="isGlove"
                name="isGlove"
                className="border rounded-md p-2"
                checked={isGloveChecked}
                onChange={handleGloveChange}
              />
            </div>
          </div>
          <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1">
            <div className="mb-4">
              <label htmlFor="productName" className="text-left block mb-1">
                Quantity
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
              <label htmlFor="productName" className="text-left block mb-1">
                Max Number
              </label>
              <input
                type="number"
                id="Max Number"
                name="Max Number"
                className="w-full border rounded-md p-2"
              />
            </div>

            {/* Repeat for other input fields */}
          </div>
          {/* Textarea for product details */}
          <div className="col-span-3">
            <div className="mb-4">
              <label htmlFor="productDetails" className="text-left block mb-1">
                Product Details
              </label>
              <textarea
                id="productDetails"
                name="productDetails"
                className="w-full border rounded-md p-2"
              ></textarea>
            </div>
          </div>
          {/* Image upload inputs */}
          <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1">
            <div className="mb-4">
              <label htmlFor="productName" className="text-left block mb-1">
                Images
              </label>
              <input
                type="text"
                id="ImageLink"
                name="imageLink"
                placeholder="Enter image URL or drop files here..."
                className="w-full border rounded-md p-2"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-x-4">
          <button className="bg-blue-900 text-white px-14 py-2 rounded-full">Save</button>
          <button className=" text-blue-900 border-blue-900 border px-14 py-2 rounded-full">Cancel</button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
