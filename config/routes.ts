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
    component: './404',
  },
];
