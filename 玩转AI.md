kimi的api key：
claude /
sk-kimi-xR4cZaKRo2CNAjhhAqV23OfhdR4xux7MQ4bJDcGp3yBXtUpcnRsNPML85EEs42gv
<!-- kimi不能在claude中使用 -->

moonshot地址：
https://api.moonshot.cn/anthropic
sk-hhwJqBFxEYYogWAATtTMS00DPmnRNtYiR2jN3LxZP8gn8yBL
https://platform.moonshot.cn/console/api-keys

kimi地址：
https://api.kimi.com/coding/
sk-kimi-xR4cZaKRo2CNAjhhAqV23OfhdR4xux7MQ4bJDcGp3yBXtUpcnRsNPML85EEs42gv
https://www.kimi.com/code/console?from=kfc_overview_topbar



# Start the kimi-k2-thinking-turbo model on Windows Powershell
$env:ANTHROPIC_BASE_URL="https://api.kimi.com/coding/"
$env:ANTHROPIC_AUTH_TOKEN="sk-kimi-xR4cZaKRo2CNAjhhAqV23OfhdR4xux7MQ4bJDcGp3yBXtUpcnRsNPML85EEs42gv"
$env:ANTHROPIC_MODEL="kimi-k2.5"
$env:ANTHROPIC_DEFAULT_OPUS_MODEL="kimi-k2.5"
$env:ANTHROPIC_DEFAULT_SONNET_MODEL="kimi-k2.5"
$env:ANTHROPIC_DEFAULT_HAIKU_MODEL="kimi-k2.5"
$env:CLAUDE_CODE_SUBAGENT_MODEL="kimi-k2.5"

修改C:\Users\corningwang\.claude.json文件夹，增加"hasCompletedOnboarding": true

  "env":{
    "ANTHROPIC_BASE_URL": "https://api.kimi.com/coding/",
    "ANTHROPIC_AUTH_TOKEN": "sk-kimi-xR4cZaKRo2CNAjhhAqV23OfhdR4xux7MQ4bJDcGp3yBXtUpcnRsNPML85EEs42gv",
    "ANTHROPIC_MODEL": "kimi-k2.5",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "kimi-k2.5",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "kimi-k2.5",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "kimi-k2.5",
	"NODE_TLS_REJECT_UNAUTHORIZED": "0"
  }