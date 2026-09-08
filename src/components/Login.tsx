import { useState } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Inventory2,
} from "@mui/icons-material";

type LoginProps = {
  onLogin: (username: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string;
};

const Login = ({
  onLogin,
  isLoading,
  error,
}: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    await onLogin(username, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 shadow-lg">
            <Inventory2 className="text-white" fontSize="large" />
          </div>

          <h1 className="text-3xl font-bold text-white">
            Inventory Management
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your inventory smarter
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-slate-700 bg-slate-900/90 p-8 shadow-2xl backdrop-blur">

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white">
              Welcome Back
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Sign in to access your dashboard
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Username */}
            <TextField
  fullWidth
  label="Username"
  value={username}
  onChange={(event) =>
    setUsername(event.target.value)
  }
  required
  slotProps={{
    inputLabel: {
      sx: {
        color: "#94a3b8",
      },
    },
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      color: "white",
      borderRadius: "12px",

      "& fieldset": {
        borderColor: "#334155",
      },

      "&:hover fieldset": {
        borderColor: "#6366f1",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#6366f1",
      },
    },
  }}
/>

            {/* Password */}
            <TextField
  fullWidth
  label="Password"
  type={showPassword ? "text" : "password"}
  value={password}
  onChange={(event) =>
    setPassword(event.target.value)
  }
  required
  slotProps={{
    inputLabel: {
      sx: {
        color: "#94a3b8",
      },
    },

    input: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            onClick={() =>
              setShowPassword(!showPassword)
            }
            edge="end"
          >
            {showPassword ? (
              <VisibilityOff />
            ) : (
              <Visibility />
            )}
          </IconButton>
        </InputAdornment>
      ),
    },
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      color: "white",
      borderRadius: "12px",

      "& fieldset": {
        borderColor: "#334155",
      },

      "&:hover fieldset": {
        borderColor: "#6366f1",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#6366f1",
      },
    },
  }}
/>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                background:
                  "linear-gradient(90deg, #f97316, #ec4899)",
                borderRadius: "12px",
                padding: "12px",
                fontSize: "16px",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #ea580c, #db2777)",
                },
              }}
            >
              {isLoading
                ? "Signing in..."
                : "Sign In"}
            </Button>

          </form>

          {/* Demo Login */}
          <div className="mt-6 rounded-xl bg-slate-800/70 p-4 text-center">
            <p className="text-xs text-slate-400">
              Demo Login
            </p>

            <p className="mt-1 text-sm text-slate-300">
              Username:{" "}
              <span className="font-semibold text-orange-400">
                admin
              </span>
            </p>

            <p className="text-sm text-slate-300">
              Password:{" "}
              <span className="font-semibold text-orange-400">
                admin123
              </span>
            </p>
          </div>

        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Inventory Management System
        </p>

      </div>
    </div>
  );
};

export default Login;