# API连接问题快速解决指南

## 🚨 立即可用的解决方案

### 方案1：使用演示模式（推荐）
**最快速的解决方案，立即可用**

1. **打开转化漏斗测试页面**：
   ```bash
   open funnel-test.html
   ```

2. **关闭真实AI分析**：
   - 在页面右上角找到"真实AI分析"开关
   - 点击关闭该开关

3. **体验完整功能**：
   - 点击"查看演示结果"按钮
   - 或者上传任意图片后点击"开始分析转化漏斗"
   - 系统将使用预设的演示数据展示完整的分析报告

### 方案2：使用API配置检查工具
**诊断和修复API连接问题**

1. **打开API配置检查工具**：
   ```bash
   open api-config-check.html
   ```

2. **运行诊断**：
   - 点击"测试连接"按钮检查API状态
   - 点击"开始网络诊断"检查网络连接
   - 查看详细的错误信息和解决建议

## 🔍 问题诊断步骤

### 步骤1：检查网络连接
```bash
# 测试基础网络连接
ping google.com

# 测试API服务器连接
ping haxiaiplus.cn
```

### 步骤2：检查浏览器控制台
1. 按F12打开开发者工具
2. 切换到"Console"标签
3. 查看是否有错误信息：
   - `CORS error`：跨域问题
   - `Network error`：网络连接问题
   - `401 Unauthorized`：API密钥问题
   - `403 Forbidden`：权限问题

### 步骤3：验证API配置
检查 `js/api.js` 文件中的配置：
```javascript
const API_CONFIG = {
    baseUrl: 'https://haxiaiplus.cn',
    apiKey: 'sk-BIChztSl1gwRjl06f5DZ3J15UMnLGgEBpiJa00VHTsQeI00N',
    model: 'gemini-2.5-flash-lite-preview-06-17'
};
```

## 🛠️ 常见问题解决方案

### 问题1：CORS跨域错误
**错误信息**：`Access to fetch at 'https://...' from origin 'file://' has been blocked by CORS policy`

**解决方案**：
```bash
# 方案A：使用本地服务器
python -m http.server 8000
# 然后访问 http://localhost:8000

# 方案B：使用Node.js服务器
npx serve .
# 然后访问显示的URL
```

### 问题2：网络连接超时
**错误信息**：`TypeError: Failed to fetch` 或 `Network request failed`

**解决方案**：
1. 检查网络连接
2. 尝试关闭VPN或代理
3. 检查防火墙设置
4. 尝试使用移动网络

### 问题3：API密钥无效
**错误信息**：`401 Unauthorized` 或 `Invalid API key`

**解决方案**：
1. 检查API密钥是否正确
2. 确认密钥是否有效且未过期
3. 联系API服务提供商

### 问题4：API服务不可用
**错误信息**：`500 Internal Server Error` 或 `503 Service Unavailable`

**解决方案**：
1. 稍后重试
2. 检查API服务状态
3. 使用演示模式作为临时方案

## 🎯 推荐的解决流程

### 第一步：立即使用演示模式
```
1. 打开 funnel-test.html
2. 关闭"真实AI分析"开关
3. 点击"查看演示结果"
4. 体验完整功能
```

### 第二步：诊断问题
```
1. 打开 api-config-check.html
2. 运行连接测试和网络诊断
3. 查看详细错误信息
4. 根据建议进行修复
```

### 第三步：尝试修复
```
1. 根据诊断结果选择解决方案
2. 修复网络或配置问题
3. 重新测试API连接
4. 切换回真实AI分析模式
```

## 📞 技术支持

### 自助诊断工具
- **API配置检查**：`api-config-check.html`
- **转化漏斗测试**：`funnel-test.html`
- **主要功能测试**：`index.html`

### 日志查看
1. 打开浏览器开发者工具（F12）
2. 查看Console标签的错误信息
3. 查看Network标签的请求状态

### 常用命令
```bash
# 启动本地服务器
python -m http.server 8000

# 检查网络连接
ping haxiaiplus.cn

# 测试HTTPS连接
curl -I https://haxiaiplus.cn
```

## 🔄 版本更新

### v1.3.1 - API连接优化
- ✅ 增强的API连接测试
- ✅ 详细的错误诊断信息
- ✅ 网络连接诊断工具
- ✅ 完整的解决方案指南

### 新增文件
- `api-config-check.html`：API配置检查工具
- `API连接问题快速解决指南.md`：解决方案文档

### 优化功能
- 改进的错误提示信息
- 详细的诊断结果显示
- 多种解决方案选择

## 💡 最佳实践

### 开发环境
1. 始终使用本地服务器运行项目
2. 定期测试API连接状态
3. 保持API密钥的安全性

### 生产环境
1. 部署到支持CORS的服务器
2. 配置适当的错误处理
3. 提供演示模式作为备选方案

### 用户体验
1. 提供清晰的错误提示
2. 给出具体的解决建议
3. 确保演示模式始终可用

---

**更新时间**：2024-01-15
**版本**：v1.3.1
**状态**：已提供完整解决方案
