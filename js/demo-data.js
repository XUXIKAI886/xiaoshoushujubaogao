// 演示数据 - 用于测试和演示

/**
 * 转化漏斗演示数据
 */
const CONVERSION_FUNNEL_DEMO = {
    "extractedData": {
        "conversionFunnel": {
            "dataPeriod": "30天",
            "storeData": {
                "exposure": "40,047人",
                "visits": "2,173人",
                "orders": "132人",
                "visitRate": "5.43%",
                "orderRate": "6.07%"
            },
            "industryAverage": {
                "exposure": "10,833人",
                "visits": "670人",
                "orders": "98人",
                "visitRate": "6.18%",
                "orderRate": "14.63%"
            },
            "comparison": {
                "exposureGap": "本店曝光量是同行的3.7倍，流量获取能力强",
                "conversionGap": "入店转化率略低于同行0.75%，下单转化率低于同行8.56%",
                "competitivePosition": "流量获取优势明显，但转化效率有待提升"
            }
        },
        "sales": {
            "dailyOrders": "132",
            "revenue": "未显示",
            "avgOrderValue": "未显示",
            "peakHours": ["11:30-13:30", "17:30-20:30"],
            "trends": "稳定"
        },
        "ratings": {
            "score": "未显示",
            "totalReviews": "未显示",
            "positiveRate": "未显示",
            "recentTrend": "稳定",
            "commonComplaints": []
        },
        "operations": {
            "businessHours": "未显示",
            "deliveryTime": "未显示",
            "deliveryFee": "未显示",
            "promotions": [],
            "serviceFeatures": []
        },
        "products": {
            "topSelling": [],
            "categories": [],
            "priceRange": {
                "min": "未显示",
                "max": "未显示",
                "avg": "未显示"
            }
        }
    },
    "analysis": {
        "strengths": [
            "曝光量表现优异，是同行均值的3.7倍，说明店铺在平台上的展示机会很多",
            "流量获取能力强，具备良好的基础流量优势",
            "30天内获得了40,047次曝光，流量基础扎实"
        ],
        "weaknesses": [
            "入店转化率5.43%低于同行均值6.18%，存在0.75%的差距",
            "下单转化率6.07%远低于同行均值14.63%，差距达8.56%",
            "虽然曝光量大，但最终转化效率不高，存在流量浪费"
        ],
        "opportunities": [
            "优化店铺首页设计和商品展示，提升入店转化率",
            "改善商品定价策略和促销活动，提升下单转化率",
            "利用现有的高曝光优势，通过精细化运营提升整体转化效果"
        ],
        "threats": [
            "转化率持续低于同行可能影响平台权重",
            "竞争对手转化效率更高，可能抢夺市场份额"
        ],
        "recommendations": [
            {
                "category": "转化率优化",
                "suggestion": "重点优化下单转化率，通过商品优化、定价策略、促销活动等手段提升转化效果",
                "priority": "高",
                "expectedImpact": "预期下单转化率提升5-8%",
                "implementationSteps": ["分析转化路径", "优化商品展示", "设计促销策略"]
            }
        ],
        "insights": [
            "店铺具备优秀的流量获取能力，但转化环节存在明显短板",
            "重点应放在提升转化率而非继续增加曝光量"
        ]
    },
    "charts": [
        {
            "type": "bar",
            "title": "转化漏斗对比分析",
            "description": "本店与同行转化数据对比",
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
        }
    ],
    "summary": {
        "overallScore": "6.5",
        "keyFindings": [
            "流量获取能力优秀，曝光量是同行3.7倍",
            "转化率明显低于同行，特别是下单转化率",
            "存在巨大的转化优化空间和潜力"
        ],
        "actionPlan": [
            {
                "phase": "立即执行（1-3天）",
                "category": "紧急优化",
                "actions": ["优化店铺首页设计", "调整核心商品价格", "设置基础满减活动"],
                "expectedResults": "提升下单转化率2-3%"
            }
        ],
        "priorityActions": [
            "立即优化下单转化率最低的环节",
            "重点提升商品吸引力和性价比"
        ]
    }
};

/**
 * 模拟AI分析结果数据
 */
const DEMO_ANALYSIS_DATA = {
    "storeInfo": {
        "name": "川香小厨",
        "category": "川湘菜",
        "address": "北京市朝阳区建国路88号",
        "dateRange": "2025-06-12 至 2025-07-11"
    },
    "extractedData": {
        "sales": {
            "dailyOrders": "156",
            "revenue": "4,680",
            "avgOrderValue": "30",
            "peakHours": ["11:30-13:00", "17:30-19:30"],
            "trends": "增长"
        },
        "ratings": {
            "score": "4.3",
            "totalReviews": "2,847",
            "positiveRate": "92%",
            "recentTrend": "上升",
            "commonComplaints": ["配送慢", "包装问题"]
        },
        "operations": {
            "businessHours": "09:00-22:00",
            "deliveryTime": "35分钟",
            "deliveryFee": "3元",
            "promotions": ["满30减5", "新用户立减10元"],
            "serviceFeatures": ["无接触配送", "准时达"]
        },
        "products": {
            "topSelling": [
                {
                    "name": "招牌炸鸡套餐",
                    "price": "32",
                    "sales": "89",
                    "rating": "4.5"
                },
                {
                    "name": "香辣鸡腿堡",
                    "price": "18",
                    "sales": "67",
                    "rating": "4.2"
                },
                {
                    "name": "薯条(大)",
                    "price": "12",
                    "sales": "134",
                    "rating": "4.1"
                }
            ],
            "categories": ["主食", "小食", "饮品", "甜品"],
            "priceRange": {
                "min": "8",
                "max": "45",
                "avg": "24"
            }
        }
    },
    "analysis": {
        "strengths": [
            "根据截图显示，本店入店转化率为5.43%，高于同行均值4.18%",
            "截图数据表明，曝光量达到40,047人，显示良好的市场表现",
            "从截图可以看出，入店人数为2,173人，转化基础稳定",
            "截图显示本店在曝光转化方面表现优于同行平均水平",
            "基于截图分析，店铺获得了较好的流量基础"
        ],
        "weaknesses": [
            "根据截图显示，下单转化率仅为6.07%，低于同行均值14.63%",
            "截图数据表明，从入店到下单的转化存在明显短板",
            "从截图可以看出，下单人数仅132人，转化效率有待提升",
            "基于截图分析，本店在下单转化环节明显落后于同行",
            "截图数据显示，转化漏斗在下单环节存在较大流失"
        ],
        "opportunities": [
            "基于截图显示的6.07%下单转化率，有巨大提升空间至同行14.63%水平",
            "截图数据表明曝光量充足，重点优化下单转化可快速提升业绩",
            "从截图可以看出，入店转化率已超同行，可复制成功经验到下单环节",
            "根据截图分析，与同行8.56%的转化率差距就是最大的增长机会",
            "截图显示的流量基础良好，优化商品页面和促销策略潜力巨大"
        ],
        "threats": [
            "基于截图数据，下单转化率大幅落后同行可能导致竞争劣势",
            "截图显示同行在转化效率上的领先优势可能进一步扩大",
            "从截图可以看出，如不及时改善转化率将面临市场份额流失",
            "根据截图分析，同行转化率是本店的2.4倍，竞争压力巨大",
            "截图数据反映的转化差距可能影响长期盈利能力"
        ],
        "recommendations": [
            {
                "category": "店铺基础优化",
                "suggestion": "完善店铺视觉形象，统一设计店招、轮播图、菜品图，打造专业品牌形象",
                "priority": "高",
                "expectedImpact": "提升店铺点击率15-20%，增强品牌记忆度",
                "implementationSteps": [
                    "设计统一风格的店铺视觉系统",
                    "制作高清菜品图片和动图",
                    "优化店铺介绍和品牌故事",
                    "上传视频店招提升曝光率"
                ]
            },
            {
                "category": "商品结构优化",
                "suggestion": "优化菜品分类导航，推出35-50元精品套餐，调整商品定价策略",
                "priority": "高",
                "expectedImpact": "客单价提升至35-40元，利润率增加15-20%",
                "implementationSteps": [
                    "重新规划菜品分类，热销品类前置",
                    "设计3-5款高价值套餐组合",
                    "优化菜品描述，突出特色卖点",
                    "调整定价策略，提升利润空间"
                ]
            },
            {
                "category": "营销推广策略",
                "suggestion": "建立精准营销体系，设计阶梯式优惠券，优化付费推广ROI",
                "priority": "中",
                "expectedImpact": "新客获取成本降低20%，复购率提升25%",
                "implementationSteps": [
                    "设计差异化优惠券策略（新客券、复购券、满减券）",
                    "优化推广时段和区域投放",
                    "建立客户分群营销机制",
                    "设置限时特惠和新品推广活动"
                ]
            },
            {
                "category": "服务质量提升",
                "suggestion": "优化配送体验，建立标准化评价回复机制，提升服务评分",
                "priority": "高",
                "expectedImpact": "配送准时率达90%以上，服务评分提升0.3分",
                "implementationSteps": [
                    "优化配送路线，控制配送时间在25分钟内",
                    "改进包装材料，确保食品完整性",
                    "建立24小时评价回复制度",
                    "设置差评处理和客户回访机制"
                ]
            },
            {
                "category": "数据运营优化",
                "suggestion": "建立数据驱动的运营体系，提升转化率至25%-30%区间",
                "priority": "中",
                "expectedImpact": "整体转化率提升5-10%，月销量增长20-30%",
                "implementationSteps": [
                    "建立核心指标监控看板",
                    "分析转化漏斗，优化关键节点",
                    "定期进行竞品对标分析",
                    "建立数据周报和月度复盘机制"
                ]
            }
        ],
        "insights": [
            "店铺基础运营数据良好，但在视觉营销和品牌建设方面有较大提升空间",
            "配送时效是影响用户体验的关键因素，需要重点优化配送准时率至90%以上",
            "商品结构偏向中低价位，通过套餐组合和新品开发可有效提升客单价",
            "营销策略相对单一，建立精准营销体系可显著提升获客效率和复购率",
            "评价管理需要标准化，通过专业回复和问题解决可提升整体评分",
            "数据运营意识需要加强，建立数据驱动的决策机制是长期发展的关键"
        ]
    },
    "charts": [
        {
            "type": "bar",
            "title": "热销商品销量对比",
            "description": "展示店铺热销商品的销量情况",
            "data": {
                "categories": ["薯条(大)", "招牌炸鸡套餐", "香辣鸡腿堡", "可乐(中)", "鸡米花"],
                "values": [134, 89, 67, 45, 38],
                "unit": "份"
            }
        },
        {
            "type": "line",
            "title": "近7天订单趋势",
            "description": "显示最近一周的订单量变化趋势",
            "data": {
                "dates": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
                "values": [142, 138, 156, 149, 167, 189, 178],
                "unit": "单"
            }
        },
        {
            "type": "pie",
            "title": "商品分类销售占比",
            "description": "展示不同商品分类的销售占比",
            "data": {
                "items": [
                    {"name": "主食", "value": 45, "unit": "%"},
                    {"name": "小食", "value": 28, "unit": "%"},
                    {"name": "饮品", "value": 18, "unit": "%"},
                    {"name": "甜品", "value": 9, "unit": "%"}
                ]
            }
        },
        {
            "type": "radar",
            "title": "店铺综合评估",
            "description": "多维度评估店铺表现",
            "data": {
                "indicators": [
                    {"name": "商品质量", "max": 5},
                    {"name": "服务态度", "max": 5},
                    {"name": "配送速度", "max": 5},
                    {"name": "价格合理", "max": 5},
                    {"name": "包装质量", "max": 5}
                ],
                "values": [4.3, 4.1, 3.2, 4.0, 3.5]
            }
        },
        {
            "type": "gauge",
            "title": "客户满意度",
            "description": "基于评分和评价的综合满意度",
            "data": {
                "value": 8.6,
                "max": 10
            }
        },
        {
            "type": "bar",
            "title": "时段订单分布",
            "description": "展示不同时段的订单量分布情况",
            "data": {
                "categories": ["09:00-11:00", "11:00-13:00", "13:00-15:00", "15:00-17:00", "17:00-19:00", "19:00-21:00", "21:00-22:00"],
                "values": [12, 45, 23, 18, 38, 28, 8],
                "unit": "单"
            }
        }
    ],
    "summary": {
        "overallScore": "7.8",
        "keyFindings": [
            "店铺基础运营数据良好，但转化率仍有提升空间，目标达到25%-30%",
            "配送时效是核心痛点，需要优化至90%准时率以提升服务评分",
            "商品结构和定价策略需要优化，通过套餐组合提升客单价至35-40元",
            "营销策略相对单一，建立精准营销体系可提升获客效率和复购率"
        ],
        "actionPlan": [
            {
                "phase": "立即执行（1-3天）",
                "category": "紧急优化",
                "actions": [
                    "调整核心菜品在首屏的展示位置",
                    "设置基础满减活动（满30减5，满50减12）",
                    "优化店铺基础信息和营业时间设置"
                ],
                "expectedResults": "提升基础转化率2-5%"
            },
            {
                "phase": "短期优化（1-2周）",
                "category": "运营提升",
                "actions": [
                    "完善店铺视觉设计，统一品牌形象",
                    "优化菜品分类导航，热销品类前置",
                    "建立24小时评价回复机制",
                    "设计新客券和复购券策略",
                    "优化配送路线，提升准时率"
                ],
                "expectedResults": "整体评分提升0.2-0.3分，转化率提升5-10%"
            },
            {
                "phase": "中期发展（1-3个月）",
                "category": "系统优化",
                "actions": [
                    "建立数据分析和监控体系",
                    "开发3-5款高价值套餐组合",
                    "建立精准营销和客户分群机制",
                    "优化付费推广策略和ROI",
                    "建立品牌故事和差异化定位"
                ],
                "expectedResults": "月销量提升20-30%，客单价达到35-40元"
            },
            {
                "phase": "长期规划（3-6个月）",
                "category": "品牌建设",
                "actions": [
                    "打造差异化竞争优势和品牌护城河",
                    "建立客户忠诚度和会员体系",
                    "扩大市场影响力和品牌知名度",
                    "建立可持续的运营和盈利模式"
                ],
                "expectedResults": "建立稳定的竞争优势，实现可持续增长"
            }
        ],
        "priorityActions": [
            "立即优化首屏菜品展示，提升转化率",
            "重点提升配送准时率至90%以上",
            "建立标准化的评价回复和问题处理流程",
            "设计阶梯式优惠券策略，提升客单价",
            "优化高利润商品的曝光位置和推广策略"
        ]
    }
};

/**
 * 模拟店铺信息
 */
const DEMO_STORE_INFO = {
    name: "老王炸鸡店",
    category: "西式快餐",
    address: "北京市朝阳区三里屯街道工体北路"
};

/**
 * 启用演示模式
 * 在开发和测试时使用模拟数据
 */
function enableDemoMode() {
    // 重写API调用函数
    if (typeof geminiAPI !== 'undefined') {
        geminiAPI.analyzeImage = async function(imageBase64, storeInfo) {
            // 模拟API调用延迟
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // 返回模拟数据
            return DEMO_ANALYSIS_DATA;
        };
        
        geminiAPI.testConnection = async function() {
            await new Promise(resolve => setTimeout(resolve, 500));
            return true;
        };
    }
    
    console.log('演示模式已启用，将使用模拟数据');
}

/**
 * 快速填充演示数据
 */
function fillDemoData() {
    const storeNameInput = document.getElementById('storeName');
    const storeCategorySelect = document.getElementById('storeCategory');
    const storeAddressInput = document.getElementById('storeAddress');
    
    if (storeNameInput) storeNameInput.value = DEMO_STORE_INFO.name;
    if (storeCategorySelect) storeCategorySelect.value = DEMO_STORE_INFO.category;
    if (storeAddressInput) storeAddressInput.value = DEMO_STORE_INFO.address;
    
    showToast('演示数据已填充', 'info');
}

/**
 * 生成演示报告
 */
function generateDemoReport() {
    if (typeof reportGenerator !== 'undefined') {
        console.log('演示数据图表数量:', DEMO_ANALYSIS_DATA.charts.length);
        console.log('演示数据图表列表:', DEMO_ANALYSIS_DATA.charts.map(c => `${c.title} (${c.type})`));

        reportGenerator.generateReport(DEMO_ANALYSIS_DATA, DEMO_STORE_INFO);

        // 切换到报告页面
        if (typeof app !== 'undefined') {
            app.goToStep('report');
        }

        showToast(`演示报告已生成，包含 ${DEMO_ANALYSIS_DATA.charts.length} 个图表`, 'success');
    }
}

/**
 * 验证图表数据
 */
function validateChartData() {
    const charts = DEMO_ANALYSIS_DATA.charts;
    console.log('=== 图表数据验证 ===');
    console.log(`总图表数量: ${charts.length}`);

    charts.forEach((chart, index) => {
        console.log(`图表 ${index + 1}:`, {
            title: chart.title,
            type: chart.type,
            hasData: !!chart.data,
            dataKeys: Object.keys(chart.data || {})
        });
    });

    return charts.length;
}

// 演示模式已移除，系统将始终使用真实AI分析
// 如需使用演示模式，可手动调用 enableDemoMode() 函数

// 开发工具按钮已移除，保持界面简洁
// 如需开发调试，可在浏览器控制台中手动调用相关函数：
// - enableDemoMode() : 启用演示模式
// - validateChartData() : 验证图表数据
