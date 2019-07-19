import {useState, useEffect} from 'react';

export const useHttp = (url, dependencies) => {
    const [isLoading, setLoading] = useState(false);
    const [fetchedData, setFetchedData ] = useState(null);

    // fetch('https://swapi.co/api/people')
    useEffect(() => {
        setLoading(true);
        console.log('Sending http requests ' + url);
        fetch(url)
        .then(response => {
            if (!response.ok) {
            throw new Error('Failed to fetch.');
            }
            return response.json();
        })
        .then(data => {
            setLoading(false);
            setFetchedData(data)
        })
        .catch(err => {
            console.log(err);
        });
    }, dependencies);

    return [isLoading, fetchedData];
}