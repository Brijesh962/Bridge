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
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";


const SignUp = () => {
  const [show, setshow] = useState(false);
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirmpassword, setconfirmpassword] = useState();
  const [pic, setpic] = useState();
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleClick = () => setshow(!show);
  const postPic = (pics) => {
    setloading(true);
    if (pics === undefined) {
      toast({
        title: "Please upload Profile picture",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Bridge");
      data.append("cloud_name", "dekj4hb5c");
      fetch("https://api.cloudinary.com/v1_1/dekj4hb5c/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setpic(data.url.toString());
          setloading(false);
        })
        .catch((err) => {
          setloading(false);
        });
    } else {
      toast({
        title: "Please upload Profile picture",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
      return;
    }
  }
  const handleSubmit = async () => {
    setloading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please fill all fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      setloading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Password does not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("/api/user", { name, email, password, pic }, config);
      toast({
        title: "Account Sucessfully Created",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      
      setloading(false);
      history.push('/chats')
    } catch (error) {
      toast({
        title: "Error in SignUp",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
    }
  }

    return (
      <VStack spacing="5px">
        <small>
          [Fill all the fields wisely you want be able to change it once you
          signup]
        </small>
        <FormControl id="name" isRequired>
          <FormLabel>Name: </FormLabel>
          <Input
            placeholder="Enter Your Name"
            onChange={(e) => setname(e.target.value)}
          />
        </FormControl>

        <FormControl id="email" isRequired>
          <FormLabel>Email: </FormLabel>
          <Input
            type={"email"}
            placeholder="Enter Your Email"
            onChange={(e) => setemail(e.target.value)}
          />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password: </FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter Your Password"
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

        <FormControl id="cpassword" isRequired>
          <FormLabel>Confirm Password: </FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) => setconfirmpassword(e.target.value)}
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

        <FormControl id="pic" isRequired>
          <FormLabel>Upload Your Profile Picture: </FormLabel>
          <Input
            type={"file"}
            p={1}
            pl={3}
            accept="image/jpg,image/jpeg,image/png"
            onChange={(e) => postPic(e.target.files[0])}
            bg="blackAlpha.800"
            color="white"
            borderRadius="10"
          />
        </FormControl>

        <Button
          bg="black"
          color="white"
          _hover={{
            background: "#2A41E5",
            color: "white",
          }}
          width="45%"
          borderRadius="16px"
          style={{ marginTop: 15 }}
          onClick={handleSubmit}
          isLoading={loading}
        >
          SignUp
        </Button>
      </VStack>
    );
  };

export default SignUp;