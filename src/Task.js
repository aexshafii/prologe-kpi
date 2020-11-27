import React from "react";
import firebase from "firebase/app";

export const Task = ({ task }) => {
  const [taskName, setTaskName] = React.useState(task.taskName);

  // const onUpdate = () => {
  //   const db = firebase.firestore();
  //   db.collection("things")
  //     .doc(task.id)
  //     .set({ ...task, taskName });
  //   console.log({ ...task });
  // };

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
        {taskName}

        <button onClick={onDelete}>Delete</button>
      </div>
    </>
  );
};
//<button onClick={onUpdate}>Update</button>
