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
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    // canAdmin: currentUser && currentUser.roleType === 9,
    adminRouteFilter: (route: routeType) => {
      // console.log(route)
      if (currentUser?.roleType) {
        return route.rules?.includes(currentUser.roleType);
      }
      return false;
    },
  };
}
