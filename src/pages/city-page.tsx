import CurrentWeather from "@/components/current-weather";
import FavoriteButton from "@/components/favorite-button";
import HourlyTemperature from "@/components/hourly-temperature";
import { WeatherSkeleton2 } from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WeatherDetails from "@/components/weather-details";
import WeatherForecast from "@/components/weather-forecast";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";

const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();

  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          Faild to fetch weather data. Please try again
        </AlertDescription>
      </Alert>
    );
  }

  if (weatherQuery.error || forecastQuery.error || !params.cityName) {
    return <WeatherSkeleton2 />;
  }

  return (
    <div className="space-y-4">
      {/* Favorite Cities */}
      <div className="flex items-center justify-between ">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.cityName}, {weatherQuery.data?.sys.country}
        </h1>

        {/* Favorite Button */}
        <div className="">
          {weatherQuery.data && (
            <FavoriteButton
              data={{ ...weatherQuery.data, name: params.cityName }}
            />
          )}
        </div>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col gap-4">
          {/* Current Temperature */}
          <CurrentWeather data={weatherQuery.data} />

          {/* Hourly Temperature */}
          <HourlyTemperature data={forecastQuery.data} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* Weather Details */}
          <WeatherDetails data={weatherQuery.data} />

          {/* forecast */}
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default CityPage;
