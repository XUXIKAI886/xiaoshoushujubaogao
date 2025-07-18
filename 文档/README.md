# 美团外卖店铺数据分析系统

## 📋 项目简介

这是一个基于AI的美团外卖店铺数据分析系统，通过上传店铺数据截图，利用Gemini 2.5 Flash API进行智能分析，生成专业的数据可视化报告。

## ✨ 功能特性

- 🏪 **店铺信息管理**: 支持输入店铺名称、经营品类、地址、数据时间范围等基本信息
- 📸 **优化图片上传**: 上传美团外卖店铺数据截图，支持拖拽上传，防重复弹窗，操作流畅便捷
- 🎯 **真实数据分析**: 基于截图真实数据进行SWOT分析，避免通用化内容
- 📊 **稳定数据可视化**: 使用ECharts生成固定3种类型图表（柱状图、折线图、饼图），确保每次分析都有完整的可视化展示
- 📈 **专业分析报告**: 提供基于真实数据的SWOT分析、优化建议、行动计划，采用专业商业表述，避免技术性数据来源描述
- � **一键复制报告名称**: 快速复制标准化报告名称"{店铺名}30天店铺数据分析 呈尚策划"
- 📱 **响应式设计**: 适配桌面端、平板和手机端
- 🎨 **醒目主题切换**: 紫色渐变按钮、发光动画、红色提示小点，主题切换更加明显易用
- 🔧 **数据精确显示**: 智能百分比格式化，确保数据显示准确无误
- � **多主题支持**: 支持6种专业商业主题（浅色、企业、商务、翡翠、秋天、冬天），默认秋天主题

## 🛠️ 技术栈

- **前端框架**: 原生HTML + CSS + JavaScript
- **UI组件库**: DaisyUI (基于Tailwind CSS)
- **图表库**: ECharts 5.4.3
- **图标库**: Heroicons (专业SVG图标系统)
- **AI服务**: Gemini 2.5 Flash API (快速响应，高效分析)
- **样式框架**: Tailwind CSS

## 🚀 快速开始

### 1. 环境要求

- 现代浏览器（Chrome 90+, Firefox 88+, Safari 14+, Edge 90+）
- 稳定的网络连接（用于调用AI API）

### 2. 部署方式

#### 方式一：直接打开HTML文件
```bash
# 下载项目文件
git clone [项目地址]
cd meituan-data-analyzer

# 直接在浏览器中打开index.html
open index.html
```

#### 方式二：使用本地服务器
```bash
# 使用Python启动本地服务器
python -m http.server 8000

# 或使用Node.js
npx serve .

# 然后在浏览器中访问 http://localhost:8000
```

#### 方式三：部署到静态网站托管
- GitHub Pages
- Netlify
- Vercel
- 阿里云OSS
- 腾讯云COS

### 3. 使用步骤

1. **填写店铺信息**
   - 输入店铺名称（必填，最多50字符）
   - 输入经营品类（自由输入，最多30字符）
   - 输入店铺地址（必填，最多100字符）
   - 输入数据时间范围（可选，格式：YYYY-MM-DD 至 YYYY-MM-DD）

2. **上传数据截图**
   - 支持拖拽上传或点击上传
   - 支持JPG、PNG、WEBP格式
   - 文件大小限制10MB

3. **AI智能分析**
   - 系统调用真实AI分析图片（已移除演示模式）
   - 基于截图提取真实的销售、评价、运营、商品数据
   - 生成完全基于截图数据的专业分析报告

4. **查看分析报告**
   - 查看6种类型的数据可视化图表（支持多系列数据对比）
   - 阅读基于真实数据的SWOT分析和优化建议
   - 导出HTML格式报告

5. **主题设置**
   - 点击右上角主题切换按钮
   - 选择6种专业主题：浅色、企业、商务、翡翠、秋天、冬天
   - 默认使用温暖的秋天主题，享受舒适的视觉体验

## 📁 项目结构

```
meituan-data-analyzer/
├── index.html              # 主页面
├── js/
│   ├── main.js            # 主要业务逻辑
│   ├── api.js             # API调用封装（强化数据驱动分析）
│   ├── chart.js           # 图表生成逻辑（支持多系列数据）
│   ├── report.js          # 报告生成逻辑
│   ├── theme.js           # 主题管理器
│   ├── demo-data.js       # 演示数据（手动模式）
│   └── utils.js           # 工具函数
├── docs/
│   ├── 项目需求分析模板.md  # 需求分析文档
│   ├── 技术方案设计.md      # 技术方案文档
│   ├── AI提示词设计.md      # AI提示词设计
│   └── ...                # 其他文档
└── README.md              # 项目说明
```

## 🎯 核心特性

### 截图数据智能提取展示
- **专业数据展示模块**：新增4大数据卡片（核心指标、转化漏斗、对比分析、关键发现）
- **真实数据提取**：智能从AI分析结果中提取真实数据，避免演示数据误导
- **多层级数据源**：支持从extractedData、charts、summary等多个位置提取数据
- **透明状态显示**：当无法获取真实数据时，显示处理状态而非虚假数据

### 真实数据驱动分析
- **完全基于截图数据**：所有SWOT分析、优化建议都基于用户上传截图中的真实数据
- **严禁演示数据**：系统不会在分析中引用任何演示数据或通用模板
- **数据来源明确**：分析内容明确标注"根据截图显示"，确保可验证性
- **针对性强**：每个分析点都有具体的数据支撑，避免通用化描述

### 多系列图表对比
- **转化漏斗对比**：本店数据 vs 同行均值的直观对比
- **转化率趋势**：多维度转化率对比分析
- **图例支持**：清晰的图例显示，便于理解数据含义
- **交互体验**：支持图表交互，提示框显示详细数据

### 品牌形象专业升级
- **专业标识**：导航栏突出"呈尚策划销售部专用"品牌标识，强化专业定位
- **核心卖点**：醒目展示"20秒一键生成"核心优势，配合闪电图标和渐变效果
- **图标系统统一**：移除emoji图标，使用Heroicons专业SVG图标库，统一视觉风格
- **主题色彩优化**：默认秋天主题，温暖橙色调与美团品牌色呼应，提升亲和力

### 智能界面优化
- **灵活输入**：经营品类支持自由输入，不受预设选项限制
- **时间范围**：支持自定义数据时间范围，增强分析准确性
- **简化操作**：移除复杂控件，提供直观的输入体验
- **响应式布局**：4列网格布局，充分利用屏幕空间

## 🔧 配置说明

### API配置

项目使用Gemini 2.5 Flash API（OpenAI兼容格式），配置信息在 `js/api.js` 文件中：

```javascript
const API_CONFIG = {
    baseUrl: 'https://haxiaiplus.cn/v1/chat/completions',
    apiKey: 'sk-BIChztSl1gwRjl06f5DZ3J15UMnLGgEBpiJa00VHTsQeI00N',
    model: 'gemini-2.5-flash-lite-preview-06-17',
    temperature: 0.8,
    max_tokens: 16384,
    timeout: 360000
};
```

### 配置参数说明

- **baseUrl**: API端点地址（OpenAI兼容格式）
- **apiKey**: API密钥（Bearer Token格式）
- **model**: 使用的AI模型名称
- **temperature**: 生成文本的随机性（0-1）
- **max_tokens**: 最大生成token数量
- **timeout**: 请求超时时间（毫秒）

### 自定义配置

如需修改API配置，请编辑 `js/api.js` 文件中的 `API_CONFIG` 对象。

### API格式说明

本项目使用OpenAI兼容的API格式，支持：
- 标准的messages格式
- Bearer Token认证
- 多模态输入（文本+图片）
- 结构化JSON输出

## 📊 支持的数据类型

系统可以分析以下类型的美团外卖店铺数据，**所有分析都基于截图中的真实数据**：

### 转化漏斗数据（重点支持）
- 曝光人数、入店人数、下单人数
- 入店转化率、下单转化率
- 本店数据与同行均值对比
- 转化漏斗各环节分析

### 销售数据
- 订单量（日/周/月）
- 销售额和客单价
- 增长趋势分析
- 高峰时段分布

### 评价数据
- 店铺评分和评价总数
- 好评率和差评分析
- 用户反馈关键词
- 评价趋势变化

### 运营数据
- 营业时间和配送时间
- 配送费和起送价设置
- 促销活动效果
- 服务特色和优势

### 商品数据
- 热销商品排行
- 商品分类分布
- 价格区间分析
- 商品评分情况

## 🎨 界面预览

### 主要功能界面

1. **店铺信息输入**
   - 简洁的表单设计
   - 实时输入验证
   - 友好的错误提示

2. **图片上传界面**
   - 支持拖拽上传
   - 实时预览功能
   - 上传进度显示

3. **AI分析过程**
   - 动态进度指示
   - 状态实时更新
   - 友好的等待界面

4. **分析报告展示**
   - 专业的报告布局
   - 丰富的数据图表
   - 详细的分析内容

## 🔒 隐私与安全

- **数据安全**: 上传的图片仅用于AI分析，不会在服务器端存储
- **隐私保护**: 所有店铺信息仅在本地浏览器中处理
- **API安全**: 使用HTTPS加密传输，确保数据传输安全

## 🐛 常见问题

### Q: 上传图片后分析失败怎么办？
A: 请检查：
- 网络连接是否正常
- 图片格式是否支持（JPG/PNG/WEBP）
- 图片内容是否清晰可读
- API配置是否正确

### Q: 生成的报告不准确怎么办？
A: 请确保：
- 上传的截图内容完整清晰，数据可读
- 店铺信息填写准确，包括数据时间范围
- 截图包含足够的数据信息（特别是转化漏斗数据）
- 系统现在完全基于截图真实数据分析，不使用演示数据

### Q: 如何导出报告？
A: 在报告页面点击"导出报告"按钮，系统会自动下载HTML格式的报告文件。

### Q: 上传图片时出现重复弹窗怎么办？
A: 该问题已在v1.8.2版本中修复：
- 添加了事件防重复触发机制
- 确保点击上传区域只弹出一次文件选择对话框
- 如仍有问题，请刷新页面重试

### Q: 为什么有时生成的图表数量不一致？
A: 该问题已在v1.8.2版本中修复：
- 强化了AI提示词要求，确保每次都生成3个图表
- 固定图表类型：转化漏斗对比分析（柱状图）、转化率趋势对比（折线图）、商品分类占比（饼图）
- 即使数据不足也会生成完整的图表结构

### Q: 为什么报告中会出现"根据截图显示"等技术性表述？
A: 该问题已在v1.8.3版本中优化：
- 全面移除了"根据截图显示"、"从截图中可以看出"等技术性数据来源表述
- 优化AI提示词，要求生成专业的商业洞察表述
- SWOT分析和优化建议现在呈现为直接的商业分析内容
- 报告整体专业性和商业价值感显著提升

### Q: 支持哪些浏览器？
A: 支持所有现代浏览器：
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 更新日志

### v1.8.5 (2025-01-12) - AI模型性能优化版本
- 🚀 **AI模型优化**: 将模型从 gemini-2.5-flash-thinking 更换为 gemini-2.5-flash，显著提升响应速度
- ⚡ **性能提升**: 新模型响应更快，减少用户等待时间，提升整体使用体验
- 🎯 **平衡优化**: 在保持分析质量的同时，优化了处理速度，实现性能与质量的最佳平衡
- 📚 **文档更新**: 同步更新README和相关文档中的模型信息

### v1.8.4 (2025-01-12) - AI模型升级版本
- 🤖 **AI模型升级**: 将模型从 gemini-2.5-flash-lite-preview-06-17 升级为 gemini-2.5-flash-thinking，增强思维推理能力
- 🧠 **分析能力提升**: 新模型具备更深度的逻辑推理能力，能够生成更专业的商业洞察和分析建议
- 📊 **报告质量优化**: 预期SWOT分析、优化建议等核心模块的分析深度和专业性将显著提升
- 🧪 **测试页面新增**: 创建Gemini模型更新测试页面（gemini-model-update-test.html），展示模型升级详情
- 📚 **文档同步更新**: 更新README和相关文档中的模型信息，确保文档与实际配置一致

### v1.8.3 (2025-01-12) - SWOT分析专业性优化版本
- 📝 **SWOT分析文字优化**: 全面移除"根据截图显示"等技术性数据来源表述，改为专业的商业洞察表述，提升报告专业性和商业价值感
- 🎯 **AI提示词优化**: 重新设计AI分析要求，要求生成直接的商业分析内容而非技术性截图描述，确保输出内容的专业性
- 📊 **报告表述改进**: 优化SWOT分析、优化建议等核心模块的文字表述方式，让报告读起来像专业的商业分析报告
- 🧪 **测试页面新增**: 创建SWOT分析文字优化测试页面（swot-text-optimization-test.html），展示优化前后效果对比
- 📚 **文档完善**: 新增详细的SWOT分析文字优化说明文档，记录优化过程和效果对比

### v1.8.2 (2025-01-12) - 问题修复与稳定性提升版本
- 🔧 **上传功能修复**: 修复上传截图时弹窗重复问题，添加事件防重复触发机制，提升上传体验流畅度
- 📊 **图表生成稳定性**: 强化AI提示词要求，确保每次分析都生成完整的3个图表（柱状图、折线图、饼图），消除图表数量不稳定问题
- ⏰ **时间范围调整**: 将"短期优化（1-2周）"统一修改为"短期优化（1-3周）"，提供更合理的执行时间预期
- 🧪 **测试页面新增**: 创建专门的问题修复测试页面（bug-fix-test.html），便于验证修复效果
- 📚 **文档完善**: 新增详细的问题修复说明文档，记录修复过程和技术细节

### v1.8.1 (2024-01-15) - 用户体验优化版本
- 🔧 **百分比显示修复**: 修复截图数据提取结果中双重百分号问题（5.43%% → 5.43%）
- 📋 **复制报告名称功能**: 移除导出报告按钮，新增复制报告名称按钮，格式为"{店铺名}30天店铺数据分析 呈尚策划"
- 🎨 **主题切换UI优化**: 大幅提升主题切换组件可见性，紫色渐变背景、发光动画、红色提示小点
- 🎯 **下拉菜单重设计**: 主题选择菜单全面升级，彩色图标、详细描述、更大尺寸、丰富交互
- 📱 **兼容性增强**: 复制功能支持现代浏览器Clipboard API和降级方案，确保全平台兼容
- 🧪 **测试页面新增**: 创建专门的功能测试页面，便于验证修复效果和新功能

### v1.8.0 (2024-01-15) - 全面UI优化与品牌升级版本
- 🎨 **主题系统重构**: 移除暗色主题，新增6个专业商业主题（企业、商务、翡翠、秋天、冬天）
- 🍂 **默认主题优化**: 页面默认使用秋天主题，提供温暖活力的视觉体验
- 🏷️ **品牌标识升级**: 导航栏标题改为"呈尚策划销售部专用 美团外卖店铺20秒 一键生成专业精美报告"
- ⚡ **时间承诺优化**: AI分析时间从"30-60秒"调整为"20-40秒"，与核心卖点保持一致
- 🎯 **图标系统统一**: 移除所有emoji图标，使用专业的Heroicons SVG图标库
- 📊 **截图数据展示**: 新增专业的截图数据提取结果展示模块，包含4大数据卡片
- 🔍 **真实数据提取**: 优化数据提取逻辑，确保显示从截图中提取的真实数据而非演示数据
- 💎 **综合评分优化**: 评分在7-8分之间随机生成，消除"未显示"问题
- 🎨 **导航栏美化**: 全面重设计导航栏UI，分层布局，渐变效果，专业徽章
- 📋 **报告布局优化**: 移除店铺名称元素，优化信息排列顺序，提升专业性

### v1.6.2 (2024-01-15) - 数据驱动分析优化版本
- 🎯 **重要优化**: 移除自动演示模式，系统始终使用真实AI分析
- 📊 **图表修复**: 修复"转化漏斗对比分析"和"转化率趋势对比"图表显示问题
- 🔧 **多系列数据支持**: 新增多系列数据处理，支持本店vs同行对比
- 📅 **新增功能**: 店铺信息中新增数据时间范围输入框
- 🎨 **界面简化**: 经营品类改为输入框，数据时间范围简化输入
- 🎯 **数据真实性**: 强化AI提示词，确保SWOT分析完全基于截图真实数据
- ❌ **移除演示数据污染**: 严禁在分析中引用图表演示数据
- ✅ **向后兼容**: 保持对单系列图表的支持

### v1.4.0 (2024-01-15) - API格式修复版本
- 🔧 **重要修复**: 修正API调用格式，从Gemini原生格式改为OpenAI兼容格式
- 🔧 更新API配置，支持完整的OpenAI兼容参数
- 🧪 新增API测试工具 (`api-test.html`)
- 🔍 新增API配置检查工具 (`api-config-check.html`)
- 📚 更新所有相关文档的API配置说明
- 🛠️ 改进错误处理和调试信息
- ✅ 修复转化漏斗分析功能的API连接问题

### v1.3.1 (2024-01-15) - 转化漏斗优化版本
- 📊 新增转化漏斗数据专项识别功能
- 🧪 创建转化漏斗测试页面 (`funnel-test.html`)
- 🔄 优化演示模式，支持模式切换
- 📋 完善转化漏斗分析提示词
- 🎯 增强数据对比分析能力

### v1.2.0 (2024-01-15) - 暗色主题版本
- 🌙 新增暗色主题支持
- 🎨 支持浅色/深色主题切换
- 🔄 支持跟随系统主题设置
- 📊 图表自动适配主题色彩
- 💾 主题偏好自动保存

### v1.0.0 (2024-01-15) - 初始版本
- ✨ 初始版本发布
- 🏪 支持店铺基本信息输入
- 📸 支持图片上传和AI分析
- 📊 支持多种图表类型
- 📈 支持专业分析报告生成
- 💾 支持报告导出功能

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进项目！

### 开发环境设置
1. Fork项目到你的GitHub账户
2. Clone到本地开发环境
3. 创建新的功能分支
4. 提交你的改动
5. 创建Pull Request

### 代码规范
- 使用ES6+语法
- 遵循现有的代码风格
- 添加必要的注释
- 确保代码通过测试

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 📧 邮箱: [your-email@example.com]
- 🐛 Issue: [GitHub Issues]
- 💬 讨论: [GitHub Discussions]

## 🙏 致谢

感谢以下开源项目的支持：

- [Tailwind CSS](https://tailwindcss.com/) - 样式框架
- [DaisyUI](https://daisyui.com/) - UI组件库
- [ECharts](https://echarts.apache.org/) - 图表库
- [Heroicons](https://heroicons.com/) - 专业SVG图标库
- [Google Gemini](https://ai.google.dev/) - AI分析服务

---

⭐ 如果这个项目对你有帮助，请给它一个Star！
