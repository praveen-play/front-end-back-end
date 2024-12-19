import React, { useState } from "react";
import "./stock.css";
import stockImage from "./image/stock.png";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Stock() {
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
              <img id="userImage" src={stockImage} alt="" />
            </div>
            <div>
              <h2 className="fs-5  fw-semibold ">Stock Management</h2>
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
                    <th scope="col">I.Code</th>
                    <th scope="col">Name</th>
                    <th scope="col">Opening</th>
                    <th scope="col">Sale</th>
                    <th scope="col">Purchased</th>
                    <th scope="col">Closing</th>
                    <th scope="col">Tot.In.Cost</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">
                  <tr>
                    <th scope="row">66756</th>
                    <td>Samaposha 200g Pkt</td>
                    <td>100</td>
                    <td>5</td>
                    <td>2</td>
                    <td>97</td>
                    <td>456777.00</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-outline-success"
                        id="actionButton"
                      >
                        U
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="row m-1">
            <div className="col-lg-4 col-sm-12">
              <div >
                <div class="input-group input-group-sm mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="By item code.."
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
              <div >
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
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <div >
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
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center ">
            <div className="row">
            <div className="col">
              <DatePicker
                selected={selectedStartDate}
                onChange={handleStartDate}
                placeholderText="Strat Date"
                className="m-1 "
                id="datePicker"
              />
            </div>
            <div className="col">
              <DatePicker
                selected={selectedEndDate}
                onChange={handleEndDate}
                placeholderText="End Date"
                className="m-1"
                id="datePicker"
              />
            </div>
            </div>
          </div>

          <div className="row m-1">
            <div className="d-flex justify-content-between  m-2">
              <div>
                <Link to="/">
                  <button type="button" class="btn btn-outline-light shadow ">
                    Home
                  </button>
                </Link>
              </div>
              <div>
                <Link to="/bill">
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

export default Stock;
