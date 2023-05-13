import { useState, useEffect } from "react";
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import { Dna } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './App.styled.jsx';
import API from '../service/imageAPI';

export function App() {

  const [value, setValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(null);
  const [totalHits, setTotalHits] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!value) {
      return;
    }
    API.imageAPI(value, page)
      .then(images => {
        if (images.hits.length === 0) {
          setImages([]);
          setStatus('rejected');
          return;
        };
        setImages(page === 1 ? [...images.hits] : prevImages => [...prevImages, ...images.hits])
        setTotalHits(images.totalHits);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      })
  }, [value, page])

  const onSubmitForm = (value) => {
    setValue(value);
    setPage(1);
    setStatus('pending');
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
    setStatus('pending');
  };

    if (status === 'idle') {
      return <Container>
          <Searchbar onSubmit={onSubmitForm} />
        </Container>
    };
    
    if (status === 'pending') {
      return <Container>
        <Searchbar onSubmit={onSubmitForm} /> 
        <ImageGallery images={images} /> 
        <Dna  visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{ margin: 'auto'}}
              wrapperClass="dna-wrapper"/>
      </Container>
    };

    if (status === 'rejected') {
      return <Container>
        <Searchbar onSubmit={onSubmitForm} />
        <ImageGallery images={images} /> 
        {console.log(error)}
      </Container>
    };

    if (status === 'resolved') {
      return <Container>
        <Searchbar onSubmit={onSubmitForm} />
        <ImageGallery images={images} />
        {images.length !== totalHits && <Button onClick={loadMore} />}
        <ToastContainer autoClose={2000} />
      </Container>
    };
};
