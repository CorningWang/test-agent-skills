const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

// 引入html2pptx库
const html2pptx = require('./html2pptx.js');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = '搏鸣乒乓球馆';
    pptx.title = '搏鸣乒乓球馆发展方案';

    // 幻灯片文件列表（按顺序）
    const slideFiles = [
        'slides/01-封面.html',
        'slides/02-目录.html',
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

    // 转换每个HTML幻灯片
    for (const slideFile of slideFiles) {
        const fullPath = path.resolve(slideFile);
        if (!fs.existsSync(fullPath)) {
            console.error(`文件不存在: ${fullPath}`);
            continue;
        }
        try {
            const { slide } = await html2pptx(fullPath, pptx);
            console.log(`✓ 已添加: ${slideFile}`);
        } catch (error) {
            console.warn(`⚠ 处理 ${slideFile} 时出错，但继续处理:`, error.message.split('\n')[0]);
            // 即使有验证错误，也尝试继续处理其他幻灯片
        }
    }

    // 保存PPT
    const outputPath = '搏鸣乒乓球馆发展方案.pptx';
    await pptx.writeFile({ fileName: outputPath });
    console.log(`\n演示文稿已创建: ${outputPath}`);
}

createPresentation().catch(console.error);

