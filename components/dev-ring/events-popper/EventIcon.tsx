import { Box } from "@mui/material";

interface EventIconProps {
  type?: string;
  variant: "outline" | "contained";
}

export const EventIcon = ({ type = "push", variant }: EventIconProps) => {
  const isCommit = type === "push";
  const isOutline = variant === "outline";
  const setColor = () => (isOutline ? "#556cd6" : "white");

  if (isCommit) {
    return (
      <Box sx={eventIconSx}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill={setColor()}>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11 4C11 3.44772 11.4477 3 12 3C12.5523 3 13 3.44772 13 4V9.17071C14.1652 9.58254 15 10.6938 15 12C15 13.3062 14.1652 14.4175 13 14.8293V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V14.8293C9.83481 14.4175 9 13.3062 9 12C9 10.6938 9.83481 9.58254 11 9.17071V4ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
            fill={setColor()}
          />
        </svg>
      </Box>
    );
  }

  return (
    <Box sx={eventIconSx}>
      <svg viewBox="0 0 512 512">
        <circle
          cx="128"
          cy="416"
          r="48"
          fill="none"
          stroke={setColor()}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
        />
        <path
          fill="none"
          stroke={setColor()}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
          d="M128 144v224M288 160l-64-64 64-64"
        />
        <circle
          cx="128"
          cy="96"
          r="48"
          fill="none"
          stroke={setColor()}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
        />
        <circle
          cx="384"
          cy="416"
          r="48"
          fill="none"
          stroke={setColor()}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
        />
        <path
          d="M240 96h84a60 60 0 0160 60v212"
          fill="none"
          stroke={setColor()}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
        />
      </svg>
    </Box>
  );
};

const eventIconSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 20,
  width: 20,
};
