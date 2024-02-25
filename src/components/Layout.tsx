import {Link, Outlet} from "react-router-dom";
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import {BusinessOutlined} from "@mui/icons-material";

const drawerWidth = 200

const Layout = () => {
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`,
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    boxShadow: 'none',
                    borderBottom: "1px solid #e0e0e0"
                }}
            >
                <Toolbar>
                    <Typography variant="h6"
                                noWrap
                                component="div">
                        HCB Admin
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Divider/>
                <List dense>
                    <Link to={'/'}>
                        <ListItem
                            dense
                            disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <BusinessOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Organizations'}/>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </List>
                <Divider/>
            </Drawer>
            <Box
                component="main"
                sx={{flexGrow: 1, bgcolor: 'background.default', p: 3}}
            >
                <Toolbar/>
                <Outlet/>
            </Box>
        </Box>
    )
}

export default Layout