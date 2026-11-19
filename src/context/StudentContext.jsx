
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
