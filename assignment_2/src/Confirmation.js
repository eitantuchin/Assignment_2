import React from "react";

export function Confirmation({ isActive, changePage, cart, productPrices, resetCart, order }) {

    if (isActive) {
        return (
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

                <div className="grid h-screen">
                    <div className="container mx-auto mt-20">
                        <div className="card" style={{ width: "100%; padding: 20px;" }}>
                            <div className="card-body">
                                <h1 className="card-title text-4xl" >Order Confirmation</h1>
                                <h2 className="mt-4 text-xl">Customer Details</h2>

                                <ul className="list-group list-group-flush">
                                    {Object.entries(order).map(
                                        ([key, value]) => (
                                            <li key={key} className="list-group-item">
                                            <b>{key}:</b> {key === "card" ? "****-****-****-" + value.slice(-4) : value}
                                            </li>
                                        )
                                    )}
                                </ul>

                                <h2 className="mt-4 text-xl">Order Items</h2>
                                <ul className ="list-group list-group-flush">
                                    {Object.keys(cart).map((key) =>
                                        cart[key] > 0 ? (
                                            <li key={key} className="list-group-item">
                                                <b>{key}:</b> {cart[key]} x ${productPrices[key].toFixed(2)}
                                            </li>
                                        ) : null
                                    )}

                                    <li className="list-group-item">
                                        <b>Total without Tax: </b>
                                        {Object.keys(cart)
                                            .map((key) => (cart[key] > 0 ? productPrices[key] : 0))
                                            .reduce(
                                                (total, price, index) =>
                                                    total + price * cart[Object.keys(cart)[index]],
                                                0
                                            )
                                            .toFixed(2)}
                                    </li>

                                    <li className="list-group-item">
                                        <b>Tax: </b>
                                        {Object.keys(cart)
                                            .map((key) => (cart[key] > 0 ? productPrices[key] : 0))
                                            .reduce(
                                                (total, price, index) =>
                                                    total + 0.06 * price * cart[Object.keys(cart)[index]],
                                                0
                                            )
                                            .toFixed(2)}
                                    </li>

                                    <li className="list-group-item">
                                        <b>Total with Tax:</b> $
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
                                    </li>
                                </ul>
                            </div>
                            <button
                                href=""
                                onClick={() => {                                                      
                                    resetCart("Pencils");
                                    resetCart("Pens");
                                    resetCart("Notebook");
                                    resetCart("Scissors");
                                    resetCart("Folders");
                                    resetCart("Calculator");
                                    resetCart("Pencil Sharpener");
                                    resetCart("Backpack");
                                    changePage("Browse");
                                }}
                                className="btn btn-secondary"
                            >
                                {" "}
                                <i className="bi-arrow-left-circle"></i>
                                Return
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <></>
        );
    }
}