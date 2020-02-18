import React, { useState } from 'react';
import './StarWars.css'

const StarWars = () => {

    // state variables to manage state for all api calls
    const [buttonClicked, setbuttonClicked] = useState(false);
    const [LongestOpeningCrawl, setLongestOpeningCrawl] = useState('');
    const [MostAppearencesCharacter, setMostAppearencesCharacter] = useState('');
    const [MostAppearencessSpecies, setMostAppearencessSpecies] = useState('');
    const [MostPlanetVehicles, setMostPlanetVehicles] = useState('');

    // loader while data is being fetched
    const loader = <div className="loader"></div>;

    // main function when button is clicked
    const showResults = () => {
        
        // toggle button state on click
        setbuttonClicked(!buttonClicked);

        // Don't call api when hiding data
        if(buttonClicked){
            return false;
        }
        // API Server url to fetch data
        const API_SERVER = 'http://starwars.us-west-2.elasticbeanstalk.com';

        // fetach data from apis
        fetch(API_SERVER + '/api/film/LongestOpeningCrawl')
            .then(res => res.json())
            .then((data) => {
                setLongestOpeningCrawl(data[0]);
            })
            .catch(console.log);

        fetch(API_SERVER + '/api/film/MostAppearencesCharacter')
            .then(res => res.json())
            .then((data) => {
                setMostAppearencesCharacter(data);
            })
            .catch(console.log);

        fetch(API_SERVER + '/api/film/MostAppearencessSpecies')
            .then(res => res.json())
            .then((data) => {
                setMostAppearencessSpecies(data);
            })
            .catch(console.log);

        fetch(API_SERVER + '/api/film/MostPlanetVehicles')
            .then(res => res.json())
            .then((data) => {
                setMostPlanetVehicles(data);
            })
            .catch(console.log);
    }

    return (
        <div className="mainBox">
            
            <div className="logo">
                <img src="/Star_Wars_Logo.png" alt="Star Wars"></img>
            </div>
            <div className="btnContainer">
                <button className={buttonClicked ? 'clicked' : ''} onClick={() => { showResults() }}>
                    <div className="btnWrapper">
                        <div className="btnTxt"><span className="star">★</span> &nbsp; Do. Or do not. There is no try. &nbsp; <span className="star">★</span></div>
                    </div>
                </button>
            </div>

            {/* 4 questions with their data */}
            <div className={"dataDetail " + (buttonClicked === true ? 'show' : 'hide')}>
                <div className="question">
                    Which of all Star Wars movies has the longest opening crawl?
                </div>
                <div className="answer crawl">
                    {LongestOpeningCrawl === '' ? loader : LongestOpeningCrawl.map((item, index) => <div key={index}>{item.title}</div>)}
                </div>

                <div className="question">
                    What character (person) appeared in most of the Star Wars films?
                </div>
                <div className="answer person">
                    {MostAppearencesCharacter === '' ? loader : MostAppearencesCharacter.map((item, index) => <div key={index}>{item}</div>)}
                </div>

                <div className="question">
                    What species appeared in the most number of Star Wars films?
                </div>
                <div className="answer species">
                    {MostAppearencessSpecies === '' ? loader : MostAppearencessSpecies.map((item, index) => <div key={index}>{item}</div>)}
                </div>

                <div className="question">
                    What planet in Star Wars universe provided largest number of vehicle pilots?
                </div>
                <div className="answer planet">
                    {/* format received data according to required specification */}
                    {MostPlanetVehicles === '' ? loader : MostPlanetVehicles.map((item, index) => {
                        return (
                            <div key={index}>
                                {item.reduce(function (prevVal, currVal, index) {
                                    return index === 0 ? (currVal.planet_name + " - Pilots: (" + item.length + ") " + currVal.pilot_name + " - " + currVal.species_name)
                                        : prevVal + ', ' + currVal.pilot_name + " - " + currVal.species_name;
                                }, '')}
                            </div>);
                    })}
                </div>

            </div>

        </div>
    );
}

export default StarWars;
