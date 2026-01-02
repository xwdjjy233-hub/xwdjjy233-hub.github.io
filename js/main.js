/**
 * 小梧个人网站 - 主JavaScript文件
 * 作者: 小梧 (xwdjjy233-hub)
 * 版本: 1.1.0
 * GitHub: https://github.com/xwdjjy233-hub/xwdjjy233-hub.github.io
 * 网站: https://xwdjjy233-hub.github.io
 */

// ========================================
// 1. 初始化函数
// ========================================

/**
 * 控制台欢迎信息
 */
function console_welcome() {
    console.log(
        `%c                                                                              \n` +
        `%c   ╔══════════════════════════════════════════════════════════════════╗   \n` +
        `%c   ║                                                                  ║   \n` +
        `%c   ║          🌳 欢迎来到小梧(xwdjjy233-hub)的个人网站！              ║   \n` +
        `%c   ║                                                                  ║   \n` +
        `%c   ║    👨‍💻 作者: 小梧 (GitHub: @xwdjjy233-hub)                      ║   \n` +
        `%c   ║    🌐 网站: https://xwdjjy233-hub.github.io                     ║   \n` +
        `%c   ║    📧 联系: 通过GitHub Issues或邮件联系                          ║   \n` +
        `%c   ║    🕐 加载时间: ${new Date().toLocaleTimeString('zh-CN')}                 ║   \n` +
        `%c   ║    📅 加载日期: ${new Date().toLocaleDateString('zh-CN')}                 ║   \n` +
        `%c   ║                                                                  ║   \n` +
        `%c   ║    感谢访问！希望你能在这里找到有用的内容。                      ║   \n` +
        `%c   ║                                                                  ║   \n` +
        `%c   ╚══════════════════════════════════════════════════════════════════╝   \n` +
        `%c                                                                              `,
        'background: #1a1a2e; color: #6a89cc',
        'background: #1a1a2e; color: #6a89cc',
        'background: #1a1a2e; color: #6a89cc',
        'background: #1a1a2e; color: #6a89cc',
        'background: #1a1a2e; color: #6a89cc',
        'background: #1a1a2e; color: #6a89cc',
        'background: #1a1a2e; color: #6a89cc',
        'background: #1a1a2e; color: #6a89cc',
        'background: #1a1a2e; color: #6a89cc',
        'background: #1a1a2e; color: #6a89cc',
        'background: #1a1a2e; color: #6a89cc',
        'background: #1a1a2e; color: #6a89cc',
        'background: #1a1a2e; color: #6a89cc',
        'background: #1a1a2e; color: #6a89cc',
        'background: #1a1a2e; color: #6a89cc'
    );
}

/**
 * 初始化背景图片
 * 支持两种方式：CSS方式（默认）和jQuery Backstretch插件方式
 */
function initBackground() {
    const bgImagePath = 'img/background.jpg';
    const body = document.body;
    
    console.log('🖼️ 初始化背景图片...');
    
    // 检查背景图片是否存在
    const img = new Image();
    img.src = bgImagePath;
    
    img.onload = function() {
        console.log('✅ 背景图片加载成功:', bgImagePath);
        
        // 方法1: 使用纯CSS设置背景（推荐）
        body.style.backgroundImage = `
            linear-gradient(135deg, rgba(26, 26, 46, 0.85) 0%, rgba(22, 33, 62, 0.9) 100%),
            url('${bgImagePath}')
        `;
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center center';
        body.style.backgroundAttachment = 'fixed';
        body.style.backgroundRepeat = 'no-repeat';
        body.style.transition = 'background-image 1s ease';
        
        // 移除加载状态类
        body.classList.remove('loading-bg');
        
        // 方法2: 使用jQuery Backstretch插件（如果已加载）
        // if (typeof $.backstretch !== 'undefined') {
        //     $.backstretch(bgImagePath, {
        //         fade: 1000,
        //         speed: 500
        //     });
        // }
        
        // 显示背景加载成功提示（可选）
        showNotification('背景图片加载成功', 'success');
    };
    
    img.onerror = function() {
        console.warn('⚠️ 背景图片加载失败，使用纯色背景:', bgImagePath);
        
        // 使用纯色背景作为备选
        body.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
        body.classList.remove('loading-bg');
        
        // 显示提示信息
        showNotification('背景图片未找到，使用默认背景', 'warning');
    };
    
    // 添加加载状态类
    body.classList.add('loading-bg');
}

/**
 * 更新时间显示
 */
function updateTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    
    // 格式化时间
    const timeString = now.toLocaleString('zh-CN', options);
    const timeElement = document.getElementById('time');
    
    if (timeElement) {
        timeElement.textContent = timeString;
        timeElement.title = `北京时间 ${timeString}`;
    }
    
    // 计算网站运行时间
    const startDate = new Date('2026-01-02T21:50:00'); // 设置网站开始日期
    updateRuntime(startDate);
}

/**
 * 更新网站运行时间
 */
function updateRuntime(startDate) {
    const now = new Date();
    const diff = now - startDate;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    const runtimeElement = document.getElementById('runtime');
    if (runtimeElement) {
        runtimeElement.textContent = `网站已运行: ${days}天 ${hours}时 ${minutes}分 ${seconds}秒`;
        runtimeElement.title = `始于 ${startDate.toLocaleDateString('zh-CN')}`;
    }
}

/**
 * 获取一言
 */
async function fetchHitokoto() {
    try {
        // 使用多个API端点增加成功率
        const apis = [
            'https://v1.hitokoto.cn/',
            'https://international.v1.hitokoto.cn/'
        ];
        
        const randomApi = apis[Math.floor(Math.random() * apis.length)];
        const response = await fetch(randomApi);
        
        if (!response.ok) throw new Error('API响应错误');
        
        const data = await response.json();
        const hitokotoElement = document.getElementById('hitokoto_text');
        
        if (hitokotoElement && data.hitokoto) {
            const fromText = data.from ? ` —— ${data.from}` : '';
            const newContent = `${data.hitokoto}${fromText}`;
            
            // 添加淡入淡出动画
            if (hitokotoElement.textContent !== newContent) {
                hitokotoElement.style.opacity = '0';
                hitokotoElement.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    hitokotoElement.textContent = newContent;
                    hitokotoElement.href = `https://hitokoto.cn/?uuid=${data.uuid}`;
                    hitokotoElement.title = '点击查看出处';
                    hitokotoElement.style.opacity = '1';
                }, 300);
            }
        }
    } catch (error) {
        console.log('使用本地一言:', error);
        useLocalHitokoto();
    }
}

/**
 * 使用本地一言
 */
function useLocalHitokoto() {
    const hitokotoElement = document.getElementById('hitokoto_text');
    if (!hitokotoElement) return;
    
    const localHitokotos = [
        '代码如诗，逻辑如画。',
        '技术让生活更美好。',
        '学习是一生的事业。',
        '万物互联，代码为桥。',
        '晨兴理荒秽，带月荷锄归。',
        '路漫漫其修远兮，吾将上下而求索。',
        '学而不思则罔，思而不学则殆。',
        '工欲善其事，必先利其器。',
        '千里之行，始于足下。',
        'Stay hungry, stay foolish.'
    ];
    
    const currentText = hitokotoElement.textContent;
    let newText;
    
    // 确保不重复显示相同的一言
    do {
        newText = localHitokotos[Math.floor(Math.random() * localHitokotos.length)];
    } while (newText === currentText && localHitokotos.length > 1);
    
    hitokotoElement.textContent = newText;
    hitokotoElement.href = '#';
    hitokotoElement.title = '本地一言';
}

/**
 * 更新访问人数统计
 */
function updateVisitorCount() {
    const STORAGE_KEY = 'visitor_count_xwdjjy233';
    const DATE_KEY = 'last_visit_date_xwdjjy233';
    
    let count = parseInt(localStorage.getItem(STORAGE_KEY)) || 0;
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem(DATE_KEY);
    
    // 如果是新的一天或者是新访客
    if (!lastVisit || lastVisit !== today) {
        count += 1;
        localStorage.setItem(STORAGE_KEY, count);
        localStorage.setItem(DATE_KEY, today);
        
        // 如果是新访客（之前没有记录），给予欢迎
        if (!lastVisit) {
            showNotification('欢迎首次访问！', 'info');
        }
    }
    
    // 动画更新计数
    const visitorElement = document.getElementById('visitorCount');
    if (visitorElement) {
        animateCounter(visitorElement, count, 1000);
    }
}

/**
 * 数字动画效果
 */
function animateCounter(element, target, duration) {
    const start = parseInt(element.textContent) || 0;
    const increment = target - start;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 缓动函数
        const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
        const easedProgress = easeOutCubic(progress);
        
        const currentValue = Math.floor(start + increment * easedProgress);
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ========================================
// 2. 交互功能
// ========================================

/**
 * 初始化返回顶部按钮
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    // 滚动监听
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // 点击事件
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // 添加点击反馈
        backToTopBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            backToTopBtn.style.transform = '';
        }, 200);
    });
}

/**
 * 初始化事件监听器
 */
function initEventListeners() {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#top') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                smoothScrollTo(targetId);
            }
        });
    });
    
    // 外部链接添加属性
    document.querySelectorAll('a').forEach(link => {
        if (link.hostname && link.hostname !== window.location.hostname) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            link.classList.add('external-link');
        }
    });
    
    // 技能条动画
    initSkillBarAnimations();
    
    // 卡片悬停效果
    initCardHoverEffects();
    
    // 复制邮箱功能
    initEmailCopy();
    
    // 标签点击效果
    initLabelEffects();
}

/**
 * 平滑滚动到元素
 */
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    
    const headerHeight = document.querySelector('header').offsetHeight || 80;
    const targetPosition = target.offsetTop - headerHeight - 20;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
    
    // 添加URL历史记录
    history.pushState(null, null, `#${targetId}`);
}

/**
 * 初始化技能条动画
 */
function initSkillBarAnimations() {
    const skillBars = document.querySelectorAll('.skill-level');
    if (skillBars.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                
                // 确保宽度已经设置
                const currentWidth = skillBar.style.width;
                if (!currentWidth) {
                    const computedStyle = getComputedStyle(skillBar);
                    skillBar.style.width = computedStyle.width || '0%';
                }
                
                // 触发动画
                setTimeout(() => {
                    skillBar.style.transition = 'width 1.5s cubic-bezier(0.22, 0.61, 0.36, 1)';
                    skillBar.classList.add('animated');
                }, 300);
                
                observer.unobserve(skillBar);
            }
        });
    }, { threshold: 0.3 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

/**
 * 初始化卡片悬停效果
 */
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.project-card, .timeline-content, .regular_color, .alternate_color');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });
    });
}

/**
 * 初始化邮箱复制功能
 */
function initEmailCopy() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const email = this.href.replace('mailto:', '');
            
            // 复制到剪贴板
            navigator.clipboard.writeText(email).then(() => {
                showNotification(`邮箱 ${email} 已复制到剪贴板`, 'success');
            }).catch(err => {
                console.log('复制失败:', err);
            });
        });
    });
}

/**
 * 初始化标签点击效果
 */
function initLabelEffects() {
    const labels = document.querySelectorAll('.label');
    
    labels.forEach(label => {
        label.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

// ========================================
// 3. 辅助功能
// ========================================

/**
 * 显示通知
 */
function showNotification(message, type = 'info') {
    // 检查是否已存在通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'warning' ? '#FF9800' : '#2196F3'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
        max-width: 350px;
        font-size: 14px;
    `;
    
    // 添加动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            line-height: 1;
            opacity: 0.8;
        }
        .notification-close:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    // 关闭按钮事件
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // 自动消失
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
}

/**
 * 初始化页面加载动画
 */
function initPageLoader() {
    // 创建加载动画
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <div class="loader-text">正在加载小梧的个人网站...</div>
            <div class="loader-progress"></div>
        </div>
    `;
    
    // 添加样式
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #1a1a2e;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        .loader-content {
            text-align: center;
            color: #6a89cc;
        }
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(106, 137, 204, 0.3);
            border-top-color: #6a89cc;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        .loader-text {
            font-size: 16px;
            margin-bottom: 15px;
        }
        .loader-progress {
            width: 200px;
            height: 3px;
            background: rgba(106, 137, 204, 0.2);
            border-radius: 3px;
            overflow: hidden;
            margin: 0 auto;
        }
        .loader-progress::after {
            content: '';
            display: block;
            width: 0%;
            height: 100%;
            background: #6a89cc;
            animation: progress 2s ease-in-out;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        @keyframes progress {
            to { width: 100%; }
        }
    `;
    
    document.head.appendChild(loaderStyle);
    document.body.appendChild(loader);
    
    // 页面加载完成后移除加载动画
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
                document.body.classList.add('loaded');
                
                // 内容淡入效果
                const mainContent = document.querySelector('main');
                if (mainContent) {
                    mainContent.style.opacity = '0';
                    mainContent.style.transition = 'opacity 0.8s ease';
                    setTimeout(() => {
                        mainContent.style.opacity = '1';
                    }, 100);
                }
                
                showNotification('页面加载完成！欢迎访问～', 'success');
            }, 500);
        }, 1000);
    });
}

/**
 * 初始化键盘快捷键
 */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // 忽略输入框中的按键
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        switch (e.key) {
            case 'Escape':
                // ESC键清除焦点
                document.activeElement.blur();
                break;
                
            case ' ':
                // 空格键暂停/播放音乐
                e.preventDefault();
                const musicToggle = document.getElementById('music-toggle');
                if (musicToggle) musicToggle.click();
                break;
                
            case 'h':
                // H键回到首页
                if (e.ctrlKey) {
                    e.preventDefault();
                    window.location.href = '#';
                }
                break;
                
            case '1':
                // Ctrl+1返回顶部
                if (e.ctrlKey) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                break;
                
            case 'r':
                // Ctrl+R刷新一言
                if (e.ctrlKey) {
                    e.preventDefault();
                    fetchHitokoto();
                    showNotification('一言已刷新', 'info');
                }
                break;
        }
    });
}

/**
 * 初始化性能监控
 */
function initPerformanceMonitor() {
    // 监控页面性能
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            
            console.log(`📊 页面性能统计:`);
            console.log(`   - 页面加载时间: ${loadTime}ms`);
            console.log(`   - DOM加载时间: ${timing.domContentLoadedEventEnd - timing.navigationStart}ms`);
            console.log(`   - 首字节时间: ${timing.responseStart - timing.navigationStart}ms`);
            
            // 如果加载时间过长，给出提示
            if (loadTime > 3000) {
                console.warn('⚠️ 页面加载时间较长，建议优化图片和脚本');
            }
        }
    });
    
    // 监控内存使用
    if ('memory' in performance) {
        setInterval(() => {
            const memory = performance.memory;
            const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
            const totalMB = Math.round(memory.totalJSHeapSize / 1048576);
            
            if (usedMB > 100) {
                console.log(`🧠 内存使用: ${usedMB}MB / ${totalMB}MB`);
            }
        }, 30000);
    }
}

// ========================================
// 4. 主初始化函数
// ========================================

/**
 * 主初始化函数
 */
function init() {
    console.log('🚀 开始初始化小梧的个人网站...');
    
    // 1. 显示控制台欢迎信息
    console_welcome();
    
    // 2. 初始化页面加载动画
    initPageLoader();
    
    // 3. 初始化背景图片
    initBackground();
    
    // 4. 更新时间（立即执行一次）
    updateTime();
    
    // 5. 获取一言
    fetchHitokoto();
    
    // 6. 更新访问人数统计
    updateVisitorCount();
    
    // 7. 初始化返回顶部按钮
    initBackToTop();
    
    // 8. 初始化事件监听器
    initEventListeners();
    
    // 9. 初始化键盘快捷键
    initKeyboardShortcuts();
    
    // 10. 初始化性能监控
    initPerformanceMonitor();
    
    // 设置定时器
    setInterval(updateTime, 1000); // 每秒更新时间
    setInterval(fetchHitokoto, 60000); // 每分钟刷新一言
    
    console.log('✅ 初始化完成！');
}

// ========================================
// 5. 页面加载事件
// ========================================

// 当DOM完全加载后初始化
document.addEventListener('DOMContentLoaded', init);

// 页面卸载前的事件
window.addEventListener('beforeunload', () => {
    console.log('👋 感谢访问小梧的个人网站！期待再次相遇～');
});

// 页面可见性变化事件
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('⏸️ 页面已隐藏');
    } else {
        console.log('▶️ 页面已恢复显示');
        updateTime(); // 恢复时更新时间
    }
});

// 错误处理
window.addEventListener('error', (event) => {
    console.error('❌ 页面错误:', event.error);
    
    // 友好的错误提示
    if (event.error && event.error.message) {
        showNotification(`发生错误: ${event.error.message}`, 'warning');
    }
});

// 离线/在线状态检测
window.addEventListener('online', () => {
    console.log('🌐 网络已连接');
    showNotification('网络已恢复连接', 'success');
});

window.addEventListener('offline', () => {
    console.log('📶 网络已断开');
    showNotification('网络连接已断开，部分功能可能不可用', 'warning');
});

// ========================================
// 6. 导出函数（用于HTML中的onload调用）
// ========================================

// 确保console_welcome函数可以在HTML的onload中调用
window.console_welcome = console_welcome;

// ========================================
// 7. 添加CSS样式（动态添加）
// ========================================

// 动态添加一些CSS样式
const dynamicStyles = `
    /* 页面加载状态 */
    body.loading-bg {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%) !important;
    }
    
    body.loaded .regular_color,
    body.loaded .alternate_color {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    /* 外部链接样式 */
    a.external-link::after {
        content: ' ↗';
        font-size: 0.9em;
        opacity: 0.7;
    }
    
    /* 动画定义 */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    /* 移动端优化 */
    @media (max-width: 768px) {
        body {
            background-attachment: scroll !important;
        }
    }
`;

// 添加动态样式到页面
const styleElement = document.createElement('style');
styleElement.textContent = dynamicStyles;
document.head.appendChild(styleElement);

// ========================================
// 8. 版本信息
// ========================================

console.log(`📦 小梧个人网站 JavaScript v1.1.0
✨ 功能列表:
   - ✅ 控制台欢迎信息
   - ✅ 实时时间显示
   - ✅ 网站运行时间
   - ✅ 一言获取
   - ✅ 访客统计
   - ✅ 背景图片支持
   - ✅ 平滑滚动
   - ✅ 返回顶部
   - ✅ 响应式设计
   - ✅ 键盘快捷键
   - ✅ 性能监控
   - ✅ 错误处理
   
👤 作者: 小梧 (xwdjjy233-hub)
🌐 网站: https://xwdjjy233-hub.github.io
📅 最后更新: ${new Date().toLocaleDateString('zh-CN')}
`);
