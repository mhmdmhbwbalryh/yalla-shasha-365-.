const adminBtn = document.getElementById("admin-btn");
const adminPanel = document.getElementById("admin-panel");
const matchList = document.getElementById("matchList");

// عرض مباريات محفوظة
let matches = JSON.parse(localStorage.getItem("matches")) || [];
renderMatches();

adminBtn.onclick = () => {
    const pass = prompt("ادخل كلمة السر:");
    if (pass === "1234") {
        adminPanel.style.display = "block";
        alert("دخلت كإدمن ✏️");
    } else {
        alert("كلمة السر خاطئة");
    }
};

function addMatch() {
    const input = document.getElementById("matchInput");
    if (input.value !== "") {
        matches.push(input.value);
        localStorage.setItem("matches", JSON.stringify(matches));
        input.value = "";
        renderMatches();
    }
}

function renderMatches() {
    matchList.innerHTML = "";
    matches.forEach(match => {
        const li = document.createElement("li");
        li.textContent = match;
        matchList.appendChild(li);
    });
}
