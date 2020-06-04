"use strict";

// Variables

const displayTop = document.querySelector('.calc__screen-top');
const displayBottom = document.querySelector('.calc__screen-bottom');
const calcKeys = document.querySelectorAll('.calc__keyboard-key');

let arr = [];
let sum = 0;


// React to buttons clicks

function listenKeys() {
    for (const key of calcKeys) {
        key.addEventListener("click", () => {

            if (!isNaN(key.dataset.idx)) {
                if (arr.length === 0 || isNaN(arr[arr.length - 1])) {
                    addToArr("push", key.dataset.idx);
                } else if (arr[arr.length - 1] !== "0") {
                    addToArr("add", key.dataset.idx);
                }
            }
            else if (key.dataset.idx === ".") {
                if (arr.length === 0 || isNaN(arr[arr.length - 1])) {
                    addToArr("push", "0.");
                } else if (!arr[arr.length - 1].includes(".")) {
                    addToArr("add", ".");
                }
            }
            else if (key.dataset.idx === "-") {
                addToArr("push", key.dataset.idx);
            }
            else if (key.dataset.idx === "+" || key.dataset.idx === "*" || key.dataset.idx === "/") {
                if (arr.length > 0) {
                    addToArr("push", key.dataset.idx);
                }
            }
            else if (key.dataset.idx === "ac") {
                arr = [];
                sum = 0;
            }
            else if (key.dataset.idx === "=") {
                if (arr.length > 0 && !isNaN(arr[arr.length - 1])) {
                    sum = eval(arr.join(""));
                    arr = [];
                }
            }

            updateScreen();
        });
    }
}


// Add new value to array

function addToArr(method, value) {
    if ((value === "+" || value === "-" || value === "*" || value === "/") && isNaN(arr[arr.length - 1])) {
        arr[arr.length - 1] = value;
    } else {
        if (arr.join("").length <= 35 || isNaN(arr[arr.length - 1])) {
            if (method === "push") {
                arr.push(value.toString());
            } else if (method === "add") {
                arr[arr.length - 1] += value.toString();
            }
        }
    }
}


// Update screen value

function updateScreen() {

    const equation = arr.join(" ").replace(/[/]/g, "÷").replace(/[*]/g, "x");
    displayTop.innerText = equation;

    if (sum == "Infinity" || isNaN(sum)) { sum = "Don't do that!"; }
    sum = sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (sum.toString().length > 6 || equation.toString().length > 13) {
        displayTop.classList.add("calc__screen-top--small");
        displayBottom.classList.add("calc__screen-bottom--small");
    } else {
        displayTop.classList.remove("calc__screen-top--small");
        displayBottom.classList.remove("calc__screen-bottom--small");
    }

    displayBottom.innerText = sum;
}


// Start

listenKeys();