import FetchWrapper from "./fetch-wrapper.js";

const currencyAPI = new FetchWrapper(
  "https://v6.exchangerate-api.com/v6/b85d778fb37d7d05872edca4/codes"
);
const baseButtons = document.querySelector(".base-buttons");
const targetButtons = document.querySelector(".target-buttons");

const init = () => {
  // get the currenceis from API
  currencyAPI.get("/").then((data) => {
    const filteredCurrencies = data.supported_codes.filter((currency) => {
      return (
        currency[0] === "USD" ||
        currency[0] === "EUR" ||
        currency[0] === "CAD" ||
        currency[0] === "PKR" ||
        currency[0] === "INR" ||
        currency[0] === "GBP" ||
        currency[0] === "BRL" ||
        currency[0] === "IDR"
      );
    });

    //order currencies
    const order = ["USD", "EUR", "CAD", "PKR", "INR", "GBP", "BRL", "IDR"];

    filteredCurrencies.sort((a, b) => {
      return order.indexOf(a[0]) - order.indexOf(b[0]);
    });

    // insert currencies in DOM
    filteredCurrencies.forEach((currency) => {
      baseButtons.insertAdjacentHTML(
        "beforeend",
        `<button class="button" data-currency="${currency[0]}">${currency[0]}<br>${currency[1]}</button>`
      );
      targetButtons.insertAdjacentHTML(
        "beforeend",
        `<button class="button" data-currency="${currency[0]}">${currency[0]}<br>${currency[1]}</button>`
      );
    });

    // select base currency
    let baseDataCurrency = null;
    let targetDataCurrency = null;
    const bbuttons = document.querySelectorAll(".base-buttons .button");
    bbuttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        document
          .querySelector(".base-buttons .button.active")
          ?.classList.remove("active");
        event.currentTarget.classList.add("active");
        displayAnchor();
      });
    });
    // select target currency
    const tbuttons = document.querySelectorAll(".target-buttons .button");
    tbuttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        document
          .querySelector(".target-buttons .button.active")
          ?.classList.remove("active");
        event.currentTarget.classList.add("active");
        displayAnchor();
      });
    });

    // display track anchor and add the correct link
    function displayAnchor() {
      const baseActiveButton = document.querySelector(
        ".base-buttons .button.active"
      );
      const targetActiveButton = document.querySelector(
        ".target-buttons .button.active"
      );
      const anchor = document.querySelector(".track-link");

      if (
        baseActiveButton &&
        targetActiveButton &&
        baseActiveButton.textContent !== targetActiveButton.textContent
      ) {
        anchor.style.display = "block";
        anchor.setAttribute(
          "href",
          `results.html?base=${baseActiveButton.dataset.currency}&target=${targetActiveButton.dataset.currency}`
        );
      } else {
        anchor.style.display = "none";
      }
    }
  });
};

init();
