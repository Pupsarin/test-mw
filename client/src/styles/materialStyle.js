import lightBlue from '@material-ui/core/colors/lightBlue';
const drawerWidth = 270;

const materialStyle = theme => ({
    main: {
        display: 'flex',
        flexDirection: 'row',
    },
    link: {
        textDecoration: 'none'
    },
    appBar: {
        top: 'auto',
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
        // theme.mixins.toolbar,
        flexGrow: 1,
        paddingLeft: 15,
        [theme.breakpoints.up('sm')]: {
            marginLeft: drawerWidth,
        },
    }
})

export default materialStyle;