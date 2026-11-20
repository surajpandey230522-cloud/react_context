
import React, { Component, createContext } from "react";

const StudentContext = createContext();

export class StudentProvider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            students: [
                { id: 1, name: "Suraj", course: "React" },
                { id: 2, name: "Rahul", course: "JavaScript" }
            ]
        };
    }

    addStudent = (name, course) => {

        const newStudent = {
            id: Date.now(),
            name: name,
            course: course
        };

        this.setState(prevState => ({
            students: [
                ...prevState.students,
                newStudent
            ]
        }));
    };

    render() {

        return (
            <StudentContext.Provider
                value={{
                    students: this.state.students,
                    addStudent: this.addStudent
                }}
            >
                {this.props.children}
            </StudentContext.Provider>
        );
    }
}

export default StudentContext;




import React, { Component } from "react";

// Reducer function
const studentReducer = (state, action) => {

    switch (action.type) {

        case "ADD":
            return [
                ...state,
                action.payload
            ];

        case "DELETE":
            return state.filter(
                student => student.id !== action.payload
            );

        case "UPDATE":
            return state.map(student =>
                student.id === action.payload.id
                    ? { ...student, ...action.payload }
                    : student
            );

        case "RESET":
            return [];

        default:
            return state;
    }
};

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            students: [],
            name: "",
            course: "",
            editId: null
        };
    }

    // Custom dispatch method
    dispatch = (action) => {

        this.setState(prevState => ({
            students: studentReducer(
                prevState.students,
                action
            )
        }));

    };

    // Handle input
    handleChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        });

    };

    // Add or update student
    handleSubmit = (event) => {

        event.preventDefault();

        const { name, course, editId } = this.state;

        if (!name.trim() || !course.trim()) {
            alert("Please fill all fields");
            return;
        }

        if (editId !== null) {

            this.dispatch({
                type: "UPDATE",
                payload: {
                    id: editId,
                    name: name.trim(),
                    course: course.trim()
                }
            });

        } else {

            this.dispatch({
                type: "ADD",
                payload: {
                    id: crypto.randomUUID(),
                    name: name.trim(),
                    course: course.trim()
                }
            });

        }

        this.setState({
            name: "",
            course: "",
            editId: null
        });
    };

    // Delete student
    deleteStudent = (id) => {

        this.dispatch({
            type: "DELETE",
            payload: id
        });

        if (this.state.editId === id) {
            this.setState({
                name: "",
                course: "",
                editId: null
            });
        }
    };

    // Edit student
    editStudent = (student) => {

        this.setState({
            name: student.name,
            course: student.course,
            editId: student.id
        });

    };

    // Reset students
    resetStudents = () => {

        this.dispatch({
            type: "RESET"
        });

        this.setState({
            name: "",
            course: "",
            editId: null
        });
    };

    render() {

        const { students, name, course, editId } = this.state;

        return (
            <div className="container">

                <h1>Student Management</h1>

                <h3>Total Students: {students.length}</h3>

                <form onSubmit={this.handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={this.handleChange}
                    />

                    <input
                        type="text"
                        name="course"
                        placeholder="Enter course"
                        value={course}
                        onChange={this.handleChange}
                    />

                    <button type="submit">
                        {editId !== null ? "Update" : "Add"}
                    </button>

                </form>

                <button onClick={this.resetStudents}>
                    Reset All
                </button>

                <h2>Student List</h2>

                {students.map(student => (

                    <div className="card" key={student.id}>

                        <h3>{student.name}</h3>

                        <p>Course: {student.course}</p>

                        <button
                            onClick={() => this.editStudent(student)}
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => this.deleteStudent(student.id)}
                        >
                            Delete
                        </button>

                    </div>

                ))}

            </div>
        );
    }
}

// export default App;
