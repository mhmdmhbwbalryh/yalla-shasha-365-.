// =======================
// إعدادات الجولات مع كلمة "فريق"
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

function showMatches(index){
  const container = document.getElementById("matchesContainer");
  container.innerHTML = "";
  
  days[index].matches.forEach(item=>{
    container.innerHTML += `<div class="match-card">
      ${item.team1} ضد ${item.team2}
    </div>`;
  });
  
  container.innerHTML += `<div style="text-align:center;margin:10px;color:#facc15;">
راحة 💤 : ${days[index].rest}</div>`;
  
  document.getElementById("currentDay").innerText = days[index].name;
}

function nextDay(){
  currentDayIndex = (currentDayIndex + 1) % days.length;
  showMatches(currentDayIndex);
}

function prevDay(){
  currentDayIndex = (currentDayIndex - 1 + days.length) % days.length;
  showMatches(currentDayIndex);
}

showMatches(currentDayIndex);

// =======================
// العداد فقط (بداية المباراة 8:27)
// =======================
let matchDuration = 20;
let liveStarted = false;
let currentMinute = 0;

function startCountdown(){
  let now = new Date();
  let matchTime = new Date();
  matchTime.setHours(20); // 8 مساءً
  matchTime.setMinutes(27); // 27 دقيقة
  matchTime.setSeconds(0);

  let interval = setInterval(function(){
    let now = new Date();
    let diff = matchTime - now;

    if(diff <= 0){
      clearInterval(interval);
      document.getElementById("countdown").innerHTML = 
        "⏳ حان وقت المباراة (لن يتم تشغيل مباشر)";
      return;
    }

    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML =
      "⏳ متبقي: " + minutes + " دقيقة و " + seconds + " ثانية";

  },1000);
}

startCountdown();

// =======================
// نظام الدوري + إدخال النتائج
// =======================
let teams = ["الفريق A","الفريق B","الفريق C","الفريق D","الفريق E","الفريق F","الفريق G"];

let data = JSON.parse(localStorage.getItem("leagueData")) || {};

teams.forEach(team=>{
  if(!data[team]){
    data[team]={played:0,win:0,draw:0,lose:0,goalsFor:0,goalsAgainst:0,points:0};
  }
});

function saveData(){
  localStorage.setItem("leagueData",JSON.stringify(data));
}

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

  data[t1].played++;
  data[t2].played++;

  data[t1].goalsFor+=s1;
  data[t1].goalsAgainst+=s2;

  data[t2].goalsFor+=s2;
  data[t2].goalsAgainst+=s1;

  if(s1>s2){data[t1].win++;data[t2].lose++;data[t1].points+=3;}
  else if(s1<s2){data[t2].win++;data[t1].lose++;data[t2].points+=3;}
  else{data[t1].draw++;data[t2].draw++;data[t1].points++;data[t2].points++;}

  saveData();
  updateTable();
}

function updateTable(){
  let table=document.getElementById("table");
  table.innerHTML=`
<tr>
<th>الفريق</th>
<th>لعب</th>
<th>فاز</th>
<th>تعادل</th>
<th>خسر</th>
<th>له</th>
<th>عليه</th>
<th>نقاط</th>
</tr>
`;

  let sorted=Object.entries(data).sort((a,b)=>b[1].points-a[1].points);

  sorted.forEach(([team,stats])=>{
    table.innerHTML+=`
<tr>
<td>${team}</td>
<td>${stats.played}</td>
<td>${stats.win}</td>
<td>${stats.draw}</td>
<td>${stats.lose}</td>
<td>${stats.goalsFor}</td>
<td>${stats.goalsAgainst}</td>
<td>${stats.points}</td>
</tr>
`;
  });
}

populateTeams();
updateTable();
