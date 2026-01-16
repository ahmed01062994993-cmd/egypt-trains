var map = L.map('map').setView([26.8206, 30.8025], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const trains = [
    // خط القاهرة - الإسكندرية (بحري)
    { id: "2025", from: "القاهرة", to: "الإسكندرية", time: "08:00 ص", type: "تالجو", price: "275 ج" },
    { id: "901", from: "القاهرة", to: "الإسكندرية", time: "08:10 ص", type: "VIP", price: "145 ج" },
    { id: "2023", from: "القاهرة", to: "الإسكندرية", time: "02:00 م", type: "تالجو", price: "275 ج" },
    { id: "2022", from: "الإسكندرية", to: "القاهرة", time: "07:00 م", type: "تالجو", price: "275 ج" },
    
    // خط الصعيد (قبلي)
    { id: "980", from: "القاهرة", to: "المنيا", time: "08:00 ص", type: "VIP", price: "155-250 ج" },
    { id: "2010", from: "القاهرة", to: "المنيا", time: "10:00 ص", type: "VIP", price: "155-250 ج" },
    { id: "980", from: "القاهرة", to: "أسيوط", time: "08:00 ص", type: "VIP", price: "195-250 ج" },
    { id: "2030", from: "القاهرة", to: "أسوان", time: "07:00 م", type: "تالجو", price: "550-700 ج" },
    { id: "982", from: "القاهرة", to: "أسوان", time: "12:00 م", type: "إسباني", price: "200 ج" },
    { id: "164", from: "المنيا", to: "القاهرة", time: "03:40 م", type: "روسي", price: "55 ج" },
    
    // خط مطروح (صيفي)
    { id: "939", from: "القاهرة", to: "مرسى مطروح", time: "05:50 ص", type: "ثالثة مكيفة", price: "150 ج" }
];

function findTrain() {
    const from = document.getElementById('fromStation').value;
    const to = document.getElementById('toStation').value;
    const area = document.getElementById('resultsArea');
    const match = trains.filter(t => t.from === from && t.to === to);

    area.innerHTML = match.length > 0 ? "<h3>الرحلات المتاحة اليوم:</h3>" : "";
    if (match.length > 0) {
        match.forEach(t => {
            area.innerHTML += `
                <div class="result-card">
                    <p><b>قطار رقم:</b> ${t.id} (${t.type})</p>
                    <p><b>قيام:</b> ${t.time} | <b>السعر التقريبي:</b> ${t.price}</p>
                </div>`;
        });
    } else {
        area.innerHTML = "<div class='result-card' style='background:#c0392b;'>❌ لا توجد رحلات مباشرة مسجلة لهذه الوجهة</div>";
    }
}
