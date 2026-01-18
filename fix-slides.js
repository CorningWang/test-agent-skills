const fs = require('fs');
const path = require('path');

// 修复所有HTML文件
const slideFiles = [
    'slides/03-项目背景.html',
    'slides/04-市场定位.html',
    'slides/05-差异化优势.html',
    'slides/06-营销策略.html',
    'slides/07-产品优化.html',
    'slides/08-品牌合作价值.html',
    'slides/09-合作模式.html',
    'slides/10-目标品牌.html',
    'slides/11-实施计划.html',
    'slides/12-总结.html'
];

slideFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // 1. 修复h1的border - 移到div上
    if (content.includes('h1 {') && content.includes('border')) {
        // 提取h1样式中的border
        const h1Match = content.match(/h1\s*\{[^}]*border[^}]*\}/s);
        if (h1Match) {
            const borderMatch = h1Match[0].match(/border[^;]+;/g);
            if (borderMatch) {
                // 从h1中移除border
                content = content.replace(/h1\s*\{([^}]*border[^}]*)\}/s, (match, styles) => {
                    const newStyles = styles.replace(/border[^;]+;/g, '').trim();
                    return `h1 {\n  ${newStyles}\n}`;
                });
                
                // 添加title-border类
                if (!content.includes('.title-border')) {
                    const borderStyle = borderMatch[0];
                    content = content.replace(/h1\s*\{/, `.title-border {\n  ${borderStyle.replace('border-', 'border-')}\n}\nh1 {`);
                }
            }
        }
    }
    
    // 2. 修复h1标签 - 添加title-border div
    if (content.includes('<h1>') && !content.includes('title-border')) {
        content = content.replace(/<h1>([^<]+)<\/h1>/, '<div class="title-border"><h1>$1</h1></div>');
    }
    
    // 3. 修复div中的文本 - emoji和数字需要包装
    // 修复icon-box中的emoji
    content = content.replace(/<div class="icon-box">([^<]+)<\/div>/g, '<div class="icon-box"><p>$1</p></div>');
    
    // 修复number div中的数字
    content = content.replace(/<div class="number">([^<]+)<\/div>/g, '<div class="number"><p>$1</p></div>');
    
    // 修复phase-badge中的文本
    content = content.replace(/<div class="phase-badge">([^<]+)<\/div>/g, '<div class="phase-badge"><p>$1</p></div>');
    
    // 修复brand-item中的文本
    content = content.replace(/<div class="brand-item">([^<]+)<\/div>/g, '<div class="brand-item"><p>$1</p></div>');
    
    // 4. 减少padding以避免溢出
    content = content.replace(/padding:\s*40pt;/, 'padding: 30pt;');
    content = content.replace(/padding:\s*40pt\s+60pt;/, 'padding: 30pt 40pt;');
    
    // 5. 添加底部边距
    if (content.includes('.content {') && !content.includes('margin-bottom')) {
        content = content.replace(/\.content\s*\{([^}]*)\}/s, (match, styles) => {
            if (!styles.includes('margin-bottom')) {
                return `.content {\n${styles}\n  margin-bottom: 36pt;\n}`;
            }
            return match;
        });
    }
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`已修复: ${file}`);
});

console.log('所有文件修复完成！');

