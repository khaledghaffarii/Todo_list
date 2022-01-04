import {
  Avatar,
  Button,
  Checkbox,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Modal,
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import React, { useState } from "react";
import "./TodoList.css";

import db from "./firebase";

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
  root: {
    width: "100%",
    maxWidth: 360,

    backgroundColor: theme.palette.background.paper,
  },
}));

const TodoList = ({ text }) => {
  const classes = useStyles();

  const [checked, setChecked] = useState(true);
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

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
  /*
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  }; */

  //UPDATE FUNCTION
  const update = (e) => {
    e.preventDefault();
    db.collection("todos").doc(text.idF).set(
      {
        TODO: input,
        TIME: dateTime,
      },
      { merge: true }
    );
    setOpen(false);
    setInput("");
  };

  //DELETE FUNCTION
  const remove = () => {
    db.collection("todos").doc(text.idF).delete();
  };

  return (
    <div className="todoList">
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form>
            <center>
              <p>
                <strong>Please update your todo</strong>
              </p>
              <Input
                placeholder={text.todoF}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              <Button onClick={update} type="submit" disabled={!input}>
                edit
              </Button>
            </center>
          </form>
        </div>
      </Modal>

      {/* <button onClick={() => setOpen(true)}>open model</button> */}
      <List id="list" key="abc" className={classes.root}>
        <ListItem>
          {/*   <ListItemAvatar>
            <Avatar>  <ImageIcon /> </Avatar>
          </ListItemAvatar> */}
          <Checkbox />
          <ListItemText primary={text.todoF} secondary={text.timeF} />
          <IconButton>
            <EditIcon onClick={(e) => setOpen(true)} />
          </IconButton>
          <IconButton /* edge="end" aria-label="delete" */>
            <DeleteIcon
              onClick={(e) => {
                if (window.confirm("Delete this todo?")) remove();
              }}
              /*  onClick={(e) => db.collection("todos").doc(text.idF).delete()} */
            />
          </IconButton>
        </ListItem>
      </List>
    </div>
  );
};

export default TodoList;
