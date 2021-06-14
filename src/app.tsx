import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/login';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';

const isDev = process.env.NODE_ENV === 'development';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser: API.CurrentUser;
  isGuest: boolean;
  fetchUserInfo: () => Promise<API.CurrentUser>;
}> {
  const fetchUserInfo = async (): Promise<API.CurrentUser> => {
    try {
      const { data } = await queryCurrentUser();
      const currentUser = data;
      return currentUser;
    } catch (error) {
      history.push('/user/login');
    }
    return {
      id: '',
      organizationId: '',
      username: '',
      roleType: 0,
    };
  };
  // 如果是登录页面，不执行
  const currentUser = await fetchUserInfo();
  // if (history.location.pathname !== '/user/login') {
  //   return {
  //     fetchUserInfo,
  //     currentUser,
  //     isGuest: false,
  //     settings: {},
  //   };
  // }
  return {
    fetchUserInfo,
    currentUser,
    isGuest: false,
    settings: {},
  };
}

// https://umijs.org/zh-CN/plugins/plugin-layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // // 如果没有登录，重定向到 login
      if (
        !initialState?.currentUser &&
        location.pathname !== '/user/login' &&
        !initialState?.isGuest
      ) {
        history.push('/user/login');
      }
    },
    links: isDev
      ? [
          <>
            <LinkOutlined />
            <span
              onClick={() => {
                window.open('/umi/plugin/openapi');
              }}
            >
              openAPI 文档
            </span>
          </>,
          <>
            <BookOutlined />
            <span
              onClick={() => {
                window.open('/~docs');
              }}
            >
              业务组件文档
            </span>
          </>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};
