const fs = require('fs');
const path = require('path');

const slideFiles = [
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
    
    // 确保title-border样式存在且正确
    if (!content.includes('.title-border {')) {
        content = content.replace(/h1\s*\{([^}]*)\}/s, (match, styles) => {
            // 提取border样式
            const borderMatch = styles.match(/border[^;]+;/);
            if (borderMatch) {
                const borderStyle = borderMatch[0];
                const newStyles = styles.replace(/border[^;]+;/g, '').trim();
                return `.title-border {\n  ${borderStyle}\n  margin-bottom: 25pt;\n}\nh1 {\n  ${newStyles}\n}`;
            }
            return match;
        });
    } else {
        // 确保title-border有margin-bottom
        if (!content.includes('margin-bottom') || !content.match(/\.title-border[^}]*margin-bottom/)) {
            content = content.replace(/\.title-border\s*\{([^}]*)\}/s, (match, styles) => {
                if (!styles.includes('margin-bottom')) {
                    return `.title-border {\n${styles}\n  margin-bottom: 25pt;\n}`;
                }
                return match;
            });
        }
    }
    
    // 修复h1标签 - 添加title-border包装
    if (content.includes('<h1>') && !content.includes('title-border')) {
        content = content.replace(/<h1>([^<]+)<\/h1>/, '<div class="title-border">\n  <h1>$1</h1>\n</div>');
    }
    
    // 确保h1没有border
    content = content.replace(/h1\s*\{([^}]*border[^}]*)\}/s, (match, styles) => {
        const newStyles = styles.replace(/border[^;]+;/g, '').trim();
        return `h1 {\n  ${newStyles}\n}`;
    });
    
    // 确保content有margin-bottom
    if (content.includes('.content {') && !content.match(/\.content[^}]*margin-bottom/)) {
        content = content.replace(/\.content\s*\{([^}]*)\}/s, (match, styles) => {
            return `.content {\n${styles}\n  margin-bottom: 36pt;\n}`;
        });
    }
    
    // 修复div中的文本
    content = content.replace(/<div class="icon-box">([^<]+)<\/div>/g, '<div class="icon-box"><p>$1</p></div>');
    content = content.replace(/<div class="number">([^<]+)<\/div>/g, '<div class="number"><p>$1</p></div>');
    content = content.replace(/<div class="phase-badge">([^<]+)<\/div>/g, '<div class="phase-badge"><p>$1</p></div>');
    content = content.replace(/<div class="brand-item">([^<]+)<\/div>/g, '<div class="brand-item"><p>$1</p></div>');
    content = content.replace(/<div class="strategy-icon">([^<]+)<\/div>/g, '<div class="strategy-icon"><p>$1</p></div>');
    
    // 减少padding
    content = content.replace(/padding:\s*40pt;/g, 'padding: 30pt;');
    content = content.replace(/padding:\s*25pt;/g, 'padding: 20pt;');
    
    // 减少margin
    content = content.replace(/margin-bottom:\s*25pt;/g, 'margin-bottom: 18pt;');
    content = content.replace(/margin-bottom:\s*30pt;/g, 'margin-bottom: 20pt;');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`已修复: ${file}`);
});

console.log('所有文件修复完成！');

