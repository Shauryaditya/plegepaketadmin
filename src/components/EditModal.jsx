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
import { EditIcon } from "@chakra-ui/icons";
import { getToken } from "../hook/getToken";

const EditModal = ({ id, product, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    image: initialImage,
    product_name: initialProductName,
    package_size: initialPackageSize,
    unit: initialUnit,
    price: initialPrice,
  } = product;
  const token = getToken();
  const [image, setImage] = useState(initialImage);
  const [productName, setProductName] = useState(initialProductName);
  const [packageSize, setPackageSize] = useState(initialPackageSize);
  const [unit, setUnit] = useState(initialUnit);
  const [price, setPrice] = useState(initialPrice);

  const handleUpdateProduct = async () => {
    try {
      console.log("Token>>>", token);

      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/product/edit-product/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            image,
            product_name: productName,
            package_size: parseInt(packageSize),
            unit,
            price,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<EditIcon />}
          onClick={onOpen}
        />
      )}
      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
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
            {image && (
              <Image
                borderRadius="full"
                boxSize="150px"
                src={image}
                alt={productName}
              />
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="">
                <label htmlFor="">Product Image</label>
                <Input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="">
                <label htmlFor="">Package Size</label>
                <Input
                  value={packageSize}
                  onChange={(e) => setPackageSize(e.target.value)}
                />
              </div>
              <div className="">
                <label htmlFor="">Unit</label>
                <Input value={unit} onChange={(e) => setUnit(e.target.value)} />
              </div>

              <div className="">
                <label htmlFor="">Price</label>
                <Input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="white"
              textColor="black"
              border="1px"
              mr={3}
              onClick={handleUpdateProduct}
            >
              Update
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
