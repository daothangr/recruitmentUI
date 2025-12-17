import { renderCandidateTable } from "./candidateTable.js";



const pageSizeSelect = document.querySelector(".page-size-content");
const totalRecord = document.getElementById("total-record");
const recordRange = document.getElementById("record-range");
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");

let currentPage = 1;
let pageSize = Number(pageSizeSelect.value);


function getAllData() {
    return JSON.parse(localStorage.getItem("candidateList")) || [];
}

let allData = getAllData();
totalRecord.textContent = allData.length;

function updateButtonStyle(button, disabled) {
    button.disabled = disabled;
    button.style.backgroundColor = disabled ? "#d1d5db" : "#7a8188"; 
    button.style.cursor = disabled ? "not-allowed" : "pointer";
}

function paginate() {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    const pageData = allData.slice(start, end);
    renderCandidateTable(pageData);


    const from = allData.length === 0 ? 0 : start + 1;
    const to = Math.min(end, allData.length);
    recordRange.textContent = `${from} - ${to} bản ghi`;

    updateButtonStyle(prevBtn, currentPage === 1);
    updateButtonStyle(nextBtn, end >= allData.length);
}

pageSizeSelect.addEventListener("change", () => {
    pageSize = Number(pageSizeSelect.value);
    currentPage = 1;
    paginate();
});

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        paginate();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentPage * pageSize < allData.length) {
        currentPage++;
        paginate();
    }
});


paginate();

export function restartPagination() {
    currentPage = 1;
    allData = getAllData();
    totalRecord.textContent = allData.length;
    paginate();
}

