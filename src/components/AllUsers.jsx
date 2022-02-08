import { userDeleted, usersAscending, usersDescending } from "./usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { Link } from "react-router-dom";

export function AllUsers () {
    const dispatch = useDispatch();
    
    const openDeleteModal = function () {
        document.getElementById("myModal").style.display = "block";
    }

    const closeDeleteModal = function () {
        document.getElementById("myModal").style.display = "none";
    }

    window.onclick = function (event) {
        const modal = document.getElementById("myModal");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    var delete_id;
    const [sortUsers, setSortUsers] = useState("ASC");
    const { entities } = useSelector((state) => state.users);

    const handleDelete = (id) => {
        openDeleteModal();
        delete_id = id;
    };

    const completeAction = (id) => {
        closeDeleteModal();
        dispatch(userDeleted({ id }));
    }

    const handleSort = (e) => {
        setSortUsers(e.target.value);
        if (e.target.value === "ASC") { dispatch(usersAscending()) }
        else { dispatch(usersDescending()) }
    }

    return (
        <div>
            <div className="card mt-5">
                <div className="card-header clearfix">
                    User List 
                    
                    <div className="float-end">
                        <select className="form-select form-select" value={sortUsers} onChange={handleSort}>
                            <option value="ASC">A-Z</option>
                            <option value="DESC">Z-A</option>
                        </select>
                    </div>
                    <Link to="/add-user">
                        <button className='btn btn-primary float-end'>Add new</button>
                    </Link> 
                </div>
                <div className="card-body">
                    {entities.length === 0 ? (
                        <div className="alert alert-danger" role="alert">
                            No records
                        </div>
                    ) : 
                    (
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entities.map(({id, name, email, username, address}, i) => (
                                <tr key={i}>
                                    <th scope="row">{id}</th>
                                    <td>{name}</td>
                                    <td>{username}</td>
                                    <td>{email}</td>
                                    <td>{address.city !== undefined ? address.city : "No city"}</td>
                                    <td>
                                        <Link to={`/edit-user/${id}`}>
                                            <button className='btn btn-warning'>Edit</button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => handleDelete(id)}>Delete</button>   
                                    </td>
                                </tr>
                                ))}                                  
                            </tbody>
                        </table>
                    )}
                    
                </div>
            </div>  
            <div id="myModal" className="modal">

                <div className="modal-content">
                    <div className="card">
                        <div className="card-header">
                            Delete
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Want to continue action ?</h5>
                        </div>
                        <div className="card-footer text-muted clearfix">
                            <button type="button" className="btn btn-danger float-end" onClick={() => completeAction(delete_id)}>Delete</button>
                            <button type="button" className="btn btn-secondary float-end" onClick={closeDeleteModal}>Cancel</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}

