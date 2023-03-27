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
import { useContext } from "react";
import { Inter } from "next/font/google";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import signin from "../public/imgs/signin.jpg";
import { loginClientSchema } from "../schemas/client";
import { LoginInput } from "../interfaces/interfaces";
import { AuthContext } from "../contexts/authcontext";

const inter = Inter({ subsets: ["latin"] });

const SignIn = () => {
  const { clientLogin } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginClientSchema),
  });

  return (
    <Box className={inter.className}>
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
