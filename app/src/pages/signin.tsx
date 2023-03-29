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
import signin from "../public/imgs/signin.jpg";

import { setCookie } from "nookies";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { apiRequest } from "../services/api";
import { notifyPromisse } from "../utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInput } from "../interfaces/frontend/interfaces";
import { loginClientSchema } from "../schemas/frontend/client";

const SignIn = () => {
  const { push } = useRouter();

  const clientLogin = async (data: LoginInput) => {
    try {
      await notifyPromisse(
        async () => {
          const response = await apiRequest.post("/signin", data);

          setCookie(null, "_clientToken", response.data.token, {
            path: "/",
          });
        },
        "Validando dados.",
        "Entrando.",
        "Senha ou e-mail incorretos."
      );

      push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginClientSchema),
  });

  return (
    <Box>
      <Box
        w="100%"
        h="100vh"
        display="flex"
        justifyContent="center"
        background="#FFFFFF"
        paddingY={["20px", "0px"]}
      >
        <Box
          margin="auto"
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
            Fazer Login
          </Heading>

          <Img
            w="150px"
            h="150px"
            objectFit="cover"
            borderRadius="50%"
            marginBottom={["20px", "25px"]}
            src={signin.src}
          />

          <Text color="#66666698" fontWeight="400" fontSize={["16px", "17px"]}>
            Crie uma lista de contatos.
          </Text>

          <FormControl
            as="form"
            display="flex"
            flexDir="column"
            gap="20px"
            padding="30px"
            alignSelf="center"
            isInvalid={!!errors.email || !!errors.password}
          >
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
                onClick={handleSubmit(clientLogin)}
              >
                Entrar
              </Button>

              <Link
                fontWeight="500"
                fontSize={["13px", "14px"]}
                href="/signup"
                color="#5865F2"
              >
                Criar conta
              </Link>
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
