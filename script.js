// بيانات المحطات والقطارات (كما هي أو حدثها بالبيانات الجديدة)
const fullRoutes = [
    {
        trainId: "2025", type: "تالجو", price: "275 ج",
        stops: [
            { station: "القاهرة", time: "08:00 ص" },
            { station: "سيدي جابر", time: "10:15 ص" },
            { station: "الإسكندرية", time: "10:30 ص" }
        ]
    },
    {
        trainId: "901", type: "إسباني مكيف", price: "145 ج",
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
        trainId: "980", type: "VIP", price: "350 ج",
        stops: [
            { station: "القاهرة", time: "08:00 ص" },
            { station: "بني سويف", time: "09:40 ص" },
            { station: "المنيا", time: "11:10 ص" },
            { station: "أسيوط", time: "01:05 م" },
            { station: "أسوان", time: "08:35 م" }
        ]
    }
];

// استخراج المحطات وتعبئة قوائم الـ Select
const allStations = [...new Set(fullRoutes.flatMap(route => route.stops.map(s => s.station)))].sort();
const fromSelect = document.getElementById('fromStation');
const toSelect = document.getElementById('toStation');
const trainTypeSelect = document.getElementById('trainType'); // للاستخدام المستقبلي لفلترة الأنواع

// تعبئة المحطات
allStations.forEach(s => {
    fromSelect.add(new Option(s, s));
    toSelect.add(new Option(s, s));
});

// دالة التنقل بين الواجهات
function showSection(sectionId) {
    document.getElementById('home').style.display = 'none';
    document.getElementById('search-page').style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';
}

// دالة البحث الرئيسية وعرض النتائج
function startSearch() {
    const from = document.getElementById('fromStation').value;
    const to = document.getElementById('toStation').value;
    const resultsArea = document.getElementById('resultsArea');
    resultsArea.innerHTML = ""; // تفريغ النتائج القديمة
    
    if (!from || !to || from === "" || to === "") {
        resultsArea.innerHTML = '<div class="train-card" style="background:#f8d7da; color:#721c24;">من فضلك اختر محطتي القيام والوصول.</div>';
        return;
    }

    let found = false;

    fullRoutes.forEach(route => {
        const fromIndex = route.stops.findIndex(s => s.station === from);
        const toIndex = route.stops.findIndex(s => s.station === to);

        if (fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex) {
            found = true;
            const depTime = route.stops[fromIndex].time;
            const arrTime = route.stops[toIndex].time;

            resultsArea.innerHTML += `
                <div class="train-card">
                    <h3>
                        قطار ${route.trainId} <span class="type-badge">${route.type}</span>
                    </h3>
                    <p><b>من:</b> ${from} - <b>القيام:</b> ${depTime}</p>
                    <p><b>إلى:</b> ${to} - <b>الوصول:</b> ${arrTime}</p>
                    <p><b>السعر:</b> ${route.price}</p>
                    
                    <details>
                        <summary class="details-summary">تفاصيل مسار القطار بالكامل</summary>
                        <ul>
                            ${route.stops.map(s => `<li>${s.station}: ${s.time}</li>`).join('')}
                        </ul>
                    </details>
                </div>`;
        }
    });

    if (!found) {
        resultsArea.innerHTML = '<div class="train-card" style="background:#f8d7da; color:#721c24;">❌ لا توجد رحلات مباشرة مطابقة.</div>';
    }
}

// لإظهار الصفحة الرئيسية عند التحميل (يمكنك تغييرها لـ 'search-page' لو أردت)
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
});
