import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
//
//
//
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { BeatLoader } from 'react-spinners';
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// ContextAPI
import { useContext } from "react";
import DataContext from "../../ContextAPI/DataState";
// ContextAPI End
import jwt_decode from "jwt-decode";
import Loading from "./Loading";

const ChatSection = () => {
  // Base Url
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  //
  const navigate = useNavigate();
  const dataContext = useContext(DataContext);
  const [docData, setDocData] = useState({});
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I’m MessengerGPT, ask me anything about MessengerGPT!",
      loading: false,
    },
    {
      sender: "bot",
      text: "By the way, did you know you can have your own custom GPT connected to your messenger?",
      loading: false
    },
  ]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);
  const [profileUrl, setProfileUrl] = useState("");
  const [commonMessagesUser, setCommonMessagesUser] = useState([
    "how does messengerGPT work?",
    "Is MessengerGPT free?",
    "Can it connect to my whatsapp & instagram?",
  ]);
  const [isSelected, setIsSelected] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      const listElem = listRef.current;
      listElem.scrollTop = listElem.scrollHeight;
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (isSelected) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    if (input.trim() !== "") {
      setLoading(true)
      setMessages([...messages, { sender: "user", text: input, loading: false }, {sender: "bot", text:"", loading: true}]);
      console.log(messages.slice(-4));
      const lastFourMessages = messages.slice(-4).map((msg) => msg.text);
      // Determine the properties based on the length of lastFourMessages
      console.log(lastFourMessages, 'lastFourMessage')
      const secondLastMsg =
        lastFourMessages.length >= 2
          ? lastFourMessages[lastFourMessages.length - 2]
          : "";
      const thirdLastMsg =
        lastFourMessages.length >= 3
          ? lastFourMessages[lastFourMessages.length - 3]
          : "";
      const fourthLastMsg =
        lastFourMessages.length >= 4 ? lastFourMessages[0] : "";
      // Prepare the submit data
      const submitData = {
        userQuestion: input,
        secondLastMsg,
        thirdLastMsg,
        fourthLastMsg,
      };
      console.log(submitData);
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI4NDQ2MzY3NTlkZmUyYmM5OGU5NDAyMTAzMmI4YmFiZSIsImlhdCI6MTY5NTMyMzgzOCwiZXhwIjoxNzAwNTA3ODM4fQ.Y-4S9W3VIyq6t3u6Cfv4-dB7wNq4muFJkaVODma8CC8";
      const reply = await getResponseSelf(submitData, token);
      setMessages(prev => {
        console.log(prev, 'prev')
        let updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1].loading = false;
        console.log(updatedMessages[updatedMessages.length - 1], 'updatedMessages')
        // Add the bot response
        if (reply) {
          // updatedMessages.push({ sender: "bot", text: reply.data.response });
        updatedMessages[updatedMessages.length - 1].text = reply.data.response;
        } else {
        updatedMessages[updatedMessages.length - 1].text = "Error! Unable to connect!";
        }
        return updatedMessages;
      });
      setInput("");
      setLoading(false)
      dataContext.setMessagesLPFunction({ data: messages });
   
    }
  };
  console.log(messages, 'messages')
  const getResponseSelf = async (submitData, bearerToken) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/get-response-self`,
        submitData,
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${bearerToken}`, // Added this line
          },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div onClick={() => setIsSelected(true)}>
        <div style={{ height: "1050px", width: "100%" }}>
          <Container maxWidth="xl">
            <Box style={{ height: "100px" }}></Box>
            <div sx={{ alignItems: "center" }}>
              <Grid
                container
                direction="column"
                // spacing={2}
                style={{
                  height: "100%",
                  background: "",
                  width: "700px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Grid item textAlign="center">
                  <Box style={{ my: 2 }}>
                    <Typography
                      style={{ fontSize: "52px", fontWeight: "bold" }}
                    >
                      Test it for Yourself!
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "grey",
                      }}
                    >
                      MessengerGPT's messenger is trained on previous message +
                      website's data.
                    </Typography>
                  </Box>
                  <Box style={{ height: "50px" }}></Box>
                </Grid>
                <Grid item>
                  {/* <Box height={20}></Box> */}
                  <Box sx={{ flexGrow: 1 }}>
                    <AppBar
                      position="static"
                      sx={{
                        background: "white",
                        borderRadius: "15px 15px 0 0",
                      }}
                    >
                      <Toolbar>
                        <IconButton
                          size="large"
                          edge="start"
                          color="inherit"
                          aria-label="menu"
                          sx={{ mr: 2 }}
                        >
                          {/* <MenuIcon /> */}
                          <Avatar src="/assets/messengergpt-icon.png" />
                        </IconButton>
                        <Typography
                          variant="h6"
                          component="div"
                          style={{
                            fontFamily: "Inter, sans-serif ",
                          }}
                          sx={{
                            flexGrow: 1,
                            color: "black",
                            fontWeight: "500",
                          }}
                        >
                          MessengerGPT
                        </Typography>
                        {/* <Button color="inherit">Login</Button> */}
                        <Box>
                          <InfoIcon />
                        </Box>
                      </Toolbar>
                    </AppBar>
                  </Box>
                </Grid>
                <Grid item>
                  <Paper elevation={1}>
                    <div style={{ width: "100%", marginTop: "2px" }}>
                      <Box
                      >
                        <List
                          ref={listRef}
                           style={{
                            height: "60vh",
                            overflowY: "auto",
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                            scrollBehavior: "smooth",
                          }}
                        >
                          {messages.map((message, index) => (
                            <ListItem
                              key={index}
                              alignItems="flex-start"
                              style={{
                                justifyContent:
                                  message.sender === "bot"
                                    ? "flex-start"
                                    : "flex-end",
                              }}
                            >
                              {message.sender === "bot" && (
                                <Avatar src="/assets/messengergpt-icon.png" />
                              )}
                              <Box
                                sx={{
                                  maxWidth: 400,
                                  // border: "1px solid",
                                  borderRadius: "15px",
                                  backgroundColor:
                                    message.sender === "bot"
                                      ? "#E4E6EB"
                                      : "#0084FF",
                                  color:
                                    message.sender === "bot"
                                      ? "black"
                                      : "white",
                                  padding: "10px",
                                  overflowWrap: "break-word", // For long unbroken strings
                                }}
                              >
                                {/* {message.sender === "user" && (
                                   <ListItemText
                                   primary={message.text}
                                   align={
                                    "right"
                                   }
                                   style={{
                                     fontFamily: "Inter, sans-serif !important",
                                   }}
                                 />
                                )} */}
                                {message.sender === "bot" && message.loading ? (
                                   <BeatLoader color="#9ca3af" size={10} />
                                ) : (
                                  <ListItemText
                                  primary={message.text}
                                  align={
                                    "left"
                                  }
                                  style={{
                                    fontFamily: "Inter, sans-serif !important",
                                  }}
                                />
                                )}
                              </Box>
                            </ListItem>
                          ))}
                          <div ref={messagesEndRef} />
                        </List>
                      </Box>
                      <Box
                        // width="400px"
                        sx={{
                          // background: "grey",
                          display: "flex",
                          // overflowX: "auto", // Allow horizontal scrolling
                          whiteSpace: "nowrap", // Prevent wrapping to the next line
                          padding: '1rem 2rem',
                        }}
                      >
                        {commonMessagesUser.slice(0, 3).map(
                          (
                            message,
                            index // Take the top 5 messages
                          ) => (
                            <Button
                              key={index}
                              onClick={() => {
                                console.log(message);
                                setInput(message);
                              }}
                              sx={{
                                textTransform: "none",
                                borderRadius: "15px",
                                backgroundColor: '#EEE',
                                color: '#585858',
                                padding: "10px",
                                marginRight: "10px", // Add some spacing between boxes
                                display: "inline-block", // This will prevent the Box from taking full width and thus allowing them to line up horizontally
                              }}
                            >
                              <Typography
                                sx={{ fontSize: "15px" }}
                              >
                                {message}
                              </Typography>
                            </Button>
                          )
                        )}
                      </Box>
                    </div>
                  </Paper>
                </Grid>
                <Grid item>
                  <AppBar
                    position="static"
                    sx={{
                      background: "white",
                      borderRadius: " 0 0 15px 15px",
                      pb: 2,
                      px: 1,
                    }}
                  >
                    <Box style={{ display: "flex" }}>
                      <Box
                        style={{
                          display: "flex",
                          flexGrow: 1,
                          marginTop: "20px",
                          marginLeft: "15px",
                          backgroundColor: "#F0F2F5",
                          border: "1px solid lightgrey",
                          borderRadius: "15px",
                        }}
                      >
                        <TextField
                          placeholder="Aa"
                          variant="outlined"
                          type="text"
                          fullWidth
                          value={input}
                          style={{
                            fontFamily: "Inter, sans-serif !important",
                          }}
                          sx={{
                            fontSize: "12px", // reduced font size
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "transparent", // make the border transparent
                              },
                              "&:hover fieldset": {
                                borderColor: "transparent", // make the hover border transparent
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "transparent", // make the focus border transparent
                              },
                            },
                            "& .MuiInputBase-root": {
                              height: "40px", // reduce the height, but ensure it's enough for the text and padding
                            },
                          }}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleSubmit();
                              setInput(""); // Clear the input
                            }
                          }}
                        />

                        <Box
                          height="100%"
                          style={{
                            display: "",
                            justifyContent: "cemter",
                            position: "relative"
                          }}
                        >
                          <Box height="5px" backgroundColor=""></Box>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={handleSubmit}
                            sx={{
                              fontFamily: "Inter, sans-serif !important",
                            }}
                            style={{
                              display: "flex", // Added to help with alignment
                              alignItems: "center", // Center items vertically
                              justifyContent: "center", // Center items horizontally

                              color: "white",
                              borderRadius: "10px",
                              background: "#0084FF",
                              fontSize: "12px",
                              fontWeight: "700",
                              textTransform: "none",
                              position: "absolute",
                              left: "-77px",
                              top: "5px"

                              // p: 0,
                            }}
                          >
                            {/* <SendIcon /> */}
                            <img
                              width="20px"
                              src="/assets/send-icon.png"
                              style={{ paddingRight: "2px" }}
                            />
                            Send
                          </Button>
                        </Box>
                      </Box>
                      <Box
                        height="100%"
                        style={{
                          justifyContent: "cemter",
                          alignItems: "center",
                          marginTop: "22px",
                          
                        }}
                      >
                        <Button>
                          {/* <ThumbUpIcon style={{ color: "#0084FF" }} /> */}
                          <img src="/assets/thumup.png" />
                        </Button>
                      </Box>
                    </Box>
                  </AppBar>
                </Grid>
              </Grid>
            </div>
          </Container>
          {/* <Grid item> */}

          {/* </Grid> */}
        </div>
      </div>
    </>
  );
};
export default ChatSection;
