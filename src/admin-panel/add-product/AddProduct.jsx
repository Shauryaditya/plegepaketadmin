import React, { useState } from "react";
import Header from "../../components/Header";
import { getToken } from "../../hook/getToken";
import toast from "react-hot-toast";

const AddProduct = () => {
  const token = getToken();
  const [formData, setFormData] = useState({
    product_name: "",
    package_size: "",
    unit: "",
    isPG51: false,
    isGlove: false,
    maxNo: "",
    initialNo: "",
    price: "",
    image: "",
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Assuming formData is defined and contains the form data
  
    console.log("Form data:", formData);
  
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/product/add-product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
  
      const responseData = await response.json();
  
      if (response.ok) {
        toast.success("Successfully added the Product");
      } else {
        console.error("Failed to add the Product", responseData);
      }
    } catch (error) {
      toast.error("Error while adding the Product");
    }
  };
  
  return (
    <div className="w-full bg-gray-100 min-h-screen relative">
      
      <div className="ml-72 max-w-4xl bg-white rounded-lg p-4 top-12 relative">
        <div className="py-4">
          <h1 className="text-xl font-medium text-left">Add Product</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4">
            {/* Product details inputs */}
            {/* Product Name */}
            <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1">
              <div className="mb-4">
                <label htmlFor="productName" className="text-left block mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  id="product_name"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                />
              </div>
            </div>
            {/* Package Size */}
            <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1">
              <div className="mb-4">
                <label htmlFor="packageSize" className="text-left block mb-1">
                  Package Size
                </label>
                <input
                  type="number"
                  id="package_size"
                  name="package_size"
                  value={formData.package_size}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                />
              </div>
            </div>
            {/* Unit */}
            <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1">
              <div className="mb-4">
                <label htmlFor="unit" className="text-left block mb-1">
                  Unit
                </label>
                <select
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                >
                  <option value="">--select</option>
                  <option value="ml">ML</option>
                  <option value="pieces">Pieces</option>
                </select>
              </div>
            </div>
            {/* isPG51 */}
            <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1">
              <div className="flex gap-x-4 mb-4">
                <label htmlFor="isPG51" className="text-left block mb-1">
                  isPG51
                </label>
                <input
                  type="checkbox"
                  id="isPG51"
                  name="isPG51"
                  checked={formData.isPG51}
                  onChange={handleChange}
                  className="border rounded-md p-2"
                />
              </div>
            </div>
            {/* isGlove */}
            <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1">
              <div className="flex gap-x-4 mb-4">
                <label htmlFor="isGlove" className="text-left block mb-1">
                  isGlove
                </label>
                <input
                  type="checkbox"
                  id="isGlove"
                  name="isGlove"
                  checked={formData.isGlove}
                  onChange={handleChange}
                  className="border rounded-md p-2"
                />
              </div>
            </div>

            {/* Max Number */}
            <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1">
              <div className="mb-4">
                <label htmlFor="maxNumber" className="text-left block mb-1">
                  Max Number
                </label>
                <input
                  type="number"
                  id="maxNo"
                  name="maxNo"
                  value={formData.maxNo}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                />
              </div>
            </div>
            {/* Initial Number */}
            <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1">
              <div className="mb-4">
                <label htmlFor="maxNumber" className="text-left block mb-1">
                  Initial Number
                </label>
                <input
                  type="number"
                  id="initialNo"
                  name="initialNo"
                  value={formData.initialNo}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                />
              </div>
            </div>
            {/* Price */}
            <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1">
              <div className="mb-4">
                <label htmlFor="maxNumber" className="text-left block mb-1">
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                />
              </div>
            </div>
            {/* Image Link */}
            <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1">
              <div className="mb-4">
                <label htmlFor="imageLink" className="text-left block mb-1">
                  Image Link
                </label>
                <input
                  type="text"
                  id="imageLink"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Enter image URL or drop files here..."
                  className="w-full border rounded-md p-2"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-x-4">
            <button
              type="submit"
              className="bg-blue-900 text-white px-14 py-2 rounded-full"
            >
              Save
            </button>
            <button
              type="button"
              className="text-blue-900 border-blue-900 border px-14 py-2 rounded-full"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
