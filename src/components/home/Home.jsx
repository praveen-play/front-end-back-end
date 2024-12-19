import React, { useEffect, useState } from "react";
import "./home.css";
import billImage from "./images/bill.png";
import customerImage from "./images/costumer.png";
import creditImage from "./images/credit.png";
import itemImage from "./images/item.png";
import settingsImage from "./images/setting.png";
import reprintImage from "./images/reprint.png";
import grnImage from "./images/grn.png";
import reportImage from "./images/report.png";
import { Link } from "react-router-dom";
import Bill from "../bill/Bill";
import { useAuth } from "../../utils/AuthContext";
import axios from "axios";

function Home() {
  const { logout } = useAuth();
  const { loginUsername } = useAuth();
  const { jwtToken } = useAuth();
  const [user, setUser] = useState(null);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  useEffect(() => {
       axios.get(
          "http://localhost:8080/user/" + loginUsername,
          config
        )
        .then((rsp)=>{
          setUser(rsp.data);
          
        })
        .catch((e)=>{
          console.log(e);
        });
      
  }, []);

  return (
    <div>
      <div className="row d-flex">
        <div className="d-flex  justify-content-end my-2">
          <Link to="/login">
            <button
              onClick={logout}
              type="button"
              class="btn btn-outline-light"
            >
              LogOut
            </button>
          </Link>
        </div>
      </div>
      <div className="row d-flex justify-content-center ">
        <div className="col-lg-3 col-sm-6" id="cardImage">
          <div className="container">
            <div class="card text-center shadow ">
              <img
                src={billImage}
                class="card-img-top mx-auto "
                alt="..."
                id="image"
              />
              <div class="card-body">
                <Link to="/bill">
                  <button className="button"> Bill</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6" id="cardImage">
          <div className="container">
            <div class="card text-center shadow ">
              <img
                src={customerImage}
                class="card-img-top mx-auto "
                alt="..."
                id="image"
              />
              <div class="card-body">
                <Link to={"/customer"}>
                  <button className="button"> Customer</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6" id="cardImage">
          <div className="container">
            <div class="card text-center shadow ">
              <img
                src={creditImage}
                class="card-img-top mx-auto "
                alt="..."
                id="image"
              />
              <div class="card-body">
                <button className="button"> Credit</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6" id="cardImage">
          <div className="container">
            <div class="card text-center shadow ">
              <img
                src={itemImage}
                class="card-img-top mx-auto "
                alt="..."
                id="image"
              />
              <div class="card-body">
                <Link to="/item">
                  <button className="button"> Item</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-center ">
        <div className="col-lg-3 col-sm-6" id="cardImage">
          <div className="container">
            <div class="card text-center shadow ">
              <img
                src={settingsImage}
                class="card-img-top mx-auto "
                alt="..."
                id="image"
              />
              <div class="card-body">
                <Link to={"/settings"}>
                  <button className="button">User</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-sm-6" id="cardImage">
          <div className="container">
            <div class="card text-center shadow ">
              <img
                src={reprintImage}
                class="card-img-top mx-auto "
                alt="..."
                id="image"
              />
              <div class="card-body">
                <Link to="/reprint">
                  <button className="button">Reprint</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6" id="cardImage">
          <div className="container">
            <div class="card text-center shadow ">
              <img
                src={grnImage}
                class="card-img-top mx-auto "
                alt="..."
                id="image"
              />
              <div class="card-body">
                <button className="button">GRN</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6" id="cardImage">
          <div className="container">
            <div class="card text-center shadow ">
              <img
                src={reportImage}
                class="card-img-top mx-auto "
                alt="..."
                id="image"
              />
              <div class="card-body">
                <button className="button">Report</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
