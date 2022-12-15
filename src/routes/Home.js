import React, { useEffect, useState } from 'react'
import Slider from '@material-ui/core/Slider';
import $ from 'jquery'
import imageCompression from 'browser-image-compression';
import { saveAs } from 'file-saver';
// CSS
import '../assets/css/home.css'

export default function Home() {
  const [file, setFile] = useState(new Image());
  const [fileName, setFileName] = useState('');
  const [image, setImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [quality, setQuality] = useState(50);
  const [compressedFileSize, setCompressedFileSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    document.querySelector('.compress_btn').disabled = true;
    document.querySelector('.cancel_btn').disabled = true;
  }, []);

  useEffect(() => {
    var fileSize = file.size;
    var fileSizeInMB = fileSize / (1024 * 1024);
   
    setCompressedFileSize(fileSizeInMB * quality / 100);
  }, [quality])

  function handleImageChange(e){
    e.preventDefault();

    let files = e.target.files[0];

    setFile(files);
    setFileName(files.name)

    let reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    }

    reader.readAsDataURL(files);

    var fileSize = files.size;
    var fileSizeInMB = fileSize / (1024 * 1024);
   
    setCompressedFileSize(fileSizeInMB * quality / 100);
    
    document.querySelector('.compress_btn').disabled = false;
    document.querySelector('.cancel_btn').disabled = false;
  }

  function compressImage(){
    setLoading(true);
    setCompressedImage(null);

    document.querySelector('.cancel_btn').disabled = true;

    const compressionOptions = {
      maxSizeMB: compressedFileSize,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }

    imageCompression(file, compressionOptions).then(function(compressedFile) {
      let reader = new FileReader();

      reader.onloadend = () => {
        setCompressedImage(reader.result);
      }
  
      reader.readAsDataURL(compressedFile);
    }).then(() => {
      setLoading(false);
      document.querySelector('.cancel_btn').disabled = false;
    })
  }

  function cancleCompression(){
    setImage(null);
    setCompressedImage(null);

    document.querySelector('.compress_btn').disabled = true;
    document.querySelector('.cancel_btn').disabled = true;
  }

  function downloadImage(){
    saveAs(compressedImage, fileName);
  }

  return (
    <div className='home_page'>
      <div className='container'>
        <header>
          <h2><span>C</span>OMPRESS Images For Free!</h2>
        </header>

        <div className='wrapper'>
          <div className='left'>
            <div className='image_preview'>
              {
                image === null?
                <></>
                :
                <div className='preview'>
                  <img src={image} alt='Your Image' />
                </div>
              }
              {
                image === null?
                <div className='image_receiver' onClick={() => {$('#image_input').click()}}>
                  <img src={require('../assets/icons/upload.png')} />
                  <div className='title'>Click Here To Upload Image.</div>
                  <input onChange={handleImageChange} type='file' id='image_input' style={{display: 'none'}} accept='image/*' />
                </div>
                :
                <></>
              }
            </div>

            <div className='compress_options'>
              <div className='title'>Image Quality (Percentage - %)</div>
              <Slider defaultValue={50} min={1} onChange={ (e, val) => setQuality(val) } onDragStop={ (e) => setQuality(e)} aria-label="Default" valueLabelDisplay="auto" />
              <div className='actions'>
                <button className='primary_btn compress_btn' onClick={compressImage}>Compress</button>
                <button className='primary_btn cancel_btn bg_gray' onClick={cancleCompression}>Cancel</button>
              </div>
            </div>
          </div>

          <div className='right'>
            <div className='compressed_image_preview'>
              {
                compressedImage === null?
                <></>
                :
                <div className='preview'>
                  <img src={compressedImage} alt='Compressed Image' />
                </div>
              }

              {
                loading?
                <div className='loader'>
                  <span className='fas fa-spinner fa-spin'></span>
                </div>
                :<></>
              }
            </div>

            {
              compressedImage === null?
              <></>
              :
              <button className='primary_btn download_btn' onClick={downloadImage}>Download</button>
            }
          </div>
        </div>

        <div className='credit'>A Product of <a href='https://facebook.com/HovSofts' target='_blank'>
          <img src={require('../assets/images/hovsofts.png')} />
        </a></div>
        <div className='copyright'>&copy; HovSofts - {year}</div>
      </div>
    </div>
  )
}
