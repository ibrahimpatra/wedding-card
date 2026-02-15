import React, { useState, useRef } from 'react';
import { Video, StopCircle, Loader2 } from 'lucide-react';

export const VideoGenerator = ({ paginate, setPageIndex, setIsPlaying }) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startAutomatedRecording = async () => {
    try {
      // 1. Ask user to select the tab to record
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 60, displaySurface: "browser" },
        audio: true // Captures system audio if playing
      });

      // 2. Setup Recorder
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'wedding-invite-video.webm';
        a.click();
        URL.revokeObjectURL(url);
        setIsRecording(false);
        setIsPlaying(true); // Resume normal app flow
      };

      // 3. Start Recording
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsPlaying(false); // Stop standard autoplay

      // 4. Automate the Slide Show (Programmatic Navigation)
      
      // Reset to Page 0
      setPageIndex(0);

      // Sequence timing (ms)
      const TIMINGS = [
        5000, // Slide 1 (Gate Open + Title)
        5000, // Slide 2 (Invite)
        5000, // Slide 3 (Events)
        5000, // Slide 4 (Compliments)
      ];

      const runSequence = async () => {
        for (let i = 0; i < TIMINGS.length; i++) {
            setPageIndex(i); // Go to page
            await new Promise(r => setTimeout(r, TIMINGS[i])); // Wait
        }
        
        // Stop recording after last slide
        mediaRecorderRef.current.stop();
        stream.getTracks().forEach(track => track.stop()); // Stop sharing
      };

      runSequence();

    } catch (err) {
      console.error("Error generating video:", err);
      setIsRecording(false);
      alert("Video generation cancelled or failed. Please select the current tab when asked.");
    }
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <button 
        onClick={isRecording ? () => {} : startAutomatedRecording}
        disabled={isRecording}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full shadow-2xl border border-[#d4af37] transition-all ${isRecording ? 'bg-red-600 text-white animate-pulse' : 'bg-[#1e3a8a] text-white'}`}
      >
        {isRecording ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span className="text-xs font-bold">Recording...</span>
          </>
        ) : (
          <>
            <Video size={16} />
            <span className="text-xs font-bold">Export Video</span>
          </>
        )}
      </button>
    </div>
  );
};