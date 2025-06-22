import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [show, setshow] = useState(false);
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleClick = () => setshow(!show);
  const handleSubmit = async () => {
    setloading(true);
    if (!email || !password) {
      toast({
        title: "Please fill all fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      
      localStorage.setItem("userInfo", JSON.stringify(data));
      
      setloading(false);
      history.push("/chats");
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error in Login",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Email: </FormLabel>
        <Input
          type={"email"}
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password: </FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <InputRightElement>
            <Button size="sm" onClick={handleClick}>
              {show ? (
                <i class="fa-sharp fa-solid fa-eye-slash fa-xl"></i>
              ) : (
                <i class="fa-solid fa-eye fa-xl"></i>
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        bg="black"
        color="white"
        _hover={{
          background: "#2A41E5",
          color: "white",
        }}
        p={3}
        width="45%"
        borderRadius="16px"
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
        isLoading={loading}
        size="wrap-content"
      >
        SignIn
      </Button>
    </VStack>
  );
};

export default Login;