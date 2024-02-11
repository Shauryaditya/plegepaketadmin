import React, { useEffect, useState } from "react";
import EditModal from "../../components/EditModal";

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
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg> */}

        </div>
      </td>
    </tr>
  );
};
