# Codex 安装流程总结

## 安装环境
- **操作系统**: Windows 10 (版本 10.0.26100)
- **Node.js 版本**: v16.13.0
- **npm 版本**: 8.1.0
- **工作目录**: D:\MyCode\codex

## 安装步骤

### 1. 检查环境依赖
在安装 Codex 之前，需要确认系统已安装 Node.js 和 npm：

```bash
# 检查 Node.js 版本
node --version
# 输出: v16.13.0

# 检查 npm 版本
npm --version
# 输出: 8.1.0
```

### 2. 全局安装 Codex CLI
使用 npm 全局安装 Codex 命令行工具：

```bash
npm install -g @openai/codex
```

**安装结果：**
- 成功安装 1 个包
- 未发现安全漏洞
- 安装时间：约 2 分钟

### 3. 验证安装
验证 Codex 是否安装成功：

```bash
codex --version
# 输出: codex-cli 0.87.0
```

## 安装完成信息
- **Codex 版本**: 0.87.0
- **安装类型**: 全局安装（可在任何目录使用）
- **安装状态**: ✅ 成功

## 后续使用步骤

### 首次使用
1. 运行 Codex 命令：
   ```bash
   codex
   ```

2. 首次运行会提示登录：
   - 可以使用 ChatGPT 账号登录
   - 或使用 OpenAI API 密钥

### 使用要求
- 需要有效的 ChatGPT 订阅（Plus、Pro、Business、Edu、Enterprise）
- 或使用 OpenAI API 密钥

### 常用命令
- 查看帮助：`codex --help`
- 查看版本：`codex --version`
- 启动 Codex：`codex`

### 使用模式
- **Suggest 模式**（默认）：建议模式，不会自动修改文件
- **auto-edit 模式**：自动编辑模式
- **full-auto 模式**：完全自动模式

## 注意事项
1. **隐私安全**：Codex CLI 在本地运行，源代码不会上传到服务器，只有高层摘要和必要信息会被发送给模型
2. **Windows 支持**：Windows 支持处于实验阶段，如遇问题可考虑使用 WSL（Windows Subsystem for Linux）
3. **npm 更新提示**：当前 npm 版本为 8.1.0，最新版本为 11.7.0，可选择性更新：
   ```bash
   npm install -g npm@11.7.0
   ```

## 安装日期
安装完成时间：2024年（具体日期根据实际安装时间填写）