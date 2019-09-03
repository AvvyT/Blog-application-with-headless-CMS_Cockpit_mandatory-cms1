import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import './Home.css';

const api = 'http://192.168.99.100:8080/api/collections/get/Articles?limit=10&skip=3';

function Home() {
    const [articles, updateArticles] = useState([]);
    const [filtreradArticle, updatefiltreradArticle] = useState([]);

    useEffect(() => {

        axios.get(api)
            .then((response) => {
                //console.log(response.data.entries);
                updateArticles(response.data.entries);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const Filtrera = () => {
        axios.get('http://192.168.99.100:8080/api/collections/get/Articles?filter[{FILTERNAME}]={FILTERVALUE}')
            .then((response) => {
                //console.log(response.data.entries);
                updateArticles(response.data.entries);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="App-header">
            <Helmet>
                <title>Home page</title>
            </Helmet>
            <h3 style={{ color: 'purple' }}>Best-selling fiction authors</h3>

            <label>Filter <input
                type="text"
                className='slyle_input'
                placeholder=' Write one article..'
                value={filtreradArticle}
                onClick={Filtrera}
                onChange={e => {
                    updatefiltreradArticle(e.target.value);
                }}
            ></input></label>

            <button className='stylle_back'><Link to={'/authors'}>All authors</Link></button>
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