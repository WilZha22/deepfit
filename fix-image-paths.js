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
  'https://randomuser.me': 'https://res.cloudinary.com/dywsdrgom/image'
};

// 从外部下载一些必要的图片
const downloadImages = async () => {
  const https = require('https');
  const imageDir = path.join(__dirname, 'images');
  
  // 确保图片目录存在
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir);
  }
  
  // 下载函数
  const download = (url, dest) => {
    return new Promise((resolve, reject) => {
      // 如果文件已存在则跳过
      if (fs.existsSync(dest)) {
        console.log(`File already exists: ${dest}`);
        return resolve();
      }
      
      const file = fs.createWriteStream(dest);
      https.get(url, response => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded: ${dest}`);
          resolve();
        });
      }).on('error', err => {
        fs.unlink(dest, () => {}); // 删除不完整的文件
        reject(err);
      });
    });
  };
  
  try {
    // 下载健身背景图
    await download(
      'https://images.pexels.com/photos/6056804/pexels-photo-6056804.jpeg',
      path.join(imageDir, 'fitness-background.jpg')
    );
    
    // 下载用户头像
    await download(
      'https://randomuser.me/api/portraits/women/44.jpg',
      path.join(imageDir, 'user-avatar.jpg')
    );
    
    console.log('All images downloaded successfully!');
  } catch (err) {
    console.error('Error downloading images:', err);
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
      // 替换src属性中的链接
      content = content.replace(new RegExp(`src="${externalUrl}`, 'g'), `src="${localUrl}`);
      
      // 替换background/background-image中的链接
      content = content.replace(new RegExp(`background: url\\('${externalUrl}`, 'g'), `background: url('${localUrl}`);
      content = content.replace(new RegExp(`background-image: url\\('${externalUrl}`, 'g'), `background-image: url('${localUrl}`);
    }
    
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