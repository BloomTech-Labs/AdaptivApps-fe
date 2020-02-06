import React, { useState } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

export default function video() {
    const VideoContain = styled.div`
    position: absolute;
    top: 30vh;
    right: 0;
    padding: 1%;
    margin: auto;
    width:50%;
    `


    return (
        <VideoContain>
            <ReactPlayer width="100%" style={{ heigth:"10vh"}} url="https://www.youtube.com/watch?v=YPl-XPnjfhw" controls={true} />
        </VideoContain>
    )
}