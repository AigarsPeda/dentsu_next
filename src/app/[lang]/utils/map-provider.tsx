"use client";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import { ReactNode } from "react";

const libraries = ["places", "drawing", "geometry"];

export function MapProvider({ children }: { children: ReactNode }) {
  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    libraries: libraries as Libraries,
  });

  if (loadError) return <p>Encountered error while loading Google Maps</p>;

  if (!scriptLoaded) return <p>Map loading ...</p>;

  return <>{children}</>;
}
