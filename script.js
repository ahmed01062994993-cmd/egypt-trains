// تشغيل الخريطة فور تحميل الصفحة
var map = L.map('map').setView([30.0444, 31.2357], 6); 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// بيانات القطارات
const trainData = [
    { id: "901", from: "القاهرة", to: "الإسكندرية", time: "08:15 AM", type: "VIP", price: "145 LE" },
    { id: "980", from: "القاهرة", to: "المنيا", time: "08:00 AM", type: "VIP", price: "155 LE" },
    { id: "2008", from: "الإسكندرية", to: "أسوان", time: "07:00 PM", type: "تالجو", price: "600 LE" },
    { id: "164", from: "المنيا", to: "القاهرة", time: "03:40 PM", type: "روسي", price: "50 LE" }
];

function findTrain() {
    let from = document.getElementById('fromStation').value;
    let to = document.getElementById('toStation').value;
    let area = document.getElementById('displayArea');

    let results = trainData.filter(t => t.from === from && t.to === to);

    area.style.display = "block";
    if (results.length > 0) {
        area.style.background = "#2e7d32"; // لون أخضر للنجاح
        area.style.color = "white";
        area.innerHTML = "<h3>الرحلات المتاحة:</h3>";
        results.forEach(t => {
            area.innerHTML += `<p>قطار ${t.id} (${t.type}) - الساعة: ${t.time} - السعر: ${t.price}</p>`;
        });
    } else {
        area.style.background = "#c0392b"; // لون أحمر للفشل
        area.style.color = "white";
        area.innerHTML = "<h3>❌ لا توجد رحلات مباشرة</h3>";
    }
}

