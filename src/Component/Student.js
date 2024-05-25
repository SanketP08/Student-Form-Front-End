import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Container, Paper } from "@mui/material";
import { blue } from "@mui/material/colors";

export default function Student() {
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [students, setStudents] = React.useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    const student = { name: name, address: address };
    console.log(student);

    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        console.log("New Student Added");
        // Refresh the list of students after adding a new one
        fetchStudents();
      })
      .catch((error) => {
        console.error("Error adding student:", error);
      });
  };

  const fetchStudents = () => {
    fetch("http://localhost:8080/student/getAll")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((result) => {
        setStudents(result);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  };

  React.useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={{ padding: "15px", marginTop: "15px" }}>
        <h1 style={{ color: blue[500] }}>Add Student</h1>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Student Name"
            variant="standard"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Student Address"
            variant="standard"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button variant="contained" onClick={handleClick}>
            Submit
          </Button>
        </Box>
        <h1>Students</h1>
        <Paper elevation={3} style={{ padding: "15px", marginTop: "15px" }}>
          {students.map((student) => (
            <Paper
              elevation={6}
              style={{ margin: "10px", padding: "15px", textAlign: "left" }}
              key={student.id}
            >
              <div>Id: {student.id}</div>
              <div>Name: {student.name}</div>
              <div>Address: {student.address}</div>
            </Paper>
          ))}
        </Paper>
      </Paper>
    </Container>
  );
}
