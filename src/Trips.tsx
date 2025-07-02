import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import {
  CalendarDaysIcon,
  MapPinIcon,
  UsersIcon,
  ClockIcon,
  ChevronLeftIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import StickyHeader from "./StickyHeader";
import IPFSImage from "./IPFSImage";

interface Trip {
  id: string;
  destination: string;
  date: string;
  participants: number;
  price: string;
  duration: string;
  status: "prenotato" | "completato";
  transactionHash: string;
  bookingDate: string;
  image: string;
}

enum TripFilter {
  ALL = "all",
  completato = "completato",
}

const Trips: React.FC = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();

  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<TripFilter>(TripFilter.ALL);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  // Loads trips from localStorage
  const loadTripsFromStorage = () => {
    try {
      const storedTrips = localStorage.getItem("userTrips");
      if (storedTrips) {
        const parsedTrips = JSON.parse(storedTrips);
        return parsedTrips.filter(() => {
          return true;
        });
      }
      return [];
    } catch (error) {
      console.error("Errore nel caricare i viaggi:", error);
      return [];
    }
  };

  const determineStatus = (travelDate: string): "prenotato" | "completato" => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const travel = new Date(travelDate);
      travel.setHours(0, 0, 0, 0);

      return travel <= today ? "completato" : "prenotato";
    } catch {
      // Fallback
      return "prenotato";
    }
  };

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        if (isConnected && address) {
          // Loads from localStorage
          const userTrips = loadTripsFromStorage();

          // Actualize status
          const tripsWithStatus = userTrips.map((trip: any) => ({
            ...trip,
            status: determineStatus(trip.date),
          }));

          setTrips(tripsWithStatus);
        } else {
          setTrips([]);
        }
      } catch (error) {
        console.error("Errore nel recuperare i viaggi:", error);
        setTrips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [isConnected, address]);

  // FIlter trips
  const filteredTrips = trips.filter((trip) => {
    if (activeFilter === TripFilter.ALL) return true;
    return trip.status === activeFilter;
  });

  const getStatusBadge = (status: Trip["status"]) => {
    const statusConfig = {
      prenotato: { color: "bg-blue-100 text-blue-800", text: "Prenotato" },
      completato: { color: "bg-green-100 text-green-800", text: "Completato" },
    };

    const config = statusConfig[status];
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);

      // Verifying date
      if (isNaN(date.getTime())) {
        console.warn("Invalid date for formatting:", dateString);
        return dateString; // Return the original string if invalid
      }

      const formatted = date.toLocaleDateString("it-IT", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      return formatted;
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString; // Fallback if date is invalid
    }
  };

  const handleViewDetails = (trip: Trip) => {
    setSelectedTrip(trip);
  };

  // Loading skeleton
  const TripCardSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300 rounded-t-lg"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-300 rounded w-full"></div>
          <div className="h-3 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );

  // Empty state
  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <MapPinIcon className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {activeFilter === TripFilter.ALL
          ? "Nessun viaggio prenotato"
          : "Nessun viaggio completato"}
      </h3>
      <p className="text-gray-500 mb-6">
        {activeFilter === TripFilter.ALL
          ? "Inizia la tua avventura sostenibile esplorando le nostre destinazioni"
          : "I tuoi viaggi completati appariranno qui dopo la data di partenza"}
      </p>
      <button
        onClick={() => navigate("/app")}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
      >
        Esplora Destinazioni
      </button>
    </div>
  );

  // Trip Card Component - WITHOUT cancellation (for the moment)
  const TripCard = ({ trip }: { trip: Trip }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <IPFSImage
          src={trip.image}
          alt={trip.destination}
          className="w-full h-48"
          fallbackSrc="https://via.placeholder.com/300x200/10b981/ffffff?text=Viaggio"
        />
        <div className="absolute top-3 right-3">
          {getStatusBadge(trip.status)}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">
          {trip.destination}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <CalendarDaysIcon className="w-4 h-4 mr-2" />
            {formatDate(trip.date)}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <ClockIcon className="w-4 h-4 mr-2" />
            {trip.duration} giorni
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <UsersIcon className="w-4 h-4 mr-2" />
            {trip.participants} partecipant{trip.participants > 1 ? "i" : "e"}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <span className="font-bold text-emerald-600">{trip.price} ETH</span>

          <div className="flex gap-2">
            <button
              onClick={() => handleViewDetails(trip)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Visualizza dettagli"
            >
              <EyeIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Trip Detail Modal
  const TripDetailModal = () => {
    if (!selectedTrip) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Dettagli Viaggio
              </h2>
              <button
                onClick={() => setSelectedTrip(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ✕
              </button>
            </div>

            <IPFSImage
              src={selectedTrip.image}
              alt={selectedTrip.destination}
              className="w-full h-48 rounded-lg mb-4"
              fallbackSrc="https://via.placeholder.com/400x200/10b981/ffffff?text=Viaggio"
            />

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Destinazione
                </label>
                <p className="text-gray-900">{selectedTrip.destination}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Stato
                </label>
                <p className="text-gray-900">
                  {getStatusBadge(selectedTrip.status)}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Data Viaggio
                </label>
                <p className="text-gray-900">{formatDate(selectedTrip.date)}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Prenotato il
                </label>
                <p className="text-gray-900">
                  {formatDate(selectedTrip.bookingDate)}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Hash Transazione
                </label>
                <p className="text-gray-900 font-mono text-sm break-all">
                  <a
                    href={`https://sepolia.etherscan.io/tx/${selectedTrip.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {selectedTrip.transactionHash}
                  </a>
                </p>
              </div>

              <div className="pt-3 border-t">
                <div className="flex justify-between text-lg font-bold">
                  <span>Totale Pagato:</span>
                  <span className="text-emerald-600">
                    {selectedTrip.price} ETH
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom StickyHeader for Trips */}
      <StickyHeader />

      <div className="pt-20">
        {/* Header with custom navigation */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => navigate("/app")}
                  className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">
                  I Miei Viaggi
                </h1>
              </div>

              {/* New: Home button */}
              <div className="flex items-center gap-4">
                {trips.length > 0}

                <button
                  onClick={() => navigate("/app")}
                  className="px-4 py-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors font-medium"
                >
                  Home
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters - WITHOUT cancelled */}
          {trips.length > 0 && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {Object.values(TripFilter).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeFilter === filter
                        ? "bg-emerald-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                    }`}
                  >
                    {filter === "all" ? "Tutti" : "Completati"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <TripCardSkeleton key={i} />
                ))}
            </div>
          ) : filteredTrips.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          )}
        </div>
      </div>

      <TripDetailModal />
    </div>
  );
};

export default Trips;
