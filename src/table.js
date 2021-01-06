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

thisMonday = thisMonday.getTime();
thisSunday = thisSunday.getTime();

// Calculate last week section for UI
// 604,800,000 === one week in milliseconds

let lastMonday = thisMonday - 604800000;
let lastSunday = thisSunday - 604800000;

export const BasicTable = ({ tasks }) => {
  const [taskProgress, setTaskProgress] = useState("hello");
  // const [task, setTask] = useState("");
  const onDelete = (id) => {
    const db = firebase.firestore();
    db.collection("things").doc(id).delete();
  };

  function Child({ task, onChildClick }) {
    // function handleClick(event) {
    //   onChildClick(event.target.name);
    // }
    return (
      <TableBody>
        {tasks
          .filter(
            (task) => lastMonday < task.createdAt && task.createdAt < lastSunday
          )
          .map((task) => (
            <TableRow key={task.id} task={task}>
              <TableCell scope="row">{task.taskName}</TableCell>

              <TableCell scope="row" align="right">
                {task.quantity === "0" ? "n/a" : task.quantity}
              </TableCell>
              <TableCell align="right">
                {" "}
                <InlineEdit
                  text={taskProgress}
                  onSetText={(text) => setTaskProgress(text)}
                />
              </TableCell>
              <TableCell align="right">{task.taskOwner}</TableCell>
              <TableCell align="right">{task.taskDeadline}</TableCell>

              <TableCell align="right">
                <button onClick={() => onDelete(task.id)}>x</button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    );
  }

  // //Edit progress
  // const save = (id) => {
  //   const db = firebase.firestore();
  //   db.collection("things").doc(id).update({ progress: 1 });
  // };
  // const cancel = () => {
  //   alert("Cancelled");
  // };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Goal</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Progress&nbsp;(%)</TableCell>
            <TableCell align="right">Owner</TableCell>
            <TableCell align="right">Due Date</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <Child></Child>
      </Table>
    </TableContainer>
  );
};
