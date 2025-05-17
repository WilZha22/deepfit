const fs = require('fs');
const path = require('path');

// 创建一个简单的彩色图片数据URI
function createColorDataURI(width, height, color, text) {
  // 创建一个简单的SVG
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${color}" />
    <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
  </svg>
  `;
  
  // 将SVG转换为base64编码的数据URI
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

// 要创建的图片列表
const imagesToCreate = [
  { name: 'venue1.jpg', width: 800, height: 400, color: '#FF9500', text: '场馆1' },
  { name: 'venue2.jpg', width: 800, height: 400, color: '#3498DB', text: '场馆2' },
  { name: 'venue3.jpg', width: 800, height: 400, color: '#2ECC71', text: '场馆3' },
  { name: 'coach-woman1.jpg', width: 400, height: 400, color: '#E91E63', text: '女教练1' },
  { name: 'coach-woman2.jpg', width: 400, height: 400, color: '#9C27B0', text: '女教练2' },
  { name: 'coach-woman3.jpg', width: 400, height: 400, color: '#673AB7', text: '女教练3' },
  { name: 'coach-woman4.jpg', width: 400, height: 400, color: '#3F51B5', text: '女教练4' },
  { name: 'coach-man1.jpg', width: 400, height: 400, color: '#2196F3', text: '男教练1' },
  { name: 'coach-man2.jpg', width: 400, height: 400, color: '#03A9F4', text: '男教练2' },
  { name: 'user-avatar.jpg', width: 200, height: 200, color: '#607D8B', text: '用户头像' },
  { name: 'fitness-background.jpg', width: 800, height: 600, color: '#795548', text: '健身背景' }
];

// 确保图片目录存在
const imageDir = path.join(__dirname, 'images');
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir);
}

// 创建图片文件
imagesToCreate.forEach(image => {
  const filePath = path.join(imageDir, image.name);
  // 只有当文件不存在或大小为0时才创建新图片
  const fileExists = fs.existsSync(filePath);
  const fileEmpty = fileExists ? fs.statSync(filePath).size === 0 : true;
  
  if (!fileExists || fileEmpty) {
    // 生成数据URI
    const dataURI = createColorDataURI(image.width, image.height, image.color, image.text);
    
    // 提取base64部分，即dataURI中'base64,'之后的部分
    const base64Data = dataURI.split(',')[1];
    
    // 将base64数据写入文件
    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
    console.log(`Created ${image.name}`);
  } else {
    console.log(`Skipped ${image.name} (already exists and not empty)`);
  }
});

// 确保有一个有效的placeholder.png
const placeholderPath = path.join(imageDir, 'placeholder.png');
if (!fs.existsSync(placeholderPath) || fs.statSync(placeholderPath).size === 0) {
  // 生成占位图数据URI
  const placeholderDataURI = createColorDataURI(400, 300, '#CCCCCC', 'Image Not Found');
  
  // 提取base64部分
  const base64Data = placeholderDataURI.split(',')[1];
  
  // 将base64数据写入文件
  fs.writeFileSync(placeholderPath, Buffer.from(base64Data, 'base64'));
  console.log('Created placeholder.png');
} else {
  console.log('Skipped placeholder.png (already exists and not empty)');
}

console.log('All dummy images created successfully!'); 