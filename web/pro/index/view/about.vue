<template>
  <div>
    关于我们
    <div @click="goPage">
      跳转新闻
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
        name: 'new'
      })
    }
  },

  mounted() {}
}

</script>
<style lang='less' scoped>
  div{
    color: red
  }
</style>