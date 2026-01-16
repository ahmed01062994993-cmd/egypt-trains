// قاعدة بيانات المسارات التفصيلية (أمثلة لخطوط كاملة)
const fullRoutes = [
    {
        trainId: "901",
        type: "إسباني مكيف",
        stops: [
            { station: "القاهرة", time: "08:10 ص" },
            { station: "بنها", time: "08:45 ص" },
            { station: "طنطا", time: "09:25 ص" },
            { station: "دمنهور", time: "10:10 ص" },
            { station: "سيدي جابر", time: "10:50 ص" },
            { station: "الإسكندرية", time: "11:10 ص" }
        ]
    },
    {
        trainId: "2025",
        type: "تالجو",
        stops: [
            { station: "القاهرة", time: "08:00 ص" },
            { station: "سيدي جابر", time: "10:15 ص" },
            { station: "الإسكندرية", time: "10:30 ص" }
        ]
    },
    {
        trainId: "980",
        type: "VIP",
        stops: [
            { station: "القاهرة", time: "08:00 ص" },
            { station: "بني سويف", time: "09:30 ص" },
            { station: "المنيا", time: "10:55 ص" },
            { station: "أسيوط", time: "01:10 م" },
            { station: "سوهاج", time: "02:25 م" },
            { station: "قنا", time: "04:30 م" },
            { station: "الأقصر", time: "05:20 م" },
            { station: "أسوان", time: "08:40 م" }
        ]
    }
];

// استخراج كافة المحطات تلقائياً من المسارات
const stations = [...new Set(fullRoutes.flatMap(route => route.stops.map(s => s.station)))];

function smartSearch() {
    const from = document.getElementById('fromInput').value;
    const to = document.getElementById('toInput').value;
    const area = document.getElementById('resultsArea');
    area.innerHTML = "";

    fullRoutes.forEach(route => {
        const fromIndex = route.stops.findIndex(s => s.station === from);
        const toIndex = route.stops.findIndex(s => s.station === to);

        // إذا كان القطار يمر بالمحطتين وبالترتيب الصحيح
        if (fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex) {
            const depTime = route.stops[fromIndex].time;
            const arrTime = route.stops[toIndex].time;

            area.innerHTML += `
                <div class="result-card">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h2 style="color:#800020; margin:0;">قطار ${route.trainId}</h2>
                        <span class="badge">${route.type}</span>
                    </div>
                    <hr style="border:0.5px solid #eee; margin:15px 0;">
                    <p><b>🛫 قيام من ${from}:</b> <span style="color:#800020">${depTime}</span></p>
                    <p><b>🛬 وصول إلى ${to}:</b> <span style="color:#800020">${arrTime}</span></p>
                    <details>
                        <summary style="cursor:pointer; color:#666;">عرض جدول المحطات بالكامل</summary>
                        <ul style="font-size:14px; color:#333; padding-right:20px;">
                            ${route.stops.map(s => `<li>${s.station}: ${s.time}</li>`).join('')}
                        </ul>
                    </details>
                </div>`;
        }
    });

    if (area.innerHTML === "") {
        area.innerHTML = "<div class='result-card'>❌ لا توجد رحلة مباشرة بين هاتين المحطتين حالياً.</div>";
    }
}
