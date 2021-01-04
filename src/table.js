import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import "bootstrap/dist/css/bootstrap.min.css";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableRightBorder: {
    borderWidth: 0,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    backgroundColor: "#E8E8E8",

    borderColor: "white",
    borderStyle: "solid",
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const theme = {
  spacing: 8,
};
export const BasicTable = ({ tasks }) => {
  console.log(tasks);
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="right">Progress&nbsp;(%)</TableCell>
            <TableCell align="right">Owner</TableCell>
            <TableCell align="right">Due Date</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell
                className={classes.tableRightBorder}
                scope="row"
              ></TableCell>

              <TableCell
                style={{
                  backgroundColor: "#b22222",
                }}
                scope="row"
                align="right"
              >
                {row.calories}
              </TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
