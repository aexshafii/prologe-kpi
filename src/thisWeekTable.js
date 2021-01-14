import React, { useState } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import firebase from "firebase/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import InlineEdit from "./components/inlineEdit";

let outOfWeek = new Date();
outOfWeek.setDate(outOfWeek.getDate() + 7);

const monthDay = new Date().getDate();
const weekDay = new Date().getDay();
const daysToSunday = 7 - weekDay;
const daysFromSunday = weekDay;
console.log(monthDay);
const setDateToMidnight = (date) => {
  date.setHours(0, 0, 0, 0);
};

// Calculate this week section for UI
let thisSunday = new Date();
thisSunday.setDate(monthDay + daysToSunday);
setDateToMidnight(thisSunday);

let thisMonday = new Date();
thisMonday.setDate(monthDay - daysFromSunday);
setDateToMidnight(thisMonday);

console.log(thisMonday);

thisMonday = thisMonday.getTime();
thisSunday = thisSunday.getTime();

// Calculate last week section for UI
// 604,800,000 === one week in milliseconds

export const ThisWeekTable = ({ tasks }) => {
  const [task, setTask] = useState("");
  console.log(task);
  function handleChange(newValue) {
    setTask(newValue);
  }

  // const [task, setTask] = useState("");
  const onDelete = (id) => {
    const db = firebase.firestore();
    db.collection("things").doc(id).delete();
  };

  function TaskRow({ task }) {
    const [storedText] = useState("Here's some more, edit away!");
    console.log(storedText);

    const onModify = (id, text) => {
      console.log(text);
      const db = firebase.firestore();
      db.collection("things").doc(id).update({ progress: text });
    };

    const onModifyName = (id, text) => {
      console.log(text);
      const db = firebase.firestore();
      db.collection("things").doc(id).update({ taskName: text });
    };

    const onModifyQuantity = (id, text) => {
      console.log(text);
      const db = firebase.firestore();
      db.collection("things").doc(id).update({ quantity: text });
    };
    const priorityOptions = ["ben", "alex", "laurent"];

    return (
      <TableRow key={task.id} task={task}>
        <TableCell scope="row">
          <InlineEdit
            text={task.taskName}
            onSetText={(text) => onModifyName(task.id, text)}
          />
        </TableCell>

        <TableCell scope="row" align="right">
          <InlineEdit
            text={task.quantity === 0 ? task.quantity : "n/a"}
            onSetText={(text) => onModifyQuantity(task.id, text)}
          />
        </TableCell>
        <TableCell align="right">
          <InlineEdit
            text={task.progress}
            onSetText={(text) => onModify(task.id, text)}
            priorityOptions={priorityOptions}
          />
        </TableCell>
        <TableCell align="right">{task.priority}</TableCell>
        <TableCell align="right">{task.taskOwner}</TableCell>

        <TableCell align="right">{task.taskDeadline}</TableCell>
        <TableCell align="right">
          <button onClick={() => onDelete(task.id)}>x</button>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Goal</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Progress&nbsp;(%)</TableCell>
            <TableCell align="right">Priority</TableCell>

            <TableCell align="right">Owner</TableCell>
            <TableCell align="right">Due Date</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks
            .filter(
              (task) =>
                thisMonday < task.createdAt && task.createdAt < thisSunday
            )
            .map((task) => (
              <TaskRow task={task} onChange={handleChange}></TaskRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
