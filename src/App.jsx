import { useState } from "react";
import "./App.css";
import PaymentQR from "./PaymentQR";
import golgappa from "./assets/food/golgappa.jpg";
import masalaPuri from "./assets/food/masala-puri.jpg";
import samosaChat from "./assets/food/samosa-chat.jpg";
import papdiChat from "./assets/food/papdi-chat.jpg";
import bataniChat from "./assets/food/batani-chat.jpg";
import bhelPuri from "./assets/food/bhel-puri.jpg";
import dhaiPapidi from "./assets/food/dhai-papidi.jpg";
import seerPuri from "./assets/food/seer-puri.jpg";
import sweetPuri from "./assets/food/sweet-puri.jpg";
import dhaiPuri from "./assets/food/dhai-puri.jpg";
import paniPuri from "./assets/food/pani-puri.jpg";
import gulabPuri from "./assets/food/gulab-puri.jpg";

function App() {
  const menuItems = [
  { id: 1, name: "Golgappa", price: 30, icon: "🥣", image: golgappa },
  { id: 2, name: "Masala Puri", price: 40, icon: "🍲", image: masalaPuri },
  { id: 3, name: "Samosa Chat", price: 30, icon: "🥟", image: samosaChat },
  { id: 4, name: "Papdi Chat", price: 40, icon: "🍛", image: papdiChat },
  { id: 5, name: "Batani Chat", price: 40, icon: "🥗", image: bataniChat },
  { id: 6, name: "Bhel Puri", price: 40, icon: "🥙", image: bhelPuri },
  { id: 7, name: "Dhai Papidi", price: 40, icon: "🍽️", image: dhaiPapidi },
  { id: 8, name: "Seer Puri", price: 40, icon: "🌮", image: seerPuri },
  { id: 9, name: "Sweet Puri", price: 40, icon: "🍬", image: sweetPuri },
  { id: 10, name: "Dhai Puri", price: 40, icon: "🥣", image: dhaiPuri },
  { id: 11, name: "Pani Puri", price: 30, icon: "🫓", image: paniPuri },
  { id: 12, name: "Gulab Puri", price: 40, icon: "🌸", image: gulabPuri },
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
    if (totalAmount === 0) return;
    setShowReceipt(true);
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="top-header">
        <div className="brand">
          <div className="brand-icon">🥣</div>

          <div>
            <h1>SRI VEERABHADHRA</h1>
            <h2>CHAT BHAN</h2>
            <p>Fresh • Tasty • Always</p>
          </div>
        </div>

        <nav className="top-nav">
          <div className="nav-item active">
            <span>⌂</span>
            <small>Home</small>
          </div>

          <div className="nav-item">
            <span>☷</span>
            <small>Menu</small>
          </div>

          <div className="nav-item">
            <span>▤</span>
            <small>Bill</small>
          </div>

          <div className="nav-item">
            <span>◷</span>
            <small>History</small>
          </div>
        </nav>

        <div className="date-box">
          <span>📅</span>
          <div>
            <strong>{new Date().toLocaleDateString()}</strong>
            <small>{new Date().toLocaleTimeString()}</small>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="dashboard">

        {/* LEFT SIDEBAR */}
        <aside className="sidebar">

          <div className="side-link active">
            <span>⌂</span>
            Home
          </div>

          <div className="side-link">
            <span>🍴</span>
            Menu
          </div>

          <div className="side-link">
            <span>🧾</span>
            Bill
          </div>

          <div className="side-link">
            <span>◷</span>
            History
          </div>

          <div className="good-vibe">
            <strong>Good Food</strong>
            <strong>Good Mood</strong>
            <span>〰</span>
          </div>

        </aside>

        {/* CENTER */}
        <section className="main-content">

          {/* HERO */}
          <div className="hero">

            <div className="hero-text">
              <span>✨</span>
              <h2>Delicious Chaat,<br />Freshly Made</h2>

              <p>
                Real Taste • Fresh Ingredients • Hygienic
              </p>
            </div>

            <div className="hero-food">
              🥣
            </div>

          </div>

          {/* MENU */}
          <section className="menu-section">

            <div className="menu-heading">
              <div>
                <h2>🍲 Our Chaat Menu</h2>
                <p>Choose your favorite chaat and add to your bill</p>
              </div>

              <span className="leaf">🌿</span>
            </div>

            <div className="menu-grid">

              {menuItems.map((item, index) => {
                const quantity = cart[item.id] || 0;

                return (
                  <div
                    className={`menu-card card-${index % 8} ${
                      quantity > 0 ? "selected-card" : ""
                    }`}
                    key={item.id}
                  >

                    {index === 0 && (
                      <span className="popular">Popular</span>
                    )}
                    <div className="food-image">
  <img src={item.image} alt={item.name} />
</div>

                   
                    <h3>{item.name}</h3>

                    <div className="food-price">
                      ₹{item.price}
                    </div>

                    <div className="quantity-controls">

                      <button
                        className="minus"
                        onClick={() => removeItem(item)}
                        disabled={quantity === 0}
                      >
                        −
                      </button>

                      <span>{quantity}</span>

                      <button
                        className="plus"
                        onClick={() => addItem(item)}
                      >
                        +
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>
          </section>

        </section>

        {/* RIGHT BILL PANEL */}
        <aside className="right-panel">

          {/* SELECTED ITEMS */}
          <div className="selected-box">

            <div className="panel-title">
              <h2>🛒 Selected Items</h2>
              <span>{totalItems}</span>
            </div>

            {totalItems === 0 ? (
              <div className="empty-cart">
                <div className="empty-icon">🥣</div>
                <h3>No items added yet!</h3>
                <p>Add some delicious chaat items<br />to your bill.</p>
              </div>
            ) : (
              <div className="selected-list">

                {menuItems.map((item) => {
                  const quantity = cart[item.id] || 0;

                  if (quantity === 0) return null;

                  return (
                    <div className="selected-row" key={item.id}>
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
            )}

          </div>

          {/* TOTAL */}
          <div className="total-box">

            <h2>Total Amount</h2>

            <div className="big-total">
              ₹{totalAmount}
            </div>

            <button
              className="generate-btn"
              disabled={totalAmount === 0}
              onClick={generateBill}
            >
              🧾 Generate Bill
            </button>

          </div>

          {/* PAYMENT */}
          <div className="payment-card">

            <div>
              <h2>Scan & Pay</h2>

              <p>
                Via PhonePe / Google Pay /
                <br />
                Paytm / UPI
              </p>

              <div className="payment-apps">
                <span>पे</span>
                <span>G</span>
                <span>paytm</span>
              </div>
            </div>

            {totalAmount > 0 ? (
              <div className="small-qr">
                <PaymentQR amount={totalAmount} />
              </div>
            ) : (
              <div className="qr-placeholder">
                QR
              </div>
            )}

          </div>

        </aside>

      </main>

      {/* FOOTER */}
      <footer className="footer">

        <div>
          ❤️
          <span>
            Thank you for visiting
            <strong>SRI VEERABHADHRA CHAT BHAN</strong>
          </span>
        </div>

        <div className="footer-message">
          🌿 Eat Fresh • Stay Fresh • Be Happy 🌿
        </div>

        <div>
          🍴 For any queries, contact us 😊
        </div>

      </footer>

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

                if (quantity === 0) return null;

                return (
                  <div className="receipt-item" key={item.id}>
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
              <strong>₹{totalAmount}</strong>
            </div>

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
                onClick={() => setShowReceipt(false)}
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