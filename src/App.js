import React, { useEffect, useState } from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { Task } from "./Task";

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
  const [newTaskOwner, setNewTaskOwner] = React.useState();
  const [newTaskDeadline, setNewTaskDeadline] = React.useState();
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

  const onCreate = () => {
    const db = firebase.firestore();
    db.collection("things").add({
      taskName: newTaskName,
      taskOwner: email,
      taskDeadline: newTaskDeadline,
      createdAt: Date.now(),
      userID: uid,
    });
  };

  var user = firebase.auth().currentUser;
  var email, uid;

  if (user != null) {
    email = user.email;
    uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
  }
  console.log(uid);
  console.log(typeof email);

  const completeHandler = () => {
    setTasks(
      tasks.map((task) => {
        if (task.id === task.id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      })
    );
  };
  return (
    <div className="App">
      <header>
        <h1>Prologe KPI ⚛️🔥💬</h1>
        <h2>Weekly Goals</h2>
        <SignOut />
      </header>
      <section>
        {user ? (
          <div>
            <label>
              <input
                label="hello"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                id="task"
              />
            </label>
            <input
              value={newTaskOwner}
              defaultValue={email}
              onChange={(e) => setNewTaskOwner(e.target.value)}
              id="Owner"
            />
            <input
              value={newTaskDeadline}
              onChange={(e) => setNewTaskDeadline(e.target.value)}
              id="deadline"
              type="date"
            />

            <button onClick={onCreate}>submit</button>
            <div id="tasks">
              {tasks.map((task, taskOwner, taskDeadline) => (
                <div key={task.id}>
                  <Task
                    className={`todo-item ${task.completed ? "completed" : ""}`}
                    task={task}
                    taskOwner={taskOwner}
                    taskDeadline={taskDeadline}
                  />
                  <button onClick={completeHandler} className="complete-btn">
                    <i className="fas fa-check"></i>
                  </button>
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

function SignOut() {
  return (
    auth.currentUser && (
      <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
    )
  );
}
