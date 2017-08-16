import React, {Component, PropTypes} from 'react';

const NavItem = ({cities, companies, handleStateChange}) => {
    cities = ['select'].concat(cities);
    companies = ['select'].concat(companies);
    return <nav>

        <label>City filter:
            <select name="city" onChange={handleStateChange}>
                {
                    cities.map((el, i)=><option value={el} key={i}>{el}</option>)
                }
            </select>
        </label>

        <label>Company filter:
            <select name="companyName" onChange={handleStateChange}>
                {
                    companies.map((el, i)=><option value={el} key={i}>{el}</option>)
                }
            </select>
        </label>

        <label>Quick search by post title <input onChange={handleStateChange} name="search" type="text"/></label>
        <hr />
        <label>Sort by:
            <select name="sort" onChange={handleStateChange}>
                <option >select</option>
                <option value={'userName'}>Author name</option>
                <option value={'city'}>City name</option>
                <option value={'companyName'}>Company name</option>
            </select>
        </label>
    </nav>
};

export default NavItem;