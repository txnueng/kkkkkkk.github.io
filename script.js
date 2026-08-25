// ควบคุมเมนู Sidebar (3 ขีด)
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('active');
    overlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
}

// ควบคุมการเปลี่ยนหน้า (SPA)
function switchPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    
    const sidebar = document.getElementById('sidebar');
    if(sidebar.classList.contains('active')) toggleMenu(); // ปิดเมนูเมื่อเลือกเสร็จ
}

// ข้อมูลเริ่มต้นของข่าวสาร
const defaultNews = [
    { title: "กิจกรรมเดินรณรงค์ต่อต้านคอร์รัปชัน", img: "https://placehold.co/400x300/0b2447/ffd700?text=News+1" },
    { title: "อบรมแกนนำเยาวชน Youthshield", img: "https://placehold.co/400x300/0b2447/ffd700?text=News+2" },
    { title: "ลงพื้นที่ตรวจสอบโครงการรัฐ", img: "https://placehold.co/400x300/0b2447/ffd700?text=News+3" },
    { title: "รับรางวัลเยาวชนดีเด่น", img: "https://placehold.co/400x300/0b2447/ffd700?text=News+4" }
];

// ดึงข่าวจาก Local Storage (ถ้าไม่มีให้ใช้ defaultNews)
let newsData = JSON.parse(localStorage.getItem('youthshieldNews')) || defaultNews;

// ฟังก์ชัน Render ข่าวสาร
function renderNews(filterText = '') {
    const slider = document.getElementById('homeNewsSlider');
    const grid = document.getElementById('allNewsGrid');
    slider.innerHTML = ''; grid.innerHTML = '';

    const filteredNews = newsData.filter(news => news.title.includes(filterText));

    filteredNews.forEach(news => {
        const cardHTML = `
            <div class="news-card">
                <img src="${news.img}" alt="News">
                <p>${news.title}</p>
            </div>
        `;
        slider.innerHTML += cardHTML;
        grid.innerHTML += cardHTML;
    });
}

// ระบบ Admin: เพิ่มข่าวสาร
function addNews() {
    const title = document.getElementById('adminNewsTitle').value;
    const imgInput = document.getElementById('adminNewsImg').value;
    
    if(!title) { alert('กรุณาใส่หัวข้อข่าว'); return; }
    
    const newImg = imgInput ? imgInput : `https://placehold.co/400x300/0b2447/ffd700?text=${encodeURIComponent(title)}`;
    
    // เพิ่มข้อมูลลง Array และบันทึกลง Local Storage
    newsData.unshift({ title: title, img: newImg });
    localStorage.setItem('youthshieldNews', JSON.stringify(newsData));
    
    renderNews(); // อัปเดตหน้าจอทันที
    document.getElementById('adminNewsTitle').value = '';
    document.getElementById('adminNewsImg').value = '';
    alert('เพิ่มจดหมายข่าวเรียบร้อยแล้ว!');
    switchPage('home');
}

// ระบบค้นหาข่าวสาร
function searchNews() {
    const query = document.getElementById('searchInput').value;
    renderNews(query);
    switchPage('news-page');
}

// จำลองข้อมูลผู้บริหาร 10 คน
function renderExecutives() {
    const execGrid = document.getElementById('execGrid');
    const roles = ["ประธาน", "รองประธาน", "เลขาธิการ", "เหรัญญิก", "ฝ่ายประชาสัมพันธ์", "ฝ่ายกิจกรรม", "ฝ่ายกิจกรรม", "ฝ่ายตรวจสอบ", "ฝ่ายตรวจสอบ", "ฝ่ายเทคนิค"];
    
    for(let i=0; i<10; i++) {
        execGrid.innerHTML += `
            <div class="exec-card">
                <img src="https://placehold.co/150x150/0b2447/ffd700?text=Exec+${i+1}" alt="ผู้บริหาร">
                <h4>ผู้บริหารคนที่ ${i+1}</h4>
                <p style="color: #666; font-size: 0.9rem;">${roles[i]}</p>
            </div>
        `;
    }
}

// รันฟังก์ชันเมื่อเปิดเว็บ
renderNews();
renderExecutives();
