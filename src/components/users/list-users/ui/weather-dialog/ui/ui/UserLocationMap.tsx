"use client";

import { User } from "@/types";
import { AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";

interface Props {
  user: User;
}

export function UserLocationMap({ user }: Props) {
  const userPosition = {
    lat: Number(user.location.coordinates.latitude),
    lng: Number(user.location.coordinates.longitude),
  };

  return (
    <Map
      style={{ height: "400px" }}
      defaultCenter={userPosition}
      mapId={"bf51a910020fa25a"}
      defaultZoom={7}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
    >
      <AdvancedMarker position={userPosition} title={"User location marker"}>
        <Pin background={"#22ccff"} borderColor={"#1e89a1"} scale={1.6}>
          <img
            src={user.picture.thumbnail}
            style={{
              borderRadius: "50%",
              width: "2rem",
              height: "2rem",
              marginTop: "0.25rem",
            }}
          />
        </Pin>
      </AdvancedMarker>
    </Map>
  );
}
