let menu = [];
let sortValue = "Name";

const checkName = function(name) {
    for (let i = 0; i < menu.length; i++) {
        if (name.toLowerCase() == menu[i].name.toLowerCase()) {
            alert("Pizza name already taken.");
            return false;
        }
    }
}

const deleteItem = function(item) {
    if (confirm("Are you sure?")) {
        menu.splice(item, 1);
        sessionStorage.setItem('pizza', JSON.stringify(menu));
        document.querySelector('.displayMenu').innerHTML = displayMenu(sortValue, menu);
    }
}

const toppings = function() {
    let toppings = [];
    const arr = document.getElementsByName("toppings[]");
    for (let i = 0; i < arr.length; i++) {
        toppings.push(arr[i].value);
    }
    return toppings.join(', ');
}

const displayMenu = function(sortValue, arr) {
    let displayItem = "";
    let chilliImg = '<img class="chilli" src="./chillipepper.png">';

    if (sortValue == 'Name') { sortByName(); }
    if (sortValue == 'Price') { sortByPrice(); }
    if (sortValue == 'Heat') { sortByHeat(); }

    for (let i = 0; i < arr.length; i++) {
        displayItem +=
        `
        <li class="pizza">
            <img src="${menu[i].photo}.jpg">
            <span class="pizzaDesc">
                <p><b>Name:</b> ${menu[i].name} <span>${chilliImg.repeat(menu[i].heat)}</span></p>
                <p><b>Price:</b> ${menu[i].price}</p>
                <p><b>Toppings:</b> ${menu[i].toppings}</p>
            </span>
            <button onclick="deleteItem(${i})" class="buttonDelete">Delete</button>
        </li>
        `
    }
    return displayItem;
}

const sortByName = function(a, b) { menu.sort((a, b) => a.name.localeCompare(b.name)) }
const sortByPrice = function(a, b) { menu.sort((a, b) => a.price - b.price); }
const sortByHeat = function(a, b) { menu.sort((a, b) => a.heat - b.heat); }

document.querySelector('.sortButton').addEventListener('click', function() {
    const sortBy = document.querySelector('.sortBySelection');
    let value = sortBy.options[sortBy.selectedIndex].value;
    sortValue = value;
    document.querySelector('.displayMenu').innerHTML = displayMenu(sortValue, menu);
});

document.querySelector('.pizzaForm').addEventListener('submit', function(e) {
    e.preventDefault();

    if (checkName(document.getElementById('name').value) == false) { return false; }

    pizza = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        heat: document.getElementById('heat').value,
        toppings: toppings(),
        photo: document.getElementById('photo').value
    }

    console.log(pizza);

    menu.push(pizza);
    sessionStorage.setItem('pizza', JSON.stringify(menu));
    document.querySelector('.displayMenu').innerHTML = displayMenu(sortValue, menu);
    document.querySelector('.pizzaForm').reset();
});

document.querySelector('.toppingButton').addEventListener('click', function(e) {
    e.preventDefault();
    let inputEl = document.createElement('input');
    inputEl.toppings = 'toppings';
    inputEl.type = 'text';
    inputEl.name = 'toppings[]';
    document.querySelector('.toppingsLabel').appendChild(inputEl);
});

menu = JSON.parse(sessionStorage.getItem("pizza")) || [];
document.querySelector('.displayMenu').innerHTML = displayMenu(sortValue, menu);