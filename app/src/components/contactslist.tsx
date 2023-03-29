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
  ModalCloseButton,
  FormErrorMessage,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import ModalImages from "./avatarmodal";
import InputMask from "react-input-mask";

import {
  ContactListProps,
  Contact,
  UpdateContactInput,
} from "../interfaces/frontend/interfaces";

import { parseCookies } from "nookies";
import { Client } from "@prisma/client";
import { excludeKeys } from "filter-obj";
import { useForm } from "react-hook-form";
import { apiRequest } from "../services/api";
import { useContext, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../contexts/authcontext";
import { notifySuccess, notifyError } from "../utils/toast";
import { updateContactSchema } from "../schemas/frontend/contact";

const ContactsList = ({ values }: ContactListProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { setAvatar, avatar, setContactsList, contactsList } =
    useContext(AuthContext);
  const [contact, setContact] = useState<Client | null>(null);

  const cookies = parseCookies();
  const token = cookies._clientToken;

  const getContact = async (id: string) => {
    apiRequest.defaults.headers.authorization = `Bearer ${token}`;
    const response = await apiRequest.get(`/contacts/${id}`);

    setContact(response.data);
    setAvatar(response.data.avatar);

    onOpen();
  };

  const updateContact = async (payload: UpdateContactInput) => {
    try {
      apiRequest.defaults.headers.authorization = `Bearer ${token}`;

      const fullName = payload.firstName + " " + payload.lastName;
      Object.assign(payload, { fullName: fullName, avatar });

      const contactWithFullName = excludeKeys(payload, [
        "firstName",
        "lastName",
      ]);

      const response = await apiRequest.patch(
        `/contacts/${contact!.id}`,
        contactWithFullName
      );

      notifySuccess("Contato editado.");

      const index = contactsList.findIndex(
        (element) => element.id === contact!.id
      );
      contactsList.splice(index, 1, response.data);
      setContactsList(contactsList);

      onClose();
    } catch {
      notifyError("Algo deu errado ao atualizar o contato.");
    }
  };

  const deleteContact = async (id: string) => {
    try {
      apiRequest.defaults.headers.authorization = `Bearer ${token}`;

      await apiRequest.delete(`/contacts/${id}`);
      notifySuccess("Contato excluido.");

      const index = contactsList.findIndex((element) => element.id === id);
      const contactsListCopy = contactsList.slice();
      contactsListCopy.splice(index, 1);

      setContactsList(contactsListCopy);
    } catch {
      notifyError("Algo deu errado ao excluir o contato.");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateContactInput>({
    resolver: zodResolver(updateContactSchema),
    values: {
      firstName: contact?.fullName.split(" ")[0] as string,
      lastName: contact?.fullName.split(" ")[1] as string,
      email: contact?.email as string,
      telephone: contact?.telephone as string,
    },
  });

  return (
    <Box
      w="90%"
      paddingTop="40px"
      paddingRight="5px"
      overflowY="auto"
      css={{
        "&::-webkit-scrollbar": { width: "4px" },
        "&::-webkit-scrollbar-thumb": {
          background: "#C2C2C2",
          borderRadius: "24px",
        },
      }}
    >
      <UnorderedList margin="0px">
        {values.map((contact: Contact, index: number) => (
          <ListItem
            key={contact.id}
            display="flex"
            cursor="pointer"
            background={index % 2 === 0 ? "#FFFFFF" : "#E8E8E8"}
            padding="10px"
            alignItems="center"
            borderRadius={["4px", "6px"]}
          >
            <Img
              minW="70px"
              h="70px"
              textAlign="center"
              borderRadius="50%"
              fontSize="15px"
              marginLeft="10px"
              objectFit="cover"
              src={contact.avatar}
            />

            <Box
              w="100%"
              h="50px"
              marginLeft="20px"
              display="flex"
              justifyContent="space-between"
            >
              <Box>
                <Text fontSize={["15px", "16px"]}>{contact.fullName}</Text>
                <Text fontSize={["12px", "13px"]} color="#858282">
                  {contact.telephone}
                </Text>
              </Box>

              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      isActive={isOpen}
                      as={Button}
                      w={["10px", "12px"]}
                      background="none"
                      _hover={{ bg: "none" }}
                      _active={{ bg: "none" }}
                    >
                      <BsThreeDotsVertical />
                    </MenuButton>

                    <MenuList>
                      <MenuItem
                        fontSize={["14px", "16px"]}
                        onClick={() => {
                          getContact(contact.id);
                        }}
                      >
                        Editar
                      </MenuItem>
                      <MenuItem
                        fontSize={["14px", "16px"]}
                        onClick={() => deleteContact(contact.id)}
                      >
                        Excluir
                      </MenuItem>
                    </MenuList>
                  </>
                )}
              </Menu>
            </Box>
          </ListItem>
        ))}
      </UnorderedList>

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
              Editar Contato
            </Heading>

            <ModalImages />

            <Text
              color="#66666698"
              fontWeight="400"
              fontSize={["16px", "17px"]}
            >
              Edite um contato da sua lista.
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
                    defaultValue={contact?.fullName.split(" ")[1]}
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
                  onClick={handleSubmit(updateContact)}
                >
                  Editar
                </Button>
              </Box>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ContactsList;
