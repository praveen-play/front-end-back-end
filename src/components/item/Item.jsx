import React, { useEffect, useRef, useState } from "react";
import "./item.css";
import productImage from "./image/products.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../utils/AuthContext";
import axios from "axios";
import moment from "moment";

function Item() {
  const inputItemName = useRef();
  const inputItemCost = useRef();
  const inputMarkedPrice = useRef();
  const inputOurPrice = useRef();
  const inputBarcode = useRef();
  const inputCategory = useRef();
  const inputSupplier = useRef();
  const inputSubmitButton = useRef();

  const [itemCode,setItemCode]=useState("");
  const [itemName, setItemName] = useState("");
  const [itemCost, setItemCost] = useState("");
  const [markedPrice, setMarkedPrice] = useState("");
  const [ourPrice, setOurPrice] = useState("");
  const [barcode, setBarcode] = useState("");
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");
  const [updateDateTime, setUpdateDateTime] = useState("");
  const [updatingUser, setUpdatingUser] = useState("");
  const [editItem, setEditItem] = useState("");
  const [itemList, setItemList] = useState([]);
  const [getItem,setGetItem]=useState("");
  const [inputItemByCode, setInputItemByCode]=useState("");
  const [inputItemByName, setInputItemByName]=useState("");
  const [inputItemByBarcode, setInputItemByBarcode]=useState("");

  const { jwtToken, isAuthenticated, loginUsername } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  const handleKeyEnter = (e, next, previous) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      next.current.focus();
    }
    if (e.keyCode == 38) {
      e.preventDefault();
      previous.current.focus();
    }
  };

  const clearTextFiels = () => {
    setItemName("");
    setItemCost("");
    setMarkedPrice("");
    setOurPrice("");
    setBarcode("");
    setCategory("");
    setSupplier("");
    setItemCode("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isAuthenticated) {
      if ((itemName != "") & (ourPrice != "")) {
        const data = {
          name: itemName,
          itemCost: itemCost,
          markedPrice: markedPrice,
          ourPrice: ourPrice,
          barcode: barcode,
          supplier: supplier,
          category: category,
          updatingUser: loginUsername,
        };

        axios
          .post("http://localhost:8080/item", data, config)
          .then((rsp) => {
            clearTextFiels();
            loadTable();
            toast.success("Item Saved ", {
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
            console.log(e);
          });
      } else {
        toast.warn("Please check input feilds !", {
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
    } else {
      alert("Invalid Login");
    }
  };

  useEffect(() => {
    loadTable();
  }, []);

  const loadTable = () => {
    axios
      .get("http://localhost:8080/item", config)
      .then((rsp) => {
        setItemList(rsp.data);
      })
      .catch((e) => {
        alert("errorofLoadTable");
      });
  };

  const handleDelete = (eachItem) => {
    axios
      .delete("http://localhost:8080/item/" + eachItem.itemCode, config)
      .then((rsp) => {
        loadTable();
        toast.success("Item Deleted !", {
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
  };

  const handleUpdate = () => {
    if ((itemName != "") & (ourPrice != "")) {
      const data = {
        itemCode:itemCode,
        name: itemName,
        itemCost: itemCost,
        markedPrice: markedPrice,
        ourPrice: ourPrice,
        barcode: barcode,
        supplier: supplier,
        category: category,
        updatingUser: loginUsername,
      };
      axios
        .put("http://localhost:8080/item",data,config)
        .then((rsp) => {
          loadTable();
          clearTextFiels();
          setEditItem("");
          toast.success("Updated !", {
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
    }
  };

  const findItemByItemCode=()=>{
    axios.get("http://localhost:8080/itemByItemCode/"+inputItemByCode,config)
    .then((rsp)=>{
      setGetItem(rsp.data);

    })
    .catch((e)=>{
      alert(e);
    })
  }
  const findItemByItemName=()=>{
    axios.get("http://localhost:8080/itemByItemName/"+inputItemByName,config)
    .then((rsp)=>{
      setGetItem(rsp.data);
      
    })
    .catch((e)=>{
      alert(e);
    })
  }
  const findItemByItemBarcode=()=>{
    axios.get("http://localhost:8080/itemByBarcode/"+inputItemByBarcode,config)
    .then((rsp)=>{
      setGetItem(rsp.data);
      
    })
    .catch((e)=>{
      alert(e);
    })
  }

  return (
    <div className="container" id="mainContainer1">
      <ToastContainer />
      <div className="row shadow mb-2" id="row1">
        <div className="col-lg-12 col-sm-6">
          <div className="container d-flex justify-content-center align-items-center ">
            <div className="mx-1">
              <img id="userImage" src={productImage} alt="" />
            </div>
            <div>
              <h2 className="fs-5  fw-semibold ">Item Master</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row  shadow">
        <div className="col-lg-3 col-sm-12 p-3">
          <div className="m-2 ">
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Name
              </span>
              <input
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                ref={inputItemName}
                onKeyDown={(e) =>
                  handleKeyEnter(e, inputItemCost, inputItemName)
                }
                onChange={(e) => setItemName(e.target.value)}
                value={itemName}
              />
            </div>
          </div>
          <div className="m-2 ">
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Cost .
              </span>
              <input
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                ref={inputItemCost}
                onKeyDown={(e) =>
                  handleKeyEnter(e, inputMarkedPrice, inputItemName)
                }
                onChange={(e) => setItemCost(e.target.value)}
                value={itemCost}
              />
            </div>
          </div>
          <div className="m-2 ">
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                M. Price .
              </span>
              <input
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                ref={inputMarkedPrice}
                onKeyDown={(e) =>
                  handleKeyEnter(e, inputOurPrice, inputItemCost)
                }
                onChange={(e) => setMarkedPrice(e.target.value)}
                value={markedPrice}
              />
            </div>
          </div>
          <div className="m-2 ">
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                O. Price .
              </span>
              <input
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                ref={inputOurPrice}
                onKeyDown={(e) =>
                  handleKeyEnter(e, inputBarcode, inputMarkedPrice)
                }
                onChange={(e) => setOurPrice(e.target.value)}
                value={ourPrice}
              />
            </div>
          </div>
          <div className="m-2 ">
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Barcode
              </span>
              <input
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                ref={inputBarcode}
                onKeyDown={(e) =>
                  handleKeyEnter(e, inputCategory, inputOurPrice)
                }
                onChange={(e) => setBarcode(e.target.value)}
                value={barcode}
              />
            </div>
          </div>
          <div className="m-2">
            <select
              class="form-select form-select-sm"
              aria-label="Small select example"
              ref={inputCategory}
              onKeyDown={(e) => handleKeyEnter(e, inputSupplier, inputBarcode)}
              onChange={(e) => {
                if (e.target.value === "1") {
                  setCategory("Vegetables");
                } else if (e.target.value === "2") {
                  setCategory("Dairy");
                } else if (e.target.value === "3") {
                  setCategory("Beverages");
                } else if (e.target.value === "4") {
                  setCategory("Fruits");
                } else if (e.target.value === "5") {
                  setCategory("Baby Products");
                } else if (e.target.value === "6") {
                  setCategory("Household");
                } else if (e.target.value === "7") {
                  setCategory("Cooking Essentials");
                } else if (e.target.value === "8") {
                  setCategory("Bakery");
                } else if (e.target.value === "9") {
                  setCategory("Frozen Food");
                } else if (e.target.value === "10") {
                  setCategory("Meats");
                } else if (e.target.value === "11") {
                  setCategory("Rice");
                } else if (e.target.value === "12") {
                  setCategory("Snacks");
                }
              }}
              value={
                category === "Vegetables"
                  ? "1"
                  : category === "Dairy"
                  ? "2"
                  : category === "Beverages"
                  ? "3"
                  : category === "Fruits"
                  ? "4"
                  : category === "Baby Products"
                  ? "5"
                  : category === "Household"
                  ? "6"
                  : category === "Cooking Essentials"
                  ? "7"
                  : category === "Bakery"
                  ? "8"
                  : category === "Frozen Food"
                  ? "9"
                  : category === "Meats"
                  ? "10"
                  : category === "Rice"
                  ? "11"
                  : category === "Snacks"
                  ? "12"
                  : ""
              }
            >
              <option selected value="">
                Select Category
              </option>
              <option value="1">Vegetables</option>
              <option value="2">Dairy</option>
              <option value="3">Beverages</option>
              <option value="4">Fruits</option>
              <option value="5">Baby Products</option>
              <option value="6">Household</option>
              <option value="7">Cooking Essentials</option>
              <option value="8">Bakery</option>
              <option value="9">Frozen Food</option>
              <option value="10">Meats</option>
              <option value="11">Rice</option>
              <option value="12">Snacks</option>
            </select>
          </div>

          <div className="m-2">
            <select
              class="form-select form-select-sm"
              aria-label="Small select example"
              ref={inputSupplier}
              onKeyDown={(e) =>
                handleKeyEnter(e, inputSubmitButton, inputCategory)
              }
              onChange={(e) => {
                if (e.target.value === "1") {
                  setSupplier("Gills meat Products (pvt) ltd");
                } else if (e.target.value === "2") {
                  setSupplier("Uniliver");
                } else if (e.target.value === "3") {
                  setSupplier("Nestle products");
                }
              }}
              value={
                supplier === "Gills meat Products (pvt) ltd"
                  ? "1"
                  : supplier === "Uniliver"
                  ? "2"
                  : supplier === "Nestle products"
                  ? "3"
                  : ""
              }
            >
              <option selected value="">
                Select Supplier
              </option>
              <option value="1">Gills meat Products (pvt) ltd</option>
              <option value="2">Uniliver</option>
              <option value="3">Nestle products</option>
            </select>
          </div>

          {!editItem && (
            <div>
              <button
                onClick={handleSubmit}
                ref={inputSubmitButton}
                type="button"
                class="btn btn-outline-warning shadow "
              >
                Submit
              </button>
            </div>
          )}
          {editItem && (
            <div className="m-3">
              <button
                ref={inputSubmitButton}
                type="button"
                class="btn btn-outline-success shadow "
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          )}
          {editItem && (
            <div>
              <button
                onClick={() => {
                  setEditItem("");
                  clearTextFiels();
                }}
                type="button"
                class="btn btn-outline-danger shadow "
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="col-lg-9 col-sm-12 p-3">
          <div className="container" id="tableContainer">
            <div className="table-responsive ">
              <table class="table " id="summaryTable">
                <thead>
                  <tr>
                    <th scope="col">I.Code</th>
                    <th scope="col">Name</th>
                    <th scope="col">Cost</th>
                    <th scope="col">M.Price</th>
                    <th scope="col">O.Price</th>
                    <th scope="col">Barcode</th>
                    <th scope="col">Supplier</th>
                    <th scope="col">Category</th>
                    <th scope="col">U.Date/Time</th>
                    <th scope="col">U.User</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">
                  {itemList &&
                    itemList.map((eachItem) => (
                      <tr key={eachItem.itemCode}>
                        <th scope="row">{eachItem.itemCode}</th>
                        <td>{eachItem.name}</td>
                        <td>{eachItem.itemCost}</td>
                        <td>{eachItem.markedPrice}</td>
                        <td>{eachItem.ourPrice}</td>
                        <td>{eachItem.barcode}</td>
                        <td>{eachItem.supplier}</td>
                        <td>{eachItem.category}</td>
                        <td>
                          {moment(eachItem.updatedDate).format(
                            "MM/DD/YYYY, HH:mm:ss"
                          )}
                        </td>
                        <td>{eachItem.updatingUser}</td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-outline-success"
                            id="actionButton"
                            onClick={(e) => {
                              setEditItem(eachItem);
                              setItemName(eachItem.name);
                              setItemCost(eachItem.itemCost);
                              setMarkedPrice(eachItem.markedPrice);
                              setOurPrice(eachItem.ourPrice);
                              setBarcode(eachItem.barcode);
                              setCategory(eachItem.category);
                              setSupplier(eachItem.supplier);
                              setItemCode(eachItem.itemCode);
                            }}
                          >
                            U
                          </button>
                          <button
                            type="button"
                            class="btn btn-outline-danger"
                            id="actionButton"
                            onClick={() => handleDelete(eachItem)}
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

          <div className="row m-2">
            <div className="col-lg-4 col-sm-12">
              <div className="m-2 ">
                <div class="input-group input-group-sm mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="By item code.."
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    onChange={(e)=>{
                      setInputItemByCode(e.target.value);
                    }}
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    onClick={findItemByItemCode}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <div className="m-2 ">
                <div class="input-group input-group-sm mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="By name.."
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    onChange={(e)=>{
                      setInputItemByName(e.target.value);
                    }}
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    onClick={findItemByItemName}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <div className="m-2 ">
                <div class="input-group input-group-sm mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="By barcode.."
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    onChange={(e)=>{
                      setInputItemByBarcode(e.target.value);
                    }}
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    onClick={findItemByItemBarcode}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end ">
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
  );
}

export default Item;
