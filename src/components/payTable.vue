<template>
<el-table
	:data="data"
	border
	stripe
	max-height="320"
	style="width: 100%">
	<el-table-column
	  label="分期"
	  width="180">
	  <template slot-scope="scope">
        第{{ scope.row.month }}期
      </template>
	</el-table-column>
	<el-table-column
	  prop="price"
	  label="应还款"
	  width="180">
	</el-table-column>
	<el-table-column
	  prop="benJin"
	  label="本金">
	</el-table-column>
	<el-table-column
	  prop="interest"
	  label="利息">
	</el-table-column>
	<el-table-column
	  prop="hasPayBenJin"
	  label="已还本金">
	</el-table-column>
	<el-table-column
	  prop="hasPayInterest"
	  label="已付利息">
	</el-table-column>
	<el-table-column
	  prop="restPayBenJin"
	  label="剩余待还本金">
	</el-table-column>
	<el-table-column
	  prop="restPayInterest"
	  label="剩余利息">
	</el-table-column>
	<el-table-column
	  prop="interestRate"
	  label="已还利息占比">
	</el-table-column>
</el-table>
</template>

<script>
	
export default {
	props: {
		data: Array,
	},

}
</script>