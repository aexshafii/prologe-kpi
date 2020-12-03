import React from "react";
import firebase from "firebase/app";
import { Col, Container, Row } from "react-bootstrap";

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
      <div>
        <Container
          style={{
            marginLeft: "0px",
          }}
        >
          <Row className="mt-1">
            <Col
              style={{
                backgroundColor: "#E8E8E8",
                fontSize: "20px",
              }}
            >
              {" "}
              {taskName}
            </Col>
            <Col
              style={{
                backgroundColor: "#E8E8E8",
                marginLeft: "5px",
                fontSize: "20px",
              }}
            >
              {" "}
              {taskQuantity}{" "}
            </Col>
            <Col
              style={{
                backgroundColor: "#E8E8E8",
                marginLeft: "5px",
                fontSize: "20px",
              }}
            >
              {" "}
              {taskOwner}
            </Col>
            <Col
              style={{
                backgroundColor: "#E8E8E8",
                marginLeft: "5px",
                fontSize: "20px",
              }}
            >
              {" "}
              {taskDeadline}
            </Col>
            <Col>
              <button onClick={onDelete}>Delete</button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
//<button onClick={onUpdate}>Update</button>
