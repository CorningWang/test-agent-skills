1. npm install -g openskills
2. openskills
3. openskills --help

```bash
Commands:
  list                        List all installed skills 列出所有安装的技能
  install [options] <source>  Install skill from GitHub or Git URL 从GitHub或Git URL安装技能
  read <skill-names...>       Read skill(s) to stdout (for AI agents) 读取技能到stdout（用于AI代理）
  update [skill-names...]     Update installed skills from their source (default: all) 更新安装的技能来自其源（默认：所有）
  sync [options]              Update AGENTS.md with installed skills (interactive, pre-selects 当前状态) 更新AGENTS.md与安装的技能（交互式，预选当前状态）
  manage                      Interactively manage (remove) installed skills 交互式管理（删除）安装的技能
  remove|rm <skill-name>      Remove specific skill (for scripts, use manage for interactive)        删除特定技能（用于脚本，使用manage进行交互）        
  help [command]              display help for command 显示帮助命令
```

4. openskills install anthropics/skills -g => 按enter键，全局安装成功，目录在 C:\Users\corningwang\.claude\skills 中
5. openskills list => 列出所有安装的技能
6. 需要使用agent skills时，使用openskills sync