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

## Codex 命令总览（CLI + TUI）

### CLI 主命令 / 子命令
- `codex`：启动交互式 TUI
- `codex app-server`：启动本地 App Server（实验）
- `codex apply [TASK_ID]`：应用 Codex Cloud 任务 diff（别名 `codex a`）
- `codex cloud`：管理/执行 Codex Cloud 任务（别名 `codex cloud-tasks`，含 `codex cloud exec`）
- `codex completion <shell>`：生成 Shell 补全脚本
- `codex exec`：非交互执行（别名 `codex e`）
- `codex execpolicy`：评估 execpolicy 规则（实验）
- `codex fork`：分叉会话
- `codex login` / `codex logout`：登录 / 退出
- `codex mcp`：管理 MCP 服务器（实验，详情见 `codex mcp --help`）
- `codex mcp-server`：将 Codex 作为 MCP Server（实验）
- `codex resume`：恢复会话
- `codex sandbox`：在 Codex 沙箱中运行命令（实验）

### TUI 内置 Slash 命令
- `/approvals`：调整审批级别
- `/compact`：压缩对话上下文
- `/diff`：查看 Git diff（含未跟踪文件）
- `/exit`、`/quit`：退出 TUI
- `/feedback`：发送反馈日志
- `/init`：生成 `AGENTS.md` 模板
- `/logout`：退出登录
- `/mcp`：列出 MCP 工具
- `/mention <path>`：附加文件到对话
- `/model`：切换模型/推理强度
- `/fork`：分叉当前会话
- `/resume`：恢复会话
- `/new`：新建会话
- `/review`：代码审查工作区
- `/status`：查看会话配置与 token 使用情况
- /undo：撤销 Codex 最近一轮操作

## Skills 使用说明（基于 AGENTS.md）

### 1. 可用 Skills 的来源
- 只能使用 `AGENTS.md` 中 `<available_skills>` 列表里出现的技能
- 用户点名某个 skill（如“frontend-design”）时必须使用该 skill
- 若 skill 不在列表或文件无法读取，需要说明原因并采用替代方案

### 2. 何时触发 Skill
- 用户明确点名 skill → 必须使用
- 需求与 skill 描述高度匹配 → 必须使用
- 多个技能适用 → 选择最小覆盖集合，并说明使用顺序

### 3. 如何调用 Skill（Shell）
- 单个技能：
  ```bash
  npx openskills read <skill-name>
  ```
- 多个技能：
  ```bash
  npx openskills read skill-one,skill-two
  ```
- 每次调用都是无状态的，仅针对当前任务

### 4. 渐进式加载规范
1. 先打开该 skill 的 `SKILL.md`，只读到够用为止  
2. 若 `SKILL.md` 提到 `references/`、`scripts/`、`assets/`，只加载必需文件  
3. 有 `scripts/` 时优先运行或修改脚本，避免手打大段内容  
4. 有模板或资产时优先复用  

### 5. 协调与说明要求
- 使用 skill 时需要简短说明“为什么用它”
- 若跳过明显技能，需说明理由

### 6. 上下文与使用边界
- 不要跨回合继续沿用 skill，除非用户再次提及
- 保持上下文精简，避免批量加载无关文件
