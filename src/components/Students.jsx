
import React, { Component } from "react";
import StudentContext from "../context/StudentContext";

class Students extends Component {

    static contextType = StudentContext;

    render() {

        const { students } = this.context;

        return (
            <div className="students">

                <h2>Student List</h2>

                {students.map(student => (

                    <div className="student-card" key={student.id}>

                        <h3>{student.name}</h3>

                        <p>Course: {student.course}</p>

                    </div>

                ))}

            </div>
        );
    }
}

export default Students;
