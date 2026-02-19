// الفرق السبعة
const teams = ["معاوية محبوب","حافظ بشير","عبدالرحيم محمد يوسف","أحمد محمد يوسف","عبدالرحمن محمد","عبدالمومن بابكر","حمد صلاح"];

// جدول الجولات: كل يوم مباراة واحدة + فريق راحة
const matchesSchedule = [
  { match:{team1:"حمد صلاح", team2:"عبدالرحيم محمد يوسف"}, rest:"حافظ بشير"},
  { match:{team1:"أحمد محمد يوسف", team2:"عبدالرحمن محمد"}, rest:"عبدالمومن بابكر"},
  { match:{team1:"معاوية محبوب", team2:"عبدالمومن بابكر"}, rest:"حمد صلاح"},
  { match:{team1:"حافظ بشير", team2:"أحمد محمد يوسف"}, rest:"عبدالرحيم محمد يوسف"},
  { match:{team1:"عبدالرحمن محمد", team2:"حمد صلاح"}, rest:"معاوية محبوب"},
  { match:{team1:"عبدالمومن بابكر", team2:"عبدالرحيم محمد يوسف"}, rest:"أحمد محمد يوسف"},
  { match:{team1:"معاوية محبوب", team2:"حافظ بشير"}, rest:"عبدالرحمن محمد"}
];

let currentIndex = 0;

// تشكيلة كل فريق
const teamLineups = {
"معاوية محبوب":["معاوية","عبدالله","مصطفى","أحمد ح","العاقب","أحمد ل","عباس"],
"حافظ بشير":["حافظ","محمد ه","رحمة الله","بكري","ابراهيم ح","ابراهيم أ","سعيد"],
"عبدالرحيم محمد يوسف":["عبدالرحيم","اسماعيل","محمد ع","ابراهيم أ","محمد أ","عثمان","محمد ب"],
"أحمد محمد يوسف":["أحمد م","محمد م","الطريفي","محمد ع","عمر","عبدالله","أحمد ب"],
"عبدالرحمن محمد":["عبدالرحمن","يوسف","مضوي","يوسف أ","مدثر","البراء","محمد ن"],
"عبدالمومن بابكر":["عبدالمومن","أحمد ك","يوسف خ","محمد ع","حمد م","محي الدين","حمد ن"],
"حمد صلاح":["حمد صلاح","مزمل","الطريفي أ","محمد ح","عبدالوهاب","يوسف","الريح"]
};

// عرض المباراة الحالية
function showCurrentMatch(){
  const container = document.getElementById("matchesContainer");
  container.innerHTML = "";
  const m = matchesSchedule[currentIndex].match;
  const matchDiv = document.createElement("div");
  matchDiv.className = "match-card";
  matchDiv.innerHTML = `${m.team1} ضد ${m.team2}`;
  
  matchDiv.onclick = function(){
    let lineupDiv = this.querySelector(".lineup");
    if(lineupDiv){ lineupDiv.style.display = lineupDiv.style.display==="none"?"block":"none"; }
    else{
      lineupDiv = document.createElement("div");
      lineupDiv.className = "lineup";
      lineupDiv.innerHTML = `<p>تشكيلة ${m.team1}: ${teamLineups[m.team1].join(", ")}</p>
                             <p>تشكيلة ${m.team2}: ${teamLineups[m.team2].join(", ")}</p>`;
      this.appendChild(lineupDiv);
      lineupDiv.style.display="block";
    }
  };
  
  container.appendChild(matchDiv);
  container.innerHTML += `<div style="text-align:center;margin:10px;color:#facc15;">راحة 💤 : ${matchesSchedule[currentIndex].rest}</div>`;
  document.getElementById("currentMatch").innerText = `المباراة ${currentIndex+1}`;
}

// أزرار التنقل
function nextMatch(){ currentIndex = (currentIndex+1) % matchesSchedule.length; showCurrentMatch();}
function prevMatch(){ currentIndex = (currentIndex-1+matchesSchedule.length) % matchesSchedule.length; showCurrentMatch();}

// عداد الساعة 8:27
function startCountdown(){
  let matchTime = new Date();
  matchTime.setHours(20); matchTime.setMinutes(27); matchTime.setSeconds(0);
  setInterval(function(){
    let now = new Date();
    let diff = matchTime-now;
    if(diff<=0){ document.getElementById("countdown").innerHTML="⏳ حان وقت المباراة (لن يتم تشغيل مباشر)"; return;}
    let minutes = Math.floor((diff%(1000*60*60))/(1000*60));
    let seconds = Math.floor((diff%(1000*60))/1000);
    document.getElementById("countdown").innerHTML="⏳ متبقي: "+minutes+" دقيقة و "+seconds+" ثانية";
  },1000);
}

showCurrentMatch();
startCountdown();

// =====================================
// جدول الدوري والهدافين (كما في النسخة السابقة)
// =====================================
// يمكنك إعادة استخدام نفس كود الجدول والهدافين من النسخة السابقة هنا
