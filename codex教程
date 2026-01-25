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

1) Codex Rules 模板（直接粘贴）

把下面这段放到 Codex 的 Rules / Instructions 里（团队/个人规则都行）：

# Language & Output
- 默认用简体中文回答（除非用户明确要求英文）。
- 输出结构优先：先结论/方案，再步骤，再注意事项。
- 遇到术语：首次出现时给中文解释，并保留英文原词（例如：持续集成 CI）。

# Coding Style
- 生成代码时优先可读性与可维护性：
  - 关键逻辑必须写注释：说明“为什么这么做”，而不是只写“做了什么”。
  - 对边界条件、异常处理、并发/线程安全点写清楚注释。
  - 复杂函数先写顶部“概要注释”，包含：输入/输出、关键假设、错误处理、时间复杂度（如适用）。
- 若生成 .NET/C# 代码：
  - 公共 API 用 XML 注释（///），包含 <summary> / <param> / <returns> / <exception>（适用时）。
- 若生成 TypeScript/Vue：
  - 公共函数/组件 props 用 JSDoc/TSDoc 注释。
  - 关键状态与副作用位置标注注释。

# File Encoding & New Files
- 任何新建的文本文件默认使用 UTF-8 with BOM 编码（Windows 兼容优先）。
- 如果需要修改已有文件，遵循仓库当前编码；若不确定，优先保持原样并提示用户。
- 生成 PowerShell 脚本时也遵循 UTF-8 with BOM，避免中文输出乱码。

# When uncertain
- 不确定编码或项目约束时：先给出建议与最小变更方案，不要擅自大规模重构。


这段的关键点是：“默认中文 + 注释策略 + 编码策略 + 不确定时的行为” 都写清楚，Codex 执行会更稳定。

2) 真正让“UTF-8 with BOM”落地：仓库配置（推荐）

仅靠规则不够稳（因为模型不一定能控制你编辑器的保存编码），最好在 repo 里加配置，让 IDE/编辑器跟着走。

2.1 .editorconfig（核心）

在仓库根目录新增/修改 .editorconfig：

root = true

[*]
charset = utf-8-bom
end_of_line = crlf
insert_final_newline = true
indent_style = space
indent_size = 2

[*.cs]
indent_size = 4

[*.ps1]
charset = utf-8-bom

[*.vue]
charset = utf-8-bom

[*.ts]
charset = utf-8-bom

[*.js]
charset = utf-8-bom

[*.json]
charset = utf-8-bom


charset = utf-8-bom 是关键。很多 IDE（含 VS / Rider / VS Code + EditorConfig 插件）会尊重它。

2.2 Git 属性（可选，但很强）

加一个 .gitattributes，避免换行/编码乱掉：

* text=auto eol=crlf

*.cs  text eol=crlf
*.ps1 text eol=crlf
*.ts  text eol=crlf
*.vue text eol=crlf
*.json text eol=crlf


Git 本身不保证 BOM，但能保证换行一致，减少 Windows 上的“奇怪差异”。

3) 让“注释更多”更可控：你可以加两条硬规则

如果你希望 Codex 真的“注释密度更高”，建议再加两条可量化的规则（模型更容易遵守）：

- 注释密度要求：每个非平凡函数至少 3 条注释（含函数概要注释 + 关键分支/边界/异常说明）。
- 任何包含业务规则的逻辑：必须在代码旁用中文注释写出规则原意。

4) 小提醒：BOM 的现实取舍（你做 OA/MIS 很常见）

PowerShell + 中文输出：UTF-8 BOM 往往更省心（你前面也遇到过乱码）。

Web 前端（TS/Vue/JSON）：部分工具链对 BOM 也能接受，但极少数情况下会踩坑（例如某些老的解析器/脚本）。
如果你们前端链路曾出过 BOM 问题，可以改成：

*.ps1 强制 utf-8-bom

其他保持 utf-8

你现在是统一要求 BOM，我上面给的是“全局 BOM”的方案。

如果你告诉我：你用的是 Codex in ChatGPT 还是 VS Code/Cursor 里的 Codex，我还能把“Rules 放哪、怎么生效、怎么验证（新建文件确实是 BOM）”写成一步一步的操作清单。
