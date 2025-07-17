// 主要业务逻辑

/**
 * 应用程序主类
 */
class MeituanAnalyzer {
    constructor() {
        this.currentStep = 'store-info';
        this.storeInfo = {};
        this.uploadedImage = null;
        this.analysisResult = null;
        
        this.init();
    }

    /**
     * 初始化应用
     */
    init() {
        this.bindEvents();
        this.loadSavedData();
        console.log('美团外卖数据分析系统已初始化');
    }

    /**
     * 绑定事件监听器
     */
    bindEvents() {
        // 图片上传相关事件
        this.bindImageUploadEvents();
        
        // 表单验证事件
        this.bindFormEvents();
        
        // 拖拽上传事件
        this.bindDragDropEvents();
    }

    /**
     * 绑定图片上传事件
     */
    bindImageUploadEvents() {
        const imageUpload = document.getElementById('imageUpload');
        const uploadArea = document.getElementById('uploadArea');

        if (imageUpload) {
            imageUpload.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    this.handleImageUpload(file);
                }
            });
        }

        if (uploadArea) {
            uploadArea.addEventListener('click', (e) => {
                // 防止重复触发文件选择对话框
                e.stopPropagation();
                if (imageUpload && !imageUpload.disabled) {
                    imageUpload.click();
                }
            });
        }
    }

    /**
     * 绑定表单事件
     */
    bindFormEvents() {
        // 实时验证店铺信息
        const inputs = ['storeName', 'storeCategory', 'storeAddress', 'dataDateRange'];
        inputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', debounce(() => {
                    this.validateStoreInfo();
                }, 300));
            }
        });
    }

    /**
     * 绑定拖拽上传事件
     */
    bindDragDropEvents() {
        const uploadArea = document.getElementById('uploadArea');
        if (!uploadArea) return;

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            uploadArea.classList.remove('dragover');

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleImageUpload(files[0]);
            }
        });
    }

    /**
     * 处理图片上传
     * @param {File} file - 上传的文件
     */
    async handleImageUpload(file) {
        try {
            // 验证文件
            const validation = validateFile(file);
            if (!validation.valid) {
                validation.errors.forEach(error => {
                    showToast(error, 'error');
                });
                return;
            }

            // 显示上传进度
            this.showUploadProgress();

            // 转换为Base64
            const base64 = await fileToBase64(file);
            this.uploadedImage = {
                file: file,
                base64: base64,
                name: file.name,
                size: file.size
            };

            // 显示预览
            this.showImagePreview(base64);
            
            // 启用分析按钮
            const analyzeBtn = document.getElementById('analyzeBtn');
            if (analyzeBtn) {
                analyzeBtn.disabled = false;
            }

            showToast('图片上传成功', 'success');

        } catch (error) {
            console.error('图片上传失败:', error);
            showToast('图片上传失败，请重试', 'error');
        }
    }

    /**
     * 显示上传进度
     */
    showUploadProgress() {
        const uploadContent = document.getElementById('uploadContent');
        if (uploadContent) {
            uploadContent.innerHTML = `
                <div class="loading-spinner mx-auto mb-4"></div>
                <p class="text-lg font-semibold text-gray-700">正在上传图片...</p>
            `;
        }
    }

    /**
     * 显示图片预览
     * @param {string} base64 - Base64编码的图片
     */
    showImagePreview(base64) {
        const previewArea = document.getElementById('previewArea');
        const imagePreview = document.getElementById('imagePreview');
        const uploadContent = document.getElementById('uploadContent');

        if (previewArea && imagePreview) {
            imagePreview.src = base64;
            previewArea.classList.remove('hidden');
        }

        if (uploadContent) {
            uploadContent.innerHTML = `
                <svg class="mx-auto h-16 w-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <p class="text-lg font-semibold text-green-700 mb-2">图片上传成功</p>
                <p class="text-sm text-gray-500">文件大小: ${formatFileSize(this.uploadedImage.size)}</p>
            `;
        }
    }

    /**
     * 验证店铺信息
     * @returns {boolean} 验证是否通过
     */
    validateStoreInfo() {
        const storeName = document.getElementById('storeName')?.value?.trim();
        const storeCategory = document.getElementById('storeCategory')?.value;
        const storeAddress = document.getElementById('storeAddress')?.value?.trim();
        const dataDateRange = document.getElementById('dataDateRange')?.value?.trim();

        const errors = [];

        if (!storeName) {
            errors.push('请输入店铺名称');
        } else if (storeName.length > 50) {
            errors.push('店铺名称不能超过50个字符');
        }

        if (!storeCategory) {
            errors.push('请输入经营品类');
        } else if (storeCategory.length > 30) {
            errors.push('经营品类不能超过30个字符');
        }

        if (!storeAddress) {
            errors.push('请输入店铺地址');
        } else if (storeAddress.length > 100) {
            errors.push('店铺地址不能超过100个字符');
        }

        // 验证日期范围格式（可选字段，简单验证）
        if (dataDateRange && dataDateRange.length > 50) {
            errors.push('数据时间范围不能超过50个字符');
        }

        // 显示错误信息
        if (errors.length > 0) {
            // 这里可以添加实时错误提示
            return false;
        }

        // 保存店铺信息
        this.storeInfo = {
            name: storeName,
            category: storeCategory,
            address: storeAddress,
            dateRange: dataDateRange || '30天数据'
        };

        return true;
    }

    /**
     * 开始AI分析
     */
    async startAnalysis() {
        try {
            if (!this.uploadedImage) {
                showToast('请先上传店铺数据截图', 'error');
                return;
            }

            if (!this.validateStoreInfo()) {
                showToast('请完善店铺基本信息', 'error');
                return;
            }

            // 切换到分析页面
            this.goToStep('analysis');
            this.updateProgress('分析中');

            // 开始分析
            this.updateAnalysisStatus('正在连接AI服务...');
            
            // 测试API连接
            const isConnected = await geminiAPI.testConnection();
            if (!isConnected) {
                throw new Error('无法连接到AI服务，请检查网络连接');
            }

            this.updateAnalysisStatus('正在深度分析店铺数据...');
            this.updateAnalysisProgress(30);

            // 调用AI分析
            const result = await geminiAPI.analyzeImage(
                this.uploadedImage.base64,
                this.storeInfo
            );

            this.updateAnalysisStatus('AI深度思考中，正在生成专业报告...');
            this.updateAnalysisProgress(80);

            // 处理分析结果
            if (result.error) {
                throw new Error(result.error + (result.rawText ? '\n原始响应: ' + result.rawText : ''));
            }

            this.analysisResult = result;
            
            this.updateAnalysisStatus('深度分析完成，正在整理专业报告...');
            this.updateAnalysisProgress(100);

            // 延迟一下再显示结果，让用户看到完成状态
            setTimeout(() => {
                this.showAnalysisResult();
            }, 1000);

        } catch (error) {
            console.error('AI分析失败:', error);
            ErrorHandler.handleError(error, 'AI分析');
            
            // 返回到上传页面
            this.goToStep('upload');
        }
    }

    /**
     * 更新分析状态
     * @param {string} status - 状态文本
     */
    updateAnalysisStatus(status) {
        const statusElement = document.getElementById('analysisStatus');
        if (statusElement) {
            statusElement.textContent = status;
        }
    }

    /**
     * 更新分析进度
     * @param {number} progress - 进度百分比
     */
    updateAnalysisProgress(progress) {
        const progressElement = document.getElementById('analysisProgress');
        if (progressElement) {
            progressElement.value = progress;
        }
    }

    /**
     * 显示分析结果
     */
    showAnalysisResult() {
        try {
            // 切换到报告页面
            this.goToStep('report');
            this.updateProgress('完成');

            // 延迟生成报告，确保DOM已经渲染
            setTimeout(() => {
                // 生成报告
                reportGenerator.generateReport(this.analysisResult, this.storeInfo);

                // 保存分析结果
                this.saveAnalysisResult();

                showToast('分析报告生成成功', 'success');
            }, 100);

        } catch (error) {
            console.error('报告生成失败:', error);
            showToast('报告生成失败，请重试', 'error');
        }
    }

    /**
     * 切换步骤
     * @param {string} step - 步骤名称
     */
    goToStep(step) {
        // 隐藏所有步骤
        const sections = ['store-info-section', 'upload-section', 'analysis-section', 'report-section'];
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.add('hidden');
            }
        });

        // 显示目标步骤
        let targetSection;
        switch (step) {
            case 'store-info':
                targetSection = 'store-info-section';
                break;
            case 'upload':
                targetSection = 'upload-section';
                break;
            case 'analysis':
                targetSection = 'analysis-section';
                break;
            case 'report':
                targetSection = 'report-section';
                break;
        }

        if (targetSection) {
            const section = document.getElementById(targetSection);
            if (section) {
                section.classList.remove('hidden');
            }
        }

        this.currentStep = step;
        this.updateStepIndicator();
    }

    /**
     * 更新步骤指示器
     */
    updateStepIndicator() {
        const steps = ['step-info', 'step-upload', 'step-analyze', 'step-report'];
        const stepMap = {
            'store-info': 0,
            'upload': 1,
            'analysis': 2,
            'report': 3
        };

        const currentIndex = stepMap[this.currentStep] || 0;

        steps.forEach((stepId, index) => {
            const stepElement = document.getElementById(stepId);
            if (stepElement) {
                if (index <= currentIndex) {
                    stepElement.classList.add('step-primary');
                } else {
                    stepElement.classList.remove('step-primary');
                }
            }
        });
    }

    /**
     * 更新进度状态
     * @param {string} status - 状态
     */
    updateProgress(status) {
        // 这里可以添加更详细的进度更新逻辑
        console.log('进度更新:', status);
    }

    /**
     * 移除图片
     */
    removeImage() {
        this.uploadedImage = null;
        
        const previewArea = document.getElementById('previewArea');
        const uploadContent = document.getElementById('uploadContent');
        const analyzeBtn = document.getElementById('analyzeBtn');

        if (previewArea) {
            previewArea.classList.add('hidden');
        }

        if (uploadContent) {
            uploadContent.innerHTML = `
                <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p class="text-lg font-semibold text-gray-700 mb-2">拖拽图片到此处或点击上传</p>
                <p class="text-sm text-gray-500">支持 JPG, PNG, WEBP 格式，最大 10MB</p>
            `;
        }

        if (analyzeBtn) {
            analyzeBtn.disabled = true;
        }

        // 清空文件输入
        const imageUpload = document.getElementById('imageUpload');
        if (imageUpload) {
            imageUpload.value = '';
        }
    }

    /**
     * 开始新的分析
     */
    startNewAnalysis() {
        // 重置所有数据
        this.storeInfo = {};
        this.uploadedImage = null;
        this.analysisResult = null;

        // 清空表单
        const inputs = ['storeName', 'storeCategory', 'storeAddress', 'dataDateRange'];
        inputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.value = '';
            }
        });

        // 清空图片
        this.removeImage();

        // 销毁所有图表
        chartGenerator.destroyAllCharts();

        // 返回第一步
        this.goToStep('store-info');

        showToast('已重置，可以开始新的分析', 'info');
    }

    /**
     * 复制报告名称
     */
    copyReportName() {
        if (this.storeInfo && this.storeInfo.name) {
            const reportName = `${this.storeInfo.name}30天店铺数据分析 呈尚策划`;

            // 使用现代的 Clipboard API
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(reportName).then(() => {
                    showToast(`已复制报告名称：${reportName}`, 'success');
                }).catch(err => {
                    console.error('复制失败:', err);
                    this.fallbackCopyText(reportName);
                });
            } else {
                // 降级方案
                this.fallbackCopyText(reportName);
            }
        } else {
            showToast('请先完成店铺信息填写', 'warning');
        }
    }

    /**
     * 降级复制方案
     * @param {string} text - 要复制的文本
     */
    fallbackCopyText(text) {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);

            if (successful) {
                showToast(`已复制报告名称：${text}`, 'success');
            } else {
                showToast('复制失败，请手动复制', 'error');
                console.log('报告名称:', text);
            }
        } catch (err) {
            console.error('降级复制也失败:', err);
            showToast('复制失败，请手动复制', 'error');
            console.log('报告名称:', text);
        }
    }

    /**
     * 保存分析结果到本地存储
     */
    saveAnalysisResult() {
        if (this.analysisResult && this.storeInfo) {
            const data = {
                storeInfo: this.storeInfo,
                analysisResult: this.analysisResult,
                timestamp: new Date().toISOString()
            };
            Storage.set('lastAnalysis', data);
        }
    }

    /**
     * 加载保存的数据
     */
    loadSavedData() {
        const savedData = Storage.get('lastAnalysis');
        if (savedData && savedData.timestamp) {
            // 检查数据是否过期（24小时）
            const savedTime = new Date(savedData.timestamp);
            const now = new Date();
            const hoursDiff = (now - savedTime) / (1000 * 60 * 60);
            
            if (hoursDiff < 24) {
                console.log('发现保存的分析数据，可以选择恢复');
                // 这里可以添加恢复数据的逻辑
            }
        }
    }
}

// 全局函数（供HTML调用）
function validateStoreInfo() {
    if (app.validateStoreInfo()) {
        app.goToStep('upload');
    } else {
        showToast('请完善店铺信息', 'error');
    }
}

function goToStep(step) {
    app.goToStep(step);
}

function startAnalysis() {
    app.startAnalysis();
}

function removeImage() {
    app.removeImage();
}

function startNewAnalysis() {
    app.startNewAnalysis();
}

function copyReportName() {
    app.copyReportName();
}

// 初始化应用
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new MeituanAnalyzer();
});
