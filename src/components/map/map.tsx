import { Icon, Marker, layerGroup } from 'leaflet';
import { City, Offer } from '../../mocks/offer';
import { useEffect, useRef } from 'react';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import useMap from '../../hooks/use-map';

type MapProps = {
    city: City
    offers: Offer[]
    selectedOffer: Offer | undefined
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

const Map = ({ city, offers, selectedOffer }: MapProps) => {

    const mapRef = useRef(null)
    const map = useMap(mapRef, city)

    useEffect(() => {

        if (map) {

            const markerLayer = layerGroup().addTo(map)
            offers.forEach((offer) => {

                const marker = new Marker({
                    lat: offer.location.latitude,
                    lng: offer.location.longitude
                });

                marker.setIcon(
                    selectedOffer !== undefined && offer.title === selectedOffer.title
                        ? currentCustomIcon
                        : defaultCustomIcon
                ).addTo(markerLayer)

            })

            return () => { map.removeLayer(markerLayer) }
        }

    }, [map, offers, selectedOffer]);

    return <div ref={mapRef}></div>;
}

export default Map