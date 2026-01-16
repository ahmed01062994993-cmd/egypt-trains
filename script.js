// مصفوفة البيانات الضخمة (مستوحاة من RailEg)
const trainDatabase = [
    { id: "2025", from: "القاهرة", to: "الإسكندرية", dep: "08:00 ص", arr: "10:30 ص", type: "تالجو", price: "275 ج" },
    { id: "2023", from: "القاهرة", to: "الإسكندرية", dep: "02:00 م", arr: "04:30 م", type: "تالجو", price: "275 ج" },
    { id: "901", from: "القاهرة", to: "الإسكندرية", dep: "08:10 ص", arr: "11:15 ص", type: "VIP", price: "145 ج" },
    { id: "980", from: "القاهرة", to: "أسوان", dep: "08:00 ص", arr: "10:00 م", type: "VIP", price: "350 ج" },
    { id: "2030", from: "القاهرة", to: "أسوان", dep: "07:00 م", arr: "06:40 ص", type: "تالجو", price: "700 ج" },
    // يمكنك إضافة المزيد من الرحلات هنا بنفس النسق
];

function findTrain() {
    const from = document.getElementById('fromStation').value;
    const to = document.getElementById('toStation').value;
    const resultsArea = document.getElementById('resultsArea');

    // فلترة البيانات
    const results = trainDatabase.filter(t => t.from === from && t.to === to);

    if (results.length > 0) {
        resultsArea.innerHTML = `<h3 style="color:#ff9800">الرحلات المتاحة (تحديث RailEg):</h3>`;
        results.forEach(t => {
            resultsArea.innerHTML += `
                <div class="result-card">
                    <div style="display:flex; justify-content:space-between;">
                        <span><b>قطار ${t.id}</b> - ${t.type}</span>
                        <span style="color:#ff9800">${t.price}</span>
                    </div>
                    <hr style="border:0.1px solid #333">
                    <p>🕒 قيام: ${t.dep} | وصول: ${t.arr}</p>
                    <a href="https://www.raileg.com/ar" target="_blank" style="text-decoration:none;">
                        <button style="background:#2e7d32; color:white; font-size:12px; width:auto; padding:5px 15px;">حجز عبر RailEg</button>
                    </a>
                </div>`;
        });
    } else {
        resultsArea.innerHTML = `<div class="result-card" style="background:#441111;">❌ لا توجد رحلات مباشرة حالياً. يمكنك التحقق من <a href="https://www.raileg.com/ar" style="color:#ff9800">موقع RailEg الرسمي</a>.</div>`;
    }
}
