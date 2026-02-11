const matches = [
  {
    home:"الهجانة",
    away:"أبوطيرة",
    score:"2 - 1",
    status:"انتهت",
    scorers:["عثمانو 1","محمد 1","يوسف 1"]
  },
  {
    home:"العمل الخاص",
    away:"أمن يا جن",
    score:"1 - 1",
    status:"LIVE",
    scorers:["عمر 1","عبدو 1"]
  },
  {
    home:"الفدائيين",
    away:"سنايبر",
    score:"3 - 2",
    status:"انتهت",
    scorers:["إسماعيل 2","محمد محبوب 2"]
  }
];

const teams = {
  "الهجانة":["عثمانو","عبدالرحمن","محمد","العاقب","عبدالله"],
  "أبوطيرة":["معاو","يوسف","صديق","حسين","إبراهيم"]
};

function openMatch(id){
  localStorage.setItem("currentMatch",id);
  window.location="match.html";
}

function goBack(){
  window.location="index.html";
}

if(document.getElementById("matchDetails")){
  const id=localStorage.getItem("currentMatch");
  const match=matches[id];

  document.getElementById("matchDetails").innerHTML=`
    <h2>${match.home} ${match.score} ${match.away}</h2>
    <p>${match.status}</p>
    <h3>الهدافين</h3>
    ${match.scorers.join("<br>")}
  `;
}

function showLineup(){
  const area=document.getElementById("lineupArea");
  area.innerHTML=`<div class="field">${drawTeam("الهجانة",false)+drawTeam("أبوطيرة",true)}</div>`;
}

function drawTeam(team,flip){
  const pos=[[45,85],[25,60],[65,60],[30,30],[60,30]];
  return teams[team].map((p,i)=>{
    let x=pos[i][0],y=pos[i][1];
    if(flip) x=100-x;
    return `<div class="player" style="left:${x}%;top:${y}%">${p}</div>`;
  }).join("");
}
