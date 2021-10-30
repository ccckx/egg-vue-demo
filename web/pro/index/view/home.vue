<template>
  <div>
    用户：
    首页
    <div @click="goPage">
      跳转关于我们
    </div>
    <div>
      接口数据：{{ a }}
    </div>
    <div @click="aaa">
      {{bb}}
    </div>
    <router-view />
  </div>
</template>

<script>
import { initData } from '../../../utils/base'
import { get } from '../api/index'
export default {
  components: {},
  async asyncData() {
    const a = await get('/a')
    return {
      home: {
        a: a.data,
        ssrStoreKey: 'home'
      }
    }
  },
  data () {
    return {
      ssrStoreKey: 'home',
      bb: '44444'
    };
  },

  methods: {
    goPage() {
      this.$router.push({
        name: 'new1'
      })
    },
    aaa(){
      this.bb = 5555
    }
  },

  created() {
    initData(this)
  }
}

</script>
<style lang='less' scoped>
</style>