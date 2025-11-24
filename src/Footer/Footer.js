import React from "react";
import "./Footer.css";

function Footer() {
  return (
    // <footer className="invoice-footer">
    //     <div className="container1">
    //     <div className="footer-section information">
    //     <p>Terms and Conditions:</p>
    //     <p className="information-text">
    //       Goods once sold not to be taken back. Our responsibility ceases after the goods have been delivered. Subject to Coimbatore Jurisdiction. No Claim for breakage and shortage during transit.
    //       Interest @24% will be charged if the bills are not settled before 30 days.
    //     </p>
    //   </div>

    //   <div className="footer-section seal">
    //     <p className="seal-text">(Common Seal)</p>
    //   </div>
    //     </div>

    //   <div className="footer-section signature">
    //     <div>
    //     <p>Certified that the particulars given above are true and correct.</p>
    //     <p>For <b>LAKSHMI GRADE CASTINGS</b></p>
    //     </div>

    //     <div><p className="seal-text">Authorized Signatory</p></div>

    //   </div>
    <div class="main-container">
      <div class="first-main-column">
        <div class="inner-column first-inner">
          <p>Terms and Conditions:</p>
          <p className="information-text">
            Goods once sold not to be taken back. Our responsibility ceases
            after the goods have been delivered. Subject to Coimbatore
            Jurisdiction. No Claim for breakage and shortage during transit.
            Interest @24% will be charged if the bills are not settled before 30
            days.
          </p>
        </div>
        <div class="inner-column second-inner">
          <p className="seal-text">(Common Seal)</p>
        </div>
      </div>

      <div class="second-main-column">
        <div>
          <p className="certify">
            Certified that the particulars given above are true and correct.
          </p>
          <p className="certify">
            For <b>LAKSHMI PUMP INDUSTRIES</b>
          </p>
        </div>

        <div>
          <p className="seal-text">Authorized Signatory</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
