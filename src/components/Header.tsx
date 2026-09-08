import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";

type HeaderProps = {
  username: string;
  onLogout: () => void;
};

function Header({ username, onLogout }: HeaderProps) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background:
          "linear-gradient(90deg, #111827 0%, #172554 50%, #1e1b4b 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "72px !important",
          px: {
            xs: 2,
            md: 4,
          },
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* LEFT SIDE - Logo / Title */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Logo */}

          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, #22c55e, #06b6d4)",
              boxShadow:
                "0 6px 20px rgba(34,197,94,0.25)",
            }}
          >
            <Typography
              sx={{
                color: "#ffffff",
                fontWeight: 900,
                fontSize: "20px",
              }}
            >
              I
            </Typography>
          </Box>

          {/* Application Name */}

          <Box>
            <Typography
              sx={{
                color: "#ffffff",
                fontSize: {
                  xs: "17px",
                  md: "20px",
                },
                fontWeight: 800,
                lineHeight: 1.2,
              }}
            >
              Inventory
            </Typography>

            <Typography
              sx={{
                color: "#94a3b8",
                fontSize: "11px",
                letterSpacing: "0.5px",
              }}
            >
              MANAGEMENT SYSTEM
            </Typography>
          </Box>
        </Box>

        {/* RIGHT SIDE - User */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: {
              xs: 1,
              md: 2,
            },
          }}
        >
          {/* User Avatar */}

          <Avatar
            sx={{
              width: 40,
              height: 40,
              background:
                "linear-gradient(135deg, #f97316, #ec4899)",
              fontWeight: 700,
              fontSize: "15px",
              border:
                "2px solid rgba(255,255,255,0.2)",
            }}
          >
            {username
              ? username.charAt(0).toUpperCase()
              : "A"}
          </Avatar>

          {/* Username */}

          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
              minWidth: "90px",
            }}
          >
            <Typography
              sx={{
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              {username || "Admin"}
            </Typography>

            <Typography
              sx={{
                color: "#94a3b8",
                fontSize: "11px",
              }}
            >
              Administrator
            </Typography>
          </Box>

          {/* Logout */}

          <Button
            onClick={onLogout}
            variant="outlined"
            size="small"
            sx={{
              ml: {
                xs: 0,
                md: 1,
              },
              color: "#ffffff",
              borderColor:
                "rgba(255,255,255,0.25)",
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
              px: {
                xs: 1.5,
                md: 2,
              },

              "&:hover": {
                borderColor: "#f97316",
                backgroundColor:
                  "rgba(249,115,22,0.12)",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;