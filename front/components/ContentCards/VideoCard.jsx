
export default function VideoCard({ videoID, background }) {
  const link_icon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
</svg>

  return (
    <div className={`w-full flex items-center align-middle justify-center ${background}`}>
      <div className='absolute top-0 right-0 mt-2 mr-2 z-5 flex justify-center flex-row rounded-bl-lg overflow-hidden h-10 w-fit border-2 border-slate-300 bg-primary-green'>
        <p className="self-center p-2 bg-slate-300"> {link_icon}</p>
        <input 
          type="text" className="h-10 border-primary-green pl-2"
          placeholder="Specify video link here"
          onChange={(e) => handleTextChange(e,index)}
        />
        <button className='edit_btn w-10' >
          BG
        </button>
      </div>
      <iframe
        className="w-5/6 aspect-video items-center justify-center align-middle"
        src={`https://www.youtube.com/embed/${videoID}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}
