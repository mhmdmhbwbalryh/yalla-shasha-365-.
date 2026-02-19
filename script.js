// =======================
// العداد + مباشر
// =======================
let matchDuration = 20;
let liveStarted = false;
let currentMinute = 0;

function startCountdown(){
let now = new Date();
let matchTime = new Date();
matchTime.setHours(20);
matchTime.setMinutes(40);
matchTime.setSeconds(0);

let interval = setInterval(function(){
let now = new Date();
let diff = matchTime - now;

if(diff <= 0){
clearInterval(interval);
goLive();
return;
}

let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
let seconds = Math.floor((diff % (1000 * 60)) / 1000);

document.getElementById("countdown").innerHTML =
"⏳ متبقي: " + minutes + " دقيقة و " + seconds + " ثانية";

},1000);
}

function goLive(){
document.getElementById("countdown").innerHTML = "🔴 مباشر الآن";
let match = document.getElementById("liveMatch");
match.classList.add("live");
match.innerHTML += "<div id='minute'>⏱ الدقيقة 0</div>";
startTimer();
}

function startTimer(){
setInterval(()=>{
currentMinute++;
if(currentMinute <= matchDuration){
document.getElementById("minute").innerHTML =
"⏱ الدقيقة " + currentMinute;
}else{
document.getElementById("minute").innerHTML =
"✅ انتهت المباراة";
}
},60000);
}

startCountdown();

// =======================
// نظام الدوري
// =======================
let teams = [
"حمد صلاح",
"عبدالرحيم",
"أحمد محمد يوسف",
"عبدالرحمن",
"معاوية",
"عبدالمؤمن",
"حافظ بشير"
];

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
