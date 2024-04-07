import React from "react";

var order = {
    name: "",
    email: "",
    address: "",
    card: "",
    city: "",
};

function validate(order) {
    let val = true;
    let email = document.getElementById("inputEmail4");
    let name = document.getElementById("inputName");
    let card = document.getElementById("inputCard");
    let zip = document.getElementById("inputZip");
    let state = document.getElementById("inputState");
    let address = document.getElementById("inputAddress");
    let city = document.getElementById("inputCity");
    const alertPlaceholder = document.getElementById("liveAlertPlaceholder");


    function validateElement(condition, element, ) {
        if (condition) {
            element.setAttribute("class", "form-control is-invalid");
            val = false;
            return false;
        } 
        else {
            element.setAttribute("class", "form-control is-valid");
            return true;
        }
    }

    if (validateElement(!email.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ), email)) {
        order.email = email.value;
    }

    validateElement(!zip.value.match( /^[0-9]{5}(?:-[0-9]{4})?$/), zip);
    validateElement(state.value === "Choose", state);

    if (validateElement(address.value.length === 0, address)) {
        order.address = address.value;
    }

    if (validateElement(city.value.length === 0, city)) {
        order.city = city.value;
    }

    if (validateElement(name.value.length === 0, name)) {
        order.name = name.value;
    }

    if (validateElement(!card.value.match(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/), card)) {
        order.card = card.value;
    }

    const alert = (message, type) => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = [
            `<div className="alert alert-${type} alert-dismissible" role="alert">`,
            ` <div>${message}</div>`,
            ' <button type="button" className="btn-close" data-bs-dismiss="alert" arialabel="Close"></button>',
            "</div>",
        ].join("");
        alertPlaceholder.append(wrapper);
    };

    return val;
}

export function Cart({ isActive, changePage, cart, productPrices, resetCart, order}) {

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function inputCardValidator(event) {
        const inputCard = document.querySelector("#inputCard");

        if (!inputCard.value) {
            return event.preventDefault(); // stops modal from being shown
        } else {
            inputCard.value = inputCard.value.replace(/-/g, "");
            let newVal = "";
            for (var i = 0, nums = 0; i < inputCard.value.length; i++) {
                if (nums !== 0 && nums % 4 === 0) {
                    newVal += "-";
                }
                newVal += inputCard.value[i];
                if (isNumeric(inputCard.value[i])) {
                    nums++;
                }
            }
            inputCard.value = newVal;
        }
    }

    return !isActive ? (
        <></>
    ) : (
        <div>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
                crossOrigin="anonymous"
            ></link>
            <script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa"
                crossOrigin="anonymous"
            ></script>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
            ></link>

            <div className="container">
                <div className="row ">
                    <div className="col-3 mt-4">
                        <button
                            onClick={() => changePage("Browse")}
                            id="back-button"
                            className="mb-4 bg-green-200 hover:bg-green-300 py-2 px-2 border-green-700 rounded w-full"
                        >
                            Back to Shopping
                        </button>
                        <div className="border-white border-2 p-4 bg-white rounded">
                            <h1>Cart</h1>
                            <div className="text-left">
                                {Object.keys(cart).map((key) =>
                                    cart[key] > 0 ? (
                                        <div key={key}>
                                            <b>{key}:</b> {cart[key]} x ${productPrices[key].toFixed(2)}
                                        </div>
                                    ) : null
                                )}
                            </div>
                            <br></br>
                            <div>
                                <b>Total without Tax:</b> $
                                {Object.keys(cart)
                                    .map((key) => (cart[key] > 0 ? productPrices[key] : 0))
                                    .reduce(
                                        (total, price, index) =>
                                            total + price * cart[Object.keys(cart)[index]],
                                        0
                                    )
                                    .toFixed(2)}
                            </div>
                            <br></br>
                            <div>
                                <b>Tax:</b> $
                                {Object.keys(cart)
                                    .map((key) => (cart[key] > 0 ? productPrices[key] : 0))
                                    .reduce(
                                        (total, price, index) =>
                                            total + 0.06 * price * cart[Object.keys(cart)[index]],
                                        0
                                    )
                                    .toFixed(2)}
                            </div>
                            <br></br>
                            <div>
                                <b>Total with tax:</b> $
                                {Object.keys(cart)
                                    .map((key) => (cart[key] > 0 ? productPrices[key] : 0))
                                    .reduce(
                                        (total, price, index) =>
                                            total +
                                            price * cart[Object.keys(cart)[index]] +
                                            0.07 * price * cart[Object.keys(cart)[index]],
                                        0
                                    )
                                    .toFixed(2)}
                            </div>
                        </div>
                    </div>

                    <div className="col-8 mt-4">
                        <div className="text-white" id="liveAlertPlaceholder"></div>

                        <form className="row g-3 text-white" id="checkout-form">
                            <div className="col-md-6">
                                <label htmlFor="inputName" className="form-label">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputName"
                                ></input>
                                <div className="valid-feedback">Looks good!</div>
                                <div className="invalid-feedback">Must be like, "John Doe"</div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="inputEmail4" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="inputEmail4"
                                ></input>
                                <div className="valid-feedback">Looks good!</div>
                                <div className="invalid-feedback">
                                    Must be like, "johndoe@blah.com"
                                </div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="inputCard" className="form-label">
                                    Card
                                </label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className="bi-credit-card-fill"></i>
                                    </span>
                                    <input
                                        type="text"
                                        id="inputCard"
                                        className="form-control"
                                        placeholder="XXXX-XXXX-XXXX-XXXX"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        onChange={() => {
                                            inputCardValidator();
                                        }}
                                    ></input>
                                    <div className="valid-feedback">Looks good!</div>
                                    <div className="invalid-feedback">
                                        Must be like, "4444-4444-4444-4444"
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="inputAddress" className="form-label">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputAddress"
                                    placeholder="123 ABC Avenue"
                                ></input>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputAddress2" className="form-label">
                                    Address 2
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputAddress2"
                                    placeholder="Apartment, floor, or studio"
                                ></input>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputCity" className="form-label">
                                    City
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputCity"
                                ></input>
                                <div className="valid-feedback">Looks good!</div>
                                <div className="invalid-feedback">
                                    Must be like, "Ames"
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="inputState" className="form-label">
                                    State
                                </label>
                                <select id="inputState" className="form-select">
                                    <option>Choose</option>
                                    <option>Iowa</option>
                                    <option>California</option>
                                    <option>Florida</option>
                                    <option>New York</option>
                                    <option>Texas</option>
                                    <option>Ohio</option>
                                    <option>Pennsylvania</option>
                                    <option>Illinois</option>
                                    <option>Michigan</option>
                                    <option>Georgia</option>
                                    <option>North Carolina</option>
                                    <option>New Jersey</option>
                                    <option>Virginia</option>
                                    <option>Washington</option>
                                    <option>Arizona</option>
                                    <option>Massachusetts</option>
                                    <option>Tennessee</option>
                                    <option>Indiana</option>
                                    <option>Maryland</option>
                                    <option>Colorado</option>
                                    <option>Missouri</option>
                                    <option>Wisconsin</option>
                                    <option>Minnesota</option>
                                    <option>South Carolina</option>
                                    <option>Alabama</option>
                                    <option>Louisiana</option>
                                    <option>Kentucky</option>
                                    <option>Oregon</option>
                                    <option>Oklahoma</option>
                                    <option>Connecticut</option>
                                    <option>Utah</option>
                                    <option>Iowa</option>
                                    <option>Arkansas</option>
                                    <option>Nevada</option>
                                    <option>Mississippi</option>
                                    <option>Kansas</option>
                                    <option>New Mexico</option>
                                    <option>Nebraska</option>
                                    <option>West Virginia</option>
                                    <option>Idaho</option>
                                    <option>Hawaii</option>
                                    <option>New Hampshire</option>
                                    <option>Maine</option>
                                    <option>Montana</option>
                                    <option>South Dakota</option>
                                    <option>North Dakota</option>
                                    <option>Alaska</option>
                                    <option>Vermont</option>
                                    <option>Wyoming</option>
                                    <option>Rhode Island</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="inputZip" className="form-label">
                                    Zip
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputZip"
                                ></input>
                            </div>
                            <div className="col-12">
                                <button
                                    type="submit"
                                    className="btn btn-success my-4"
                                    onClick={(event) => {
                                        if (!validate(order)) {
                                            const alertPlaceholder = document.getElementById(
                                                "liveAlertPlaceholder"
                                            );
                                            alertPlaceholder.innerHTML = "";
                                            alert("Please enter the missing details.");
                                            event.preventDefault();
                                            event.stopPropagation();
                                        } else {
                                            changePage("Confirmation");
                                        }
                                        event.preventDefault();
                                        event.stopPropagation();
                                    }}
                                >
                                    {" "}
                                    <i className="bi-bag-check"></i> Order
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        </div>
    );
}