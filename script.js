// الفرق واللاعبين
const teams = {
  "الهجانة":["عثمانو","عبدالرحمن","محمد","العاقب","عبدالله"],
  "سنايبر":["محمد محبوب","عبدالحكم","عبدالله اليسع","أحمد محمد","حافظ"],
  "الفدائيين":["إسماعيل","مزمل","محمد عبدو","طريفي","مضوي"],
  "أمن يا جن":["محمد مانفي","عبدو","أحمد كريش","حمد","حملمي"],
  "العمل الخاص":["أسامة أحمد عبدالكريم","عمر","حمدون","دقلوس"],
  "أبوطيرة":["معاو","يوسف","صديق","حسين","إبراهيم"]
};

// بيانات المباريات + التوقيت
const matchesData = [
  {team1:"الهجانة", team2:"أبوطيرة", time:"15:00"},
  {team1:"العمل الخاص", team2:"أمن يا جن", time:"17:00"},
  {team1:"الفدائيين", team2:"سنايبر", time:"19:00"}
];

// عرض المباريات في الصفحة الرئيسية
function renderMatches(){
  const container = document.getElementById("matches");
  container.innerHTML="";
  matchesData.forEach((m,i)=>{
    const div = document.createElement("div");
    div.className="match-card";
    div.innerHTML=`<b>${m.team1}</b> vs <b>${m.team2}</b><br><small>التوقيت: ${m.time}</small>`;
    div.onclick=()=>openModal(m);
    container.appendChild(div);
  });
}

// فتح Modal للمباراة
function openModal(match){
  document.getElementById("modalTitle").innerText = `${match.team1} vs ${match.team2}`;
  document.getElementById("team1Field").innerHTML = `<b>${match.team1}</b><br>${teams[match.team1].join("<br>")}`;
  document.getElementById("team2Field").innerHTML = `<b>${match.team2}</b><br>${teams[match.team2].join("<br>")}`;
  // مؤقتاً بيانات النقاط والهدافين والصانعين
  document.getElementById("points").innerText = "الهجانة: 3\nأبوطيرة: 1";
  document.getElementById("scorers").innerText = "محمد محبوب: 2 أهداف";
  document.getElementById("assists").innerText = "أحمد محمد: 1 تمريرة حاسمة";

  document.getElementById("matchModal").style.display="block";
}

function closeModal(){
  document.getElementById("matchModal").style.display="none";
}

// الإعدادات
function toggleSettings(){
  const s = document.getElementById("settings");
  s.style.display = s.style.display==="none"?"block":"none";
}
function toggleTheme(){
  document.body.style.background = document.body.style.background.includes("#a0d8ff") ? "linear-gradient(to bottom, #001f3f, #000000)" : "linear-gradient(to bottom, #a0d8ff, #ffffff)";
}
function changeLang(lang){ alert("تغيير اللغة إلى: "+lang); }
function adminLogin(){
  let pw = prompt("أدخل كلمة السر:");
  if(pw==="123321"){
    alert("تم الدخول للوحة الإدارة");
  } else { alert("كلمة سر خاطئة!"); }
}

// بدء التطبيق
renderMatches();
