import React from "react";
import firebase from "firebase/app";

export const SpellInput = ({ task }) => {
  const [name, setName] = React.useState(task.taskName);

  const onUpdate = () => {
    const db = firebase.firestore();
    db.collection("things")
      .doc(task.id)
      .set({ ...task, name });
  };

  const onDelete = () => {
    const db = firebase.firestore();
    db.collection("things").doc(task.id).delete();
  };

  return (
    <>
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button onClick={onUpdate}>Updat</button>
      <button onClick={onDelete}>Delet</button>
    </>
  );
};
