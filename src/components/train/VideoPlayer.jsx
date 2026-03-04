import React, { useEffect, useRef, useState } from 'react'
import { get, post } from '../../lib/api'

export default function VideoPlayer({ videoId }) {
  const videoRef = useRef(null)
  const [video, setVideo] = useState(null)
  const [locked, setLocked] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!videoId || videoId <= 0) {
      setVideo(null)
      setLocked(false)
      setLoading(false)
      return
    }
    setLoading(true)
    setLocked(false)
    let cancelled = false
    async function fetchVideo() {
      try {
        const res = await get(`/training_video/${videoId}`)
        if (cancelled) return
        if (res?.error) {
          setVideo(null)
        } else if (res?.message === 'Unauthorized to watch') {
          setLocked(true)
          setVideo(res?.data || null)
        } else if (res?.data) {
          setVideo(res.data)
        } else {
          setVideo(null)
        }
      } catch {
        if (!cancelled) setVideo(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchVideo()
    return () => { cancelled = true }
  }, [videoId])

  const handleEnded = async () => {
    if (!video?.id) return
    try {
      await post('/user_training_progress', { trainingId: video.id })
      window.location.reload()
    } catch {
      // optional: toast error
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 aspect-video flex items-center justify-center">
        <div className="text-gray-500 font-medium">Loading video…</div>
      </div>
    )
  }

  if (!video) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 aspect-video flex items-center justify-center">
        <p className="text-gray-500">Select a video from the list</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative rounded-xl overflow-hidden border border-gray-800 bg-black">
        <video
          ref={videoRef}
          className="w-full aspect-video object-contain"
          poster={video.thumbnail_url}
          controls
          playsInline
          onEnded={handleEnded}
          src={locked ? undefined : video.video_url}
        />
        {locked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Locked — complete previous drills to unlock</span>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-3 sm:p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-white capitalize break-words">{video.title}</h2>
          <span className="text-primary-orange font-semibold">
            {video.count != null ? (video.count >= 3 ? 3 : video.count) : 0}/3
          </span>
        </div>
        <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-gray-800/80">
          <span className="text-gray-400">XP Reward Points</span>
          <span className="text-white font-bold">{video.xp ?? 0}</span>
        </div>
        <div className="text-gray-300 space-y-2 text-sm sm:text-base">
          <h3 className="text-white font-semibold text-sm sm:text-base">Instructions</h3>
          <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-sm">
            <li>Repeat drills for 15 sec</li>
            <li>Rest 15 sec between rounds</li>
            <li>Choose your own tempo</li>
          </ul>
          <div className="pt-2">
            <h3 className="text-white font-semibold mb-1">Don’t forget</h3>
            <p className="text-sm">
              QBounce Master Training mat lines are a guide for understanding and learning drills. Focus on executing the correct move no matter the tempo.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">Extra Tip</h3>
            <p className="text-sm">Once you get a hang of the exercise try to lift your head and glance at the ball as little as possible.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
