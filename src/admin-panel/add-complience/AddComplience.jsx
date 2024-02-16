import { Button, Input, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getToken } from "../../hook/getToken";
import { AddIcon } from "@chakra-ui/icons";

const AddCompliance = () => {
  const [compliances, setCompliances] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productToAdd, setProductToAdd] = useState("");
  const [selectedComplianceId, setSelectedComplianceId] = useState("");
  const [isComplianceDisabled, setIsComplianceDisabled] = useState(false);
  const [additionalProductFields, setAdditionalProductFields] = useState([]);

  useEffect(() => {
    const fetchCompliances = async () => {
      try {
        const token = getToken();
        const response = await fetch(
          `${process.env.REACT_APP_URL}/api/v1/get/compilations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setCompliances(data.data);
      } catch (error) {
        console.error("Error fetching compliances:", error);
      }
    };

    fetchCompliances();

    const fetchProducts = async () => {
      try {
        const token = getToken();
        const response = await fetch(
          `${process.env.REACT_APP_URL}/api/v1/get/all-product`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleComplianceChange = (e) => {
    setSelectedComplianceId(e.target.value);
  };

  const handleProductChange = (productId) => {
    setIsComplianceDisabled(true);
    const product = products.find((product) => product._id === productId);
    setProductToAdd(product);
  };

  console.log("Product add :", productToAdd);

  const handleAddProduct = () => {
    if (selectedProducts.length < 3) {
      setSelectedProducts((prevProducts) => [...prevProducts, productToAdd]);
      setAdditionalProductFields((prevFields) => [...prevFields, {}]); // Add an empty object to additional fields
      setProductToAdd("");
      setIsComplianceDisabled(false);
    } else {
      // Provide feedback to the user that they cannot add more than 3 products
      console.log("You cannot add more than 3 products.");
    }
  };

  // Function to handle product change for the additional product fields
  const handleAdditionalProductChange = (productId, index) => {
    const updatedProducts = [...selectedProducts];
    const product = products.find((product) => product._id === productId);
    updatedProducts[index] = product;
    setSelectedProducts(updatedProducts);
  };
console.log("Selected Products>>>",selectedProducts)
  // const handleAddField = () => {
  //   setAdditionalProductFields(prevFields => [...prevFields, {}]);
  // };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const requestBody = {
        compilations_id: selectedComplianceId, // Assuming you have selectedComplianceId state
        product_id: selectedProducts.map((product) => ({
          product_id: product._id,
          quantity: 1, // Assuming all quantities are set to 1 for simplicity
        })),
      };
      console.log("Request  Body >>> ", requestBody);
 
      const token = getToken();
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/product/add-compliance`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            compilations_id: selectedComplianceId, // Assuming you have selectedComplianceId state
            product_id: selectedProducts.map((product) => ({
              product_id: product._id,
              quantity: 1, // Assuming all quantities are set to 1 for simplicity
            })),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      // Reset form or show success message
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error
    }
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen relative p-2">
      <div className="ml-60 max-w-7xl bg-white rounded-lg p-4 top-12 relative">
        <div className="py-4">
          <h1 className="text-xl font-medium text-left">Add Compliance</h1>
        </div>
        <div className="flex gap-4">
          <Select
            placeholder="Select compliance"
            onChange={handleComplianceChange}
            disabled={isComplianceDisabled}
          >
            {compliances.map((compliance, index) => (
              <option key={index} value={compliance._id}>
                {compliance.compilation_name}
              </option>
            ))}
          </Select>
          <Select
            placeholder="Select product"
            onChange={(e) => handleProductChange(e.target.value)}
          >
            {products.map((product, index) => (
              <option key={index} value={product._id}>
                {product.product_name}
              </option>
            ))}
          </Select>

          <Input type="number" />
          <div className="flex justify-center items-center">
            <AddIcon onClick={handleAddProduct} />
          </div>
        </div>
        {additionalProductFields.map((field, index) => (
          <div className="flex justify-between" key={index}>
            <Select
              placeholder="Select product"
              onChange={(e) =>
                handleAdditionalProductChange(e.target.value, index)
              }
            >
              {products.map((product, index) => (
                <option key={index} value={product._id}>
                  {product.product_name}
                </option>
              ))}
            </Select>
            <Input type="number" />
          </div>
        ))}
        {/* <div className="flex justify-center items-center">
          <AddIcon onClick={handleAddField} />
        </div> */}
        <Button onClick={handleSubmit}>Submit</Button>{" "}
        {/* Add a submit button */}
      </div>
    </div>
  );
};

export default AddCompliance;
