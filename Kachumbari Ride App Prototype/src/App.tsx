import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { SignUpScreen } from './components/SignUpScreen';
import { HomeScreen } from './components/HomeScreen';
import { LocationSelectScreen } from './components/LocationSelectScreen';
import { FareEstimateScreen } from './components/FareEstimateScreen';
import { SearchingDriverScreen } from './components/SearchingDriverScreen';
import { DriverFoundScreen } from './components/DriverFoundScreen';
import { TripProgressScreen } from './components/TripProgressScreen';
import { TripCompletedScreen } from './components/TripCompletedScreen';
import { RatingScreen } from './components/RatingScreen';
import { RideHistoryScreen } from './components/RideHistoryScreen';
import { DriverSplashScreen } from './components/DriverSplashScreen';
import { DriverLoginScreen } from './components/DriverLoginScreen';
import { DriverDashboard } from './components/DriverDashboard';
import { IncomingRideRequest } from './components/IncomingRideRequest';
import { NavigationToPickup } from './components/NavigationToPickup';
import { DriverTripProgress } from './components/DriverTripProgress';
import { DriverTripCompleted } from './components/DriverTripCompleted';
import { DriverEarnings } from './components/DriverEarnings';

export type PassengerScreen = 
  | 'splash'
  | 'login'
  | 'signup'
  | 'home'
  | 'location-select'
  | 'fare-estimate'
  | 'searching-driver'
  | 'driver-found'
  | 'trip-progress'
  | 'trip-completed'
  | 'rating'
  | 'ride-history';

export type DriverScreen =
  | 'driver-splash'
  | 'driver-login'
  | 'driver-dashboard'
  | 'incoming-request'
  | 'navigation-pickup'
  | 'driver-trip-progress'
  | 'driver-trip-completed'
  | 'driver-earnings';

export type AppMode = 'passenger' | 'driver';

export default function App() {
  const [appMode, setAppMode] = useState<AppMode>('passenger');
  const [passengerScreen, setPassengerScreen] = useState<PassengerScreen>('splash');
  const [driverScreen, setDriverScreen] = useState<DriverScreen>('driver-splash');
  
  const [pickupLocation, setPickupLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');
  const [fareAmount, setFareAmount] = useState(0);

  useEffect(() => {
    // Auto-advance from splash screen
    if (passengerScreen === 'splash') {
      const timer = setTimeout(() => {
        setPassengerScreen('login');
      }, 2500);
      return () => clearTimeout(timer);
    }
    if (driverScreen === 'driver-splash') {
      const timer = setTimeout(() => {
        setDriverScreen('driver-login');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [passengerScreen, driverScreen]);

  // Mode switcher for demo purposes
  const ModeSwitcher = () => (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <button
        onClick={() => setAppMode('passenger')}
        className={`px-3 py-1 rounded-full text-xs ${
          appMode === 'passenger'
            ? 'bg-[#2563EB] text-white'
            : 'bg-white text-gray-600 border border-gray-300'
        }`}
      >
        Passenger
      </button>
      <button
        onClick={() => setAppMode('driver')}
        className={`px-3 py-1 rounded-full text-xs ${
          appMode === 'driver'
            ? 'bg-[#2563EB] text-white'
            : 'bg-white text-gray-600 border border-gray-300'
        }`}
      >
        Driver
      </button>
    </div>
  );

  if (appMode === 'passenger') {
    return (
      <div className="min-h-screen bg-gray-50">
        <ModeSwitcher />
        {passengerScreen === 'splash' && <SplashScreen />}
        {passengerScreen === 'login' && (
          <LoginScreen
            onLogin={() => setPassengerScreen('home')}
            onSignUp={() => setPassengerScreen('signup')}
          />
        )}
        {passengerScreen === 'signup' && (
          <SignUpScreen onSignUp={() => setPassengerScreen('home')} />
        )}
        {passengerScreen === 'home' && (
          <HomeScreen
            onSearchClick={() => setPassengerScreen('location-select')}
            onHistoryClick={() => setPassengerScreen('ride-history')}
          />
        )}
        {passengerScreen === 'location-select' && (
          <LocationSelectScreen
            onConfirm={(pickup, destination) => {
              setPickupLocation(pickup);
              setDestinationLocation(destination);
              setPassengerScreen('fare-estimate');
            }}
            onBack={() => setPassengerScreen('home')}
          />
        )}
        {passengerScreen === 'fare-estimate' && (
          <FareEstimateScreen
            pickup={pickupLocation}
            destination={destinationLocation}
            onSelectVehicle={(vehicle, fare) => {
              setSelectedVehicle(vehicle);
              setFareAmount(fare);
              setPassengerScreen('searching-driver');
            }}
            onBack={() => setPassengerScreen('location-select')}
          />
        )}
        {passengerScreen === 'searching-driver' && (
          <SearchingDriverScreen
            onDriverFound={() => setPassengerScreen('driver-found')}
            onCancel={() => setPassengerScreen('home')}
          />
        )}
        {passengerScreen === 'driver-found' && (
          <DriverFoundScreen
            pickup={pickupLocation}
            destination={destinationLocation}
            vehicleType={selectedVehicle}
            onStartTrip={() => setPassengerScreen('trip-progress')}
            onCancel={() => setPassengerScreen('home')}
          />
        )}
        {passengerScreen === 'trip-progress' && (
          <TripProgressScreen
            destination={destinationLocation}
            onTripComplete={() => setPassengerScreen('trip-completed')}
          />
        )}
        {passengerScreen === 'trip-completed' && (
          <TripCompletedScreen
            fare={fareAmount}
            onRate={() => setPassengerScreen('rating')}
          />
        )}
        {passengerScreen === 'rating' && (
          <RatingScreen onComplete={() => setPassengerScreen('home')} />
        )}
        {passengerScreen === 'ride-history' && (
          <RideHistoryScreen onBack={() => setPassengerScreen('home')} />
        )}
      </div>
    );
  }

  // Driver mode
  return (
    <div className="min-h-screen bg-gray-50">
      <ModeSwitcher />
      {driverScreen === 'driver-splash' && <DriverSplashScreen />}
      {driverScreen === 'driver-login' && (
        <DriverLoginScreen onLogin={() => setDriverScreen('driver-dashboard')} />
      )}
      {driverScreen === 'driver-dashboard' && (
        <DriverDashboard
          onIncomingRequest={() => setDriverScreen('incoming-request')}
          onViewEarnings={() => setDriverScreen('driver-earnings')}
        />
      )}
      {driverScreen === 'incoming-request' && (
        <IncomingRideRequest
          onAccept={() => setDriverScreen('navigation-pickup')}
          onReject={() => setDriverScreen('driver-dashboard')}
        />
      )}
      {driverScreen === 'navigation-pickup' && (
        <NavigationToPickup
          onArrived={() => setDriverScreen('driver-trip-progress')}
        />
      )}
      {driverScreen === 'driver-trip-progress' && (
        <DriverTripProgress
          onComplete={() => setDriverScreen('driver-trip-completed')}
        />
      )}
      {driverScreen === 'driver-trip-completed' && (
        <DriverTripCompleted onDone={() => setDriverScreen('driver-dashboard')} />
      )}
      {driverScreen === 'driver-earnings' && (
        <DriverEarnings onBack={() => setDriverScreen('driver-dashboard')} />
      )}
    </div>
  );
}