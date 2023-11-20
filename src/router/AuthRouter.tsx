import { Navigate, useRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { PATHS } from "./routePaths";
import { useAuth } from "../hooks/useAuth";
import LoadingPage from "../components/Loading";
import Profile from "../pages/Profile";

const profilePath = "pages/Profile";
const Profiles = lazy(() =>
  import(profilePath).catch(() => {
    return { default: Profile };
  })
);
const Routers = () => {
  const { isAuth } = useAuth();

  const checkAuth = (element: React.ReactNode) => {
    
    if (!isAuth) {
      return <Navigate to={PATHS.home()} />;
    }

    return element;
  };

  const elements = useRoutes([
    {
      path: PATHS.profile(),
      element: checkAuth(<Profiles />),
    },
  ]);
  return elements;
};

export default function AuthRouter() {
  const { isAuth, isLoading } = useAuth();

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          {isAuth ? (
            <Suspense fallback={<div>....</div>}>
              <Routers />
            </Suspense>
          ) : (
            <Navigate to={PATHS.home()} />
          )}
        </>
      )}
    </>
  );
}
