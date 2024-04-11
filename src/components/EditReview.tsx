import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import EditorBox from './EditorBox';
import BASE_URL from '../config';

function EditReview({ data /* id */ }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [reviewContent, setReviewContent] = useState('');
  const handleContentChange = (newContent) => {
    setReviewContent(newContent);
  };

  // const tracksByDisc = {};
  // const tracks = [];

  // const [trackRating, setTrackRating] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    status: 'public',
    albumRating: 0,
    body: '',
  });

  /*
  data?.albumData.tracks.items.forEach((track,index) => {
      const discNumber = track.disc_number || 1; 
      if (!tracksByDisc[discNumber]) {
        tracksByDisc[discNumber] = [];
      }
      tracksByDisc[discNumber].push(track);
      tracks.push(`disc${discNumber-1}-${index + 1}.${track.name}`)
    });
  */

  useEffect(() => {
    if (data) {
      setFormData({
        ...formData,
        title: data?.review.title,
        status: data?.review.status,
        albumRating: data?.review.albumRating,
        body: data?.review.body,
      });

      /*
      const trackRatingArray = Array(data?.albumData.tracks.items.length || 0).fill(null);
      setTrackRating(trackRatingArray);
    */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.albumRating !== 0 && formData.title !== '') {
      const combinedData = {
        ...formData,
        body: reviewContent,
      };

      fetch(`${BASE_URL}/album/api/review/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedData),
      })
        .then((response) => response.json())
        .then(() => {
          navigate(`/album/review/${id}`);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (formData.albumRating === 0) {
      if (typeof window !== 'undefined') {
        window.alert('평점을 입력해주세요');
      }
    } else if (formData.title === '') {
      alert('앨범평을 입력해주세요');
    }
  };

  /*
    const renderTracks = Object.keys(tracksByDisc).map(discNumber => (
      <div key={discNumber}>
        <h3>Disc {discNumber}</h3>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
     
          {tracksByDisc[discNumber].map((track, index) => (
         
        <div style={{display:'flex'}} key={index}> 
        {index+1}. {track.name} - 
        {trackRating && (
  <Stack spacing={1}>
    <Rating 
      name="trackRating" 
      value={trackRating[index]}
      precision={0.5}
      onChange={(event, newValue) => {
        const updatedRating = [...trackRating];
        updatedRating[index] = newValue;
        setTrackRating(updatedRating);
      }}
    />
  </Stack>
)}

      </div>
      
          ))}
      
        </div>
      </div>
    ));

*/

  return (
    <div className="Edit-review">
      <h3>작성페이지</h3>

      <form>
        <h5>앨범 평점:</h5>

        <Stack style={{ alignItems: 'center' }} spacing={1}>
          <Rating name="albumRating" value={formData.albumRating} precision={0.5} onChange={handleFormData} />
        </Stack>

        <h5>트랙별 평점:</h5>

        {/*
    {renderTracks}
  */}

        <div className="row">
          <div className="input-field">
            <input type="text" id="title" name="title" onChange={handleFormData} value={formData.title} required />
            <label htmlFor="title">한줄평</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <select id="status" name="status" value={formData.status} onChange={handleFormData}>
              <option value="public" selected>
                공개
              </option>
              <option value="private">비공개</option>
            </select>
            <label htmlFor="status">공개 여부</label>
          </div>
        </div>

        <h5>리뷰 작성</h5>

        <div style={{ margin: '50px' }} className="row">
          <h5>리뷰 작성하기:</h5>

          <EditorBox onContentChange={handleContentChange} value={formData.body} />
        </div>

        <Button variant="outlined" size="small" type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </form>
    </div>
  );
}

export default EditReview;
