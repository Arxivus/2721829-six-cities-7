import { Icon, Marker, layerGroup } from 'leaflet';
import { City, Offer, Location } from '../../types/types';
import { useEffect, useRef } from 'react';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../data'
import useMap from '../../hooks/use-map';

type MapProps = {
    city: City
    offers?: Offer[]
    activeMarker: Location | undefined
}

const defaultCustomIcon = new Icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
})

const currentCustomIcon = new Icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
})

const Map = ({ city, offers, activeMarker }: MapProps) => {

    const mapRef = useRef(null)
    const map = useMap(mapRef, city)

    useEffect(() => {
        
        if (map) {

            const markerLayer = layerGroup().addTo(map)
            offers?.forEach((offer) => {

                const marker = new Marker({
                    lat: offer.location.latitude,
                    lng: offer.location.longitude
                });

                marker.setIcon(
                    activeMarker !== undefined &&
                        offer.location.longitude == activeMarker.longitude && offer.location.latitude == activeMarker.latitude
                        ? currentCustomIcon
                        : defaultCustomIcon
                ).addTo(markerLayer)

            })

            return () => { map.removeLayer(markerLayer) }
        }

    }, [map, offers, activeMarker]);

    return <div ref={mapRef}></div>;
}

export default Map