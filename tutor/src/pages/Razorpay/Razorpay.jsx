import React,{useState} from 'react'

const Razorpay = () => {
    const [amount, setAmount] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    if (amount === "") {
      alert("please enter amount");
    } else {
      var options = {
        key: "rzp_test_6cNn6KMffozSlf",
        key_secret: "SnYdnBbooGTuzQfK1txNflzI",
        amount: amount * 100,
        currency: "INR",
        name: "Hackwit Technologies",
        description: "Razorpay testing",
        handler: function (response) {
          alert(response.razorpay_payment_id);
        },
        prefill: {
          name: " Kumar",
          email: "kumar@example.com",
          contact: "7708209937",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      var pay = new window.Razorpay(options);
      pay.open();
    }
  };

  return (
    <div>
    <h2>Razorpay Test</h2><br />
        <input 
          type="text"
          placeholder="enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{margin: "4px",border: 'inset'}}
        />
        <button onClick={handlesubmit}>submit</button>
  </div>
  )
}

export default Razorpay