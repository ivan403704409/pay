<template>
  <div id="app">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="贷款金额">
        <el-input v-model="form.total" type="number"></el-input>
      </el-form-item>
      <el-form-item label="年利率">
        <el-input v-model="form.rate" type="number"></el-input>
      </el-form-item>
      <el-form-item label="分期">
        <el-input v-model="form.month" type="number">
          <template slot="append">期</template>
        </el-input>
      </el-form-item>
      <el-form-item label="提前还10万">
        <el-input v-model="form.nthMonth" type="number">
          <template slot="prepend">第</template>
          <template slot="append">期后提前还</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">计算</el-button>
      </el-form-item>
    </el-form>

    <p>总利息: {{totalInterest}}</p>
    <p>已还本金: {{hasPayBenJin}}</p>
    <p>已付利息:  {{hasPayInterest}}</p>
    <p>剩余待还本金: {{restPayBenJin}}</p>



    <pay-table :data="tableData"></pay-table>

  </div>
</template>

<script>
import Pay from './pay.js'

import payTable from './components/payTable.vue'

export default {
  name: 'App',
  components: {
    payTable,
  },
  data(){
    return {
      form: {
        total: 730000,
        rate: 5.88,
        month: 360,
        nthMonth: 12,
      },
      totalInterest: 0,
      tableData: [],

      hasPayBenJin: 0,
      hasPayInterest: 0,
      restPayBenJin: 0,
    }
  },
  methods: {
    onSubmit(){
        let { total, rate, month, nthMonth } = this.form
        let oPay = new Pay({
            total,
            rate,
            month,
        })
        let totalInterest = oPay.getTotalInterest()
        this.totalInterest = totalInterest
        let tableData = []
        for(var i=1; i<=month; i++){
            
            let hasPayBenJin = oPay.getMutipleMonthBenJin(i)
            let hasPayInterest = oPay.getMutipleMonthInterest(i)
            let mutipleMonthInterest = oPay.getMutipleMonthInterest(i)

            let data = {
                month: i,
                price: oPay.getMonthPay(i),
                benJin: oPay.monthBenJin,
                interest: oPay.getMonthInterest(i),
                hasPayBenJin: hasPayBenJin,
                hasPayInterest: hasPayInterest,
                restPayBenJin: oPay.parse(total - hasPayBenJin),
                restPayInterest: oPay.parse(totalInterest - hasPayInterest),
                interestRate: oPay.parse((hasPayInterest / totalInterest) * 100) + '%'
            }
            tableData.push(data)
        }

        let oTmp = tableData[nthMonth-1]
        this.hasPayBenJin = oTmp.hasPayBenJin
        this.hasPayInterest = oTmp.hasPayInterest
        this.restPayBenJin = oTmp.restPayBenJin

        this.tableData = tableData
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
