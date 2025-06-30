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
  TrashIcon,
} from "@heroicons/react/24/outline";

interface Trip {
  id: string;
  destination: string;
  date: string;
  participants: number;
  price: string;
  duration: string;
  status: "upcoming" | "completed" | "cancelled";
  transactionHash: string;
  bookingDate: string;
  image: string;
}

enum TripFilter {
  ALL = "all",
  UPCOMING = "upcoming",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

const Trips: React.FC = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();

  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<TripFilter>(TripFilter.ALL);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  // Mock data per testing - sostituisci con chiamata blockchain
  const mockTrips: Trip[] = [
    {
      id: "1",
      destination: "Costa Rica Eco-Adventure",
      date: "2025-08-15",
      participants: 2,
      price: "0.5",
      duration: "7 giorni",
      status: "upcoming",
      transactionHash: "0x1234567890abcdef1234567890abcdef12345678",
      bookingDate: "2025-06-20",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: "2",
      destination: "Patagonia Wildlife Trek",
      date: "2025-03-10",
      participants: 1,
      price: "0.8",
      duration: "10 giorni",
      status: "completed",
      transactionHash: "0xabcdef1234567890abcdef1234567890abcdef12",
      bookingDate: "2025-01-15",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        // TODO: Implementa chiamata al contratto per recuperare i viaggi
        // const userTrips = await readContract({...});

        // Per ora usa mock data
        setTimeout(() => {
          setTrips(mockTrips);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Errore nel recuperare i viaggi:", error);
        setLoading(false);
      }
    };

    if (isConnected && address) {
      fetchTrips();
    } else {
      setLoading(false);
    }
  }, [isConnected, address]);

  // Filtra i viaggi in base al filtro attivo
  const filteredTrips = trips.filter((trip) => {
    if (activeFilter === TripFilter.ALL) return true;
    return trip.status === activeFilter;
  });

  const getStatusBadge = (status: Trip["status"]) => {
    const statusConfig = {
      upcoming: { color: "bg-blue-100 text-blue-800", text: "Prossimo" },
      completed: { color: "bg-green-100 text-green-800", text: "Completato" },
      cancelled: { color: "bg-red-100 text-red-800", text: "Cancellato" },
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
    return new Date(dateString).toLocaleDateString("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleViewDetails = (trip: Trip) => {
    setSelectedTrip(trip);
  };

  const handleCancelTrip = async (tripId: string) => {
    if (window.confirm("Sei sicuro di voler cancellare questo viaggio?")) {
      // TODO: Implementa logica di cancellazione
      console.log("Cancellazione viaggio:", tripId);
    }
  };

  // Loading Skeleton
  const TripCardSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300"></div>
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

  // Empty State
  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <MapPinIcon className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {activeFilter === TripFilter.ALL
          ? "Nessun viaggio prenotato"
          : `Nessun viaggio ${activeFilter}`}
      </h3>
      <p className="text-gray-500 mb-6">
        Inizia la tua avventura sostenibile esplorando le nostre destinazioni
      </p>
      <button
        onClick={() => navigate("/app")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
      >
        Esplora Destinazioni
      </button>
    </div>
  );

  // Trip Card Component
  const TripCard = ({ trip }: { trip: Trip }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={trip.image}
          alt={trip.destination}
          className="w-full h-48 object-cover"
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
            {trip.duration}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <UsersIcon className="w-4 h-4 mr-2" />
            {trip.participants} partecipant{trip.participants > 1 ? "i" : "e"}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <span className="font-bold text-green-600">{trip.price} ETH</span>

          <div className="flex gap-2">
            <button
              onClick={() => handleViewDetails(trip)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Visualizza dettagli"
            >
              <EyeIcon className="w-5 h-5" />
            </button>

            {trip.status === "upcoming" && (
              <button
                onClick={() => handleCancelTrip(trip.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Cancella viaggio"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            )}
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
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <img
              src={selectedTrip.image}
              alt={selectedTrip.destination}
              className="w-full h-48 object-cover rounded-lg mb-4"
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
                  {selectedTrip.transactionHash}
                </p>
              </div>

              <div className="pt-3 border-t">
                <div className="flex justify-between text-lg font-bold">
                  <span>Totale Pagato:</span>
                  <span className="text-green-600">
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

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Connetti il tuo Wallet
          </h2>
          <p className="text-gray-600 mb-6">
            Devi connettere il wallet per visualizzare i tuoi viaggi
          </p>
          <button
            onClick={() => navigate("/app")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg"
          >
            Connetti Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/app")}
                className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                I Miei Viaggi
              </h1>
            </div>

            {trips.length > 0 && (
              <span className="text-sm text-gray-500">
                {filteredTrips.length} di {trips.length} viaggi
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtri */}
        {trips.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {Object.values(TripFilter).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === filter
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                  }`}
                >
                  {filter === "all"
                    ? "Tutti"
                    : filter === "upcoming"
                    ? "Prossimi"
                    : filter === "completed"
                    ? "Completati"
                    : "Cancellati"}
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

      {/* Modal */}
      <TripDetailModal />
    </div>
  );
};

export default Trips;
