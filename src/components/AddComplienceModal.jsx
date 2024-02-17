import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Input,
} from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { getToken } from "../hook/getToken";

const AddComplienceModal = ({ id, modalName, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [complianceName, setComplianceName] = useState("");
  const token = getToken();

  const handleAddCompliance = async () => {
    try {
      // Make a request to your API to add compliance
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/product/add-compliance-name`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ compilation_name: complianceName }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add compliance");
      }

      // Close the modal after successful addition
      window.location.reload()
      onClose();
    } catch (error) {
      console.error("Error adding compliance:", error);
    }
  };

  const handleEditComplience = async () => {
    try {
      // Make a request to your API to add compliance
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/product/edit-compliance-name/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ compilation_name: complianceName }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add compliance");
      }

      // Close the modal after successful addition
      window.location.reload();
      onClose();
    } catch (error) {
      console.error("Error adding compliance:", error);
    }
  };
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={modalName === "edit" ? <EditIcon /> : <AddIcon />}
          onClick={onOpen}
        />
      )}
      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="200px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          ></ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            {modalName === "edit" ? (
              <h1 className="text-xl font-bold">Edit Complience</h1>
            ) : (
              <h1 className="text-xl font-bold">Add New Complience</h1>
            )}

            <Input
              value={complianceName}
              onChange={(e) => setComplianceName(e.target.value)}
              placeholder="Compliance Name"
            />
          </ModalBody>

          <ModalFooter>
            {modalName === "edit" ? (
              <Button
                colorScheme="white"
                textColor="black"
                border="1px"
                mr={3}
                onClick={handleEditComplience}
              >
                Edit
              </Button>
            ) : (
              <Button
                colorScheme="white"
                textColor="black"
                border="1px"
                mr={3}
                onClick={handleAddCompliance}
              >
                Add
              </Button>
            )}

            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddComplienceModal;
