import { useState } from 'react';
import styles from "./PaymentStyle.module.scss";


const PaymentStyle = () => {
const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
const [expiryError, setExpiryError] = useState("");
const [cardNumberError, setCardNumberError] = useState("");
const [cvcError, setCvcError] = useState("");
const [emailError, setEmailError] = useState("");
const handleNameInput = (e) => {
  const charCode = e.charCode;
  if (!((charCode >= 65 && charCode <= 90) || ( charCode >= 97 && charCode <= 122 ) || (charCode === 32) ) ) {
    e.preventDefault();
  }
};

const handleExpiryDate = (e) => {
  const input = e.target;
  let value = input.value.replace(/\D/g, '');  // Sadece rakamları al
  setExpiryError(""); // Her girişte hata mesajını temizle
  
  // Maximum 4 rakam kontrolü
  if (value.length > 4) {
    value = value.slice(0, 4);
  }
  
  // Ay kontrolü
  if (value.length >= 1) {
    // İlk rakam kontrolü (0 veya 1 olmalı)
    const firstDigit = parseInt(value[0]);
    if (firstDigit > 1) {
      setExpiryError("Lütfen geçerli bir ay giriniz (01-12)");
      return;
    }
    
    if (value.length >= 2) {
      const month = value.slice(0, 2);
      const monthNum = parseInt(month);
      
      // Ay 01-12 arası olmalı
      if (monthNum < 1 || monthNum > 12) {
        setExpiryError("Lütfen geçerli bir ay giriniz (01-12)");
        return;
      }
      
      // Yıl kontrolü
      if (value.length > 2) {
        const year = value.slice(2);
        const yearNum = parseInt(year);
        
        // Yıl 24'ten küçük olamaz
        if (yearNum < 24) {
          setExpiryError("Yıl 24 veya daha büyük olmalıdır");
          return;
        }
        
        value = month + '/' + year;
      } else {
        value = month;
      }
    }
  }
  
  input.value = value;
};

// Özel karakterleri engellemek için yeni fonksiyon
const handleExpiryDateKeyPress = (e) => {
  const charCode = e.charCode;
  if (charCode < 48 || charCode > 57) {
    e.preventDefault();
  }
};

const handleCardNumber = (e) => {
  const input = e.target;
  let value = input.value.replace(/\D/g, ''); // Sadece rakamları al
  
  // 16 rakamdan fazlasını engelle
  if (value.length > 16) {
    value = value.slice(0, 16);
  }

  // Her 4 rakamdan sonra boşluk ekle
  value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
  
  // Input değerini güncelle
  input.value = value;

  // Hata kontrolü
  if (value.replace(/\s/g, '').length < 16 && value.length > 0) {
    setCardNumberError("Kart numarası 16 haneli olmalıdır");
  } else {
    setCardNumberError("");
  }
};
const handleCardNumberKeyPress = (e) => {
  const charCode = e.charCode;
  if (charCode < 48 || charCode > 57) {
    e.preventDefault();
  }
};

const handleCVC = (e) => {
  const input = e.target;
  let value = input.value.replace(/\D/g, ''); // Sadece rakamları al
  
  // 3 rakamdan fazlasını engelle
  if (value.length > 3) {
    value = value.slice(0, 3);
  }

  // Input değerini güncelle
  input.value = value;

  // Hata kontrolü
  if (value.length > 0 && value.length < 3) {
    setCvcError("CVC 3 haneli olmalıdır");
  } else {
    setCvcError("");
  }
};

const handleCVCKeyPress = (e) => {
  const charCode = e.charCode;
  if (charCode < 48 || charCode > 57) {
    e.preventDefault();
  }
};

const handlePayPalEmail = (e) => {
  const email = e.target.value;
  
  // Email formatı kontrolü
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email.includes('@')) {
    setEmailError("Email adresi '@' içermelidir");
  } else if (!email.toLowerCase().includes('.com')) {
    setEmailError("Email adresi '.com' ile bitmelidir");
  } else if (!emailRegex.test(email)) {
    setEmailError("Geçerli bir email adresi giriniz");
  } else {
    setEmailError("");
  }
};

  return (
    <div className={styles.paymentMethodbody}>
      {/* Credit Card Section */}
      <div className={styles.paymentCrediCart}>
        <div className={styles.paymentCrediCartHeader}>
          <div className={styles.paymentCrediCartHeaderInput}>
            <input
              type="radio"
              name="payment"
              value="credit-card"
              checked={selectedPaymentMethod === "credit-card"}
              onChange={() => setSelectedPaymentMethod("credit-card")}
            />
            <h2>Credit Card</h2>
          </div>
          <div>
            <img
              src="https://img.icons8.com/color/48/000000/visa.png"
              alt="Visa"
            />
            <img
              src="https://img.icons8.com/color/48/000000/mastercard.png"
              alt="MasterCard"
            />
          </div>
        </div>
        {selectedPaymentMethod === "credit-card" && (
          <div className={styles.paymentCrediCartBody}>
            <div className={styles.paymentCrediCartBodyInput}>
              <div>
                <div>
                  <h2>Card Number</h2>
                  <input type="text" 
                  placeholder="XXXX XXXX XXXX XXXX"
                  maxLength="19"
                  onChange={handleCardNumber}
                  onKeyPress={handleCardNumberKeyPress}
                  />
                  {cardNumberError && (
                    <span style={{
                      color: "red",
                      fontSize: "12px",
                      display: "block",
                      marginTop: "5px",
                    }}>{cardNumberError}
                    </span>
                  )}
                </div>
                <div>
                  <h2>Expiration Date</h2>
                  <input 
                    type="text" 
                    placeholder="MM/YY"
                    maxLength="5"
                    onChange={handleExpiryDate}
                    onKeyPress={handleExpiryDateKeyPress}
                  />
                  {expiryError && (
                    <span style={{
                      color: "red",
                      fontSize: "12px",
                      display: "block",
                      marginTop: "5px",
                    }}>{expiryError}</span>
                  )}
                </div>
              </div>
              <div>
                <div>
                  <h2>CVC</h2>
                  <input 
                    type="text" 
                    placeholder="CVC"
                    maxLength="3"
                    onChange={handleCVC}
                    onKeyPress={handleCVCKeyPress}
                  />
                  {cvcError && (
                    <span style={{
                      color: "red",
                      fontSize: "12px",
                      display: "block",
                      marginTop: "5px",
                    }}>{cvcError}</span>
                  )}
                </div>
                <div>
                  <h2>Card holder</h2>
                  <input type="text" 
                  placeholder="Cardholder Name"
                  pattern="[a-zA-Z ]+"
                  title="Please enter only letters and spaces"
                  onKeyPress={handleNameInput}

                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PayPal Section */}
      <div className={styles.paymentPaypal}>
        <div className={styles.paymentPaypalHeader}>
          <div>
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={selectedPaymentMethod === "paypal"}
              onChange={() => setSelectedPaymentMethod("paypal")}
            />
            <h2>PayPal</h2>
          </div>
          <div>
            <img
              src="https://mon-potager-en-carre.fr/wp-content/uploads/2019/03/paypal-logo-png-transparent.png"
              alt="PayPal"
            />
          </div>
        </div>
        {selectedPaymentMethod === "paypal" && (
          <div className={styles.paymentPaypalBody}>
            <div className={`${styles.paymentPaypalBodyInput} ${styles.warp}`}>
              <div>
                <div>
                  <h2>Name</h2>
                  <input type="text" 
                  placeholder="Your Name"
                  pattern="[A-Za-z ]+"
                  maxLength="20"
                  onKeyPress={handleNameInput} />
                </div>
                <div>
                  <h2>Last Name</h2>
                  <input type="text" 
                  placeholder="Your Last Name"
                  pattern="[A-Za-z ]+"
                  maxLength="20"
                  onKeyPress={handleNameInput}
                   />
                </div>
              </div>
              <div>
                <div>
                  <h2>PayPal Email</h2>
                  <input 
                    type="email" 
                    placeholder="PayPal Email"
                    onChange={handlePayPalEmail}
                  />
                  {emailError && (
                    <span style={{
                      color: "red",
                      fontSize: "12px",
                      display: "block",
                      marginTop: "5px",
                    }}>{emailError}</span>
                  )}
                </div>
                <div>
                  <h2>PayPal Password</h2>
                  <input type="password" placeholder="PayPal Password" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bitcoin Section */}
      <div className={styles.paymentBitcoin}>
        <div className={styles.paymentBitcoinHeader}>
          <div>
            <input
              type="radio"
              name="payment"
              value="bitcoin"
              checked={selectedPaymentMethod === "bitcoin"}
              onChange={() => setSelectedPaymentMethod("bitcoin")}
            />
            <h2>Bitcoin</h2>
          </div>
          <div>
            <img
              src="https://static.vecteezy.com/system/resources/previews/019/767/930/non_2x/bitcoin-logo-bitcoin-icon-transparent-free-png.png"
              alt="Bitcoin"
            />
          </div>
        </div>
        {selectedPaymentMethod === "bitcoin" && (
          <div className={styles.paymentBitcoinBody}>
            <div className={styles.paymentBitcoinBodyInput}>
              <div>
                <div>
                  <h2>Name</h2>
                  <input type="text" 
                  placeholder="Your Name"
                  pattern="[A-Za-z ]+"
                  maxLength="20"
                  onKeyPress={handleNameInput} />
                </div>
                <div>
                  <h2>Bitcoin Address</h2>
                  <input type="text" placeholder="Bitcoin Address" />
                </div>
              </div>
              <div>
                <div>
                  <h2>Amount</h2>
                  <input type="number" placeholder="Amount" />
                </div>
                <div>
                  <h2>Transaction ID</h2>
                  <input type="text" placeholder="Transaction ID" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentStyle;
