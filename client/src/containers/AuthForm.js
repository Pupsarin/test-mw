import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import materialStyle from '../styles/materialStyle'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SnackbarContent from '@material-ui/core/SnackbarContent';


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
                if (res.user.id) {
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
            <form className={classes.userCabinet} onSubmit={this.handleSubmitUser}>
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
                />
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
                {
                    errors.message 
                    && <SnackbarContent style={{color: 'red'}} message={errors.message} />
                }
                <Button
                    variant='contained'
                    className={`${classes.formButton} ${classes.signButton}`}
                    type='submit'
                >
                    Enter
                </Button>
            </form>
        )
    }
}

export default withStyles(materialStyle)(AuthForm);
