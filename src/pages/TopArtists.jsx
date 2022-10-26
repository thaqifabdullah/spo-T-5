import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { Error, Loader, ArtistCard } from '../components';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) {
    return (<Loader title="Loading top artists" />);
  }

  if (error) {
    return (<Error />);
  }

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Top Artists</h2>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((track) => (
          <ArtistCard
            key={track.key}
            track={track}
          />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
