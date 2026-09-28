import { useState } from "react";
import "./App.css";
import PaymentQR from "./PaymentQR";

function App() {
  const menuItems = [
    { id: 1, name: "Golgappa", price: 30 },
    { id: 2, name: "Masala Puri", price: 40 },
    { id: 3, name: "Samosa Chat", price: 30 },
    { id: 4, name: "Papdi Chat", price: 40 },
    { id: 5, name: "Batani Chat", price: 40 },
    { id: 6, name: "Bhel Puri", price: 40 },
    { id: 7, name: "Dhai Papidi", price: 40 },
    { id: 8, name: "Seer Puri", price: 40 },
    { id: 9, name: "Sweet Puri", price: 40 },
    { id: 10, name: "Dhai Puri", price: 40 },
    { id: 11, name: "Pani Puri", price: 30 },
    { id: 12, name: "Gulab Puri", price: 40 },
  ];

  const [cart, setCart] = useState({});
  const [showReceipt, setShowReceipt] = useState(false);

  const addItem = (item) => {
    setCart((previousCart) => ({
      ...previousCart,
      [item.id]: (previousCart[item.id] || 0) + 1,
    }));
  };

  const removeItem = (item) => {
    setCart((previousCart) => {
      const newCart = { ...previousCart };

      if (newCart[item.id] > 1) {
        newCart[item.id] -= 1;
      } else {
        delete newCart[item.id];
      }

      return newCart;
    });
  };

  const totalAmount = menuItems.reduce((total, item) => {
    const quantity = cart[item.id] || 0;
    return total + item.price * quantity;
  }, 0);

  const totalItems = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const generateBill = () => {
    if (totalAmount === 0) {
      return;
    }

    setShowReceipt(true);
  };

  const closeReceipt = () => {
    setShowReceipt(false);
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div className="header-content">
          <h1>SRI VEERABHADHRA CHAT BHAN</h1>
          <p>Fresh • Tasty • Delicious</p>
          <span>Billing System</span>
        </div>
      </header>

      {/* MAIN */}
      <main className="container">

        <div className="section-title">
          <h2>Our Menu</h2>
          <p>Select quantity</p>
        </div>

        {/* MENU */}
        <div className="menu">

          {menuItems.map((item) => {
            const quantity = cart[item.id] || 0;

            return (
              <div
                className={`menu-item ${
                  quantity > 0 ? "selected-item" : ""
                }`}
                key={item.id}
              >

                <div className="food-details">
                  <h3>{item.name}</h3>
                  <p className="price">₹{item.price}</p>
                </div>

                <div className="quantity-controls">

                  <button
                    className="quantity-btn minus-btn"
                    onClick={() => removeItem(item)}
                    disabled={quantity === 0}
                  >
                    −
                  </button>

                  <span className="quantity">
                    {quantity}
                  </span>

                  <button
                    className="quantity-btn plus-btn"
                    onClick={() => addItem(item)}
                  >
                    +
                  </button>

                </div>

              </div>
            );
          })}

        </div>

        {/* BILL */}
        <div className="bill">

          <div className="bill-header">
            <h2>Current Bill</h2>

            <span className="item-count">
              {totalItems} Items
            </span>
          </div>

          <div className="bill-list">

            {menuItems.map((item) => {
              const quantity = cart[item.id] || 0;

              if (quantity === 0) {
                return null;
              }

              return (
                <div className="bill-item" key={item.id}>
                  <span>
                    {item.name} × {quantity}
                  </span>

                  <strong>
                    ₹{item.price * quantity}
                  </strong>
                </div>
              );
            })}

            {totalItems === 0 && (
              <div className="empty-bill">
                No items selected
              </div>
            )}

          </div>

          <div className="total">
            <span>Total</span>

            <strong>
              ₹{totalAmount}
            </strong>
          </div>

          <button
            className="generate-btn"
            disabled={totalAmount === 0}
            onClick={generateBill}
          >
            Generate Bill
          </button>

        </div>

      </main>

      {/* RECEIPT */}
      {showReceipt && (
        <div className="receipt-overlay">

          <div className="receipt">

            <div className="receipt-header">
              <h2>SRI VEERABHADHRA CHAT BHAN</h2>
              <p>Fresh • Tasty • Delicious</p>
              <p>Payment Receipt</p>
            </div>

            <div className="receipt-info">
              <p>
                <strong>Bill No:</strong>{" "}
                #{Date.now().toString().slice(-6)}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date().toLocaleDateString()}
              </p>

              <p>
                <strong>Time:</strong>{" "}
                {new Date().toLocaleTimeString()}
              </p>
            </div>

            <div className="receipt-items">

              {menuItems.map((item) => {
                const quantity = cart[item.id] || 0;

                if (quantity === 0) {
                  return null;
                }

                return (
                  <div
                    className="receipt-item"
                    key={item.id}
                  >
                    <span>
                      {item.name} × {quantity}
                    </span>

                    <strong>
                      ₹{item.price * quantity}
                    </strong>
                  </div>
                );
              })}

            </div>

            <div className="receipt-total">
              <span>Total Amount</span>

              <strong>
                ₹{totalAmount}
              </strong>
            </div>

            {/* UPI QR */}
           <PaymentQR amount={totalAmount} />   
             <div className="receipt-actions">

              <button
                className="print-btn"
                onClick={() => window.print()}
              >
                🖨️ Print Receipt
              </button>

              <button
                className="close-btn"
                onClick={closeReceipt}
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;