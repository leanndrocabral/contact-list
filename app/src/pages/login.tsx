import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Img,
  Input,
} from "@chakra-ui/react";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: "500", subsets: ["latin"] });

export default function Home() {
  return (
    <Box  className={poppins.className}>
      <Img
        src="https://images.pexels.com/photos/12198530/pexels-photo-12198530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        w="100%"
        h="100vh"
        objectFit="cover"
        position="fixed"
        zIndex="-1"
      />

      <Box
        w="100%"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          display="flex"
          flexDirection="column"
          background="#FFFFFF"
          w={["90%", "90%", "593px"]}
          borderRadius={24}
        >
          <Heading
            as="h1"
            fontWeight="500"
            fontSize={["28px", "32px"]}
            paddingTop={["72px", "80px"]}
            paddingLeft={["20px", "40px"]}
          >
            Login
          </Heading>

          <FormControl
            padding={["20px", "40px"]}
            alignSelf="center"
            paddingTop={["28px", "32px"]}
          >
            <FormLabel color="#666666">Email</FormLabel>
            <Input
              type="email"
              border="1px solid #66666659"
              height={["46px", "56px"]}
              borderRadius={["8px", "12px"]}
            />
            <FormErrorMessage>Email is required.</FormErrorMessage>

            <FormLabel color="#666666" paddingTop={["28px", "32px"]}>
              Senha
            </FormLabel>
            <Input
             boxShadow="none"
              type="email"
              border="1px solid #66666659"
              height={["46px", "56px"]}
              borderRadius={["10px", "12px"]}
            />
            <FormErrorMessage>Password is required.</FormErrorMessage>

            <Button
              width="100%"
              height={["46px", "56px"]}
              borderRadius={["28px", "32px"]}
              marginTop={["50px", "70px"]}
              color="#FFFFFF"
              backgroundColor="#000000"
            >
              Entrar
            </Button>

            <Button
              width="100%"
              height={["46px", "56px"]}
              borderRadius={["28px", "32px"]}
              marginTop={["20px", "30px"]}
              marginBottom={["30px", "30px"]}
              color="#FFFFFF"
              backgroundColor="#5865F2"
            >
              Registrar-se
            </Button>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
