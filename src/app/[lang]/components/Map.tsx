"use client";
import { useEffect, useRef, useState } from "react";

interface GoogleMapProps {
  address: string;
  wazeIcon: string;
  googleIcon: string;
  navigationAddress: string;
}

// Map's styling
export const defaultMapContainerStyle = {
  width: "100%",
  height: "55vh",
};

const defaultMapCenter = {
  lat: 35.8799866,
  lng: 76.5048004,
};

const defaultMapZoom = 15;

const defaultMapOptions = {
  tilt: 0,
  zoomControl: true,
  mapTypeId: "roadmap",
  gestureHandling: "auto",
  mapId: "b4341bc58b07a93d",
};

const MapComponent = ({
  address,
  googleIcon,
  wazeIcon,
  navigationAddress,
}: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultMapCenter);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );

  useEffect(() => {
    const geocodeAddress = async () => {
      if (!window.google) return;

      try {
        const geocoder = new google.maps.Geocoder();

        geocoder.geocode(
          { address: navigationAddress ?? address },
          (results, status) => {
            if (status === "OK" && results && results[0]) {
              const { lat, lng } = results[0].geometry.location;
              setMapCenter({ lat: lat(), lng: lng() });
            } else {
              console.error(
                "Geocode was not successful for the following reason: " + status
              );
            }
          }
        );
      } catch (error) {
        console.error("Error geocoding address:", error);
      } finally {
        setLoading(false);
      }
    };

    if (address || navigationAddress) {
      geocodeAddress();
    }
  }, [address, navigationAddress]);

  useEffect(() => {
    if (!window.google || !mapRef.current) return;

    const map = new google.maps.Map(mapRef.current, {
      center: mapCenter,
      zoom: defaultMapZoom,
      ...defaultMapOptions,
    });

    mapInstanceRef.current = map;

    const loadMarkerLibrary = async () => {
      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        "marker"
      )) as unknown as {
        AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement;
      };
      markerRef.current = new AdvancedMarkerElement({
        position: mapCenter,
        map,
      });
    };

    loadMarkerLibrary();

    return () => {
      if (markerRef.current) {
        markerRef.current.map = null;
      }
    };
  }, [mapCenter]);

  if (loading) {
    return <div>Loading map...</div>;
  }

  return (
    <>
      <div className="w-full" ref={mapRef} style={defaultMapContainerStyle} />
      <div className="flex gap-2 mt-4">
        <a
          target="_blank"
          rel="noreferrer"
          className="flex items-center px-3 py-1 space-x-2 bg-gray-200"
          href={`https://www.google.com/maps/search/?api=1&query=${address}`}
        >
          <img alt="Google Maps" className="w-auto h-5" src={googleIcon} />
          <span>Google Maps</span>
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://waze.com/ul?ll=${mapCenter.lat},${mapCenter.lng}&navigate=yes`}
          className="flex items-center px-3 py-1 space-x-2 bg-gray-200"
        >
          <img alt="Waze" className="w-auto h-5" src={wazeIcon} />
          <span>Waze</span>
        </a>
      </div>
    </>
  );
};

export { MapComponent };
