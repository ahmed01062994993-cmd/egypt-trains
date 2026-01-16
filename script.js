// دالة لتصفية المحطات أثناء الكتابة
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
    } else {
        list.style.display = 'none';
    }
}

// دالة البحث الشامل (بالمحطة أو برقم القطار)
function smartSearch() {
    const from = document.getElementById('fromInput').value;
    const to = document.getElementById('toInput').value;
    const trainNum = document.getElementById('trainNumberInput').value;
    const area = document.getElementById('resultsArea');
    
    let results = [];

    // لو المستخدم كاتب رقم قطار، الأولوية ليه
    if (trainNum) {
        results = allData.trains.filter(t => t.id === trainNum);
    } else if (from && to) {
        results = allData.trains.filter(t => t.from === from && t.to === to);
    } else {
        alert("من فضلك ادخل محطة القيام والوصول أو رقم القطار");
        return;
    }

    renderResults(results);
}

function renderResults(results) {
    const area = document.getElementById('resultsArea');
    area.style.display = "block";
    if (results.length > 0) {
        area.innerHTML = `<h3>نتائج البحث (${results.length}):</h3>`;
        results.forEach(t => {
            area.innerHTML += `
                <div class="result-card">
                    <p class="train-no">قطار ${t.id} - ${t.type}</p>
                    <p>من: ${t.from} | إلى: ${t.to}</p>
                    <p>🕒 القيام: ${t.dep} | السعر: ${t.price}</p>
                </div>`;
        });
    } else {
        area.innerHTML = "<div class='result-card' style='background:#c0392b;'>❌ لم يتم العثور على نتائج مطابقة</div>";
    }
}
