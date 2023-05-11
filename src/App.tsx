import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import POS from "./pages/POS";
import Settings from "./pages/Settings";
import History from "./pages/History";
import Layout from "./Layout";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  let path = useLocation().pathname;

  if (path === "/") {
    return <Navigate to="/pos" replace={true} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/pos" element={<POS />}></Route>

          <Route path="/settings" element={<Settings />}></Route>

          <Route path="/history" element={<History />}></Route>

          <Route path="*" element={<Navigate to="/pos" replace={true} />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
