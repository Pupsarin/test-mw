import React from 'react';
import { connect } from 'react-redux';

const MessageList = () => {
    return(
        <ul>
            <li><b>user1: </b><br/>text1</li>
            <li><b>user2: </b><br/>text13</li>
            <li><b>user1: </b><br/>text154</li>
        </ul>
    );
}

export default MessageList;