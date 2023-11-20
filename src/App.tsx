import AppRouters from "./router/AppRouters";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.scss";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: false },
  },
});
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <AppRouters />
    </QueryClientProvider>
  );
};

export default App;
