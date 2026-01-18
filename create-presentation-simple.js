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

    let successCount = 0;
    let errorCount = 0;

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
            successCount++;
        } catch (error) {
            errorCount++;
            const errorMsg = error.message.split('\n')[0];
            console.warn(`⚠ 跳过 ${slideFile}: ${errorMsg.substring(0, 80)}...`);
            
            // 即使验证失败，也创建一个简单的文本幻灯片作为占位符
            try {
                const slide = pptx.addSlide();
                const slideName = path.basename(slideFile, '.html').replace(/^\d+-/, '');
                slide.addText(slideName, {
                    x: 1, y: 2, w: 8, h: 1,
                    fontSize: 32,
                    bold: true,
                    color: '2C3E50'
                });
                slide.addText('内容验证中，请稍后更新', {
                    x: 1, y: 3.5, w: 8, h: 2,
                    fontSize: 18,
                    color: '7F8C8D'
                });
                console.log(`  → 已创建占位符幻灯片`);
            } catch (placeholderError) {
                console.error(`  ✗ 无法创建占位符: ${placeholderError.message}`);
            }
        }
    }

    // 保存PPT
    const outputPath = '搏鸣乒乓球馆发展方案.pptx';
    await pptx.writeFile({ fileName: outputPath });
    console.log(`\n演示文稿已创建: ${outputPath}`);
    console.log(`成功: ${successCount} 页, 占位符: ${errorCount} 页, 总计: ${successCount + errorCount} 页`);
}

createPresentation().catch(console.error);

