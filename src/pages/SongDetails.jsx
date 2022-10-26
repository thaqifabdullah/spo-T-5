import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';
import { DetailsHeader, Loader, RelatedSongs, Error } from '../components';

const SongDetails = () => {
  const { songid, artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails, error } = useGetSongDetailsQuery(songid);
  const { data: relatedSong, isFetching: isFetchingRelatedSongs } = useGetSongRelatedQuery(songid);

  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, relatedSong, i }));
    dispatch(playPause(true));
  };

  if (isFetchingSongDetails || isFetchingRelatedSongs) {
    return <Loader title="Searching song details" />;
  }

  if (error) {
    return (<Error />);
  }

  return (
    <div className="flex flex-col">
      <DetailsHeader songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">
          Lyrics:
        </h2>

        <div className="mt-5">
          {songData?.sections[1].type === 'LYRICS'
            ? songData?.sections[1].text.map((line, i) => <p key={`line-${i}`} className="text-gray-400 text-base my-1">{line}</p>)
            : <p className="text-gray-400 text-base my-1">No lyrics found</p>}
        </div>
      </div>

      <RelatedSongs
        data={relatedSong}
        isPlaying={isPlaying}
        activeSong={activeSong}
        artistId={artistId}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
