//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    city:'',
    // date:'5月3日',
    // week:'星期四',
    // todayImg:'../img/阴雨转多云.png',
    // todayText:'多云',
    // nowTpt:"22°C",
    // todayMaxTpt: "25°C",
    // todayMinTpt:"15°C",
    // windDirection:"东南风",
    // afterWeek:"星期六",
    afterSrc:"",
    // afterMax:"26°",
    // afterMin:"17°",
    future:[],
    region: ['广东省', '广州市', '增城区'],
    color:'#29b0ff'
    },


  refresh() {//更新天气数据函数
    this.setData({//显示加载模块
      Loadinghidden: false
    })
    let that = this;//防止作用域污染
    wx.getLocation({//重新去获取当前的经纬度重新去获取数据
      success(res) {
        let latitude = res.latitude,
          longitude = res.longitude;
        that.setData({
          latitude,
          longitude,
          Loadinghidden: true
        });
        that.loadWeatherByGps(longitude, latitude)
      },
      fail(err) {
        console.log(err)
      }
    })
  },

  onLoad: function () {
    let that = this;
    wx.getLocation({
      success(res) {
        let latitude = res.latitude,
          longitude = res.longitude;
        that.setData({//设置经纬度
          latitude,
          longitude
        });
        that.loadWeatherByGps(longitude, latitude)//用经纬度去取得数据
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  loadWeatherByGps(lon, lat) {//取数据的函数
    let that = this;
    wx.request({
      url: 'https://v.juhe.cn/weather/geo?&key=e8082c63f6a3081917224b80a6d29510&dtype=json', 
      data: {//请求发送的参数（经纬度）
        lon: lon,
        lat: lat
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let arr =[];
        console.log(res.data.result);
        let future = res.data.result.future;//请求回来的数据是对象的格式
        for (let i in future){//将对象转化为数组
          arr.push(future[i])
        }
        arr = arr.splice(1);//删除数组的第一项返回被删除的数据
        let sk = res.data.result.sk;
        let today = res.data.result.today;

        // console.log(future); console.log(sk); console.log(today);

        let date = today.date_y.substring(5);
        let max = today.temperature.substring(0, 3);
        let min = today.temperature.substring(4, 7);
        let todayId = today.weather_id.fb;
        let todayImgSrc = '../img/day/' + todayId + '.png';


        that.setData({
          city: today.city,
          week: today.week,
          date: date,
          todayText: today.weather,
          nowTpt: sk.temp,
          todayMaxTpt: max,
          todayMinTpt: min,
          windDirection: sk.wind_direction,
          future: arr,
          todayImg: todayImgSrc,
        })

      }
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    let that = this;
    wx.getLocation({
      success(res) {
        let latitude = res.latitude,
          longitude = res.longitude;
        that.setData({//设置经纬度
          latitude,
          longitude
        });
        that.loadWeatherByGps(longitude, latitude)//用经纬度去取得数据
      },
      fail(err) {
        console.log(err)
      }
    })
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  bindRegionChange(e){
    console.log(e);
    let city = e.detail.value[1];
    let that = this;
    wx.request({
      url: 'https://v.juhe.cn/weather/index?format=2&key=e8082c63f6a3081917224b80a6d29510', //仅为示例，并非真实的接口地址
      data: {
        cityname: city
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.result);
        let future = res.data.result.future.splice(1);
        let sk = res.data.result.sk;
        let today = res.data.result.today;

        console.log(future); console.log(sk); console.log(today);

        let date = today.date_y.substring(5);
        let max = today.temperature.substring(0, 3);
        let min = today.temperature.substring(4, 7);

        let todayImgSrc = '../img/day/' + today.weather_id.fb + '.png';

        that.setData({
          city: today.city,
          week: today.week,
          date: date,
          todayText: today.weather,
          nowTpt: sk.temp,
          todayMaxTpt: max,
          todayMinTpt: min,
          windDirection: sk.wind_direction,
          future: future,
          todayImg: todayImgSrc,
        })

      }
    })
  }

})
