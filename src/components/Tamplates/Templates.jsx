import React, { useState } from 'react';
import './Templates.css';
import { Input, Radio, Button } from 'antd';
import { random } from '../../api/random/random';
import JokeCard from '../JokeCard/JokeCard';


const Templates = () => {
    const [value, setValue] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [showJokeCard, setShowJokeCard] =useState(false)
    
    const onChangeOptions = e => {
      setValue(e.target.value);
    };

    const onChangeSearch = e => {
      setSearchText(e.target.value);
    };

    
  const handleGetJoke = async () => {
    try {
      const result = await random.get()
      console.log('Joke data:', result);
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
                    { value: 1, label: 'Random' },
                    { value: 2, label: 'From categories' },
                    {
                    value: 3,
                    label: (
                <>
                Search
                {value === 3 && (
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
        <Button type="primary" className='button' onClick={() => setShowJokeCard(true)}>Get a joke</Button>

        {showJokeCard && <JokeCard />}
    </div>
            <div className="favourite-content">Favourite content</div>
       </div>
      
    );
}
export default Templates;
