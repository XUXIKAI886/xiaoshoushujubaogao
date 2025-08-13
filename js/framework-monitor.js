// 本地化CSS框架性能监控器

/**
 * CSS框架性能监控类
 */
class FrameworkMonitor {
    constructor() {
        this.version = '3.0.0-local-framework';
        this.startTime = performance.now();
        this.metrics = {
            cssLoadTime: 0,
            totalLoadTime: 0,
            errorCount: 0,
            compatibilityScore: 0,
            userAgent: navigator.userAgent
        };
        this.init();
    }

    /**
     * 初始化监控器
     */
    init() {
        this.monitorCSSLoading();
        this.checkCompatibility();
        this.setupErrorTracking();
        this.measurePerformance();
        
        // 页面加载完成后生成报告
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => this.generateReport(), 1000);
        });
    }

    /**
     * 监控CSS加载性能
     */
    monitorCSSLoading() {
        const cssLoadStart = performance.now();
        
        // 监控本地CSS文件加载
        const localCSS = document.querySelector('link[href*="local-framework.css"]');
        if (localCSS) {
            localCSS.addEventListener('load', () => {
                this.metrics.cssLoadTime = performance.now() - cssLoadStart;
                console.log(`✅ 本地CSS框架加载完成: ${this.metrics.cssLoadTime.toFixed(2)}ms`);
            });
            
            localCSS.addEventListener('error', () => {
                this.metrics.errorCount++;
                console.error('❌ 本地CSS框架加载失败');
                this.trackError('CSS_LOAD_FAILED', '本地CSS框架加载失败');
            });
        }
    }

    /**
     * 检查浏览器兼容性
     */
    checkCompatibility() {
        const features = {
            'CSS Grid': CSS.supports('display', 'grid'),
            'CSS Flexbox': CSS.supports('display', 'flex'),
            'CSS Variables': CSS.supports('color', 'var(--test)'),
            'CSS Transitions': CSS.supports('transition', 'all 0.3s ease'),
            'CSS Transform': CSS.supports('transform', 'translateX(0)'),
            'CSS Border Radius': CSS.supports('border-radius', '8px'),
            'CSS Box Shadow': CSS.supports('box-shadow', '0 0 10px rgba(0,0,0,0.1)')
        };

        const supportedFeatures = Object.values(features).filter(Boolean).length;
        const totalFeatures = Object.keys(features).length;
        this.metrics.compatibilityScore = (supportedFeatures / totalFeatures) * 100;

        console.log('🔍 浏览器兼容性检测:', features);
        console.log(`📊 兼容性得分: ${this.metrics.compatibilityScore.toFixed(1)}%`);

        // 记录不支持的特性
        const unsupportedFeatures = Object.entries(features)
            .filter(([, supported]) => !supported)
            .map(([feature]) => feature);

        if (unsupportedFeatures.length > 0) {
            console.warn('⚠️ 不支持的CSS特性:', unsupportedFeatures);
            this.trackError('COMPATIBILITY_ISSUE', `不支持的特性: ${unsupportedFeatures.join(', ')}`);
        }
    }

    /**
     * 设置错误跟踪
     */
    setupErrorTracking() {
        // 监听JavaScript错误
        window.addEventListener('error', (event) => {
            this.metrics.errorCount++;
            this.trackError('JS_ERROR', event.message, event.filename, event.lineno);
        });

        // 监听Promise拒绝
        window.addEventListener('unhandledrejection', (event) => {
            this.metrics.errorCount++;
            this.trackError('PROMISE_REJECTION', event.reason);
        });

        // 监听资源加载错误
        document.addEventListener('error', (event) => {
            if (event.target !== window) {
                this.metrics.errorCount++;
                this.trackError('RESOURCE_ERROR', `资源加载失败: ${event.target.src || event.target.href}`);
            }
        }, true);
    }

    /**
     * 测量性能指标
     */
    measurePerformance() {
        // 使用Performance API测量
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation) {
                    this.metrics.totalLoadTime = navigation.loadEventEnd - navigation.fetchStart;
                    console.log(`⏱️ 页面总加载时间: ${this.metrics.totalLoadTime.toFixed(2)}ms`);
                }

                // 测量CSS资源加载时间
                const cssResources = performance.getEntriesByType('resource')
                    .filter(entry => entry.name.includes('.css'));
                
                cssResources.forEach(resource => {
                    console.log(`📄 CSS资源 ${resource.name}: ${(resource.responseEnd - resource.fetchStart).toFixed(2)}ms`);
                });
            });
        }
    }

    /**
     * 跟踪错误
     */
    trackError(type, message, filename = '', lineno = 0) {
        const error = {
            type,
            message,
            filename,
            lineno,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        console.error('🚨 错误跟踪:', error);
        
        // 存储到localStorage用于调试
        const errors = JSON.parse(localStorage.getItem('framework-errors') || '[]');
        errors.push(error);
        
        // 只保留最近50个错误
        if (errors.length > 50) {
            errors.splice(0, errors.length - 50);
        }
        
        localStorage.setItem('framework-errors', JSON.stringify(errors));
    }

    /**
     * 检测CSS框架状态
     */
    checkFrameworkStatus() {
        const status = {
            localCSSLoaded: false,
            cdnFallbackActive: false,
            componentsWorking: false,
            themeSystemActive: false
        };

        // 检测本地CSS是否加载
        const testElement = document.createElement('div');
        testElement.className = 'btn btn-primary';
        testElement.style.visibility = 'hidden';
        testElement.style.position = 'absolute';
        document.body.appendChild(testElement);

        const computedStyle = window.getComputedStyle(testElement);
        status.localCSSLoaded = computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' && 
                               computedStyle.backgroundColor !== 'transparent';

        document.body.removeChild(testElement);

        // 检测CDN备份是否激活
        status.cdnFallbackActive = document.querySelector('link[href*="daisyui"]') !== null;

        // 检测组件是否正常工作
        status.componentsWorking = document.querySelectorAll('.btn, .card, .navbar').length > 0;

        // 检测主题系统
        const rootStyle = getComputedStyle(document.documentElement);
        status.themeSystemActive = rootStyle.getPropertyValue('--color-primary').trim() !== '';

        return status;
    }

    /**
     * 生成性能报告
     */
    generateReport() {
        this.metrics.totalLoadTime = performance.now() - this.startTime;
        const status = this.checkFrameworkStatus();

        const report = {
            version: this.version,
            timestamp: new Date().toISOString(),
            metrics: this.metrics,
            status: status,
            browser: this.getBrowserInfo(),
            recommendations: this.generateRecommendations(status)
        };

        console.group('📊 CSS框架性能报告');
        console.log('版本:', report.version);
        console.log('加载时间:', `${report.metrics.totalLoadTime.toFixed(2)}ms`);
        console.log('兼容性得分:', `${report.metrics.compatibilityScore.toFixed(1)}%`);
        console.log('错误数量:', report.metrics.errorCount);
        console.log('框架状态:', report.status);
        console.log('浏览器信息:', report.browser);
        
        if (report.recommendations.length > 0) {
            console.log('优化建议:', report.recommendations);
        }
        console.groupEnd();

        // 存储报告
        localStorage.setItem('framework-report', JSON.stringify(report));

        // 如果有问题，显示用户友好的提示
        if (report.metrics.errorCount > 0 || !status.localCSSLoaded) {
            this.showUserNotification(report);
        }

        return report;
    }

    /**
     * 获取浏览器信息
     */
    getBrowserInfo() {
        const ua = navigator.userAgent;
        let browser = 'Unknown';
        let version = 'Unknown';

        if (ua.includes('Chrome')) {
            browser = 'Chrome';
            version = ua.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
        } else if (ua.includes('Firefox')) {
            browser = 'Firefox';
            version = ua.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
        } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
            browser = 'Safari';
            version = ua.match(/Version\/(\d+)/)?.[1] || 'Unknown';
        } else if (ua.includes('Edge')) {
            browser = 'Edge';
            version = ua.match(/Edge\/(\d+)/)?.[1] || 'Unknown';
        }

        return {
            name: browser,
            version: version,
            userAgent: ua,
            isMobile: /Mobile|Android|iPhone|iPad/.test(ua),
            isTauri: typeof window.__TAURI__ !== 'undefined'
        };
    }

    /**
     * 生成优化建议
     */
    generateRecommendations(status) {
        const recommendations = [];

        if (!status.localCSSLoaded) {
            recommendations.push('本地CSS框架加载失败，建议检查文件路径或网络连接');
        }

        if (status.cdnFallbackActive) {
            recommendations.push('正在使用CDN备份，建议修复本地CSS文件加载问题');
        }

        if (this.metrics.compatibilityScore < 90) {
            recommendations.push('浏览器兼容性较低，建议升级浏览器版本');
        }

        if (this.metrics.errorCount > 0) {
            recommendations.push('检测到错误，建议查看控制台详细信息');
        }

        if (this.metrics.totalLoadTime > 1000) {
            recommendations.push('页面加载时间较长，建议优化资源加载');
        }

        return recommendations;
    }

    /**
     * 显示用户通知
     */
    showUserNotification(report) {
        if (report.status.cdnFallbackActive) {
            console.info('ℹ️ 系统已自动切换到备用CSS框架，功能正常');
        }

        if (report.metrics.errorCount > 0) {
            console.warn(`⚠️ 检测到 ${report.metrics.errorCount} 个错误，可能影响使用体验`);
        }
    }

    /**
     * 获取存储的错误日志
     */
    getErrorLogs() {
        return JSON.parse(localStorage.getItem('framework-errors') || '[]');
    }

    /**
     * 清除错误日志
     */
    clearErrorLogs() {
        localStorage.removeItem('framework-errors');
        console.log('✅ 错误日志已清除');
    }

    /**
     * 导出性能数据
     */
    exportData() {
        const report = JSON.parse(localStorage.getItem('framework-report') || '{}');
        const errors = this.getErrorLogs();
        
        const exportData = {
            report,
            errors,
            exportTime: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `framework-data-${Date.now()}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        console.log('📁 性能数据已导出');
    }
}

// 创建全局监控器实例
window.frameworkMonitor = new FrameworkMonitor();

// 提供全局调试方法
window.debugFramework = {
    getReport: () => JSON.parse(localStorage.getItem('framework-report') || '{}'),
    getErrors: () => window.frameworkMonitor.getErrorLogs(),
    clearErrors: () => window.frameworkMonitor.clearErrorLogs(),
    exportData: () => window.frameworkMonitor.exportData(),
    checkStatus: () => window.frameworkMonitor.checkFrameworkStatus()
};

// 导出（如果使用模块系统）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FrameworkMonitor;
}
