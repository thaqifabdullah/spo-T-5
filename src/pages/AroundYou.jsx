import axios from 'axios';
import { useEffect, useState } from 'react';
import { Loader, SongCard, Error } from '../components';
import { useGetCountryChartsQuery } from '../redux/services/shazamCore';

const AroundYou = () => {
  const [country, setCountry] = useState({
    countryName: '',
    countryCode: '',
  });

  const { data, isFetching, error } = useGetCountryChartsQuery(!country?.countryCode ? 'ID' : country?.countryCode);

  const getGeoInfo = () => {
    axios.get('https://ipapi.co/json/').then((response) => {
      const { data: dataIpapi } = response;
      setCountry({
        countryName: dataIpapi.country_name,
        countryCode: dataIpapi.country_code,
      });
    }).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => { getGeoInfo(); }, []);

  if (isFetching) {
    return <Loader title="Loading charts" />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Around You ({country?.countryName})</h2>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
