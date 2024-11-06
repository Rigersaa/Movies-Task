import React, { useState, useEffect } from 'react';
import '../styles/PhotoList.css';

interface Photo {
  id: number;
  title: string;
  thumbnailUrl: string;
}

const PhotoList: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [error, setError] = useState<string>(''); 

  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data); 
        setLoading(false); 
      })
      .catch((err) => {
        setLoading(false); 
        setError('Failed to load photos. Please try again later.'); 
      });
  }, []); 
  


  const filteredPhotos = photos.filter(photo =>
    photo.title.toLowerCase().includes(searchTerm.toLowerCase()) 
  );


  return (
    <div className="App">
      <h1>Movies</h1>
    <input
     type="text"
     placeholder="Search by title"
     value={searchTerm}
     onChange={(e) => setSearchTerm(e.target.value)} 
     className="search-box"
    />
    
      <div className="photo-grid">
        {filteredPhotos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <h3>{photo.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoList;