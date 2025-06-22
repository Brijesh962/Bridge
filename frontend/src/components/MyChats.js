/* eslint-disable react-hooks/exhaustive-deps */
import { Button, useToast } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { getSender, getProfilePic, getLastMessageSenderName } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import axios from "axios";
import SideDrawer from "./miscellaneous/SideDrawer";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={1}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      mr="2px"
      borderRadius="lg"
      borderWidth="1px"
    >
      {user && <SideDrawer />}
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Ubuntu"
        display="flex"
        w="100%"
        mt={2}
        justifyContent="space-between"
        alignItems="center"
        color="black"
      >
        Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        fontFamily="Ubuntu"
        // onClick={() => setSelectedChat(chat)}
        cursor="pointer"
        _hover={{
          borderBottomColor: "#0e0e0e",
        }}
        color="black"
        borderColor="#f8f8f8"
        // borderBottomColor={selectedChat === chat ? "#2f57ff" : "#b8b8b8"}
        borderWidth="0px 0px 1.5px 0px"
        px={3}
        py={2}
        borderRadius="lg"
        // key={chat._id}
      >
        <Box>
          {/* {!chat.isGroupChat ? (
            <Avatar
              mr={2}
              size="sm"
              cursor="pointer"
              borderRadius="0.7rem"
              name={getProfilePic(loggedUser, chat.users)}
              src={getProfilePic(loggedUser, chat.users)}
            />
          ) : (
            <></>
          )} */}
        </Box>
        <Box>
          {/* <Text>
            {!chat.isGroupChat
              ? getSender(loggedUser, chat.users)
              : chat.chatName}
          </Text>
          {chat.latestMessage && (
            <Text fontSize="xs">
              <b>
                {getLastMessageSenderName(
                  chat.latestMessage.sender,
                  loggedUser
                )}{" "}
                :{" "}
              </b>
              {chat.latestMessage.content.length > 50
                ? chat.latestMessage.content.substring(0, 51) + "..."
                : chat.latestMessage.content}
            </Text>
          )} */}
        </Box>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#f8f8f8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                display="flex"
                fontFamily="Ubuntu"
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                _hover={{
                  borderBottomColor: "#0e0e0e",
                }}
                color="black"
                borderColor="#f8f8f8"
                borderBottomColor={
                  selectedChat === chat ? "#2f57ff" : "#b8b8b8"
                }
                borderWidth="0px 0px 1.5px 0px"
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Box>
                  {!chat.isGroupChat ? (
                    <Avatar
                      mr={2}
                      size="sm"
                      cursor="pointer"
                      borderRadius="0.7rem"
                      name={getProfilePic(loggedUser, chat.users)}
                      src={getProfilePic(loggedUser, chat.users)}
                    />
                  ) : (
                    <></>
                  )}
                </Box>
                <Box>
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  {chat.latestMessage && (
                    <Text fontSize="xs">
                      <b>
                        {getLastMessageSenderName(
                          chat.latestMessage.sender,
                          loggedUser
                        )}{" "}
                        :{" "}
                      </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
