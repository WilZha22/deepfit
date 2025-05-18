const fs = require('fs');
const path = require('path');

// 获取prototype目录下的所有HTML文件
const prototypeDir = path.join(__dirname, 'prototype');
const htmlFiles = fs.readdirSync(prototypeDir).filter(file => file.endsWith('.html'));

// 可用的本地图片映射
const localImages = {
  // 教练图片
  'coach-woman1.jpg': './images/coach-woman1.jpg',
  'coach-woman2.jpg': './images/coach-woman2.jpg',
  'coach-woman3.jpg': './images/coach-woman3.jpg',
  'coach-woman4.jpg': './images/coach-woman4.jpg',
  'coach-man1.jpg': './images/coach-man1.jpg',
  'coach-man2.jpg': './images/coach-man2.jpg',
  'coach1.png': './images/coach1.png',
  'coach2.png': './images/coach2.png',
  'coachgirl.png': './images/coachgirl.png',
  
  // 场馆图片
  'venue1.jpg': './images/venue1.jpg',
  'venue2.jpg': './images/venue2.jpg',
  'venue3.jpg': './images/venue3.jpg',
  'place1.png': './images/place1.png',
  'place2.png': './images/place2.png',
  'place3.png': './images/place3.png',
  
  // 其他图片
  'user-avatar.jpg': './images/user-avatar.jpg',
  'placeholder.png': './images/placeholder.png',
  'fitness-background.jpg': './images/fitness-background.jpg',
  'team1.png': './images/team1.png',
  'event1.png': './images/event1.png',
  'event2.png': './images/event2.png',
  'event3.png': './images/event3.png'
};

// 处理每个HTML文件
htmlFiles.forEach(file => {
  const filePath = path.join(prototypeDir, file);
  console.log(`处理文件: ${file}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let replacementCount = 0;
  
  // 匹配所有Cloudinary图片链接
  const cloudinaryRegex = /src="https:\/\/res\.cloudinary\.com\/[^"]+"/g;
  const matches = content.match(cloudinaryRegex);
  
  if (matches) {
    console.log(`在 ${file} 中找到 ${matches.length} 个Cloudinary链接`);
    
    // 记录原始链接与替换图片的映射
    const replacementMap = {};
    
    // 替换每个Cloudinary链接
    matches.forEach(match => {
      // 确定要使用的本地图片
      let localImgPath;
      
      // 根据链接类型选择合适的本地图片
      if (match.includes('/portraits/women/')) {
        // 女性头像使用女教练图片
        const imageIndex = Math.floor(Math.random() * 4) + 1;
        localImgPath = `./images/coach-woman${imageIndex}.jpg`;
      } else if (match.includes('/portraits/men/')) {
        // 男性头像使用男教练图片
        const imageIndex = Math.floor(Math.random() * 2) + 1;
        localImgPath = `./images/coach-man${imageIndex}.jpg`;
      } else if (match.includes('photo-') && match.includes('fit=crop')) {
        // 背景图片或大图
        if (match.includes('ranking-header-bg')) {
          localImgPath = './images/fitness-background.jpg';
        } else if (match.includes('action-image')) {
          // 动作图片使用教练图片
          localImgPath = './images/coach1.png';
        } else {
          // 其他大图片随机选择
          const venueImages = ['venue1.jpg', 'venue2.jpg', 'venue3.jpg'];
          const randomIndex = Math.floor(Math.random() * venueImages.length);
          localImgPath = `./images/${venueImages[randomIndex]}`;
        }
      } else {
        // 默认使用占位图
        localImgPath = './images/placeholder.png';
      }
      
      // 创建新的src属性
      const newSrc = `src="${localImgPath}"`;
      
      // 记录替换
      replacementMap[match] = newSrc;
      
      // 替换内容中的链接
      content = content.replace(match, newSrc);
      replacementCount++;
    });
    
    // 输出替换详情
    console.log('替换详情:');
    Object.entries(replacementMap).forEach(([oldSrc, newSrc]) => {
      console.log(`  ${oldSrc} -> ${newSrc}`);
    });
  } else {
    console.log(`在 ${file} 中没有找到Cloudinary链接`);
  }
  
  // 优化handleImageError函数，添加对Cloudinary链接的处理
  if (content.includes('function handleImageError') && replacementCount > 0) {
    // 确保handleImageError函数能处理本地路径
    const handleImageErrorRegex = /function\s+handleImageError\s*\(\s*img\s*\)\s*\{[\s\S]*?\}/;
    const updatedHandler = `function handleImageError(img) {
      // 设置适当的占位图路径
      const placeholderPath = './images/placeholder.png';
      
      // 如果是Cloudinary链接，替换为本地图片
      const originalSrc = img.getAttribute('data-original-src') || img.src;
      if (originalSrc.includes('cloudinary.com') || originalSrc.includes('randomuser.me')) {
        img.src = placeholderPath;
        return true;
      }
      
      img.src = placeholderPath;
      return true; // 阻止默认错误处理
    }`;
    
    content = content.replace(handleImageErrorRegex, updatedHandler);
  }
  
  // 保存修改后的文件
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`完成 ${file} 的处理，替换了 ${replacementCount} 个链接\n`);
});

console.log('所有HTML文件处理完成!'); 