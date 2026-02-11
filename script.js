let currentMatch=0;

const matches=[
  {home:"الهجانة",away:"أبوطيرة"},
  {home:"العمل الخاص",away:"أمن يا جن"},
  {home:"الفدائيين",away:"سنايبر"}
];

const teams={
  "الهجانة":["عثمانو","عبدالرحمن","محمد","العاقب","عبدالله"],
  "أبوطيرة":["معاو","يوسف","صديق","حسين","إبراهيم"],
  "العمل الخاص":["أسامة","عمر","حمدون","دقلوس","عبدالكريم"],
  "أمن يا جن":["مانفي","عبدو","كريش","حمد","حملمي"],
  "الفدائيين":["إسماعيل","مزمل","عبدو","طريفي","مضوي"],
  "سنايبر":["محمد محبوب","عبدالحكم","اليسع","أحمد","حافظ"]
};

const standings=[
  {team:"سنايبر",pts:12},
  {team:"الهجانة",pts:9},
  {team:"الفدائيين",pts:7},
  {team:"العمل الخاص",pts:6},
  {team:"أمن يا جن",pts:4},
  {team:"أبوطيرة",pts:2}
];

const scorers=[
  {name:"محمد محبوب",g:6},
  {name:"إسماعيل",g:5},
  {name:"عثمانو",g:4}
];

const assists=[
  {name:"عبدالحكم",a:3},
  {name:"مزمل",a:2}
];

function openMatch(id){
  currentMatch=id;
  document.getElementById("home").style.display="none";
  document.getElementById("details").classList.remove("hidden");
}

function goHome(){
  document.getElementById("details").classList.add("hidden");
  document.getElementById("home").style.display="block";
  document.getElementById("content").innerHTML="";
}

function showLineup(){
  const m=matches[currentMatch];
  document.getElementById("content").innerHTML=
    `<div class="field">
      ${drawTeam(m.home,false)}
      ${drawTeam(m.away,true)}
    </div>`;
}

function drawTeam(team,flip){
  const pos=[[45,85],[25,60],[65,60],[30,30],[60,30]];
  return teams[team].map((p,i)=>{
    let x=pos[i][0],y=pos[i][1];
    if(flip) x=100-x;
    return `<div class="player" style="left:${x}%;top:${y}%">${p}</div>`;
  }).join("");
}

function showStandings(){
  document.getElementById("content").innerHTML=
    standings.map(t=>`${t.team} - ${t.pts} نقطة`).join("<br>");
}

function showScorers(){
  document.getElementById("content").innerHTML=
    scorers.map(s=>`${s.name} (${s.g})`).join("<br>");
}

function showAssists(){
  document.getElementById("content").innerHTML=
    assists.map(a=>`${a.name} (${a.a})`).join("<br>");
}
