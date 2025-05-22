const yourOfferList = document.getElementById('your-offer-list');
const yourValue = document.getElementById('your-value');
const theirOfferList = document.getElementById('their-offer-list');
const theirValue = document.getElementById('their-value');
const buttons = Array.from(document.querySelectorAll('.add'));
const clear = document.getElementById('clear');
const wfl = document.getElementById('wfl');
const searchO = document.getElementById('searchO')
const search = document.getElementById('search');
let numYours = 0;
let numTheirs = 0;
let value = 0;
const removeBtns = Array.from(document.querySelectorAll('.remove-btn'));
buttons.forEach(button => {
    if(button.dataset.type.endsWith("O")) {
    button.addEventListener('click', () => {
        const checkWflO = () => {
            if(numYours < numTheirs) {
                wfl.textContent = "WIN";
                wfl.style.color = "lime";
            } else if(numYours === numTheirs) {
                wfl.textContent = "FAIR";
                wfl.style.color = "gold";
            } else {
                wfl.textContent = "LOSE";
                wfl.style.color = "red";
            }
        };
        theirOfferList.innerHTML += `
        <li data-name="${button.dataset.type}" data-value="${button.dataset.num}">${button.dataset.type.slice(0, -1)} - ${button.dataset.num}<br><button class="remove-btnO">Remove</button></li>
        `;
        document.querySelectorAll('.remove-btnO').forEach(remove => {
            const removeFuncO = () => {
                remove.parentElement.remove();
                numTheirs -= Number(remove.parentElement.dataset.value)*1000;
                theirValue.textContent = `${numTheirs/1000}`;
                checkWflO();
            }
            remove.addEventListener('click', removeFuncO);
        })
        numTheirs += Number(button.dataset.num)*1000;
        theirValue.textContent = `${numTheirs/1000}`;
        checkWflO();
    });
} else {
    button.addEventListener('click', () => {
        const checkWfl = () => {
            if(numYours < numTheirs) {
                wfl.textContent = "WIN";
                wfl.style.color = "lime";
            } else if(numYours === numTheirs) {
                wfl.textContent = "FAIR";
                wfl.style.color = "gold";
            } else {
                wfl.textContent = "LOSE";
                wfl.style.color = "red";
            }
        };
        yourOfferList.innerHTML += `<li data-value="${button.dataset.num}">${button.dataset.type} - ${button.dataset.num}<br><button class="remove-btn">Remove</button></li>`;
        document.querySelectorAll('.remove-btn').forEach(remove => {
            const removeFunc = () => {
                remove.parentElement.remove();
                numYours -= Number(remove.parentElement.dataset.value)*1000;
                yourValue.textContent = `${numYours/1000}`;
                checkWfl();
            }
            remove.addEventListener('click', removeFunc);
        });
        numYours += Number(button.dataset.num)*1000;
        yourValue.textContent = `${numYours/1000}`;
        checkWfl();
    });
}
});
clear.addEventListener('click', () => {
    theirOfferList.innerHTML = "";
    yourOfferList.innerHTML = "";
    numYours = 0;
    numTheirs = 0;
    yourValue.textContent = `${numYours}`;
    theirValue.textContent = `${numTheirs}`;
    wfl.textContent = "";
});
const searchFunc = () => {
    buttons.forEach(button => {
    let regex = new RegExp(search.value.replace(/\s/g, ""), "i");
    if(regex.test(button.dataset.type.replace(/\s/g, ""))) {
        button.parentElement.style.display = "flex";
    } else {
        button.parentElement.style.display = "none";
    }
});
}
const searchFuncO = () => {
    buttons.forEach(button => {
    let regex = new RegExp(searchO.value.replace(/\s/g, ""), "i");
    if(regex.test(button.dataset.type.replace(/\s/g, ""))) {
        button.parentElement.style.display = "flex";
    } else {
        button.parentElement.style.display = "none";
    }
});
}
searchO.addEventListener('input', searchFuncO);
search.addEventListener('input', searchFunc);