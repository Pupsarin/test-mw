
import React, { Component }from 'react';
import { withStyles } from '@material-ui/core/styles';
import materialStyle from '../styles/materialStyle';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withDelay from '../hocs/withDelay'

class ChatMessage extends Component {
    componentDidMount() {
        this.scrollToBottom({behavior: 'smooth'});
    }
    scrollToBottom = (behavior) => {
        this.messagesEnd.scrollIntoView(behavior);
    }

    render() {
        const { message, username, usernameColor, classes } = this.props;
        return (
                <>
                    <Card style={{backgroundColor: usernameColor}} className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography className={classes.messageText} gutterBottom>
                                {username}
                            </Typography>
                            <Typography className={classes.messageText} variant="h5" component="h2">
                                {message}
                            </Typography>
                        </CardContent>
                    </Card>
                    <div ref={(el) => { this.messagesEnd = el; }}></div>
                </>
        )
    }
}

export default withStyles(materialStyle)(withDelay(ChatMessage));


