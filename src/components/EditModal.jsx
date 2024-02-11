import React from "react";
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

const EditModal = ({ product, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { image, initialNo, maxNo, package_size, price, product_name, unit } =
    product;
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
            {image && ( // Checking if image exists before rendering
              <Image
                borderRadius="full"
                boxSize="150px"
                src={image}
                alt={product_name}
              />
            )}
      
            <div className="grid grid-cols-2 gap-4">
              <Input value={product_name} />
              <Input value={initialNo} />
              <Input value={maxNo} />
              <Input value={package_size} />
              <Input value={unit} />
            </div>
          </ModalBody>

          <ModalFooter>
          <Button colorScheme="white" textColor="black" border="1px" mr={3} onClick={onClose}>
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
