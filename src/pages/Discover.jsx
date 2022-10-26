import { useDispatch, useSelector } from 'react-redux';
import { genres } from '../assets/constants';
import { SongCard, Loader, Error } from '../components';
import { selectGenreListId } from '../redux/features/playerSlice';

import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';

const Discover = () => {
  const dispatch = useDispatch();
  const { genreListId, activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');

  if (isFetching) {
    return (<Loader title="Loading songs..." />);
  }

  if (error) {
    return (<Error />);
  }

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>
        <select
          className="bg-black text-gray-300 p-3 text-sm outline-none rounded-lg sm:mt-0 mt-5"
          onChange={(e) => { dispatch(selectGenreListId(e.target.value)); }}
          value={genreListId || 'Pop'}
        >
          {genres.map((genre) => <option key={genre.value} value={genre.value}>{ genre.title }</option>)}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            data={data}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
