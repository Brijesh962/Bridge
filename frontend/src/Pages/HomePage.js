import {
  Container,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Image,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";
import myImage from "../assets/images/logo2.png";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const HomePage = () => {

const history = useHistory();

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  
  if (user) history.push("/chats");
}, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={1}
        bg={"white"}
        w="100%"
        m="30px 0 5px 0"
        borderWidth="1px"
        textAlign="center"
        borderTopStartRadius="25px"
        borderTopEndRadius="25px"
      >
        <Image
          src={myImage}
          alt="BridgeLogo"
          objectFit="cover"
          style={{
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        />
      </Box>
      <Box
        bg="white"
        w="100%"
        p={4}
        borderBottomEndRadius="30px"
        borderBottomStartRadius="30px"
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Create an Account</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};
export default HomePage;