import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function VerifyOtp() {
  const { state } = useLocation();
  const email = state?.email;
  const [otp, setOtp] = useState("");

  const handleVerifyOtp = async () => {
    const res = await fetch("http://localhost:5000/api/otp/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp })
    });
    const data = await res.json();
    alert(data.message);
    
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <input type="text" placeholder="Enter OTP" value={otp}
        onChange={(e) => setOtp(e.target.value)} />
      <button onClick={handleVerifyOtp}>Verify OTP</button>
    </div>
  );
}



