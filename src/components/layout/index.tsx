import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import { Avatar, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import jsCookie from 'js-cookie';
import { useRouter } from 'next/router';
import * as React from 'react';
import { ReactNode } from 'react';
import useSession from '../../hook/useSession';

const drawerWidth = 240;

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children: ReactNode
}

export default function Layout(props: Props) {

    const { window } = props;
    const router = useRouter()
    const session = useSession()
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const signOut = () => {
        jsCookie.remove("id")
        jsCookie.remove("name")
        jsCookie.remove("email")
        jsCookie.remove("role")
        jsCookie.remove("access")
        router.push("/login")
    }

    const navConfig = [
        {
            text: "Map",
            icon: <MapRoundedIcon sx={{ color: "white" }} />,
            route: "/"
        }, {
            text: "List",
            icon: <FormatListBulletedRoundedIcon sx={{ color: "white" }} />,
            route: "/list"
        }, {
            text: "Dashboard",
            icon: <DashboardIcon sx={{ color: "white" }} />,
            route: "/dashboard"
        }
    ]
    const drawer = (
        <>
            <Stack direction="column" sx={{
                backgroundColor: "#9B887A",
                height: "100vh",
            }} justifyContent="space-between" >
                <Stack>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 2 }} >
                        <Avatar src="https://marketplace.canva.com/EAE6OH6DF2w/1/0/1600w/canva-moon-astronaut-character-twitch-profile-picture-0kkgyJSodt4.jpg" />
                        <Typography color="white">{session.name}</Typography>
                    </Stack>
                    <Divider />
                    <List>
                        {navConfig.map((item) => {
                            if (session.role !== "user" && item.route === "/") {

                            } else {
                                return (
                                    <ListItem key={item.text} disablePadding>
                                        <ListItemButton onClick={() => router.push(item.route)}>
                                            <ListItemIcon>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText sx={{ color: "white" }} primary={item.text} />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            }
                        })}
                    </List>
                </Stack>
                <ListItem key={"Déconnexion"} disablePadding>
                    <ListItemButton onClick={() => signOut()}>
                        <ListItemIcon>
                            <ExitToAppRoundedIcon sx={{ color: "white" }} />
                        </ListItemIcon>
                        <ListItemText sx={{ color: "white" }} primary={"Déconnexion"} />
                    </ListItemButton>
                </ListItem>
            </Stack>
        </>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                component="nav"
                sx={{
                    width: { sm: drawerWidth }
                }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { sm: `calc(100% - ${drawerWidth}px)` }
                }}
            >
                {props.children}
            </Box>
        </Box >
    );
}
