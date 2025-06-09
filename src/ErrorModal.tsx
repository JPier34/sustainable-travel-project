import React from "react";

type Props = {
  message: string;
  onClose: () => void;
};

const ErrorModal: React.FC<Props> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-lg text-center shadow-2xl">
        <h2 className="text-2xl font-extrabold text-red-600 mb-4">❌ Errore</h2>

        <p className="text-lg text-gray-800 mb-6">{message}</p>

        <div className="mt-4">
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 text-base"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
