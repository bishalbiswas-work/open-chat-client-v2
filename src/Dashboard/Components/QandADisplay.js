import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

// Icons
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// End Icons
// ContextAPI
import { useContext } from "react";
import DataContext from "../../ContextAPI/DataState";
// ContextAPI End
const QandADisplay = ({ content: initialContent }) => {
  // const navigate = useNavigate();
  const dataContext = useContext(DataContext);
  const [questions, setQuestions] = useState(dataContext.questions);
  const [answers, setAnswers] = useState(dataContext.answers);

  const [content, setContent] = useState(initialContent);

  const handleQuestionChange = (index, value) => {
    // Create a new array with the updated question
    const newContent = [...questions];
    newContent[index] = value;
    setQuestions(newContent);
    console.log(newContent);
  };

  const handleAnswerChange = (index, value) => {
    // Create a new array with the updated answer
    const newContent = [...answers];
    newContent[index] = value;
    setAnswers(newContent);
    console.log(newContent);
  };
  useEffect(() => {
    // Update the document title using the browser API
    dataContext.setQuestionsFunction({ data: questions });
    dataContext.setAnswersFunction({ data: answers });
  }, [questions, answers]);
  useEffect(() => {
    // Update the document title using the browser API
    setQuestions(dataContext.questions);
    setAnswers(dataContext.answers);
  }, [dataContext.questions, dataContext.answers]);

  return (
    <>
      <Box
      className="boxClass"
        style={{
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        {questions.map((item, index) => (
          <Grid container>
            <Grid item xs={11}>
              <Box>
                <Box>
                  <Box
                    key={index}
                    style={{
                      display: "flex",
                      flexGrow: 1,
                      marginTop: "20px",
                      marginLeft: "15px",
                      padding: "10px",
                      paddingTop: "20px",
                      //   backgroundColor: "#F0F2F5",
                      border: "2px solid #7B68EE",
                      borderRadius: "15px",
                    }}
                  >
                    <textarea
                      placeholder="Aa"
                      value={questions[index]}
                      // rows="4"
                      style={{
                        width: "100%", // For full width
                        fontFamily: "Inter, sans-serif",
                        fontSize: "15px",
                        border: "none", // Removes default border
                        outline: "none", // Removes focus border
                        resize: "none", // Prevents user resizing
                        p: 2,
                        // Add other desired styles
                      }}
                      onChange={(e) =>
                        handleQuestionChange(index, e.target.value)
                      }
                    />
                    <Box
                      key={index}
                      height="100%"
                      style={{
                        display: "",
                        justifyContent: "cemter",
                      }}
                    >
                      <Box height="5px" backgroundColor=""></Box>
                      <Button
                        // variant="contained"
                        size="small"
                        // onClick={handleSubmit}
                        sx={{
                          fontFamily: "Inter, sans-serif !important",
                        }}
                        style={{
                          display: "flex", // Added to help with alignment
                          alignItems: "center", // Center items vertically
                          justifyContent: "center", // Center items horizontally

                          color: "black",
                          borderRadius: "10px",
                          //   background: "#0084FF",
                          fontSize: "12px",
                          fontWeight: "700",
                          textTransform: "none",

                          // p: 0,
                        }}
                      >
                        {/* <EditIcon /> */}
                      </Button>
                    </Box>
                  </Box>

                  <Box
                    style={{
                      display: "flex",
                      flexGrow: 1,
                      marginTop: "20px",
                      marginLeft: "15px",
                      padding: "10px",
                      //   backgroundColor: "#F0F2F5",
                      border: "2px solid lightgrey",
                      borderRadius: "15px",
                    }}
                  >
                    <textarea
                      placeholder="Aa"
                      value={answers[index]}
                      rows="4"
                      style={{
                        width: "100%", // For full width
                        fontFamily: "Inter, sans-serif",
                        fontSize: "15px",
                        border: "none", // Removes default border
                        outline: "none", // Removes focus border
                        resize: "none", // Prevents user resizing
                        // Add other desired styles
                      }}
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={1}>
              <IconButton style={{ marginTop: "20px", marginLeft: "-25px" }}>
                <img src="/assets/delete.svg" alt="delete" />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Box>
    </>
  );
};
export default QandADisplay;
