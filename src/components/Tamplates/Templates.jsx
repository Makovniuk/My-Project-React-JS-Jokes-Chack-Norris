import React, { useState, useEffect } from 'react';
import './Templates.css';
import { Input, Radio, Button } from 'antd';
import { apiJokes } from '../../api/apiJokes/apiJokes';
import JokeCard from '../JokeCard/JokeCard';
import CategoriesList from '../CategoriesList/CategoriesList';
import JokesList from '../JokesList/JokesList';

const Templates = () => {
  const [value, setValue] = useState('random');
  const [searchText, setSearchText] = useState('');
  const [showJokeCard, setShowJokeCard] = useState(false);
  const [jokesData, setJokesData] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [favoriteList, setFavoriteList] = useState([]);

  const toggleFavourite = (joke) => {
    setFavoriteList (prev => {
      const exist = prev.some(f => f.id === joke.id);
      if (exist) {
        return prev.filter( f => f.id !== joke.id);
      } else {
        return [...prev, joke]
      }
    }) 

  }



  // Загружаем категории один раз, когда value меняется на 'categories'
  useEffect(() => {
    if (value === 'categories' && categories.length === 0) {
      const fetchCategories = async () => {
        try {
          const result = await apiJokes.get('categories', {});
          setCategories(result);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
      fetchCategories();
    }
  }, [value, categories.length]);

  const onChangeOptions = e => {
    setValue(e.target.value);
    setShowJokeCard(false); // сбросить предыдущий анекдот
  };

  const onChangeSearch = e => {
    setSearchText(e.target.value);
  };

  const handleGetJoke = async () => {
    try {
      let endpoint = value;
      let params = {};

      if (value === 'search') {
        params = { query: searchText };
      } else if (value === 'categories' && selectedCategory) {
        endpoint = 'random'; // используем корректный эндпоинт
        params = { category: selectedCategory };
      }

      const result = await apiJokes.get(endpoint, params);
      setJokesData(result);
      setShowJokeCard(true);
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  return (
    <div className="wraper">
      <div className="main-content">
        <h2>Hey!</h2>
        <h3>Let’s try to find a joke for you:</h3>

        <Radio.Group
          className="radio-group"
          onChange={onChangeOptions}
          value={value}
          options={[
            { value: 'random', label: 'Random' },
            { value: 'categories', label: 'From categories' },
            { value: 'search', label: 'Search' },
          ]}
        />

        {value === 'search' && (
          <Input
            className='input-search'
            placeholder="Free text search..."
            onChange={onChangeSearch}
            value={searchText}
          />
        )}

        {value === 'categories' && (
          <CategoriesList
            tagsData={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        )}

        <Button
          type="primary"
          className="button"
          onClick={handleGetJoke}
          disabled={value === 'categories' && !selectedCategory} // нельзя получить шутку без выбора категории
        >
          Get a joke
        </Button>

        {showJokeCard && (
          Array.isArray(jokesData.result) 
          ? <JokesList 
          jokesData={jokesData} 
          favoriteList={favoriteList}
          onToggleFavourite={toggleFavourite}
        />        
          : <JokeCard
          jokesData={jokesData}
          isFavourite={favoriteList.some(f => f.id === jokesData.id)}
          onToggleFavourite={() => toggleFavourite(jokesData)}
        />
        )}
      </div>

      <div className="favourite-content">
        <h3>My favourite jokes</h3>
      {favoriteList.length > 0
    ? favoriteList.map(joke => (
        <JokeCard
          key={joke.id}
          jokesData={joke}
          isFavourite={true}
          onToggleFavourite={() => toggleFavourite(joke)}
          compact
        />
      ))
    : <p>No favourites yet</p>}
    </div>
    </div>
    
  );
};

export default Templates;
