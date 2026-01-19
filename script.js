function showSection(sectionId) {
    // إخفاء كل السكشنز
    document.getElementById('home').style.display = 'none';
    document.getElementById('search-page').style.display = 'none';
    
    // إظهار السكشن المطلوب
    document.getElementById(sectionId).style.display = 'block';
}

// يمكننا هنا إضافة كود تعبئة المحطات كما فعلنا سابقاً
const stations = ["القاهرة", "الإسكندرية", "طنطا", "المنيا", "أسيوط", "أسوان"];
const fromSelect = document.getElementById('fromStation');
const toSelect = document.getElementById('toStation');

stations.forEach(s => {
    let opt1 = new Option(s, s);
    let opt2 = new Option(s, s);
    fromSelect.add(opt1);
    toSelect.add(opt2);
});
