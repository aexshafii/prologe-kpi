import React from "react";
import firebase from "firebase/app";

export const Task = ({ task }) => {
  const [taskName] = React.useState(task.taskName);
  const [taskOwner] = React.useState(task.taskOwner);
  const [taskDeadline] = React.useState(task.taskDeadline);
  const [taskQuantity] = React.useState(task.quantity);

  // ----> will be useful for modifying
  // // const [taskName, setTaskName] = React.useState(task.taskName);
  // // const [taskOwner, setTaskOwner] = React.useState(task.taskOwner);
  // // const [taskDeadline, setTaskDeadline] = React.useState(task.taskDeadline);
  // // const [taskQuantity, setTaskQuantity] = React.useState(task.quantity);
  // // const onUpdate = () => {
  // //   const db = firebase.firestore();
  // //   db.collection("things")
  // //     .doc(task.id)
  // //     .set({ ...task, taskName });
  // //   console.log({ ...task });
  // // };

  const onDelete = () => {
    const db = firebase.firestore();
    db.collection("things").doc(task.id).delete();
  };

  return (
    <>
      <div
      // value={taskName}
      // onChange={(e) => {
      //   setTaskName(e.target.value);
      // }}
      >
        {taskName} {taskQuantity} {taskOwner} {taskDeadline}
        <button onClick={onDelete}>Delete</button>
      </div>
    </>
  );
};
//<button onClick={onUpdate}>Update</button>
