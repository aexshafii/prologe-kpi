import React from "react";

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
import ProgressBarEdit from "./components/progressBarEdit";

import useDropdown from "./components/dropdownEdit";

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

export const LastWeekTable = ({ tasks }) => {
  const onDelete = (id) => {
    const db = firebase.firestore();
    db.collection("things").doc(id).delete();
  };

  function TableRows({ task }) {
    const onModifyProgress = (id, text) => {
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

    const onModifyPriority = (id, text) => {
      console.log(text);
      const db = firebase.firestore();
      db.collection("things").doc(id).update({ priority: text });
    };
    const onModifyOwner = (id, text) => {
      console.log(text);
      const db = firebase.firestore();
      db.collection("things").doc(id).update({ taskOwner: text });
    };
    const onModifyDate = (id, text) => {
      console.log(text);
      const db = firebase.firestore();
      db.collection("things").doc(id).update({ taskDeadline: text });
    };
    // Dropdown for priority
    const priority_list = ["Low", "Medium", "High"];
    let taskPriority = task.priority;
    let onSetText = (text) => onModifyPriority(task.id, text);
    const [priority, PriorityDropdown] = useDropdown(
      taskPriority,
      priority_list,
      onSetText
    );
    console.log(priority);
    // Dropdown for owner
    const owners_list = [
      "ben@prologe.io",
      "alex@prologe.io",
      "laurent@prologe.io",
    ];
    let taskOwner = task.taskOwner;
    let onSetText2 = (text) => onModifyOwner(task.id, text);
    const [owner, OwnerDropdown] = useDropdown(
      taskOwner,
      owners_list,
      onSetText2
    );
    console.log(owner);

    return (
      <TableRow key={task.id} task={task}>
        <TableCell scope="row" width="200px">
          <InlineEdit
            text={task.taskName}
            onSetText={(text) => onModifyName(task.id, text)}
          />
        </TableCell>

        <TableCell scope="row" align="right">
          <InlineEdit
            text={task.quantity === "0" ? "n/a" : task.quantity}
            onSetText={(text) => onModifyQuantity(task.id, text)}
          />
        </TableCell>
        <TableCell align="right" width="200px">
          <ProgressBarEdit
            text={task.progress}
            onSetText={(text) => onModifyProgress(task.id, text)}
          />
        </TableCell>

        <TableCell align="right">
          <PriorityDropdown></PriorityDropdown>
        </TableCell>

        <TableCell align="right">
          <OwnerDropdown></OwnerDropdown>
        </TableCell>
        <TableCell align="right">
          <InlineEdit
            text={task.taskDeadline}
            onSetText={(text) => onModifyDate(task.id, text)}
          />
        </TableCell>

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
                lastMonday < task.createdAt && task.createdAt < lastSunday
            )
            .map((task) => (
              <TableRows task={task}></TableRows>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
