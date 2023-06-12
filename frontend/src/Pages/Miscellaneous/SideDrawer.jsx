import React, { useState } from "react";
import axios from "axios";
import {
  Tooltip,
  Box,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { Effect } from "react-notification-badge";
import NotificationBadge from "react-notification-badge";
import ChatLoading from "../ChatLoading";
import { useToast } from "@chakra-ui/toast";
import { useHistory } from "react-router-dom";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { getSender } from "../../Config/ChatLogics";
import UserListItem from "../UserAvatar/UserListItems";
const SideDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const {
    user,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const history = useHistory();
  const toast = useToast();
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    } else {
      // console.log(user.token);
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`/api/user?search=${search}`, config);
        console.log(data);
        setLoading(false);
        setSearchResult(data);
      } catch (error) {
        toast({
          title: "Error Occured",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-left",
        });
      }
    }
  };
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/api/chat", { userId }, config);
      setLoadingChat(false);
      setSelectedChat(data);
      onClose();
    } catch (error) {
      toast({
        title: "Error Fetching the chat",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        // bg="white"
        w="100%"
        p="10px 10px 5px 10px"
        // borderWidth="5px"
      >
        <Tooltip label="Search Users Here" hasArrow placement="bottom-end">
          <Button
            bg={"transparent"}
            onClick={onOpen}
            color="#393f4c"
            border="1px solid lightgray"
            borderRadius={20}
          >
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        {/* <Text fontSize="3xl" fontFamily="sans-serif">
          Conversa
        </Text> */}
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" margin={1} color="gray" />
              <MenuList pl={2}>
                {!notification.length && "No New Messages"}
                {notification.map((notif) => (
                  <MenuItem
                    key={notif._id}
                    onClick={() => {
                      setSelectedChat(notif.chat);
                      setNotification(notification.filter((n) => n !== notif));
                    }}
                  >
                    {notif.chat.isGroupChat
                      ? `New Message in ${notif.chat.chatName}`
                      : `New Message from ${getSender(user, notif.chat.users)}`}
                  </MenuItem>
                ))}
              </MenuList>
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg={"transparent"}>
              <Avatar size="sm" name={user.name} src={user.pic} />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Search User</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                value={search}
                mr={2}
                placeholder="Search by name or email"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Button
                onClick={handleSearch}
                bg="rgb(72, 177, 234)"
                color="white"
                border="1px solid rgb(72, 177, 234)"
                _hover={{
                  bg: "white",
                  color: "rgb(72, 177, 234)",
                  border: "1px solid rgb(72, 177, 234)",
                }}
              >
                Go
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => {
                return (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => {
                      accessChat(user._id);
                    }}
                  />
                );
              })
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
