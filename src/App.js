import React, {useState} from 'react';
import axios from 'axios';
import './app.css';

// components
import Results from './components/Results';
import Info from './components/Info';
import Search from './components/Search';

const API_BASIC_PATH = 'https://api.github.com';

const App = () => {

    // states 
    const [searchInput, setSearchInput] = useState("");
    const [repo, setRepo] = useState([]);
    const [contributors, setContributors] = useState([]);
    const [user, setUser] = useState([]);

    // get contributors by by search value and repo name
    const getContributors = (name) => async (e) => {
        try{
            const result = await axios(`${API_BASIC_PATH}/repos/${searchInput}/${name}/contributors`);
            setContributors(result.data[0]);
            getUser(name);
        }catch (e){
            console.log("err", e);
        } 
    };

    // get user data by search value
    const getUser = async (name) => {
        try{
            const result = await axios(`${API_BASIC_PATH}/users/${searchInput}`);
            setUser(result.data);
        }catch (e){
            console.log("err", e);
        } 
    };

    // get results handle
    const handleClick = async () => {
        try{
            const result = await axios(`${API_BASIC_PATH}/users/${searchInput}/repos`);
            setRepo(result.data);
        }catch (e){
            console.log("err", e);
        }   
    };

    // handle search state change
    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    // clear info state
    const handleInfoClear = () => {
        setContributors([]);
    };

    return (
        <> 
        {
            contributors && contributors.length !== 0 
            ? 
                <Info 
                    avatar={contributors.avatar_url} 
                    name={user.name} 
                    url={user.html_url}
                    back={handleInfoClear}
                />
            : 
                <>
                    <Search 
                        searchInput={searchInput} 
                        handleChange={handleChange} 
                        handleClick={handleClick}
                    />
                    <Results data={repo} handleContributors={getContributors}/>
                </>
        }
        </>
    );
};

export default App;