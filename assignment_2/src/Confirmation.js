import React, { useState, useEffect } from "react";

export function Confirmation({ isActive, changePage, cart, productPrices, resetCart, order }) {
    const [summaryItems, setSummaryItems] = useState([]);
    
    useEffect(() => {
        setSummaryItems(Object.entries(order).map(
          ([key, value]) => (
            <li key={key} className="list-group-item">
              <b>{key}:</b> {key === "card" ? "****-****-****-" + value.slice(-4) : value}
            </li>
          )
        ));
      }, [order]);

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
                                <h5 className="card-title">Order Confirmation</h5>
                            </div>
                            <ul className="list-group list-group-flush">
                                {summaryItems}
                            </ul>
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