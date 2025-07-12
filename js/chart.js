// 图表生成工具

/**
 * 图表生成器类
 */
class ChartGenerator {
    constructor() {
        this.charts = new Map(); // 存储图表实例
        this.defaultColors = [
            '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
            '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
        ];
    }

    /**
     * 创建图表容器
     * @param {string} containerId - 容器ID
     * @param {string} title - 图表标题
     * @returns {HTMLElement} 图表容器元素
     */
    createChartContainer(containerId, title) {
        const container = document.createElement('div');
        container.className = 'bg-white rounded-lg shadow-lg p-6 mb-6';
        container.innerHTML = `
            <h3 class="text-lg font-semibold mb-4 text-gray-800">${title}</h3>
            <div id="${containerId}" class="chart-container" style="width: 100%; height: 400px;"></div>
        `;
        return container;
    }

    /**
     * 获取当前主题配置
     * @returns {Object} 主题配置
     */
    getThemeConfig() {
        if (typeof themeManager !== 'undefined') {
            return themeManager.getThemeConfig(themeManager.currentTheme);
        }

        // 默认浅色主题配置
        return {
            backgroundColor: '#ffffff',
            textColor: '#374151',
            borderColor: '#e5e7eb',
            primaryColor: '#3b82f6',
            secondaryColor: '#10b981'
        };
    }

    /**
     * 生成系列数据
     * @param {Object} chartData - 图表数据
     * @param {string} chartType - 图表类型
     * @returns {Array} 系列数据数组
     */
    generateSeriesData(chartData, chartType) {
        // 检查是否有多系列数据
        if (chartData.data.series && Array.isArray(chartData.data.series)) {
            // 多系列数据
            return chartData.data.series.map((series, index) => {
                const seriesConfig = {
                    name: series.name,
                    type: chartType,
                    data: series.values,
                    itemStyle: {
                        color: this.defaultColors[index % this.defaultColors.length]
                    }
                };

                // 为折线图添加特殊样式
                if (chartType === 'line') {
                    seriesConfig.smooth = true;
                    seriesConfig.lineStyle = {
                        color: this.defaultColors[index % this.defaultColors.length],
                        width: 3
                    };
                    seriesConfig.areaStyle = {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: this.defaultColors[index % this.defaultColors.length] + '40' },
                            { offset: 1, color: this.defaultColors[index % this.defaultColors.length] + '10' }
                        ])
                    };
                }

                return seriesConfig;
            });
        } else {
            // 单系列数据（向后兼容）
            const seriesConfig = {
                name: chartData.title,
                type: chartType,
                data: chartData.data.values,
                itemStyle: {
                    color: this.defaultColors[0]
                }
            };

            // 为折线图添加特殊样式
            if (chartType === 'line') {
                seriesConfig.smooth = true;
                seriesConfig.lineStyle = {
                    color: this.defaultColors[0],
                    width: 3
                };
                seriesConfig.areaStyle = {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: this.defaultColors[0] + '40' },
                        { offset: 1, color: this.defaultColors[0] + '10' }
                    ])
                };
            }

            return [seriesConfig];
        }
    }

    /**
     * 生成柱状图
     * @param {string} containerId - 容器ID
     * @param {Object} chartData - 图表数据
     * @returns {Object} ECharts实例
     */
    generateBarChart(containerId, chartData) {
        const chartDom = document.getElementById(containerId);
        if (!chartDom) {
            console.error(`找不到容器: ${containerId}`);
            return null;
        }

        const chart = window.echarts.init(chartDom);
        const themeConfig = this.getThemeConfig();

        const seriesData = this.generateSeriesData(chartData, 'bar');

        const option = {
            backgroundColor: themeConfig.backgroundColor,
            title: {
                text: chartData.title,
                left: 'center',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: themeConfig.textColor
                }
            },
            legend: {
                show: seriesData.length > 1,
                top: '10%',
                data: seriesData.map(s => s.name),
                textStyle: {
                    color: themeConfig.textColor
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function(params) {
                    let result = params[0].name + '<br/>';
                    params.forEach(param => {
                        result += `${param.seriesName}: ${param.value}${chartData.data.unit || ''}<br/>`;
                    });
                    return result;
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: chartData.data.categories,
                axisLabel: {
                    rotate: chartData.data.categories.some(cat => cat.length > 4) ? 45 : 0,
                    color: themeConfig.textColor
                },
                axisLine: {
                    lineStyle: {
                        color: themeConfig.borderColor
                    }
                }
            },
            yAxis: {
                type: 'value',
                name: chartData.data.unit || '',
                axisLabel: {
                    color: themeConfig.textColor
                },
                axisLine: {
                    lineStyle: {
                        color: themeConfig.borderColor
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: themeConfig.borderColor
                    }
                }
            },
            series: seriesData
        };

        chart.setOption(option);
        this.charts.set(containerId, chart);
        
        // 响应式处理
        window.addEventListener('resize', () => {
            chart.resize();
        });

        return chart;
    }

    /**
     * 生成折线图
     * @param {string} containerId - 容器ID
     * @param {Object} chartData - 图表数据
     * @returns {Object} ECharts实例
     */
    generateLineChart(containerId, chartData) {
        const chartDom = document.getElementById(containerId);
        if (!chartDom) {
            console.error(`找不到容器: ${containerId}`);
            return null;
        }

        const chart = window.echarts.init(chartDom);
        const themeConfig = this.getThemeConfig();
        const seriesData = this.generateSeriesData(chartData, 'line');

        const option = {
            title: {
                text: chartData.title,
                left: 'center',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#374151'
                }
            },
            legend: {
                show: seriesData.length > 1,
                top: '10%',
                data: seriesData.map(s => s.name),
                textStyle: {
                    color: '#374151'
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                    let result = params[0].name + '<br/>';
                    params.forEach(param => {
                        result += `${param.seriesName}: ${param.value}${chartData.data.unit || ''}<br/>`;
                    });
                    return result;
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: chartData.data.dates || chartData.data.categories,
                boundaryGap: false
            },
            yAxis: {
                type: 'value',
                name: chartData.data.unit || ''
            },
            series: seriesData
        };

        chart.setOption(option);
        this.charts.set(containerId, chart);
        
        window.addEventListener('resize', () => {
            chart.resize();
        });

        return chart;
    }

    /**
     * 生成饼图
     * @param {string} containerId - 容器ID
     * @param {Object} chartData - 图表数据
     * @returns {Object} ECharts实例
     */
    generatePieChart(containerId, chartData) {
        const chartDom = document.getElementById(containerId);
        if (!chartDom) {
            console.error(`找不到容器: ${containerId}`);
            return null;
        }

        const chart = echarts.init(chartDom);
        
        const option = {
            title: {
                text: chartData.title,
                left: 'center',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#374151'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c}{d}%'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                top: 'middle'
            },
            series: [{
                name: chartData.title,
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['60%', '50%'],
                data: chartData.data.items.map((item, index) => ({
                    name: item.name,
                    value: item.value,
                    itemStyle: {
                        color: this.defaultColors[index % this.defaultColors.length]
                    }
                })),
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label: {
                    formatter: '{b}: {c}%'
                }
            }]
        };

        chart.setOption(option);
        this.charts.set(containerId, chart);
        
        window.addEventListener('resize', () => {
            chart.resize();
        });

        return chart;
    }

    /**
     * 生成雷达图
     * @param {string} containerId - 容器ID
     * @param {Object} chartData - 图表数据
     * @returns {Object} ECharts实例
     */
    generateRadarChart(containerId, chartData) {
        const chartDom = document.getElementById(containerId);
        if (!chartDom) {
            console.error(`找不到容器: ${containerId}`);
            return null;
        }

        const chart = echarts.init(chartDom);
        
        const option = {
            title: {
                text: chartData.title,
                left: 'center',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#374151'
                }
            },
            tooltip: {
                trigger: 'item'
            },
            radar: {
                indicator: chartData.data.indicators,
                center: ['50%', '55%'],
                radius: '70%'
            },
            series: [{
                name: chartData.title,
                type: 'radar',
                data: [{
                    value: chartData.data.values,
                    name: '店铺评估',
                    itemStyle: {
                        color: this.defaultColors[0]
                    },
                    areaStyle: {
                        color: this.defaultColors[0] + '30'
                    }
                }]
            }]
        };

        chart.setOption(option);
        this.charts.set(containerId, chart);
        
        window.addEventListener('resize', () => {
            chart.resize();
        });

        return chart;
    }

    /**
     * 生成仪表盘图
     * @param {string} containerId - 容器ID
     * @param {Object} chartData - 图表数据
     * @returns {Object} ECharts实例
     */
    generateGaugeChart(containerId, chartData) {
        const chartDom = document.getElementById(containerId);
        if (!chartDom) {
            console.error(`找不到容器: ${containerId}`);
            return null;
        }

        const chart = echarts.init(chartDom);
        
        const option = {
            title: {
                text: chartData.title,
                left: 'center',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#374151'
                }
            },
            series: [{
                name: chartData.title,
                type: 'gauge',
                center: ['50%', '60%'],
                startAngle: 200,
                endAngle: -40,
                min: 0,
                max: chartData.data.max || 10,
                splitNumber: 5,
                itemStyle: {
                    color: this.defaultColors[0]
                },
                progress: {
                    show: true,
                    width: 30
                },
                pointer: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        width: 30
                    }
                },
                axisTick: {
                    distance: -45,
                    splitNumber: 5,
                    lineStyle: {
                        width: 2,
                        color: '#999'
                    }
                },
                splitLine: {
                    distance: -52,
                    length: 14,
                    lineStyle: {
                        width: 3,
                        color: '#999'
                    }
                },
                axisLabel: {
                    distance: -20,
                    color: '#999',
                    fontSize: 20
                },
                anchor: {
                    show: false
                },
                title: {
                    show: false
                },
                detail: {
                    valueAnimation: true,
                    width: '60%',
                    lineHeight: 40,
                    borderRadius: 8,
                    offsetCenter: [0, '-15%'],
                    fontSize: 60,
                    fontWeight: 'bolder',
                    formatter: '{value}',
                    color: 'inherit'
                },
                data: [{
                    value: chartData.data.value
                }]
            }]
        };

        chart.setOption(option);
        this.charts.set(containerId, chart);
        
        window.addEventListener('resize', () => {
            chart.resize();
        });

        return chart;
    }

    /**
     * 根据数据类型自动生成图表
     * @param {string} containerId - 容器ID
     * @param {Object} chartData - 图表数据
     * @returns {Object} ECharts实例
     */
    generateChart(containerId, chartData) {
        switch (chartData.type) {
            case 'bar':
                return this.generateBarChart(containerId, chartData);
            case 'line':
                return this.generateLineChart(containerId, chartData);
            case 'pie':
                return this.generatePieChart(containerId, chartData);
            case 'radar':
                return this.generateRadarChart(containerId, chartData);
            case 'gauge':
                return this.generateGaugeChart(containerId, chartData);
            default:
                console.error(`不支持的图表类型: ${chartData.type}`);
                return null;
        }
    }

    /**
     * 销毁图表
     * @param {string} containerId - 容器ID
     */
    destroyChart(containerId) {
        const chart = this.charts.get(containerId);
        if (chart) {
            chart.dispose();
            this.charts.delete(containerId);
        }
    }

    /**
     * 销毁所有图表
     */
    destroyAllCharts() {
        this.charts.forEach((chart, containerId) => {
            chart.dispose();
        });
        this.charts.clear();
    }

    /**
     * 重新调整所有图表大小
     */
    resizeAllCharts() {
        this.charts.forEach(chart => {
            chart.resize();
        });
    }
}

// 创建全局图表生成器实例
const chartGenerator = new ChartGenerator();

// 监听窗口大小变化
window.addEventListener('resize', debounce(() => {
    chartGenerator.resizeAllCharts();
}, 300));

// 导出图表生成器（如果使用模块系统）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ChartGenerator, chartGenerator };
}
