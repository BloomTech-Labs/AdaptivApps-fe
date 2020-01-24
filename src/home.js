import React, { useEffect } from 'react';
import chif from './photos/chif.chif';



const Home = () => {
    useEffect(() => {
        window.chifPlayer.streamFiles();
    }, []);
    return (
        <div className= "chifContain">
            <chear className="chifOne" src={require('./photos/chif.chif')}></chear>
            <chear className="chifOne" src={require('./photos/chif2.chif')}></chear>
            <chear className="chifOne" src={require('./photos/chif3.chif')}></chear>
        </div>
    )
}

export default Home