import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  Inventory2 as InventoryIcon,
  WarningAmber as WarningIcon,
  RemoveShoppingCart as OutIcon,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material";

import type { InventoryItem } from "../data/inventorydata";

type DashboardCardsProps = {
  items: InventoryItem[];
};

function DashboardCards({
  items,
}: DashboardCardsProps) {
  // Total items
  const totalItems = items.length;

  // Low stock items
  const lowStockItems = items.filter(
    (item) =>
      item.stockQuantity > 0 &&
      item.stockQuantity <= 10
  ).length;

  // Out of stock items
  const outOfStockItems = items.filter(
    (item) =>
      item.stockQuantity === 0
  ).length;

  // Total inventory value
  const totalInventoryValue =
    items.reduce(
      (total, item) =>
        total +
        item.stockQuantity *
          item.unitPrice,
      0
    );

  const cards = [
    {
      title: "Total Items",
      value: totalItems.toLocaleString(),
      subtitle: "Items in inventory",
      icon: <InventoryIcon />,
      gradient:
        "linear-gradient(135deg, #123b50 0%, #102c3d 100%)",
      border:
        "rgba(20, 184, 166, 0.55)",
      iconBackground: "#f59e0b",
    },

    {
      title: "Low Stock",
      value: lowStockItems.toLocaleString(),
      subtitle: "Need attention",
      icon: <WarningIcon />,
      gradient:
        "linear-gradient(135deg, #18394b 0%, #112b3c 100%)",
      border:
        "rgba(59, 130, 246, 0.55)",
      iconBackground: "#2563eb",
    },

    {
      title: "Out of Stock",
      value: outOfStockItems.toLocaleString(),
      subtitle: "Currently unavailable",
      icon: <OutIcon />,
      gradient:
        "linear-gradient(135deg, #3b3030 0%, #1d2935 100%)",
      border:
        "rgba(244, 63, 94, 0.55)",
      iconBackground: "#e11d48",
    },

    {
      title: "Inventory Value",
      value: `$${totalInventoryValue.toLocaleString(
        undefined,
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )}`,
      subtitle: "Total stock value",
      icon: <MoneyIcon />,
      gradient:
        "linear-gradient(135deg, #243550 0%, #172638 100%)",
      border:
        "rgba(168, 85, 247, 0.55)",
      iconBackground: "#7c3aed",
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: "18px",
        width: "100%",
        marginBottom: "28px",
      }}
    >
      {cards.map((card) => (
        <Card
          key={card.title}
          elevation={0}
          sx={{
            position: "relative",
            overflow: "hidden",
            minHeight: "150px",
            borderRadius: "18px",

            background:
              card.gradient,

            border:
              `1px solid ${card.border}`,

            color: "#ffffff",

            transition:
              "transform 0.2s ease, box-shadow 0.2s ease",

            "&:hover": {
              transform:
                "translateY(-4px)",
              boxShadow:
                "0 14px 35px rgba(0,0,0,0.25)",
            },

            "&::after": {
              content: '""',
              position: "absolute",
              width: "100px",
              height: "100px",
              right: "-35px",
              bottom: "-45px",
              borderRadius: "50%",
              background:
                "rgba(255,255,255,0.04)",
            },
          }}
        >
          <CardContent
            sx={{
              padding: "20px",

              "&:last-child": {
                paddingBottom: "20px",
              },
            }}
          >
            {/* Top section */}

            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "flex-start",
              }}
            >
              <Typography
                sx={{
                  color: "#cbd5e1",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                {card.title}
              </Typography>

              {/* Icon */}

              <Box
                sx={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "12px",

                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",

                  backgroundColor:
                    card.iconBackground,

                  color: "#ffffff",

                  boxShadow:
                    "0 5px 15px rgba(0,0,0,0.2)",

                  "& svg": {
                    fontSize: "20px",
                  },
                }}
              >
                {card.icon}
              </Box>
            </Box>

            {/* Value */}

            <Typography
              sx={{
                marginTop: "14px",
                fontSize: {
                  xs: "25px",
                  sm: "27px",
                  lg: "29px",
                },
                lineHeight: 1.1,
                fontWeight: 700,
                color: "#f8fafc",
                letterSpacing:
                  "-0.5px",
              }}
            >
              {card.value}
            </Typography>

            {/* Subtitle */}

            <Typography
              sx={{
                marginTop: "9px",
                fontSize: "12px",
                color: "#94a3b8",
              }}
            >
              {card.subtitle}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default DashboardCards;