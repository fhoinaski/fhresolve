import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Map as MapIcon, List, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Componente para centralizar o mapa em uma localização
function SetViewOnLocation({ location }: { location: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(location, 13);
  }, [location, map]);
  return null;
}

const markerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const activeMarkerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [1, -34],
  className: 'active-marker',
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

const ServiceMap: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'map' | 'list'>('map');
  const [selectedLocation, setSelectedLocation] = useState<string | null>('Ratones');
  const [currentView, setCurrentView] = useState<[number, number]>([-27.5132, -48.4618]);
  const [isUsingGeolocation, setIsUsingGeolocation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (selectedLocation) {
      const location = locations.find(loc => loc.name === selectedLocation);
      if (location) {
        setCurrentView(location.position as [number, number]);
      }
    }
  }, [selectedLocation]);

  const handleLocationSelect = (locationName: string) => {
    setSelectedLocation(locationName);
    if (isMobile) {
      setActiveTab('map');
    }
    setIsUsingGeolocation(false);
  };

  const handleGetUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation: [number, number] = [position.coords.latitude, position.coords.longitude];
          setCurrentView(userLocation);
          setIsUsingGeolocation(true);
          setSelectedLocation(null);
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
          alert('Não foi possível obter sua localização. Verifique as permissões do navegador.');
        }
      );
    } else {
      alert('Geolocalização não é suportada por este navegador.');
    }
  };

  const markerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <section id="map" className="py-16 md:py-24 bg-[var(--color-gray)] dark:bg-[var(--color-primary)]">
      <div className="container">
        <motion.div 
          className="text-center mb-8 md:mb-12" 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Áreas Atendidas</h2>
          <p className="section-subtitle">Atendemos Ratones e região!</p>
        </motion.div>

        <div className="flex md:hidden mx-auto mb-6 border rounded-lg overflow-hidden shadow-md max-w-sm">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('map')}
            className={`flex-1 py-3 flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'map' 
                ? 'bg-[var(--color-accent)] text-white font-medium' 
                : 'bg-[var(--color-light)] dark:bg-[var(--color-neutral)]/20 text-[var(--color-text)] dark:text-[var(--color-paralel)]'
            }`}
            aria-label="Ver mapa"
          >
            <MapIcon size={18} />
            <span>Mapa</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('list')}
            className={`flex-1 py-3 flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'list' 
                ? 'bg-[var(--color-accent)] text-white font-medium' 
                : 'bg-[var(--color-light)] dark:bg-[var(--color-neutral)]/20 text-[var(--color-text)] dark:text-[var(--color-paralel)]'
            }`}
            aria-label="Ver lista de regiões"
          >
            <List size={18} />
            <span>Regiões</span>
          </motion.button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="wait">
            {(activeTab === 'list' || !isMobile) && (
              <motion.div 
                key="region-list"
                className="md:col-span-1"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={isMobile ? tabVariants : {}}
              >
                <div className="bg-[var(--color-light)] dark:bg-[var(--color-neutral)]/10 rounded-xl p-4 md:p-6 shadow-md">
                  <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 flex items-center">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6 text-[var(--color-accent)] mr-2" /> 
                    Regiões Atendidas
                  </h3>
                  <ul className="space-y-2 md:space-y-3">
                    {locations.map((location) => (
                      <motion.li
                        key={location.name}
                        className={`p-3 rounded-lg cursor-pointer ${
                          location.name === selectedLocation
                            ? 'bg-[var(--color-accent)] text-white shadow-md' 
                            : 'bg-[var(--color-neutral)]/10 dark:bg-[var(--color-neutral)]/20 hover:bg-[var(--color-neutral)]/20 dark:hover:bg-[var(--color-neutral)]/30'
                        } transition-all duration-300`}
                        whileHover={{ scale: 1.02, x: 3 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleLocationSelect(location.name)}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                            location.name === selectedLocation
                              ? 'bg-white/20' 
                              : 'bg-[var(--color-accent)]/10'
                          }`}>
                            <MapPin className={`h-4 w-4 ${
                              location.name === selectedLocation
                                ? 'text-white' 
                                : 'text-[var(--color-accent)]'
                            }`} />
                          </span>
                          <span className="font-medium">{location.name}</span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <div className="mt-6 pt-4 border-t border-[var(--color-neutral)]/20 dark:border-[var(--color-neutral)]/10">
                    <p className="text-sm text-[var(--color-text)]/70 dark:text-[var(--color-paralel)]/70 italic mb-4">
                      Atendemos estas regiões e arredores.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleGetUserLocation}
                      className="w-full py-2 px-4 bg-[var(--color-light)] dark:bg-[var(--color-neutral)]/20 hover:bg-[var(--color-secondary)]/10 rounded-lg flex items-center justify-center gap-2 border border-[var(--color-neutral)]/20 dark:border-[var(--color-neutral)]/10 transition-colors"
                    >
                      <Navigation size={16} className="text-[var(--color-secondary)]" />
                      <span>Ver minha localização</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {(activeTab === 'map' || !isMobile) && (
              <motion.div
                key="map-container"
                className={`${isMobile ? '' : 'md:col-span-2'}`}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={isMobile ? tabVariants : {}}
              >
                <div className="bg-[var(--color-light)] dark:bg-[var(--color-neutral)]/10 rounded-xl p-2 shadow-md h-[500px] md:h-[600px] relative overflow-hidden">
                  {isMounted && (
                    <MapContainer 
                      center={[-27.5132, -48.4618]} 
                      zoom={12} 
                      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
                      className="z-10"
                    >
                      <TileLayer 
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      
                      <SetViewOnLocation location={currentView} />
                      
                      {isUsingGeolocation && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Marker 
                            position={currentView} 
                            icon={new Icon({
                              iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                              iconSize: [25, 41],
                              iconAnchor: [12, 41],
                              className: 'user-location-marker'
                            })}
                          >
                            <Popup>Sua localização atual</Popup>
                          </Marker>
                          <Circle 
                            center={currentView} 
                            radius={300}
                            pathOptions={{
                              color: '#F39C12',
                              fillColor: '#F39C12',
                              fillOpacity: 0.2,
                              weight: 2
                            }}
                          />
                        </motion.div>
                      )}
                      
                      {locations.map((location) => (
                        <motion.div 
                          key={location.name} 
                          variants={markerVariants} 
                          initial="hidden" 
                          animate="visible"
                        >
                          <Marker 
                            position={location.position as [number, number]} 
                            icon={location.name === selectedLocation ? activeMarkerIcon : markerIcon}
                            eventHandlers={{
                              click: () => {
                                setSelectedLocation(location.name);
                                setIsUsingGeolocation(false);
                              }
                            }}
                          >
                            <Popup>
                              <div className="text-center">
                                <h3 className="font-bold text-base mb-1">{location.name}</h3>
                                <p className="text-sm">Área atendida pela FH Resolve</p>
                                {location.primary && (
                                  <span className="inline-block mt-1 px-2 py-0.5 bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs rounded-full">
                                    Sede Principal
                                  </span>
                                )}
                              </div>
                            </Popup>
                          </Marker>
                          <Circle 
                            center={location.position as [number, number]} 
                            radius={2000}
                            pathOptions={{
                              color: location.name === selectedLocation ? '#40C4FF' : '#9e9e9e',
                              fillColor: location.name === selectedLocation ? '#40C4FF' : '#9e9e9e',
                              fillOpacity: location.name === selectedLocation ? 0.2 : 0.1,
                              weight: location.name === selectedLocation ? 2 : 1
                            }}
                          />
                        </motion.div>
                      ))}
                    </MapContainer>
                  )}
                  
                  <motion.button 
                    className="absolute bottom-4 right-4 bg-white dark:bg-[var(--color-primary)] p-3 rounded-full shadow-lg text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-colors z-[1000] border border-[var(--color-neutral)]/20"
                    onClick={handleGetUserLocation}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Mostrar minha localização"
                  >
                    <Navigation size={20} />
                  </motion.button>
                  
                  {isMobile && selectedLocation && !isUsingGeolocation && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-4 left-0 right-0 mx-auto w-max bg-white dark:bg-[var(--color-neutral)]/90 px-4 py-2 rounded-full shadow-lg z-[1000] flex items-center gap-2"
                    >
                      <MapPin size={16} className="text-[var(--color-accent)]" />
                      <span className="font-medium text-sm">{selectedLocation}</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="mt-6 text-center md:hidden">
          <p className="text-sm text-[var(--color-text)]/70 dark:text-[var(--color-paralel)]/70 italic">
            Toque nos marcadores para ver detalhes da região
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceMap;