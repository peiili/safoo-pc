export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
    ],
  },
  // {
  //   path: '/welcome',
  //   name: 'welcome',
  //   icon: 'smile',
  //   component: './Welcome',
  // },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'adminRouteFilter',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //   ],
  // },
  {
    path: '/userlist',
    name: 'userlist',
    icon: 'crown',
    rules: [2, 3, 4],
    access: 'adminRouteFilter',
    component: './UserList/index.tsx',
  },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   access: 'adminRouteFilter',
  //   component: './TableList',
  // },
  {
    name: 'device.list',
    path: '/devices/list',
    icon: 'table',
    rules: [4, 6],
    access: 'adminRouteFilter',
    component: './Device/List/index.tsx',
  },
  {
    path: '/',
    access: 'adminRouteFilter',
    redirect: '/account/center',
  },
  {
    path: '/organizationList',
    icon: 'PartitionOutlined',
    name: 'organization.list',
    rules: [2, 3, 9],
    access: 'adminRouteFilter',
    component: './Organization/List/index.tsx',
  },
  {
    path: '/departmentList',
    icon: 'PartitionOutlined',
    name: 'department.list',
    rules: [2, 3, 4],
    access: 'adminRouteFilter',
    component: './Department/List/index.tsx',
  },
  {
    path: '/departmentAudit',
    icon: 'SnippetsOutlined',
    name: 'department.audit',
    rules: [2, 3, 4, 5],
    access: 'adminRouteFilter',
    component: './Department/Audit/index.tsx',
  },

  {
    path: '/service',
    icon: 'CommentOutlined',
    name: 'service',
    rules: [9],
    access: 'adminRouteFilter',
    component: './Service/index.tsx',
  },
  {
    path: '/',
    redirect: '/account/center',
  },
  {
    path: '/account/center',
    icon: 'UserOutlined',
    name: 'account.center',
    component: './Account/center.tsx',
  },
  {
    path: '/download',
    name: 'download',
    icon: 'CloudDownloadOutlined',
    component: './Download/index.tsx',
  },
  {
    component: './404',
  },
];
