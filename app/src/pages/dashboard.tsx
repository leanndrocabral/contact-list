import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import InputMask from "react-input-mask";
import ModalAvatars from "../components/avatarmodal";
import ContactsList from "../components/contactslist";

import { decode } from "jsonwebtoken";
import { useRouter } from "next/router";
import { excludeKeys } from "filter-obj";
import { useForm } from "react-hook-form";
import { apiRequest } from "../services/api";
import { GetServerSideProps } from "next/types";
import { notifyPromisse } from "../utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { destroyCookie, parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import { ContactContext } from "../contexts/contactcontext";
import { createContactSchema } from "../schemas/frontend/contact";
import { CreateContactInput } from "../interfaces/frontend/interfaces";
import { Contact, DashboardProps } from "../interfaces/frontend/interfaces";

const Dashboard = ({ client, contacts }: DashboardProps) => {
  const { push } = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { defaultAvatar, setAvatar, avatar, contactsList, setContactsList } =
    useContext(ContactContext);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

  useEffect(() => {
    setContactsList(contacts);
  }, [setContactsList, contacts]);

  const createContact = async (payload: CreateContactInput) => {
    try {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        telephone: "",
      });

      const cookies = parseCookies();
      const token = cookies._clientToken;

      apiRequest.defaults.headers.authorization = `Bearer ${token}`;

      const fullName = payload.firstName + " " + payload.lastName;
      Object.assign(payload, { fullName: fullName, avatar });

      const contact = excludeKeys(payload, ["firstName", "lastName"]);

      await notifyPromisse(
        async () => {
          const response = await apiRequest.post("/contacts", contact);

          const listContacts = [...contactsList, response.data];

          const orderedList = listContacts.sort((a, b) => {
            if (a.fullName < b.fullName) {
              return -1;
            }
            if (a.fullName > b.fullName) {
              return 1;
            }
            return 0;
          });
          setContactsList(orderedList);
        },
        "Validando dados.",
        "Contato criado.",
        "Algo deu errado ao criar o contato."
      );

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const logoutClient = () => {
    destroyCookie(null, "_clientToken");
    push("/signin");
  };

  const filterContacts = (value: string) => {
    const inputValue: string = value.toLowerCase().trim();

    setFilteredContacts(
      contactsList.filter((contact: Contact) =>
        contact.fullName.toLowerCase().trim().startsWith(inputValue)
      )
    );
  };

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateContactInput>({
    resolver: zodResolver(createContactSchema),
  });

  return (
    <Box>
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
                onClick={logoutClient}
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
                  {client.fullName}
                </Heading>
                <Box>
                  <Text fontSize="13px" color="#666666">
                    {client.telephone}
                  </Text>
                </Box>
              </Box>
            </Box>

            <Input
              onChange={(event) => filterContacts(event.target.value)}
              placeholder="Procurar contatos"
              marginTop="20px"
              borderRadius={["4px", "6px"]}
              h={["52px", "48px"]}
            />
          </Box>
          <Box
            w="90%"
            borderBottom="1px solid #66666659"
            marginTop="20px"
          ></Box>

          <ContactsList
            values={
              filteredContacts.length > 0 ? filteredContacts : contactsList
            }
          />

          <Button
            w="90%"
            minH="46px"
            fontWeight="400"
            onClick={() => {
              onOpen(), setAvatar(defaultAvatar);
            }}
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
              <ModalCloseButton borderRadius="8px" border="1px solid #000000" />
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

                <ModalAvatars />

                <Text
                  color="#66666698"
                  fontWeight="400"
                  fontSize={["16px", "17px"]}
                >
                  Adicione um novo contato a sua lista.
                </Text>

                <FormControl
                  as="form"
                  display="flex"
                  flexDir="column"
                  gap="20px"
                  padding="30px"
                  alignSelf="center"
                  isInvalid={
                    !!errors.firstName ||
                    !!errors.lastName ||
                    !!errors.email ||
                    !!errors.telephone
                  }
                >
                  <Box display="flex" gap="10px">
                    <Box>
                      <Input
                        placeholder="Nome"
                        borderRadius={["4px", "6px"]}
                        h={["52px", "48px"]}
                        {...register("firstName")}
                      />
                      <FormErrorMessage>
                        {errors.firstName && errors.firstName?.message}
                      </FormErrorMessage>
                    </Box>

                    <Box>
                      <Input
                        placeholder="Sobrenome"
                        borderRadius={["4px", "6px"]}
                        h={["52px", "48px"]}
                        {...register("lastName")}
                      />
                      <FormErrorMessage>
                        {errors.lastName && errors.lastName?.message}
                      </FormErrorMessage>
                    </Box>
                  </Box>
                  <Box>
                    <Input
                      placeholder="E-mail"
                      borderRadius={["4px", "6px"]}
                      h={["52px", "48px"]}
                      {...register("email")}
                    />
                    <FormErrorMessage>
                      {errors.email && errors.email?.message}
                    </FormErrorMessage>
                  </Box>

                  <Box>
                    <Input
                      mask="+55 (**) *****-****"
                      as={InputMask}
                      placeholder="Telefone"
                      borderRadius={["4px", "6px"]}
                      h={["52px", "48px"]}
                      {...register("telephone")}
                    />
                    <FormErrorMessage>
                      {errors.telephone && errors.telephone?.message}
                    </FormErrorMessage>
                  </Box>

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
                      onClick={handleSubmit(createContact)}
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
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const token = cookies._clientToken;

  const decoded = decode(token);
  apiRequest.defaults.headers.authorization = `Bearer ${token}`;

  const client = await apiRequest.get(`/clients/${decoded?.sub}`);
  const contacts = await apiRequest.get("/contacts");

  return {
    props: {
      client: client.data,
      contacts: contacts.data,
    },
  };
};

export default Dashboard;
