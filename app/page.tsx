"use client";

import React, { useState } from "react";

const AppPage = () => {
  const [videoURL, setVideoURL] = useState(null);

  const handleVideoUpload = async (event : any) => {
    const file = event.target.files[0];
    const fileSize = file.size;
    const chunkSize = 1024 * 1024; // 1MB chunk size (adjust as needed)
    let offset = 0;
    const videoBuffer : any = [];

    while (offset < fileSize) {
      const chunk = file.slice(offset, offset + chunkSize);
      const reader = new FileReader();

      const chunkPromise = new Promise<void>((resolve) => {
        reader.onload = (e: any) => {
          videoBuffer.push(e.target.result);
          resolve();
        };
      });

      reader.readAsArrayBuffer(chunk);
      await chunkPromise;

      offset += chunkSize;
    }

    const concatenatedBuffer = new Blob(videoBuffer, { type: file.type });
    const videoObjectURL : any = URL.createObjectURL(concatenatedBuffer);
    setVideoURL(videoObjectURL);
  };

  return (
    <div>
      <h1>Online Video Player</h1>
      <div>
        <input type="file" accept="video/*" onChange={handleVideoUpload} />
        {videoURL && (
          <video controls>
            <source src={videoURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default AppPage;