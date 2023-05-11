import React, { useEffect } from "react";
import reportWebVitals from "../reportWebVitals";
function Header() {
  useEffect(() => {

    // reportWebVitals(console.log);
  });
  // Import result is the URL of your image
  return (
    <div className="d-flex">
      <img src={process.env.PUBLIC_URL + "/logo512.png"} alt="" />
    </div>
  );
}

export default Header;
