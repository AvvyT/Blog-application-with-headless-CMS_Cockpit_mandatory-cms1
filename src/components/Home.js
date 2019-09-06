import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import './Home.css';


function Home(props) {
    const [articles, updateArticles] = useState([]);
    const [numberPosts, updateNumberposts] = useState(1);
    const [currentPage, updateCurrentPage] = useState(1);

    const limit = 3;
    // då börjar page från 0, annars hopper över 3
    let skip = (currentPage - 1) * limit;
    let page = props.match.params.page;
    const api = `http://192.168.99.100:8080/api/collections/get/Articles/Case?token=mytoken&sort[published_on]=-1&limit=${limit}&skip=${skip}&page=${page}`;

    useEffect(() => {

        axios.get(api)
            .then((response) => {
                //console.log(response.data.total);
                updateNumberposts(response.data.total);
                updateArticles(response.data.entries);
            })
            .catch(error => {
                console.log(error);
            });
    }, [api]);

    const displaynum = () => {
        // Logic for displaying page numbers
        // Math.ceil => Round a number upward to its nearest integer
        let pageNumbers = Math.ceil(numberPosts / limit);
        //console.log(pageNumbers); // => 3

        let allPages = [];
        for (let index = 1; index <= pageNumbers; index++) {
            allPages.push(index);
        }
        //console.log(allPages);

        return <>
            {allPages.map(number => (
                <li
                    key={number}
                    onClick={() => {
                        updateCurrentPage(number);
                        //console.log(currentPage);
                    }}
                >{number}
                </li>
            ))}
        </>
    }

    return (
        <div className="App-header">
            <Helmet>
                <title>Home page</title>
            </Helmet>
            <h3 style={{ color: 'purple' }}>Best-selling fiction authors</h3>

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
            <ul className="page-numbers">
                {displaynum()}
            </ul>
        </div>
    );
}

export default Home;