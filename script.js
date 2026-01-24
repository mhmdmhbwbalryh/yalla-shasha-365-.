// ======== التنقل بين الصفحات ========
function showPage(page) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.style.display = 'none');
    document.getElementById(page).style.display = 'block';
    document.getElementById('lineup').style.display = 'none';
}

// ======== البيانات ========
let matches = JSON.parse(localStorage.getItem("matches")) || [];
let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
let topScorers = JSON.parse(localStorage.getItem("topScorers")) || [];

const matchList = document.getElementById('matchList');
const rankingList = document.getElementById('rankingList');
const topScorersList = document.getElementById('topScorersList');

// ======== عرض البيانات ========
function renderMatches() {
    matchList.innerHTML = '';
    matches.forEach((m, i) => {
        const li = document.createElement('li');
        li.textContent = m.name;
        li.className = 'match-card';
        li.onclick = () => showLineup(i);
        matchList.appendChild(li);
    });
}

function renderRanking() {
    rankingList.innerHTML = '';
    ranking.forEach(team => {
        const li = document.createElement('li');
        li.textContent = `${team.name} - ${team.points} نقاط`;
        rankingList.appendChild(li);
    });
}

function renderTopScorers() {
    topScorersList.innerHTML = '';
    topScorers.forEach(player => {
        const li = document.createElement('li');
        li.textContent = `${player.name} - ${player.goals} أهداف`;
        topScorersList.appendChild(li);
    });
}

// ======== لوحة الإدمن ========
const adminBtn = document.getElementById('admin-btn');
const adminPanel = document.getElementById('admin-panel');

adminBtn.onclick = () => {
    const pass = prompt("ادخل كلمة السر:");
    if(pass === "1234") {
        adminPanel.style.display = "block";
        alert("أنت الآن إدمن ✏️");
    } else {
        alert("كلمة السر خاطئة");
    }
};

function addMatch() {
    const input = document.getElementById('matchInput');
    if(input.value !== "") {
        matches.push({name: input.value, lineup: ["لاعب1","لاعب2","لاعب3"]});
        localStorage.setItem("matches", JSON.stringify(matches));
        input.value = "";
        renderMatches();
    }
}

// ======== عرض التشكيلة ========
function showLineup(index) {
    const div = document.getElementById('lineup');
    div.style.display = 'block';
    div.innerHTML = `<h3>تشكيلة المباراة</h3><ul id="lineupList"></ul>`;
    const ul = document.getElementById('lineupList');
    matches[index].lineup.forEach(player => {
        const li = document.createElement('li');
        li.textContent = player;
        li.onclick = () => alert(`${player}\nمواصفات اللاعب`);
        ul.appendChild(li);
    });
}

// ======== الوضع نهاري / ليلي ========
function setTheme(theme) {
    if(theme === 'day') {
        document.body.style.background = '#f5f5f5';
        document.body.style.color = '#000';
    } else {
        document.body.style.background = '#121212';
        document.body.style.color = '#fff';
    }
}

// ======== تغيير اللغة ========
function setLang(lang) {
    const title = document.getElementById('site-title');
    if(lang === 'ar') title.textContent = 'يلا شوت شاشا ⚽';
    else title.textContent = 'Yalla Shasha ⚽';
}

// ======== أول تحميل ========
renderMatches();
renderRanking();
renderTopScorers();
