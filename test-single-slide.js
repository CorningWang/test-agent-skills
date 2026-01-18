const pptxgen = require('pptxgenjs');
const path = require('path');
const html2pptx = require('./html2pptx.js');

async function testSlide(slideFile) {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    
    const fs = require('fs');
    // 直接使用文件名（去掉路径前缀）
    const fileName = slideFile.split('/').pop() || slideFile.split('\\').pop();
    const slidesDir = path.join(process.cwd(), 'slides');
    let fullPath = path.join(slidesDir, fileName);
    
    if (!fs.existsSync(fullPath)) {
        // 如果直接路径不存在，尝试查找匹配的文件
        const files = fs.readdirSync(slidesDir);
        const match = files.find(f => f.startsWith(fileName.split('-')[0] + '-'));
        if (match) {
            fullPath = path.join(slidesDir, match);
            console.log(`使用匹配文件: ${match}`);
        } else {
            console.error(`未找到文件: ${fullPath}`);
            return false;
        }
    }
    console.log(`\n测试: ${slideFile}`);
    console.log(`实际文件: ${path.basename(fullPath)}`);
    console.log(`绝对路径: ${fullPath}`);
    console.log(`文件存在: ${fs.existsSync(fullPath)}`);
    
    try {
        const { slide } = await html2pptx(fullPath, pptx);
        console.log('✓ 成功！');
        
        const outputPath = 'test-slide.pptx';
        await pptx.writeFile({ fileName: outputPath });
        console.log(`已保存到: ${outputPath}`);
        return true;
    } catch (error) {
        console.error('✗ 失败:');
        const errorLines = error.message.split('\n');
        errorLines.forEach((line, i) => {
            if (i < 10) { // 只显示前10行错误
                console.error(`  ${line}`);
            }
        });
        if (errorLines.length > 10) {
            console.error(`  ... 还有 ${errorLines.length - 10} 行错误`);
        }
        return false;
    }
}

// 测试指定的幻灯片
const slideFile = process.argv[2] || 'slides/02-目录.html';
testSlide(slideFile).catch(console.error);

