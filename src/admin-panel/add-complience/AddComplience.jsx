import { Button, Input, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getToken } from "../../hook/getToken";
import { AddIcon } from "@chakra-ui/icons";
import toast from "react-hot-toast";

const AddCompliance = () => {
  const [compliances, setCompliances] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [productToAdd, setProductToAdd] = useState("");
  const [selectedComplianceId, setSelectedComplianceId] = useState("");
  const [isComplianceDisabled, setIsComplianceDisabled] = useState(false);
  const [additionalProductFields, setAdditionalProductFields] = useState([]);

  const [productAdd, setProductAdd] = useState([
    {
      product_id: "",
      quantity: "",
    },
  ]);

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

  // Function to handle changes in quantity
  const handleQuantityChange = (index, event) => {
    const { value } = event.target;
    const updatedProductAdd = [...productAdd];
    updatedProductAdd[index].quantity = value;
    setProductAdd(updatedProductAdd);
  };

  const handleProductChange = (index, productId) => {
    setIsComplianceDisabled(true);
    console.log("Index>>>>", index);
    if (index >= 0 && index < productAdd.length) {
      productAdd[index].product_id = productId;
    }
  };

  console.log("Product add :", productToAdd);

  const handleAddProduct = () => {
    console.log("call function>>>>>>");
    const item = {
      product_id: "",
      quantity: "",
    };

    setProductAdd([...productAdd, item]);
  };

  console.log("productAdd:", productAdd);

  // Function to handle product change for the additional product fields
  const handleAdditionalProductChange = (productId, index) => {
    const updatedProducts = [...selectedProducts];
    const product = products.find((product) => product._id === productId);
    updatedProducts[index] = product;
    setSelectedProducts(updatedProducts);
  };
  // const handleAddField = () => {
  //   setAdditionalProductFields(prevFields => [...prevFields, {}]);
  // };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
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
              quantity: product.quantity, // Assuming all quantities are set to 1 for simplicity
            })),
          }),
        }
      );
      const data = await response.json();
      
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
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
            w="24rem"
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
          <div className="flex flex-col gap-2">
            {productAdd.map((item, index) => (
              <div className="flex  gap-4">
                <Select
                  key={index}
                  placeholder="Select product"
                  onChange={(e) => handleProductChange(index, e.target.value)}
                >
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.product_name}
                    </option>
                  ))}
                </Select>

                <Input
                  value={item.quantity}
                  onChange={(event) => handleQuantityChange(index, event)}
                  placeholder="Enter quantity"
                  type="number"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <AddIcon onClick={handleAddProduct} />
          </div>
        </div>
        {additionalProductFields.map((field, index) => (
          <div className="flex flex-col justify-between gap-4 my-2" key={index}>
            <Select disabled></Select>
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
            <Input
              value={field.quantity}
              onChange={(event) => handleQuantityChange(index, event)}
              type="number"
            />
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
