import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import { ThemeProvider } from "./context/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import WeatherDashboard from "./pages/weather-dashboard";
import CityPage from "./pages/city-page";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <Layout>
            <Routes>
              <Route path="/" element={<WeatherDashboard />} />
              <Route path="/city/:cityName" element={<CityPage />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

// geocoding http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}
