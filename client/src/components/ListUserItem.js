import React from 'react';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const ListUserItem = props => {
    const { username, admin } = props;
    return(
        <ListItem button>
            { admin && <ListItemIcon><FiberManualRecord /></ListItemIcon> }
            <ListItemText primary={username} />
        </ListItem>
    );
}

export default ListUserItem;
