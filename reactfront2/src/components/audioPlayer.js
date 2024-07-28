import React from 'react';

export default function AudioPlayer({src}) {
  // mp3 player
  return (
    <div>
      <audio controls>
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};