/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
interface routeType {
  path: string;
  name: string;
  icon: string;
  rules: number[];
  access: string;
  component: string;
}
export default function access(initialState: {
  currentUser?: API.CurrentUser | undefined;
  isGuest: boolean;
}) {
  const { currentUser, isGuest } = initialState || {};
  return {
    // 路由菜单权限
    adminRouteFilter: (route: routeType) => {
      if (isGuest) {
        const rules: number = 99;
        return route.rules?.includes(rules);
      }
      if (currentUser?.roleType) {
        return route.rules?.includes(currentUser.roleType);
      }
      return false;
    },
  };
}
