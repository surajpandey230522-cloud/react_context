
import React, { Component } from "react";
import StudentContext from "../context/StudentContext";

class Navbar extends Component {

    static contextType = StudentContext;

    render() {

        const { students } = this.context;

        return (
            <nav>
                <h2>Student Management</h2>
                <p>Total Students: {students.length}</p>
            </nav>
        );
    }
}

export default Navbar;
