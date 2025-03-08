import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail, MapPin, Send, CheckCircle, X, CreditCard } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ name: '', phone: '', message: '' });
  const [formTouched, setFormTouched] = useState({ name: false, phone: false, message: false });

  // Validação simplificada e melhorada
  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Nome é obrigatório';
        if (value.trim().length < 3) return 'Nome deve ter pelo menos 3 caracteres';
        return '';
      case 'phone': 
        if (!value.trim()) return 'Telefone é obrigatório';
        if (!/^\(\d{2}\)\s\d{5}-\d{4}$/.test(value)) return 'Formato: (99) 99999-9999';
        return '';
      case 'message':
        if (!value.trim()) return 'Mensagem é obrigatória';
        if (value.trim().length < 10) return 'Mensagem muito curta';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Apenas validar se o campo já foi tocado
    if (formTouched[name as keyof typeof formTouched]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormTouched(prev => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const formatPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      let formattedValue = value;
      if (value.length > 2) formattedValue = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      if (value.length > 7) formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      setFormData(prev => ({ ...prev, phone: formattedValue }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Marcar todos campos como tocados para validação
    setFormTouched({ name: true, phone: true, message: true });
    
    // Validar todos os campos
    const newErrors = {
      name: validateField('name', formData.name),
      phone: validateField('phone', formData.phone),
      message: validateField('message', formData.message)
    };
    setErrors(newErrors);
    
    const hasErrors = Object.values(newErrors).some(error => error);
    if (!hasErrors) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', phone: '', message: '' });
        setErrors({ name: '', phone: '', message: '' });
        setFormTouched({ name: false, phone: false, message: false });
        setSubmitted(false);
      }, 3000);
    }
  };

  const contactInfo = [
    { icon: <Phone className="h-5 w-5 text-[var(--color-accent)]" />, title: 'Telefone', value: '+55 48 99191-9791', link: 'tel:+5548991919791' },
    { icon: <MessageCircle className="h-5 w-5 text-[var(--color-accent)]" />, title: 'WhatsApp', value: '+55 48 99191-9791', link: 'https://wa.me/5548991919791' },
    { icon: <Mail className="h-5 w-5 text-[var(--color-accent)]" />, title: 'Email', value: 'contato@fhresolve.com.br', link: 'mailto:contato@fhresolve.com.br' },
    { icon: <MapPin className="h-5 w-5 text-[var(--color-accent)]" />, title: 'Localização', value: 'Ratones, Florianópolis - SC', link: 'https://maps.google.com/?q=Ratones,Florianópolis,SC' },
  ];

  // Classes para inputs mais limpas e concisas
  const inputClasses = (fieldName: string) => `w-full px-4 py-3 rounded-lg 
    ${
      errors[fieldName as keyof typeof errors] 
        ? 'border-red-500 focus:ring-red-500 bg-red-50/30'
        : formTouched[fieldName as keyof typeof formTouched] && !errors[fieldName as keyof typeof errors]
          ? 'border-green-500 focus:ring-green-500 bg-green-50/30' 
          : 'border-[var(--color-neutral)]/30 dark:border-[var(--color-neutral)]/20 focus:ring-[var(--color-accent)]'
    } 
    border focus:outline-none focus:ring-2 dark:bg-[var(--color-neutral)]/10 text-[var(--color-text)] dark:text-[var(--color-text)] transition-all`;

  return (
    <section id="contact" className="py-20 bg-white dark:bg-[var(--color-primary)]">
      <div className="container">
        <div className="text-center mb-12">
          <motion.span 
            className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-medium mb-4 "
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Fale Conosco
          </motion.span>
          <motion.h2 
            className="section-title text-[var(--color-dark)] "
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Entre em Contato
          </motion.h2>
          <motion.p 
            className="section-subtitle dark:text-opacity-80 max-w-3xl mx-auto text-[var(--color-dark)]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Estamos prontos para atender você. Solicite um orçamento agora!
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-[var(--color-neutral)]/5 rounded-xl p-6 shadow-sm border border-[var(--color-neutral)]/30 dark:border-[var(--color-neutral)]/10 h-full flex flex-col"
          >
            <h3 className="text-xl font-medium mb-6 text-[var(--color-text)] dark:text-[var(--color-text)]">Informações de Contato</h3>
            <div className="space-y-4 flex-grow">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5, backgroundColor: 'rgba(var(--color-accent-rgb), 0.05)' }}
                  className="flex items-start gap-4 p-4 bg-[var(--color-gray)] dark:bg-[var(--color-neutral)]/10 rounded-lg transition-all duration-300"
                >
                  <div className="mt-1">{info.icon}</div>
                  <div>
                    <h4 className="font-medium text-[var(--color-text)] dark:text-[var(--color-text)]">{info.title}</h4>
                    <p className="text-[var(--color-text)]/70 dark:text-[var(--color-text)]/70">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
            <motion.div 
              className="mt-8 p-5 bg-[var(--color-accent)]/5 dark:bg-[var(--color-accent)]/10 rounded-lg"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-medium mb-2 text-[var(--color-text)] dark:text-[var(--color-text)]">Horário de Atendimento</h4>
              <p className="mb-1 text-[var(--color-text)]/70 dark:text-[var(--color-text)]/70">Segunda a Sexta: 8h às 18h</p>
              <p className="text-[var(--color-text)]/70 dark:text-[var(--color-text)]/70">Sábado: 8h às 12h</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-[var(--color-neutral)]/5 rounded-xl p-6 shadow-sm border border-[var(--color-neutral)]/30 dark:border-[var(--color-neutral)]/10">
              <h3 className="text-xl font-medium mb-6 text-[var(--color-text)] dark:text-[var(--color-text)]">Envie uma Mensagem</h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center p-8 bg-[var(--color-accent)]/5 dark:bg-[var(--color-accent)]/10 rounded-lg"
                >
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <h4 className="text-xl font-medium mb-2 text-[var(--color-text)] dark:text-[var(--color-text)]">Mensagem Enviada!</h4>
                  <p className="text-[var(--color-text)]/70 dark:text-[var(--color-text)]/70 mb-4">Retornaremos em até 24 horas.</p>
                  <motion.button
                    onClick={() => setSubmitted(false)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 bg-[var(--color-accent)] text-white rounded-lg font-medium"
                  >
                    Enviar Outra Mensagem
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-[var(--color-text)] dark:text-[var(--color-text)]">
                      Nome Completo
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={inputClasses('name')}
                        placeholder="Seu nome"
                        aria-invalid={!!errors.name}
                        aria-describedby="name-error"
                      />
                      {formTouched.name && !errors.name && (
                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                      )}
                    </div>
                    {errors.name && (
                      <p id="name-error" className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <X size={14} /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2 text-[var(--color-text)] dark:text-[var(--color-text)]">
                      Telefone
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={formatPhone}
                        onBlur={handleBlur}
                        required
                        className={inputClasses('phone')}
                        placeholder="(99) 99999-9999"
                        aria-invalid={!!errors.phone}
                        aria-describedby="phone-error"
                      />
                      {formTouched.phone && !errors.phone && (
                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                      )}
                    </div>
                    {errors.phone && (
                      <p id="phone-error" className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <X size={14} /> {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-[var(--color-text)] dark:text-[var(--color-text)]">
                      Mensagem
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        rows={4}
                        className={inputClasses('message')}
                        placeholder="Descreva o serviço que você precisa..."
                        aria-invalid={!!errors.message}
                        aria-describedby="message-error"
                      />
                      {formTouched.message && !errors.message && (
                        <CheckCircle className="absolute right-3 top-6 h-5 w-5 text-green-500" />
                      )}
                    </div>
                    {errors.message && (
                      <p id="message-error" className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <X size={14} /> {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-[var(--color-accent)] text-white rounded-lg font-medium flex-grow sm:flex-grow-0 flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Send className="h-5 w-5" />
                      Enviar Mensagem
                    </motion.button>
                    <motion.a
                      href="https://wa.me/5548991919791"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 border border-[var(--color-accent)] text-[var(--color-accent)] rounded-lg font-medium flex-grow sm:flex-grow-0 flex items-center justify-center gap-2 hover:bg-[var(--color-accent)]/5"
                    >
                      <MessageCircle className="h-5 w-5" />
                      WhatsApp
                    </motion.a>
                  </div>
                  <div className="p-3 bg-[var(--color-accent)]/5 rounded-lg flex items-start gap-2">
                    <CreditCard size={18} className="text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[var(--color-dark)]/70 dark:text-[var(--color-text)]/70">
                      Aceitamos pagamento em até 12x sem juros no cartão.
                    </p>
                  </div>
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