import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Info = ({avatar, name, url, back}) => {

    const data = {
        labels: ['count', 'percent'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
    };
    
    return (
        <>
            <button 
                type="button" className="btn" 
                onClick={back}>
                <i class="ri-arrow-left-line"></i> Back
            </button>

            <div className="container">
                <div className="row center">
                    <div className="details">
                        <img src={avatar}  alt="" className="avatar" />
                        <div className='personal-details'>
                            <h5>{name}</h5>
                            <p>
                                <a target="_blank" href={url}>
                                    View Profile
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="char-data">
                        <Pie data={data} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Info;