import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios';


const api = 'http://192.168.99.100:8080/api/collections/get/Authors';

function Authors() {
    const [authors, updateAuthors] = useState([]);

    useEffect(() => {

        axios.get(api)
            .then((response) => {
                console.log(response.data.entries);
                updateAuthors(response.data.entries);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className="App-header">
            <Helmet>
                <title>Authors page</title>
            </Helmet>
            <button className='stylle_back'><Link to={'/'}>Home page</Link></button>
            <h2 style={{ color: 'purple' }}>Authors Galleri</h2>
            <div className='my_galleri'>
                {authors.map((author) => (
                    <div key={author._id} className='one'>
                        <h3>{author.name}</h3>
                        <div><img alt='' src={author.avatar.path}></img></div>
                        <p style={{ color: 'lightgreen' }}>{author.description}</p>
                        <br></br>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Authors;