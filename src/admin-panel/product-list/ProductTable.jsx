import React, { useEffect, useState } from "react";
import EditModal from "../../components/EditModal";
import { DeleteIcon } from "@chakra-ui/icons";
import toast from "react-hot-toast";
import { getToken } from "../../hook/getToken";

export const ProductTable = ({ data }) => {
  const { product_name, _id, unit, price, maxNo } = data;
  const [singleproduct, setSingleProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const fetchSingleProductData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/get/product/${_id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setSingleProduct(data.data);
    } catch (error) {
      console.error("Error fetching single product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleProductData();
  }, [_id]); // Run effect whenever _id changes
  console.log("Single Product >>>", singleproduct);

  const handleDelete = async () => {
    try {
      const token= getToken();
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/product/delete/${_id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
        const data  = await response.json();
      if (!response.ok) {
        throw new Error("Failed to delete compliance");
      }else{
        toast.success(data.message);
        window.location.reload()
      }

      // Handle success - you can remove the deleted item from the UI or update the list
    } catch (error) {
      console.error("Error deleting compliance:", error);
    }
  };
  return (
    <tr class="border-b border-solid border-gray-200 bg-white hover:bg-gray-50 text-[#222222]">
      <td
        scope="row"
        class="whitespace-nowrap px-2 py-2 font-medium text-gray-900"
      >
        {product_name}
      </td>
    
      <td class="px-2 py-2 capitalize">{unit}</td>
      <td class="px-2 py-2">{price}</td>
      <td class="px-2 py-2">{maxNo}</td>
      <td class="px-2 py-2">
        <div className="flex gap-x-2">
 
          {!isLoading && singleproduct && (
          <EditModal id={_id} product={singleproduct} />
          )}
  
  <div className="flex justify-center items-center">
            <DeleteIcon onClick={handleDelete} />
          </div>
        </div>
      </td>
    </tr>
  );
};
