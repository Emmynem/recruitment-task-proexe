import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { useState } from "react";
import { userUpdated } from "./usersSlice";
import { Link } from "react-router-dom";

export function EditUser () {
    const { pathname } = useLocation();
    const userId = parseInt(pathname.replace("/edit-user/", ""));

    const user = useSelector((state) =>
        state.users.entities.find((user) => user.id === userId)
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [errorName, setErrorName] = useState(null);
    const [errorEmail, setErrorEmail] = useState(null);

    const handleName = (e) => setName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);

    const handleClick = (e) => {
        e.preventDefault();
        if (name.length === 0) {
            setErrorName("Name is required");
        }
        else if (email.length === 0) {
            setErrorName(null);
            setErrorEmail("Email is required");
        }
        else {
            dispatch(
                userUpdated({
                    id: userId,
                    name,
                    email,
                    username: "No username",
                    address: {
                        city: "No city"
                    }
                })
            );

            setErrorName(null);
            setErrorEmail(null);
            setName("");
            setEmail("");
            navigate("/all-users");
        }

    };

    return (
        <>
            <div className="card mt-5 mb-5">
                <div className="card-header">Edit form</div>
                <div className="card-body">
                    <form className="" name="">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-12 col-lg-6">
                                    <label htmlFor="fullname">Name:</label>
                                    <input type="text" className="form-control" id="fullname" placeholder="Enter name" name="fullname" onChange={handleName}
                                        value={name} />
                                    {errorName ? <p className='text-danger'>{errorName}</p> : <div></div>}
                                </div>
                                <div className="col-12 col-lg-6">
                                    <label htmlFor="email">Email:</label>
                                    <input type="text" className="form-control" id="email" placeholder="Enter email" name="email" onChange={handleEmail}
                                        value={email} />
                                    {errorEmail ? <p className='text-danger'>{errorEmail}</p> : <div></div>}
                                </div>
                            </div>
                        </div>
                        <div className="clearfix">
                            <button type="submit" onClick={handleClick} className="btn btn-success m-3 float-end">Submit</button>
                            <Link to="/all-users"> <button type="button" className="btn btn-outline-danger m-3 float-end">Cancel</button> </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}