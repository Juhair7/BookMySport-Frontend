import React from 'react';
import { useState } from 'react'
import { Button } from '@mui/material';
import axios from 'axios'
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ImagesUpload = () => {

  const navigate = useNavigate()

  const [selectedFile, setSelectedFile] = useState(null);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setSelectedFile(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviews(previews);
  };

  const handleImagesUpload = async (e) => {
    e.preventDefault()

    if (!selectedFile) {
      toast.error('Upload atleast one image', {
        duration: 3000,
        position: "top-right"
      })
      return;
    }

    if (selectedFile.length > 10) {
      toast.error('You can only upload 10 images max', {
        duration: 5000,
        position: "top-right"
      })
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFile.length; i++) {
      formData.append('images', selectedFile[i]);
    }

    const loadingToastId = toast.loading('Uploading images', {
      duration: Infinity,
      position: 'top-right'
    });

    try {
      const headers = {
        "token": Cookies.get("token"),
        "role": Cookies.get("role")
      }

      const response = await axios.post('http://localhost:8070/api/uploadimages', formData, { headers })
      const data = await response.data
      console.log("Data is ", data)
      if (data.success) {
        toast.success('Image upload successfully', {
          duration: 3000,
          position: "top-right"
        })
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
      else {
        toast.error(data.message, {
          duration: 3000,
          position: 'top-right'
        });
      }
    } catch (error) {
      console.log(error.message)
      toast.error('Something went wrong. Try again', {
        duration: 3000,
        position: 'top-right'
      });
    }
    finally {
      toast.dismiss(loadingToastId);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen" style={{ backgroundImage: 'url("pexels-photo-1103829.jpeg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', border: '2px solid black', opacity: 0.75, backgroundAttachment: 'fixed' }}>
        <div className="col-span-full">
          <h2 className='text-center my-6 font-bold'>Upload Images of the sport courts</h2>
          <label htmlFor="cover-photo" className="block text-xl font-bold leading-6 text-black text-center">Playground Images</label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10" style={{ backgroundColor: "white" }}>
            <div className="text-center">
              <div className="flex flex-wrap justify-center">
                {previews.map((preview, index) => (
                  <img key={index} src={preview} alt={`Preview ${index}`} className="max-w-xs h-auto max-h-40 m-2" />
                ))}
              </div>
              <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
              </svg>
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                  <span>Upload the images</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} multiple accept="image/*" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 10MB</p>
            </div>
          </div>
          <Button variant="contained" style={{ marginLeft: "100px", marginTop: "15px" }} onClick={handleImagesUpload}>Upload</Button>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default ImagesUpload;
