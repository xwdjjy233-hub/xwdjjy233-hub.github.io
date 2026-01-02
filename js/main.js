/**
 * 小梧个人网站 - 主JavaScript文件
 * 作者: 小梧 (Xiaowu)
 * 版本: 1.0.0
 */

// 控制台欢迎信息
function console_welcome() {
    console.log(
        `%c 🌳 欢迎来到小梧的个人网站！ %c\n` +
        `%c 👨‍💻 作者: 小梧(Xiaowu) %c\n` +
        `%c 📧 邮箱: xiaowu@example.com %c\n` +
        `%c 🕐 加载时间: ${new Date().toLocaleTimeString()} %c\n` +
        `%c 🔗 GitHub: https://github.com/Xiaowu %c`,
        'background: linear-gradient(45deg, #6a89cc, #4a69bd); color: white; padding: 5px 10px; border-radius: 3px;',
        '',
        'background: linear-gradient(45deg, #4a69bd, #1e3799); color: white; padding: 5px 10px; border-radius: 3px;',
        '',
        'background: linear-gradient(45deg, #1e3799, #0c2461); color: white; padding: 5px 10px; border-radius: 3px;',
        '',
        'background: linear-gradient(45deg, #0c2461, #6a89cc); color: white; padding: 5px 10px; border-radius: 3px;',
        '',
        'background: linear-gradient(45deg, #6a89cc, #4a69bd); color: white; padding: 5px 10px; border-radius: 3px;',
        ''
    );
}

// 时间显示功能
function updateTime() {
    const now = new Date();
    
    // 格式化时间
    const timeString = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    // 更新时间显示
    const timeElement = document.getElementById('time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
    
    // 计算网站运行时间
    const startDate = new Date('2023-01-01T00:00:00');
    const diff = now - startDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    const runtimeElement = document.getElementById('runtime');
    if (runtimeElement) {
        runtimeElement.textContent = `网站已运行: ${days}天 ${hours}小时 ${minutes}分钟`;
    }
}

// 获取一言
async function fetchHitokoto() {
    try {
        const response = await fetch('https://v1.hitokoto.cn/?c=a&c=b&c=c&c=d&c=e&c=f&c=g&c=h&c=i&c=j&c=k&c=l');
        
        if (!response.ok) {
            throw new Error('网络响应不正常');
        }
        
        const data = await response.json();
        const hitokotoText = document.getElementById('hitokoto_text');
        
        if (hitokotoText && data.hitokoto) {
            const fromText = data.from ? ` —— ${data.from}` : '';
            hitokotoText.textContent = `${data.hitokoto}${fromText}`;
            hitokotoText.href = `https://hitokoto.cn/?uuid=${data.uuid}`;
            
            // 添加动画效果
            hitokotoText.style.opacity = '0';
            hitokotoText.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                hitokotoText.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                hitokotoText.style.opacity = '1';
                hitokotoText.style.transform = 'translateY(0)';
            }, 50);
        }
    } catch (error) {
        console.log('获取一言失败，使用本地默认:', error);
        const hitokotoText = document.getElementById('hitokoto_text');
        if (hitokotoText) {
            const localHitokotos = [
                '代码如诗，逻辑如画。',
                '技术让生活更美好。',
                '学习是一生的事业。',
                '万物互联，代码为桥。',
                '晨兴理荒秽，带月荷锄归。'
            ];
            const randomIndex = Math.floor(Math.random() * localHitokotos.length);
            hitokotoText.textContent = localHitokotos[randomIndex];
            hitokotoText.href = '#';
        }
    }
}

// 访问人数统计
function updateVisitorCount() {
    let count = localStorage.getItem('visitorCount');
    
    if (!count) {
        // 初始化为一个随机数，看起来更真实
        count = Math.floor(Math.random() * 100) + 150;
        localStorage.setItem('visitorCount', count);
    } else {
        // 检查今天是否已经访问过
        const lastVisit = localStorage.getItem('lastVisitDate');
        const today = new Date().toDateString();
        
        if (lastVisit !== today) {
            // 新的一天，增加访问计数
            count = parseInt(count) + 1;
            localStorage.setItem('visitorCount', count);
            localStorage.setItem('lastVisitDate', today);
        }
    }
    
    const visitorElement = document.getElementById('visitorCount');
    if (visitorElement) {
        // 添加计数动画
        let current = parseInt(visitorElement.textContent) || 0;
        const target = parseInt(count);
        const increment = target > current ? 1 : -1;
        
        const animateCount = () => {
            current += increment;
            visitorElement.textContent = current;
            
            if (current !== target) {
                setTimeout(animateCount, 10);
            }
        };
        
        animateCount();
    }
}

// 平滑滚动到指定位置
function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// 返回顶部功能
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    // 显示/隐藏按钮
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // 点击返回顶部
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
    
    // 为外部链接添加target="_blank"
    document.querySelectorAll('a').forEach(link => {
        if (link.hostname !== window.location.hostname && !link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    // 技能条动画
    const skillBars = document.querySelectorAll('.skill-level');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 确保宽度已经设置
                const skillLevel = entry.target;
                const currentWidth = skillLevel.style.width;
                
                // 添加一个小的延迟动画
                setTimeout(() => {
                    skillLevel.style.transition = 'width 1.5s cubic-bezier(0.22, 0.61, 0.36, 1)';
                }, 100);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
    
    // 卡片悬停效果
    document.querySelectorAll('.project-card, .timeline-content').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// 背景音乐功能（可选）
function initMusicPlayer() {
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const musicPlayer = document.getElementById('music-player');
    
    if (!musicToggle || !bgMusic) return;
    
    // 显示音乐播放器
    musicPlayer.style.display = 'block';
    
    // 点击切换音乐播放/暂停
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            musicToggle.style.background = 'linear-gradient(45deg, #4a69bd, #1e3799)';
        } else {
            bgMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            musicToggle.style.background = 'linear-gradient(45deg, #666, #888)';
        }
    });
    
    // 设置默认音量
    bgMusic.volume = 0.3;
}

// 页面加载动画
function initPageLoader() {
    // 移除页面加载动画（如果有的话）
    const loader = document.getElementById('pageLoader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 500);
    }
    
    // 为内容添加淡入效果
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            mainContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 300);
    }
}

// 键盘快捷键
function initKeyboardShortcuts() {
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
        
        // 空格键暂停/播放音乐
        if (e.key === ' ' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            const musicToggle = document.getElementById('music-toggle');
            if (musicToggle) {
                musicToggle.click();
            }
        }
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    console_welcome();
    updateTime();
    fetchHitokoto();
    updateVisitorCount();
    initBackToTop();
    initEventListeners();
    initMusicPlayer();
    initPageLoader();
    initKeyboardShortcuts();
    
    // 每秒更新时间
    setInterval(updateTime, 1000);
    
    // 每60秒更新一言（可选）
    setInterval(fetchHitokoto, 60000);
    
    // 添加页面加载完成的类
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 500);
});

// 窗口大小调整时的处理
window.addEventListener('resize', () => {
    // 可以添加响应式布局的调整
    const header = document.querySelector('header');
    if (window.innerWidth <= 768 && header) {
        header.style.padding = '10px 15px';
    } else if (header) {
        header.style.padding = '15px 30px';
    }
});

// 添加页面卸载前的处理
window.addEventListener('beforeunload', () => {
    // 可以在这里保存一些状态
    console.log('感谢访问小梧的个人网站！');
});