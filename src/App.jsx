import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Cart from "./pages/Cart";
import MenuDetails from "./pages/MenuDetails";
import Restaurant from "./pages/Restaurant";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import store from "./redux/store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000 * 60,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="landing" />} />
              <Route path="landing" element={<Landing />} />
              <Route path="cart" element={<Cart />} />
              <Route
                path="menu-details/:mealid/:restaurant"
                element={<MenuDetails />}
              />
              <Route
                path="restaurant/:restaurant/:mealid"
                element={<Restaurant />}
              />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
