"use client";

interface VideoLessonProps {
  videoData: {
    url: string;
    title: string;
  };
}

export const VideoLesson = ({ videoData }: VideoLessonProps) => {
  return (
    <div className="p-8">
      <h3 className="text-xl font-semibold mb-4">{videoData.title}</h3>
      <div className="aspect-video rounded-xl overflow-hidden">
        <iframe
          src={videoData.url}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}; 