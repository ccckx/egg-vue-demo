<template>
  <div>
    个人中心{{ a }}
    <div @click="goPage">
       跳转地址
    </div>
  </div>
</template>

<script>
import { get } from '../api/index'
export default {
  components: {},

  data () {
    return {
      a: ''
    };
  },

  methods: {
    goPage() {
      this.$router.push({
        name: 'address'
      })
    }
  },

  async created() {
    const a = await get('/a')
    this.a = a.data
  }
}

</script>
<style lang='less' scoped>
</style>