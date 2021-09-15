let menu = [];

const displayMenu = function(arr) {
    let displayItem = "";
    let chilliImg = '<img class="chilli" src="./chillipepper.png">';

    if (arr == null || arr == "" ) {
        return "";
    }

    for (let i = 0; i < arr.length; i++) {
        displayItem +=
        `
        <li>
            <div class="pizza">
                <img src="${menu[i].photo}.jpg">
                <span class="pizzaDesc">
                    <p><b>Name:</b> ${menu[i].name} <span>${chilliImg.repeat(menu[i].heat)}</span></p>
                    <p><b>Price:</b> ${menu[i].price}</p>
                    <p><b>Toppings:</b> ${menu[i].toppings}</p>
                </span>
                <button onclick="deleteItem(${i})" class="buttonDelete">Delete</button>
            </div>
        </li>
        `
    }
    return displayItem;
}

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
        document.querySelector('.displayMenu').innerHTML = displayMenu(menu);
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

document.querySelector('.toppingButton').addEventListener('click', function(e) {
    e.preventDefault();
    let inputEl = document.createElement('input');
    inputEl.toppings = 'toppings';
    inputEl.type = 'text';
    inputEl.name = 'toppings[]';
    document.querySelector('.toppingsLabel').appendChild(inputEl);
});

document.querySelector('.pizzaForm').addEventListener('submit', function(e) {
    e.preventDefault();

    if (checkName(document.getElementById('name').value) == false) {
        return false;
    }

    pizza = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        heat: document.getElementById('heat').value,
        toppings: toppings(),
        photo: document.getElementById('photo').value
    }

    menu.push(pizza);
    sessionStorage.setItem('pizza', JSON.stringify(menu));
    document.querySelector('.displayMenu').innerHTML = displayMenu(menu);
    document.querySelector('.pizzaForm').reset();
});

menu = JSON.parse(sessionStorage.getItem("pizza")) || [];
document.querySelector('.displayMenu').innerHTML = displayMenu(menu);