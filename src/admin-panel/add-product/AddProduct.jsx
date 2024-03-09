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
    price: "",
    image: null, // Initially set to null
  });

  // Handle file change function
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first file from the input
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: file,
    }));
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create FormData object to handle file upload
    const formDataToSend = new FormData();
    formDataToSend.append("product_name", formData.product_name);
    formDataToSend.append("package_size", formData.package_size);
    formDataToSend.append("unit", formData.unit);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("image", formData.image);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/product/add-product`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
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
    <div className="w-full bg-gray-100 min-h-screen relative p-2">
      <div className="ml-60 max-w-7xl bg-white rounded-lg p-4 top-12 relative">
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
                  <option value="Stücke">Stücke</option>
                  <option value="ML">ML</option>
                </select>
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
            <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1">
              <div className="mb-4">
                <label htmlFor="imageUpload" className="text-left block mb-1">
                  Image Upload
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  name="image"
                  onChange={handleFileChange}
                  accept="image/*"
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
