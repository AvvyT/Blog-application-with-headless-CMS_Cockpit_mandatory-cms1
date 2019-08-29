import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import './Home.css';

const api = 'http://192.168.99.100:8080/api/collections/get/Articles';

function Home() {
    const [articles, updateArticles] = useState([]);

    useEffect(() => {

        axios.get(api)
            .then((response) => {
                console.log(response.data.entries);
                updateArticles(response.data.entries);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className="App-header">
            <Helmet>
                <title>Home page</title>
            </Helmet>
            <h1>BloggApp</h1>
            <h3 style={{ color: 'purple' }}>Best-selling fiction authors</h3>

            <table className='style_tab'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Published</th>
                        <th>Author</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article) => (
                        <tr key={article._id} className='style_td'>
                            <td><Link to={'/article/' + article._id}>{article.title}</Link></td>
                            <td>{article.published_on}</td>
                            <td>{article.author.display}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;