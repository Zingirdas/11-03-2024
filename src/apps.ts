let resultList: HTMLElement | null = document.getElementById("ulList");

async function search(): Promise<void> {
    const input = document.getElementById("input") as HTMLInputElement;
    const name = input.value.trim();
    
    if (name !== "") {
        try {
            const response = await getNationality(name);
            displayInformation(response);
        } catch (error) {
            console.error("Klaida gaunant informaciją:", error);
        }
    } else {
        alert("Įveskite vardą.");
    }
}

async function getNationality(name: string): Promise<any> {
    const response = await fetch(`https://api.nationalize.io?name=${name}`);
    return await response.json();
}


function displayInformation(info: any): void {
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

        countries.forEach((country: any) => {
            const li = document.createElement("li");
            li.textContent = `Šalis: ${country.country_id}, Tikimybė: ${country.probability.toFixed(2)}`;
            ul.appendChild(li);
        });

        resultDiv.appendChild(ul);
    
}

window.onload = search;
