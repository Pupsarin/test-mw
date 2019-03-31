import React from 'react';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import lightGreen from '@material-ui/core/colors/lightGreen';


const ListUserItem = props => {
    const { username, admin, isOnline } = props;
    let color = "";
    isOnline ? color = 'primary' : color = "secondary";
    return(
        <ListItem>
            { admin && <ListItemIcon><FiberManualRecord color={color} /></ListItemIcon> }
            <ListItemText primary={username} />
        </ListItem>
    );
}

export default ListUserItem;
