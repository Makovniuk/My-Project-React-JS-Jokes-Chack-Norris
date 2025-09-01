import './JokeCard.css';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useState } from 'react';

const JokeCard = ({ jokesData, isFavourite, onToggleFavourite, compact = false }) => {

const dateFromBackend = new Date(jokesData.updated_at.replace(/(\.\d{3})\d+/, '$1'));
const now = new Date();
const diffMs = now - dateFromBackend;
const hoursPassed = (diffMs / (1000 * 60 * 60)) / 8640;

return (

<div className={`jokes-card ${compact ? "compact" : ""}`}>
  <div className="content-card">
    <div
      onClick={onToggleFavourite}
      className={`heart-icon ${isFavourite ? "liked" : ""}`}
    >
      {isFavourite ? <HeartFilled /> : <HeartOutlined />}
    </div>
    <h5>{jokesData.value}</h5>
    <p className="update-data">Last update: {hoursPassed.toFixed()} years ago</p>
    <h3 className="categori">{jokesData.categories}</h3>
  </div>
</div>
)
};

export default JokeCard;