import {
  Box,
  UnorderedList,
  ListItem,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Heading,
  Img,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import InputMask from "react-input-mask";
import editContact from "../public/imgs/edit-contact.jpg";

export default function ListContacts() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      w="90%"
      paddingTop="40px"
      paddingRight="5px"
      overflowY="auto"
      css={{
        "&::-webkit-scrollbar": {
          width: ["4px"],
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#66666659",
          borderRadius: "24px",
        },
      }}
    >
      <UnorderedList margin="0px">
        <ListItem
          onClick={onOpen}
          display="flex"
          cursor="pointer"
          background="#ffffff"
          h="90px"
          alignItems="center"
          borderRadius={["4px", "6px"]}
        >
          <Text
            minW="50px"
            h="50px"
            textAlign="center"
            paddingTop="15px"
            borderRadius="50%"
            fontSize="15px"
            color="#FFFFFF"
            background="#EB459E"
            marginLeft="10px"
          >
            MG
          </Text>
          <Box w="100%" h="50px" marginLeft="20px">
            <Text fontSize={["15px", "16px"]}>Matheus Gay</Text>
            <Text fontSize={["12px", "13px"]} color="#858282">
              +55 (12) 93618-1507
            </Text>
          </Box>
        </ListItem>

        <ListItem
          onClick={onOpen}
          display="flex"
          cursor="pointer"
          background="#e8e9eb"
          h="90px"
          alignItems="center"
          borderRadius={["4px", "6px"]}
        >
          <Text
            minW="50px"
            h="50px"
            textAlign="center"
            paddingTop="15px"
            borderRadius="50%"
            fontSize="15px"
            color="#FFFFFF"
            background="#ED4245"
            marginLeft="10px"
          >
            MG
          </Text>
          <Box w="100%" h="50px" marginLeft="20px">
            <Text fontSize={["15px", "16px"]}>Matheus Gay</Text>
            <Text fontSize={["12px", "13px"]} color="#858282">
              +55 (12) 93618-1507
            </Text>
          </Box>
        </ListItem>

        <ListItem
          onClick={onOpen}
          display="flex"
          cursor="pointer"
          background="#ffffff"
          h="90px"
          alignItems="center"
          borderRadius={["4px", "6px"]}
        >
          <Text
            minW="50px"
            h="50px"
            textAlign="center"
            paddingTop="15px"
            borderRadius="50%"
            fontSize="15px"
            color="#FFFFFF"
            background="#57F287"
            marginLeft="10px"
          >
            MG
          </Text>
          <Box w="100%" h="50px" marginLeft="20px">
            <Text fontSize={["15px", "16px"]}>Matheus Gay</Text>
            <Text fontSize={["12px", "13px"]} color="#858282">
              +55 (12) 93618-1507
            </Text>
          </Box>
        </ListItem>
      </UnorderedList>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="8px" w={["95%", "95%", "553px"]}>
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            padding={["2.5px", "5px"]}
          >
            <Heading
              as="h1"
              fontWeight="400"
              fontSize={["26px", "28px"]}
              paddingTop={["52px", "60px"]}
              paddingBottom={["20px", "30px"]}
            >
              Editar Contato
            </Heading>

            <Img
              w="130px"
              h="130px"
              objectFit="cover"
              borderRadius="50%"
              marginBottom={["20px", "25px"]}
              src={editContact.src}
            />

            <Text
              color="#66666698"
              fontWeight="400"
              fontSize={["16px", "17px"]}
            >
              Edite um contato da sua lista.
            </Text>

            <FormControl
              display="flex"
              flexDir="column"
              gap="20px"
              padding="30px"
              alignSelf="center"
            >
              <Box display="flex" gap="10px">
                <Input
                  placeholder="Nome"
                  borderRadius={["4px", "6px"]}
                  h={["52px", "48px"]}
                ></Input>

                <Input
                  placeholder="Sobrenome"
                  borderRadius={["4px", "6px"]}
                  h={["52px", "48px"]}
                ></Input>
              </Box>
              <Input
                placeholder="E-mail"
                borderRadius={["4px", "6px"]}
                h={["52px", "48px"]}
              ></Input>

              <Input
                mask="+55 (**) *****-****"
                as={InputMask}
                placeholder="Telefone"
                borderRadius={["4px", "6px"]}
                h={["52px", "48px"]}
              ></Input>

              <Box
                paddingTop="38px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  w="100%"
                  fontWeight="500"
                  fontSize={["14px", "15px"]}
                  h="42px"
                  color="#FFFFFF"
                  backgroundColor="#5865F2"
                >
                  Criar
                </Button>
              </Box>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
