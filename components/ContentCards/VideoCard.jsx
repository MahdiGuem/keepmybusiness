
export default function VideoCard({ videoId }) {
  return (
    
    <div className="w-full h-screen flex items-center justify-center">
      <iframe
        className=" h-5/6 aspect-video "
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
