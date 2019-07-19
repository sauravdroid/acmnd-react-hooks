import React, { useEffect } from 'react';
import {useHttp} from '../hooks/http';

import Summary from './Summary';

const Character = props => {
    const [isLoading, fetchedData] = useHttp('https://swapi.co/api/people/' + props.selectedChar, [props.selectedChar]);
    let loadedCharacter = {};

    if (fetchedData) {
        loadedCharacter = {
            id: props.selectedChar,
            name: fetchedData.name,
            height: fetchedData.height,
            colors: {
                hair: fetchedData.hair_color,
                skin: fetchedData.skin_color
            },
            gender: fetchedData.gender,
            movieCount: fetchedData.films.length
        };
    }

    // This will render for the first render and also the renders where props.selectedChar changed
    // useEffect(() => {
    //     fetchData();
    //     return () => {
    //         console.log('This will run, just before the useEffect is run the next time ')
    //     };
    // }, [props.selectedChar]);

    // Component will unmount
    useEffect(() => {
        return () => {
            console.log('Component Will Unmount')
        }
    }, [])
  
    let content = <p>Loading Character...</p>;

    if (!isLoading && loadedCharacter.id) {
        content = (
            <Summary
                name={loadedCharacter.name}
                gender={loadedCharacter.gender}
                height={loadedCharacter.height}
                hairColor={loadedCharacter.colors.hair}
                skinColor={loadedCharacter.colors.skin}
                movieCount={loadedCharacter.movieCount}
            />
        );
    } else if (!isLoading && !loadedCharacter.id) {
        content = <p>Failed to fetch character.</p>;
    }

    return content; 
}

// export default Character;

export default React.memo(Character);

// React.memo - can be used as shouldComponentUpdate
