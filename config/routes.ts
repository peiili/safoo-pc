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
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    path: '/userlist',
    name: 'userlist',
    icon: 'crown',
    component: './UserList/index.tsx',
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/organizationList',
    icon: 'PartitionOutlined',
    name: 'organization.list',
    component: './Organization/List/index.tsx',
  },
  {
    path: '/account/center',
    icon: 'UserOutlined',
    name: 'account.center',
    component: './Account/center.tsx',
  },
  {
    path: '/service',
    icon: 'CommentOutlined',
    name: 'service',
    component: './Service/index.tsx',
    // routes: [
    //   {
    //     path: '/service/production',
    //     icon: '',
    //     name: 'production',
    //     component: './Service/Production/index.tsx',
    //   },
    //   {
    //     path: '/service/install',
    //     icon: '',
    //     name: 'install',
    //     component: './Service/Install/index.tsx',
    //   },
    //   {
    //     path: '/service/repair',
    //     icon: '',
    //     name: 'repair',
    //     component: './Service/Repair/index.tsx',
    //   },
    //   {
    //     path: '/service/maintain',
    //     icon: '',
    //     name: 'maintain',
    //     component: './Service/Maintain/index.tsx',
    //   },
    // ]
  },
  {
    component: './404',
  },
];
