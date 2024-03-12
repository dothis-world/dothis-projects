'use client';
import { useState } from 'react';
import Dropzone from './components/Dropzone';

const Landing_test = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]); // fetching 된거 초기값 넣어주기
  const [audioUrls, setAudioUrls] = useState<string[]>([]); // fetching 된거 초기값 넣어주기

  const handleFileAdd = (files: File[]) => {
    files.forEach((file) => {
      const fileUrl = URL.createObjectURL(file);
      const fileType = file.type;

      if (fileType.startsWith('image/')) {
        setImageUrls((prevImageUrls) => [...prevImageUrls, fileUrl]);
      } else if (fileType.startsWith('audio/')) {
        setAudioUrls((prevAudioUrls) => [...prevAudioUrls, fileUrl]);
      }
    });
  };

  const handleDeleteImage = (index: number) => {
    const deletedImageUrl = imageUrls[index];
    setImageUrls(imageUrls.filter((_, _index) => _index !== index));
    URL.revokeObjectURL(deletedImageUrl);
  };

  const handleDeleteAudio = (index: number) => {
    const deletedAudioUrl = audioUrls[index];
    setAudioUrls(audioUrls.filter((_, _index) => _index !== index));
    URL.revokeObjectURL(deletedAudioUrl);
  };

  return (
    <>
      <Dropzone onFileSelect={handleFileAdd}></Dropzone>
      <div className="flex flex-row gap-[20px]">
        {imageUrls.map((image, index) => (
          <div
            className="w-[126px] h-[126px] relative flex items-center justify-center"
            key={index}
            onClick={() => handleDeleteImage(index)}
          >
            <img
              className="rounded object-cover hover:opacity-100"
              src={image}
              alt={`${image}-${index}`}
            />
            <div className="opacity-0 hover:opacity-100 duration-300 absolute inset-0 flex justify-center items-center text-[64px] text-white font-semibold">
              X
            </div>
          </div>
        ))}
      </div>

      {audioUrls.map((audio, index) => (
        <div className={``} key={index}>
          <audio controls>
            <source src={audio} type="audio/mpeg" />
          </audio>
          <button onClick={() => handleDeleteAudio(index)}>x</button>
        </div>
      ))}
    </>
  );
};

export default Landing_test;
