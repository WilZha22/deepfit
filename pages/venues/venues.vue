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
            <view class="back-btn" @click="goBack">
              <text class="fas fa-arrow-left"></text>
            </view>
            <text class="page-title">合作场馆</text>
          </view>
          
          <!-- 搜索与城市选择 -->
          <view class="search-bar">
            <view class="city-selector" @click="showCityPicker">
              <text class="fas fa-map-marker-alt"></text>
              <text class="city-name">{{currentCity}}</text>
              <text class="fas fa-chevron-down"></text>
            </view>
            <view class="search-input">
              <text class="fas fa-search"></text>
              <input type="text" placeholder="搜索场馆名称、地址" v-model="searchKeyword" @input="searchVenues"/>
            </view>
          </view>
          
          <!-- 场馆列表 -->
          <view class="venues-list">
            <view 
              v-for="(venue, index) in filteredVenues" 
              :key="index" 
              class="venue-item"
              @click="goToVenueDetail(venue.id)"
            >
              <image class="venue-image" :src="venue.image" mode="aspectFill"></image>
              <view class="venue-details">
                <view class="venue-main-info">
                  <text class="venue-name">{{venue.name}}</text>
                  <view class="venue-distance">
                    <text class="fas fa-location-arrow"></text>
                    <text>{{venue.distance}}</text>
                  </view>
                </view>
                <text class="venue-address">
                  <text class="fas fa-map-marker-alt"></text>
                  <text>{{venue.address}}</text>
                </text>
                <text class="venue-description">{{venue.description}}</text>
                <text class="venue-phone">
                  <text class="fas fa-phone-alt"></text>
                  <text>{{venue.phone}}</text>
                </text>
                <view class="venue-membership" v-if="venue.membership">
                  <view class="membership-info">
                    <text class="membership-title">{{venue.membership.title}}</text>
                    <text class="membership-price">¥{{venue.membership.price}}</text>
                  </view>
                  <button class="book-btn">立即预约</button>
                </view>
              </view>
            </view>
          </view>
        </view>
        
        <!-- 底部导航栏 -->
        <view class="bottom-tab-bar">
          <view class="tab-item" @click="goToHome">
            <text class="fas fa-home"></text>
            <text>首页</text>
          </view>
          <view class="tab-item" @click="goToEvents">
            <text class="fas fa-trophy"></text>
            <text>赛事</text>
          </view>
          <view class="tab-item tab-item-cta active">
            <text>附近的场馆</text>
          </view>
          <view class="tab-item" @click="goToCourses">
            <text class="fas fa-calendar-alt"></text>
            <text>课程</text>
          </view>
          <view class="tab-item" @click="goToProfile">
            <text class="fas fa-user"></text>
            <text>我的</text>
          </view>
        </view>
      </view>
    </view>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentCity: '厦门',
        searchKeyword: '',
        cities: ['北京', '上海', '广州', '深圳', '厦门', '成都', '重庆', '西安'],
        venues: [
          {
            id: 1,
            image: '/static/images/venue1.jpg',
            name: '光合空间健身中心',
            address: '厦门市思明区软件园二期观日路30号',
            distance: '1.2公里',
            description: '拥有千余平米场地，专业的健身器材和24小时无人值守系统',
            phone: '0592-1234567',
            membership: {
              title: '月卡全场通用',
              price: '299'
            }
          },
          {
            id: 2,
            image: '/static/images/venue2.jpg',
            name: '动力健身工作室',
            address: '厦门市湖里区万达广场B座3层301',
            distance: '3.5公里',
            description: '小班制教学，提供私人定制的训练计划和饮食建议',
            phone: '0592-2345678',
            membership: {
              title: '季卡全时段',
              price: '799'
            }
          },
          {
            id: 3,
            image: '/static/images/venue3.jpg',
            name: '极限运动健身房',
            address: '厦门市集美区集美学村华侨大学旁',
            distance: '5.8公里',
            description: '拥有室内攀岩墙，专业搏击区和大型有氧操房',
            phone: '0592-3456789',
            membership: {
              title: '新人体验课程',
              price: '99'
            }
          },
          {
            id: 4,
            image: '/static/images/venue1.jpg',
            name: '禅境瑜伽馆',
            address: '厦门市思明区鹭江道100号世贸大厦15楼',
            distance: '2.1公里',
            description: '专注高端瑜伽教学，提供热瑜伽、阴瑜伽、普拉提等多种课程',
            phone: '0592-4567890',
            membership: {
              title: '瑜伽月卡（12节课）',
              price: '488'
            }
          },
          {
            id: 5,
            image: '/static/images/venue2.jpg',
            name: '铁拳综合格斗馆',
            address: '厦门市湖里区高崎机场北区1号路',
            distance: '7.3公里',
            description: '提供泰拳、MMA、巴西柔术等专业格斗训练',
            phone: '0592-5678901',
            membership: {
              title: '格斗体验（5节课）',
              price: '199'
            }
          }
        ],
        filteredVenues: []
      }
    },
    created() {
      // 初始状态下显示所有场馆
      this.filteredVenues = this.venues;
    },
    methods: {
      goBack() {
        uni.navigateBack();
      },
      goToHome() {
        uni.switchTab({
          url: '/pages/index/index'
        });
      },
      goToEvents() {
        uni.switchTab({
          url: '/pages/events/events'
        });
      },
      goToCourses() {
        uni.switchTab({
          url: '/pages/courses/courses'
        });
      },
      goToProfile() {
        uni.switchTab({
          url: '/pages/my/my'
        });
      },
      goToVenueDetail(venueId) {
        uni.navigateTo({
          url: `/pages/venues/detail?id=${venueId}`
        });
      },
      showCityPicker() {
        uni.showActionSheet({
          itemList: this.cities,
          success: (res) => {
            this.currentCity = this.cities[res.tapIndex];
            // 这里应该根据选择的城市重新获取场馆数据
            // 模拟数据暂时不变
          }
        });
      },
      searchVenues() {
        if (this.searchKeyword.trim() === '') {
          this.filteredVenues = this.venues;
        } else {
          const keyword = this.searchKeyword.toLowerCase();
          this.filteredVenues = this.venues.filter(venue => 
            venue.name.toLowerCase().includes(keyword) || 
            venue.address.toLowerCase().includes(keyword)
          );
        }
      }
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
  
  /* iPhone 模拟外观 */
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
    height: calc(100% - 44px - 50px); /* 减去状态栏和底部导航的高度 */
    overflow-y: auto;
    background-color: #f5f5f5;
  }
  
  /* 头部 */
  .header {
    display: flex;
    align-items: center;
    padding: 15px;
    background-color: #fff;
    position: relative;
  }
  
  .back-btn {
    font-size: 18px;
    margin-right: 15px;
  }
  
  .page-title {
    font-size: 18px;
    font-weight: bold;
    flex: 1;
    text-align: center;
  }
  
  /* 搜索与城市选择 */
  .search-bar {
    display: flex;
    padding: 10px 15px;
    background-color: #fff;
    margin-bottom: 15px;
  }
  
  .city-selector {
    display: flex;
    align-items: center;
    padding: 0 10px;
    border-right: 1px solid #eee;
  }
  
  .city-name {
    margin: 0 5px;
    font-size: 14px;
  }
  
  .search-input {
    display: flex;
    align-items: center;
    flex: 1;
    background-color: #f5f5f5;
    border-radius: 20px;
    margin-left: 10px;
    padding: 5px 15px;
  }
  
  .search-input .fas {
    color: #999;
    margin-right: 10px;
  }
  
  .search-input input {
    flex: 1;
    border: none;
    font-size: 14px;
    background: transparent;
  }
  
  /* 场馆列表 */
  .venues-list {
    padding: 0 15px;
  }
  
  .venue-item {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .venue-image {
    width: 100%;
    height: 200px;
  }
  
  .venue-details {
    padding: 15px;
  }
  
  .venue-main-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .venue-name {
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }
  
  .venue-distance {
    color: #ff6b00;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  
  .venue-distance .fas {
    margin-right: 5px;
    font-size: 12px;
  }
  
  .venue-address {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
  
  .venue-address .fas {
    margin-right: 5px;
    color: #999;
  }
  
  .venue-description {
    font-size: 14px;
    color: #333;
    line-height: 1.5;
    margin-bottom: 10px;
  }
  
  .venue-phone {
    font-size: 14px;
    color: #666;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
  }
  
  .venue-phone .fas {
    margin-right: 5px;
    color: #999;
  }
  
  .venue-membership {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #eee;
    padding-top: 15px;
  }
  
  .membership-info {
    display: flex;
    flex-direction: column;
  }
  
  .membership-title {
    font-size: 14px;
    color: #333;
    margin-bottom: 5px;
  }
  
  .membership-price {
    font-size: 18px;
    font-weight: bold;
    color: #ff6b00;
  }
  
  .book-btn {
    background-color: #ff6b00;
    color: #fff;
    border: none;
    border-radius: 20px;
    padding: 8px 20px;
    font-size: 14px;
  }
  
  /* 底部导航栏 */
  .bottom-tab-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background-color: #fff;
    display: flex;
    border-top: 1px solid #eee;
  }
  
  .tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #999;
    font-size: 12px;
  }
  
  .tab-item .fas {
    font-size: 18px;
    margin-bottom: 3px;
  }
  
  .tab-item.active {
    color: #ff6b00;
  }
  
  .tab-item-cta {
    background: linear-gradient(to right, #ff9500, #ff6b00);
    color: #fff !important;
    border-radius: 20px;
    margin: 5px;
    font-size: 14px;
    font-weight: bold;
  }
  </style>