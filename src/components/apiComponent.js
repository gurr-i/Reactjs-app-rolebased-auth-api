import React from 'react';
import { useState, useEffect } from 'react';

function ApiComponent() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [apiResponseData, setApiResponseData] = useState([]);
    // var headers = { "Access-Control-Allow-Origin": "*", }

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("http://localhost:8080/api/tutorials/", {
            method: "GET",
            mode: 'cors',
            // headers: headers
        })
            // .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    return data.json()
                    // setApiResponseData(data);
                    // console.log("Result:", data.body);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                    console.log(error)
                }
            )
            .then((result) => {
                setApiResponseData(result);
                console.log(apiResponseData)
            }).catch((err) => {
                console.log(error)
            });
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <ul>
                {apiResponseData.map(apidata => (
                    <li key={apidata.id}>
                        {apidata.title} {apidata.description} {apidata.published}
                    </li>
                ))}
            </ul>
        );
    }
}

export default ApiComponent