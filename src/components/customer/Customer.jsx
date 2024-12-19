import React, { useEffect, useRef, useState } from "react";
import "./customer.css";
import customerImage from "./image/customer.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../utils/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

function Customer() {
  const inputFirstNameRef = useRef();
  const inputLastNameRef = useRef();
  const inputAgeRef = useRef();
  const inputContactRef = useRef();
  const inputAddressRef = useRef();
  const inputRemarkRef = useRef();
  const inputCreditLimitRef = useRef();
  const inputCustomerTypeRef = useRef();
  const inputSubmitButtonRef = useRef();

  const [customerId, setCustomerId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [remark, setRemark] = useState("");
  const [creditLimit, setCreditLimit] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [editUpdate, setEditUpdate] = useState(null);

  const { jwtToken, isAuthenticated } = useAuth();

  const handleKeyDownEnter = (e, next, previous) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      next.current.focus();
    }
    if (e.keyCode === 38) {
      e.preventDefault();
      previous.current.focus();
    }
  };

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  const cleatTextFiels = () => {
    setFirstName("");
    setLastName("");
    setAge("");
    setContactNo("");
    setAddress("");
    setRemark("");
    setCreditLimit("");
    setCustomerType("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      if (
        (firstName !== "") &
        (contactNo !== "") &
        (creditLimit !== "") &
        (customerType !== "")
      ) {
        const data = {
          firstName: firstName,
          lastName: lastName,
          age: age,
          contactNo: contactNo,
          address: address,
          remark: remark,
          creditLimit: creditLimit,
          customerType: customerType,
        };
        axios
          .post("http://localhost:8080/customer", data, config)
          .then((rsp) => {
            cleatTextFiels();
            updateTable();
            toast.success("Customer Saved !", {
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
            if (e.response.data.error) {
              toast.error(`${e.response.data.error}`, {
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
        if(firstName===""){
          toast.error("Please enter First name !", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }if (contactNo==""){
          toast.error("Please enter Contact no !", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }if (creditLimit==""){
          toast.error("Please enter Credit Limit !", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }else{
          toast.error("Please select Customer type !", {
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
    }
  };

  const updateTable = () => {
    axios
      .get("http://localhost:8080/customer", config)
      .then((rsp) => {
        setCustomerList(rsp.data);
      })
      .catch((e) => {
        alert(e);
      });
  };

  useEffect(() => {
    updateTable();
  }, []);

  const handleUpdate = () => {
    if (
      (firstName != "") &
      (contactNo != "") &
      (creditLimit != "") &
      (customerType != "")
    ) {
      const data = {
        customerId: customerId,
        firstName: firstName,
        lastName: lastName,
        age: age,
        contactNo: contactNo,
        address: address,
        remark: remark,
        creditLimit: creditLimit,
        customerType: customerType,
      };
      axios
        .put("http://localhost:8080/customer", data, config)
        .then(() => {
          updateTable();
          cleatTextFiels();
          setEditUpdate(null);
          toast.success("Customer updated !", {
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
          alert(e);
        });
    } else {
      toast.error("Please check text feilds !", {
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
  };
  const handleDelete = (eachCustomer) => {
    Swal.fire({
      title: "Are you Sure ? ",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "", "success");
        axios
          .delete(
            "http://localhost:8080/customer/" + eachCustomer.customerId,
            config
          )
          .then(() => {
            updateTable();
            cleatTextFiels();
            setEditUpdate(null);
          })
          .catch((e) => {
            alert(e);
          });
      } else if (result.isDenied) {
        cleatTextFiels();
      }
    });
  };

  return (
    <div className="container" id="mainContainer1">
      <ToastContainer />
      <div className="row shadow mb-2" id="row1">
        <div className="col-lg-12 col-sm-6">
          <div className="container d-flex justify-content-center align-items-center ">
            <div className="mx-1">
              <img id="userImage" src={customerImage} alt="" />
            </div>
            <div>
              <h2 className="fs-5  fw-semibold ">Customer Management</h2>
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
                ref={inputFirstNameRef}
                onKeyDown={(e) => {
                  handleKeyDownEnter(e, inputLastNameRef, inputFirstNameRef);
                }}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
                ref={inputLastNameRef}
                onKeyDown={(e) =>
                  handleKeyDownEnter(e, inputAgeRef, inputFirstNameRef)
                }
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
                ref={inputAgeRef}
                onKeyDown={(e) => {
                  handleKeyDownEnter(e, inputContactRef, inputLastNameRef);
                }}
                value={age}
                onChange={(e) => setAge(e.target.value)}
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
                ref={inputContactRef}
                onKeyDown={(e) =>
                  handleKeyDownEnter(e, inputAddressRef, inputAgeRef)
                }
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
              />
            </div>
          </div>
          <div className="m-2 ">
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Address
              </span>
              <input
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                ref={inputAddressRef}
                onKeyDown={(e) =>
                  handleKeyDownEnter(e, inputRemarkRef, inputContactRef)
                }
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="m-2 ">
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Remark
              </span>
              <input
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                ref={inputRemarkRef}
                onKeyDown={(e) =>
                  handleKeyDownEnter(e, inputCreditLimitRef, inputAddressRef)
                }
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
              />
            </div>
          </div>
          <div className="m-2 ">
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Cr. Limit
              </span>
              <input
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                ref={inputCreditLimitRef}
                onKeyDown={(e) =>
                  handleKeyDownEnter(e, inputCustomerTypeRef, inputRemarkRef)
                }
                value={creditLimit}
                onChange={(e) => setCreditLimit(e.target.value)}
              />
            </div>
          </div>

          <div className="m-2">
            <select
              class="form-select form-select-sm"
              aria-label="Small select example"
              ref={inputCustomerTypeRef}
              onKeyDown={(e) =>
                handleKeyDownEnter(e, inputSubmitButtonRef, inputCreditLimitRef)
              }
              onChange={(e) => {
                if (e.target.value === "1") {
                  setCustomerType("GOLD");
                } else if (e.target.value === "2") {
                  setCustomerType("PLATINUM");
                } else if (e.target.value === "3") {
                  setCustomerType("SILVER");
                }
              }}
              value={
                customerType === "GOLD"
                  ? "1"
                  : customerType === "PLATINUM"
                  ? "2"
                  : customerType === "SILVER"
                  ? "3"
                  : ""
              }
            >
              <option selected value="">
                Select Customer Type
              </option>
              <option value="1">GOLD</option>
              <option value="2">PLATINUM</option>
              <option value="3">SILVER</option>
            </select>
          </div>
          <div className="container d-flex justify-content-center ">
            {!editUpdate && (
              <div>
                <button
                  onClick={handleSubmit}
                  ref={inputSubmitButtonRef}
                  type="button"
                  class="btn btn-outline-warning shadow "
                >
                  Submit
                </button>
              </div>
            )}

            {editUpdate && (
              <div>
                <button
                  onClick={handleUpdate}
                  ref={inputSubmitButtonRef}
                  type="button"
                  class="btn btn-outline-success shadow mx-3"
                >
                  Update
                </button>
              </div>
            )}
            {editUpdate && (
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setEditUpdate(null);
                    cleatTextFiels();
                  }}
                  type="button"
                  class="btn btn-outline-danger shadow "
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
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
                    <th scope="col">Address</th>
                    <th scope="col">Remark</th>
                    <th scope="col">Cr. Limit</th>
                    <th scope="col">Type</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">
                  {customerList &&
                    customerList.map((eachCustomer) => (
                      <tr key={eachCustomer.customerId}>
                        <th scope="row">{eachCustomer.customerId}</th>
                        <td>{eachCustomer.firstName}</td>
                        <td>{eachCustomer.lastName}</td>
                        <td>{eachCustomer.age}</td>
                        <td>{eachCustomer.contactNo}</td>
                        <td>{eachCustomer.address}</td>
                        <td>{eachCustomer?.remark}</td>
                        <td>{eachCustomer.creditLimit}</td>
                        <td>{eachCustomer.customerType}</td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-outline-success "
                            id="actionButton"
                            onClick={(e) => {
                              e.preventDefault();
                              setEditUpdate(eachCustomer);
                              setCustomerId(eachCustomer.customerId);
                              setFirstName(eachCustomer.firstName);
                              setLastName(eachCustomer.lastName);
                              setAge(eachCustomer.age);
                              setContactNo(eachCustomer.contactNo);
                              setAddress(eachCustomer.address);
                              setRemark(eachCustomer.remark);
                              setCreditLimit(eachCustomer.creditLimit);
                              setCustomerType(eachCustomer.customerType);
                            }}
                          >
                            U
                          </button>
                          <button
                            type="button"
                            class="btn btn-outline-danger"
                            id="actionButton"
                            onClick={() => {
                              handleDelete(eachCustomer);
                            }}
                          >
                            D
                          </button>
                        </td>
                        <td></td>
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

export default Customer;
