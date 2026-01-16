// 1. قائمة شاملة لمحطات مصر (ترتيب جغرافي من الشمال للجنوب)
const stations = [
    "الإسكندرية", "سيدي جابر", "كفر الدوار", "أبو حمص", "دمنهور", "إيتاي البارود", "كفر الزيات", "طنطا", "بركة السبع", "قويسنا", "بنها", "قليوب", "القاهرة",
    "الجيزة", "الحوامدية", "البدرشين", "العياط", "الواسطي", "ناصر", "بني سويف", "ببا", "الفشن", "مغاغة", "بني مزار", "مطاي", "سمالوط", "المنيا", "أبو قرقاص", "ملوي", "ديرمواس",
    "ديروط", "القوصية", "منفلوط", "أسيوط", "أبو تيج", "صدفا", "طما", "طهطا", "المراغة", "سوهاج", "المنشأة", "جرجا", "البلينا", "أبو تشت", "فرشوط", "نجع حمادي", "دشنا", "قنا", "قفط", "قوص", "الأقصر", "إسنا", "إدفو", "كلابشة", "كوم أمبو", "دراو", "أسوان",
    "الزقازيق", "المنصورة", "دمياط", "بورسعيد", "السويس", "الإسماعيلية", "مرسى مطروح"
];

// 2. قاعدة بيانات القطارات (أهم الرحلات لجميع الدرجات)
const trains = [
    // --- خط القاهرة / الإسكندرية (والعكس) ---
    { id: "2025", from: "القاهرة", to: "الإسكندرية", time: "08:00 ص", type: "تالجو", price: "275 ج" },
    { id: "2023", from: "القاهرة", to: "الإسكندرية", time: "02:00 م", type: "تالجو", price: "275 ج" },
    { id: "2027", from: "القاهرة", to: "الإسكندرية", time: "07:00 م", type: "تالجو", price: "275 ج" },
    { id: "901", from: "القاهرة", to: "الإسكندرية", time: "08:10 ص", type: "VIP", price: "145 ج" },
    { id: "905", from: "القاهرة", to: "الإسكندرية", time: "09:00 ص", type: "VIP", price: "145 ج" },
    { id: "911", from: "القاهرة", to: "الإسكندرية", time: "11:00 ص", type: "إسباني", price: "80 ج" },
    { id: "1203", from: "القاهرة", to: "الإسكندرية", time: "01:25 م", type: "روسي", price: "55 ج" },
    { id: "2022", from: "الإسكندرية", to: "القاهرة", time: "07:00 ص", type: "تالجو", price: "275 ج" },
    { id: "906", from: "الإسكندرية", to: "القاهرة", time: "07:00 ص", type: "VIP", price: "145 ج" },

    // --- خط القاهرة / أسوان (قطارات الصعيد) ---
    { id: "2030", from: "القاهرة", to: "أسوان", time: "07:00 م", type: "تالجو", price: "600 ج" },
    { id: "2031", from: "أسوان", to: "القاهرة", time: "07:00 م", type: "تالجو", price: "600 ج" },
    { id: "980", from: "القاهرة", to: "أسوان", time: "08:00 ص", type: "VIP", price: "350 ج" },
    { id: "981", from: "أسوان", to: "القاهرة", time: "05:00 ص", type: "VIP", price: "350 ج" },
    { id: "2010", from: "القاهرة", to: "أسوان", time: "10:00 ص", type: "VIP", price: "350 ج" },
    { id: "982", from: "القاهرة", to: "أسوان", time: "12:00 م", type: "إسباني", price: "200 ج" },
    { id: "164", from: "المنيا", to: "القاهرة", time: "03:40 م", type: "روسي", price: "55 ج" },
    { id: "990", from: "القاهرة", to: "سوهاج", time: "04:00 م", type: "إسباني", price: "130 ج" },
    { id: "2006", from: "القاهرة", to: "أسيوط", time: "05:15 م", type: "VIP", price: "195 ج" },
    { id: "1004", from: "القاهرة", to: "أسوان", time: "09:30 ص", type: "روسي مكيف", price: "170 ج" },

    // --- خطوط متنوعة ---
    { id: "939", from: "القاهرة", to: "مرسى مطروح", time: "05:50 ص", type: "ثالثة مكيفة", price: "170 ج" },
    { id: "3007", from: "القاهرة", to: "أسوان", time: "09:00 ص", type: "ثالثة مكيفة", price: "170 ج" },
    { id: "593", from: "القاهرة", to: "السويس", time: "05:00 ص", type: "محسن", price: "30 ج" },
    { id: "945", from: "القاهرة", to: "بورسعيد", time: "06:10 ص", type: "مختلط", price: "80 ج" }
];

// 3. تشغيل الموقع وملء المحطات
window.onload = function() {
    const fromSelect = document.getElementById('fromStation');
    const toSelect = document.getElementById('toStation');
    
    // إضافة المحطات للقوائم
    stations.forEach(station => {
        let opt1 = document.createElement('option');
        opt1.value = station; opt1.innerHTML = station;
        fromSelect.appendChild(opt1);

        let opt2 = document.createElement('option');
        opt2.value = station; opt2.innerHTML = station;
        toSelect.appendChild(opt2);
    });

    // تهيئة الخريطة
    var map = L.map('map').setView([26.8206, 30.8025], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
};

// 4. دالة البحث
function findTrain() {
    const from = document.getElementById('fromStation').value;
    const to = document.getElementById('toStation').value;
    const area = document.getElementById('resultsArea');
    
    if(!from || !to || from === to) { 
        alert("يرجى اختيار محطتين مختلفتين"); 
        return; 
    }

    const match = trains.filter(t => t.from === from && t.to === to);
    area.style.display = "block";
    
    if (match.length > 0) {
        area.innerHTML = `<h3 style="text-align:center">نتائج البحث من ${from} إلى ${to}</h3>`;
        match.forEach(t => {
            area.innerHTML += `
                <div class="result-card">
                    <p><b>رقم القطار:</b> ${t.id} <span style="float:left; color:#ff9800">${t.type}</span></p>
                    <p><b>وقت القيام:</b> ${t.time}</p>
                    <p><b>سعر التذكرة:</b> ${t.price}</p>
                    <button style="margin-top:5px; background:#444; color:white; font-size:12px">تتبع المسار على الخريطة</button>
                </div>`;
        });
    } else {
        area.innerHTML = `
            <div class="result-card" style="background:#c0392b;">
                <p>❌ لا توجد رحلات مباشرة مسجلة حالياً بين ${from} و ${to}.</p>
                <p style="font-size:12px">حاول البحث بين المحطات الرئيسية (القاهرة، طنطا، المنيا، أسيوط).</p>
            </div>`;
    }
}
