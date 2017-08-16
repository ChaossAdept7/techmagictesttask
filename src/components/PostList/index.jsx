import React from 'react';
import PostItem from './../PostItem';

const PostList = ({posts, filters, deleteItem}) => {
    let {city, companyName, sort, search} = filters;
    /*filtering */
    if( city != 'select')
        posts = posts.filter((post)=>post['city'] == city);
    if(companyName != 'select')
        posts = posts.filter((post)=>post['companyName'] == companyName);
    /* sorting */
    if(sort != 'select')
        posts.sort((current, next)=>{
            let currentSortField = current[sort];
            let nextSortField = next[sort];
            //current is lesser
            if(currentSortField > nextSortField)
                return 1;
            //next is lesser
            if(currentSortField < nextSortField)
                return -1;
            /* are equal */
            return 0;
        });

    /* searching */
    if(search != '')
        posts = posts.filter((post)=> post.title.indexOf(search) != -1);

    /* deleting */

    return <div>
        {
            posts.map((post, index)=>{
                return <PostItem
                    post={post}
                    key={index}
                    deleteItem={deleteItem}
                />
            })
        }
    </div>
}

export default PostList;

