// 控制台欢迎信息
function console_welcome() {
    console.log(
        `%c 🚀 欢迎来到我的个人网站！ %c\n` +
        `%c 👨‍💻 作者: 你的名字 %c\n` +
        `%c 📧 邮箱: your.email@example.com %c\n` +
        `%c 🕐 加载时间: ${new Date().toLocaleTimeString()} %c`,
        'background: #4a90e2; color: white; padding: 5px 10px; border-radius: 3px;',
        '',
        'background: #5d9cec; color: white; padding: 5px 10px; border-radius: 3px;',
        '',
        'background: #6aa5ed; color: white; padding: 5px 10px; border-radius: 3px;',
        '',
        'background: #7baef5; color: white; padding: 5px 10px; border-radius: 3px;',
        ''
    );
}

// 时间显示
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    document.getElementById('time').textContent = timeString;
    
    // 计算网站运行时间
    const startDate = new Date('2023-01-01T00:00:00'); // 设置你的网站开始日期
    const diff = now - startDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    document.getElementById('runtime').textContent = `网站已运行: ${days}天 ${hours}小时 ${minutes}分钟`;
}

// 获取一言
async function fetchHitokoto() {
    try {
        const response = await fetch('https://v1.hitokoto.cn/');
        const data = await response.json();
        
        const hitokotoText = document.getElementById('hitokoto_text');
        hitokotoText.textContent = `${data.hitokoto} —— ${data.from}`;
        hitokotoText.href = `https://hitokoto.cn/?uuid=${data.uuid}`;
    } catch (error) {
        console.error('获取一言失败:', error);
        const hitokotoText = document.getElementById('hitokoto_text');
        hitokotoText.textContent = '技术让生活更美好。';
    }
}

// 模拟访问人数统计
function updateVisitorCount() {
    // 这里可以使用 localStorage 模拟访问统计
    let count = localStorage.getItem('visitorCount');
    
    if (!count) {
        // 初始化为一个随机数，看起来更真实
        count = Math.floor(Math.random() * 100) + 50;
        localStorage.setItem('visitorCount', count);
    } else {
        // 每次访问增加1
        count = parseInt(count) + 1;
        localStorage.setItem('visitorCount', count);
    }
    
    document.getElementById('visitorCount').textContent = count;
}

// 平滑滚动
function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// 返回顶部功能
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 初始化事件监听器
function initEventListeners() {
    // 为导航链接添加点击事件
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            smoothScroll(targetId);
        });
    });
    
    // 为技能条添加动画
    const skillBars = document.querySelectorAll('.skill-level');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 技能条已经在视图中，不需要额外处理
                // 宽度已经在HTML中内联设置了
            }
        });
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// 初始化背景图片（如果需要）
function initBackground() {
    // 如果需要背景图片，可以在这里初始化
    // $.backstretch("https://images.unsplash.com/photo-1519681393784-d120267933ba");
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    fetchHitokoto();
    updateVisitorCount();
    initBackToTop();
    initEventListeners();
    
    // 每秒更新时间
    setInterval(updateTime, 1000);
    
    // 每30秒更新一言（可选）
    setInterval(fetchHitokoto, 30000);
});

// 为页面添加键盘快捷键
document.addEventListener('keydown', (e) => {
    // Ctrl + 1 返回顶部
    if (e.ctrlKey && e.key === '1') {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // ESC 键清除焦点
    if (e.key === 'Escape') {
        document.activeElement.blur();
    }
});

// 添加页面加载动画
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // 添加一个简单的加载完成动画
    const loader = document.createElement('div');
    loader.id = 'pageLoader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #1a1a2e;
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 50px; height: 50px; border: 3px solid #4a90e2; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="margin-top: 20px; color: #4a90e2;">加载中...</p>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // 3秒后移除加载动画
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loader);
        }, 500);
    }, 1000);
});