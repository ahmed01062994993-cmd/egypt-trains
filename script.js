// قاعدة بيانات مسارات قطارات مصر بالدقيقة
const fullRoutes = [
    // --- خط القاهرة / الإسكندرية ---
    {
        trainId: "2025", type: "تالجو",
        stops: [
            { station: "القاهرة", time: "08:00 ص" },
            { station: "سيدي جابر", time: "10:15 ص" },
            { station: "الإسكندرية", time: "10:30 ص" }
        ]
    },
    {
        trainId: "901", type: "إسباني مكيف",
        stops: [
            { station: "القاهرة", time: "08:10 ص" },
            { station: "بنها", time: "08:45 ص" },
            { station: "طنطا", time: "09:25 ص" },
            { station: "دمنهور", time: "10:10 ص" },
            { station: "سيدي جابر", time: "10:50 ص" },
            { station: "الإسكندرية", time: "11:10 ص" }
        ]
    },
    // --- خط القاهرة / أسوان (الصعيد) ---
    {
        trainId: "980", type: "VIP",
        stops: [
            { station: "القاهرة", time: "08:00 ص" },
            { station: "الجيزة", time: "08:25 ص" },
            { station: "بني سويف", time: "09:40 ص" },
            { station: "مغاغة", time: "10:20 ص" },
            { station: "المنيا", time: "11:10 ص" },
            { station: "ملوي", time: "11:50 ص" },
            { station: "أسيوط", time: "01:05 م" },
            { station: "سوهاج", time: "02:20 م" },
            { station: "جرجا", time: "02:50 م" },
            { station: "نجع حمادي", time: "03:45 م" },
            { station: "قنا", time: "04:35 م" },
            { station: "الأقصر", time: "05:30 م" },
            { station: "إدفو", time: "06:55 م" },
            { station: "كوم أمبو", time: "07:50 م" },
            { station: "أسوان", time: "08:35 م" }
        ]
    },
    {
        trainId: "2030", type: "تالجو الصعيد",
        stops: [
            { station: "القاهرة", time: "07:00 م" },
            { station: "الجيزة", time: "07:25 م" },
            { station: "أسيوط", time: "11:30 م" },
            { station: "سوهاج", time: "12:45 ص" },
            { station: "قنا", time: "02:30 ص" },
            { station: "الأقصر", time: "03:20 ص" },
            { station: "إدفو", time: "04:45 ص" },
            { station: "أسوان", time: "06:10 ص" }
        ]
    },
    {
        trainId: "164", type: "روسي",
        stops: [
            { station: "المنيا", time: "03:40 م" },
            { station: "سمالوط", time: "04:00 م" },
            { station: "مغاغة", time: "04:35 م" },
            { station: "بني سويف", time: "05:25 م" },
            { station: "الواسطي", time: "05:50 م" },
            { station: "الجيزة", time: "07:10 م" },
            { station: "القاهرة", time: "07:35 م" }
        ]
    }
];

// توليد قائمة المحطات آلياً للبحث الذكي
const stations = [...new Set(fullRoutes.flatMap(route => route.stops.map(s => s.station)))].sort();

// وظيفة البحث الذكي
function smartSearch() {
    const from = document.getElementById('fromInput').value;
    const to = document.getElementById('toInput').value;
    const area = document.getElementById('resultsArea');
    area.innerHTML = "";

    let found = false;

    fullRoutes.forEach(route => {
        const fromIndex = route.stops.findIndex(s => s.station === from);
        const toIndex = route.stops.findIndex(s => s.station === to);

        if (fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex) {
            found = true;
            const depTime = route.stops[fromIndex].time;
            const arrTime = route.stops[toIndex].time;

            area.innerHTML += `
                <div class="result-card">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h2 style="color:#800020; margin:0;">قطار ${route.trainId}</h2>
                        <span style="background:#1a1a1a; color:white; padding:4px 10px; border-radius:15px; font-size:12px;">${route.type}</span>
                    </div>
                    <p style="margin:10px 0;">🛫 <b>القيام من ${from}:</b> <span style="color:#800020; font-weight:bold;">${depTime}</span></p>
                    <p style="margin:5px 0;">🛬 <b>الوصول إلى ${to}:</b> <span style="color:#800020; font-weight:bold;">${arrTime}</span></p>
                    
                    <details style="margin-top:10px; border-top:1px solid #eee; padding-top:10px;">
                        <summary style="cursor:pointer; color:#666; font-size:14px;">🔎 عرض جدول الوقوف بالكامل بالدقائق</summary>
                        <ul style="list-style:none; padding:10px 20px 0 0; border-right:2px solid #800020; font-size:13px; color:#333;">
                            ${route.stops.map(s => `<li>${s.station}: <span style="color:#800020">${s.time}</span></li>`).join('')}
                        </ul>
                    </details>
                </div>`;
        }
    });

    if (!found) {
        area.innerHTML = "<div class='result-card' style='text-align:center;'>❌ لا توجد رحلات مباشرة مسجلة حالياً بين هاتين المحطتين.</div>";
    }
}

// وظيفة الاقتراحات (Autocomplete)
function filterStations(type) {
    let input = document.getElementById(type + 'Input');
    let list = document.getElementById(type + 'List');
    let val = input.value;
    list.innerHTML = '';
    if (!val) { list.style.display = 'none'; return; }

    let suggestions = stations.filter(s => s.includes(val));
    if (suggestions.length > 0) {
        list.style.display = 'block';
        suggestions.forEach(s => {
            let div = document.createElement('div');
            div.innerHTML = s;
            div.style.padding = "10px";
            div.style.cursor = "pointer";
            div.onclick = function() {
                input.value = s;
                list.style.display = 'none';
            };
            list.appendChild(div);
        });
    } else { list.style.display = 'none'; }
}
