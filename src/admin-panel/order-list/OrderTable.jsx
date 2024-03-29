import React, { useEffect, useState } from "react";
import EditModal from "../../components/EditModal";

export const OrderTable = ({ data }) => {
  const { firstName, lastName, email, orderDate, sessionId } = data;
  const [singleproduct, setSingleProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Function to format the order date
  const formatOrderDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const handlePdfDownload = async (sessionId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/api/v1/order/generate-pdf/${sessionId}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const { pdfUrl } = await response.json();
  
      if (pdfUrl) {
        // Construct the full URL for the PDF
        const fullPdfUrl = `${pdfUrl}`;
  
        // Open a new tab/window to download the PDF
        window.open(fullPdfUrl, '_blank');
      } else {
        console.error('PDF path not found in the response');
        // Handle the case where pdfPath is not available in the response
      }
  
    } catch (error) {
      console.error('Error while fetching or parsing data:', error);
      // Handle or log the error in a more sophisticated way
    }
  }
  

  return (
    <tr class="border-b border-solid border-gray-200 bg-white hover:bg-gray-50 text-[#222222]">
      <td
        scope="row"
        class="whitespace-nowrap px-2 py-2 font-medium text-gray-900"
      >
        <p>
          <span>{firstName}</span>
          <span>{lastName}</span>
        </p>
      </td>

      <td class="px-2 py-2 capitalize">{email}</td>
      <td class="px-2 py-2">{formatOrderDate(orderDate)}</td>
      <td class="px-2 py-2">
        <div
          className="flex cursor-pointer gap-x-2"
          onClick={() => handlePdfDownload(sessionId)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          Download PDF
        </div>
      </td>
    </tr>
  );
};
