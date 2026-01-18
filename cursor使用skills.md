# OpenSkills 安装和使用

## 环境要求
- **Node.js 版本**: 需要 Node.js 20.10.0+ 或 18.19.0+（不支持 Node.js 16.x）
- 当前版本 v16.13.0 不支持，需要升级

## 安装步骤

### 1. 升级 Node.js（如果版本过低）
访问 https://nodejs.org/ 下载并安装最新 LTS 版本（推荐 20.x）

### 2. 全局安装 OpenSkills
```bash
npm install -g openskills
```

### 3. 运行 OpenSkills
```bash
openskills
```

## 安装技能

### 安装 Anthropic Skills
```bash
openskills install anthropics/skills
```

## 常见错误

### SyntaxError: Unexpected token 'with'
**原因**: Node.js 版本过低，不支持 `import ... with {type: 'json'}` 语法
**解决方案**: 升级 Node.js 到 20.10.0+ 或 18.19.0+

### Git 克隆失败：Connection was reset
**错误信息**: 
```
error: RPC failed; curl 28 Recv failure: Connection was reset
fatal: expected flush after ref listing
```

**原因**: 网络连接不稳定或 GitHub 访问受限

**解决方案**:

1. **增加 Git 缓冲区大小**（已自动配置）:
   ```bash
   git config --global http.postBuffer 524288000
   git config --global http.lowSpeedLimit 0
   git config --global http.lowSpeedTime 999999
   ```

2. **配置代理**（如果使用代理）:
   ```bash
   # HTTP 代理
   git config --global http.proxy http://proxy.example.com:8080
   git config --global https.proxy https://proxy.example.com:8080
   
   # 取消代理
   git config --global --unset http.proxy
   git config --global --unset https.proxy
   ```

3. **使用 SSH 方式**（如果配置了 SSH 密钥）:
   ```bash
   # 先手动克隆到临时目录
   git clone git@github.com:anthropics/skills.git
   ```

4. **重试安装**:
   ```bash
   openskills install anthropics/skills
   ```

5. **检查网络连接**:
   ```bash
   # 测试 GitHub 连接
   ping github.com
   ```

### Git 克隆失败：无法连接到 443 端口
**错误信息**: 
```
fatal: unable to access 'https://github.com/anthropics/skills/': 
Failed to connect to github.com port 443 after 21033 ms: Couldn't connect to server
```

**原因**: 
- 443 端口被防火墙阻止
- 需要代理才能访问 GitHub
- 网络环境限制

**解决方案**:

1. **配置代理**（推荐，如果有代理）:
   ```bash
   # 设置 HTTP/HTTPS 代理（替换为你的代理地址和端口）
   git config --global http.proxy http://127.0.0.1:7890
   git config --global https.proxy http://127.0.0.1:7890
   
   # 如果代理需要认证
   git config --global http.proxy http://username:password@proxy.example.com:8080
   ```

2. **使用 GitHub 镜像**（临时方案）:
   ```bash
   # 使用 Gitee 或其他镜像（需要手动处理）
   # 或者使用 GitHub 加速服务
   ```

3. **手动克隆后安装**:
   ```bash
   # 使用代理或其他方式手动克隆仓库
   git clone https://github.com/anthropics/skills.git temp-skills
   
   # 然后使用本地路径安装
   openskills install ./temp-skills
   ```

4. **使用 SSH 方式**（如果已配置 SSH 密钥）:
   ```bash
   # 配置 Git 使用 SSH 而不是 HTTPS
   git config --global url."git@github.com:".insteadOf "https://github.com/"
   ```

5. **检查防火墙设置**:
   - 确保防火墙允许 Git 访问网络
   - 检查公司/学校网络是否限制 GitHub 访问