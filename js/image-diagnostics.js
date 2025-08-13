// 图片问题诊断工具

/**
 * 图片问题诊断类
 */
class ImageDiagnostics {
    constructor() {
        this.issues = [];
        this.fixes = [];
        this.init();
    }

    /**
     * 初始化诊断工具
     */
    init() {
        console.log('🔍 启动图片问题诊断工具');
        this.checkImageElements();
        this.checkSVGElements();
        this.checkCSSClasses();
        this.checkImageSizes();
        this.generateReport();
    }

    /**
     * 检查图片元素
     */
    checkImageElements() {
        const images = document.querySelectorAll('img');
        console.log(`📸 检查 ${images.length} 个图片元素`);

        images.forEach((img, index) => {
            const issues = this.diagnoseImage(img, index);
            if (issues.length > 0) {
                this.issues.push({
                    type: 'image',
                    element: img,
                    issues: issues
                });
            }
        });
    }

    /**
     * 诊断单个图片元素
     */
    diagnoseImage(img, index) {
        const issues = [];
        const computedStyle = window.getComputedStyle(img);

        // 检查是否有src属性
        if (!img.src && !img.dataset.src) {
            issues.push('缺少src属性');
        }

        // 检查是否过大
        const width = parseInt(computedStyle.width);
        const height = parseInt(computedStyle.height);
        
        if (width > 1200) {
            issues.push(`宽度过大: ${width}px`);
            this.fixes.push(`为图片 #${index} 添加 max-w-full 类`);
        }

        if (height > 800) {
            issues.push(`高度过大: ${height}px`);
            this.fixes.push(`为图片 #${index} 添加 max-h-96 类`);
        }

        // 检查是否有适当的响应式类
        const classList = Array.from(img.classList);
        const hasResponsiveClass = classList.some(cls => 
            cls.includes('max-w') || cls.includes('max-h') || cls.includes('w-') || cls.includes('h-')
        );

        if (!hasResponsiveClass) {
            issues.push('缺少响应式尺寸类');
            this.fixes.push(`为图片 #${index} 添加 max-w-full 类`);
        }

        // 检查加载状态
        if (img.complete && img.naturalWidth === 0) {
            issues.push('图片加载失败');
        }

        return issues;
    }

    /**
     * 检查SVG元素
     */
    checkSVGElements() {
        const svgs = document.querySelectorAll('svg');
        console.log(`🎨 检查 ${svgs.length} 个SVG元素`);

        svgs.forEach((svg, index) => {
            const issues = this.diagnoseSVG(svg, index);
            if (issues.length > 0) {
                this.issues.push({
                    type: 'svg',
                    element: svg,
                    issues: issues
                });
            }
        });
    }

    /**
     * 诊断单个SVG元素
     */
    diagnoseSVG(svg, index) {
        const issues = [];
        const computedStyle = window.getComputedStyle(svg);

        // 检查尺寸
        const width = computedStyle.width;
        const height = computedStyle.height;

        if (width === '0px' || height === '0px') {
            issues.push('SVG尺寸为0');
            this.fixes.push(`为SVG #${index} 添加尺寸类 (如 w-5 h-5)`);
        }

        // 检查是否有viewBox
        if (!svg.getAttribute('viewBox')) {
            issues.push('缺少viewBox属性');
        }

        // 检查是否有适当的尺寸类
        const classList = Array.from(svg.classList);
        const hasSizeClass = classList.some(cls => 
            cls.match(/^(w|h)-\d+$/) || cls.match(/^icon-(xs|sm|md|lg|xl)$/)
        );

        if (!hasSizeClass) {
            issues.push('缺少尺寸类');
            this.fixes.push(`为SVG #${index} 添加尺寸类 (如 w-5 h-5)`);
        }

        return issues;
    }

    /**
     * 检查CSS类的可用性
     */
    checkCSSClasses() {
        console.log('🎯 检查CSS类的可用性');

        const testClasses = [
            'w-4', 'w-5', 'w-6', 'w-8', 'w-16',
            'h-4', 'h-5', 'h-6', 'h-8', 'h-16',
            'max-w-full', 'max-h-96',
            'text-gray-400', 'text-gray-500', 'text-gray-700',
            'border-gray-300', 'bg-gray-200'
        ];

        const missingClasses = [];

        testClasses.forEach(className => {
            if (!this.testCSSClass(className)) {
                missingClasses.push(className);
            }
        });

        if (missingClasses.length > 0) {
            this.issues.push({
                type: 'css',
                issues: [`缺少CSS类: ${missingClasses.join(', ')}`]
            });
            this.fixes.push('更新CSS框架以包含缺失的类');
        }
    }

    /**
     * 测试CSS类是否存在
     */
    testCSSClass(className) {
        const testElement = document.createElement('div');
        testElement.className = className;
        testElement.style.visibility = 'hidden';
        testElement.style.position = 'absolute';
        document.body.appendChild(testElement);

        const computedStyle = window.getComputedStyle(testElement);
        const hasStyle = computedStyle.width !== 'auto' || 
                        computedStyle.height !== 'auto' || 
                        computedStyle.color !== 'rgba(0, 0, 0, 0)' ||
                        computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' ||
                        computedStyle.borderColor !== 'rgba(0, 0, 0, 0)';

        document.body.removeChild(testElement);
        return hasStyle;
    }

    /**
     * 检查图片尺寸问题
     */
    checkImageSizes() {
        console.log('📏 检查图片尺寸问题');

        // 检查上传预览区域
        const previewImg = document.getElementById('imagePreview');
        if (previewImg) {
            const computedStyle = window.getComputedStyle(previewImg);
            if (computedStyle.maxWidth === 'none') {
                this.issues.push({
                    type: 'preview',
                    element: previewImg,
                    issues: ['预览图片缺少最大宽度限制']
                });
                this.fixes.push('为预览图片添加 max-w-full 类');
            }
        }

        // 检查上传区域的SVG
        const uploadSVG = document.querySelector('#uploadArea svg');
        if (uploadSVG) {
            const computedStyle = window.getComputedStyle(uploadSVG);
            if (computedStyle.width === '0px') {
                this.issues.push({
                    type: 'upload-icon',
                    element: uploadSVG,
                    issues: ['上传图标尺寸为0']
                });
                this.fixes.push('检查上传图标的CSS类');
            }
        }
    }

    /**
     * 自动修复图片问题
     */
    autoFix() {
        console.log('🔧 开始自动修复图片问题');

        // 修复没有响应式类的图片
        const images = document.querySelectorAll('img:not([class*="max-w"]):not([class*="w-"])');
        images.forEach(img => {
            img.classList.add('max-w-full');
            console.log('✅ 为图片添加了 max-w-full 类');
        });

        // 修复没有尺寸类的SVG
        const svgs = document.querySelectorAll('svg:not([class*="w-"]):not([class*="h-"]):not([class*="icon-"])');
        svgs.forEach(svg => {
            // 根据上下文添加合适的尺寸
            const parent = svg.parentElement;
            if (parent && parent.classList.contains('btn')) {
                svg.classList.add('w-4', 'h-4');
            } else {
                svg.classList.add('w-5', 'h-5');
            }
            console.log('✅ 为SVG添加了尺寸类');
        });

        // 修复预览图片
        const previewImg = document.getElementById('imagePreview');
        if (previewImg && !previewImg.classList.contains('max-w-full')) {
            previewImg.classList.add('max-w-full');
            console.log('✅ 为预览图片添加了响应式类');
        }

        console.log('🎉 自动修复完成');
    }

    /**
     * 生成诊断报告
     */
    generateReport() {
        console.group('📊 图片问题诊断报告');
        
        if (this.issues.length === 0) {
            console.log('✅ 未发现图片相关问题');
        } else {
            console.log(`⚠️ 发现 ${this.issues.length} 个问题:`);
            
            this.issues.forEach((issue, index) => {
                console.group(`问题 ${index + 1}: ${issue.type}`);
                issue.issues.forEach(desc => console.log(`- ${desc}`));
                if (issue.element) {
                    console.log('元素:', issue.element);
                }
                console.groupEnd();
            });
        }

        if (this.fixes.length > 0) {
            console.log('\n🔧 建议的修复方案:');
            this.fixes.forEach((fix, index) => {
                console.log(`${index + 1}. ${fix}`);
            });
        }

        console.groupEnd();

        // 存储报告
        const report = {
            timestamp: new Date().toISOString(),
            issueCount: this.issues.length,
            issues: this.issues.map(issue => ({
                type: issue.type,
                issues: issue.issues,
                elementTag: issue.element ? issue.element.tagName : null,
                elementClass: issue.element ? issue.element.className : null
            })),
            fixes: this.fixes
        };

        localStorage.setItem('image-diagnostics-report', JSON.stringify(report));
        return report;
    }

    /**
     * 获取存储的报告
     */
    getStoredReport() {
        const stored = localStorage.getItem('image-diagnostics-report');
        return stored ? JSON.parse(stored) : null;
    }

    /**
     * 清除报告
     */
    clearReport() {
        localStorage.removeItem('image-diagnostics-report');
        console.log('✅ 诊断报告已清除');
    }

    /**
     * 监控图片加载
     */
    monitorImageLoading() {
        const images = document.querySelectorAll('img');
        
        images.forEach((img, index) => {
            if (!img.complete) {
                img.addEventListener('load', () => {
                    console.log(`✅ 图片 #${index} 加载成功`);
                });
                
                img.addEventListener('error', () => {
                    console.error(`❌ 图片 #${index} 加载失败:`, img.src);
                    this.issues.push({
                        type: 'loading',
                        element: img,
                        issues: ['图片加载失败']
                    });
                });
            }
        });
    }

    /**
     * 实时监控
     */
    startMonitoring() {
        console.log('👁️ 启动图片实时监控');
        
        // 监控DOM变化
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // Element node
                            const images = node.querySelectorAll ? node.querySelectorAll('img, svg') : [];
                            if (images.length > 0) {
                                console.log(`🔍 检测到新的图片元素: ${images.length} 个`);
                                setTimeout(() => this.init(), 100);
                            }
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // 定期检查
        setInterval(() => {
            this.monitorImageLoading();
        }, 5000);
    }
}

// 创建全局诊断工具实例
window.imageDiagnostics = new ImageDiagnostics();

// 提供全局调试方法
window.debugImages = {
    diagnose: () => window.imageDiagnostics.init(),
    autoFix: () => window.imageDiagnostics.autoFix(),
    getReport: () => window.imageDiagnostics.getStoredReport(),
    clearReport: () => window.imageDiagnostics.clearReport(),
    startMonitoring: () => window.imageDiagnostics.startMonitoring()
};

// 页面加载完成后自动诊断
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.imageDiagnostics.monitorImageLoading();
        window.imageDiagnostics.startMonitoring();
    }, 1000);
});

// 导出（如果使用模块系统）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageDiagnostics;
}
