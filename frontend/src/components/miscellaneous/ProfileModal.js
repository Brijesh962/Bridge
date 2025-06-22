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
    useDisclosure
} from '@chakra-ui/react';
import React from 'react'

const ProfileModal = ({user, children}) => {
const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={
            <Image
              borderRadius="0.7rem"
              boxSize="35px"
              src={user.pic}
              alt={user.name}
              alignSelf="center"
            />
          }
          onClick={onOpen}
        />
      )}
      <Modal
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        alignItems="center"
      >
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="'Ubuntu', sans-serif"
            display="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="2rem"
              boxSize="200px"
              src={user.pic}
              alt={user.name}
              alignSelf="center"
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="'Ubuntu', sans-serif"
            >
              Email: {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal;
