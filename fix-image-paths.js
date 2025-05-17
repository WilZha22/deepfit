const fs = require('fs');
const path = require('path');

// 获取prototype目录下的所有HTML文件
const prototypeDir = path.join(__dirname, 'prototype');
const htmlFiles = fs.readdirSync(prototypeDir).filter(file => file.endsWith('.html'));

// 外部不稳定图片链接替换为本地或可靠CDN
const externalImageMap = {
  // member.html背景图替换
  'https://images.pexels.com/photos/6056804/pexels-photo-6056804.jpeg': '/images/fitness-background.jpg',
  
  // 用户头像替换为本地
  'https://randomuser.me/api/portraits/women/44.jpg': '/images/user-avatar.jpg',
  
  // 常用的外部链接替换
  'https://images.unsplash.com': 'https://res.cloudinary.com/dywsdrgom/image/upload',
  'https://randomuser.me': 'https://res.cloudinary.com/dywsdrgom/image/upload',
  
  // 修复错误的Cloudinary链接
  'https://res.cloudinary.com/dywsdrgom/image/api': 'https://res.cloudinary.com/dywsdrgom/image/upload',
  
  // venues.html 中的特定图片链接
  'https://res.cloudinary.com/dywsdrgom/image/upload/photo-1534438327276-14e5300c3a48': '/images/venue1.jpg',
  'https://res.cloudinary.com/dywsdrgom/image/upload/photo-1571902943202-507ec2618e8f': '/images/venue2.jpg',
  'https://res.cloudinary.com/dywsdrgom/image/upload/photo-1570829460005-c840387bb1ca': '/images/venue3.jpg',
  'https://res.cloudinary.com/dywsdrgom/image/upload/portraits/women/32.jpg': '/images/coach-woman1.jpg',
  'https://res.cloudinary.com/dywsdrgom/image/upload/portraits/men/32.jpg': '/images/coach-man1.jpg',
  'https://res.cloudinary.com/dywsdrgom/image/upload/portraits/men/44.jpg': '/images/coach-man2.jpg',
  'https://res.cloudinary.com/dywsdrgom/image/upload/portraits/women/28.jpg': '/images/coach-woman2.jpg',
  'https://res.cloudinary.com/dywsdrgom/image/upload/portraits/women/56.jpg': '/images/coach-woman3.jpg',
  'https://res.cloudinary.com/dywsdrgom/image/upload/portraits/women/68.jpg': '/images/coach-woman4.jpg'
};

// 下载外部图片到本地
const downloadImages = async () => {
  const https = require('https');
  const http = require('http');
  const imageDir = path.join(__dirname, 'images');
  
  // 确保图片目录存在
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir);
  }
  
  // 创建一些默认的占位图片
  const createPlaceholderImages = () => {
    const placeholders = [
      { name: 'venue1.jpg', color: '#FF9500' },
      { name: 'venue2.jpg', color: '#3498DB' },
      { name: 'venue3.jpg', color: '#2ECC71' },
      { name: 'coach-woman1.jpg', color: '#E91E63' },
      { name: 'coach-woman2.jpg', color: '#9C27B0' },
      { name: 'coach-woman3.jpg', color: '#673AB7' },
      { name: 'coach-woman4.jpg', color: '#3F51B5' },
      { name: 'coach-man1.jpg', color: '#2196F3' },
      { name: 'coach-man2.jpg', color: '#03A9F4' }
    ];

    placeholders.forEach(placeholder => {
      const filePath = path.join(imageDir, placeholder.name);
      if (!fs.existsSync(filePath)) {
        console.log(`Creating placeholder image: ${placeholder.name}`);
        // 这里我们只是创建一个空文件，但在真实场景中，你可能想生成一个真正的图片
        fs.writeFileSync(filePath, '');
      }
    });
  };

  // 下载函数
  const download = (url, dest) => {
    return new Promise((resolve, reject) => {
      // 如果文件已存在则跳过
      if (fs.existsSync(dest)) {
        console.log(`File already exists: ${dest}`);
        return resolve();
      }
      
      const file = fs.createWriteStream(dest);
      const protocol = url.startsWith('https') ? https : http;
      
      try {
        protocol.get(url, response => {
          if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => {
              file.close();
              console.log(`Downloaded: ${dest}`);
              resolve();
            });
          } else {
            file.close();
            fs.unlink(dest, () => {});
            console.error(`Failed to download ${url} - Status code: ${response.statusCode}`);
            resolve(); // 继续执行，不中断流程
          }
        }).on('error', err => {
          fs.unlink(dest, () => {});
          console.error(`Error downloading ${url}: ${err.message}`);
          resolve(); // 继续执行，不中断流程
        });
      } catch (err) {
        console.error(`Exception trying to download ${url}: ${err.message}`);
        resolve(); // 继续执行，不中断流程
      }
    });
  };
  
  try {
    // 创建占位图片
    createPlaceholderImages();
    
    // 确保有一个占位图片
    if (!fs.existsSync(path.join(imageDir, 'placeholder.png'))) {
      fs.writeFileSync(path.join(imageDir, 'placeholder.png'), '');
    }
    
    // 尝试下载健身背景图
    await download(
      'https://images.pexels.com/photos/6056804/pexels-photo-6056804.jpeg',
      path.join(imageDir, 'fitness-background.jpg')
    );
    
    console.log('All images processed successfully!');
  } catch (err) {
    console.error('Error in image processing:', err);
  }
};

// 处理每个HTML文件
const processHtmlFiles = () => {
  htmlFiles.forEach(file => {
    const filePath = path.join(prototypeDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. 修复 ../images/ 路径为 /images/
    content = content.replace(/src="\.\.\/images\//g, 'src="/images/');
    content = content.replace(/background: url\('\.\.\/images\//g, "background: url('/images/");
    content = content.replace(/background-image: url\('\.\.\/images\//g, "background-image: url('/images/");
    
    // 2. 修复 /static/images/ 路径为 /images/
    content = content.replace(/src="\/static\/images\//g, 'src="/images/');
    content = content.replace(/background: url\('\/static\/images\//g, "background: url('/images/");
    content = content.replace(/background-image: url\('\/static\/images\//g, "background-image: url('/images/");
    
    // 3. 修复外部不稳定图片链接
    for (const [externalUrl, localUrl] of Object.entries(externalImageMap)) {
      const escapedUrl = externalUrl.replace(/\//g, '\\/').replace(/\./g, '\\.');
      
      // 替换src属性中的链接
      content = content.replace(new RegExp(`src="${escapedUrl}`, 'g'), `src="${localUrl}`);
      
      // 替换background/background-image中的链接
      content = content.replace(new RegExp(`background: url\\('${escapedUrl}`, 'g'), `background: url('${localUrl}`);
      content = content.replace(new RegExp(`background-image: url\\('${escapedUrl}`, 'g'), `background-image: url('${localUrl}`);
    }
    
    // 4. 添加onerror处理以在图片加载失败时显示占位图片
    content = content.replace(/<img([^>]*)>/g, '<img$1 onerror="this.src=\'/images/placeholder.png\'" >');
    
    // 保存修改后的文件
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed image paths in ${file}`);
  });
  
  console.log('All HTML files processed successfully!');
};

// 运行下载图片和处理HTML文件
const main = async () => {
  try {
    await downloadImages();
    processHtmlFiles();
  } catch (err) {
    console.error('Error in main process:', err);
  }
};

main(); 