import { Leaf, Users, TrendingUp } from "lucide-react";

const SustainabilityPillars = () => {
  const pillars = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Ambiente",
      description: "Compensiamo 120% delle emissioni",
      details:
        "Il nostro impegno per l'ambiente va oltre la neutralità carbonica. Investiamo in progetti di riforestazione e energia rinnovabile per creare un impatto positivo duraturo.",
      color: "emerald",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Comunità",
      description: "85% budget va alle comunità locali",
      details:
        "Crediamo nel potere delle comunità locali. La maggior parte dei nostri investimenti viene destinata a progetti che supportano direttamente le persone e i territori.",
      color: "blue",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Economia",
      description: "Creiamo 500+ posti lavoro sostenibili",
      details:
        "Il nostro modello economico si basa sulla creazione di opportunità durature, formando competenze e supportando l'imprenditorialità locale.",
      color: "amber",
    },
  ];

  type PillarColor = "emerald" | "blue" | "amber";

  const getColorClasses = (color: PillarColor) => {
    const colors = {
      emerald: {
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        icon: "text-emerald-600",
        title: "text-emerald-800",
        accent: "bg-emerald-500",
      },
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        icon: "text-blue-600",
        title: "text-blue-800",
        accent: "bg-blue-500",
      },
      amber: {
        bg: "bg-amber-50",
        border: "border-amber-200",
        icon: "text-amber-600",
        title: "text-amber-800",
        accent: "bg-amber-500",
      },
    };
    return colors[color];
  };

  return (
    <div className="w-auto px-4 py-20 bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="font-bold text-5xl text-green-700 mt-8 mb-20 text-left homepage-title">
          I Nostri Pilastri della Sostenibilità
        </h2>
        <p className="font-['Inter'] text-xl text-gray-600 max-w-3xl mx-auto">
          La Orizon ha più di 20 anni di esperienza nel turismo, e fonda la sua
          mission sull'idea che il turismo possa essere un motore di sviluppo
          sostenibile. I nostri progetti sono costruiti su tre pilastri
          fondamentali: <strong>Ambiente, Comunità ed Economia.</strong> Scopri
          come lavoriamo per creare un futuro migliore per tutti.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {pillars.map((pillar, index) => {
          const colorClass = getColorClasses(pillar.color as PillarColor);

          return (
            <div
              key={index}
              className={`group relative ${colorClass.bg} ${colorClass.border} border-2 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer`}
            >
              {/* Accent line */}
              <div
                className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 ${colorClass.accent} rounded-b-full`}
              ></div>

              {/* Icon */}
              <div
                className={`${colorClass.icon} mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                {pillar.icon}
              </div>

              {/* Title */}
              <h3
                className={`font-['Inter'] text-2xl font-bold ${colorClass.title} mb-4 text-center`}
              >
                {pillar.title}
              </h3>

              {/* Key metric */}
              <div
                className={`font-['Inter'] text-lg font-semibold ${colorClass.icon} text-center mb-4 p-3 bg-white rounded-lg shadow-sm`}
              >
                {pillar.description}
              </div>

              {/* Details */}
              <p className="font-['Inter'] text-gray-700 text-center leading-relaxed">
                {pillar.details}
              </p>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300"></div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="text-center">
        <p className="font-['Inter'] text-gray-600 mb-6">
          Vuoi saperne di più sui nostri progetti di sostenibilità?
        </p>
        <button className="font-['Inter'] bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
          Scopri di Più
        </button>
      </div>
    </div>
  );
};

export default SustainabilityPillars;
