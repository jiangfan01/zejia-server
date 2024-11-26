Page({
    data: {
        show: false,
        location: '',
        address: '',
        searchQuery: '',  // 搜索框的输入内容
        userInfo: {
            isLoggedIn: false,
            name: '未登录，请登录'
        },
        checked: true,
        orders: [
            {
                orderNumber: '312321321',
                serveName: "电脑维修",
                userPhone: '17771513712',
                amount: 100,
                date: '2023-05-05'
            },
            {
                orderNumber: '312321322',
                serveName: "洗车清洁",
                userPhone: '17881513713',
                amount: 200,
                date: '2023-06-10'
            },
            {
                orderNumber: '312321323',
                serveName: "电动车维修",
                userPhone: '17991513714',
                amount: 150,
                date: '2023-07-15'
            },
            {
                orderNumber: '312321324',
                serveName: "上门清洁",
                userPhone: '18001513715',
                amount: 250,
                date: '2023-08-20'
            }
        ],
        filteredOrders: []  // 根据搜索过滤后的订单数据
    },

    onLoad: function () {
        const app = getApp();

        // 设置全局位置和地址数据
        if (app.globalData.location && app.globalData.address) {
            this.setData({
                location: app.globalData.location,
                address: app.globalData.address
            });
        } else {
            app.globalData.locationReadyCallback = (location, address) => {
                this.setData({location: location, address: address});
            };
        }

        // 设置初始用户信息
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: {
                    isLoggedIn: true,
                    name: app.globalData.userInfo.name
                }
            });
        }

        // 初始化显示所有订单
        this.setData({filteredOrders: this.data.orders});
    },

    onChange(event) {
        // 切换状态时更新checked的值
        this.setData({
            checked: event.detail
        });
    },

    // 显示弹窗
    checkPayment() {
        this.setData({show: true});
    },

    // 关闭弹窗
    onClose() {
        this.setData({show: false});
    },

    // 搜索框输入事件
    onSearchInput(event) {
        const searchQuery = event.detail.trim();
        this.setData({searchQuery});

        // 根据搜索关键词过滤订单，按手机号进行筛选
        const filteredOrders = this.data.orders.filter(order =>
            order.userPhone.includes(searchQuery)  // 根据手机号过滤
        );
        this.setData({filteredOrders});
    },
    onClear() {
        // 清空搜索框内容
        this.setData({searchQuery: ''});

        // 重置为所有订单
        this.setData({filteredOrders: this.data.orders});
    },
    selectOrder(event) {

        // 关闭弹窗并跳转到支付页面
        this.setData({show: false});

        // 跳转至支付页面并传递订单信息
        wx.navigateTo({
            url: `/pages/payment/payment`
        });
    },
    viewAllOrders() {
        wx.navigateTo({
            url: '/pages/allOrder/allOrder'
        });
    },
    viewCompletedOrders(){
        wx.navigateTo({
            url: '/pages/complete/complete'
        });
    }

});
