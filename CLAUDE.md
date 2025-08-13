# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于AI的美团外卖店铺数据分析系统，通过上传店铺数据截图，利用Gemini 2.5 Flash API进行智能分析，生成专业的数据可视化报告。项目采用原生HTML/CSS/JavaScript开发，无需构建工具或依赖管理。

## 核心架构

### 技术栈
- **前端**: 原生HTML + CSS + JavaScript
- **UI框架**: Tailwind CSS + DaisyUI
- **图表库**: ECharts 5.4.3
- **AI服务**: Gemini 2.5 Flash API (OpenAI兼容格式)
- **图标**: Heroicons SVG图标库

### 主要组件结构

```
├── index.html          # 单页应用主入口
├── js/
│   ├── main.js         # MeituanAnalyzer主应用类，负责状态管理和业务流程
│   ├── api.js          # GeminiAPI类，封装AI API调用和提示词构建
│   ├── chart.js        # ChartGenerator类，处理ECharts图表生成和渲染
│   ├── report.js       # ReportGenerator类，生成HTML报告和数据展示
│   ├── theme.js        # ThemeManager类，管理6种主题切换和样式
│   ├── utils.js        # 工具函数库，文件处理、数据验证、格式化等
│   └── demo-data.js    # 演示数据和测试数据生成
```

### 核心业务流程

1. **店铺信息收集** (`MeituanAnalyzer.validateStoreInfo()`)
   - 验证必填字段：店铺名称、经营品类、店铺地址
   - 可选字段：数据时间范围

2. **图片上传处理** (`MeituanAnalyzer.handleImageUpload()`)
   - 支持拖拽和点击上传
   - 文件类型验证：JPG/PNG/WEBP
   - 文件大小限制：10MB
   - 图片预览和重新选择功能

3. **AI分析处理** (`GeminiAPI.analyzeImage()`)
   - 调用Gemini 2.5 Flash API
   - 多模态输入：文本提示词 + 图片
   - 结构化JSON输出包含：提取数据、图表配置、SWOT分析、优化建议

4. **报告生成展示** (`ReportGenerator.generateReport()`)
   - 动态生成4大数据卡片：核心指标、转化漏斗、对比分析、关键发现
   - 生成3种固定图表：柱状图、折线图、饼图
   - SWOT分析和优化建议展示

## 常用开发命令

### 本地开发
```bash
# 使用Python启动本地服务器
python -m http.server 8000

# 使用Node.js启动本地服务器
npx serve .

# 直接在浏览器中打开（适用于静态文件）
open index.html
```

### 测试和调试
```bash
# 打开浏览器开发者工具进行调试
# 项目包含多个测试页面在 测试页面/ 目录下：
open 测试页面/api-test.html          # API连接测试
open 测试页面/chart-test.html        # 图表功能测试
open 测试页面/funnel-test.html       # 转化漏斗测试
open 测试页面/theme-ui-test.html     # 主题切换测试
```

### 部署
项目为纯静态网站，可直接部署到任何静态托管服务：
- GitHub Pages
- Netlify  
- Vercel
- 阿里云OSS
- 腾讯云COS

## API配置说明

项目使用OpenAI兼容的API格式调用Gemini服务，配置位于`js/api.js`：

```javascript
const API_CONFIG = {
    baseUrl: 'https://haxiaiplus.cn/v1/chat/completions',
    apiKey: 'sk-BIChztSl1gwRjl06f5DZ3J15UMnLGgEBpiJa00VHTsQeI00N',
    model: 'gemini-2.5-flash',
    temperature: 0.8,
    max_tokens: 8384,
    timeout: 360000
};
```

⚠️ **重要**: API密钥已在代码中硬编码，生产环境需要进行安全处理。

## 开发注意事项

### 代码架构原则
- **模块化设计**: 每个JS文件负责特定功能域，类之间职责明确
- **状态管理**: MeituanAnalyzer类作为主控制器管理应用状态
- **错误处理**: API调用和文件操作都有完善的错误处理机制
- **响应式设计**: 使用Tailwind CSS确保多设备兼容

### 主题系统
- 支持6种主题：light, corporate, business, emerald, autumn, winter
- 默认主题：autumn（温暖橙色调）
- 主题切换通过data-theme属性控制DaisyUI样式
- 主题偏好保存在localStorage中

### 图表系统
- 固定生成3种图表类型以确保一致性
- 支持多系列数据对比（本店 vs 同行）
- 图表主题自动跟随页面主题变化
- 所有图表使用ECharts渲染，支持交互

### 数据处理
- AI返回的JSON数据包含多层结构：extractedData, charts, summary
- 系统优先显示从截图中提取的真实数据
- 当真实数据不足时，显示状态而非虚假数据
- 严格避免在分析中引用演示数据

## 常见问题解决

### API调用失败
1. 检查网络连接
2. 验证API配置是否正确
3. 使用`测试页面/api-test.html`进行连接测试

### 图片上传问题
1. 确认文件格式（JPG/PNG/WEBP）
2. 检查文件大小（<10MB）
3. 确保图片内容清晰可读

### 主题切换异常
1. 检查localStorage是否可用
2. 确认DaisyUI版本兼容性
3. 验证CSS样式是否正确加载

### 图表显示问题
1. 确认ECharts库已正确加载
2. 检查数据格式是否符合预期
3. 验证容器尺寸和CSS样式

## 项目特色功能

- **20秒快速分析**: 优化的AI提示词和API配置实现快速响应
- **专业商业报告**: 移除技术性表述，提供直接的商业洞察
- **多主题支持**: 6种专业主题适配不同使用场景
- **真实数据驱动**: 严格基于截图数据进行分析，避免模板化内容
- **响应式设计**: 适配桌面端、平板和手机端
- **一键复制功能**: 支持复制标准化报告名称格式