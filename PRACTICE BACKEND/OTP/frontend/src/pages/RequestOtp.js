import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RequestOtp() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    const res = await fetch("http://localhost:5000/api/otp/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    alert(data.message);
    if (res.ok) navigate("/verify", { state: { email } });
  };

  return (
    <div>
      <h2>Request OTP</h2>
      <input type="email" placeholder="Enter Email" value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSendOtp}>Send OTP</button>
    </div>
  );
}
