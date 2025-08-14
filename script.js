//Copyright © 2025 SB-VALUES. All rights reserved.
//This code is not open source. Do not copy or reuse without permission.

const yourOfferList = document.getElementById('your-offer-list');
const yourValue = document.getElementById('your-value');
const theirOfferList = document.getElementById('their-offer-list');
const theirValue = document.getElementById('their-value');
const clear = document.getElementById('clear');
const wfl = document.getElementById('wfl');
const searchO = document.getElementById('searchO');
const search = document.getElementById('search');
const favoriteList = document.getElementById("favorites");
const darkModeBtn = document.getElementById("dark-mode");

let numYours = 0;
let numTheirs = 0;
let value = 0;
let obj = {};
let objO = {};
let favArr;
let buttons;

async function loadEffects() {
    try {
        const response = await fetch('./effects.json');
        const data = await response.json();
        
        const containers = document.querySelectorAll('.hit-effect-container');
        
        function createEffectHTML(effectName, effect, crateName) {
            return `
                <div class="hit-effect">
                    <img src="${effect.image}">
                    <button data-favorite="Favorite" class="favorite">Favorite</button>
                    <button class="add" data-type="${effectName}" data-num="${effect.value}">Add</button>
                </div>
            `;
        }

        function createCrateBreakHTML(crateName, crateIcon) {
            return `
                <div class="crate-break">
                    <h4>${crateName.split(' ')[0]}</h4>
                    <h4>${crateName.split(' ')[1]}</h4>
                    <img src="${crateIcon}" class="crate-icon">
                    <div class="crate-line"></div>
                </div>
            `;
        }

        containers.forEach((container, index) => {
            if (index === 0) {
                if (!container.querySelector('#favorites')) {
                    container.insertAdjacentHTML('afterbegin', `
                        <div class="crate-break">
                            <h4>Favorites</h4>
                            <i style="font-size: 17px; color: rgb(186, 178, 10);" class="fa fa-star"></i>
                            <div class="crate-line"></div>
                        </div>
                        <div id="favorites"></div>
                    `);
                }
            }

            Object.entries(data.crates).forEach(([crateName, crateInfo]) => {
                container.insertAdjacentHTML('beforeend', createCrateBreakHTML(crateName, crateInfo.icon));
                Object.entries(crateInfo.effects).forEach(([effectName, effect]) => {
                    const effectType = index === 1 ? effectName + 'O' : effectName;
                    container.insertAdjacentHTML('beforeend', createEffectHTML(effectType, effect, crateName));
                });
            });
        });

        initializeButtons();
    } catch (error) {
        console.error('Error loading effects:', error);
        try {
            const response = await fetch('./effects.json');
            const data = await response.json();
            
            const containers = document.querySelectorAll('.hit-effect-container');
            
            containers.forEach(container => {
                const favoritesDiv = container.querySelector('#favorites');
                if (favoritesDiv) {
                    Object.entries(data.crates).forEach(([crateName, crateInfo]) => {
                        container.insertAdjacentHTML('beforeend', createCrateBreakHTML(crateName, crateInfo.icon));
                        Object.entries(crateInfo.effects).forEach(([effectName, effect]) => {
                            container.insertAdjacentHTML('beforeend', createEffectHTML(effectName, effect, crateName));
                        });
                    });
                }
            });

            initializeButtons();
        } catch (fallbackError) {
            console.error('Error loading effects (fallback attempt):', fallbackError);
            console.log('Current location:', window.location.href);
            console.log('Attempted to load from:', new URL('./effects.json', window.location.href).href);
        }
    }
}

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
                } else if(numYours < numTheirs && numYours >= numTheirs*0.88) {
                    wfl.textContent = "SMALL WIN";
                    wfl.style.color = "lime";
                } else if(numYours > numTheirs && numTheirs >= numYours*0.88) {
                    wfl.textContent = "SMALL LOSE";
                    wfl.style.color = "red";
                } else {
                    wfl.textContent = "LARGE LOSE";
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
            });

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
                } else if(numYours < numTheirs && numYours >= numTheirs*0.88) {
                    wfl.textContent = "SMALL WIN";
                    wfl.style.color = "lime";
                } else if(numYours > numTheirs && numTheirs >= numYours*0.88) {
                    wfl.textContent = "SMALL LOSE";
                    wfl.style.color = "red";
                } else {
                    wfl.textContent = "LARGE LOSE";
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

function initializeButtons() {
    buttons = Array.from(document.querySelectorAll('.add'));
    buttons.forEach(btn => {
        addFunc(btn);
    });
    
    const favoriteBtn = Array.from(document.getElementsByClassName("favorite"));
    favoriteBtn.forEach(btn => {    
        btn.addEventListener("click", event => {
            handleFavorite(btn, event);
        });
    });
}

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
            console.log(btn.dataset.favorite);
            alert("This Item Has Already Been Favorited!");
        }
    }
};

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

searchO.addEventListener('input', searchFuncO);
search.addEventListener('input', searchFunc);

search.addEventListener('click', () => {
    search.value = "";
    searchFunc();
});

searchO.addEventListener('click', () => {
    searchO.value = "";
    searchFuncO();
});

const manageDark = () => {
    if(darkModeBtn.textContent == "Enable Dark Mode") {
        darkModeBtn.textContent = "Disable Dark Mode";
        document.getElementById("body").classList.add("darker")
        Array.from(document.getElementsByClassName("head"))[0].classList.add("darker-two");
        Array.from(document.getElementsByClassName("navigation"))[0].classList.add("darker");
        Array.from(document.getElementsByClassName("small-head"))[0].classList.add("darker-three");
        Array.from(document.getElementsByClassName("extra-info-container"))[0].classList.add("darker-two");
        Array.from(document.getElementsByClassName("icon-container"))[0].classList.add("darker");
        Array.from(document.getElementsByClassName("trader-title"))[0].classList.add("darker");
        Array.from(document.getElementsByClassName("your-offer-crates"))[0].classList.add("left-darker");
        Array.from(document.getElementsByClassName("their-offer-crates"))[0].classList.add("right-darker");
        Array.from(document.getElementsByClassName("foot"))[0].classList.add("darker-three");
        Array.from(document.getElementsByClassName("bar1"))[0].style.backgroundColor = "rgb(113, 23, 224)";
        document.getElementById("heading-h1").style.color = "rgb(113, 23, 224)";
        localStorage.setItem("darkStatus", "Enable Dark Mode");
    } else {
        localStorage.setItem("darkStatus", darkModeBtn.textContent);
        darkModeBtn.textContent = "Enable Dark Mode";
        document.getElementById("body").classList.remove("darker")
        Array.from(document.getElementsByClassName("head"))[0].classList.remove("darker-two");
        Array.from(document.getElementsByClassName("navigation"))[0].classList.remove("darker");
        Array.from(document.getElementsByClassName("small-head"))[0].classList.remove("darker-three");
        Array.from(document.getElementsByClassName("extra-info-container"))[0].classList.remove("darker-two");
        Array.from(document.getElementsByClassName("icon-container"))[0].classList.remove("darker");
        Array.from(document.getElementsByClassName("trader-title"))[0].classList.remove("darker");
        Array.from(document.getElementsByClassName("your-offer-crates"))[0].classList.remove("left-darker");
        Array.from(document.getElementsByClassName("their-offer-crates"))[0].classList.remove("right-darker");
        Array.from(document.getElementsByClassName("foot"))[0].classList.remove("darker-three");
        Array.from(document.getElementsByClassName("bar1"))[0].style.backgroundColor = "rgb(102, 22, 137)";
        document.getElementById("heading-h1").style.color = "rgb(102, 22, 137)";
        localStorage.setItem("darkStatus", "Disable Dark Mode");
    }
}

darkModeBtn.addEventListener("click", manageDark);

window.onload = async () => {
    darkModeBtn.textContent = localStorage.getItem("darkStatus") || "Enable Dark Mode";
    manageDark();
    if (favoriteList) {
        favoriteList.innerHTML = localStorage.getItem("yourFavoriteItems") || "";
    }
    
    await loadEffects();
    
    Array.from(document.getElementsByClassName("favorited")).forEach(fav => {
        fav.children[1].addEventListener("click", event => {
            event.target.parentElement.remove();  
            const correctBtn = Array.from(document.getElementsByClassName("favorite"))
                .find(btn => btn.parentElement.children[2].dataset.type === event.target.parentElement.children[2].dataset.type);
            if (correctBtn) {
                correctBtn.dataset.favorite = "Favorite";
            }
            localStorage.setItem("yourFavoriteItems", favoriteList.innerHTML);
        });
        const btn = fav.children[2];
        if (btn) {
            addFunc(btn);
        }
    });

    const favoritedStuff = Array.from(document.getElementsByClassName("favorited"));
    const favorite = Array.from(document.getElementsByClassName("favorite"));
    favoritedStuff.forEach(item => {
        favorite.forEach(stuff => {
            if(item.children[2] && stuff.parentElement.children[2] && 
               item.children[2].dataset.type === stuff.parentElement.children[2].dataset.type) {
                item.children[2].dataset.num = stuff.parentElement.children[2].dataset.num;
            }
        });
    });
};
