import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import materialStyle from '../styles/materialStyle'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitUser = this.handleSubmitUser.bind(this);
    }

    handleChange(e) {
        this.setState({
        [e.target.name]: e.target.value
        })
    }

    handleSubmitUser(e){
        e.preventDefault();
        this.props.auth(this.state)
            .then((res) => {
                if (res) {
                    this.props.history.push('/');
                }   
            })
            .catch(()=>{
                return;
            })
        }

    render(){
        const { username, password } = this.state;
        const { classes, errors} = this.props;
        return(
        <div className={classes.authPage}>    
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    ENTER CHAT
                </Typography>
                <form className={classes.form} onSubmit={this.handleSubmitUser}>
                <FormControl margin="normal" required fullWidth>
                    <TextField 
                        name='username'
                        id='outlined-username'
                        onChange={this.handleChange}
                        value={username}
                        className={classes.textField}
                        label='Username'
                        type='text'
                        margin='normal'
                        variant='outlined'
                        autoFocus
                    />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <TextField 
                        name='password'
                        id='outlined-password'
                        className={classes.textField}
                        type='password'
                        value={password}
                        onChange={this.handleChange}
                        label='Password'
                        margin='normal'
                        variant='outlined'
                    />
                </FormControl>
                {
                    errors.message 
                    && <SnackbarContent style={{color: 'red'}} message={errors.message} />
                }
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    ENTER
                </Button>
                </form>
            </Paper>
            </div>
        )
    }
}

export default withStyles(materialStyle)(AuthForm);
