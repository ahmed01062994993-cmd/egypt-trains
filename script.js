// تشغيل الخريطة
var map = L.map('map').setView([26.8206, 30.8025], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// المواعيد
const trains = [
    { id: "901", from: "القاهرة", to: "الإسكندرية", time: "08:15 ص", price: "145 ج.م" },
    { id: "980", from: "القاهرة", to: "المنيا", time: "08:00 ص", price: "155 ج.م" },
    { id: "164", from: "المنيا", to: "القاهرة", time: "03:40 م", price: "55 ج.م" }
];

function findTrain() {
    const from = document.getElementById('fromStation').value;
    const to = document.getElementById('toStation').value;
    const area = document.getElementById('resultsArea');

    const match = trains.filter(t => t.from === from && t.to === to);

    if (match.length > 0) {
        area.innerHTML = "<h3>النتائج:</h3>";
        match.forEach(t => {
            area.innerHTML += `
                <div class="result-card">
                    <p><b>قطار:</b> ${t.id} | <b>موعد:</b> ${t.time}</p>
                    <p><b>التذكرة:</b> ${t.price}</p>
                </div>`;
        });
    } else {
        area.innerHTML = "<div class='result-card' style='background:#c0392b;'>❌ مفيش رحلات مباشرة حالياً</div>";
    }
}
const trains = [
    // خط القاهرة - الإسكندرية
    { id: "901", from: "القاهرة", to: "الإسكندرية", time: "08:10 ص", type: "خدمة خاصة", price: "145 ج" },
    { id: "911", from: "القاهرة", to: "الإسكندرية", time: "11:00 ص", type: "توربيني", price: "70 ج" },
    { id: "915", from: "القاهرة", to: "الإسكندرية", time: "03:10 م", type: "إسباني", price: "80 ج" },
    
    // خط الصعيد (قبلي)
    { id: "980", from: "القاهرة", to: "المنيا", time: "08:00 ص", type: "VIP", price: "155 ج" },
    { id: "980", from: "القاهرة", to: "أسيوط", time: "08:00 ص", type: "VIP", price: "195 ج" },
    { id: "980", from: "القاهرة", to: "أسوان", time: "08:00 ص", type: "VIP", price: "350 ج" },
    { id: "2006", from: "القاهرة", to: "أسوان", time: "05:15 م", type: "VIP", price: "350 ج" },
    { id: "164", from: "المنيا", to: "القاهرة", time: "03:40 م", type: "روسي", price: "55 ج" },
    { id: "990", from: "سوهاج", to: "القاهرة", time: "06:00 ص", type: "إسباني", price: "130 ج" },
    
    // خطوط الأقصر وأسوان
    { id: "2010", from: "القاهرة", to: "الأقصر", time: "10:00 ص", type: "VIP", price: "300 ج" },
    { id: "982", from: "القاهرة", to: "أسوان", time: "12:00 م", type: "إسباني", price: "200 ج" }
];
