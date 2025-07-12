// 主题管理器

/**
 * 主题管理类
 */
class ThemeManager {
    constructor() {
        this.currentTheme = 'autumn';
        this.themes = {
            light: {
                name: '浅色主题',
                value: 'light',
                icon: 'sun',
                description: '经典浅色，适合日常使用'
            },
            corporate: {
                name: '企业主题',
                value: 'corporate',
                icon: 'building',
                description: '专业企业风格，商务感强'
            },
            business: {
                name: '商务主题',
                value: 'business',
                icon: 'briefcase',
                description: '现代商务风格，简洁专业'
            },
            emerald: {
                name: '翡翠主题',
                value: 'emerald',
                icon: 'leaf',
                description: '清新绿色调，自然舒适'
            },
            autumn: {
                name: '秋天主题',
                value: 'autumn',
                icon: 'tree',
                description: '温暖橙色调，活力十足'
            },
            winter: {
                name: '冬天主题',
                value: 'winter',
                icon: 'snowflake',
                description: '清爽蓝色调，简约清新'
            }
        };

        this.themeOrder = ['light', 'corporate', 'business', 'emerald', 'autumn', 'winter'];
        this.init();
    }

    /**
     * 初始化主题管理器
     */
    init() {
        this.loadSavedTheme();
        this.bindEvents();
        this.updateThemeIcon();

        console.log('主题管理器已初始化，当前主题:', this.currentTheme);
    }

    /**
     * 加载保存的主题设置
     */
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('preferred-theme') || 'autumn';
        this.setTheme(savedTheme);
    }

    /**
     * 绑定事件监听器
     */
    bindEvents() {
        // 主题切换按钮点击事件
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // 主题选择单选按钮事件
        const themeRadios = document.querySelectorAll('input[name="theme-radios"]');
        themeRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.setTheme(e.target.value);
                }
            });
        });
    }

    /**
     * 设置主题
     * @param {string} theme - 主题名称
     */
    setTheme(theme) {
        const htmlRoot = document.getElementById('htmlRoot') || document.documentElement;

        // 验证主题是否存在
        if (!this.themes[theme]) {
            console.warn('主题不存在:', theme, '使用默认主题 autumn');
            theme = 'autumn';
        }

        // 设置指定主题
        htmlRoot.setAttribute('data-theme', theme);
        this.currentTheme = theme;

        // 保存主题设置
        localStorage.setItem('preferred-theme', theme);

        // 更新UI
        this.updateThemeIcon();
        this.updateThemeRadios();
        this.updateChartThemes();

        // 触发主题变更事件
        this.dispatchThemeChangeEvent(theme);

        console.log('主题已切换至:', theme, '-', this.themes[theme].name);
    }

    /**
     * 切换主题（按顺序循环切换）
     */
    toggleTheme() {
        const currentIndex = this.themeOrder.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % this.themeOrder.length;
        const nextTheme = this.themeOrder[nextIndex];
        this.setTheme(nextTheme);
    }

    /**
     * 获取主题图标
     * @param {string} theme - 主题名称
     * @returns {string} 图标名称
     */
    getThemeIcon(theme) {
        const iconMap = {
            light: 'sun',
            corporate: 'building-office',
            business: 'briefcase',
            emerald: 'leaf',
            autumn: 'tree',
            winter: 'snowflake'
        };
        return iconMap[theme] || 'sun';
    }

    /**
     * 更新主题图标
     */
    updateThemeIcon() {
        const themeIcon = document.getElementById('themeIcon');
        if (!themeIcon) return;

        // 根据当前主题更新图标
        const iconMap = {
            light: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
            corporate: 'M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3',
            business: 'M20 7l-8-4-8 4m16 0v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7m16 0L12 12 4 7',
            emerald: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
            autumn: 'M12 2l3.09 6.26L22 9l-5 4.87L18.18 22 12 18.77 5.82 22 7 13.87 2 9l6.91-.74L12 2z',
            winter: 'M12 2l3.09 6.26L22 9l-5 4.87L18.18 22 12 18.77 5.82 22 7 13.87 2 9l6.91-.74L12 2z'
        };

        const path = iconMap[this.currentTheme] || iconMap.autumn;
        themeIcon.setAttribute('d', path);
    }

    /**
     * 更新主题单选按钮状态
     */
    updateThemeRadios() {
        const themeRadios = document.querySelectorAll('input[name="theme-radios"]');
        themeRadios.forEach(radio => {
            radio.checked = radio.value === this.currentTheme;
        });
    }

    /**
     * 获取当前实际应用的主题
     * @returns {string} 实际主题
     */
    getActualTheme() {
        return this.currentTheme;
    }

    /**
     * 更新图表主题
     */
    updateChartThemes() {
        if (typeof chartGenerator !== 'undefined') {
            const themeConfig = this.getThemeConfig(this.currentTheme);

            // 更新所有现有图表的主题
            chartGenerator.charts.forEach((chart, containerId) => {
                if (chart && chart.setOption) {
                    const option = chart.getOption();
                    if (option) {
                        // 更新图表配置
                        const updatedOption = {
                            ...option,
                            backgroundColor: themeConfig.backgroundColor,
                            textStyle: {
                                color: themeConfig.textColor
                            }
                        };

                        // 更新标题颜色
                        if (updatedOption.title) {
                            updatedOption.title.textStyle = {
                                ...updatedOption.title.textStyle,
                                color: themeConfig.textColor
                            };
                        }

                        // 更新坐标轴颜色
                        if (updatedOption.xAxis) {
                            updatedOption.xAxis.axisLabel = {
                                ...updatedOption.xAxis.axisLabel,
                                color: themeConfig.textColor
                            };
                        }

                        if (updatedOption.yAxis) {
                            updatedOption.yAxis.axisLabel = {
                                ...updatedOption.yAxis.axisLabel,
                                color: themeConfig.textColor
                            };
                        }

                        chart.setOption(updatedOption, true);
                    }
                }
            });
        }
    }

    /**
     * 触发主题变更事件
     * @param {string} theme - 新主题
     */
    dispatchThemeChangeEvent(theme) {
        const event = new CustomEvent('themeChanged', {
            detail: {
                theme: theme,
                actualTheme: this.getActualTheme()
            }
        });
        window.dispatchEvent(event);
    }

    /**
     * 获取主题配置
     * @param {string} theme - 主题名称
     * @returns {Object} 主题配置
     */
    getThemeConfig(theme) {
        const themeConfigs = {
            light: {
                backgroundColor: '#ffffff',
                textColor: '#374151',
                borderColor: '#e5e7eb',
                primaryColor: '#3b82f6',
                secondaryColor: '#10b981'
            },
            corporate: {
                backgroundColor: '#f8fafc',
                textColor: '#1e293b',
                borderColor: '#cbd5e1',
                primaryColor: '#0f172a',
                secondaryColor: '#64748b'
            },
            business: {
                backgroundColor: '#fefefe',
                textColor: '#1f2937',
                borderColor: '#d1d5db',
                primaryColor: '#111827',
                secondaryColor: '#6b7280'
            },
            emerald: {
                backgroundColor: '#f0fdf4',
                textColor: '#14532d',
                borderColor: '#bbf7d0',
                primaryColor: '#059669',
                secondaryColor: '#10b981'
            },
            autumn: {
                backgroundColor: '#fff7ed',
                textColor: '#9a3412',
                borderColor: '#fed7aa',
                primaryColor: '#ea580c',
                secondaryColor: '#f97316'
            },
            winter: {
                backgroundColor: '#f0f9ff',
                textColor: '#0c4a6e',
                borderColor: '#bae6fd',
                primaryColor: '#0284c7',
                secondaryColor: '#0ea5e9'
            }
        };

        return themeConfigs[theme] || themeConfigs.autumn;
    }

    /**
     * 应用主题到图表
     * @param {Object} chartOption - 图表配置
     * @returns {Object} 应用主题后的图表配置
     */
    applyThemeToChart(chartOption) {
        const themeConfig = this.getThemeConfig(this.currentTheme);
        
        return {
            ...chartOption,
            backgroundColor: themeConfig.backgroundColor,
            textStyle: {
                color: themeConfig.textColor
            },
            title: {
                ...chartOption.title,
                textStyle: {
                    ...chartOption.title?.textStyle,
                    color: themeConfig.textColor
                }
            }
        };
    }
}

// 创建全局主题管理器实例
let themeManager;

// 页面加载完成后初始化主题管理器
document.addEventListener('DOMContentLoaded', () => {
    themeManager = new ThemeManager();
    
    // 监听主题变更事件
    window.addEventListener('themeChanged', (e) => {
        console.log('主题已变更:', e.detail);
        
        // 可以在这里添加其他需要响应主题变更的逻辑
        if (typeof showToast !== 'undefined') {
            const themeInfo = themeManager.themes[e.detail.theme];
            const themeName = themeInfo ? themeInfo.name : '未知主题';
            showToast(`已切换至${themeName}`, 'info');
        }
    });
});

// 导出主题管理器（如果使用模块系统）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeManager, themeManager };
}
