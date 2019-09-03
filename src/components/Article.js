import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Article() {
    const [articles, updateArticles] = useState([]);

    // splitta pathname med / så att vi kan separera ut article id
    const pathSplit = window.location.pathname.split('/');
    // nu har vi en array med 3 delar där sista är vårat id så vi tar ut det
    //console.log(pathSplit);
    const id = pathSplit[2];

    const api = `http://192.168.99.100:8080/api/collections/get/Articles/Case?token=mytoken&filter[_id]=${id}`;

    useEffect(() => {

        axios.get(api)
            .then((response) => {
                console.log(response.data.entries);
                updateArticles(response.data.entries);
            })
            .catch(error => {
                console.log(error);
            });
    }, [api]);

    return (
        <div className="App-header">
            <Helmet>
                <title>Article page</title>
            </Helmet>
            <button className='stylle_back'><Link to={'/'}>Home page</Link></button>

            {articles.map((article) => (
                <div key={article._id} className='style_article'>
                    <h2 style={{ color: 'purple' }}>{article.title}</h2>
                    <p>{article.author.display}, Max sales: {article.max_sales}</p>
                    <p style={{ color: 'lightgreen' }}>{article.body}</p>
                    <p>Published first storie: {article.published_on}</p>
                    <p>Nationality: {article.nationality}, Total books: {article.books}</p>
                </div>
            ))}

        </div>
    );
}

export default Article;