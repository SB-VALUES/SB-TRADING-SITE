//Copyright © 2025 SB-VALUES. All rights reserved.
//This code is not open source. Do not copy or reuse without permission.
const yourOfferList = document.getElementById('your-offer-list');
const yourValue = document.getElementById('your-value');
const theirOfferList = document.getElementById('their-offer-list');
const theirValue = document.getElementById('their-value');
const buttons = Array.from(document.querySelectorAll('.add'));
const clear = document.getElementById('clear');
const wfl = document.getElementById('wfl');
const searchO = document.getElementById('searchO')
const search = document.getElementById('search');
const favoritedItems = Array.from(document.getElementsByClassName("favorited"));
let numYours = 0;
let numTheirs = 0;
let value = 0;
let obj = {};
let objO = {};
let favArr;
const favoriteList = document.getElementById("favorites");
const favoriteListO = document.getElementById("favoritesO");
const removeBtns = Array.from(document.querySelectorAll('.remove-btn'));
const removeBtnsO = Array.from(document.querySelectorAll('.remove-btnO'));
const addFunc = (button) => {
    if(button.dataset.type.endsWith("O")) {
    $(button).on('click', () => {
        const checkWflO = () => {
            if(numYours === numTheirs) {
                wfl.textContent = "FAIR";
                wfl.style.color = "gold";
            } else if(numYours/1000 < (numTheirs/1000)-1000) {
                wfl.textContent = "LARGE WIN";
                wfl.style.color = "lime";
            } else if(numYours < numTheirs && (numTheirs-numYours)/1000 <= 30) {
                wfl.textContent = "SMALL WIN";
                wfl.style.color = "green";
            } else if(numYours < numTheirs) {
                wfl.textContent = "WIN";
                wfl.style.color = "green";
            } else if((numYours/1000)-1000 > numTheirs/1000) {
                wfl.textContent = "LARGE LOSE";
                wfl.style.color = "red";
            } else if(numYours > numTheirs && (numYours-numTheirs)/1000 <= 30) {
                wfl.textContent = "SMALL LOSE";
                wfl.style.color = "red";
            } else if(numYours > numTheirs){
                wfl.textContent = "LOSE";
                wfl.style.color = "red";
            }
        };
        if(objO[button.dataset.type]) {
        objO[button.dataset.type]++;
        const amount = document.getElementById(`${button.dataset.type}amount`);
        amount.textContent = objO[button.dataset.type];
        } else {
        objO[button.dataset.type] = 1;
        theirOfferList.innerHTML += `<li data-type="${button.dataset.type}" data-value="${button.dataset.num}">${button.dataset.type.slice(0, -1)} x<p id="${button.dataset.type}amount" style="display: inline;">${objO[button.dataset.type]}</p>- ${button.dataset.num}<br><button class="remove-btnO"><i style="font-size: 11px" class="fa fa-trash"></i> Remove</button></li>`;
        }
        document.querySelectorAll('.remove-btnO').forEach(remove => {
            const removeFuncO = () => {
                if(objO[remove.parentElement.dataset.type] > 1) {
                objO[remove.parentElement.dataset.type]--;
                const amount = document.getElementById(`${remove.parentElement.dataset.type}amount`);
                amount.textContent = objO[remove.parentElement.dataset.type];
                } else {
                delete objO[remove.parentElement.dataset.type];
                remove.parentElement.remove();
                }
                numTheirs -= Number(remove.parentElement.dataset.value)*1000;
                theirValue.textContent = `${numTheirs/1000}`;
                checkWflO();
            }
            remove.onclick = removeFuncO;
        })
        numTheirs += Number(button.dataset.num)*1000;
        theirValue.textContent = `${numTheirs/1000}`;
        checkWflO();
    });
} else {
    $(button).on('click', () => {
        const checkWfl = () => {
            if(numYours === numTheirs) {
                wfl.textContent = "FAIR";
                wfl.style.color = "gold";
            } else if(numYours/1000 < (numTheirs/1000)-1000) {
                wfl.textContent = "LARGE WIN";
                wfl.style.color = "lime";
            } else if(numYours < numTheirs && (numTheirs-numYours)/1000 <= 30) {
                wfl.textContent = "SMALL WIN";
                wfl.style.color = "green";
            } else if(numYours < numTheirs) {
                wfl.textContent = "WIN";
                wfl.style.color = "green";
            } else if((numYours/1000)-1000 > numTheirs/1000) {
                wfl.textContent = "LARGE LOSE";
                wfl.style.color = "red";
            } else if(numYours > numTheirs && (numYours-numTheirs)/1000 <= 30) {
                wfl.textContent = "SMALL LOSE";
                wfl.style.color = "red";
            } else if(numYours > numTheirs){
                wfl.textContent = "LOSE";
                wfl.style.color = "red";
            }
        };
        if(obj[button.dataset.type]) {
        obj[button.dataset.type]++;
        const amount = document.getElementById(`${button.dataset.type}amount`);
        amount.textContent = obj[button.dataset.type];
        } else {
        obj[button.dataset.type] = 1;
        yourOfferList.innerHTML += `<li data-type="${button.dataset.type}" data-value="${button.dataset.num}">${button.dataset.type} x<p id="${button.dataset.type}amount" style="display: inline;">${obj[button.dataset.type]}</p>- ${button.dataset.num}<br><button class="remove-btn"><i style="font-size: 11px" class="fa fa-trash"></i> Remove</button></li>`;
        }
        document.querySelectorAll('.remove-btn').forEach(remove => {
            const removeFunc = () => {
                if(obj[remove.parentElement.dataset.type] > 1) {
                    obj[remove.parentElement.dataset.type]--;
                    const amount = document.getElementById(`${remove.parentElement.dataset.type}amount`);
                    amount.textContent = obj[remove.parentElement.dataset.type];
                } else {
                delete obj[remove.parentElement.dataset.type];
                remove.parentElement.remove();
                }
                numYours -= Number(remove.parentElement.dataset.value)*1000;
                yourValue.textContent = `${numYours/1000}`;
                checkWfl();
            }
            remove.onclick = removeFunc;
        });
        numYours += Number(button.dataset.num)*1000;
        yourValue.textContent = `${numYours/1000}`;
        checkWfl();
    });
}
};
buttons.forEach(btn => {
    addFunc(btn);
});  
const favoriteBtn = Array.from(document.getElementsByClassName("favorite"));
    const handleFavorite = (btn, event) => {
        if(event.target) {
            if(btn.dataset.favorite === "Favorite") {
                btn.dataset.favorite = "Unfavorite";
                $clone = $(btn).parent().clone(true);
                $clone.children().eq(1).text("Unfavorite");
                $clone.addClass("favorited");
                if(!Array.from(document.getElementsByClassName("favorited")).find(favo => favo.children[2]?.dataset?.type === btn.parentElement.children[2]?.dataset?.type)) {
                $('#favorites').append($clone);
                } else {
                    console.log(btn.dataset.favorite);
                    alert("This Item Has Already Been Favorited!")
                }
                localStorage.setItem("yourFavoriteItems", favoriteList.innerHTML);
                $clone.children().eq(1).on("click", event => {
                    btn.dataset.favorite = "Favorite";
                    event.target.parentElement.remove();                    
                    localStorage.setItem("yourFavoriteItems", favoriteList.innerHTML);
                })
            } else {
                console.log(btn.dataset.favorite)
                alert("This Item Has Already Been Favorited!");
            }
        }
    };
favoriteBtn.forEach(btn => {
btn.addEventListener("click", event => {
    handleFavorite(btn, event);
})
});
clear.addEventListener('click', () => {
    amount = 0;
    obj = {};
    objO = {};
    theirOfferList.innerHTML = "";
    yourOfferList.innerHTML = "";
    numYours = 0;
    numTheirs = 0;
    yourValue.textContent = `${numYours}`;
    theirValue.textContent = `${numTheirs}`;
    wfl.textContent = "";
    search.value = "";
    searchO.value = "";
    searchFunc();
    searchFuncO();
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
search.addEventListener('click', () => {
    search.value = ""
    searchFunc();
});
searchO.addEventListener('click', () => {
    searchO.value = ""
    searchFuncO();
});
const body = document.getElementById('body');
const dia = document.getElementById('dia');
const diaBtn = document.getElementById('dia-btn');
const closeDia = document.getElementById('close-dia');
const diaBtnFoot = document.getElementById("dia-btn-foot");
diaBtn.addEventListener('click', () => {
    dia.showModal();
    body.style.overflow = "hidden";
    dia.style.opacity = "1";
    dia.style.transform = "scale(1)";
});
diaBtnFoot.addEventListener('click', () => {
    dia.showModal();
    body.style.overflow = "hidden";
    dia.style.opacity = "1";
    dia.style.transform = "scale(1)";
});
closeDia.addEventListener('click', () => {
    dia.style.opacity = "0";
    dia.style.transform = "scale(0.4)";
    setTimeout(() => {dia.close()}, 100);
    body.style.overflow = "scroll";
});
const giveawayBtn = document.getElementById("giveaways");
const giveawayDia = document.getElementById("giveaway-dia");
const giveawayDiaFoot = document.getElementById("giveaways-foot");
const giveawayCloseDia = document.getElementById("giveaway-close-dia");
giveawayBtn.addEventListener("click", () => {
    giveawayDia.showModal();
    body.style.overflow = "hidden";
    giveawayDia.style.opacity = "1";
    giveawayDia.style.transform = "scale(1)";
});
giveawayDiaFoot.addEventListener("click", () => {
    giveawayDia.showModal();
    body.style.overflow = "hidden";
    giveawayDia.style.opacity = "1";
    giveawayDia.style.transform = "scale(1)";
});
giveawayCloseDia.addEventListener("click", () => {
    giveawayDia.style.opacity = "0";
    giveawayDia.style.transform = "scale(0.4)";
    setTimeout(() => {giveawayDia.close()}, 100);
    body.style.overflow = "scroll";
});
window.onload = () => {
    favoriteList.innerHTML = localStorage.getItem("yourFavoriteItems") || "";
    Array.from(document.getElementsByClassName("favorited")).forEach(fav => {
        fav.children[1].addEventListener("click", event => {
            event.target.parentElement.remove();
            const correctBtn = favoriteBtn.find(btn => btn.parentElement.children[2].dataset.type === event.target.parentElement.children[2].dataset.type);
            correctBtn.dataset.favorite = "Favorite";
            localStorage.setItem("yourFavoriteItems", favoriteList.innerHTML);
        });
        const btn = fav.children[2]
        addFunc(btn);
    })
}   