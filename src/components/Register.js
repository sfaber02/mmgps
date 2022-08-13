import React, {useState} from 'react'
import axios from "axios";

const API = process.env.REACT_APP_API_BACKEND;


export const Register = () => {
    // const [message, setMessage] = useState(() => "");


    // /**
    //  * Creates a new user in the DB
    //  * will need A LOT more input checking here!
    //  * @param {object} e - event object
    //  */
    // const handleNewUserSubmit = (e) => {
    //     e.preventDefault();
    //     setMessage("");
    //     const { username, email, password1, password2 } = e.target.elements;

    //     const userData = {
    //         username: username.value,
    //         email: email.value,
    //         password1: password1.value,
    //         password2: password2.value,
    //     };

    //     //LOTS MORE INPUT CHECKING TO DO HERE
    //     if (userData.password1 !== userData.password2) {
    //         setMessage("Passwords Don't Match!");
    //     } else {
    //         const data = JSON.stringify({
    //             name: userData.username,
    //             email: userData.email,
    //             password: userData.password1,
    //         });

    //         const config = {
    //             method: "post",
    //             url: `${API}/users/register/`,
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             data: data,
    //         };

    //         axios(config)
    //             .then((res) => setMessage("New User Created Successfully!"))
    //             .catch((err) => handleFail(err));
    //     }
    // };


    // return (
    //     <div id="newUser">
    //         <form onSubmit={handleNewUserSubmit}>
    //             <label>Username: </label>
    //             <input
    //                 type="text"
    //                 name="username"
    //                 id="username"
    //                 placeholder="username"
    //                 required
    //             />
    //             <br />
    //             <label>Email: </label>
    //             <input type="text" name="email" placeholder="email" required />
    //             <br />
    //             <label>Password: </label>
    //             <input
    //                 type="password"
    //                 name="password1"
    //                 placeholder="password"
    //                 required
    //             />
    //             <br />
    //             <label>Re-type Password: </label>
    //             <input
    //                 type="password"
    //                 name="password2"
    //                 placeholder="re-type password"
    //                 required
    //             />
    //             <br />
    //             <input type="submit" value="Submit" />
    //         </form>
    //         <button onClick={backToLogin}>Back to Login</button>
    //         <p id="loginMessage">{message}</p>
    //     </div>
    // );
}
