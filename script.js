const teams = {
  "الهجانة":["عثمانو","عبدالرحمن","محمد","العاقب","عبدالله"],
  "أبوطيرة":["معاو","يوسف","صديق","حسين","إبراهيم"],
  "العمل الخاص":["أسامة","عمر","حمدون","دقلوس","عبدالكريم"],
  "أمن يا جن":["مانفي","عبدو","كريش","حمد","حملمي"],
  "الفدائيين":["إسماعيل","مزمل","عبدو","طريفي","مضوي"],
  "سنايبر":["محمد محبوب","عبدالحكم","اليسع","أحمد","حافظ"]
};

const standings = [
  {team:"سنايبر",pts:10,w:3,l:1},
  {team:"الهجانة",pts:9,w:3,l:2},
  {team:"الفدائيين",pts:7,w:2,l:2}
];

const scorers = [
  {name:"محمد محبوب",g:5},
  {name:"إسماعيل",g:4}
];

function openMatch(){
  document.getElementById("modal").style.display="block";
}

function closeMatch(){
  document.getElementById("modal").style.display="none";
}

function showLineup(){
  const v=document.getElementById("view");
  v.innerHTML=`
  <div class="field">
    <div class="half left">${drawTeam("الهجانة",false)}</div>
    <div class="half right">${drawTeam("أبوطيرة",true)}</div>
  </div>`;
}

function drawTeam(team,flip){
  const pos = [
    [45,85],[25,60],[65,60],[30,30],[60,30]
  ];
  return teams[team].map((p,i)=>{
    let x=pos[i][0],y=pos[i][1];
    if(flip) x=100-x;
    return `<div class="player" style="left:${x}%;top:${y}%">${p}</div>`;
  }).join("");
}

function showStandings(){
  document.getElementById("view").innerHTML =
    standings.map(t=>`${t.team} - ${t.pts} نقطة`).join("<br>");
}

function showScorers(){
  document.getElementById("view").innerHTML =
    scorers.map(s=>`${s.name} (${s.g})`).join("<br>");
}

function showAssists(){
  document.getElementById("view").innerHTML = "فارغ حالياً";
}

function adminLogin(){
  const pw=prompt("كلمة السر");
  if(pw==="12333221"){
    alert("وضع الإدارة (تعديل البيانات لاحقاً)");
  } else alert("خطأ");
}
