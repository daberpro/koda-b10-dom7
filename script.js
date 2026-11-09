function createElement(name = "div", attr = {}, content = "") {
    const el = document.createElement(name);
    for (let atr in attr) {
        el.setAttribute(atr,attr[atr]);
    }
    el.textContent = content;
    return el;
}

function createCard(data) {

    const card = createElement("div",{"class": "card"});
    const image = createElement("img", {src:  data["image"], "class":"card-img"});
    const cardDescription = createElement("div", {"class":"card-description"});
    const infoKey = ["name", "status", "species", "gender"];
    infoKey.forEach(d =>{
        const content = createElement("span",{"class":""}, `${d}: ${data[d]}`);
        cardDescription.appendChild(content);
    });

    card.appendChild(image);
    card.appendChild(cardDescription);
    return card;

}


function render(characters){
    const mainContainer = document.querySelector("#main");
    mainContainer.innerHTML = "";
    characters.forEach(data => {
        const card = createCard(data);
        mainContainer.appendChild(card);
    });
}

const url = "https://rickandmortyapi.com/api/character";
async function main() {
    const characters = await fetch(url);
    const objResult = await characters.json();
    render(objResult.results);

    const search = document.querySelector('.search-container>input[type="text"]');
    search.oninput = (e)=>{
        const value = e.target.value;
        render(objResult.results.filter(data => data.name.toLowerCase().includes(value.toLowerCase())));
    }


}

main();
