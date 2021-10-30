<template>
  <div>
    新闻
    <div @click="goPage">
      跳转首页 {{ bb }}
    </div>
  </div>
</template>

<script>
import { initData } from '../../../utils/base'
export default {
  async asyncData() {
    return {
      about: {
        bb: 'new数据'
      }
    }
  },
  components: {},
  data () {
    return {
      ssrStoreKey: 'about',
    };
  },

  methods: {
    goPage() {
      this.$router.push('/')
    }
  },

  mounted() {},

  created() {
    initData(this)
  }
}

</script>
<style lang='less' scoped>
</style>