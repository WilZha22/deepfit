<template>
  <view class="container">
    <!-- iPhone 16 Pro Max 模拟外观 -->
    <view class="iphone-container">
      <view class="iphone-status-bar">
        <text class="time">4:26</text>
        <view class="status-icons">
          <text class="signal">●●●●</text>
          <text class="wifi">▲</text>
          <text class="battery">89%</text>
        </view>
      </view>
      
      <!-- 应用主体内容 -->
      <view class="content">
        <!-- 顶部导航 -->
        <view class="header">
          <image class="logo" src="/static/images/logo.png" mode="aspectFit"></image>
          <view class="login-btn">登录/注册</view>
        </view>
        
        <!-- 轮播图 -->
        <swiper class="banner" indicator-dots autoplay circular interval="3000" duration="500">
          <swiper-item v-for="(item, index) in banners" :key="index">
            <image :src="item.image" mode="aspectFill"></image>
            <view class="banner-text">
              <text class="banner-title">{{item.title}}</text>
              <text class="banner-subtitle">{{item.subtitle}}</text>
            </view>
          </swiper-item>
        </swiper>
        
        <!-- 快速功能区 -->
        <view class="quick-actions">
          <view class="action-item">
            <image src="/static/images/icon-plan.png" mode="aspectFit"></image>
            <text>训练计划</text>
          </view>
          <view class="action-item">
            <image src="/static/images/icon-venues.png" mode="aspectFit"></image>
            <text>合作场馆</text>
          </view>
          <view class="action-item">
            <image src="/static/images/icon-coach.png" mode="aspectFit"></image>
            <text>明星教练</text>
          </view>
          <view class="action-item">
            <image src="/static/images/icon-activities.png" mode="aspectFit"></image>
            <text>推荐活动</text>
          </view>
        </view>
        
        <!-- 赛事活动区 -->
        <view class="section">
          <view class="section-header">
            <text class="section-title">赛事活动</text>
            <text class="section-more">更多 ></text>
          </view>
          <scroll-view scroll-x class="scroll-events">
            <view v-for="(item, index) in events" :key="index" class="event-card">
              <image :src="item.image" mode="aspectFill"></image>
              <view class="event-info">
                <text class="event-title">{{item.title}}</text>
                <text class="event-date">{{item.date}}</text>
              </view>
            </view>
          </scroll-view>
        </view>
        
        <!-- 合作场馆区 -->
        <view class="section">
          <view class="section-header">
            <text class="section-title">合作场馆</text>
            <text class="section-more">更多 ></text>
          </view>
          <scroll-view scroll-x class="scroll-venues">
            <view v-for="(item, index) in venues" :key="index" class="venue-card">
              <image :src="item.image" mode="aspectFill"></image>
              <view class="venue-info">
                <text class="venue-name">{{item.name}}</text>
                <text class="venue-address">{{item.address}}</text>
              </view>
            </view>
          </scroll-view>
        </view>
        
        <!-- 明星教练区 -->
        <view class="section">
          <view class="section-header">
            <text class="section-title">明星教练</text>
            <text class="section-more">更多 ></text>
          </view>
          <view class="coaches-grid">
            <view v-for="(item, index) in coaches" :key="index" class="coach-card">
              <image :src="item.avatar" mode="aspectFill"></image>
              <view class="coach-info">
                <text class="coach-name">{{item.name}}</text>
                <text class="coach-specialty">{{item.specialty}}</text>
              </view>
              <view class="coach-tag">{{item.tag}}</view>
            </view>
          </view>
        </view>
        
        <!-- 近期课程区 -->
        <view class="section">
          <view class="section-header">
            <text class="section-title">近期课程</text>
            <text class="section-more">更多 ></text>
          </view>
          <view class="courses-list">
            <view v-for="(item, index) in courses" :key="index" class="course-item">
              <image :src="item.image" mode="aspectFit" class="course-image"></image>
              <view class="course-info">
                <text class="course-title">{{item.title}}</text>
                <text class="course-coach">{{item.coach}}</text>
                <view class="course-meta">
                  <text class="course-time">{{item.time}}</text>
                  <text class="course-price">¥{{item.price}}</text>
                </view>
              </view>
              <button class="book-btn">预约</button>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      banners: [
        {
          image: '/static/images/banner1.jpg',
          title: '燃脂训练 为动而来',
          subtitle: '全新四大课程体系'
        },
        {
          image: '/static/images/banner2.jpg',
          title: '夏季塑形计划',
          subtitle: '30天见证改变'
        },
        {
          image: '/static/images/banner3.jpg',
          title: '私教体验课',
          subtitle: '新人首节课5折'
        }
      ],
      events: [
        {
          image: '/static/images/event1.jpg',
          title: '城市马拉松挑战赛',
          date: '2023.06.15'
        },
        {
          image: '/static/images/event2.jpg',
          title: '全国健美锦标赛',
          date: '2023.07.20'
        },
        {
          image: '/static/images/event3.jpg',
          title: '夏季瑜伽户外活动',
          date: '2023.06.25'
        }
      ],
      venues: [
        {
          image: '/static/images/venue1.jpg',
          name: '光合空间健身中心',
          address: '北京市朝阳区建国路88号'
        },
        {
          image: '/static/images/venue2.jpg',
          name: '动力健身工作室',
          address: '上海市徐汇区淮海中路255号'
        },
        {
          image: '/static/images/venue3.jpg',
          name: '极限运动健身房',
          address: '广州市天河区天河路385号'
        }
      ],
      coaches: [
        {
          avatar: '/static/images/coach1.jpg',
          name: '张教练',
          specialty: '减脂 | 力量训练',
          tag: '明星私教'
        },
        {
          avatar: '/static/images/coach2.jpg',
          name: '李教练',
          specialty: '瑜伽 | 普拉提',
          tag: '资深瑜伽导师'
        },
        {
          avatar: '/static/images/coach3.jpg',
          name: '王教练',
          specialty: '搏击 | 有氧训练',
          tag: '国家一级教练'
        },
        {
          avatar: '/static/images/coach4.jpg',
          name: '赵教练',
          specialty: '体态矫正 | 康复训练',
          tag: '康复专家'
        }
      ],
      courses: [
        {
          image: '/static/images/course1.jpg',
          title: '高强度间歇训练HIIT',
          coach: '张教练',
          time: '周一 19:30-20:30',
          price: '128'
        },
        {
          image: '/static/images/course2.jpg',
          title: '流瑜伽进阶课',
          coach: '李教练',
          time: '周二/周四 18:00-19:00',
          price: '158'
        },
        {
          image: '/static/images/course3.jpg',
          title: '泰拳入门训练',
          coach: '王教练',
          time: '周三/周五 20:00-21:00',
          price: '168'
        }
      ]
    }
  },
  onLoad() {
    
  },
  methods: {
    
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px 0;
}

/* iPhone 16 Pro Max 模拟外观 */
.iphone-container {
  width: 430px;
  height: 932px;
  background-color: #fff;
  border-radius: 55px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* 状态栏 */
.iphone-status-bar {
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #000;
  color: #fff;
}

.time {
  font-weight: bold;
  font-size: 16px;
}

.status-icons {
  display: flex;
  align-items: center;
}

.signal, .wifi, .battery {
  margin-left: 8px;
}

/* 内容区域 */
.content {
  height: calc(100% - 44px);
  overflow-y: auto;
  padding-bottom: 80px; /* 为底部导航留出空间 */
}

/* 头部 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}

.logo {
  height: 28px;
  width: 160px;
}

.login-btn {
  color: #666;
  font-size: 14px;
}

/* 轮播图 */
.banner {
  width: 100%;
  height: 200px;
  position: relative;
}

.banner image {
  width: 100%;
  height: 100%;
}

.banner-text {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: #fff;
  z-index: 10;
}

.banner-title {
  font-size: 24px;
  font-weight: bold;
  display: block;
}

.banner-subtitle {
  font-size: 14px;
  margin-top: 6px;
  display: block;
}

/* 快速功能区 */
.quick-actions {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
  background-color: #fff;
  margin: 10px 0;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.action-item image {
  width: 50px;
  height: 50px;
  margin-bottom: 5px;
}

.action-item text {
  font-size: 12px;
  color: #333;
}

/* 通用区块样式 */
.section {
  margin: 15px 0;
  padding: 15px;
  background-color: #fff;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.section-more {
  font-size: 14px;
  color: #999;
}

/* 赛事活动区 */
.scroll-events {
  white-space: nowrap;
}

.event-card {
  display: inline-block;
  width: 250px;
  margin-right: 15px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.event-card image {
  width: 100%;
  height: 140px;
}

.event-info {
  padding: 10px;
}

.event-title {
  font-size: 16px;
  font-weight: bold;
  display: block;
  color: #333;
}

.event-date {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
  display: block;
}

/* 合作场馆区 */
.scroll-venues {
  white-space: nowrap;
}

.venue-card {
  display: inline-block;
  width: 200px;
  margin-right: 15px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.venue-card image {
  width: 100%;
  height: 120px;
}

.venue-info {
  padding: 10px;
}

.venue-name {
  font-size: 16px;
  font-weight: bold;
  display: block;
  color: #333;
}

.venue-address {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
  display: block;
  white-space: normal;
}

/* 明星教练区 */
.coaches-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.coach-card {
  width: 48%;
  margin-bottom: 15px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.coach-card image {
  width: 100%;
  height: 160px;
}

.coach-info {
  padding: 10px;
}

.coach-name {
  font-size: 16px;
  font-weight: bold;
  display: block;
  color: #333;
}

.coach-specialty {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
  display: block;
}

.coach-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff6b00;
  color: #fff;
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 12px;
}

/* 近期课程区 */
.courses-list {
  display: flex;
  flex-direction: column;
}

.course-item {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.course-item:last-child {
  border-bottom: none;
}

.course-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-right: 15px;
}

.course-info {
  flex: 1;
}

.course-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: block;
}

.course-coach {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
  display: block;
}

.course-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.course-time {
  font-size: 12px;
  color: #999;
}

.course-price {
  font-size: 14px;
  color: #ff6b00;
  font-weight: bold;
}

.book-btn {
  background-color: #ff6b00;
  color: #fff;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  padding: 0 15px;
  border-radius: 15px;
  margin: auto 0;
}
</style> 