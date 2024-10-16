"use client";

import { APIProvider } from "@vis.gl/react-google-maps";

export function GoogleMapsAPIProvider({ children }: React.PropsWithChildren) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error("Google maps API key was not found.");
  }

  return <APIProvider apiKey={apiKey}>{children}</APIProvider>;
}
