<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" icon="PLUS" @click="">添加平拍</el-button>
      <el-table style="margin: 10px 0px" border :data="trademarkArr">
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        ></el-table-column>
        <!-- table-column:默认展示数据用div -->
        <el-table-column label="品牌名称" prop="tmName"></el-table-column>
        <el-table-column label="品牌LOGO">
          <template #="{ row, $index }">
            <img :src="row.logoUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <!-- <template #="{ row, $index }">
                        <el-button type="primary" size="small" icon="Edit" @click="updateTrademark(row)"></el-button>
                        <el-popconfirm :title="`您确定要删除${row.tmName}?`" width="250px" icon="Delete"
                            @confirm='removeTradeMark(row.id)'>
                            <template #reference>
                                <el-button type="primary" size="small" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template> -->
        </el-table-column>
      </el-table>
      <!-- 分页器组件
                pagination
                   v-model:current-page:设置分页器当前页码
                   v-model:page-size:设置每一个展示数据条数
                   page-sizes:用于设置下拉菜单数据
                   background:设置分页器按钮的背景颜色
                   layout:可以设置分页器六个子组件布局调整
            -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="getHasTrademark"
        :pager-count="9"
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reqHasTrademark } from '@/api/product'
import { Records } from '@/api/product/type'
import { ref, onMounted, reactive, nextTick } from 'vue'

let trademarkArr = reactive<Records>([])
let total = ref<number>()
let pageNo = ref<number>(1)
let limit = ref<number>(3)
const addTrademark = () => {
  console.log('1')
}
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
  const res = await reqHasTrademark(pageNo.value, limit.value)
  if (res.code === 200) {
    trademarkArr = res.data.records
    total.value = res.data.total
  }
}
const sizeChange = () => {
  //当前每一页的数据量发生变化的时候，当前页码归1
  getHasTrademark()
}
onMounted(() => {
  getHasTrademark()
})
</script>

<style scoped></style>
