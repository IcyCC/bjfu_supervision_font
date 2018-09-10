// 动态问卷相关的路由配置

export default[{
  name: "用户",
  path: "/user",
  component: resolve => require(['Views/index'], resolve),
  children: [
    {
      name: "用户管理",
      path: "guiders", // xzl
      meta: {
        visible: true
      },
      component: resolve => require(['Views/UserManager/index'], resolve),
    },
    {
      name: "督导管理",
      path: "teachers", // xzl
      meta: {
        visible: true
      },
      component: resolve => require(['Views/UserTeacherManagerList/index'], resolve),
    },
    {
      name: "学院负责人",
      path: "supers", // xzl
      meta: {
        visible: true
      },
      component: resolve => require(['Views/UserSuperManager/index'], resolve),
    },
    {
      path: "events/:username", // xzl
      meta: {
        visible: true
      },
      component: resolve => require(['Views/UserEvents/index'], resolve),
    },
  ]
}]
