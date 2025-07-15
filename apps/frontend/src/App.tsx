import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { observer } from "mobx-react-lite";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PortfolioPage from "./pages/Portfolio";
import StockDetailPage from "./pages/StockDetailPage";
import { AppLayout } from "./components/AppLayout/AppLayout";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { useAuth } from "./stores/useAuth";

const ProtectedRoute = observer(
  ({ children }: { children: React.ReactNode }) => {
    const auth = useAuth();
    return auth.isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
  }
);

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/portfolio"
              element={
                <ProtectedRoute>
                  <PortfolioPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stock/:symbol"
              element={
                <ProtectedRoute>
                  {/* StockDetailPage will be created */}
                  <StockDetailPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AppLayout>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
