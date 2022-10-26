import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';
import { DetailsHeader, Loader, Error, RelatedSongs } from '../components';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetArtistDetailsQuery(artistId);

  if (isFetching) {
    return <Loader title="Searching artist details" />;
  }

  if (error) {
    return (<Error />);
  }

  return (
    <div className="flex flex-col">
      <DetailsHeader artistData={data} artistId={artistId} />
      <RelatedSongs
        artistId={artistId}
        data={Object.values(data?.songs)}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />

    </div>
  );
};

export default ArtistDetails;
