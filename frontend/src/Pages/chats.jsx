import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "./Miscellaneous/SideDrawer";
import { Box, Flex } from "@chakra-ui/react";
import ChatBox from "./ChatBox";
import MyChats from "./MyChats";
const Chats = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState();
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#f5f7fb",
      }}
    >
      <div>{user && <SideDrawer />}</div>
      <Flex justifyContent="space-between" p="10px" w="100%" h="90vh">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Flex>
    </div>
  );
};

export default Chats;
