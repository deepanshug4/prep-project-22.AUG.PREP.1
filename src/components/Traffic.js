import * as React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { useEffect, useRef } from 'react';
import './Traffic.css';

const render = (status) => {
    return <h1>{status}</h1>;
};

const Traffic = ({ zoom, center, apiKey }) => {
    return (
        <Wrapper apiKey={apiKey} render={render}>
            <Map center={center} zoom={zoom}></Map>
        </Wrapper>
    );
};

function Map({ center, zoom }) {
    const ref = useRef(null);

    // useEffect is needed because ref.current might or might not be defined at this point
    useEffect(() => {
        if (ref.current) {
            const map = new window.google.maps.Map(ref.current, {
                zoom: zoom,
                center: center,
            });
            const trafficLayer = new window.google.maps.TrafficLayer();
            trafficLayer.setMap(map);
            window.initMap = this;
        }
    }, [ref, center, zoom]);
    return <div ref={ref} className='traffic-map' />;
}

export default Traffic;
