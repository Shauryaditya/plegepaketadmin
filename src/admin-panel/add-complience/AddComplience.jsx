import { Button, Input, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getToken } from "../../hook/getToken";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import toast from "react-hot-toast";

const AddCompliance = () => {
  const [compliances, setCompliances] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [productToAdd, setProductToAdd] = useState("");
  const [selectedComplianceId, setSelectedComplianceId] = useState("");
  const [isComplianceDisabled, setIsComplianceDisabled] = useState(false);
  const [additionalProductFields, setAdditionalProductFields] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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

  const handleQuantityChange = (index, event) => {
    const { value } = event.target;
    const updatedProductAdd = [...productAdd];
    updatedProductAdd[index].quantity = value;

    // Calculate total price
    let totalPrice = 0;
    updatedProductAdd.forEach((item, index) => {
      const product = products.find(
        (product) => product._id === item.product_id
      );
      if (product) {
        totalPrice += product.price * parseInt(item.quantity);
      }
    });
    setTotalPrice(totalPrice);

    setProductAdd(updatedProductAdd);
  };

  const handleProductChange = (index, productId) => {
    setIsComplianceDisabled(true);
    console.log("Index>>>>", index);
    if (index >= 0 && index < productAdd.length) {
      productAdd[index].product_id = productId;
    }
  };

  const handleAddProduct = () => {
    const item = {
      product_id: "",
      quantity: "",
    };

    setProductAdd([...productAdd, item]);
  };

  const handleRemoveProduct = (indexToRemove) => {
    setProductAdd((prevProducts) => {
      const updatedProducts = prevProducts.filter(
        (_, index) => index !== indexToRemove
      );
      return updatedProducts;
    });
  };

  const handleSubmit = async () => {
    try {
      const token = getToken();
      const requestBody = {
        compilations_id: selectedComplianceId,
        product_id: [...productAdd],
      };
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/product/add-compliance`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen relative p-2">
      <div className="ml-60 max-w-7xl bg-white rounded-lg p-4 top-12 relative">
        <div className="py-4">
          <h1 className="text-xl font-medium text-left">Add Compliance</h1>
        </div>
        <div className="flex  gap-4 ">
          <Select
            w="35rem"
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
            <div className="absolute right-20 top-8 font-bold">Total Price</div>
            {productAdd.map((item, index) => (
              <div className="flex  gap-4" key={index}>
                <Select
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
                <div className="flex justify-center items-center">
                  <CloseIcon
                    onClick={() => handleRemoveProduct(index)}
                    cursor="pointer"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="absolute top-8 right-8 flex justify-center items-center">
            {totalPrice.toFixed(2)} {/* Display the calculated price */}
          </div>
          <div className="flex justify-center items-center">
            <AddIcon onClick={handleAddProduct} />
          </div>
        </div>
        <Button margin="2rem" onClick={handleSubmit}>
          Add Compliance
        </Button>{" "}
      </div>
    </div>
  );
};

export default AddCompliance;
