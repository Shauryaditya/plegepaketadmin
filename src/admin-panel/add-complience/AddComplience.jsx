import { Input, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getToken } from "../../hook/getToken";
import { AddIcon } from "@chakra-ui/icons";

const AddCompliance = () => {
  const [compliances, setCompliances] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productToAdd, setProductToAdd] = useState('');
  const [isComplianceDisabled, setIsComplianceDisabled] = useState(false);

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

  const handleProductChange = (productId) => {
    setIsComplianceDisabled(true);
    const product = products.find(product => product.id === productId);
    setProductToAdd(product);
  };

  const handleAddProduct = () => {
    if (selectedProducts.length < 3 && productToAdd) {
      setSelectedProducts(prevProducts => [...prevProducts, productToAdd]);
      setProductToAdd('');
      setIsComplianceDisabled(false);
    }
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen relative p-2">
      <div className="ml-60 max-w-7xl bg-white rounded-lg p-4 top-12 relative">
        <div className="py-4">
          <h1 className="text-xl font-medium text-left">Add Compliance</h1>
        </div>
        <div className="flex gap-4">
          <Select placeholder="Select product" onChange={(e) => handleProductChange(e.target.value)}>
            {products.map((product, index) => (
              <option key={index} value={product.id}>
                {product.product_name}
              </option>
            ))}
          </Select>
          <Select placeholder="Select compliance" disabled={isComplianceDisabled}>
            {compliances.map((compliance, index) => (
              <option key={index} value={compliance.id}>
                {compliance.compilation_name}
              </option>
            ))}
          </Select>
          <Input type="number" />
          <div className="flex justify-center items-center">
            <AddIcon onClick={handleAddProduct} />
          </div>
        </div>
        {selectedProducts.map((product, index) => (
          <div key={index}>
            <Select placeholder="Select compliance" disabled>
              {compliances.map((compliance, index) => (
                <option key={index} value={compliance.id}>
                  {compliance.compilation_name}
                </option>
              ))}
            </Select>
            <Input type="number" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCompliance;
