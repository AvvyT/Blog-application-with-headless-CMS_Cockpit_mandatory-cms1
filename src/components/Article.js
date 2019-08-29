import React from 'react';
import { Helmet } from 'react-helmet';


function Article() {
    return (
        <div>
            <Helmet>
                <title>Article page</title>
            </Helmet>
            <p>one article...</p>
        </div>
    );
}

export default Article;