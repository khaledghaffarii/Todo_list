import "./App.css";
import TodoList from "./TodoList";
import { useState, useEffect } from "react";
import { Button, Input, makeStyles, Modal } from "@material-ui/core";
import { FormControl, InputLabel, Paper } from "@material-ui/core";
/* import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete"; */
import db from "./firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 350,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [open, setOpen] = useState(true);

  const [username, setUsername] = useState("");
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //DATE AND TIME
  const today = new Date();
  const dateTime =
    today.getDate() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getFullYear() +
    " at " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds();

  /*   useEffect(() => {
    //const usernamee = prompt("please enter your name"); //same
    //setUsername(prompt("Please enter your name")); //same
    setOpen(true);
  }, []); */

  /*   const enter = () => {
    // setUsername(username);
    setOpen(false);
  }; */

  useEffect(() => {
    db.collection("todos")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            idF: doc.id,
            todoF: doc.data().TODO,
            timeF: doc.data().TIME,
          }))
        );
      });
  }, []);

  //ADD FUNCTION
  const add = (e) => {
    e.preventDefault();

    db.collection("todos").add({
      TODO: input,
      TIME: dateTime,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  //DELETE ALL
  /* const deleteAll = (e) => {
    if (deleteAll) {
      db.collection("todos")
        .get()
        .then((res) => {
          res.forEach((element) => {
            element.ref.delete();
          });
          alert("You have deleted all your todos");
        })
        .catch((error) => {
          alert("Files Not Found", error.message);
        });
    }
  }; */

  return (
    <div className="app">
      <div className="container">
        <Modal className="modal" open={open} onClose={() => setOpen(false)}>
          <div style={modalStyle} className={classes.paper}>
            <form action="">
              <center>
                <h3>Please enter you name❗️</h3>
                <Input
                  placeholder="Name..."
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  inputProps={{ maxLength: 20 }}
                />

                <Button
                  type="submit"
                  onClick={() => setOpen(false)}
                  color="secondary"
                >
                  Enter
                </Button>
              </center>
            </form>
          </div>
        </Modal>

        {/*         <button onClick={() => setOpen(true)}>open model</button> */}

        <div className="header">
          {/*   <h1>{username + "'s"} Todo List</h1> */}
          <h1>{username ? username + "'s" : ""} Todo List</h1>
        </div>

        <div className="input__section">
          <form>
            <FormControl>
              {/*    <InputLabel>✅ Todo</InputLabel> */}
              <Input
                className="input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What needs to be done?"
                inputProps={{ maxLength: 50 }}
              />
            </FormControl>
            {/*  <AddBoxIcon type="submit" /> */}
            <Button
              type="submit"
              onClick={add}
              disabled={!input}
              variant="contained"
              color="secondary"
            >
              Add
            </Button>
            {/*  <Button
              disabled={!todos}
              onClick={(e) => {
                if (window.confirm("Are you sure about this?")) {
                  deleteAll(e);
                }
              }}
              variant="contained"
              color="secondary"
            >
              reset
            </Button> */}
          </form>
          <div className="todo__list">
            {todos.map((todo,id) => (
              <TodoList key={id} text={todo} />
            ))}
          </div>
        </div>
      </div>

      <div className="circle1"></div>
      <div className="circle2"></div>
    </div>
  );
}

export default App;
