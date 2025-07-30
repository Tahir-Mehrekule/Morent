import { useState } from "react";
import styles from "./confirmation.module.scss";
import SecurityPng from "./securityConfirmation.png";

function Confirmation() {
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const handleTermsChange = () => {
    setIsTermsChecked(!isTermsChecked);
  };

  return (
    <>
      <div className={styles.confirmationContainer}>
      
          <h1 className={styles.confirmationTitle}>Confirmation</h1>
        
        <div className={styles.confirmationTexts}>
          <p>We are getting to the end. Just few clicks and your rental is ready!</p>
          <p>Step 4 of 4</p>
        </div>
        <div className={styles.firstConfirmation}>
          <input type="checkbox" />
          <h4>I agree with sending marketing and newsletter emails. No spam, promised!</h4>
        </div>
        <div className={styles.secondConfirmation}>
          <input type="checkbox" onChange={handleTermsChange} />
          <h4>I agree with our terms and conditions and privacy policy.</h4>
        </div>
        <div className={styles.confirmationButton}>
          <a href="#">
            <button disabled={!isTermsChecked} style={{ opacity: isTermsChecked ? 1 : 0.5 }}>
              Rent Now
            </button>
          </a>
        </div>
        <div className={styles.confirmationEnds}>
          <img src={SecurityPng} alt="Security Image" />
          <h4>All your data are safe</h4>
          <p>We are using the most advanced security to provide you the best experience ever.</p>
        </div>
      </div>
    </>
  );
}

export default Confirmation;
