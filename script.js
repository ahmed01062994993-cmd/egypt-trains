// قائمة محطات مصر (يمكنك إضافة أي قرية أو مركز هنا)
const stations = [
    "القاهرة", "الإسكندرية", "سيدي جابر", "دمنهور", "كفر الدوار", "أبو حمص", "إيتاي البارود", 
    "كفر الزيات", "طنطا", "بركة السبع", "قويسنا", "بنها", "طوخ", "قليوب", "شبرا الخيمة",
    "الجيزة", "الحوامدية", "البدرشين", "العياط", "الواسطي", "ناصر", "بني سويف", "ببا", "الفشن", 
    "مغاغة", "بني مزار", "مطاي", "سمالوط", "المنيا", "أبو قرقاص", "الروضة", "ملوي", "ديرمواس", 
    "ديروط", "القوصية", "منفلوط", "أسيوط", "أبو تيج", "صدفا", "طما", "طهطا", "المراغة", "سوهاج", 
    "المنشأة", "جرجا", "البلينا", "أبو تشت", "فرشوط", "نجع حمادي", "دشنا", "قنا", "قفط", "قوص", 
    "الأقصر", "إسنا", "السباعية", "إدفو", "كلابشة", "كوم أمبو", "دراو", "أسوان"
];

// قاعدة بيانات القطارات (عينة للتجربة)
const trains = [
    { id: "2025", from: "القاهرة", to: "الإسكندرية", time: "08:00 ص", type: "تالجو", price: "275 ج" },
    { id: "980", from: "القاهرة", to: "المنيا", time: "08:00 ص", type: "VIP", price: "155 ج" },
    { id: "164", from: "المنيا", to: "القاهرة", time: "03:40 م", type: "روسي", price: "55 ج" },
    { id: "2012", from: "القاهرة", to: "أسوان", time: "05:30 م", type: "VIP", price: "350 ج" }
];

// وظيفة لملء القوائم بالمحطات تلقائياً
window.onload = function() {
    const fromSelect = document.getElementById('fromStation');
    const toSelect = document.getElementById('toStation');
    
    stations.sort().forEach(station => {
        let opt1 = document.createElement('option');
        opt1.value = station;
        opt1.innerHTML = station;
        fromSelect.appendChild(opt1);

        let opt2 = document.createElement('option');
        opt2.value = station;
        opt2.innerHTML = station;
        toSelect.appendChild(opt2);
    });

    // تشغيل الخريطة
    var map = L.map('map').setView([26.8206, 30.8025], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
};

function findTrain() {
    const from = document.getElementById('fromStation').value;
    const to = document.getElementById('toStation').value;
    const area = document.getElementById('resultsArea');
    
    if(!from || !to) { alert("من فضلك اختر المحطات أولاً"); return; }

    const match = trains.filter(t => t.from === from && t.to === to);
    area.innerHTML = match.length > 0 ? "<h3>الرحلات المتاحة:</h3>" : "";
    
    if (match.length > 0) {
        match.forEach(t => {
            area.innerHTML += `
                <div class="result-card">
                    <p><b>قطار رقم:</b> ${t.id} (${t.type})</p>
                    <p><b>قيام:</b> ${t.time} | <b>السعر:</b> ${t.price}</p>
                </div>`;
        });
    } else {
        area.innerHTML = "<div class='result-card' style='background:#c0392b;'>❌ لا توجد رحلات مباشرة مسجلة حالياً لهذه الوجهة</div>";
    }
}
