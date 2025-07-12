// API调用封装

/**
 * Gemini API配置
 */
const API_CONFIG = {
    baseUrl: 'https://haxiaiplus.cn/v1/chat/completions',
    apiKey: 'sk-BIChztSl1gwRjl06f5DZ3J15UMnLGgEBpiJa00VHTsQeI00N',
    model: 'gemini-2.5-flash-lite-preview-06-17',
    temperature: 0.8,
    max_tokens: 16384,
    timeout: 360000
};

/**
 * Gemini API客户端
 */
class GeminiAPI {
    constructor(config = API_CONFIG) {
        this.baseUrl = config.baseUrl;
        this.apiKey = config.apiKey;
        this.model = config.model;
        this.temperature = config.temperature || 0.8;
        this.max_tokens = config.max_tokens || 16384;
        this.timeout = config.timeout || 360000;
    }

    /**
     * 构建分析提示词
     * @param {Object} storeInfo - 店铺信息
     * @returns {string} 提示词
     */
    buildAnalysisPrompt(storeInfo) {
        return `你是一位资深的美团外卖运营专家，拥有丰富的餐饮行业经验和数据分析能力。

## 🚨 关键说明：数据来源区分
1. **截图数据**：用户上传的截图中的真实数据 → 这是你分析的唯一依据
2. **图表数据**：系统将生成的演示数据 → 严禁在文字分析中引用

## 重要提醒：仅基于截图中的实际数据进行分析
请仔细观察并提取截图中显示的所有具体数据，包括但不限于：数值、百分比、趋势、排名、评分等。
⚠️ 所有文字分析内容（SWOT、建议、洞察）必须且仅能基于截图中的真实数据，严禁引用任何图表中的演示数据。

## 店铺基本信息
店铺名称：${storeInfo.name}
经营品类：${storeInfo.category}
店铺地址：${storeInfo.address}
数据时间范围：${storeInfo.dateRange}

## 数据提取要求
**第一步：仔细观察截图，逐一提取所有可见的具体数据**

### 必须提取的关键数据（如果截图中可见）：

#### 1. 转化漏斗数据（如果是转化漏斗图）
- **左侧黄色区域**（本店数据）：
  - 入店转化率：X.XX%（必须是截图中的确切数值）
  - 下单转化率：X.XX%（必须是截图中的确切数值）
  - 曝光人数：X,XXX人（必须是截图中的确切数值）
  - 入店人数：X,XXX人（必须是截图中的确切数值）
  - 下单人数：XXX人（必须是截图中的确切数值）
- **右侧蓝色区域**（同行均值）：
  - 同行曝光人数、入店人数、下单人数
  - 同行入店转化率、下单转化率

#### 2. 销售数据（如果截图中可见）
- 日订单量：XXX单（必须是截图显示的确切数字）
- 月订单量：XXX单
- 营业额：XXX元
- 客单价：XX元
- 销售趋势：上升/下降/稳定（基于截图中的趋势图或数据）

#### 3. 评价数据（如果截图中可见）
- 店铺评分：X.X分（必须是截图显示的确切分数）
- 评价总数：XXX条
- 好评率：XX%
- 差评关键词：[从截图中提取的具体差评内容]

#### 4. 运营数据（如果截图中可见）
- 配送时间：XX分钟
- 配送费：X元
- 起送价：XX元
- 营业时间：XX:XX-XX:XX
- 促销活动：[截图中显示的具体活动]

#### 5. 商品数据（如果截图中可见）
- 热销商品名称和销量（必须是截图中的具体商品）
- 商品价格区间
- 商品分类和数量

**第二步：基于提取的真实数据进行专业分析**

### 分析原则：
1. **数据驱动**：所有分析结论必须基于截图中的具体数据
2. **精确引用**：在分析中明确引用截图中的具体数值
3. **对比分析**：将本店数据与同行数据进行具体对比
4. **问题识别**：基于真实数据识别具体的问题和机会点
5. **避免通用**：避免使用通用的、不基于数据的分析内容

### 分析要求：
- 在SWOT分析中，必须引用截图中的具体数据作为依据
- 在优化建议中，必须针对截图显示的具体问题提出解决方案
- 在趋势分析中，必须基于截图中的实际趋势数据
- 避免使用"一般来说"、"通常情况下"等通用表述
- 每个分析点都要有具体的数据支撑

### 🚨 SWOT分析特别要求：
**严禁使用以下演示数据**：
- 店铺评分4.3分
- 日订单量156单
- 配送时间35分钟
- 客单价30元
- 任何其他非截图来源的数据

**必须使用截图真实数据**：
- 所有数值必须从截图中提取
- 每个分析点都要标明"根据截图显示"
- 如果截图中没有某项数据，不得编造或使用演示数据
- 优势劣势必须基于截图中的实际表现

## 输出格式要求
请严格按照以下JSON格式输出分析结果：

{
  "extractedData": {
    "conversionFunnel": {
      "dataPeriod": "30天",
      "storeData": {
        "exposure": "曝光人数",
        "visits": "入店人数",
        "orders": "下单人数",
        "visitRate": "入店转化率(%)",
        "orderRate": "下单转化率(%)"
      },
      "industryAverage": {
        "exposure": "同行曝光人数",
        "visits": "同行入店人数",
        "orders": "同行下单人数",
        "visitRate": "同行入店转化率(%)",
        "orderRate": "同行下单转化率(%)"
      },
      "comparison": {
        "exposureGap": "曝光差距分析",
        "conversionGap": "转化率差距分析",
        "competitivePosition": "竞争地位评估"
      }
    },
    "sales": {
      "dailyOrders": "数值或'未显示'",
      "revenue": "数值或'未显示'",
      "avgOrderValue": "数值或'未显示'",
      "peakHours": ["时间段"],
      "trends": "增长/下降/稳定"
    },
    "ratings": {
      "score": "评分数值",
      "totalReviews": "评价总数",
      "positiveRate": "好评率百分比",
      "recentTrend": "上升/下降/稳定",
      "commonComplaints": ["差评关键词"]
    },
    "operations": {
      "businessHours": "营业时间",
      "deliveryTime": "配送时间",
      "deliveryFee": "配送费",
      "promotions": ["活动信息"],
      "serviceFeatures": ["服务特色"]
    },
    "products": {
      "topSelling": [
        {
          "name": "商品名称",
          "price": "价格",
          "sales": "销量",
          "rating": "评分"
        }
      ],
      "categories": ["分类列表"],
      "priceRange": {
        "min": "最低价",
        "max": "最高价",
        "avg": "平均价"
      }
    }
  },
  "analysis": {
    "strengths": [
      "必须基于截图中提取的真实数据进行分析，例如：'根据截图显示，本店转化率为[从截图提取的具体数值]%，高于同行均值[从截图提取的具体数值]%'",
      "必须引用截图中的确切数值，禁止使用4.3分、156单、35分钟、30元等演示数据",
      "每个优势点都必须有截图中的具体数据支撑，如果截图中没有相关数据则不能提及"
    ],
    "weaknesses": [
      "必须基于截图中发现的真实问题进行分析，例如：'截图显示本店下单转化率为[从截图提取的具体数值]%，低于同行[从截图提取的具体数值]%'",
      "严禁使用配送时间35分钟、客单价30元等演示数据，必须使用截图中的真实数据",
      "每个劣势点都必须基于截图中的实际数据，不得使用假设或演示数据"
    ],
    "opportunities": [
      "必须基于截图中显示的数据差距和改进空间进行分析",
      "严禁使用通用的机会描述，必须针对截图中的具体数据情况",
      "每个机会点都要基于截图中的真实数据支撑，如转化率差距、同行对比等"
    ],
    "threats": [
      "必须基于截图中与同行对比的真实劣势数据进行分析",
      "严禁使用通用的威胁描述，必须基于截图显示的具体风险点",
      "每个威胁点都要有截图中的数据依据，如竞争对手表现更好的具体指标"
    ],
    "recommendations": [
      {
        "category": "必须基于截图数据的具体问题",
        "suggestion": "必须针对截图中发现的具体问题提出解决方案，如：'针对X.X%的低转化率，建议优化商品展示页面'",
        "priority": "必须基于问题的严重程度确定优先级",
        "expectedImpact": "必须基于数据差距预估具体的改进效果，如：'预期转化率提升至X.X%'",
        "implementationSteps": ["必须是针对具体问题的可执行步骤", "步骤必须具体可操作", "必须有明确的执行标准"]
      },
      {
        "category": "必须基于截图显示的数据差距",
        "suggestion": "必须针对与同行的具体差距提出改进建议",
        "priority": "必须基于数据影响程度确定",
        "expectedImpact": "必须量化预期改进效果",
        "implementationSteps": ["具体的执行步骤", "可衡量的执行标准", "明确的时间节点"]
      },
      {
        "category": "必须基于截图中的实际表现",
        "suggestion": "必须针对截图显示的具体运营状况提出优化建议",
        "priority": "必须基于实际数据确定",
        "expectedImpact": "必须基于现状预估改进空间",
        "implementationSteps": ["针对性的改进措施", "具体的执行方案", "可验证的成果标准"]
      },
      {
        "category": "服务质量提升",
        "suggestion": "配送优化、评价管理、客户服务等建议",
        "priority": "高/中/低",
        "expectedImpact": "预期效果",
        "implementationSteps": ["步骤1", "步骤2", "步骤3"]
      },
      {
        "category": "数据运营优化",
        "suggestion": "转化率提升、流量优化、数据分析等建议",
        "priority": "高/中/低",
        "expectedImpact": "预期效果",
        "implementationSteps": ["步骤1", "步骤2", "步骤3"]
      }
    ],
    "insights": [
      "必须基于截图中的具体数据得出的深度洞察，如：'从X.X%的转化率数据可以看出...'",
      "必须结合截图显示的实际情况进行行业对比分析",
      "必须基于截图中与同行的数据差距提出竞争策略洞察"
    ]
  },
  "charts": [
    {
      "type": "bar",
      "title": "转化漏斗对比分析",
      "description": "本店与同行转化数据对比（注：图表使用演示数据，仅供展示效果）",
      "data": {
        "categories": ["曝光人数", "入店人数", "下单人数"],
        "series": [
          {"name": "本店数据", "values": [40047, 2173, 132]},
          {"name": "同行均值", "values": [10833, 670, 98]}
        ],
        "unit": "人"
      }
    },
    {
      "type": "line",
      "title": "转化率趋势对比",
      "description": "本店与同行转化率对比",
      "data": {
        "categories": ["入店转化率", "下单转化率"],
        "series": [
          {"name": "本店转化率", "values": [5.43, 6.07]},
          {"name": "同行均值", "values": [6.18, 14.63]}
        ],
        "unit": "%"
      }
    },
    {
      "type": "pie",
      "title": "商品分类占比",
      "description": "展示不同商品分类的销售占比",
      "data": {
        "items": [
          {"name": "主食", "value": 45, "unit": "%"},
          {"name": "饮品", "value": 25, "unit": "%"},
          {"name": "小食", "value": 20, "unit": "%"},
          {"name": "其他", "value": 10, "unit": "%"}
        ]
      }
    }
  ],
  "summary": {
    "overallScore": "综合评分（1-10分）",
    "keyFindings": ["关键发现1", "关键发现2", "关键发现3"],
    "actionPlan": [
      {
        "phase": "立即执行（1-3天）",
        "category": "紧急优化",
        "actions": ["优化店铺基础信息", "调整核心菜品价格", "设置基础满减活动"],
        "expectedResults": "提升基础转化率2-5%"
      },
      {
        "phase": "短期优化（1-2周）",
        "category": "运营提升",
        "actions": ["完善店铺视觉设计", "优化菜品分类导航", "建立评价回复机制", "设计精准营销券"],
        "expectedResults": "提升整体评分0.2-0.3分，转化率提升5-10%"
      },
      {
        "phase": "中期发展（1-3个月）",
        "category": "系统优化",
        "actions": ["建立数据分析体系", "开发新品和套餐", "优化配送体验", "建立品牌故事"],
        "expectedResults": "实现稳定增长，月销量提升20-30%"
      },
      {
        "phase": "长期规划（3-6个月）",
        "category": "品牌建设",
        "actions": ["打造差异化竞争优势", "建立客户忠诚度体系", "扩大市场影响力"],
        "expectedResults": "建立品牌护城河，实现可持续增长"
      }
    ],
    "priorityActions": [
      "立即优化转化率最低的环节",
      "重点提升配送准时率至90%以上",
      "建立标准化的评价回复流程",
      "设计阶梯式优惠券策略",
      "优化高利润商品的曝光位置"
    ]
  }
}

## 🚨 重要提醒：数据来源区分和分析要求

### 数据来源明确区分：
1. **截图数据**：从用户上传的截图中提取的真实数据（这是分析的唯一依据）
2. **图表数据**：系统生成的演示数据（仅用于图表展示，不得在文字分析中引用）

### 必须遵循的分析原则：
1. **仅使用截图数据**：所有文字分析内容（SWOT、建议、洞察）必须且仅能基于截图中的实际数据
2. **禁止引用图表数据**：不得在文字分析中引用任何图表中的演示数据
3. **具体数值引用**：在分析中必须明确引用截图中的具体数值，如"根据截图显示的转化率X.X%"
4. **对比分析**：必须将截图中的本店数据与截图中显示的同行数据进行对比
5. **问题针对性**：发现的问题必须基于截图显示的实际情况

### 严格禁止的分析方式：
- ❌ 引用图表中的任何演示数据（如40047、2173、132等演示数值）
- ❌ 使用"图表显示"、"从图表可以看出"等表述
- ❌ 将图表数据与截图数据混合使用
- ❌ 使用"一般来说"、"通常情况下"等通用表述
- ❌ 提供与截图数据无关的通用建议

### 要求的分析方式：
- ✅ "根据截图显示，本店转化率为X.X%，低于同行均值X.X%"
- ✅ "从截图数据可以看出，曝光量达到X万人，但转化效果有待提升"
- ✅ "针对截图中显示的X.X%转化率问题，建议..."
- ✅ "基于截图中与同行X.X%的差距，优先改进..."
- ✅ 如果截图中某项数据不可见，必须标注"截图中未显示此数据"

## 专业分析要求
1. **数据驱动决策**：基于截图中可见的具体数据进行分析，对未显示的数据项标注"未显示"
2. **精确数值引用**：在分析中必须引用截图中的确切数值，不得使用估算或假设数据
3. **可操作性建议**：每条建议都要针对截图中的具体问题，包含实施步骤和预期效果
4. **ROI导向**：重点关注截图数据显示的最需要改进的环节
5. **竞争分析**：基于截图中的同行对比数据进行差异化策略分析
6. **用户体验**：从顾客角度分析购买决策路径和体验痛点
7. **季节性因素**：考虑时间、节日、天气等外部因素影响
8. **合规经营**：确保所有建议符合平台规则和政策要求

## 重点关注指标
- **转化漏斗核心分析**：
  - 曝光量→入店率→下单转化率的完整转化路径
  - 本店与同行转化率对比分析（重点关注差距原因）
  - 转化率优化的关键节点识别
- 配送准时率和服务评分的提升空间
- 客单价和复购率的优化潜力
- 付费推广的ROI和获客成本
- 差评率和问题解决效率

## 转化漏斗数据分析重点
当识别到转化漏斗图时，请特别关注：
1. **转化率差距分析**：对比本店与同行的入店转化率和下单转化率差距
2. **流量质量评估**：分析曝光量与最终转化的关系
3. **优化优先级**：基于数据差距确定最需要优化的环节
4. **竞争地位判断**：评估店铺在同行中的竞争力水平

请基于美团外卖专业运营流程，提供系统性的店铺优化方案。

## 🔴 最终提醒：数据引用规则
1. **文字分析部分**（SWOT、建议、洞察）：仅能引用截图中的真实数据
2. **图表数据部分**：使用演示数据，不得在文字分析中引用
3. **严格区分**：绝不能将图表演示数据与截图真实数据混合使用
4. **标注原则**：如果截图中某项数据不可见，必须标注"截图中未显示"

记住：你的专业分析价值在于基于用户真实数据提供针对性建议，而不是基于演示数据的通用分析。`;
    }

    /**
     * 分析图片
     * @param {string} imageBase64 - Base64编码的图片
     * @param {Object} storeInfo - 店铺信息
     * @returns {Promise<Object>} 分析结果
     */
    async analyzeImage(imageBase64, storeInfo) {
        try {
            const prompt = this.buildAnalysisPrompt(storeInfo);

            // 构建OpenAI兼容格式的请求体
            const requestBody = {
                model: this.model,
                messages: [
                    {
                        role: "system",
                        content: prompt
                    },
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: "请分析这张美团外卖店铺数据截图，按照要求提供详细的分析报告。"
                            },
                            {
                                type: "image_url",
                                image_url: {
                                    url: imageBase64
                                }
                            }
                        ]
                    }
                ],
                temperature: this.temperature || 0.8,
                max_tokens: this.max_tokens || 16384
            };

            console.log('发送API请求...');
            console.log('请求配置:', {
                url: this.baseUrl,
                model: this.model,
                temperature: this.temperature || 0.8,
                max_tokens: this.max_tokens || 16384
            });

            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API请求失败: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const result = await response.json();
            console.log('API响应:', result);

            // 解析OpenAI格式的响应数据
            if (result.choices && result.choices.length > 0) {
                const choice = result.choices[0];
                const content = choice.message?.content || choice.text;

                if (content) {
                    // 尝试解析JSON
                    try {
                        // 提取JSON部分（可能包含在```json```代码块中）
                        const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) ||
                                        content.match(/\{[\s\S]*\}/);

                        if (jsonMatch) {
                            const jsonStr = jsonMatch[1] || jsonMatch[0];
                            return JSON.parse(jsonStr);
                        } else {
                            // 如果没有找到JSON格式，返回原始文本
                            return {
                                error: 'JSON格式解析失败',
                                rawText: content
                            };
                        }
                    } catch (parseError) {
                        console.error('JSON解析错误:', parseError);
                        return {
                            error: 'JSON格式解析失败',
                            rawText: content,
                            parseError: parseError.message
                        };
                    }
                } else {
                    throw new Error('API响应格式异常：缺少内容部分');
                }
            } else {
                throw new Error('API响应格式异常：缺少choices字段');
            }

        } catch (error) {
            console.error('API调用失败:', error);
            throw error;
        }
    }

    /**
     * 测试API连接
     * @returns {Promise<Object>} 连接测试结果
     */
    async testConnection() {
        const result = {
            success: false,
            error: null,
            details: {},
            suggestions: []
        };

        try {
            console.log('开始API连接测试...');
            console.log('API配置:', {
                baseUrl: this.baseUrl,
                model: this.model,
                apiKey: this.apiKey ? `${this.apiKey.substring(0, 10)}...` : '未配置'
            });

            const testPrompt = "请回复'连接成功'";

            const requestBody = {
                model: this.model,
                messages: [
                    {
                        role: "user",
                        content: testPrompt
                    }
                ],
                temperature: 0.1,
                max_tokens: 100
            };

            console.log('请求URL:', this.baseUrl);

            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify(requestBody)
            });

            result.details.status = response.status;
            result.details.statusText = response.statusText;

            if (response.ok) {
                const data = await response.json();
                console.log('API响应成功:', data);
                result.success = true;
                result.details.response = data;
            } else {
                const errorText = await response.text();
                console.error('API响应错误:', response.status, errorText);
                result.error = `HTTP ${response.status}: ${response.statusText}`;
                result.details.errorResponse = errorText;

                // 根据错误状态码提供建议
                if (response.status === 401) {
                    result.suggestions.push('API密钥可能无效，请检查配置');
                } else if (response.status === 403) {
                    result.suggestions.push('API访问被拒绝，请检查权限设置');
                } else if (response.status === 404) {
                    result.suggestions.push('API端点不存在，请检查URL配置');
                } else if (response.status >= 500) {
                    result.suggestions.push('API服务器错误，请稍后重试');
                }
            }

        } catch (error) {
            console.error('API连接测试异常:', error);
            result.error = error.message;

            // 根据错误类型提供建议
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                result.suggestions.push('网络连接问题，请检查网络设置');
                result.suggestions.push('可能存在CORS跨域问题');
            } else if (error.name === 'AbortError') {
                result.suggestions.push('请求超时，请检查网络连接');
            }
        }

        return result;
    }
}

// 创建全局API实例
const geminiAPI = new GeminiAPI();

// 导出API实例（如果使用模块系统）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GeminiAPI, geminiAPI };
}
