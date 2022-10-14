import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import * as React from 'react';
import { ReactNode } from 'react';

const drawerWidth = 240;

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children: ReactNode
}

const navConfig = [
    {
        text: "Map",
        icon: <MapRoundedIcon />,
        route: "/map"
    }, {
        text: "List",
        icon: <FormatListBulletedRoundedIcon />,
        route: "/list"
    }
]

export default function Layout(props: Props) {
    const { window } = props;
    const router = useRouter()
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <>
            <Stack direction="column" >
                <>
                    <Typography>Martin DANVERS</Typography>
                    <Divider />
                    <List>
                        {navConfig.map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton onClick={() => router.push(item.route)}>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </>
                <ListItem key={"Déconnexion"} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ExitToAppRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Déconnexion"} />
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
                sx={{ width: { sm: drawerWidth } }}
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
                sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                {props.children}
            </Box>
        </Box>
    );
}
