import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequestOtp from "./pages/RequestOtp";
import VerifyOtp from "./pages/VerifyOtp";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Page to request OTP */}
        <Route path="/" element={<RequestOtp />} />

        {/* Page to verify OTP */}
        <Route path="/verify" element={<VerifyOtp />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
