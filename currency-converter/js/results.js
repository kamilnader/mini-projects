import FetchWrapper from "./fetch-wrapper.js";

const url = new URL(document.location);
const base = url.searchParams.get("base");
const target = url.searchParams.get("target");
const baseButton = document.querySelector(".base-button");
const targetButton = document.querySelector(".target-button");
const enterAmountField = document.querySelector("#amount-field");

const conversionAPI = new FetchWrapper(
  "https://v6.exchangerate-api.com/v6/b85d778fb37d7d05872edca4/pair/"
);

//Update buttons text content
baseButton.textContent = base;
targetButton.textContent = target;

// revert currencies on click
const currencyRevert = document.querySelector(".revert-currency");
const revertLink = document.querySelector(".revert-link");
currencyRevert.addEventListener("click", () => {
  let tempLink = baseButton.textContent;
  baseButton.textContent = targetButton.textContent;
  targetButton.textContent = tempLink;
  //open new page with reverted currenceis
  revertLink.setAttribute(
    "href",
    `results.html?base=${baseButton.textContent}&target=${targetButton.textContent}`
  );
});

// helper function to update field in real time
function updateField(amount) {
  return amount;
}

// fetch the convert rate and update the fields
conversionAPI.get(`${base}/${target}`).then((data) => {
  const baseField = document.querySelector(".amount-base");
  const resultField = document.querySelector(".result-target");
  baseField.textContent = `1 ${data.base_code} =`;
  // changes on enter amount field ()
  enterAmountField.addEventListener("keyup", () => {
    baseField.textContent = `${updateField(enterAmountField.value)} ${
      data.base_code
    }=`;
    resultField.textContent = `${
      Number.parseInt(baseField.textContent, 10) * data.conversion_rate
    } ${data.target_code}`;
  });

  // result field upate on page open (1 as base currency to ... target currency)
  resultField.textContent = `${data.conversion_rate} ${data.target_code}`;
});
