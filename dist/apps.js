"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let resultList = document.getElementById("ulList");
function search() {
    return __awaiter(this, void 0, void 0, function* () {
        const input = document.getElementById("input");
        const name = input.value.trim();
        if (name !== "") {
            try {
                const response = yield getNationality(name);
                displayInformation(response);
            }
            catch (error) {
                console.error("Klaida gaunant informaciją:", error);
            }
        }
        else {
            alert("Įveskite vardą.");
        }
    });
}
function getNationality(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`https://api.nationalize.io?name=${name}`);
        return yield response.json();
    });
}
function displayInformation(info) {
    const resultDiv = document.getElementById("rez");
    if (resultDiv) {
        resultDiv.innerHTML = "";
        const count = info.count;
        const name = info.name;
        const countries = info.country;
        const heading = document.createElement("h2");
        heading.textContent = `Vardas: ${name.toUpperCase(0)}, Rasta šalyčių: ${count}`;
        resultDiv.appendChild(heading);
        const ul = document.createElement("ul");
        countries.forEach((country) => {
            const li = document.createElement("li");
            li.textContent = `Šalis: ${country.country_id}, Tikimybė: ${country.probability.toFixed(2)}`;
            ul.appendChild(li);
        });
        resultDiv.appendChild(ul);
    }
    window.onload = search;
}
