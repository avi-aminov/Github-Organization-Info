import React from 'react';

const Rearch = ({searchInput, handleChange, handleClick}) => {

    return (
        <div> 
            <input 
                className="form-label" type="text" placeholder='search' 
                value={searchInput} onChange={handleChange}
            />
            <button 
                type="button" className="btn" 
                onClick={handleClick}>
            Load
            </button>
        </div>
    );
};

export default Rearch;