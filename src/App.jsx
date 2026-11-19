
import React, { Component } from "react";

import { StudentProvider } from "./context/StudentContext";

import Navbar from "./components/Navbar";
import Students from "./components/Students";
import AddStudent from "./components/AddStudent";

import "./App.css";

class App extends Component {

    render() {

        return (
            <StudentProvider>

                <Navbar />

                <main>
                    <AddStudent />
                    <Students />
                </main>

            </StudentProvider>
        );
    }
}

export default App;
