import React, { useEffect, useState } from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { SpellInput } from "./SpellInput";

firebase.initializeApp({
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  apiKey: "AIzaSyDqs4qVI_-jC5bOEaHYfRGf5ct-D1ZazY4",
  authDomain: "react-kpi.firebaseapp.com",
  databaseURL: "https://react-kpi.firebaseio.com",
  projectId: "react-kpi",
  storageBucket: "react-kpi.appspot.com",
  messagingSenderId: "65402955763",
  appId: "1:65402955763:web:61b0c57ab0502ebdea5486",
  measurementId: "G-LEYP24X6ZJ",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function App() {
  const [tasks, setTasks] = useState([
    "task blabla",
    "do laundry",
    "wash horses",
  ]);
  // const [input, setInput] = useState("");
  const [newTaskName, setNewTaskName] = React.useState();

  // on load get todos from firebase
  useEffect(() => {
    const unsubscribe = firestore
      .collection("things")
      .onSnapshot((snapshot) => {
        const tasksData = [];
        snapshot.forEach((doc) =>
          tasksData.push({ ...doc.data(), id: doc.id })
        );
        setTasks(tasksData);
      });
    return unsubscribe;
  }, []);
  // == document.getElementById('task).value

  // const updateInput = (e) => {
  //   setInput(e.target.value);
  // };

  // const addTask = () => {
  //   const newTask = input;
  //   setTasks([...tasks, newTask]);
  //   console.log([...tasks, newTask]);
  //   // firestore collection
  //   const tasksRef = firestore.collection("things");

  //   tasksRef.add({
  //     taskName: newTask,
  //     createdAt: Date.now(),
  //   });
  // };
  const [user] = useAuthState(auth);

  const onCreate = () => {
    const db = firebase.firestore();
    db.collection("things").add({
      taskName: newTaskName,
      createdAt: Date.now(),
    });
  };

  return (
    <div className="App">
      <section>
        {user ? (
          <div>
            <input
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              id="task"
            />
            <button onClick={onCreate}>submit</button>
            <div id="tasks">
              {tasks.map((task) => (
                <div key={task.taskName}>
                  <SpellInput task={task} />
                </div>
              ))}
              <div> </div>
            </div>
          </div>
        ) : (
          <SignIn />
        )}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

// function SignOut() {
//   return (
//     auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
//   );
// }
