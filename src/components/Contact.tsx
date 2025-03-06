import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ name: '', phone: '', message: '' });

  const validateField = (name: string, value: string) => {
    if (!value) return 'Este campo é obrigatório';
    if (name === 'phone' && !/^\(\d{2}\)\s\d{5}-\d{4}$/.test(value)) return 'Formato: (99) 99999-9999';
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error) || !formData.name || !formData.phone || !formData.message;
    if (!hasErrors) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', phone: '', message: '' });
        setErrors({ name: '', phone: '', message: '' });
        setSubmitted(false);
      }, 3000);
    }
  };

  const contactInfo = [
    { icon: <Phone className="h-6 w-6 text-[var(--color-accent)]" />, title: 'Telefone', value: '+55 48 99191-9791', link: 'tel:+5548991919791' },
    { icon: <MessageCircle className="h-6 w-6 text-[var(--color-accent)]" />, title: 'WhatsApp', value: '+55 48 99191-9791', link: 'https://wa.me/5548991919791' },
    { icon: <Mail className="h-6 w-6 text-[var(--color-accent)]" />, title: 'Email', value: 'contato@fhresolve.com.br', link: 'mailto:contato@fhresolve.com.br' },
    { icon: <MapPin className="h-6 w-6 text-[var(--color-accent)]" />, title: 'Localização', value: 'Ratones, Florianópolis - SC', link: 'https://maps.google.com/?q=Ratones,Florianópolis,SC' },
  ];

  return (
    <section id="contact" className="py-20 bg-[var(--color-light)] dark:bg-[var(--color-primary)]">
      <div className="container">
        <div className="animate-section text-center mb-12">
          <h2 className="section-title">Entre em Contato</h2>
          <p className="section-subtitle dark:text-opacity-80 max-w-3xl mx-auto">
            Estamos prontos para atender você. Solicite um orçamento agora!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="card dark:text-[var(--color-text)] h-full">
              <h3 className="text-2xl font-semibold mb-6 text-[var(--color-text)]">Informações de Contato</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 bg-[var(--color-neutral)]/20 dark:bg-[var(--color-dark)]/20 rounded-lg hover:bg-[var(--color-neutral)]/40 dark:hover:bg-[var(--color-dark)]/40 transition-colors"
                  >
                    <div className="mt-1">{info.icon}</div>
                    <div>
                      <h4 className="font-medium text-[var(--color-text)]">{info.title}</h4>
                      <p className="text-[var(--color-text)]/80 dark:text-opacity-80">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-8 p-6 bg-[var(--color-accent)]/10 dark:bg-[var(--color-accent)]/20 rounded-lg">
                <h4 className="font-semibold mb-2 text-[var(--color-text)]">Horário de Atendimento</h4>
                <p className="mb-1 text-[var(--color-text)] dark:text-opacity-80">Segunda a Sexta: 8h às 18h</p>
                <p className="text-[var(--color-text)] dark:text-opacity-80">Sábado: 8h às 12h</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="card dark:text-[var(--color-text)]">
              <h3 className="text-2xl font-semibold mb-6 text-[var(--color-text)]">Envie uma Mensagem</h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center p-8 bg-[var(--color-neutral)]/20 dark:bg-[var(--color-dark)]/20 rounded-lg"
                >
                  <CheckCircle className="h-16 w-16 text-[var(--color-secondary)] mb-4" />
                  <h4 className="text-xl font-semibold mb-2 text-[var(--color-text)]">Mensagem Enviada!</h4>
                  <p className="text-[var(--color-text)] dark:text-opacity-80 mb-4">Retornaremos em até 24 horas.</p>
                  <motion.button
                    onClick={() => setSubmitted(false)}
                    whileHover={{ scale: 1.05 }}
                    className="btn btn-primary"
                  >
                    Enviar Outra Mensagem
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-[var(--color-text)]">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-[var(--color-neutral)]/20 dark:border-[var(--color-dark)]/20'} focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] dark:bg-[var(--color-dark)] dark:text-[var(--color-text)] transition-all`}
                      placeholder="Seu nome"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2 text-[var(--color-text)]">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-[var(--color-neutral)]/20 dark:border-[var(--color-dark)]/20'} focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] dark:bg-[var(--color-dark)] dark:text-[var(--color-text)] transition-all`}
                      placeholder="(99) 99999-9999"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-[var(--color-text)]">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-[var(--color-neutral)]/20 dark:border-[var(--color-dark)]/20'} focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] dark:bg-[var(--color-dark)] dark:text-[var(--color-text)] transition-all`}
                      placeholder="Descreva o serviço que você precisa..."
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-primary flex items-center gap-2"
                    >
                      <Send className="h-5 w-5" />
                      Enviar Mensagem
                    </motion.button>
                    <motion.a
                      href="https://wa.me/5548991919791"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-outline flex items-center gap-2"
                    >
                      <MessageCircle className="h-5 w-5" />
                      WhatsApp
                    </motion.a>
                  </div>
                  <p className="text-sm text-[var(--color-secondary)] dark:text-opacity-80 mt-2">
                    * Aceitamos pagamento em até 12x sem juros no cartão.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;