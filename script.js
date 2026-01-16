// قائمة المحطات الشاملة
const stations = ["القاهرة", "الإسكندرية", "سيدي جابر", "طنطا", "دمنهور", "بنها", "المنيا", "أسيوط", "سوهاج", "قنا", "الأقصر", "أسوان", "الجيزة", "بني سويف", "ملوي", "مغاغة", "نجع حمادي"];

// قاعدة البيانات
const trains = [
    { id: "2025", from: "القاهرة", to: "الإسكندرية", dep: "08:00 ص", type: "تالجو", price: "275 ج" },
    { id: "980", from: "القاهرة", to: "المنيا", dep: "08:00 ص", type: "VIP", price: "155 ج" },
    { id: "2030", from: "القاهرة", to: "أسوان", dep: "07:00 م", type: "تالجو", price: "700 ج" },
    { id: "164", from: "المنيا", to: "القاهرة", dep: "03:40 م", type: "روسي", price: "55 ج" }
];

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
            div.onclick = function() {
                input.value = s;
                list.style.display = 'none';
            };
            list.appendChild(div);
        });
    } else { list.style.display = 'none'; }
}

// وظيفة البحث
function smartSearch() {
    const from = document.getElementById('fromInput').value;
    const to = document.getElementById('toInput').value;
    const trainNum = document.getElementById('trainNumberInput').value;
    const area = document.getElementById('resultsArea');
    
    let results = [];
    if (trainNum) {
        results = trains.filter(t => t.id === trainNum);
    } else if (from && to) {
        results = trains.filter(t => t.from === from && t.to === to);
    } else {
        alert("اكتب المحطات أو رقم القطار");
        return;
    }

    area.innerHTML = results.length > 0 ? "" : "<p>لا توجد نتائج</p>";
    results.forEach(t => {
        area.innerHTML += `
            <div class="result-card" style="background:white; color:black; padding:15px; margin:10px 0; border-radius:8px; border-right:5px solid #ff9800;">
                <p><b>قطار ${t.id}</b> (${t.type})</p>
                <p>من: ${t.from} إلى: ${t.to}</p>
                <p>موعد: ${t.dep} | سعر: ${t.price}</p>
            </div>`;
    });
}
