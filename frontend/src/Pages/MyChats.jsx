import React, { useState, useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import { useToast } from "@chakra-ui/toast";
import { Box, Button, Text, Stack, Divider } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import { getSender } from "../Config/ChatLogics";
import GroupChatModal from "../Pages/Miscellaneous/GroupChatModal";
const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:3000/api/chat",
        config
      );
      console.log("data of my chat", data);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
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
    // eslint-disable-next-line
  }, []);
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      h="100%"
      borderRadius="lg"
    >
      <Box
        pb={3}
        px={3}
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text
          fontSize={{ base: "23px", md: "26px" }}
          fontFamily="sans-serif"
          fontWeight={550}
          color="#393f4c"
        >
          Messages
        </Text>

        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "12px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
            color="white"
            bg="rgb(72, 177, 234)"
            border="1px solid rgb(72, 177, 234)"
            _hover={{
              bg: "white",
              color: "rgb(72, 177, 234)",
              border: "1px solid rgb(72, 177, 234)",
            }}
          >
            Group
          </Button>
        </GroupChatModal>
      </Box>
      <Divider />
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="white"
        w="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <>
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={
                    selectedChat === chat
                      ? "linear-gradient(109.6deg, rgb(204, 228, 247) 11.2%, rgb(237, 246, 250) 100.2%)"
                      : ""
                  }
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                  display="flex"
                  alignItems="center"
                  gap="1rem"
                >
                  {chat.latestMessage && (
                    <img
                      src={chat.latestMessage.sender.pic}
                      alt="Sender Image"
                      style={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                  <Box>
                    <Text color="gray">
                      {!chat.isGroupChat
                        ? getSender(loggedUser, chat.users)
                        : chat.chatName}
                    </Text>

                    {chat.latestMessage && (
                      <>
                        <Text fontSize="xs" color="gray">
                          <b>{chat.latestMessage.sender.name} : </b>
                          {chat.latestMessage.content.length > 50
                            ? chat.latestMessage.content.substring(0, 51) +
                              "..."
                            : chat.latestMessage.content}
                        </Text>
                      </>
                    )}
                  </Box>
                </Box>
                <Divider />
              </>
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
