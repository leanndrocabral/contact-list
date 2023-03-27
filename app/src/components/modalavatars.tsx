import {
  Box,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Heading,
  Img,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../contexts/authcontext";

const ModalImages = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setAvatar, avatar } = useContext(AuthContext);

  return (
    <Box cursor="pointer">
      <Img
        w="130px"
        h="130px"
        objectFit="cover"
        borderRadius="50%"
        marginBottom={["20px", "25px"]}
        src={avatar}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent borderRadius="8px" w={["95%", "95%", "423px"]}>
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            padding={["2.5px", "5px"]}
          >
            <Box w="90%" textAlign="center">
              <Heading
                as="h1"
                fontWeight="400"
                fontSize={["26px", "28px"]}
                paddingTop={["52px", "60px"]}
                paddingBottom={["20px", "30px"]}
              >
                Escolha um avatar
              </Heading>

              <Text
                color="#66666698"
                fontWeight="400"
                fontSize={["16px", "17px"]}
              >
                Escolha um avatar para o seu contato.
              </Text>

              <UnorderedList
                padding={["20px", "25px"]}
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                gap="12px"
                margin="0px"
                css={{
                  li: { listStyle: "none " },
                }}
              >
                <ListItem onClick={onClose}>
                  <Img
                    minW="80px"
                    h="80px"
                    borderRadius="50%"
                    src="https://img.freepik.com/free-psd/3d-illustration-person-with-glasses-half-shaved-head_23-2149436187.jpg?t=st=1679854579~exp=1679855179~hmac=14be8e9c6daf563365c8cff4beff5e61c191f1a6ef63af60ac4b0d10a9c87d5a"
                    onClick={(event) => setAvatar(event.currentTarget.src)}
                  />
                </ListItem>

                <ListItem onClick={onClose}>
                  <Img
                    minW="80px"
                    h="80px"
                    borderRadius="50%"
                    src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses-green-hair_23-2149436201.jpg"
                    onClick={(event) => setAvatar(event.currentTarget.src)}
                  />
                </ListItem>

                <ListItem onClick={onClose}>
                  <Img
                    minW="80px"
                    h="80px"
                    borderRadius="50%"
                    src="https://img.freepik.com/premium-psd/3d-illustration-business-man-with-glasses_23-2149436193.jpg"
                    onClick={(event) => setAvatar(event.currentTarget.src)}
                  />
                </ListItem>

                <ListItem onClick={onClose}>
                  <Img
                    minW="80px"
                    h="80px"
                    borderRadius="50%"
                    src="https://img.freepik.com/free-psd/3d-illustration-person-with-pink-hair_23-2149436186.jpg"
                    onClick={(event) => setAvatar(event.currentTarget.src)}
                  />
                </ListItem>

                <ListItem onClick={onClose}>
                  <Img
                    minW="80px"
                    h="80px"
                    borderRadius="50%"
                    src="https://img.freepik.com/free-psd/3d-illustration-person_23-2149436179.jpg?t=st=1679854469~exp=1679855069~hmac=696698ef412ae8f7f6b8c6fa3a94cb060b296e6ff45126282615a46a69f24ad6"
                    onClick={(event) => setAvatar(event.currentTarget.src)}
                  />
                </ListItem>

                <ListItem onClick={onClose}>
                  <Img
                    minW="80px"
                    h="80px"
                    borderRadius="50%"
                    src="https://img.freepik.com/premium-psd/3d-illustration-person-with-glasses-bow_23-2149436205.jpg"
                    onClick={(event) => setAvatar(event.currentTarget.src)}
                  />
                </ListItem>
              </UnorderedList>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalImages;
