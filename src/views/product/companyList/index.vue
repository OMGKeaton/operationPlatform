<template>
  <div>
    <!-- 查询表单 -->
    <el-form :inline="true" label-width="100px" class="query-form">
      <el-form-item label="公司ID">
        <el-input v-model="companyId" placeholder="请输入公司ID" clearable />
      </el-form-item>

      <el-form-item label="公司名称">
        <el-input
          v-model="companyName"
          placeholder="请输入公司名称"
          clearable
        />
      </el-form-item>

      <el-form-item label="编码">
        <el-input v-model="code" placeholder="请输入编码" clearable />
      </el-form-item>

      <el-form-item label="后台账户名">
        <el-input v-model="username" placeholder="请输入后台账户名" clearable />
      </el-form-item>

      <el-form-item label="后台密码">
        <el-input v-model="password" placeholder="请输入后台密码" clearable />
      </el-form-item>

      <el-form-item label="合同状态">
        <el-select
          style="width: 100px"
          v-model="state"
          placeholder="请选择合同状态"
          clearable
        >
          <el-option label="未开始" :value="0" />
          <el-option label="已开始" :value="1" />
        </el-select>
      </el-form-item>

      <el-form-item label="合同开始时间">
        <el-date-picker
          v-model="startTimeRange"
          type="daterange"
          range-separator="到"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>

      <el-form-item label="合同结束时间">
        <el-date-picker
          v-model="endTimeRange"
          type="daterange"
          range-separator="到"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据表格 -->
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="companyId" label="公司ID" width="120" />
      <el-table-column prop="companyName" label="公司名称" width="180" />
      <el-table-column prop="code" label="编码" width="120" />
      <el-table-column prop="username" label="后台账户名" width="150" />
      <el-table-column prop="password" label="后台密码" width="150" />
      <el-table-column prop="state" label="合同状态" width="120">
        <template #default="{ row }">
          <el-tag :type="row.state === 1 ? 'success' : 'info'">
            {{ row.state === 1 ? '已开始' : '未开始' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="firstStartTime" label="合同开始时间" width="160" />
      <el-table-column
        prop="firstEndTime"
        label="合同开始结束时间"
        width="160"
      />
      <el-table-column
        prop="secondStartTime"
        label="合同结束开始时间"
        width="160"
      />
      <el-table-column
        prop="secondEndTime"
        label="合同结束结束时间"
        width="160"
      />
      <el-table-column prop="remainder" label="剩余时间" width="120" />
    </el-table>

    <!-- 分页 -->
    <div style="margin-top: 20px; text-align: right">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :current-page="pageNum"
        :page-size="pageSize"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { getCompanyList } from '@/api/companyList'

const companyId = ref<string>('')
const companyName = ref<string>('')
const code = ref<string>('')
const username = ref<string>('')
const password = ref<string>('')
const state = ref<number | undefined>(undefined)
const firstStartTime = ref<string>('')
const firstEndTime = ref<string>('')
const secondStartTime = ref<string>('')
const secondEndTime = ref<string>('')
const remainder = ref<number | undefined>(undefined)

// 页码和每页大小
const pageNum = ref<number>(1)
const pageSize = ref<number>(10)

// 日期区间
const startTimeRange = ref<[string, string] | undefined>(undefined)
const endTimeRange = ref<[string, string] | undefined>(undefined)

// 表格数据和分页
const tableData = ref<any[]>([])
const total = ref<number>(0)

// 监听日期范围变化
watch(startTimeRange, (val) => {
  if (val) {
    firstStartTime.value = val[0]
    firstEndTime.value = val[1]
  } else {
    firstStartTime.value = ''
    firstEndTime.value = ''
  }
})

watch(endTimeRange, (val) => {
  if (val) {
    secondStartTime.value = val[0]
    secondEndTime.value = val[1]
  } else {
    secondStartTime.value = ''
    secondEndTime.value = ''
  }
})

// 获取数据函数
const fetchTableData = async (page = 1) => {
  pageNum.value = page
  const res = await getCompanyList({
    companyId: companyId.value,
    companyName: companyName.value,
    code: code.value,
    username: username.value,
    password: password.value,
    state: state.value,
    firstStartTime: firstStartTime.value,
    firstEndTime: firstEndTime.value,
    secondStartTime: secondStartTime.value,
    secondEndTime: secondEndTime.value,
    pageNum: pageNum.value,
    pageSize: pageSize.value,
  })
  if (res.ok) {
    total.value = res.data.total
    tableData.value = res.data.list
  }
}

// 查询
const handleSearch = () => {
  pageNum.value = 1
  fetchTableData()
}

// 重置
const handleReset = () => {
  companyId.value = ''
  companyName.value = ''
  code.value = ''
  username.value = ''
  password.value = ''
  state.value = undefined
  firstStartTime.value = ''
  firstEndTime.value = ''
  secondStartTime.value = ''
  secondEndTime.value = ''
  remainder.value = undefined
  pageNum.value = 1
  pageSize.value = 10
  startTimeRange.value = undefined
  endTimeRange.value = undefined
  fetchTableData()
}

// 页码变化
const handlePageChange = (page: number) => {
  pageNum.value = page
  fetchTableData(page)
}

// 每页大小变化
const handleSizeChange = (size: number) => {
  pageSize.value = size
  fetchTableData(1)
}

// 初始化数据
onMounted(() => {
  fetchTableData()
})
</script>
