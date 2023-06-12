import React, { useState, useEffect } from "react";
import "../App.css";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Text, Input, Stack } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      history.push("/chats");
    }
  }, [history]);
  const handleSubmit = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://sigma-chat-895v.onrender.com/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));

      // console.log(JSON.stringify(data));
      console.log("itme");
      toast({
        title: "Registration Successfull",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setPicLoading(false);
      history?.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        // description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
    setEmail("");
    setPassword("");
  };

  // const postDetails = (pics) => {
  //   setPicLoading(true);
  //   if (pics === undefined) {
  //     toast({
  //       title: "Please Select an Image!",
  //       status: "warning",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //     return;
  //   }
  //   console.log(pics);
  //   if (pics.type === "image/jpeg" || pics.type === "image/png") {
  //     const data = new FormData();
  //     data.append("file", pics);
  //     data.append("upload_preset", "SigmaChat");
  //     data.append("cloud_name", "dev1e2zfn");
  //     fetch("https://api.cloudinary.com/v1_1/dev1e2zfn/image/upload'", {
  //       method: "post",
  //       body: data,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setPic(data.url.toString());
  //         console.log(data.url.toString());
  //         setPicLoading(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setPicLoading(false);
  //       });
  //   } else {
  //     toast({
  //       title: "Please Select an Image!",
  //       status: "warning",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //     setPicLoading(false);
  //     return;
  //   }
  // };
  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://sigma-chat-895v.onrender.com/api/user/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      toast({
        title: "Login Successfull",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));

      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        // description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
    <>
      <div className="container">
        <div className="loginForm">
          <Text fontSize="4xl" fontWeight="550" align="center" mb={5}>
            Conversa
          </Text>
          <Tabs colorScheme="white" variant="enclosed">
            <TabList w="100%">
              <Tab w="50%">Login</Tab>
              <Tab w="50%">Register</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Stack spacing={3}>
                  <FormControl mt={5} isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      defaultValue={email}
                      placeholder="Enter Your Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                      sx={{
                        "::placeholder": {
                          color: "gray.200",
                        },
                      }}
                    />
                  </FormControl>
                  <FormControl mt={5} isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      defaultValue={password}
                      placeholder="Enter Your Password"
                      onChange={(e) => setPassword(e.target.value)}
                      sx={{
                        "::placeholder": {
                          color: "gray.200",
                        },
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <Button
                      w="100%"
                      mt={5}
                      bgColor="rgba(255, 255, 255, 0.15)"
                      color="white"
                      _hover={{
                        border: "1px solid white",
                        bgColor: "rgba(255, 255, 255, 0.15)",
                      }}
                      onClick={handleLogin}
                    >
                      Login
                    </Button>
                  </FormControl>
                  <FormControl>
                    <Button
                      w="100%"
                      mt={5}
                      bgColor="rgba(255, 255, 255, 0.15)"
                      color="white"
                      _hover={{
                        border: "1px solid white",
                        bgColor: "rgba(255, 255, 255, 0.15)",
                      }}
                      onClick={() => {
                        setEmail("guest@example.com");
                        setPassword("123456");
                      }}
                      overflow="hidden"
                    >
                      Get Guest User Credentials
                    </Button>
                  </FormControl>
                </Stack>
              </TabPanel>
              <TabPanel>
                <Stack spacing={3}>
                  <FormControl mt={5} isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="Text"
                      placeholder="Enter Your Username"
                      name={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      sx={{
                        "::placeholder": {
                          color: "gray.200",
                        },
                      }}
                    />
                  </FormControl>
                  <FormControl mt={5} isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      placeholder="Enter Your Email Address"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      sx={{
                        "::placeholder": {
                          color: "gray.200",
                        },
                      }}
                    />
                  </FormControl>
                  <FormControl mt={5} isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="Enter Your Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      sx={{
                        "::placeholder": {
                          color: "gray.200",
                        },
                      }}
                    />
                  </FormControl>
                  <FormControl mt={5} isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="Confirm Your Password"
                      onChange={(e) => {
                        setConfirmpassword(e.target.value);
                      }}
                      sx={{
                        "::placeholder": {
                          color: "gray.200",
                        },
                      }}
                    />
                  </FormControl>

                  {/* <FormControl mt={5}>
                    <FormLabel htmlFor="file-upload">Upload Image</FormLabel>
                    <Input
                      type="file"
                      id="file-upload"
                      accept="image/*"
                      display="none"
                      onChange={(e) => postDetails(e.target.files[0])}
                    />
                    <Button
                      as="label"
                      htmlFor="file-upload"
                      cursor="pointer"
                      w="40%"
                      bgColor="rgba(255, 255, 255, 0.15)"
                      _hover={{
                        border: "1px solid white",
                        bgColor: "rgba(255, 255, 255, 0.15)",
                      }}
                    >
                      Select File
                    </Button>
                  </FormControl> */}
                  <FormControl>
                    <Button
                      w="100%"
                      mt={5}
                      bgColor="rgba(255, 255, 255, 0.15)"
                      _hover={{
                        border: "1px solid white",
                        bgColor: "rgba(255, 255, 255, 0.15)",
                      }}
                      color="white"
                      isLoading={picLoading}
                      onClick={handleSubmit}
                    >
                      Sign Up
                    </Button>
                  </FormControl>
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </>
  );
}
