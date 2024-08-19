
export default function VideoCard({ videoID, background }) {
  return (
    <div className={`w-5/6 flex items-center justify-center ${background}`}>
      <iframe
        className="w-full aspect-video "
        src={`https://www.youtube.com/embed/${videoID}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}
