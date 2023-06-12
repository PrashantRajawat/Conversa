import { ViewIcon } from "@chakra-ui/icons";
import React from "react";
import {
  useDisclosure,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";
const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={30} textAlign="center">
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src={user.pic}
              alt={user.name}
              borderRadius="50%"
              height="auto"
              w="100px"
            />
            <Text fontSize="2xl" mt={4}>
              Email:{user.email}
            </Text>
          </ModalBody>

          {/* <ModalFooter>
            <Button
              bg="rgb(72, 177, 234)"
              color="white"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
