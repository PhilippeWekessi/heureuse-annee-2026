import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";

export default function App() {
  const params = new URLSearchParams(window.location.search);

  const defaultScreens = [
    params.get("m1") || "Wekessi Philippe",
    params.get("m2") || "vous souhaite une bonne et heureuse année 2026,",
    params.get("m3") || "Année remplie de joie, de succès et de bonheur 🎊",
    params.get("m4") ||
      "Que la grâce du Seigneur Jésus-Christ, l'amour de Dieu, et la communication du Saint Esprit, soient avec vous tous !\n2 Corinthiens 13:13",
  ];

  const [step, setStep] = useState(0);
  const [custom, setCustom] = useState([...defaultScreens]);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (step < 3) {
      const timer = setTimeout(() => setStep(step + 1), 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const updateCustom = (index, value) => {
    const copy = [...custom];
    copy[index] = value;
    setCustom(copy);
  };
  const baseUrl = window.location.origin + window.location.pathname;

  const link =
    baseUrl +
    `?m1=${encodeURIComponent(custom[0])}` +
    `&m2=${encodeURIComponent(custom[1])}` +
    `&m3=${encodeURIComponent(custom[2])}` +
    `&m4=${encodeURIComponent(custom[3])}`;

  
  const handleValidate = () => {
    if (custom.some((txt) => !txt.trim())) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    setValidated(true);
  };

  const share = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(link)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(link)}`,
  };

  return (
    <div className="container">
      <AnimatePresence mode="wait">
        {/* Interfaces 1 → 4 */}
        {step < 4 && (
          <motion.div
            key={step}
            className="screen"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text">{defaultScreens[step]}</div>

            {step === 3 && (
              <button className="generate-btn" onClick={() => setStep(4)}>
                Générer pour toi
              </button>
            )}
          </motion.div>
        )}

        {/* Interface 5 */}
        {step === 4 && (
          <motion.div
            className="form"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2>✨ Crée ton propre message</h2>

            {custom.map((value, i) => (
              <textarea
                key={i}
                rows="2"
                placeholder={`Phrase ${i + 1}`}
                value={value}
                onChange={(e) => updateCustom(i, e.target.value)}
              />
            ))}

            {!validated && (
              <button onClick={handleValidate}>Valider</button>
            )}

            {validated && (
              <>
                <p className="success">✅ Validé avec succès</p>

                <div className="share">
                  <a href={share.whatsapp} target="_blank">
                    WhatsApp
                  </a>
                  <a href={share.telegram} target="_blank">
                    Telegram
                  </a>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(link);
                      alert("Lien copié pour Instagram / TikTok");
                    }}
                  >
                    Instagram / TikTok
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
