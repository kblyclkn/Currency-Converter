const api_key = "fc732ecf95f23aa6493a29cd";
const url = "https://v6.exchangerate-api.com/v6/" + api_key;

// element

const currency_one = document.querySelector("#currency_one");
const currency_two = document.querySelector("#currency_two");
const list_one = document.querySelector("#list_one");
const list_two = document.querySelector("#list_two");
const amount = document.querySelector("#amount");
const calculate = document.querySelector("#calculate");
const result = document.querySelector("#result");


fetch(url + "/codes")
  .then(res => res.json())
  .then(data => {
    const items = data.supported_codes;

    let options;
    for(let item of items) {
        options += `<option value=${item[0]}>${item[1]}</option> `;
    }
    list_one.innerHTML = options;
    list_two.innerHTML = options;
  });

  calculate.addEventListener("click", function() {
    const doviz1 = currency_one.value;
    const doviz2 = currency_two.value;
    const miktar = amount.value;

    fetch(url + "/latest/" + doviz1)
        .then(res => res.json())
        .then(data => {
            const conclusion = (data.conversion_rates[doviz2] * miktar).toFixed(3);
            result.innerHTML = `
                <div class="card border-primary">
                    <div class="card-body text-center" style="font-size:30px;">
                        ${miktar} ${doviz1} = ${conclusion} ${doviz2}
                    </div>
                </div>
            `;
        })

  })