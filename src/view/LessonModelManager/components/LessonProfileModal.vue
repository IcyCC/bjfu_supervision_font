<template>
  <Modal
    :value="show"
    title="Title"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
    @on-visible-change="onShowChange">
    <Form :model="lesson">
      <span>课程名字:</span>
      <FormItem prop="lesson_name">
        <Input type="text" disabled v-model="lesson.lesson_name" placeholder="名字" :disabled="true">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <span>课程属性:</span>
      <FormItem prop="lesson_attribute">
        <Input type="text" disabled v-model="lesson.lesson_attribute" placeholder="课程属性" :disabled="true">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <span>课程状态:</span>
      <FormItem prop="lesson_state">
        <Input type="text" disabled v-model="lesson.lesson_state" placeholder="课程状态" :disabled="true">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="group_name" label="分配督导小组">
        <Select v-model="lesson.group_name" >
          <Option v-for="item in groups" :value="item.group_name" :key="item.group_name">{{ item.group_name }}</Option>
        </Select>
      </FormItem>
      <span>好评状态:</span>
      <FormItem prop="lesson_state">
        <Select v-model="lesson.status" style="width:100%">
          <Option value="推荐为好评课" >推荐为好评课</Option>
          <Option value="待商榷" >待商榷</Option>
        </Select>
      </FormItem>
      <FormItem prop="is_lock" style="width:100%" label="锁定状态:">
        <i-switch  v-model="lesson.is_lock" size="large"  :true-value="1" :false-value="0">
          <span slot="open" style="width:100%">锁定</span>
          <span slot="close" style="width:100%">非锁定</span>
        </i-switch>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import { getModelLesson } from '../../../service/api/lesson'
import { updateWithinField } from 'Libs/tools'
import { queryGroups } from '../../../service/api/user'
import { lessonLevel, lessonWatchReason } from '../marcos'
export default {
  name: 'LessonProfileModal',
  props: {
    show: Boolean,
    onCancel: Function,
    onOK: Function,
    lesson_id: Number
  },
  data: function () {
    return {
      lesson: {
        id: '',
        lesson_name: '',
        lesson_attribute: '',
        status: '',
        is_lock: 0
      },
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
    },
    onShowChange: function (show) {
      if (show) {
        // 显示的时候拉数据
        getModelLesson(this.lesson_id).then((resp) => {
          updateWithinField(this.lesson, resp.data.model_lesson)
        })
      }
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
