// 缓存清理和版本管理工具

/**
 * 缓存清理管理器
 */
class CacheBuster {
    constructor() {
        this.currentVersion = '2.0.0-ui-fix';
        this.versionKey = 'app-version';
        this.isTauri = this.detectTauriEnvironment();
        this.init();
    }

    /**
     * 检测是否在Tauri环境中运行
     */
    detectTauriEnvironment() {
        return typeof window.__TAURI__ !== 'undefined' ||
               typeof window.__TAURI_IPC__ !== 'undefined' ||
               window.location.protocol === 'tauri:' ||
               navigator.userAgent.includes('Tauri');
    }

    /**
     * 初始化缓存管理器
     */
    init() {
        if (this.isTauri) {
            console.log('检测到Tauri环境，使用Tauri缓存管理器');
            // Tauri环境由TauriCacheManager处理
            return;
        }

        this.checkVersion();
        this.addVersionToResources();
        console.log('标准缓存管理器已初始化，当前版本:', this.currentVersion);
    }

    /**
     * 检查版本更新
     */
    checkVersion() {
        const storedVersion = localStorage.getItem(this.versionKey);
        
        if (storedVersion !== this.currentVersion) {
            console.log('检测到版本更新:', storedVersion, '->', this.currentVersion);
            this.clearOldCache();
            this.updateVersion();
            this.showUpdateNotification();
        }
    }

    /**
     * 清理旧版本缓存
     */
    clearOldCache() {
        try {
            // 清理localStorage中的旧数据
            const keysToRemove = [
                'preferred-theme',
                'lastAnalysis',
                'theme-settings'
            ];
            
            keysToRemove.forEach(key => {
                localStorage.removeItem(key);
            });

            // 如果支持，清理Service Worker缓存
            if ('serviceWorker' in navigator && 'caches' in window) {
                caches.keys().then(cacheNames => {
                    return Promise.all(
                        cacheNames.map(cacheName => {
                            if (cacheName.includes('v1') || cacheName.includes('old')) {
                                return caches.delete(cacheName);
                            }
                        })
                    );
                });
            }

            console.log('旧版本缓存已清理');
        } catch (error) {
            console.warn('清理缓存时出错:', error);
        }
    }

    /**
     * 更新版本信息
     */
    updateVersion() {
        localStorage.setItem(this.versionKey, this.currentVersion);
        localStorage.setItem('update-time', new Date().toISOString());
    }

    /**
     * 为资源添加版本参数
     */
    addVersionToResources() {
        // 为CSS和JS文件添加版本参数，防止缓存
        const resources = document.querySelectorAll('link[rel="stylesheet"], script[src]');
        resources.forEach(resource => {
            const url = resource.href || resource.src;
            if (url && !url.includes('?v=') && !url.includes('cdn.')) {
                const separator = url.includes('?') ? '&' : '?';
                const newUrl = `${url}${separator}v=${this.currentVersion}`;
                
                if (resource.href) {
                    resource.href = newUrl;
                } else if (resource.src) {
                    resource.src = newUrl;
                }
            }
        });
    }

    /**
     * 显示更新通知
     */
    showUpdateNotification() {
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
            z-index: 10000;
            max-width: 350px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            animation: slideIn 0.3s ease-out;
        `;

        notification.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 12px;">
                <svg style="width: 24px; height: 24px; flex-shrink: 0; margin-top: 2px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div style="flex: 1;">
                    <div style="font-weight: 600; margin-bottom: 4px;">页面已更新 🎉</div>
                    <div style="font-size: 14px; opacity: 0.9; line-height: 1.4;">
                        UI排版问题已修复，界面更简洁专业。如果仍看到旧版本，请按 Ctrl+F5 强制刷新。
                    </div>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="background: rgba(255,255,255,0.2); border: none; color: white; width: 24px; height: 24px; border-radius: 4px; cursor: pointer; flex-shrink: 0;">
                    ✕
                </button>
            </div>
        `;

        // 添加动画样式
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
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // 8秒后自动隐藏
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideIn 0.3s ease-out reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 8000);
    }

    /**
     * 强制刷新页面
     */
    forceRefresh() {
        // 清理所有缓存
        this.clearOldCache();
        
        // 添加时间戳参数强制刷新
        const url = new URL(window.location);
        url.searchParams.set('_t', Date.now());
        window.location.href = url.toString();
    }

    /**
     * 检查是否需要强制刷新
     */
    checkForceRefresh() {
        // 检查是否存在旧版本的元素
        const oldElements = [
            '.theme-toggle',
            '.dropdown-content',
            'input[name="theme-radios"]',
            '#themeToggle'
        ];

        const hasOldElements = oldElements.some(selector => 
            document.querySelector(selector) !== null
        );

        if (hasOldElements) {
            console.warn('检测到旧版本元素，建议强制刷新');
            this.showForceRefreshPrompt();
        }
    }

    /**
     * 显示强制刷新提示
     */
    showForceRefreshPrompt() {
        const prompt = document.createElement('div');
        prompt.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;

        prompt.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 12px; max-width: 400px; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
                <div style="font-size: 48px; margin-bottom: 16px;">🔄</div>
                <h3 style="margin: 0 0 12px; color: #1f2937;">需要刷新页面</h3>
                <p style="margin: 0 0 24px; color: #6b7280; line-height: 1.5;">
                    检测到您正在使用旧版本的页面。为了获得最佳体验，请刷新页面。
                </p>
                <div style="display: flex; gap: 12px; justify-content: center;">
                    <button onclick="window.cacheBuster.forceRefresh()" 
                            style="background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 500;">
                        立即刷新
                    </button>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                            style="background: #f3f4f6; color: #374151; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
                        稍后处理
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(prompt);
    }
}

// 创建全局实例
window.cacheBuster = new CacheBuster();

// 页面加载完成后进行检查
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.cacheBuster.checkForceRefresh();
    }, 1000);
});

// 导出（如果使用模块系统）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CacheBuster;
}
