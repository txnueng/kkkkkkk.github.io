function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('active');
    overlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
}

function switchPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if(document.getElementById('sidebar').classList.contains('active')) toggleMenu();
}

// ข้อมูลเริ่มต้น
const defaultNews = [
    { title: "กิจกรรมเดินรณรงค์ต่อต้านคอร์รัปชัน", content: "เยาวชนกว่า 500 คน ร่วมกันเดินรณรงค์เพื่อสร้างจิตสำนึกในการต่อต้านการทุจริตคอร์รัปชันในระดับท้องถิ่น โดยมีกิจกรรมประกวดป้ายรณรงค์และกล่าวสุนทรพจน์...", img: "https://placehold.co/600x400/0f172a/ffffff?text=News+1" },
    { title: "อบรมแกนนำเยาวชน Youthshield", content: "จัดโครงการอบรมแกนนำเพื่อสร้างเครือข่ายเยาวชนระดับภูมิภาค ให้ความรู้ด้านกฎหมายและการตรวจสอบการทำงานของหน่วยงานต่างๆ...", img: "https://placehold.co/600x400/0f172a/ffffff?text=News+2" },
    { title: "ลงพื้นที่ตรวจสอบโครงการอาหารกลางวัน", content: "เครือข่ายเราได้ลงพื้นที่สุ่มตรวจโครงการอาหารกลางวันในโรงเรียน เพื่อให้มั่นใจว่านักเรียนได้รับสารอาหารที่ครบถ้วนและโปร่งใส...", img: "https://placehold.co/600x400/0f172a/ffffff?text=News+3" },
    { title: "รับรางวัลองค์กรเยาวชนดีเด่น", content: "Youthshield ได้รับมอบรางวัลองค์กรเครือข่ายเยาวชนดีเด่นแห่งปี จากผลงานการเฝ้าระวังและแจ้งเบาะแสที่เป็นประโยชน์ต่อสังคม...", img: "https://placehold.co/600x400/0f172a/ffffff?text=News+4" }
];

let newsData = JSON.parse(localStorage.getItem('youthshieldNews')) || defaultNews;

// แสดงผลข่าวสาร
function renderNews(filterText = '') {
    const slider = document.getElementById('homeNewsSlider');
    const grid = document.getElementById('allNewsGrid');
    const adminList = document.getElementById('adminNewsList');
    
    slider.innerHTML = ''; grid.innerHTML = ''; adminList.innerHTML = '';
    const filteredNews = newsData.filter(news => news.title.includes(filterText));

    filteredNews.forEach((news, index) => {
        const trueIndex = newsData.indexOf(news); // หา index จริงใน array หลัก
        const cardHTML = `
            <div class="news-card" onclick="viewNews(${trueIndex})">
                <img src="${news.img}" alt="${news.title}">
                <div class="news-content">
                    <p>${news.title}</p>
                    <span class="read-more">อ่านรายละเอียด ➔</span>
                </div>
            </div>
        `;
        slider.innerHTML += cardHTML;
        grid.innerHTML += cardHTML;

        // Render รายการลบในแอดมิน
        adminList.innerHTML += `
            <div class="admin-news-item">
                <span>${news.title}</span>
                <button class="btn-danger" onclick="deleteNews(${trueIndex})">ลบข่าว</button>
            </div>
        `;
    });
}

// ดูรายละเอียดข่าว (ใหม่)
function viewNews(index) {
    const news = newsData[index];
    document.getElementById('detailImg').src = news.img;
    document.getElementById('detailTitle').innerText = news.title;
    document.getElementById('detailContent').innerText = news.content || "ไม่มีรายละเอียดเพิ่มเติมสำหรับข่าวนี้";
    
    switchPage('news-detail');
}

// แอดมิน: เพิ่มข่าว
function addNews() {
    const title = document.getElementById('adminNewsTitle').value;
    const content = document.getElementById('adminNewsContent').value;
    const imgInput = document.getElementById('adminNewsImg').value;
    
    if(!title || !content) { alert('กรุณาใส่หัวข้อและเนื้อหาข่าวให้ครบถ้วน'); return; }
    const newImg = imgInput ? imgInput : `https://placehold.co/600x400/0f172a/ffffff?text=${encodeURIComponent(title.substring(0,10))}`;
    
    newsData.unshift({ title: title, content: content, img: newImg });
    localStorage.setItem('youthshieldNews', JSON.stringify(newsData));
    
    document.getElementById('adminNewsTitle').value = '';
    document.getElementById('adminNewsContent').value = '';
    document.getElementById('adminNewsImg').value = '';
    
    renderNews();
    alert('เพิ่มข่าวสารเรียบร้อยแล้ว!');
}

// แอดมิน: ลบข่าว (ใหม่)
function deleteNews(index) {
    if(confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบข่าว "${newsData[index].title}" ?`)) {
        newsData.splice(index, 1); // ลบออกจาก Array
        localStorage.setItem('youthshieldNews', JSON.stringify(newsData)); // อัปเดต Storage
        renderNews(); // รีเฟรชหน้าจอ
    }
}

// ค้นหา
function searchNews() {
    const query = document.getElementById('searchInput').value;
    renderNews(query);
    switchPage('news-page');
}

// แสดงผู้บริหาร
function renderExecutives() {
    const execGrid = document.getElementById('execGrid');
    const roles = ["ประธาน", "รองประธาน", "เลขาธิการ", "เหรัญญิก", "ฝ่ายประชาสัมพันธ์", "ฝ่ายกิจกรรม", "ฝ่ายกิจกรรม", "ฝ่ายตรวจสอบ", "ฝ่ายตรวจสอบ", "ฝ่ายเทคนิค"];
    
    for(let i=0; i<10; i++) {
        execGrid.innerHTML += `
            <div class="exec-card">
                <img src="https://placehold.co/120x120/e2e8f0/0f172a?text=User" alt="ผู้บริหาร">
                <h4>นายนามสมมุติ คนที่ ${i+1}</h4>
                <p style="color: #64748b; font-size: 0.9rem; margin-top: 5px;">${roles[i]}</p>
            </div>
        `;
    }
}

// รันเมื่อเริ่มโหลดหน้าเว็บ
renderNews();
renderExecutives();
