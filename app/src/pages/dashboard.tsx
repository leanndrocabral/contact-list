import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  Img,
} from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import InputMask from "react-input-mask";
import createContact from "../public/imgs/create-contact.jpg";
import List from "../components/listcontacts";

const inter = Inter({ subsets: ["latin"] });

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { push } = useRouter();

  function createClient() {
    localStorage.removeItem("clientToken");
    push("/signin");
  }

  return (
    <Box className={inter.className}>
      <Box w="100%" h="100vh" display="flex" justifyContent="center">
        <Box
          w={["100%", "100%", "553px"]}
          display="flex"
          flexDir="column"
          alignItems="center"
          marginTop="20px"
          marginBottom="20px"
          background="#FFFFFF"
        >
          <Box w="90%" paddingTop="30px">
            <Box
              display="flex"
              flexDir="row-reverse"
              alignItems="center"
              justifyContent="space-between"
            >
              <Button
                w={["64px", "66px"]}
                h={["44px", "42px"]}
                fontWeight="500"
                fontSize="14px"
                justifySelf="flex-end"
                background="#FFFFFFF"
                border="1px solid #000000"
                borderRadius={["6px", "8px"]}
                onClick={createClient}
              >
                Sair
              </Button>

              <Box>
                <Heading
                  as="h1"
                  fontWeight="500"
                  fontSize={["21px", "23px"]}
                  paddingBottom="5px"
                >
                  Leandro Lourenço
                </Heading>
                <Box>
                  <Text fontSize="13px" color="#666666">
                    +55 (12) 93618-1507
                  </Text>
                </Box>
              </Box>
            </Box>

            <Input
              placeholder="Procurar contatos"
              marginTop="20px"
              borderRadius={["4px", "6px"]}
              h={["52px", "48px"]}
            ></Input>
          </Box>
          <Box
            w="90%"
            borderBottom="1px solid #66666659"
            marginTop="20px"
          ></Box>

          <List />

          <Button
            w="90%"
            h="46px"
            fontWeight="400"
            onClick={onOpen}
            borderRadius={["8px", "10px"]}
            marginTop={["40px", "50px"]}
            marginBottom={["40px", "50px"]}
            color="#FFFFFF"
            backgroundColor="#5865F2"
          >
            Adicionar
          </Button>

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
                  Criar contato
                </Heading>

                <Img
                  w="130px"
                  h="130px"
                  objectFit="cover"
                  borderRadius="50%"
                  marginBottom={["20px", "25px"]}
                  src={createContact.src}
                />

                <Text
                  color="#66666698"
                  fontWeight="400"
                  fontSize={["16px", "17px"]}
                >
                  Adicione um novo contato a sua lista.
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
      </Box>
    </Box>
  );
}
