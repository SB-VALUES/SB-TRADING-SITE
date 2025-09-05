const itemSelection = Array.from(document.getElementsByClassName("item-selection"));
const offerLists = Array.from(document.getElementsByClassName("offer-list"));
const valueList = document.getElementById("value-list");
const search = document.getElementById("search");
let items;
const clear = document.getElementById("clear-btn");
let tableItems;
const yourVal = document.getElementById("your-val");
const theirVal = document.getElementById("their-val");
const tableSearch = document.getElementById("val-list-search");
let favoriteHtml;
let favoriteHtmlO;
let yVal = 0;
let tVal = 0;
let addBtn = [];
let crates = [
    "standard",
    "megarock",
    "bob",
    "barzil",
    "overkill",
    "evil-barzil",
    "alchemist",
    "easter",
    "patrick",
    "valentines",
    "peepmas",
    "jack",
    "guide"
]
let obj = {};
let objO = {};
let favArr = [];
    itemSelection.forEach(box => {
        box.innerHTML += `
    <div class="crate-break">
        <h4>Favorites</h4><i class="fa fa-star" style="color: rgba(250, 247, 66, 1)"></i><div class="crate-line"></div>
    </div>
    <div class="crate-items favorites">
    
    </div>
    <div class="crate-break">
        <h4>Standard</h4><h4>Crate</h4><img src="https://ik.imagekit.io/qhig1xz2i/Standard%20Crate.png?updatedAt=1754162414011" class="crate-icon"><div class="crate-line"></div>
    </div>
    <div class="crate-items standard">

    </div>
    <div class="crate-break">
        <h4>Megarock</h4><h4>Crate</h4><img src="https://ik.imagekit.io/qhig1xz2i/Megarock%20Crate.png?updatedAt=1754162414616" class="crate-icon"><div class="crate-line"></div>
    </div>
    <div class="crate-items megarock">

    </div>
    <div class="crate-break">
        <h4>Bob</h4><h4>Crate</h4><img src="https://ik.imagekit.io/qhig1xz2i/Bob%20Crate.png?updatedAt=1754162414066" class="crate-icon"><div class="crate-line"></div>
    </div>
    <div class="crate-items bob">

    </div>
    <div class="crate-break">
        <h4>Barzil</h4><h4>Crate</h4><img src="https://ik.imagekit.io/qhig1xz2i/Barzil%20Crate.png?updatedAt=1754162415350" class="crate-icon"><div class="crate-line"></div>
    </div>
    <div class="crate-items barzil">

    </div>
    <div class="crate-break">
        <h4>Overkill</h4><h4>Crate</h4><img src="https://ik.imagekit.io/qhig1xz2i/Overkill%20Crate.png?updatedAt=1754162415284" class="crate-icon"><div class="crate-line"></div>
    </div>
    <div class="crate-items overkill">

    </div>
    <div class="crate-break">
        <h4>Evil</h4><h4>Barzil</h4><h4>Crate</h4><img src="https://ik.imagekit.io/qhig1xz2i/Evil%20Barzil%20Crate.png?updatedAt=1756535837855" class="crate-icon"><div class="crate-line"></div>
    </div>
    <div class="crate-items evil-barzil">

    </div>
    <div class="crate-break">
        <h4>Alchemist</h4><h4>Crate</h4><img src="https://ik.imagekit.io/qhig1xz2i/Alchemist%20Crate.png?updatedAt=1754162415055" class="crate-icon"><div class="crate-line"></div>
    </div>
    <div class="crate-items alchemist">

    </div>
    <div class="crate-break">
        <h4>Easter</h4><h4>Packegge</h4><img src="https://ik.imagekit.io/qhig1xz2i/Easter%20Packegge.png?updatedAt=1754162415394" class="crate-icon"><div class="crate-line"></div>
    </div>
    <div class="crate-items easter">

    </div>
    <div class="crate-break">
        <h4>StPatricks</h4><h4>Pot O' Gold</h4><img src="https://ik.imagekit.io/qhig1xz2i/StPatricks%20Pot%20O%20Gold.png?updatedAt=1754162416804" class="crate-icon"><div class="crate-line"></div>
    </div>
    <div class="crate-items patrick">

    </div>
    <div class="crate-break">
        <h4>Valentines</h4><h4>Crate</h4><img src="https://ik.imagekit.io/qhig1xz2i/Valentines%20Crate.png?updatedAt=1754162417159" class="crate-icon"><div class="crate-line"></div>
    </div>
    <div class="crate-items valentines">

    </div>
    <div class="crate-break">
        <h4>Peepmas</h4><h4>Giftbox</h4><img src="https://ik.imagekit.io/qhig1xz2i/Peepmas%20Giftbox.png?updatedAt=1754162415541" class="crate-icon"><div class="crate-line"></div>
    </div>
    <div class="crate-items peepmas">

    </div>
    <div class="crate-break">
        <h4>Jack's</h4><h4>Crate</h4><img src="https://ik.imagekit.io/qhig1xz2i/Jack's%20Crate.png?updatedAt=1754162415247" class="crate-icon"><div class="crate-line"></div>
    </div>
    <div class="crate-items jack">

    </div>
    <div class="crate-break">
        <h4>Guide's</h4><h4>Crate</h4><img src="https://ik.imagekit.io/qhig1xz2i/Guide%20Crate.png?updatedAt=1754162414763" class="crate-icon"><div class="crate-line"></div>
    </div>
    <div class="crate-items guide">

    </div>
        `
    })
    fetch("items.json")
    .then(retrieve => retrieve.json())
    .then(itemsArr => {
        itemsArr.forEach(items => {
            valueList.innerHTML += `
            <tr>
                <td class="item-name">${items.name}</td>
                <td>${items.val}</td>
                <td>${items.crate}</td>
                <td>${items.rarity}</td>
            </tr>
            `
        })
    })
    .then(() => {
            tableSearch.addEventListener('input', () => {
        Array.from(document.getElementsByClassName("item-name")).forEach(tn => {
            let regex = new RegExp(tableSearch.value.replace(/\s/g, ""), "i");
            if(regex.test(tn.textContent.replace(/\s/g, ""))) {
                tn.parentElement.style.display = "table-row";
            } else {
                tn.parentElement.style.display = "none";
            }
        });
    });
    })
    fetch("items.json")
    .then(retrieve => retrieve.json())
    .then(itemArr => {
    const addHtml = crate => {
        items = itemArr;
        items.forEach(item => {
            if(item.crate === crate) {
            Array.from(document.getElementsByClassName(crate)).forEach(itemHtml => {
            itemHtml.innerHTML += `
            <div class="hit-effect">
                <img src="${item.url}">
                <span class="rarity"><i class="fa fa-gem"></i><p>${item.rarity}</p></span>
                <span class="hit-effect-info gold"><i class="fa fa-coins"></i><p>${item.val}</p></span>
                <hr style="width: 80%; border-color: black">
                <button class="fav-btn ${item.name}">Favorite</button>
                <button class="add" data-rare="${item.rarity}" data-type="${item.name}" data-num="${item.val}">Add</button>
            </div>`
            })
            }
        });
    }
    crates.forEach(crate => {
        addHtml(crate)
    });
    })
    .then(() => {
        const favBtns = Array.from(document.getElementsByClassName("fav-btn"));
        const addBtns = Array.from(document.getElementsByClassName("add"));
        const checkWfl = () => {
            if(yVal === tVal) {
                wfl.textContent = "FAIR";
                wfl.style.color = "gold";
            } else if(yVal/1000 < (tVal/1000)-1000) {
                wfl.textContent = "LARGE WIN";
                wfl.style.color = "lime";
            } else if(yVal < tVal && yVal >= tVal*0.88) {
                wfl.textContent = "SMALL WIN";
                wfl.style.color = "green";
            } else if(yVal < tVal) {
                wfl.textContent = "WIN";
                wfl.style.color = "green";
            } else if((yVal/1000)-1000 > tVal/1000) {
                wfl.textContent = "LARGE LOSE";
                wfl.style.color = "red";
            } else if(yVal > tVal && yVal < tVal+tVal*0.12) {
                wfl.textContent = "SMALL LOSE";
                wfl.style.color = "red";
            } else if(yVal > tVal){
                wfl.textContent = "LOSE";
                wfl.style.color = "red";
            }
        };
        const addFunc = event => {
            if(event.target.closest(".red-bg")) {
                if(objO[event.target.dataset.type]) {
                    objO[event.target.dataset.type]++;
                    offerLists[1].querySelector(`.${event.target.dataset.type}`).textContent = `x${objO[event.target.dataset.type]}`;
                    offerLists[1].querySelector(`.${event.target.dataset.type}val`).textContent = `(${(Number(objO[event.target.dataset.type])*(Number(event.target.dataset.num)*1000))/1000})`;
                } else {
                    objO[event.target.dataset.type] = 1;
                    offerLists[1].innerHTML += `
                    <li data-type="${event.target.dataset.type}" data-num="${event.target.dataset.num}"><span class="${event.target.dataset.type}"></span> ${event.target.dataset.type} - ${event.target.dataset.num} <span class="${event.target.dataset.type}val"></span><br><button class="remove-btn">Remove</button></li>
                    `
                }
                tVal += Number(event.target.dataset.num)*1000;
                checkWfl();
                theirVal.textContent = tVal/1000;
            } else {
                if(obj[event.target.dataset.type]) {
                    obj[event.target.dataset.type]++;
                    offerLists[0].querySelector(`.${event.target.dataset.type}`).textContent = `x${obj[event.target.dataset.type]}`;
                    offerLists[0].querySelector(`.${event.target.dataset.type}val`).textContent = `(${(Number(obj[event.target.dataset.type])*(Number(event.target.dataset.num)*1000))/1000})`;
                } else {
                obj[event.target.dataset.type] = 1;
                offerLists[0].innerHTML += `
                <li data-type="${event.target.dataset.type}" data-num="${event.target.dataset.num}"><span class="${event.target.dataset.type}"></span> ${event.target.dataset.type} - ${event.target.dataset.num} <span class="${event.target.dataset.type}val"></span><br><button class="remove-btn">Remove</button></li>
                `
                }
                yVal += Number(event.target.dataset.num)*1000;
                checkWfl();
                yourVal.textContent = yVal/1000;
            }
                Array.from(document.getElementsByClassName("remove-btn")).forEach(btn => {
                    btn.onclick = event => {
                        if(event.target.parentElement.parentElement.classList.contains("their")) {
                        tVal -= Number(event.target.parentElement.dataset.num)*1000;
                        checkWfl();
                        theirVal.textContent = tVal/1000;
                        if(objO[event.target.parentElement.dataset.type] > 1) {
                            objO[event.target.parentElement.dataset.type]--;
                            if(objO[event.target.parentElement.dataset.type] == 1) {
                            offerLists[1].querySelector(`.${event.target.parentElement.dataset.type}val`).textContent = "";
                            offerLists[1].querySelector(`.${event.target.parentElement.dataset.type}`).textContent = "";
                            } else {
                            offerLists[1].querySelector(`.${event.target.parentElement.dataset.type}val`).textContent = `(${(Number(objO[event.target.parentElement.dataset.type])*(Number(event.target.parentElement.dataset.num)*1000))/1000})`; 
                            }
                            offerLists[1].querySelector(`.${event.target.parentElement.dataset.type}`).textContent = `x${objO[event.target.parentElement.dataset.type]}`;
                        } else {
                        event.target.parentElement.remove();
                        delete objO[event.target.parentElement.dataset.type];
                        }
                        } else {
                        yVal -= Number(event.target.parentElement.dataset.num)*1000;
                        checkWfl()
                        yourVal.textContent = yVal/1000;
                        if(obj[event.target.parentElement.dataset.type] > 1) {
                            obj[event.target.parentElement.dataset.type]--;
                            if(objO[event.target.parentElement.dataset.type] == 1) {
                            offerLists[0].querySelector(`.${event.target.parentElement.dataset.type}val`).textContent = "";
                            offerLists[0].querySelector(`.${event.target.parentElement.dataset.type}`).textContent = "";
                            } else {
                            offerLists[0].querySelector(`.${event.target.parentElement.dataset.type}val`).textContent = `(${(Number(obj[event.target.parentElement.dataset.type])*(Number(event.target.parentElement.dataset.num)*1000))/1000})`; 
                            }
                            offerLists[0].querySelector(`.${event.target.parentElement.dataset.type}`).textContent = `x${obj[event.target.parentElement.dataset.type]}`; 
                        } else {
                        event.target.parentElement.remove();
                        delete obj[event.target.parentElement.dataset.type];
                        }
                        }
                    }
                });
        }
        addBtns.forEach(btn => {
            btn.addEventListener("click", addFunc);
        })
        const favFunc = event => {
            if(event.target.closest(".red-bg")) {
                if(event.target.classList.contains("favorite")) {
                    alert("This item is already favorited!");
                } else {
                event.target.classList.add("favorite");
                clone = event.target.parentElement.cloneNode(true);
                clone.classList.add("favorited");
                itemSelection[1].querySelector(".favorites").appendChild(clone);
                Array.from(itemSelection[1].getElementsByClassName("favorited")).forEach(favorite => {
                    favorite.children[4].textContent = "Unfavorite";
                    favorite.children[4].onclick = e => {
                        e.target.parentElement.remove();
                        Array.from(itemSelection[1].querySelectorAll(".fav-btn")).find(elem => elem.classList.contains(favorite.children[5].dataset.type)).classList.remove("favorite");
                        localStorage.setItem("favorite-itemsO", itemSelection[1].querySelector(".favorites").innerHTML);
                    }
                    favorite.children[5].addEventListener("click", addFunc);
                    localStorage.setItem("favorite-itemsO", itemSelection[1].querySelector(".favorites").innerHTML);
                })
            }
            } else {
                if(event.target.classList.contains("favorite")) {
                    alert("This item is already favorited!");
                } else {
                event.target.classList.add("favorite");
                clone = event.target.parentElement.cloneNode(true);
                clone.classList.add("favorited");
                itemSelection[0].querySelector(".favorites").appendChild(clone);
                Array.from(itemSelection[0].getElementsByClassName("favorited")).forEach(favorite => {
                    favorite.children[4].textContent = "Unfavorite";
                    favorite.children[4].onclick = e => {
                        e.target.parentElement.remove();
                        Array.from(itemSelection[0].querySelectorAll(".fav-btn")).find(elem => elem.classList.contains(favorite.children[5].dataset.type)).classList.remove("favorite");
                        localStorage.setItem("favorite-items", itemSelection[0].querySelector(".favorites").innerHTML);
                    }
                    favorite.children[5].addEventListener("click", addFunc);
                    localStorage.setItem("favorite-items", itemSelection[0].querySelector(".favorites").innerHTML);
                })
            }
            }
        }
        const local_storage_version = `v1`;
        const savedVersion = localStorage.getItem("ls_v");
        if(local_storage_version !== savedVersion) {
            localStorage.clear();
            localStorage.setItem("ls_v", local_storage_version);
        }
        itemSelection[1].querySelector(".favorites").innerHTML = localStorage.getItem("favorite-itemsO");
        Array.from(itemSelection[1].getElementsByClassName("favorited")).forEach(favorite => {
            Array.from(itemSelection[1].querySelectorAll(".fav-btn")).forEach(elem => {
                if(elem.parentElement.children[5].dataset.type === favorite.children[5].dataset.type) {
                    elem.classList.add("favorite");
                    favorite.children[5].dataset.num = elem.parentElement.children[5].dataset.num;
                }
            })
            favorite.children[4].onclick = e => {
                e.target.parentElement.remove();
                Array.from(itemSelection[1].querySelectorAll(".fav-btn")).find(elem => elem.classList.contains(favorite.children[5].dataset.type)).classList.remove("favorite");
                localStorage.setItem("favorite-itemsO", itemSelection[1].querySelector(".favorites").innerHTML);
            }
        })
        Array.from(itemSelection[1].getElementsByClassName("favorited")).forEach(btn => {
            btn.children[5].addEventListener("click", addFunc);
        })
        itemSelection[0].querySelector(".favorites").innerHTML = localStorage.getItem("favorite-items");
        Array.from(itemSelection[0].getElementsByClassName("favorited")).forEach(favorite => {
            Array.from(itemSelection[0].querySelectorAll(".fav-btn")).forEach(elem => {
                if(elem.parentElement.children[5].dataset.type === favorite.children[5].dataset.type) {
                    elem.classList.add("favorite");
                    favorite.children[5].dataset.num = elem.parentElement.children[5].dataset.num;
                }
            })
            favorite.children[4].onclick = e => {
                e.target.parentElement.remove();
                Array.from(itemSelection[0].querySelectorAll(".fav-btn")).find(elem => elem.classList.contains(favorite.children[5].dataset.type)).classList.remove("favorite");
                localStorage.setItem("favorite-items", itemSelection[0].querySelector(".favorites").innerHTML);
            }
        })
        Array.from(itemSelection[0].getElementsByClassName("favorited")).forEach(btn => {
            btn.children[5].addEventListener("click", addFunc);
        })
        favBtns.forEach(btn => {
            btn.addEventListener("click", favFunc);
        })
    const searchFunc = () => {
    addBtns.forEach(button => {
    let regex = new RegExp(search.value.replace(/\s/g, ""), "i");
    if(regex.test(button.dataset.type.replace(/\s/g, ""))) {
        button.parentElement.style.display = "flex";
    } else {
        button.parentElement.style.display = "none";
    }
    }) 
    }
    search.addEventListener("input", searchFunc);
    search.addEventListener("click", () => {
        search.value = "";
        searchFunc();
    });
    clear.addEventListener("click", () => {
        tVal = 0;
        yVal = 0;
        theirVal.textContent = `${tVal}`;
        yourVal.textContent = `${yVal}`;
        obj = {};
        objO = {};
        search.value = "";
        searchFunc();
        wfl.textContent = "FAIR";
        offerLists.forEach(list => {
            list.innerHTML = "";
        })
    });
    const filterStat = document.getElementById("filter");
    const filterFunc = () => {
        addBtns.forEach(btn => {
            btn.parentElement.style.display = "none";
            if(filterStat.value == "All Hit Effects") {
                btn.parentElement.style.display = "flex";
            } else if(filterStat.value == "Only Mythics" && btn.dataset.rare == "mythical") {
                btn.parentElement.style.display = "flex";
            } else if(filterStat.value == "Only Legendary+" && (btn.dataset.rare == "legendary" || btn.dataset.rare == "mythical")) {
                btn.parentElement.style.display = "flex";
            } else if(filterStat.value == "Only Epics+" && (btn.dataset.rare == "epic" || btn.dataset.rare == "legendary" || btn.dataset.rare == "mythical")) {
                btn.parentElement.style.display = "flex";
            }
        })
    }
    filterStat.addEventListener("change", filterFunc);
    })
const question = Array.from(document.getElementsByClassName("question"));
const answer = Array.from(document.getElementsByClassName("answer"));
const icon = Array.from(document.getElementsByClassName("faq-icon"));
const faqExpand = num => {
    if(question[num].classList.contains("closed")) {
    question[num].style.borderBottomLeftRadius = "0";
    question[num].style.borderBottomRightRadius = "0";
    question[num].style.borderBottom = "none";
    icon[num].style.transform = "rotate(-180deg)";
    answer[num].style.height = "150px";
    answer[num].style.position = "relative";
    answer[num].style.opacity = "1";
    answer[num].style.top = "0";
    } else {
    question[num].style.borderBottomLeftRadius = "10px";
    question[num].style.borderBottomRightRadius = "10px";
    question[num].style.borderBottom = "border: 1px solid rgb(53, 53, 53)";
    icon[num].style.transform = "rotate(0deg)";
    answer[num].style.height = "0";
    setTimeout(() => {
    answer[num].style.position = "absolute";
    answer[num].style.top = "-200px";
    answer[num].style.opacity = "0";
    }, 50);
    }
    question[num].classList.toggle("closed");
}
question[0].addEventListener("click", () => faqExpand(0));
question[1].addEventListener("click", () => faqExpand(1));
question[2].addEventListener("click", () => faqExpand(2));
question[3].addEventListener("click", () => faqExpand(3));
