import React, { useState } from "react";
import "./reprint.css";
import printerImage from "./image/printer.png";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Reprint() {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleStartDate = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDate = (date) => {
    setSelectedEndDate(date);
  };

  return (
    <div className="container" id="mainContainer1">
      <div className="row shadow mb-2" id="row1">
        <div className="col-lg-12 col-sm-6">
          <div className="container d-flex justify-content-center align-items-center ">
            <div className="mx-1">
              <img id="userImage" src={printerImage} alt="" />
            </div>
            <div>
              <h2 className="fs-5  fw-semibold ">Bill Re-Print</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row  shadow">
        <div className="col">
          <div className="container" id="tableContainer">
            <div className="table-responsive ">
              <table class="table " id="summaryTable">
                <thead>
                  <tr>
                    <th scope="col">INV #</th>
                    <th scope="col">Date & Time</th>
                    <th scope="col">Cashier</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Sale Type</th>
                    <th scope="col">Total</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">
                  <tr>
                    <th scope="row">4534</th>
                    <td>2024/05/30 4.30pm</td>
                    <td>dushan</td>
                    <td>amal</td>
                    <td>credit</td>
                    <td>5645.56</td>
                    <td>Active</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-outline-success mx-1"
                        id="actionButton"
                      >
                        P
                      </button>

                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        id="actionButton"
                      >
                        D
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="row m-1">
            <div className="col-lg-4 col-sm-12">
              <div>
                <div class="input-group input-group-sm mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="By invoice #.."
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              {/* <div >
                <div class="input-group input-group-sm mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="By name.."
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                  >
                    Search
                  </button>
                </div>
              </div> */}
            </div>
            <div className="col-lg-4 col-sm-12">
              {/* <div >
                <div class="input-group input-group-sm mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="By barcode.."
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                  >
                    Search
                  </button>
                </div>
              </div> */}
            </div>
          </div>
          <div className="d-flex justify-content-center ">
            <div className="row align-items-center ">
              <div className="col-lg-4 col-sm-12">
                <div className="mx-2">
                <DatePicker
                  selected={selectedStartDate}
                  onChange={handleStartDate}
                  placeholderText="Strat Date"
                  id="datePicker"
                />
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <div className="mx-2">
                <DatePicker
                  selected={selectedEndDate}
                  onChange={handleEndDate}
                  placeholderText="End Date"
                  className="m-1"
                  id="datePicker"
                />
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <button type="button" class="btn btn-outline-warning shadow ">
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="row m-1">
            <div className="d-flex justify-content-between  m-2">
              <div>
                <Link to="/">
                  {/* <button type="button" class="btn btn-outline-light shadow ">
                    Home
                  </button> */}
                </Link>
              </div>
              <div>
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
  );
}

export default Reprint;
