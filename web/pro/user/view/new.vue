<template>
  <div>
    地址
    <div @click="goPage">
      跳转个人中心
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  data () {
    return {
    };
  },

  methods: {
    goPage() {
      this.$router.push({
        name: 'user'
      })
    }
  },

  mounted() {}
}

</script>
<style lang='less' scoped>
</style>