// قائمة المحطات
const stations = ["القاهرة", "الإسكندرية", "طنطا", "دمنهور", "بنها", "المنيا", "أسيوط", "سوهاج", "قنا", "الأقصر", "أسوان", "الزقازيق", "المنصورة", "بور سعيد"];

// قاعدة بيانات القطارات
const trains = [
    { id: "2025", from: "القاهرة", to: "الإسكندرية", dep: "08:00 ص", type: "تالجو", price: "275 ج" },
    { id: "980", from: "القاهرة", to: "أسوان", dep: "08:00 ص", type: "VIP", price: "350 ج" },
    { id: "164", from: "المنيا", to: "القاهرة", dep: "03:40 م", type: "روسي", price: "55 ج" },
    { id: "901", from: "القاهرة", to: "الإسكندرية", dep: "08:10 ص", type: "إسباني", price: "145 ج" }
];

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
            div.style.padding = "10px";
            div.style.cursor = "pointer";
            div.innerHTML = s;
            div.onclick = function() {
                input.value = s;
                list.style.display = 'none';
            };
            list.appendChild(div);
        });
    }
}

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
    }

    area.innerHTML = "";
    if (results.length > 0) {
        results.forEach(t => {
            area.innerHTML += `
                <div class="result-card">
                    <h2 style="color:#800020">قطار رقم ${t.id}</h2>
                    <p><b>النوع:</b> ${t.type}</p>
                    <p><b>المسار:</b> من ${t.from} إلى ${t.to}</p>
                    <p><b>وقت القيام:</b> ${t.dep}</p>
                    <p><b>سعر التذكرة:</b> ${t.price}</p>
                </div>`;
        });
    } else {
        area.innerHTML = "<div class='result-card'>❌ لم يتم العثور على رحلات. تأكد من كتابة المحطات بشكل صحيح.</div>";
    }
}
