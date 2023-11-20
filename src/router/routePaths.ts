export const PATHS = {
  home: () => '/',
  profile: () => '/profile',
  notFound: () => '/404',
  all: () => '*',
};

export const routes = PATHS;

export const privateRoutes = [routes.profile()];
export const publicRoutes = [routes.home()];
