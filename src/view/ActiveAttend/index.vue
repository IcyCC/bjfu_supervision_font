<template>
  <div>
    <Card>
      <Tabs @on-click="onTypeTabClick">
        <TabPane label="可报名" name="可报名"></TabPane>
        <TabPane label="已报名" name="已报名"></TabPane>
      </Tabs>

      <template v-if="select_tag==='已报名'">
        <already-registered></already-registered>
      </template>
      <template v-else-if="select_tag==='可报名'">
        <can-register></can-register>
      </template>
    </Card>
  </div>
</template>

<script>
import alreadyRegistered from './components/alreadyRegistered'
import canRegister from './components/canRegister'

export default {
  components: {
    alreadyRegistered,
    canRegister
  },
  data: function () {
    return {
      select_tag: '可报名'
    }
  },
  computed: {
    currentPath: function () {
      return this.$route.path
    }
  },
  methods: {
    onTypeTabClick (value) {
      this.select_tag = value
    }
  }
}
</script>

<style scoped>

</style>
