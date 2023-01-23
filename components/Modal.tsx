import {
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  XIcon,
} from "@heroicons/react/outline";
import MuiModal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player/lazy";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { Element, Genre } from "../typings";

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie] = useRecoilState(movieState);
  const [trailerYoutubeKey, setTrailerYoutubeKey] = useState();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(true);

  const handleClose = () => setShowModal(false);

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_TMDB_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
      setTrailerYoutubeKey(data);

      if (data?.videos) {
        // find the trailer video in the videos array
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailerYoutubeKey(data.videos?.results[index]?.key);
      }

      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [movie]);

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="modal-button absolute right-5 top-5 !z-10 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XIcon className="h-6 w-6" />
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailerYoutubeKey}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-center px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 px-8 rounded bg-white text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black" />
                Play
              </button>
              <button className="modal-button">
                <PlusIcon className="h-7 w-7" />
              </button>
              <button className="modal-button">
                <ThumbUpIcon className="h-7 w-7" />
              </button>
              <button className="modal-button" onClick={() => setMuted(!muted)}>
                {muted ? (
                  <VolumeOffIcon className="h-6 w-6" />
                ) : (
                  <VolumeUpIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
}

export default Modal;
