import React, { useState } from 'react'
import DeepDiveDemo from './Demo'

const App: React.FC = () => {
    return (
        <div className="container">
            <br />
            <h1>Deep Dive Function Demo</h1>
            <h3>A simple function to query and mutate values in deep objects and arrays. </h3>
            <br />
            <div className="">
                <DeepDiveDemo />
            </div>
            <br />
            <br />
        </div>
    )
}

export default App
