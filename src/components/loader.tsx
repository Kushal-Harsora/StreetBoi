import React from 'react'

const Loader = ({ progress } : { progress: number }) => {
    return (
        <React.Fragment>
            <div className="preloader">
                <div className="loader">
                    <p>Loading... {progress * 100}%</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Loader