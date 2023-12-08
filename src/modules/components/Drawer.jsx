import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { styled, useTheme } from "@mui/material/styles";
import {
    Box,
    IconButton,
    Drawer as MuiDrawer,
    List,
    ListItem,
    ListItemButton as MuiListItemButton,
    ListItemIcon,
    Avatar,
    BottomNavigation,
    BottomNavigationAction,
    Paper
} from "@mui/material";
import {
    MenuOutlined,
    LogoutOutlined,
    HomeRounded,
    CalendarMonthRounded,
    FolderRounded,
    VaccinesRounded,
    SettingsRounded
} from "@mui/icons-material";

import { Typography } from "../../components";

export default function ToggleDrawer() {
    const theme = useTheme();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleToggleOpen = () => {
        setOpen(open !== true);
    };

    let url = router.asPath.indexOf("/", 1) > 0 ? router.asPath.slice(0, router.asPath.indexOf("/", 1)) : router.asPath;

    return (
        <>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader
                    sx={{
                        justifyContent: open ? "space-between" : "center"
                    }}>
                    <IconButton onClick={handleToggleOpen}>
                        <MenuOutlined sx={{ color: "black" }} />
                    </IconButton>
                </DrawerHeader>

                <AvatarContainer sx={{ display: open ? "flex" : "none" }}>
                    <Avatar
                        alt="Lam Ngan"
                        src={avatar}
                        sx={{ width: 80, height: 80, boxShadow: "0px 0px 50px rgba(255, 255, 255, 0.25)" }}
                    />
                    <Typography size="h6" weight="bold">
                        Hello, 0912345678!
                    </Typography>
                    <Typography size="p" sx={{ color: "var(--palette-02)" }}>
                        Admin
                    </Typography>
                </AvatarContainer>

                <List>
                    {menuItems.map((item, index) => (
                        <Link href={item.link} key={index}>
                            <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                                <StyledItem key={index}>
                                    <ListItemButton
                                        sx={{
                                            justifyContent: open ? "initial" : "center",
                                            backgroundColor: url === item.link ? "var(--palette-02)" : "transparent",
                                            color: url === item.link ? "white" : "black",
                                            "&:hover": {
                                                backgroundColor:
                                                    url === item.link ? "var(--palette-02)" : "rgba(0, 0, 0, 0.1)"
                                            }
                                        }}>
                                        <StyledItemIcon
                                            open={open}
                                            sx={{ color: url === item.link ? "white" : "black" }}>
                                            {item.icon}
                                        </StyledItemIcon>
                                        <StyledTypo
                                            size="p"
                                            open={open}
                                            sx={{ color: url === item.link ? "white" : "black" }}>
                                            {item.text}
                                        </StyledTypo>
                                    </ListItemButton>
                                </StyledItem>
                            </Box>
                        </Link>
                    ))}
                </List>
            </Drawer>

            <MobileNav elevation={3}>
                <BottomNavigation
                    sx={{
                        backgroundColor: "transparent",
                        alignItems: "center",
                        "& .Mui-selected": {
                            borderRadius: "10px",
                            padding: "0.3rem 0rem",
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            color: "white !important",
                            flex: 2
                        }
                    }}
                    value={url}>
                    {menuItems.map((item, i) => (
                        <BottomNavigationAction
                            onClick={() => router.push(item.link)}
                            sx={{
                                minHeight: "4rem",
                                color: "black",
                                padding: "0",
                                "& .Mui-selected": {
                                    backgroundColor: "transparent !important"
                                },
                                "& .MuiBottomNavigationAction-label": {
                                    color: "black",
                                    fontFamily: "Nunito"
                                }
                            }}
                            label={url == item.link ? item.text : ""}
                            value={item.link}
                            icon={item.icon}
                        />
                    ))}
                </BottomNavigation>
            </MobileNav>
        </>
    );
}

const menuItems = [
    {
        text: "Trang chủ",
        icon: <HomeRounded />,
        link: "/home"
    },
    {
        text: "Quản lý cuộc hẹn",
        icon: <CalendarMonthRounded />,
        link: "/quan-ly-cuoc-hen"
    },
    {
        text: "Hồ sơ bệnh nhân",
        icon: <FolderRounded />,
        link: "/ho-so-benh-nhan"
    },
    {
        text: "Quản lý thuốc",
        icon: <VaccinesRounded />,
        link: "/quan-ly-thuoc"
    },
    {
        text: "Dữ liệu hệ thống",
        icon: <SettingsRounded />,
        link: "/du-lieu-he-thong"
    },
    {
        text: "Đăng xuất",
        icon: <LogoutOutlined />,
        link: "/login"
    }
];

const avatar =
    "https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/326096520_670444968197841_461525136651728368_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ebmBbb9a2mQAX88ojWU&tn=_JWBHwD98b41WzaG&_nc_ht=scontent.fsgn2-1.fna&oh=00_AfD_7Q91aOT7VXNTtbk8qGnBFC2JvJRbNxDJo-rSf2bkmw&oe=63D5713F";

const drawerWidth = 250;
const miniDrawerWidth = "6rem";

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: "hidden",
    color: "black",
    backgroundColor: "var(--palette-01)"
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    display: "flex",
    flexDirection: "column",
    width: miniDrawerWidth,
    overflowX: "hidden",
    color: "black",
    backgroundColor: "var(--palette-01)"
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 2),
    ...theme.mixins.toolbar
}));

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
    color: "black",
    backgroundColor: "var(--palette-01)",
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open
        ? {
              ...openedMixin(theme),
              "& .MuiDrawer-paper": openedMixin(theme)
          }
        : {
              ...closedMixin(theme),
              "& .MuiDrawer-paper": closedMixin(theme)
          }),
    [theme.breakpoints.down("sm")]: {
        display: "none"
    }
}));

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
    minWidth: 0,
    padding: "0.8rem",
    borderRadius: 10,
    transition: "all 0.4s ease-in-out",
    marginBottom: "0.8rem",
    display: "flex"
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
    flexDirection: "column",
    alignItems: "center",
    gap: "0.8rem",
    margin: "2rem 0rem"
}));

const StyledTypo = styled(Typography)(({ theme, open }) => ({
    display: open ? "initial" : "none",
    lineHeight: 0,
    color: "black"
}));

const StyledItem = styled(ListItem)(({ theme }) => ({
    display: "flex",
    width: "80%",
    padding: 0
}));

const StyledItemIcon = styled(ListItemIcon)(({ theme, open }) => ({
    minWidth: 0,
    marginRight: open ? "12px" : "0px",
    justifyContent: "center",
    color: "white"
}));

const MobileNav = styled(Paper)(({ theme }) => ({
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    display: "none",
    zIndex: 1,
    width: "100%",
    padding: "0.5rem",
    backgroundColor: "var(--palette-01)",
    borderRadius: 0,
    [theme.breakpoints.down("sm")]: {
        display: "block"
    }
}));
