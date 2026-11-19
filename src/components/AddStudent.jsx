
import React, { Component } from "react";
import StudentContext from "../context/StudentContext";

class AddStudent extends Component {

    static contextType = StudentContext;

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            course: ""
        };
    }

    handleChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        });

    };

    handleSubmit = (event) => {

        event.preventDefault();

        const { name, course } = this.state;

        if (!name.trim() || !course.trim()) {
            alert("Please fill all fields");
            return;
        }

        this.context.addStudent(
            name.trim(),
            course.trim()
        );

        this.setState({
            name: "",
            course: ""
        });
    };

    render() {

        return (
            <div className="form-container">

                <h2>Add Student</h2>

                <form onSubmit={this.handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter student name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />

                    <input
                        type="text"
                        name="course"
                        placeholder="Enter course"
                        value={this.state.course}
                        onChange={this.handleChange}
                    />

                    <button type="submit">
                        Add Student
                    </button>

                </form>

            </div>
        );
    }
}

export default AddStudent;
