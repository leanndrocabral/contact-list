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
import { ContactContext } from "../contexts/contactcontext";

const ModalImages = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setAvatar, avatar } = useContext(ContactContext);

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
                <ListItem onClick={onClose} cursor="pointer">
                  <Img
                    minW="80px"
                    h="80px"
                    borderRadius="50%"
                    src="https://img.freepik.com/free-psd/3d-illustration-business-man-with-glasses_23-2149436194.jpg?size=626&ext=jpg&ga=GA1.1.50583708.1679764524"
                    onClick={(event) => setAvatar(event.currentTarget.src)}
                  />
                </ListItem>

                <ListItem onClick={onClose} cursor="pointer">
                  <Img
                    minW="80px"
                    h="80px"
                    borderRadius="50%"
                    src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.1.50583708.1679764524"
                    onClick={(event) => setAvatar(event.currentTarget.src)}
                  />
                </ListItem>

                <ListItem onClick={onClose} cursor="pointer">
                  <Img
                    minW="80px"
                    h="80px"
                    borderRadius="50%"
                    src="https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436189.jpg?size=626&ext=jpg&ga=GA1.1.50583708.1679764524"
                    onClick={(event) => setAvatar(event.currentTarget.src)}
                  />
                </ListItem>

                <ListItem onClick={onClose} cursor="pointer">
                  <Img
                    minW="80px"
                    h="80px"
                    borderRadius="50%"
                    src="https://img.freepik.com/free-psd/3d-illustration-person-with-pink-hair_23-2149436186.jpg?size=626&ext=jpg&ga=GA1.1.50583708.1679764524"
                    onClick={(event) => setAvatar(event.currentTarget.src)}
                  />
                </ListItem>

                <ListItem onClick={onClose} cursor="pointer">
                  <Img
                    minW="80px"
                    h="80px"
                    borderRadius="50%"
                    src="https://img.freepik.com/free-psd/3d-illustration-person_23-2149436179.jpg?size=626&ext=jpg&ga=GA1.1.50583708.1679764524"
                    onClick={(event) => setAvatar(event.currentTarget.src)}
                  />
                </ListItem>

                <ListItem onClick={onClose} cursor="pointer">
                  <Img
                    minW="80px"
                    h="80px"
                    borderRadius="50%"
                    src="https://img.freepik.com/free-psd/3d-illustration-person-with-glasses-half-shaved-head_23-2149436187.jpg?size=626&ext=jpg&ga=GA1.1.50583708.1679764524"
                    onClick={(event) => setAvatar(event.currentTarget.src)}
                  />
                </ListItem>

                <ListItem onClick={onClose} cursor="pointer">
                  <Img
                    minW="80px"
                    h="80px"
                    borderRadius="50%"
                    src="https://img.freepik.com/free-psd/3d-illustration-person-tank-top_23-2149436202.jpg?size=626&ext=jpg&ga=GA1.1.50583708.1679764524"
                    onClick={(event) => setAvatar(event.currentTarget.src)}
                  />
                </ListItem>

                <ListItem onClick={onClose} cursor="pointer">
                  <Img
                    minW="80px"
                    h="80px"
                    borderRadius="50%"
                    src="https://img.freepik.com/premium-psd/3d-illustration-person-with-purple-hair-glasses_23-2149436204.jpg?size=626&ext=jpg&ga=GA1.1.50583708.1679764524"
                    onClick={(event) => setAvatar(event.currentTarget.src)}
                  />
                </ListItem>

                <ListItem onClick={onClose} cursor="pointer">
                  <Img
                    minW="80px"
                    h="80px"
                    borderRadius="50%"
                    src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses-green-hair_23-2149436201.jpg?size=626&ext=jpg&ga=GA1.1.50583708.1679764524"
                    onClick={(event) => setAvatar(event.currentTarget.src)}
                  />
                </ListItem>

                <ListItem onClick={onClose} cursor="pointer">
                  <Img
                    minW="80px"
                    h="80px"
                    borderRadius="50%"
                    src="https://img.freepik.com/premium-psd/3d-illustration-person-with-glasses-bow_23-2149436205.jpg?size=626&ext=jpg&ga=GA1.1.50583708.1679764524"
                    onClick={(event) => setAvatar(event.currentTarget.src)}
                  />
                </ListItem>

                <ListItem onClick={onClose} cursor="pointer">
                  <Img
                    minW="80px"
                    h="80px"
                    borderRadius="50%"
                    src="https://img.freepik.com/free-psd/3d-illustration-person-with-punk-hair-jacket_23-2149436198.jpg?size=626&ext=jpg&ga=GA1.1.50583708.1679764524"
                    onClick={(event) => setAvatar(event.currentTarget.src)}
                  />
                </ListItem>

                <ListItem onClick={onClose} cursor="pointer">
                  <Img
                    minW="80px"
                    h="80px"
                    borderRadius="50%"
                    src="https://img.freepik.com/free-psd/3d-illustration-person_23-2149436192.jpg?size=626&ext=jpg&ga=GA1.1.50583708.1679764524"
                    onClick={(event) => setAvatar(event.currentTarget.src)}
                  />
                </ListItem>

                <ListItem onClick={onClose} cursor="pointer">
                  <Img
                    minW="80px"
                    h="80px"
                    borderRadius="50%"
                    src="https://img.freepik.com/free-psd/3d-illustration-bald-person-with-glasses_23-2149436184.jpg?size=626&ext=jpg&ga=GA1.1.50583708.1679764524"
                    onClick={(event) => setAvatar(event.currentTarget.src)}
                  />
                </ListItem>

                <ListItem onClick={onClose} cursor="pointer">
                  <Img
                    minW="80px"
                    h="80px"
                    borderRadius="50%"
                    src="https://img.freepik.com/free-psd/3d-illustration-bald-person_23-2149436183.jpg?size=626&ext=jpg&ga=GA1.1.50583708.1679764524"
                    onClick={(event) => setAvatar(event.currentTarget.src)}
                  />
                </ListItem>

                <ListItem onClick={onClose} cursor="pointer">
                  <Img
                    minW="80px"
                    h="80px"
                    borderRadius="50%"
                    src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436178.jpg?size=626&ext=jpg&ga=GA1.1.50583708.1679764524"
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
