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
      {questions?.length > 0 && (
        <Box
          className="boxClass"
          style={{
            maxHeight: "310px",
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
                        marginTop: "20px",
                        marginLeft: "15px",
                      }}
                    >
                      {/* <TextField
                        placeholder="Aa"
                        variant="outlined"
                        type="text"
                        fullWidth
                        value={questions[index]}
                        inputProps={{
                          style: { fontFamily: "DM Sans", borderRadius: "8px" },
                        }}
                        sx={{
                          fontWeight: 400,
                          fontSize: "18px", // reduced font size
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "#7B68EE",
                            },
                          },
                        }}
                        onChange={(e) =>
                          handleQuestionChange(index, e.target.value)
                        }
                      /> */}
                      <textarea
                        placeholder="Aa"
                        value={questions[index]}
                        // rows="4"
                        style={{
                          width: "100%", // For full width
                          fontFamily: "Inter, sans-serif",
                          fontSize: "12px",
                          border: "none", // Removes default border
                          outline: "none", // Removes focus border
                          resize: "none", // Prevents user resizing
                          // Add other desired styles
                        }}
                        onChange={(e) =>
                          handleQuestionChange(index, e.target.value)
                        }
                      />
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        marginTop: "20px",
                        marginLeft: "15px",
                      }}
                    >
                      {/* <TextField
                        placeholder="Aa"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        value={answers[index]}
                        inputProps={{
                          style: { fontFamily: "DM Sans", borderRadius: "8px" },
                        }}
                        sx={{
                          fontSize: "18px", // reduced font size
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "#7B68EE",
                            },
                          },
                        }}
                        onChange={(e) =>
                          handleAnswerChange(index, e.target.value)
                        }
                      /> */}
                      <textarea
                        placeholder="Aa"
                        value={answers[index]}
                        rows="4"
                        style={{
                          width: "100%", // For full width
                          fontFamily: "Inter, sans-serif",
                          fontSize: "12px",
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
                <IconButton style={{ marginTop: "9px", marginLeft: "-25px" }}>
                  <img src="/delete.svg" alt="delete" />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        </Box>
      )}
      {questions?.length > 0 && (
        <Box className="chat-btn-box">
          <button className="chat-btn">Submit</button>
        </Box>
      )}
    </>
  );
};
export default QandADisplay;
