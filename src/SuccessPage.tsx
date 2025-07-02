import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Copy } from "lucide-react";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { txHash, boughtProduct } = location.state || {};

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Hash copiato negli appunti!");
    } catch (err) {
      console.error("Errore nel copiare:", err);
    }
  };

  const formatHash = (hash: string) => {
    return `${hash.slice(0, 6)}...${hash.slice(-6)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Prenotazione Confermata!
          </h1>
          <p className="text-gray-600">
            Il tuo viaggio è stato prenotato con successo
          </p>
        </div>

        {/* Trip Summary */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">
            Dettagli del Viaggio
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Destinazione:</span>
              <span className="font-medium text-gray-900">
                {boughtProduct.destination}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Data:</span>
              <span className="font-medium text-gray-900">
                {boughtProduct.date}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Durata:</span>
              <span className="font-medium text-gray-900">
                {boughtProduct.duration}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Partecipanti:</span>
              <span className="font-medium text-gray-900">
                {boughtProduct.participants}
              </span>
            </div>

            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="text-gray-600">Totale Pagato:</span>
              <span className="font-bold text-green-600">
                {boughtProduct.price} ETH
              </span>
            </div>
          </div>
        </div>

        {/* Transaction Info */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Hash Transazione</h4>
          <div className="flex items-center justify-between bg-white rounded-lg p-3">
            <span className="font-mono text-sm text-gray-600">
              {formatHash(txHash)}
            </span>
            <button
              onClick={() => copyToClipboard(txHash)}
              className="ml-2 p-1 hover:bg-gray-100 rounded"
              title="Copia hash completo"
            >
              <Copy className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Clicca per copiare l'hash completo
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/app/trips")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Visualizza I Miei Viaggi
          </button>

          <button
            onClick={() => navigate("/app")}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg border border-gray-300 transition-colors duration-200"
          >
            Esplora Altre Destinazioni
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Riceverai una email di conferma a breve.
            <br />
            Per assistenza contatta il nostro supporto.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
