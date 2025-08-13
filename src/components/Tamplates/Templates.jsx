import React, { useState } from 'react';
import './Templates.css';
import { Input, Radio, Button } from 'antd';
import { apiJokes } from '../../api/apiJokes/apiJokes';
import JokeCard from '../JokeCard/JokeCard';


const Templates = () => {
    const [value, setValue] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [showJokeCard, setShowJokeCard] =useState(false);
    const [jokesData, setJokesData] = useState({});
    
    const onChangeOptions = e => {
      setValue(e.target.value);
    };

    const onChangeSearch = e => {
      setSearchText(e.target.value);
    };

    
    const handleGetJoke = async () => {
      try {
        const params = value === 'search' ? { query: searchText } : {};
        const result = await apiJokes.get(value, params);
        setShowJokeCard(true);
        setJokesData(result);
        console.log(jokesData)
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
                    {
                    value: 'search',
                    label: (
                <>
                Search
                {value === 'search' && (
                    <Input
                    variant="filled"
                    placeholder="Free text search..."
                    onChange={onChangeSearch}
                    style={{ width: 500, marginInlineStart: 20 }}
                    />
                )}
            </>
          ),
        },
      ]}
    />
        <Button type="primary" className='button' onClick={() => handleGetJoke()}>Get a joke</Button>

        {showJokeCard && <JokeCard jokesData ={jokesData} />}
    </div>
            <div className="favourite-content">Favourite content</div>
       </div>
      
    );
}
export default Templates;
