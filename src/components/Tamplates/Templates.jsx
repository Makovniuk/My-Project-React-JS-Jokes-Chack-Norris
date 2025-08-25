import React, { useState, useEffect } from 'react';
import './Templates.css';
import { Input, Radio, Button } from 'antd';
import { apiJokes } from '../../api/apiJokes/apiJokes';
import JokeCard from '../JokeCard/JokeCard';
import CategoriesList from '../CategoriesList/CategoriesList';

const Templates = () => {
  const [value, setValue] = useState('random');
  const [searchText, setSearchText] = useState('');
  const [showJokeCard, setShowJokeCard] = useState(false);
  const [jokesData, setJokesData] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const onChangeOptions = async e => {
    const newValue = e.target.value;
    setValue(newValue);

    if (newValue === 'categories') {
      // грузим список категорий
      try {
        const result = await apiJokes.get(value);
        setCategories(result);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
  };

  const onChangeSearch = e => {
    setSearchText(e.target.value);
  };

  const handleGetJoke = async () => {
    try {
      let params = {};
      if (value === 'search') params = { query: searchText };
      if (value === 'categories' && selectedCategory) {
        setValue('category'); // меняем эндпоинт
        params = { category: selectedCategory };
      }

      const result = await apiJokes.get(value, params);
      setShowJokeCard(true);
      setJokesData(result);
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

        {/* Input показываем отдельно */}
        {value === 'search' && (
          <Input
            placeholder="Free text search..."
            onChange={onChangeSearch}
            style={{ width: 500, marginTop: 10 }}
          />
        )}

        {/* Категории показываем под радио */}
        {value === 'categories' && (
          <CategoriesList
            tagsData={categories}
            onSelectCategory={setSelectedCategory}
          />
        )}

        <Button type="primary" className="button" onClick={handleGetJoke}>
          Get a joke
        </Button>

        {showJokeCard && <JokeCard jokesData={jokesData} />}
      </div>

      <div className="favourite-content">Favourite content</div>
    </div>
  );
};

export default Templates;
