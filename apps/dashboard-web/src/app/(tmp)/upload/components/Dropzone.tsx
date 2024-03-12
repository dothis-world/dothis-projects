'use client';

import React, { useState } from 'react';

interface Props {
  onFileSelect: (files: File[]) => void;
}

const Dropzone = ({ onFileSelect }: Props) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const uploadedFiles = Array.from(event.dataTransfer.files);
    onFileSelect(uploadedFiles);
    console.log('handleDrop', uploadedFiles);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files as FileList);
    onFileSelect(uploadedFiles);
    console.log('handleFileSelect', uploadedFiles);
  };

  return (
    <div
      className={`bg-grey100 border border-dashed border-grey400 rounded px-[26px] py-[64px] text-center text-[42px] text-grey500 text-bold ${
        isDragging ? 'bg-primary100' : ''
      }`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="fileInput"
        className="hidden"
        value=""
        multiple
        onChange={handleFileSelect}
      />
      <label htmlFor="fileInput" className="cursor-pointer ">
        파일 추가
      </label>
    </div>
  );
};

export default Dropzone;
