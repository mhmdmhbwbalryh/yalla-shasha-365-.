// =======================
// بيانات الجولات
// =======================
const days = [
  {name:"اليوم", matches:[
    {team1:"الفريق A", team2:"الفريق B"},
    {team1:"الفريق C", team2:"الفريق D"},
    {team1:"الفريق E", team2:"الفريق F"}
  ], rest:"حافظ بشير"},
  
  {name:"غداً", matches:[
    {team1:"الفريق G", team2:"الفريق A"},
    {team1:"الفريق B", team2:"الفريق C"},
    {team1:"الفريق D", team2:"الفريق E"}
  ], rest:"عبدالرحمن"},
  
  {name:"بعد غد", matches:[
    {team1:"الفريق F", team2:"الفريق G"},
    {team1:"الفريق A", team2:"الفريق C"},
    {team1:"الفريق B", team2:"الفريق D"}
  ], rest:"أحمد محمد يوسف"}
];

let currentDayIndex = 0;

// =======================
// التشكيلات
// =======================
const teamLineups = {
  "الفريق A": ["معاوية محبوب","عبدالله الريح حمد","مصطفي عباس","احمد حسن","العاقب بلوله","احمد عبد اللطيف","عباس"],
  "الفريق B": ["حافظ بشير","محمد هيثم","رحمة الله عبدالرحمن","بكري صلاح","ابراهيم عبدالحكم","ابراهيم ابوعاقلة","سعيد مبارك"],
  "الفريق C": ["عبدالرحيم محمد يوسف","اسماعيل حسين حمد","محمد عبد الرحمن","ابراهيم اسامه","محمد محبوب ابوعاقله","عثمان عمر الماحي","محمد بشير"],
  "الفريق D": ["احمد محمد يوسف","محمد محبوب الريح","الطريفي رحمة الله","محمد عمر","عمر حسن حمد","عبدالله اليسع","احمد البشير"],
  "الفريق E": ["عبدالرحمن محمد","يوسف حسين","مضوي الريح","يوسف الامين","مدثر عبدالحفيظ","البراء محمد","محمد حمد النيل"],
  "الفريق F": ["عبدالمومن بابكر","احمد عبدالكريم","يوسف خالد","محمد عبدالحفيظ","حمد. الماحي","محي الدين الريح","حمد النيل يوسف"],
  "الفريق G": ["حمد صلاح","مزمل عبدالحفيظ","الطريفي عبدالباقي","محمد حمزة","عبدالوهاب بابكر","يوسف الريح","الريح يوسف"]
};

// =======================
// عرض المباريات مع onclick للتشكيلة
// =======================
function showMatches(index){
  const container = document.getElementById("matchesContainer");
  container.innerHTML = "";
  
  days[index].matches.forEach((item,i)=>{
    const matchDiv = document.createElement("div");
    matchDiv.className = "match-card";
    matchDiv.innerHTML = `${item.team1} ضد ${item.team2}`;
    
    matchDiv.onclick = function(){
      let lineupDiv = this.querySelector(".lineup");
      if(lineupDiv){
        lineupDiv.style.display = lineupDiv.style.display === "none" ? "block" : "none";
      } else {
        lineupDiv = document.createElement("div");
        lineupDiv.className = "lineup";
        lineupDiv.innerHTML = `<p>تشكيلة ${item.team1}: ${teamLineups[item.team1].join(", ")}</p>
                               <p>تشكيلة ${item.team2}: ${teamLineups[item.team2].join(", ")}</p>`;
        this.appendChild(lineupDiv);
        lineupDiv.style.display = "block";
      }
    };
    
    container.appendChild(matchDiv);
  });
  
  container.innerHTML += `<div style="text-align:center;margin:10px;color:#facc15;">
راحة 💤 : ${days[index].rest}</div>`;
  
  document.getElementById("currentDay").innerText = days[index].name;
}

function nextDay(){currentDayIndex = (currentDayIndex + 1) % days.length; showMatches(currentDayIndex);}
function prevDay(){currentDayIndex = (currentDayIndex - 1 + days.length) % days.length; showMatches(currentDayIndex);}

showMatches(currentDayIndex);

// =======================
// العداد
// =======================
function startCountdown(){
  let matchTime = new Date();
  matchTime.setHours(20);
  matchTime.setMinutes(27);
  matchTime.setSeconds(0);

  let interval = setInterval(function(){
    let now = new Date();
    let diff = matchTime - now;
    if(diff <=0){
      clearInterval(interval);
      document.getElementById("countdown").innerHTML = "⏳ حان وقت المباراة (لن يتم تشغيل مباشر)";
      return;
    }
    let minutes = Math.floor((diff % (1000*60*60))/(1000*60));
    let seconds = Math.floor((diff % (1000*60))/1000);
    document.getElementById("countdown").innerHTML = "⏳ متبقي: " + minutes + " دقيقة و " + seconds + " ثانية";
  },1000);
}
startCountdown();

// =======================
// جدول الدوري
// =======================
let teams = Object.keys(teamLineups);
let data = JSON.parse(localStorage.getItem("leagueData")) || {};
teams.forEach(team=>{if(!data[team]){data[team]={played:0,win:0,draw:0,lose:0,goalsFor:0,goalsAgainst:0,points:0};}});
function saveData(){ localStorage.setItem("leagueData",JSON.stringify(data)); }

function populateTeams(){
  let t1=document.getElementById("team1");
  let t2=document.getElementById("team2");
  teams.forEach(team=>{
    t1.innerHTML+=`<option>${team}</option>`;
    t2.innerHTML+=`<option>${team}</option>`;
  });
}

function addMatch(){
  let t1=document.getElementById("team1").value;
  let t2=document.getElementById("team2").value;
  let s1=parseInt(document.getElementById("score1").value);
  let s2=parseInt(document.getElementById("score2").value);

  if(t1===t2){alert("لا يمكن نفس الفريق");return;}
  data[t1].played++; data[t2].played++;
  data[t1].goalsFor+=s1; data[t1].goalsAgainst+=s2;
  data[t2].goalsFor+=s2; data[t2].goalsAgainst+=s1;
  if(s1>s2){data[t1].win++;data[t2].lose++;data[t1].points+=3;}
  else if(s1<s2){data[t2].win++;data[t1].lose++;data[t2].points+=3;}
  else{data[t1].draw++;data[t2].draw++;data[t1].points++;data[t2].points++;}
  saveData(); updateTable(); updateScorers();
}

function updateTable(){
  let table=document.getElementById("table");
  table.innerHTML=`
<tr>
<th>الفريق</th><th>لعب</th><th>فاز</th><th>تعادل</th><th>خسر</th><th>له</th><th>عليه</th><th>نقاط</th>
</tr>`;
  let sorted=Object.entries(data).sort((a,b)=>b[1].points-a[1].points);
  sorted.forEach(([team,stats])=>{
    table.innerHTML+=`<tr>
<td>${team}</td><td>${stats.played}</td><td>${stats.win}</td><td>${stats.draw}</td>
<td>${stats.lose}</td><td>${stats.goalsFor}</td><td>${stats.goalsAgainst}</td><td>${stats.points}</td>
</tr>`;
  });
}

// =======================
// جدول الهدافين وصانعي الأهداف (فارغ افتراضي)
// =======================
let scorers = [];
function updateScorers(){
  let table = document.getElementById("scorers");
  table.innerHTML=`
<tr><th>اللاعب</th><th>الفريق</th><th>الأهداف</th><th>التمريرات الحاسمة</th></tr>`;
  scorers.forEach(player=>{
    table.innerHTML+=`<tr><td>${player.name}</td><td>${player.team}</td><td>${player.goals}</td><td>${player.assists}</td></tr>`;
  });
}

populateTeams(); updateTable(); updateScorers();
