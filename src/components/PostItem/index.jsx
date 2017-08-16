import React, {Component, PropTypes} from 'react';

const PostItem = ({post, deleteItem}) => {
    let {title, body, companyName, city, userName, id} = post;
    return <article>
        <h2 className="capitalize">{title}</h2>
        <span>{userName}</span> - <span>{companyName}</span> - <span>{city}</span>
        <p className="capitalize">{body}</p>
        <button onClick={()=>deleteItem(id)}>X</button>
    </article>
};

export default PostItem;

