import { Context } from "@/components/context/context";
import { UnlockIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { useContext } from "react";
import OAuthButton from "./OAuthButton";

const AuthModel = () => {
  const { authState,setAuthState } = useContext(Context);

  const handleClose = () => {
    setAuthState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <>
      <Modal isOpen={authState.open} onClose={handleClose} trapFocus isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            <Avatar
              bg="purple.500"
              fontSize={"3rem"}
              icon={<UnlockIcon fontSize="2rem" />}
            />

            <Text fontSize="1.2rem" fontWeight={"semibold"}>
              Login
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
            flexDirection="column"
          >
            <Flex
              flexDirection={"column"}
              alignItems="center"
              justifyContent={"center"}
              // border="1px solid red"
              width={"70%"}
              pb={6}
            >
              <OAuthButton />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModel;
