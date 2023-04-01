import React from 'react';
import cl from './MyProgress.module.css'

const MyProgress = ({value, max}) => {
    return (
        <progress
            value={value}
            max={max}
            className={cl.progress}
        />
    );
};

export default MyProgress;