import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Link,
  Text,
  Img,
  FormErrorMessage,
} from "@chakra-ui/react";
import InputMask from "react-input-mask";
import imageLogin from "../public/imgs/signup.jpg";

import { useRouter } from "next/router";
import { excludeKeys } from "filter-obj";
import { useForm } from "react-hook-form";
import { apiRequest } from "../services/api";
import { notifyError } from "../utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientSchema } from "../schemas/frontend/client";
import { CreateClientInput } from "../interfaces/frontend/interfaces";

const SignUp = () => {
  const { push } = useRouter();

  const createClient = async (payload: CreateClientInput) => {
    try {
      const fullName = payload.firstName + " " + payload.lastName;
      Object.assign(payload, { fullName: fullName });

      const client = excludeKeys(payload, ["firstName", "lastName"]);
      await apiRequest.post("/clients", client);

      push("/signin");
    } catch (error) {
      const errors = error.response.data;

      if (errors.message.includes("email")) {
        notifyError("Este e-mail já está em uso.");
      }
      notifyError("Este telefone já está em uso.");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClientInput>({
    resolver: zodResolver(createClientSchema),
  });

  return (
    <Box>
      <Box
        w="100%"
        h="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        background="#FFFFFF"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          w={["90%", "90%", "413px"]}
          borderRadius="8px"
          textAlign="center"
          border="1px solid #66666659"
        >
          <Heading
            as="h1"
            fontWeight="400"
            fontSize={["26px", "28px"]}
            paddingTop={["52px", "60px"]}
            paddingBottom={["25px", "30px"]}
          >
            Criar sua conta
          </Heading>

          <Img
            w="150px"
            h="150px"
            objectFit="fill"
            borderRadius="50%"
            marginBottom={["20px", "25px"]}
            src={imageLogin.src}
          />

          <Text color="#66666698" fontWeight="400" fontSize={["16px", "17px"]}>
            Crie uma conta e aproveite.
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
              !!errors.password ||
              !!errors.telephone
            }
          >
            <Box display="flex" gap="10px">
              <Box>
                <Input
                  id="firstName"
                  type="text"
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
                  id="lastName"
                  type="text"
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
                id="email"
                type="email"
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
                as={InputMask}
                mask="+55 (**) *****-****"
                id="telephone"
                type="text"
                placeholder="Telefone"
                borderRadius={["4px", "6px"]}
                h={["52px", "48px"]}
                {...register("telephone")}
              />
              <FormErrorMessage>
                {errors.telephone && errors.telephone?.message}
              </FormErrorMessage>
            </Box>

            <Box>
              <Input
                id="password"
                type="password"
                placeholder="Senha"
                autoComplete="off"
                borderRadius={["4px", "6px"]}
                h={["52px", "48px"]}
                {...register("password")}
              />
              <FormErrorMessage>
                {errors.password && errors.password?.message}
              </FormErrorMessage>
            </Box>

            <Box
              paddingTop="38px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                fontWeight="500"
                fontSize={["13px", "14px"]}
                h="40px"
                color="#FFFFFF"
                backgroundColor="#5865F2"
                onClick={handleSubmit(createClient)}
              >
                Criar
              </Button>

              <Link
                fontWeight="500"
                fontSize={["13px", "14px"]}
                href="/signin"
                color="#5865F2"
              >
                Entrar
              </Link>
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
