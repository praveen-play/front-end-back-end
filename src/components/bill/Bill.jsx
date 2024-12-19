import React, { useEffect, useState } from "react";
import "./bill.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useAuth } from "../../utils/AuthContext";
import axios from "axios";
import CurrentDateTime from "./CurrentDateTime";
import Swal from "sweetalert2";

function Bill() {
  const [loginRoleName, setLoginRoleName] = useState("");
  const [inputBarcode, setInputBarcode] = useState("");
  const [getItem, setGetItem] = useState("");
  const [itemName, setItemName] = useState("");
  const [qty, setQty] = useState("");
  const [markedPrice, setMarkedPrice] = useState("");
  const [ourPrice, setOurPrice] = useState("");
  const [discount, setDiscount] = useState("");

  const { isAuthenticated, jwtToken, loginUsername } = useAuth();
  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/" + loginUsername, config)
      .then((rsp) => {
        setLoginRoleName(rsp.data.firstName);
      })
      .catch((e) => {
        alert(e);
      });
  }, [isAuthenticated]);

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRefBtnPay = useRef(null);
  const inputRefQty = useRef(null);
  const inputRefDiscount = useRef(null);

  const handleKeyDown = (event, nextInputRef) => {
    if (event.keyCode == 187) {
      event.preventDefault();
      nextInputRef.current.focus();
    }
  };

  const handleKeyDownEnter = (event, nextInputRef, previousInputRef) => {
    if (event.keyCode == 13) {
      event.preventDefault();
      nextInputRef.current.focus();
    }

    if (event.keyCode == 38) {
      event.preventDefault();
      previousInputRef.current.focus();
    }
  };

  const searchItem = (event, next) => {
    if (event.keyCode == 13) {
      event.preventDefault();
      axios
        .get("http://localhost:8080/itemByBarcode/" + inputBarcode, config)
        .then((rsp) => {
          setGetItem(rsp.data);
          setItemName(rsp.data.name);
          setMarkedPrice(rsp.data.markedPrice);
          setOurPrice(rsp.data.ourPrice);
          next.current.focus();
        })
        .catch((e) => {
          Swal.fire("Wrong Barcode ! ");
        });
    }
  };

  return (
    <div>
      <div className="container" id="billContainer">
        <div className="row d-flex ">
          <div className="col-lg-2 col-sm-12 mt-1">
            <div class="card text-center shadow ">
              <div class="card-body text-center " id="casierCard">
                <h6>{loginRoleName}</h6>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-sm-12 ">
            <div class="input-group input-group-sm mb-1 mt-2  ">
              <input
                ref={inputRef1}
                placeholder="Enter Barcode..."
                type="text"
                class="form-control text-center fw-bold shadow "
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                onKeyDown={(event) => {
                  handleKeyDown(event, inputRef2);
                  searchItem(event, inputRefQty);
                }}
                id="inputBarcode"
                onChange={(e) => {
                  setInputBarcode(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="col-lg-3 col-sm-12 p-0 ">
            <div class="input-group input-group-sm mb-3 mt-2  ">
              <input
                type="text"
                class="form-control fw-bold shadow "
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                value={itemName}
              />
            </div>
          </div>
          <div className="col-lg-1 col-sm-12 p-0 mx-1 ">
            <div class="input-group input-group-sm mb-3 mt-2">
              <input
                ref={inputRefQty}
                type="text"
                class="form-control text-center fw-bold shadow "
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                value={qty}
                onChange={(e) => {
                  setQty(e.target.value);
                }}
                onKeyDown={(e)=>{
                  handleKeyDownEnter(e,inputRefDiscount,inputRefDiscount);
                }}
              />
            </div>
          </div>
          <div className="col-lg-1 col-sm-12 p-0 mx-1">
            <div class="input-group input-group-sm mb-3 mt-2">
              <input
                type="text"
                class="form-control shadow "
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                value={markedPrice}
                onChange={(e) => {
                  setMarkedPrice(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-lg-1 col-sm-12 p-0 mx-1">
            <div class="input-group input-group-sm mb-3 mt-2">
              <input
                type="text"
                class="form-control shadow "
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                value={ourPrice}
                onChange={(e) => {
                  setOurPrice(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-lg-1 col-sm-12 p-0 mx-1">
            <div class="input-group input-group-sm mb-3 mt-2">
              <input
                ref={inputRefDiscount}
                type="text"
                class="form-control shadow-lg "
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                value={discount}
                onChange={(e) => {
                  setDiscount(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        {/* row 2  */}

        <div className="row ">
          <div className="col-lg-2 col-sm-12 m-1 " id="pageColoumn1">
            <div className="col my-1 ">
              <div class="card text-center shadow ">
                <div class="card-body" id="timeDatecard">
                  <h6>
                    <CurrentDateTime />
                  </h6>
                </div>
              </div>
            </div>
            <div className="col my-1">
              <div class="card text-center shadow ">
                <div class="card-body text-center " id="cashRetailCard">
                  <h6>Cash</h6>
                </div>
              </div>
            </div>
            <div className="col my-1">
              <div class="card text-center shadow ">
                <div class="card-body" id="cashRetailCard">
                  <h6>Retail</h6>
                </div>
              </div>
            </div>
            <div className="col my-1">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "10px" }}>
                      #
                    </th>
                    <th scope="col">Des</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">
                  <tr>
                    <th scope="row">1</th>
                    <td>Kasun bill</td>
                    <td>6787</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-lg-8 col-sm-12" id="pageColoumn2">
            <table class="table" id="billTable">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "100px" }}>
                    Item Code
                  </th>
                  <th scope="col">Name</th>
                  <th scope="col ">QTY</th>
                  <th scope="col">Price</th>
                  <th scope="col">OUR</th>
                  <th scope="col">Dis</th>
                  <th scope="col">Total</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr>
                  <td>77654</td>
                  <td>Suger (kg)</td>
                  <td>2</td>
                  <td>270</td>
                  <td>270</td>
                  <td>0</td>
                  <td>540</td>
                  <td>
                    <div>
                      <button class="deleteButton">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 50 59"
                          class="bin"
                        >
                          <path
                            fill="#B5BAC1"
                            d="M0 7.5C0 5.01472 2.01472 3 4.5 3H45.5C47.9853 3 50 5.01472 50 7.5V7.5C50 8.32843 49.3284 9 48.5 9H1.5C0.671571 9 0 8.32843 0 7.5V7.5Z"
                          ></path>
                          <path
                            fill="#B5BAC1"
                            d="M17 3C17 1.34315 18.3431 0 20 0H29.3125C30.9694 0 32.3125 1.34315 32.3125 3V3H17V3Z"
                          ></path>
                          <path
                            fill="#B5BAC1"
                            d="M2.18565 18.0974C2.08466 15.821 3.903 13.9202 6.18172 13.9202H43.8189C46.0976 13.9202 47.916 15.821 47.815 18.0975L46.1699 55.1775C46.0751 57.3155 44.314 59.0002 42.1739 59.0002H7.8268C5.68661 59.0002 3.92559 57.3155 3.83073 55.1775L2.18565 18.0974ZM18.0003 49.5402C16.6196 49.5402 15.5003 48.4209 15.5003 47.0402V24.9602C15.5003 23.5795 16.6196 22.4602 18.0003 22.4602C19.381 22.4602 20.5003 23.5795 20.5003 24.9602V47.0402C20.5003 48.4209 19.381 49.5402 18.0003 49.5402ZM29.5003 47.0402C29.5003 48.4209 30.6196 49.5402 32.0003 49.5402C33.381 49.5402 34.5003 48.4209 34.5003 47.0402V24.9602C34.5003 23.5795 33.381 22.4602 32.0003 22.4602C30.6196 22.4602 29.5003 23.5795 29.5003 24.9602V47.0402Z"
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                          ></path>
                          <path
                            fill="#B5BAC1"
                            d="M2 13H48L47.6742 21.28H2.32031L2 13Z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>77654</td>
                  <td>Suger (kg)</td>
                  <td>2</td>
                  <td>270</td>
                  <td>270</td>
                  <td>0</td>
                  <td>540</td>
                  <td>
                    <div>
                      <button class="deleteButton">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 50 59"
                          class="bin"
                        >
                          <path
                            fill="#B5BAC1"
                            d="M0 7.5C0 5.01472 2.01472 3 4.5 3H45.5C47.9853 3 50 5.01472 50 7.5V7.5C50 8.32843 49.3284 9 48.5 9H1.5C0.671571 9 0 8.32843 0 7.5V7.5Z"
                          ></path>
                          <path
                            fill="#B5BAC1"
                            d="M17 3C17 1.34315 18.3431 0 20 0H29.3125C30.9694 0 32.3125 1.34315 32.3125 3V3H17V3Z"
                          ></path>
                          <path
                            fill="#B5BAC1"
                            d="M2.18565 18.0974C2.08466 15.821 3.903 13.9202 6.18172 13.9202H43.8189C46.0976 13.9202 47.916 15.821 47.815 18.0975L46.1699 55.1775C46.0751 57.3155 44.314 59.0002 42.1739 59.0002H7.8268C5.68661 59.0002 3.92559 57.3155 3.83073 55.1775L2.18565 18.0974ZM18.0003 49.5402C16.6196 49.5402 15.5003 48.4209 15.5003 47.0402V24.9602C15.5003 23.5795 16.6196 22.4602 18.0003 22.4602C19.381 22.4602 20.5003 23.5795 20.5003 24.9602V47.0402C20.5003 48.4209 19.381 49.5402 18.0003 49.5402ZM29.5003 47.0402C29.5003 48.4209 30.6196 49.5402 32.0003 49.5402C33.381 49.5402 34.5003 48.4209 34.5003 47.0402V24.9602C34.5003 23.5795 33.381 22.4602 32.0003 22.4602C30.6196 22.4602 29.5003 23.5795 29.5003 24.9602V47.0402Z"
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                          ></path>
                          <path
                            fill="#B5BAC1"
                            d="M2 13H48L47.6742 21.28H2.32031L2 13Z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-lg-2 col-sm-12">
            <div class="card text-center shadow my-1">
              <div class="card-body text-center" id="totalCard">
                <h6 class="fw-bold fs-3">3496.00</h6>
              </div>
            </div>

            <div class="card text-center shadow ">
              <div class="card-body text-center " id="paymentCard">
                <h6>Payment</h6>
                <div>
                  <h7 id="paymentType">Cash-1 | Credit-2 | Card-3</h7>
                </div>
                <div class="input-group input-group-sm mb-1 mt-2  ">
                  <input
                    ref={inputRef2}
                    type="text"
                    class="form-control text-center my-1 fw-semibold"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    placeholder="Type"
                    onKeyDown={(event) =>
                      handleKeyDownEnter(event, inputRef3, inputRef1)
                    }
                  />
                </div>
                <div class="input-group input-group-sm mb-1 mt-2  ">
                  <input
                    ref={inputRef3}
                    type="text"
                    class="form-control text-center my-1 fw-semibold"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    placeholder="Money"
                    onKeyDown={(event) =>
                      handleKeyDownEnter(event, inputRefBtnPay, inputRef2)
                    }
                  />
                </div>
                <div id="paymentButton">
                  <button
                    ref={inputRefBtnPay}
                    type="button"
                    class="btn btn-outline-danger shadow "
                  >
                    Pay
                  </button>
                </div>
                <div class="d-flex justify-content-end">
                  <Link to="/stock">
                    <button
                      type="button"
                      class="btn btn-outline-warning shadow mx-2 "
                    >
                      Stock
                    </button>
                  </Link>

                  <Link to="/">
                    <button type="button" class="btn btn-outline-light shadow ">
                      Back
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bill;
