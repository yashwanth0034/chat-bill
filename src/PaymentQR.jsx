function PaymentQR({ amount }) {
  const upiId = "9606160332@yb";

  const upiLink =
    `upi://pay?pa=${upiId}` +
    `&pn=SRI%20VEERABHADHRA%20CHAT%20BHAN` +
    `&am=${amount}` +
    `&cu=INR`;

  return (
    <div className="payment-qr">
      <h3>UPI PAYMENT</h3>

      <div className="qr-box">
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
            upiLink
          )}`}
          alt="UPI Payment QR"
        />
      </div>

      <p className="pay-amount">
        Pay ₹{amount}
      </p>

      <p className="scan-text">
        Scan with PhonePe, Google Pay or Paytm
      </p>
    </div>
  );
}

export default PaymentQR;