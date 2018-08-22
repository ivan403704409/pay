
class Pay {
    /**
     * [constructor description]
     * @param  {[type]} options.total [总价]
     * @param  {[type]} options.month [分期]
     * @param  {[type]} options.rate  [年利率]
     * @return {[type]}               [description]
     */
    constructor({ total, month, rate }){
        this.total = total
        this.month = month
        this.rate = rate*0.01

        // 每月利率
        this.monthRate = this.rate / 12

        // 每月本金
        this.monthBenJin = this.total / this.month
    }

    // 保留两位小数
    parse(num){
        return +num.toFixed(2)
    }


    /**
     * 计算第N个月的利息
     * @param  {[type]} nthMonth [description]
     * @return {[type]}          [description]
     */
    getMonthInterest(nthMonth, noParse){
        let res = (this.total - this.monthBenJin*(nthMonth-1)) * this.monthRate
        if(noParse){
            return res
        }
        return this.parse(res)
    }

    /**
     * 获取第一个月到第n个月的利息
     * @param  {[type]} num [description]
     * @return {[type]}     [description]
     */
    getMutipleMonthInterest(num){
        let res = 0
        for(let i=1; i<=num; i++){
            res += this.getMonthInterest(i, true)
        }
        return this.parse(res)
    }

    /**
     * 计算总利息
     * @return {[type]} [description]
     */
    getTotalInterest(){
        let res = this.getMutipleMonthInterest(this.month)
        return this.parse(res)
    }

    /**
     * 计算还款n个月后, 还了多少本金
     * @param  {[type]} num [description]
     * @return {[type]}     [description]
     */
    getMutipleMonthBenJin(num){
        let res = this.monthBenJin*num
        return this.parse(res)
    }

    /**
     * 计算第N个月要还多少钱
     * @param  {[type]} nthMonth [description]
     * @return {[type]}          [description]
     */
    getMonthPay(nthMonth){
        let res = this.monthBenJin + this.getMonthInterest(nthMonth, true)
        return this.parse(res)
    }

    /**
     * 计算还款n个月后，一共还了多少本金，多少利息，还有多少本金没还，还有多少利息
     * @param  {[type]} num [description]
     * @return {[type]}     [description]
     */
    getCurPay_interest(num){
        let benJin = this.getMutipleMonthBenJin(num)
        let interest = this.getMutipleMonthInterest(num)
        let totalInterest = this.getTotalInterest()
        return {
            benJin: benJin,
            interest: interest,
            restBenJin: this.total - benJin,
            restInterest: totalInterest - interest,
            interestRate: this.parse((1 - interest / totalInterest) * 100)
        }
    }

}

var oPay = new Pay({
    total: 730000,
    month: 360,
    rate: 5.88
})

oPay.getMonthInterest(1)
oPay.getMutipleMonthInterest(12)
oPay.getCurPay_interest(360)

var tmp = []
for(var i=0; i<=360; i++){
    tmp.push( oPay.getCurPay_interest(i).interestRate )
}
JSON.stringify(tmp)