Page({
    data: {
        searchQuery: '', // 搜索框的查询条件
        orders: [
            {
                orderNumber: '312321321',
                serveName: "电脑维修",
                userPhone: '17771513712',
                amount: 100,
                additionalCost: 20, // 额外费用
                date: '2023-05-05',
                status: 'completed' // 'completed' 或 'not-completed'
            },
            {
                orderNumber: '312321322',
                serveName: "洗车清洁",
                userPhone: '17881513713',
                amount: 200,
                additionalCost: 0, // 额外费用为 0
                date: '2023-06-10',
                status: 'completed'
            },
            {
                orderNumber: '312321323',
                serveName: "电动车维修",
                userPhone: '17991513714',
                amount: 150,
                additionalCost: 10, // 额外费用
                date: '2023-07-15',
                status: 'completed'
            },
            {
                orderNumber: '312321324',
                serveName: "上门清洁",
                userPhone: '18001513715',
                amount: 250,
                additionalCost: 0, // 额外费用为 0
                date: '2023-08-20',
                status: 'completed'
            }
        ],
        filteredOrders: [] // 根据搜索过滤后的订单数据
    },

    onLoad() {
        // 初始化时显示所有已完成的订单
        this.setData({ filteredOrders: this.data.orders.filter(order => order.status === 'completed') });
    },

    // 搜索框输入事件
    onSearchInput(event) {
        const searchQuery = event.detail.trim();
        this.setData({ searchQuery });

        // 根据搜索关键词过滤订单，按订单编号匹配，并且只显示已完成的订单
        const filteredOrders = this.data.orders.filter(order =>
            order.orderNumber.includes(searchQuery) && order.status === 'completed'
        );
        this.setData({ filteredOrders });
    },

    // 清空搜索
    onClear() {
        this.setData({
            searchQuery: '',
            filteredOrders: this.data.orders.filter(order => order.status === 'completed')
        });
    }
});
