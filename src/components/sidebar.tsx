import { useState } from "react";

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

import {
  Dashboard as DashboardIcon,
  Inventory2 as InventoryIcon,
  ShoppingCart as OrdersIcon,
  Warehouse as WarehouseIcon,
  Category as CategoryIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
  HelpOutlined as HelpIcon,
} from "@mui/icons-material";

type SidebarProps = {
  activeItem?: string;
  onItemClick?: (item: string) => void;
};

const Sidebar = ({
  activeItem = "Dashboard",
  onItemClick,
}: SidebarProps) => {
  const [selected, setSelected] =
    useState(activeItem);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      name: "Inventory",
      icon: <InventoryIcon />,
    },
    {
      name: "Orders",
      icon: <OrdersIcon />,
    },
    {
      name: "Warehouses",
      icon: <WarehouseIcon />,
    },
    {
      name: "Categories",
      icon: <CategoryIcon />,
    },
    {
      name: "Reports",
      icon: <ReportsIcon />,
    },
  ];

  const bottomItems = [
    {
      name: "Settings",
      icon: <SettingsIcon />,
    },
    {
      name: "Help & Support",
      icon: <HelpIcon />,
    },
  ];

  const handleClick = (name: string) => {
    setSelected(name);

    if (onItemClick) {
      onItemClick(name);
    }
  };

  return (
    <Box
      sx={{
        width: 260,
        minHeight: "calc(100vh - 72px)",
        background:
          "linear-gradient(180deg, #111a2b 0%, #0b1220 100%)",
        borderRight: "1px solid rgba(148,163,184,0.15)",
        display: {
          xs: "none",
          md: "flex",
        },
        flexDirection: "column",
        color: "#ffffff",
        padding: "20px 14px",
      }}
    >
      {/* MENU TITLE */}

      <Typography
        sx={{
          color: "#64748b",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "1.5px",
          padding: "8px 14px",
          textTransform: "uppercase",
        }}
      >
        Main Menu
      </Typography>

      {/* MAIN MENU */}

      <List
        sx={{
          paddingTop: "8px",
        }}
      >
        {menuItems.map((item) => {
          const isActive =
            selected === item.name;

          return (
            <ListItemButton
              key={item.name}
              onClick={() =>
                handleClick(item.name)
              }
              sx={{
                minHeight: 48,
                borderRadius: "12px",
                marginBottom: "6px",
                padding: "8px 14px",

                background: isActive
                  ? "linear-gradient(90deg, #ff9f1c 0%, #ff7a00 100%)"
                  : "transparent",

                color: isActive
                  ? "#111827"
                  : "#94a3b8",

                "&:hover": {
                  background: isActive
                    ? "linear-gradient(90deg, #ff9f1c 0%, #ff7a00 100%)"
                    : "rgba(255,255,255,0.06)",

                  color: isActive
                    ? "#111827"
                    : "#ffffff",
                },

                transition:
                  "all 0.2s ease",
              }}
            >
              {/* ICON */}

              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: "inherit",

                  "& svg": {
                    fontSize: 21,
                  },
                }}
              >
                {item.icon}
              </ListItemIcon>

              {/* TEXT */}

              <ListItemText
                primary={
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: isActive
                        ? 700
                        : 500,
                      color: "inherit",
                    }}
                  >
                    {item.name}
                  </span>
                }
              />

              {/* ACTIVE DOT */}

              {isActive && (
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor:
                      "#111827",
                  }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>

      {/* DIVIDER */}

      <Divider
        sx={{
          borderColor:
            "rgba(148,163,184,0.12)",
          margin: "12px 8px",
        }}
      />

      {/* OTHER */}

      <Typography
        sx={{
          color: "#64748b",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "1.5px",
          padding: "8px 14px",
          textTransform: "uppercase",
        }}
      >
        Other
      </Typography>

      <List
        sx={{
          paddingTop: "8px",
        }}
      >
        {bottomItems.map((item) => {
          const isActive =
            selected === item.name;

          return (
            <ListItemButton
              key={item.name}
              onClick={() =>
                handleClick(item.name)
              }
              sx={{
                minHeight: 48,
                borderRadius: "12px",
                marginBottom: "6px",
                padding: "8px 14px",

                color: isActive
                  ? "#ffffff"
                  : "#94a3b8",

                backgroundColor:
                  isActive
                    ? "rgba(255,255,255,0.07)"
                    : "transparent",

                "&:hover": {
                  backgroundColor:
                    "rgba(255,255,255,0.06)",
                  color: "#ffffff",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: "inherit",

                  "& svg": {
                    fontSize: 21,
                  },
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "inherit",
                    }}
                  >
                    {item.name}
                  </span>
                }
              />
            </ListItemButton>
          );
        })}
      </List>

      {/* BOTTOM PROFILE CARD */}

      <Box
        sx={{
          marginTop: "auto",
          padding: "14px",
          borderRadius: "14px",
          background:
            "linear-gradient(135deg, rgba(37,99,235,0.18), rgba(124,58,237,0.15))",
          border:
            "1px solid rgba(96,165,250,0.15)",
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            color: "#64748b",
            marginBottom: "4px",
          }}
        >
          Inventory System
        </Typography>

        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: 600,
            color: "#e2e8f0",
          }}
        >
          Management Panel
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;