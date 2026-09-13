import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  FileText,
  Navigation,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_INFO } from '../data/senelaboData';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Demande de devis étude de sol',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-3"
        >
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Implantation & Contact Direct</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
            Prenez contact avec le laboratoire central de Dakar
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Nos ingénieurs et techniciens vous accueillent pour le dépôt de vos éprouvettes de béton, prélèvements de sol et l'analyse de vos dossiers d'appels d'offres.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Official details & Map Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            
            <div className="bg-slate-800/90 rounded-2xl p-6 sm:p-7 border border-slate-700 space-y-6">
              <h3 className="text-lg font-bold font-display text-white border-b border-slate-700 pb-3">
                Siège Social & Laboratoire Principal
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Adresse géographique :</span>
                    <strong className="text-white text-sm">{COMPANY_INFO.address}</strong>
                    <p className="text-slate-400 text-xs mt-0.5">{COMPANY_INFO.bp}, Dakar, Sénégal</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Standard Téléphonique :</span>
                    <a href={`tel:${COMPANY_INFO.phone}`} className="text-white font-bold hover:text-amber-400 text-sm">
                      {COMPANY_INFO.phone}
                    </a>
                    <p className="text-slate-400 text-xs mt-0.5">Fax : {COMPANY_INFO.fax}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Courriel officiel :</span>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-amber-400 font-semibold hover:underline text-sm">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs">Horaires d'ouverture & Dépôt d'échantillons :</span>
                    <p className="text-white font-medium">{COMPANY_INFO.hours}</p>
                  </div>
                </div>
              </div>

              {/* Direct quick action WhatsApp */}
              <div className="pt-2 border-t border-slate-700">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={`https://wa.me/221338607800?text=Bonjour%20Senelabo%20BTP,%20je%20souhaite%20des%20renseignements%20pour%20une%20étude%20géotechnique.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors shadow"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contacter l'Assistance Technique WhatsApp</span>
                </motion.a>
              </div>
            </div>

            {/* Simulated Map visual card */}
            <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span>Repère Géographique Dakar</span>
                </span>
                <span className="text-[11px] text-amber-400 font-mono">14.7167° N, 17.4677° W</span>
              </div>
              <div className="h-44 rounded-xl bg-slate-900 relative overflow-hidden border border-slate-700/80 flex items-center justify-center">
                {/* Stylized vector map background */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mx-auto mb-2 animate-bounce">
                      <MapPin className="w-5 h-5 text-amber-400" />
                    </div>
                    <p className="text-xs font-bold text-white">SENELABO BTP S.A.</p>
                    <p className="text-[11px] text-slate-400">139 SOTRAC Mermoz - Ancienne Piste</p>
                    <a
                      href="https://maps.google.com/?q=Senelabo+BTP+Dakar+Mermoz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-[10px] bg-amber-500 text-slate-950 px-2.5 py-1 rounded font-bold hover:bg-amber-400 transition-colors"
                    >
                      Ouvrir dans Google Maps ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Contact Inquiry Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-700 space-y-6"
          >
            <h3 className="text-lg font-bold font-display text-white border-b border-slate-700 pb-3">
              Envoyer une Demande d'Étude ou Poser une Question
            </h3>

            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">
                        Votre Nom & Prénom *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        placeholder="Ex: Abdoulaye Ndiaye"
                        className="w-full text-xs p-3 rounded-xl border border-slate-600 bg-slate-900 text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">
                        Numéro de Téléphone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({...formState, phone: e.target.value})}
                        placeholder="Ex: +221 77 000 00 00"
                        className="w-full text-xs p-3 rounded-xl border border-slate-600 bg-slate-900 text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Adresse Email Professionnelle *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      placeholder="Ex: contact@votre-entreprise.com"
                      className="w-full text-xs p-3 rounded-xl border border-slate-600 bg-slate-900 text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Objet de votre demande :
                    </label>
                    <select
                      value={formState.subject}
                      onChange={(e) => setFormState({...formState, subject: e.target.value})}
                      className="w-full text-xs p-3 rounded-xl border border-slate-600 bg-slate-900 text-white focus:border-amber-500 focus:outline-none"
                    >
                      <option value="Demande de devis étude de sol G2 AVP/PRO">Demande de devis étude de sol G2 AVP/PRO (Bâtiment R+X)</option>
                      <option value="Auscultation routière au déflectographe">Auscultation routière au déflectographe (AGEROUTE / Voirie)</option>
                      <option value="Essais d'écrasement béton & contrôle matériaux">Essais d'écrasement béton & contrôle matériaux (Salle normalisée)</option>
                      <option value="Reconnaissance minière & forages profonds">Reconnaissance minière & forages profonds (Wireline HQ/NQ)</option>
                      <option value="Demande de partenariat ou réponse à Appel d'Offres">Demande de partenariat ou réponse à Appel d'Offres</option>
                      <option value="Autre demande technique">Autre demande technique</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Détails du projet ou du besoin *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      placeholder="Précisez la nature de l'ouvrage, le lieu d'implantation, les contraintes de délais..."
                      className="w-full text-xs p-3 rounded-xl border border-slate-600 bg-slate-900 text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-3.5 px-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Envoyer mon message au Bureau d'Études</span>
                    </motion.button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 text-center space-y-4 bg-slate-900 rounded-xl border border-slate-700"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">Message transmis avec succès !</h4>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                    Merci {formState.name}. Notre secrétariat technique a bien reçu votre message et reviendra vers vous à l'adresse {formState.email} dans les meilleurs délais.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSent(false)}
                    className="text-xs text-amber-400 underline pt-2 hover:text-amber-300 cursor-pointer"
                  >
                    Envoyer un autre message
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
