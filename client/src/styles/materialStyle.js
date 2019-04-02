import lightBlue from '@material-ui/core/colors/lightBlue';
const drawerWidth = 270;
const appBarHeight = 50;

const materialStyle = theme => ({
    main: {
        display: 'flex',
        flexDirection: 'row',
    },
    link: {
        textDecoration: 'none'
    },
    appBar: {
        flexDirection: 'row',
        top: 'auto',
        height: appBarHeight, 
        bottom: 0,
        backgroundColor: lightBlue[50],
        paddingLeft: 15,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    drawerPaper: {
        width: drawerWidth
    },
    messages: {
        flexGrow: 1,
        paddingLeft: 15,
        [theme.breakpoints.up('sm')]: {
            marginLeft: drawerWidth,
        },
    },
    sendForm: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',

    },
    chatMessages: {
        paddingBottom: appBarHeight + 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        maxWidth: '100%'
    },
    card: {
        margin: '5px 5px 5px -10px',
    },
    cardContent: {
        '&:last-child': {
            paddingBottom: 5
        },
        padding: 10,
    },
    messageText: {
        color: '#fff',
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',
    },
    messageInput: {
        width: '100%'
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    authPage: {
            width: 'auto',
            display: 'block',
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 3,
            [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
                width: 400,
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        },
    paper: {
        marginTop: theme.spacing.unit * 8,
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
})

export default materialStyle;