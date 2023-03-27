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
} from "@chakra-ui/react";
import { useContext } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputMask from "react-input-mask";
import { AuthContext } from "../contexts/authcontext";

import ModalImages from "./modalavatars";
import { Contacts, UpdateContactInput } from "../interfaces/interfaces";
import { updateContactSchema } from "../schemas/contact";

const ListContact = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { contacts, getContact, contact, updateContact } = useContext(AuthContext);

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
        {contacts.map((contact: Contacts, index: number) => (
          <ListItem
            key={contact.id}
            display="flex"
            cursor="pointer"
            background={index % 2 === 0 ? "#FFFFFF" : "#E8E8E8"}
            padding="10px"
            alignItems="center"
            borderRadius={["4px", "6px"]}
            onClick={() => {
              getContact(contact.id, onOpen);
            }}
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

            <Box w="100%" h="50px" marginLeft="20px">
              <Text fontSize={["15px", "16px"]}>{contact.fullName}</Text>
              <Text fontSize={["12px", "13px"]} color="#858282">
                {contact.telephone}
              </Text>
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

export default ListContact;
