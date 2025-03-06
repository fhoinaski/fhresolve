import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const markerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const locations = [
  { name: 'Ratones', position: [-27.5132, -48.4618], primary: true },
  { name: 'Jurerê', position: [-27.4386, -48.4958] },
  { name: 'Canasvieiras', position: [-27.4278, -48.4778] },
  { name: 'Ingleses', position: [-27.4358, -48.3958] },
  { name: 'Santo Antônio de Lisboa', position: [-27.5075, -48.5211] },
  { name: 'Vargem Pequena', position: [-27.4664, -48.4319] },
  { name: 'Vargem Grande', position: [-27.4386, -48.4319] },
  { name: 'Daniela', position: [-27.4458, -48.5211] },
];

const MapControls: React.FC = () => {
  const map = useMap();
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      onClick={() => map.setView([-27.5132, -48.4618], 11)}
      className="absolute top-4 left-4 z-[1000] btn btn-primary text-sm px-4 py-2"
    >
      Centralizar em Ratones
    </motion.button>
  );
};

const ServiceMap: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="map" className="py-20 bg-[var(--color-gray)] dark:bg-[var(--color-primary)]">
      <div className="container">
        <div className="animate-section text-center mb-12">
          <h2 className="section-title text-[var(--color-text)] dark:text-[var(--color-paralel)]">Áreas Atendidas</h2>
          <p className="section-subtitle dark:text-opacity-80 max-w-3xl mx-auto">
            Atendemos Ratones e região com excelência. Veja onde atuamos!
          </p>
        </div>

        <div className="bg-[var(--color-light)] dark:bg-[var(--color-dark)] p-6 rounded-xl shadow-md">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-[var(--color-accent)] mr-2" />
                <h3 className="text-xl font-semibold text-[var(--color-text)] dark:text-[var(--color-light)]">Regiões Atendidas</h3>
              </div>
              <ul className="space-y-3">
                {locations.map((location) => (
                  <motion.li
                    key={location.name}
                    whileHover={{ scale: 1.02, background: 'linear-gradient(to right, var(--color-neutral), var(--color-light))', transition: { duration: 0.3 } }}
                    className={`p-3 rounded-lg transition-colors ${location.primary ? 'bg-[var(--color-accent)] text-[var(--color-dark)] dark:text-[var(--color-primary)]' : 'bg-[var(--color-neutral)]/20 dark:bg-[var(--color-dark)]/20 text-[var(--color-text)] dark:text-[var(--color-light)] hover:bg-[var(--color-neutral)]/40 dark:hover:bg-[var(--color-dark)]/40'}`}
                  >
                    <div className="flex items-center">
                      <MapPin className={`h-5 w-5 mr-2 ${location.primary ? 'text-[var(--color-dark)] dark:text-[var(--color-primary)]' : 'text-[var(--color-accent)]'}`} />
                      <span className="text-[var(--color-text)] dark:text-[var(--color-light)]">{location.name}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-[var(--color-accent)]/10 dark:bg-[var(--color-accent)]/20 rounded-lg">
                <p className="text-sm text-[var(--color-text)] dark:text-[var(--color-light)]/80">
                  Não encontrou sua região? Entre em contato para verificar disponibilidade.
                </p>
              </div>
            </div>

            <div className="md:col-span-2">
              {isMounted ? (
                <MapContainer
                  center={[-27.5132, -48.4618]}
                  zoom={11}
                  scrollWheelZoom={true}
                  style={{ height: '100%', minHeight: '400px', width: '100%', borderRadius: '0.5rem' }}
                  className="bg-[var(--color-light)] dark:bg-[var(--color-dark)]"
                >
                  <TileLayer
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapControls />
                  {locations.map((location) => (
                    <React.Fragment key={location.name}>
                      <Marker position={location.position as [number, number]} icon={markerIcon}>
                        <Popup className="text-[var(--color-text)] dark:text-[var(--color-light)]">
                          <b>{location.name}</b>
                          <br />
                          Serviços de manutenção residencial
                        </Popup>
                      </Marker>
                      <Circle
                        center={location.position as [number, number]}
                        radius={2000}
                        pathOptions={{
                          fillColor: location.primary ? '#F39C12' : '#2C3E50',
                          fillOpacity: 0.2,
                          color: location.primary ? '#F39C12' : '#2C3E50',
                          weight: 1,
                        }}
                      />
                    </React.Fragment>
                  ))}
                </MapContainer>
              ) : (
                <div className="h-[400px] bg-[var(--color-neutral)]/20 dark:bg-[var(--color-dark)]/20 animate-pulse rounded-lg" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceMap;