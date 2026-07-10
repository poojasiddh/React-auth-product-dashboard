import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

function Home() {
    const { userData, setUserData } = useContext(UserContext);

    return (

        <div className="table-container1">
            <h1>Users Details</h1>
            <table className="vendor-table1">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Country</th>
                        <th>Phone</th>
                        <th>Skills</th>
                        <th>Gender</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userData.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.admin_email}</td>
                                <td>{item.admin_password}</td>
                                <td>{item.country}</td>
                                <td>{item.phone}</td>
                                <td>{item.skills}</td>
                                <td>{item.gender}</td>
                                <td><button className="edit-btn" >Edit</button>
                                <button className="delete-btn" >Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Home;