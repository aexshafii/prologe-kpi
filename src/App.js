import React, { useEffect, useState } from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { Task } from "./Task";
import { Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

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

export default function App() {
  const [tasks, setTasks] = useState([]);
  // const [input, setInput] = useState("");
  const [newTaskName, setNewTaskName] = React.useState();
  const [newTaskQuantity, setNewTaskQuantity] = React.useState();
  const [newTaskOwner, setNewTaskOwner] = React.useState();
  const [newTaskDeadline, setNewTaskDeadline] = React.useState();
  // on load get todos from firebase

  const auth = firebase.auth();
  const firestore = firebase.firestore();

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
  }, [firestore]);

  const onCreate = () => {
    const db = firebase.firestore();
    db.collection("things").add({
      taskName: newTaskName,
      taskDeadline: newTaskDeadline,
      createdAt: Date.now(),
      quantity: newTaskQuantity,
      taskOwner: newTaskOwner,
    });
  };

  var user = firebase.auth().currentUser;
  // var email, uid;
  console.log("hi");
  getAll(firestore);
  function SignIn() {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider).then(function () {
        return updateUserInfo();
      });
    };
    return <button onClick={signInWithGoogle}>Sign in with Google</button>;
  }

  function updateUserInfo() {
    const userData = {
      lastLoginTime: new Date(),
      userID: user.uid,
    };
    return firebase
      .firestore()
      .doc(`/users/${user.email}`)
      .set(userData, { merge: true });
  }

  if (user != null) {
    // email = user.email;
    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
  }

  async function getAll(firestore) {
    const usersRef = firestore.collection("users");
    const snapshot = await usersRef.get();
    snapshot.forEach((doc) => {
      console.log(doc.id);
    });
  }
  // used to calculate weeks in tasks filtering
  const upperLimit = 1607385541000; // u can convert a Date into unix time
  const lowerLimit = 1607302861000;

  const todaysLowerLimit = 1607562061000;

  console.log(todaysLowerLimit);

  function getThisWeeksMonday(d) {
    d = new Date(d);

    var day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff)).getMilliseconds();
  }

  getThisWeeksMonday(new Date());
  console.log(getThisWeeksMonday(new Date()));

  return (
    <div className="App">
      <header>
        <h1 className="mt-5">Prologe KPI ⚛️</h1>
        <h2 className="mt-5">Goals</h2>
      </header>
      <section>
        {user ? (
          <div>
            <Form>
              <Form.Row className="align-items-center">
                <Col xs="auto">
                  <Form.Label style={{ fontWeight: "bold" }}>Goal</Form.Label>
                  <Form.Control
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    id="task"
                    style={{ backgroundColor: "#C0C0C0", color: "#696969" }}
                    type="text"
                  />
                </Col>
                <Col xs="auto">
                  <Form.Label style={{ fontWeight: "bold" }}>
                    Quantity
                  </Form.Label>
                  <Form.Control
                    value={newTaskQuantity}
                    onChange={(e) => setNewTaskQuantity(e.target.value)}
                    id="task"
                    style={{ backgroundColor: "#C0C0C0", color: "#696969" }}
                    type="number"
                  />
                </Col>
                <Col xs="auto">
                  <Form.Label style={{ fontWeight: "bold" }}>Owner</Form.Label>
                  <Form.Control
                    as="select"
                    value={newTaskOwner}
                    onChange={(e) => setNewTaskOwner(e.target.value)}
                    style={{ backgroundColor: "#C0C0C0", color: "#696969" }}
                    id="email"
                  >
                    <option>laurent@prologe.io</option>
                    <option>alex@prologe.io</option>
                    <option>ben@prologe.io</option>
                  </Form.Control>
                </Col>
                <Col xs="auto">
                  <Form.Label style={{ fontWeight: "bold" }}>
                    Select Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={newTaskDeadline}
                    onChange={(e) => setNewTaskDeadline(e.target.value)}
                    id="deadline"
                    style={{ backgroundColor: "#C0C0C0", color: "#696969" }}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    variant="primary"
                    onClick={onCreate}
                    style={{ marginTop: "32px" }}
                  >
                    Add
                  </Button>
                </Col>
              </Form.Row>
            </Form>
            <h4 style={{ color: "purple" }} className="mt-5">
              {" "}
              Last Week
            </h4>
            <div id="tasks">
              {tasks
                .filter(
                  (task) =>
                    lowerLimit < task.createdAt && task.createdAt < upperLimit
                )
                .map((task, taskOwner, taskDeadline) => (
                  <div key={task.id}>
                    <Task
                      className={`todo-item ${
                        task.completed ? "completed" : ""
                      }`}
                      task={task}
                      taskOwner={taskOwner}
                      taskDeadline={taskDeadline}
                    />
                  </div>
                ))}
            </div>
            <h4 style={{ color: "purple" }} className="mt-5">
              {" "}
              This Week
            </h4>
            <div id="tasks">
              {tasks
                .filter((task) => task.createdAt > 1607904001000)
                .map((task, taskOwner, taskDeadline, createdAt) => (
                  <div key={task.id}>
                    <Task
                      className={`todo-item ${
                        task.completed ? "completed" : ""
                      }`}
                      task={task}
                      taskOwner={taskOwner}
                      taskDeadline={taskDeadline}
                      createdAt={createdAt}
                    />
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <SignIn />
        )}
      </section>
    </div>
  );
}

// function SignOut() {
//   return (
//     auth.currentUser && (
//       <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
//     )
//   );
// }
// // <button className="complete-btn">
// <i className="fas fa-check"></i>
// </button>
// useEffect(() => {
//   const unsubscribe = firestore.collection("users").onSnapshot((snapshot) => {
//     const postData = [];
//     snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
//     console.log(postData); // <------

//     setPosts(postData);
//   });
//   return unsubscribe;
// }, []);

// const completeHandler = () => {
//   setTasks(
//     tasks.map((task) => {
//       if (task.id === task.id) {
//         return {
//           ...task,
//           completed: !task.completed,
//         };
//       }
//       return task;
//     })
//   );
// };

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
