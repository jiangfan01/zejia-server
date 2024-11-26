Page({
    data: {
        baseFee: 0,
        hasExtraFee: false,
        extraFee: 0,
        remarks: '',
        totalFee: 0
    },

    onBaseFeeInput(e) {
        this.setData({baseFee: Number(e.detail)});
        this.calculateTotal();
    },

    toggleExtraFee(e) {
        this.setData({hasExtraFee: e.detail});
        this.calculateTotal();
    },

    onExtraFeeInput(e) {
        this.setData({extraFee: Number(e.detail.value)});
        this.calculateTotal();
    },

    onRemarksInput(e) {
        this.setData({remarks: e.detail.value});
    },

    calculateTotal() {
        const total = this.data.baseFee + (this.data.hasExtraFee ? this.data.extraFee : 0);
        this.setData({totalFee: total});
    },
    submitOrder() {
        wx.showModal({
            title: '确认结算',
            content: `
            总费用为 ${this.data.totalFee} 元。确认结算？
            结算后订单将会完成
            `,
            success: (res) => {
                if (res.confirm) {
                    // 显示结算成功的提示
                    wx.showToast({
                        title: '结算成功',
                        icon: 'success',
                        duration: 1000
                    });

                    // 清空费用信息
                    this.setData({
                        baseFee: 0,
                        hasExtraFee: false,
                        extraFee: 0,
                        remarks: '',
                        totalFee: 0
                    });

                    setTimeout(() => {
                        wx.navigateBack();
                    }, 500);
                }
            }
        });
    }


});
