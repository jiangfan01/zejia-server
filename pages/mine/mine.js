Page({
    data: {
        phoneNumber: '138****1234',
        avatarUrl: "",
        show: false,  // 弹窗显示状态
        balance: 200.98,  // 当前余额
        amount: '',  // 输入金额
        totalBalance: 500.88,
        payType: true
    },

    onLoad() {
        // 确保显示两位小数
        this.setData({
            balance: this.formatBalance(this.data.balance),
            totalBalance: this.formatBalance(this.data.totalBalance),
        });
    },

    // 格式化余额，保留两位小数
    formatBalance(value) {
        return value.toFixed(2);
    },

    // 显示弹窗
    showPopup() {
        this.setData({
            show: true,
            amount: ''  // 每次弹窗打开时清空金额输入框
        });
    },

    // 输入金额事件
    onAmountInput(e) {
        let amount = e.detail;
        // 匹配有效的金额输入，最多两位小数
        const regex = /^[0-9]+(\.[0-9]{0,2})?$/;

        // 如果输入不符合规则，则返回
        if (!regex.test(amount)) {
            return;
        }

        this.setData({
            amount
        });
    },

    // 提现操作
    submitWithdrawal() {
        const { amount, balance } = this.data;
        // 判断是否输入金额
        if (!amount) {
            wx.showToast({
                title: '请输入金额',
                icon: 'none',
            });
            return;
        }
        // 判断金额是否合法
        if (parseFloat(amount) <= 0 || parseFloat(amount) > balance) {
            wx.showToast({
                title: '请输入合法金额',
                icon: 'none',
            });
            return;
        }

        // 提现成功逻辑
        wx.showToast({
            title: '提现成功',
            icon: 'success'
        });

        // 关闭弹窗并清空输入框
        this.setData({
            show: false,
            amount: ''
        });
    },

    // 选择提现方式（如果将来支持更多方式可以扩展）
    onPayTypeChange(e) {
        const payType = e.detail.value; // 获取选择的支付方式
        this.setData({
            payType,
        });
    },

    // 关闭弹窗
    onClose() {
        this.setData({
            show: false
        });
    },

    onChooseAvatar(e) {
        const { avatarUrl } = e.detail;
        this.setData({
            avatarUrl
        });
    },
});
