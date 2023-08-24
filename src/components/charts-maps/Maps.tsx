import { useQuery } from '@tanstack/react-query';
import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Getting Icon from leaflet and saving to the marker
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const Maps = () => {
  // Getting location wise data using useQuery with queryKey 'maps'
  const { data, isLoading, isError } = useQuery({
    queryKey: ['maps'],
    queryFn: async () => {
      const res = await fetch('https://disease.sh/v3/covid-19/countries');
      const data = await res.json();
      return data;
    },
  });

  //Loading component while data is being fetched
  if (isLoading)
    return (
      <h1 className="m-auto text-3xl font-bold uppercase h-[50vh] text-center">
        Loading...
      </h1>
    );

  //Error component if there was an error in data fetching
  if (isError)
    return (
      <h1 className="m-auto text-3xl font-bold uppercase h-[50vh] text-center">
        There is an Error. Please try again
      </h1>
    );

  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-3xl font-semibold mb-2">
        Covid Cases Map view
      </h1>
      <MapContainer
        style={{ height: '350px', width: '100%' }}
        center={[0, 0]}
        zoom={2}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((country: any) => {
          const { lat, long, _id, flag } = country.countryInfo;
          // Some data has _id of null so leaving those datas
          if (!_id) return '';
          return (
            <React.Fragment key={_id}>
              <Marker position={[lat, long]}>
                <Popup>
                  <img
                    src={flag}
                    alt="country"
                    width={80}
                    height={80}
                    className="mx-auto"
                  />
                  <p className="my-1">Country: {country.country}</p>
                  <p className="my-1">Active Case: {country.active}</p>
                  <p className="my-1">Recovered Cases: {country.recovered}</p>
                  <p className="my-1">Deaths: {country.deaths}</p>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Maps;
