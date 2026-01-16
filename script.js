function findTrain() {
    let from = document.getElementById('fromStation').value;
    let to = document.getElementById('toStation').value;
    let area = document.getElementById('displayArea');
    
    if (from === "" || to === "") {
        alert("Please enter stations");
        return;
    }

    // بنملى البيانات في الـ HTML اللي جهزناه
    document.getElementById('resFrom').innerText = from;
    document.getElementById('resTo').innerText = to;
    
    // بنظهر المربع الأخضر
    area.style.display = "block";
}
var map = L.map('map').setView([30.0444, 31.2357], 7); // القاهرة
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// ماركر لقطار الإسكندرية كمثال
L.marker([31.2001, 29.9187]).addTo(map).bindPopup('قطار 901: حالياً في الإسكندرية');
// قاعدة بيانات القطارات (مثال لجميع الخطوط)
const trainData = [
    { id: "901", from: "القاهرة", to: "الإسكندرية", time: "08:15 AM", type: "VIP", price: "145 LE" },
    { id: "911", from: "القاهرة", to: "الإسكندرية", time: "11:00 AM", type: "توربيني", price: "70 LE" },
    { id: "980", from: "القاهرة", to: "أسوان", time: "08:00 PM", type: "VIP", price: "250 LE" },
    { id: "2008", from: "الإسكندرية", to: "أسوان", time: "07:00 PM", type: "تالجو", price: "600 LE" },
    { id: "164", from: "أسيوط", to: "القاهرة", time: "05:30 AM", type: "روسي", price: "50 LE" }
];

function findTrain() {
    let from = document.getElementById('fromStation').value;
    let to = document.getElementById('toStation').value;
    let area = document.getElementById('displayArea');
    
    // البحث عن الرحلات المطابقة
    let trips = trainData.filter(t => t.from === from && t.to === to);
    
    if (trips.length === 0) {
        area.style.display = "block";
        area.style.background = "#c0392b";
        area.innerHTML = "<h3>❌ لا توجد رحلات مباشرة حالياً</h3>";
        return;
    }

    // عرض النتائج
    area.style.display = "block";
    area.style.background = "#2e7d32";
    area.innerHTML = "<h3>✅ الرحلات المتاحة:</h3>";
    
    trips.forEach(trip => {
        area.innerHTML += `
            <div style="border-bottom:1px solid #fff; padding:10px; margin-bottom:5px;">
                <p><b>قطار رقم:</b> ${trip.id} (${trip.type})</p>
                <p><b>الموعد:</b> ${trip.time} | <b>السعر:</b> ${trip.price}</p>
            </div>
        `;const allTrains = [
    { id: "901", from: "القاهرة", to: "الإسكندرية", departure: "08:10 AM", type: "VIP", price: "145 LE" },
    { id: "980", from: "القاهرة", to: "المنيا", departure: "08:00 AM", type: "VIP", price: "155 LE" },
    { id: "164", from: "المنيا", to: "القاهرة", departure: "03:40 PM", type: "روسي", price: "50 LE" },
    { id: "990", from: "القاهرة", to: "أسيوط", departure: "04:00 PM", type: "إسباني", price: "120 LE" },
    { id: "2008", from: "الإسكندرية", to: "أسوان", departure: "07:00 PM", type: "تالجو", price: "600 LE" }
];

function findTrain() {
    let from = document.getElementById('fromStation').value;
    let to = document.getElementById('toStation').value;
    let display = document.getElementById('displayArea');

    // تصفية النتائج
    let results = allTrains.filter(t => t.from === from && t.to === to);

    display.style.display = "block";
    if (results.length > 0) {
        display.innerHTML = "<h3 style='color:#ff9800;'>الرحلات المتاحة:</h3>";
        results.forEach(t => {
            display.innerHTML += `
                <div style="background:#222; margin:10px 0; padding:15px; border-radius:10px; border-right:5px solid #ff9800; text-align:right;">
                    <p><b>قطار رقم:</b> ${t.id} (${t.type})</p>
                    <p><b>القيام:</b> ${t.departure} | <b>السعر:</b> ${t.price}</p>
                </div>`;
        });
    } else {
        display.innerHTML = "<h3 style='color:#ff4444;'>❌ لا توجد رحلات مباشرة حالياً</h3>";
    }
}

    });
}
