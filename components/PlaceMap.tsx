"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { getDict, type Lang } from "@/i18n";
import { ORIGIN_STYLE, type Place } from "@/lib/taxonomy";

const BERLIN: [number, number] = [52.505, 13.4];

function pinIcon(place: Place) {
  const { color, code } = ORIGIN_STYLE[place.origin];
  return L.divIcon({
    className: "",
    html: `<div class="pin" style="background:${color};color:${color}"><b>${code}</b></div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -30],
  });
}

function FitAndFocus({ places, markers }: { places: Place[]; markers: React.RefObject<Map<string, L.Marker>> }) {
  const map = useMap();
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = places.find((p) => p.id === id);
    if (target) {
      map.setView([target.lat, target.lng], 16);
      markers.current.get(id)?.openPopup();
    } else if (places.length > 1) {
      map.fitBounds(L.latLngBounds(places.map((p) => [p.lat, p.lng])), { padding: [40, 40], maxZoom: 15 });
    } else if (places.length === 1) {
      map.setView([places[0].lat, places[0].lng], 15);
    }
  }, [map, places, markers]);
  return null;
}

export default function PlaceMap({ places, lang }: { places: Place[]; lang: Lang }) {
  const d = getDict(lang);
  const markers = useRef(new Map<string, L.Marker>());

  return (
    <div role="region" aria-label={d.map.mapLabel}>
      <MapContainer center={BERLIN} zoom={11} scrollWheelZoom={false} className="map" keyboard>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {places.map((p) => (
          <Marker
            key={p.id}
            position={[p.lat, p.lng]}
            icon={pinIcon(p)}
            title={`${p.name} (${d.origins[p.origin]})`}
            alt={`${p.name} (${d.origins[p.origin]})`}
            keyboard
            eventHandlers={{
              add: (e) => {
                const el = e.target.getElement() as HTMLElement | undefined;
                el?.setAttribute("role", "button");
                el?.setAttribute("aria-label", `${p.name}, ${d.origins[p.origin]}`);
              },
            }}
            ref={(m) => {
              if (m) markers.current.set(p.id, m);
              else markers.current.delete(p.id);
            }}
          >
            <Popup>
              <strong>{p.name}</strong>
              <br />
              {d.origins[p.origin]} · {p.types.map((t) => d.types[t]).join(", ")}
              <br />
              <a href={`/${lang}/orte/${p.id}/`}>{d.map.open} →</a>
            </Popup>
          </Marker>
        ))}
        <FitAndFocus places={places} markers={markers} />
      </MapContainer>
    </div>
  );
}
