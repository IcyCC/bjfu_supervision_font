<template>
  <Modal
    :value="show"
    title="Title"
    @on-ok="handleOK"
    @on-cancel="handleCancel">
    <Form :model="lesson">

      <FormItem prop="group_name" label="分配督导小组">
        <Select v-model="lesson.group_name" >
          <Option v-for="item in groups" :value="item.group_name" :key="item.group_name">{{ item.group_name }}</Option>
        </Select>
      </FormItem>

      <FormItem prop="lesson_attention_reason" label="关注原因">
        <Select v-model="lesson.lesson_attention_reason" >
          <Option v-for="item in lessonWatchReason" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import { queryGroups } from '../../../service/api/user'
import { lessonLevel, lessonWatchReason } from '../marcos'
export default {
  name: 'BatchLessonWatchModal',
  props: {
    show: Boolean,
    onCancel: Function,
    onOK: Function
  },
  data: function () {
    return {
      lesson: {},
      lessonLevel: lessonLevel,
      lessonWatchReason: lessonWatchReason, // 课程关注原因,
      groups: [] // 所有的小组
    }
  },
  methods: {
    handleOK: function () {
      this.$emit('onOK', this.lesson)
    },
    handleCancel: function () {
      this.$emit('onCancel')
    }
  },
  mounted: function () {
    queryGroups().then((resp) => {
      this.groups = resp.data.groups
    })
  }
}
</script>

<style scoped>

</style>
