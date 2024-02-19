import React, { useEffect, useState } from "react";
import EditModal from "../../components/EditModal";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import AddComplienceModal from "../../components/AddComplienceModal";
import { getToken } from "../../hook/getToken";
import toast from "react-hot-toast";

export const ComplienceTable = ({ data }) => {
  const { compilation_name, _id } = data;

  const [isLoading, setIsLoading] = useState(true);
  const [modalName, setModalName] = useState("edit");

  // Function to handle deletion
  const handleDelete = async () => {
    try {
      const token= getToken();
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/product/deleteCompliance/${_id}`,
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
        {compilation_name}
      </td>
      <td class="px-2 py-2 capitalize">{_id}</td>

      <td class="px-2 py-2">
        <div className="flex gap-x-2">
        <AddComplienceModal id={_id} modalName="view" />
          {modalName === "edit" && (
            <AddComplienceModal id={_id} modalName={modalName} />
          )}
          <div className="flex justify-center items-center">
            <DeleteIcon onClick={handleDelete} />
          </div>
        </div>
      </td>
    </tr>
  );
};
