import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
    return (
      <div className="information information-404 container">
        <div className="information-title">404</div>
        <br />
        <div className="information-content">
          Ops an error occurred. the page you are trying to access does not
          exist.
        </div>
        <div className="information-back"><p><Link to="/">Back</Link></p></div>
      </div>
    );
};

export default Error