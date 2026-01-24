// عرض البيانات مباشرة لأي شخص
document.getElementById('matches').innerHTML = `
    <h2>المباريات</h2>
    <ul>
        <li>فريق C 0 - 3 فريق D</li>
        <li>فريق E 1 - 1 فريق F</li>
    </ul>
`;

document.getElementById('ranking').innerHTML = `
    <h2>الترتيب</h2>
    <ol>
        <li>فريق A - 10 نقاط</li>
        <li>فريق D - 8 نقاط</li>
        <li>فريق F - 6 نقاط</li>
        <li>فريق B - 4 نقاط</li>
        <li>فريق C - 3 نقاط</li>
        <li>فريق E - 2 نقاط</li>
    </ol>
`;

document.getElementById('top-scorers').innerHTML = `
    <h2>أفضل الهدافين</h2>
    <p>لاعب X - 5 أهداف</p>
    <p>لاعب Y - 4 أهداف</p>
    <p>لاعب Z - 3 أهداف</p>
`;

// زر الإدمن
const adminBtn = document.getElementById('admin-btn');
adminBtn.addEventListener('click', () => {
    const password = prompt("ادخل الرقم السري:");
    if (password === "1234") {
        alert("أنت الآن إدمن ✏️\nعدّل النتائج من الكود");
    } else {
        alert("كلمة السر خاطئة");
    }
});
