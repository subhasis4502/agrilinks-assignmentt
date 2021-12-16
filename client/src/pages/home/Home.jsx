import "./home.css";
import { useRef } from "react";

export default function Home() {
  // For the search bar
  const item = useRef();

  // For the update section
  const userID = useRef();
  const marketID = useRef();
  const marketName = useRef();
  const cmdtyID = useRef();
  const cmdtyName = useRef();
  const priceUnit = useRef();
  const convFctr = useRef();
  const minPrice = useRef();
  const maxPrice = useRef();

  // Get the list of aggregated reports by Commodity
  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(item.current.value);
    let html = "";
    fetch(`http://127.0.0.1:8800/api/comodities/reports/${item.current.value}`)
      .then((response) => {
        return response.json();
      })
      .then((comodities) => {
        comodities.forEach((comodity) => {
          html += `
          <div class="comodityContainer">
            <h3><b>Comodity Name: </b>${comodity.cmdtyName}</h3>
            <hr>
            <p><b>Comodity Id: </b>${comodity.cmdtyID}<p>
            <p><b>Market Name: </b>${comodity.marketName}<p>
            <p><b>Market Id: </b>${comodity.marketID}<p>
            <p><b>Price: </b>${comodity.minPrice}-${comodity.maxPrice}/Kg</p>
            `;
          let users = "<b>Users: </b>";
          comodity.users.forEach((user) => {
            users += " " + user;
          });
          html += users + "</div>";
        });
        let comodityList = document.getElementById("comodities");
        comodityList.innerHTML = html;
      });
  };

  // Posting data to server
  async function postData(url, comodity) {
    let data = JSON.stringify(comodity);
    let params = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    };
    fetch(url, params).then().then(alert("Your details are submitted!"));
  }

  // Send a create report request
  const handleClick = async (e) => {
    e.preventDefault();
    let comodity = {
      userID: userID.current.value,
      marketID: marketID.current.value,
      marketName: marketName.current.value,
      cmdtyID: cmdtyID.current.value,
      cmdtyName: cmdtyName.current.value,
      priceUnit: priceUnit.current.value,
      convFctr: convFctr.current.value,
      minPrice: minPrice.current.value,
      maxPrice: maxPrice.current.value,
    };
    console.log(comodity);
    postData("http://127.0.0.1:8800/api/comodities/reports", comodity);

    // Reseting the form
    userID.current.value = "";
    marketID.current.value = "";
    marketName.current.value = "";
    cmdtyID.current.value = "";
    cmdtyName.current.value = "";
    priceUnit.current.value = "";
    convFctr.current.value = "";
    minPrice.current.value = "";
    maxPrice.current.value = "";
  };

  return (
    <div>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <h3>Sabji Mandi</h3>
          <p>Get the latest prices of your daily comodities</p>
        </div>
        <div className="topbarRight">
          <form class="d-flex">
            <input
              className="input"
              type="search"
              placeholder="Search"
              aria-label="Search"
              ref={item}
            />
            <button className="button" type="submit" onClick={handleSearch}>
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="updateContainer">
        <h2>Post Your Report:</h2>
        <form onSubmit={handleClick}>
          <div className="generalDetails">
            <input
              placeholder="Enter your user-id"
              type="text"
              required
              className="userInput"
              ref={userID}
            />
            <input
              placeholder="Enter the market-id"
              type="text"
              required
              className="userInput"
              ref={marketID}
            />
            <input
              placeholder="Enter the Market Name"
              type="text"
              className="userInput"
              ref={marketName}
            />
            <input
              placeholder="Enter the Comodity-id"
              type="text"
              required
              className="userInput"
              ref={cmdtyID}
            />
            <input
              placeholder="Enter the Comodity name"
              type="text"
              className="userInput"
              ref={cmdtyName}
            />
          </div>
          <div className="quantity">
            <input
              placeholder="Enter the Price Unit"
              type="text"
              required
              className="userInput"
              ref={priceUnit}
            />
            <input
              placeholder="Conversion factor"
              type="number"
              required
              className="userInput"
              ref={convFctr}
            />
            <input
              placeholder="Enter the minimum price"
              type="number"
              required
              className="userInput"
              ref={minPrice}
            />
            <input
              placeholder="Enter the maximum price"
              type="number"
              required
              className="userInput"
              ref={maxPrice}
            />
          </div>
          <button className="submitBtn" type="submit">
            Submit
          </button>
          <button className="resetBtn" type="reset">
            Reset
          </button>
        </form>
        <hr />
      </div>
      <h2 className="report">Aggregated Reports:</h2>
      <div className="comoditiesContainer" id="comodities"></div>
    </div>
  );
}
