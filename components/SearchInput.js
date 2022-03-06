import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
const SearchInput = ({value , onChange}) => {

 

    return (
        
        <div className="searchBox">

            <input value={value} onChange={e => onChange(e)} className="searchInput" type="text" name="" placeholder="Search" />
            <button className="searchButton" href="#">
                <SearchIcon htmlColor='white'/>
            </button>
        </div>


    );
};

export default SearchInput;