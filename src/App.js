import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import PostList from './components/PostList';
import PostItem from './components/PostItem';
import 'whatwg-fetch'
import {handleStateChange} from './stateHandlers';
import NavItem from './components/NavItem';
/*get users and companies */
function getUser(){
    return fetch('/constants/users.json')
        .then((response)=>response.json())
        .then(users=>{
            /* init cities and companies */
            let data = users.reduce((accumulator, currentValue)=>{
                let getCurrentCity = currentValue.address.city;
                let getCurrentCompanie = currentValue.company.name;
                /* get from accumulator */
                let {cities, companies} = accumulator;
                /* check presence - and if current items are absent - push them to arrays */
                if(cities.indexOf(getCurrentCity) === -1)
                    cities.push(getCurrentCity);
                if(companies.indexOf(getCurrentCompanie) === -1)
                    companies.push(getCurrentCompanie);
                return {
                    companies,
                    cities
                }
            }, {cities:[], companies:[]});

            return {
                users,
                data
            }
        });
}
/* just get posts */
function getPosts(){
    return fetch('/constants/posts.json')
        .then((response)=>response.json())
        .then(posts=>posts);
}

let setPosts = async (setState, state) => {
    const usersData = await getUser();
    let {users, data} = usersData;
    let posts = await getPosts();
    /* we want to remake posts array to simplify operations with it */

    posts = posts.map((post, index)=>{
        let user = users.find((user)=>user.id == post.userId);
        /*get data corresponding to users item */
        let {name:userName, address, company} = user;
        let {city} = address;
        let {name:companyName} = company;
        /* return new array of users and posts */
        return {
            ...post,
            city,
            userName,
            companyName
        }
    });
    return {
        ...data,
        posts,
        users
    };
};

class App extends Component {

    state = {
        users:[],
        posts:[],
        cities:[],
        companies:[],
        filters:{companyName:"select", city:"select", sort:'select', search:''},

    };

    constructor(props){
        super(props);
        /* attach to class state change handler and connect it to state key */
        this.handleStateChange = handleStateChange.bind(this, 'filters');
    }

    componentDidMount(){
        /* we want to in async way set state of our component */
        setPosts().then((data)=>{
            this.setState((state)=>({
                ...state,
                ...data
            }))
        });
    }

    deleteItem = (id) =>{
        let {posts} = this.state;
        posts = posts.filter((post)=>post.id != id);
        this.setState({
            posts
        });
    };

    render() {
        let {users = [], posts = [], cities=[], companies=[], filters, sort} = this.state;
        /* handle data is loading case */
        if (users.length === 0 || posts.length === 0)
            return <div>
                Pending
            </div>;

        return (
            <div className="App">
                <div className="App-header">
                    <h1>Posts</h1>
                    <NavItem
                        cities={cities}
                        companies={companies}
                        handleStateChange = {this.handleStateChange}
                    />
                </div>
                <p className="App-intro">
                    <PostList
                        posts={posts}
                        filters={filters}
                        sort={sort}
                        deleteItem={this.deleteItem}
                    />
                </p>
            </div>
        );
    }
}

export default App;
