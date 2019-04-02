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
        paddingBottom: appBarHeight + 5 
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
})

export default materialStyle;