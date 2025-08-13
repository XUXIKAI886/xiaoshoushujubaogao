# Tauri应用缓存管理指南

## 概述

在Tauri应用中，缓存管理与传统Web应用有所不同。Tauri使用WebView来渲染前端内容，因此需要特殊的缓存处理策略。

## 🔧 Tauri缓存机制

### WebView缓存
- **位置**: 系统WebView缓存目录
- **内容**: HTML、CSS、JavaScript文件
- **特点**: 持久化存储，应用重启后仍存在

### 应用数据缓存
- **位置**: 应用数据目录 (`AppData/Local/[AppName]`)
- **内容**: 用户数据、配置文件、临时文件
- **特点**: 应用级别的缓存

### LocalStorage
- **位置**: WebView的本地存储
- **内容**: 应用状态、用户偏好设置
- **特点**: 域名绑定，持久化存储

## 🚀 自动缓存管理

### 版本检测
系统会自动检测应用版本变化：
```javascript
// 当前版本
const currentVersion = '2.0.0-ui-fix';

// 检测版本更新
if (storedVersion !== currentVersion) {
    await clearTauriCache();
    showUpdateNotification();
}
```

### 智能清理
- **自动清理**: 版本更新时自动清理旧缓存
- **选择性保留**: 保留用户重要数据
- **渐进式清理**: 避免影响用户体验

## 🛠️ 手动缓存清理

### 方法1：应用内重新加载
```javascript
// 使用Tauri API重新加载
await window.__TAURI__.webview.reload();
```

### 方法2：快捷键
- **F5**: 标准刷新
- **Ctrl+Shift+R**: 强制刷新（清除缓存）
- **Ctrl+F5**: 硬刷新

### 方法3：应用重启
- 完全关闭应用
- 重新启动应用
- 系统会自动检测版本并清理缓存

## 📱 Tauri特有功能

### 1. WebView缓存清理
```javascript
if (window.__TAURI__?.webview) {
    await window.__TAURI__.webview.clearCache();
}
```

### 2. 文件系统缓存清理
```javascript
const { appDataDir } = window.__TAURI__.path;
const { removeDir } = window.__TAURI__.fs;

const cacheDir = await appDataDir();
await removeDir(`${cacheDir}/cache`, { recursive: true });
```

### 3. 应用事件监听
```javascript
const { listen } = window.__TAURI__.event;

// 监听应用更新事件
listen('app-update', (event) => {
    handleAppUpdate();
});

// 监听窗口焦点事件
listen('tauri://focus', () => {
    checkForUpdates();
});
```

## 🔄 更新流程

### 自动更新检测
1. **启动检测**: 应用启动时检查版本
2. **焦点检测**: 窗口获得焦点时检查
3. **定时检测**: 开发模式下定期检查

### 更新处理流程
1. **检测版本差异**
2. **清理旧缓存**
3. **显示更新通知**
4. **提供重新加载选项**
5. **验证更新成功**

## 🎯 用户体验优化

### 友好的更新通知
- **蓝色渐变背景**: 区别于普通Web应用
- **Tauri图标**: 明确标识这是应用更新
- **一键重新加载**: 简化用户操作
- **自动消失**: 避免干扰用户

### 智能提示
- **检测旧元素**: 自动识别过时的UI组件
- **模态提示**: 重要更新时显示模态对话框
- **快捷键提示**: 告知用户可用的快捷键

## 🔧 开发者配置

### 缓存策略配置
```json
{
  "cacheStrategy": {
    "webview": {
      "clearOnUpdate": true,
      "maxAge": 0,
      "noCache": true
    },
    "localStorage": {
      "clearOnVersionChange": true,
      "preserveKeys": ["user-preferences"],
      "clearKeys": ["theme-settings", "app-cache"]
    }
  }
}
```

### 开发模式设置
```json
{
  "devMode": {
    "hotReload": true,
    "checkInterval": 2000,
    "debugLogging": true
  }
}
```

## 🐛 故障排除

### 常见问题

#### 1. 仍然显示旧版本UI
**解决方案**:
- 按 `F5` 或 `Ctrl+Shift+R` 刷新
- 重启应用
- 检查是否有更新通知

#### 2. 缓存清理失败
**解决方案**:
- 检查应用权限
- 手动删除应用数据目录
- 重新安装应用

#### 3. 更新检测不工作
**解决方案**:
- 检查网络连接
- 验证版本号配置
- 查看控制台错误信息

### 调试信息
打开开发者工具 (`F12`) 查看：
- **Console**: 版本检测日志
- **Application**: LocalStorage内容
- **Network**: 资源加载状态

## 📋 最佳实践

### 用户端
1. **定期重启应用**: 确保获得最新版本
2. **注意更新通知**: 及时响应更新提示
3. **使用快捷键**: 熟悉刷新快捷键

### 开发端
1. **版本号管理**: 每次更新递增版本号
2. **渐进式更新**: 避免破坏性变更
3. **用户友好**: 提供清晰的更新说明

## 🔍 技术细节

### Tauri API使用
```javascript
// 检测Tauri环境
const isTauri = typeof window.__TAURI__ !== 'undefined';

// 获取应用信息
const { getName, getVersion } = window.__TAURI__.app;
const appName = await getName();
const appVersion = await getVersion();

// WebView操作
const { reload, clearCache } = window.__TAURI__.webview;
await clearCache();
await reload();
```

### 缓存目录结构
```
AppData/Local/[AppName]/
├── cache/          # 应用缓存
├── temp/           # 临时文件
├── webview/        # WebView缓存
└── user-data/      # 用户数据
```

## 📊 监控与分析

### 缓存效果监控
- **版本检测成功率**: 监控自动检测的准确性
- **缓存清理成功率**: 跟踪清理操作的成功率
- **用户更新响应率**: 分析用户对更新提示的响应

### 性能指标
- **应用启动时间**: 缓存对启动速度的影响
- **内存使用**: 缓存占用的内存空间
- **磁盘空间**: 缓存文件的磁盘占用

---

**版本**: v2.0.0-ui-fix  
**适用于**: Tauri 1.x 和 2.x  
**最后更新**: 2025-08-13
