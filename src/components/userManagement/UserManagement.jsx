import React, { useEffect, useRef, useState } from "react";
import "./userManagement.css";
import { Link } from "react-router-dom";
import userImage from "./image/user.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../utils/AuthContext";
import Swal from "sweetalert2";

function UserManagement() {
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [age, setAge] = useState(null);
  const [contactNo, setContactNo] = useState(null);
  const [nicNumber, setNicNumber] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [role, setRole] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const { isAuthenticated, jwtToken } = useAuth();
  const inputFirstNameRef = useRef(null);
  const inputLastNameRef = useRef(null);
  const inputAgeRef = useRef(null);
  const inputContatcNoRef = useRef(null);
  const inputNicNumberRef = useRef(null);
  const inputUsernameRef = useRef(null);
  const inputPasswordRef = useRef(null);
  const inputRoleRef = useRef(null);
  const inputSubmitButtonRef = useRef(null);
  const [updateUser, setUpdateUser] = useState(null);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  const clearTextFields = () => {
    setFirstName("");
    setLastName("");
    setAge("");
    setContactNo("");
    setNicNumber("");
    setUsername("");
    setPassword("");
    setRole("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      if (
        (username != "") &
        (password != "") &
        (nicNumber != "") &
        (contactNo != "") &
        (age != "") &
        (firstName != "") &
        (lastName != "")
      ) {
        const data = {
          firstName: firstName,
          lastName: lastName,
          age: age,
          contactNumber: contactNo,
          nicNumber: nicNumber,
          username: username,
          password: password,
          userRole: role,
        };

        axios
          .post("http://localhost:8080/user", data, config)
          .then((rsp) => {
            clearTextFields();
            updateUsersTable();
            toast.success("Successfully saved !", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          })
          .catch((error) => {
            if (error.response.data.error) {
              toast.error(`${error.response.data.error}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            } else {  
              toast.error("Please check the text fields !", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            }
          });
      } else {
        toast.error("Empty text fields !", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  const updateUsersTable = () => {
    axios
      .get("http://localhost:8080/user", config)
      .then((rsp) => {
        setUsersList(rsp.data);
      })
      .catch((e) => {
        alert("Error");
      });
  };

  useEffect(() => {
    updateUsersTable();
  }, []);

  const handleKeyDownEnter = (e, next, previous) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      next.current.focus();
    }
    if (e.keyCode == 38) {
      e.preventDefault();
      previous.current.focus();
    }
  };

  return (
    <div className="container" id="mainContainer1">
      <ToastContainer />
      <div className="row shadow mb-2" id="row1">
        <div className="col-lg-12 col-sm-6">
          <div className="container d-flex justify-content-center align-items-center ">
            <div className="mx-1">
              <img id="userImage" src={userImage} alt="" />
            </div>
            <div>
              <h2 className="fs-5  fw-semibold ">User Authentication</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row  shadow">
        <div className="col-lg-4 col-sm-12 p-3">
          <div className="m-2 ">
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                First Name
              </span>
              <input
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                value={firstName}
                onKeyDown={(e) => {
                  handleKeyDownEnter(e, inputLastNameRef, inputFirstNameRef);
                }}
                ref={inputFirstNameRef}
              />
            </div>
          </div>
          <div className="m-2 ">
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Last Name
              </span>
              <input
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                value={lastName}
                ref={inputLastNameRef}
                onKeyDown={(e) => {
                  handleKeyDownEnter(e, inputAgeRef, inputFirstNameRef);
                }}
              />
            </div>
          </div>
          <div className="m-2 ">
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Age
              </span>
              <input
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                value={age}
                ref={inputAgeRef}
                onKeyDown={(e) => {
                  handleKeyDownEnter(e, inputContatcNoRef, inputLastNameRef);
                }}
              />
            </div>
          </div>
          <div className="m-2 ">
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Contact No
              </span>
              <input
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                onChange={(e) => {
                  setContactNo(e.target.value);
                }}
                value={contactNo}
                ref={inputContatcNoRef}
                onKeyDown={(e) => {
                  handleKeyDownEnter(e, inputNicNumberRef, inputAgeRef);
                }}
              />
            </div>
          </div>
          <div className="m-2 ">
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                NIC Number
              </span>
              <input
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                onChange={(e) => {
                  setNicNumber(e.target.value);
                }}
                value={nicNumber}
                ref={inputNicNumberRef}
                onKeyDown={(e) => {
                  handleKeyDownEnter(e, inputUsernameRef, inputContatcNoRef);
                }}
              />
            </div>
          </div>
          <div className="m-2 ">
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Username
              </span>
              <input
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
                ref={inputUsernameRef}
                onKeyDown={(e) => {
                  handleKeyDownEnter(e, inputPasswordRef, inputNicNumberRef);
                }}
              />
            </div>
          </div>
          <div className="m-2 ">
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Password
              </span>
              <input
                type="password"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                ref={inputPasswordRef}
                onKeyDown={(e) => {
                  handleKeyDownEnter(e, inputRoleRef, inputUsernameRef);
                }}
              />
            </div>
          </div>
          <div className="m-2">
            <select
              class="form-select form-select-sm"
              aria-label="Small select example"
              onChange={(e) => {
                if (e.target.value === "1") {
                  setRole("Casier");
                } else if (e.target.value === "2") {
                  setRole("Admin");
                }
            
              }}
              ref={inputRoleRef}
              onKeyDown={(e) => {
                handleKeyDownEnter(e, inputSubmitButtonRef, inputPasswordRef);
              }}
            >
              <option value="1">Casier</option>
              <option value="2">Admin</option>
            </select>
          </div>
          {!updateUser && (
            <div>
              <button
                onClick={handleSubmit}
                type="button"
                class="btn btn-outline-warning shadow "
                ref={inputSubmitButtonRef}
              >
                Submit
              </button>
            </div>
          )}

          {updateUser && (
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    (username != "") &
                    (nicNumber != "") &
                    (contactNo != "") &
                    // (password!="")&
                    (age != "") &
                    (firstName != "") &
                    (lastName != "")
                  ) {
                    const data = {
                      id: userId,
                      firstName: firstName,
                      lastName: lastName,
                      age: age,
                      contactNumber: contactNo,
                      nicNumber: nicNumber,
                      username: username,
                      password: password,
                      userRole: role,
                    };
                    axios
                      .put("http://localhost:8080/user", data, config)
                      .then((rsp) => {
                        updateUsersTable();
                        clearTextFields();
                        setUpdateUser(null);
                        toast.info("User Updated !", {
                          position: "top-center",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                        });
                      })
                      .catch((e) => {
                        alert("Error");
                      });
                  }else{
                    toast.error("Empty text fields !", {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    });
                  }
                }}
                type="button"
                class="btn btn-outline-success shadow mx-3"
                ref={inputSubmitButtonRef}
              >
                Update
              </button>
              <button
                onClick={() => {
                  setUpdateUser(null);
                  clearTextFields();
                }}
                type="button"
                class="btn btn-outline-danger shadow "
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="col-lg-8 col-sm-12 p-3">
          <div className="container" id="tableContainer">
            <div className="table-responsive ">
              <table class="table " id="summaryTable">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Age</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Nic</th>
                    <th scope="col">Username</th>
                    <th scope="col">Role</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">
                  {usersList &&
                    usersList.map((eachUser) => (
                      <tr key={eachUser.id}>
                        <th scope="row">{eachUser.id}</th>
                        <td>{eachUser.firstName}</td>
                        <td>{eachUser.lastName}</td>
                        <td>{eachUser.age}</td>
                        <td>{eachUser.contactNumber}</td>
                        <td>{eachUser.nicNumber}</td>
                        <td>{eachUser.username}</td>
                        <td>{eachUser.userRole}</td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-outline-success"
                            id="actionButton"
                            onClick={(e) => {
                              e.preventDefault();
                              setUpdateUser(eachUser);
                              setFirstName(eachUser.firstName);
                              setLastName(eachUser.lastName);
                              setAge(eachUser.age);
                              setContactNo(eachUser.contactNumber);
                              setNicNumber(eachUser.nicNumber);
                              setUsername(eachUser.username);
                              setRole(eachUser.userRole);
                              
                              setUserId(eachUser.id);
                            }}
                          >
                            U
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-outline-danger"
                            id="actionButton"
                            onClick={(e) => {
                              e.preventDefault();
                              setUpdateUser(null);
                              clearTextFields();

                              Swal.fire({
                                title: "Are you sure ?",
                                showDenyButton: true,
                                confirmButtonText: "Delete",
                                denyButtonText: `Cancel`,
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  axios
                                    .delete(
                                      "http://localhost:8080/user/" +
                                        eachUser.id,
                                      config
                                    )
                                    .then(() => {
                                      clearTextFields();
                                      toast.success("User Deleted !", {
                                        position: "top-center",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "colored",
                                      });
                                      updateUsersTable();
                                    })
                                    .catch();
                                } else if (result.isDenied) {
                                }
                              });
                            }}
                          >
                            D
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="m-2 d-flex  justify-content-end ">
            <Link to={"/"}>
              <button type="button" class="btn btn-outline-light shadow ">
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
