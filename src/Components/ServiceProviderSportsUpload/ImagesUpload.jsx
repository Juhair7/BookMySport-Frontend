import React from 'react';
import { useState } from 'react'
import { Button } from '@mui/material';
import axios from 'axios'
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { apiConfig } from '../../Constants/ApiConfig'

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

      const response = await axios.post(`${apiConfig.sp}/uploadimages`, formData, { headers })
      const data = await response.data
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
      toast.error('Something went wrong. Try again', {
        duration: 3000,
        position: 'top-right'
      });
    }
    finally {
      toast.dismiss(loadingToastId);
    }
  }

  const handleDeletePhoto = (index) => {
    const updatedFiles = [...selectedFile];
    updatedFiles.splice(index, 1);
    setSelectedFile(updatedFiles);
    const updatedPreviews = [...previews];
    updatedPreviews.splice(index, 1);
    setPreviews(updatedPreviews);
  };

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
                  <>
                    <div className='grid'>
                      <div>
                        <img key={index} src={preview} alt={`Preview ${index}`} className="max-w-xs h-auto max-h-40 m-2" />
                      </div>
                      <div>
                        <button
                          className="bg-red-500 text-dark px-2 py-1 rounded-full"
                          onClick={() => handleDeletePhoto(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                ))}
              </div>
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
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button variant="contained" style={{ marginLeft: "30px", marginTop: "15px" }} onClick={handleImagesUpload}>Upload</Button>
          <Button variant="contained" color='error' style={{ marginLeft: "30px", marginTop: "15px" }} onClick={()=>navigate('/deleteimages')}>Delete Images. Takes you to delete the images individually</Button>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default ImagesUpload;
