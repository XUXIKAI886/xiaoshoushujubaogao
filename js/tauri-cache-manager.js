// Tauri应用缓存管理器

/**
 * Tauri环境缓存管理类
 */
class TauriCacheManager {
    constructor() {
        this.currentVersion = '2.0.0-ui-fix';
        this.versionKey = 'tauri-app-version';
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
    async init() {
        if (this.isTauri) {
            console.log('检测到Tauri环境，启用Tauri缓存管理');
            await this.checkTauriVersion();
            this.setupTauriSpecificHandling();
        } else {
            console.log('非Tauri环境，使用标准缓存管理');
        }
    }

    /**
     * 检查Tauri应用版本
     */
    async checkTauriVersion() {
        try {
            const storedVersion = localStorage.getItem(this.versionKey);
            
            if (storedVersion !== this.currentVersion) {
                console.log('Tauri应用版本更新:', storedVersion, '->', this.currentVersion);
                await this.clearTauriCache();
                this.updateTauriVersion();
                this.showTauriUpdateNotification();
            }

            // 检查是否存在旧版本元素
            this.checkOldElements();
        } catch (error) {
            console.error('Tauri版本检查失败:', error);
        }
    }

    /**
     * 清理Tauri应用缓存
     */
    async clearTauriCache() {
        try {
            // 清理localStorage
            const keysToRemove = [
                'preferred-theme',
                'lastAnalysis',
                'theme-settings',
                'app-cache'
            ];
            
            keysToRemove.forEach(key => {
                localStorage.removeItem(key);
            });

            // 如果可用，使用Tauri API清理缓存
            if (window.__TAURI__?.fs) {
                try {
                    // 清理应用数据目录中的缓存文件
                    const { appDataDir } = window.__TAURI__.path;
                    const { removeDir } = window.__TAURI__.fs;
                    
                    const cacheDir = await appDataDir();
                    await removeDir(`${cacheDir}/cache`, { recursive: true });
                    console.log('Tauri缓存目录已清理');
                } catch (fsError) {
                    console.warn('清理Tauri文件系统缓存失败:', fsError);
                }
            }

            // 清理WebView缓存
            if (window.__TAURI__?.webview) {
                try {
                    await window.__TAURI__.webview.clearCache();
                    console.log('WebView缓存已清理');
                } catch (webviewError) {
                    console.warn('清理WebView缓存失败:', webviewError);
                }
            }

            console.log('Tauri应用缓存清理完成');
        } catch (error) {
            console.error('清理Tauri缓存时出错:', error);
        }
    }

    /**
     * 更新Tauri应用版本
     */
    updateTauriVersion() {
        localStorage.setItem(this.versionKey, this.currentVersion);
        localStorage.setItem('tauri-update-time', new Date().toISOString());
    }

    /**
     * 设置Tauri特定处理
     */
    setupTauriSpecificHandling() {
        // 监听Tauri应用事件
        if (window.__TAURI__?.event) {
            const { listen } = window.__TAURI__.event;
            
            // 监听应用更新事件
            listen('app-update', (event) => {
                console.log('收到应用更新事件:', event);
                this.handleAppUpdate();
            });

            // 监听窗口焦点事件，检查版本
            listen('tauri://focus', () => {
                setTimeout(() => this.checkOldElements(), 500);
            });
        }

        // 添加Tauri特定的快捷键
        document.addEventListener('keydown', (e) => {
            // Ctrl+Shift+R 或 F5 在Tauri中刷新
            if ((e.ctrlKey && e.shiftKey && e.key === 'R') || e.key === 'F5') {
                e.preventDefault();
                this.reloadTauriApp();
            }
        });
    }

    /**
     * 检查旧版本元素
     */
    checkOldElements() {
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
            console.warn('在Tauri应用中检测到旧版本元素');
            this.showTauriRefreshPrompt();
        }
    }

    /**
     * 显示Tauri更新通知
     */
    showTauriUpdateNotification() {
        const notification = document.createElement('div');
        notification.className = 'tauri-update-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
            z-index: 10000;
            max-width: 380px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            animation: slideInRight 0.3s ease-out;
        `;

        notification.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 12px;">
                <svg style="width: 24px; height: 24px; flex-shrink: 0; margin-top: 2px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <div style="flex: 1;">
                    <div style="font-weight: 600; margin-bottom: 4px;">Tauri应用已更新 🚀</div>
                    <div style="font-size: 14px; opacity: 0.9; line-height: 1.4;">
                        UI排版问题已修复，缓存已自动清理。如果仍看到旧版本，请点击重新加载。
                    </div>
                    <button onclick="window.tauriCacheManager.reloadTauriApp()" 
                            style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 6px 12px; border-radius: 4px; cursor: pointer; margin-top: 8px; font-size: 12px;">
                        重新加载应用
                    </button>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="background: rgba(255,255,255,0.2); border: none; color: white; width: 24px; height: 24px; border-radius: 4px; cursor: pointer; flex-shrink: 0;">
                    ✕
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // 10秒后自动隐藏
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideInRight 0.3s ease-out reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 10000);
    }

    /**
     * 显示Tauri刷新提示
     */
    showTauriRefreshPrompt() {
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
            <div style="background: white; padding: 30px; border-radius: 12px; max-width: 420px; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
                <div style="font-size: 48px; margin-bottom: 16px;">🔄</div>
                <h3 style="margin: 0 0 12px; color: #1f2937;">Tauri应用需要重新加载</h3>
                <p style="margin: 0 0 24px; color: #6b7280; line-height: 1.5;">
                    检测到您正在使用旧版本的界面。为了获得最佳体验，请重新加载应用。
                </p>
                <div style="display: flex; gap: 12px; justify-content: center;">
                    <button onclick="window.tauriCacheManager.reloadTauriApp()" 
                            style="background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-weight: 500;">
                        重新加载应用
                    </button>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                            style="background: #f3f4f6; color: #374151; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer;">
                        稍后处理
                    </button>
                </div>
                <div style="margin-top: 16px; font-size: 12px; color: #9ca3af;">
                    快捷键：F5 或 Ctrl+Shift+R
                </div>
            </div>
        `;

        document.body.appendChild(prompt);
    }

    /**
     * 重新加载Tauri应用
     */
    async reloadTauriApp() {
        try {
            // 清理缓存
            await this.clearTauriCache();
            
            if (window.__TAURI__?.webview) {
                // 使用Tauri API重新加载WebView
                await window.__TAURI__.webview.reload();
            } else if (window.__TAURI__?.window) {
                // 重新加载窗口
                const { getCurrent } = window.__TAURI__.window;
                const currentWindow = getCurrent();
                await currentWindow.reload();
            } else {
                // 降级到标准重新加载
                window.location.reload(true);
            }
        } catch (error) {
            console.error('重新加载Tauri应用失败:', error);
            // 降级到标准重新加载
            window.location.reload(true);
        }
    }

    /**
     * 处理应用更新
     */
    async handleAppUpdate() {
        console.log('处理Tauri应用更新');
        await this.clearTauriCache();
        this.updateTauriVersion();
        
        // 延迟检查，确保新版本已加载
        setTimeout(() => {
            this.checkOldElements();
        }, 1000);
    }

    /**
     * 获取Tauri应用信息
     */
    async getTauriAppInfo() {
        try {
            if (window.__TAURI__?.app) {
                const { getName, getVersion } = window.__TAURI__.app;
                const name = await getName();
                const version = await getVersion();
                return { name, version };
            }
        } catch (error) {
            console.warn('获取Tauri应用信息失败:', error);
        }
        return { name: 'Unknown', version: 'Unknown' };
    }

    /**
     * 设置开发模式处理
     */
    setupDevMode() {
        if (this.isTauri && window.location.hostname === 'localhost') {
            console.log('Tauri开发模式：启用热重载检测');
            
            // 监听文件变化（开发模式）
            setInterval(() => {
                this.checkOldElements();
            }, 2000);
        }
    }
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
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

// 创建全局Tauri缓存管理器实例
window.tauriCacheManager = new TauriCacheManager();

// 页面加载完成后进行检查
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.tauriCacheManager.isTauri) {
            window.tauriCacheManager.setupDevMode();
        }
    }, 1000);
});

// 导出（如果使用模块系统）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TauriCacheManager;
}
