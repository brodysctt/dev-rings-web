import { useState } from "react";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { openUrl } from "utils";

interface Props {
  repo: string;
  message: string;
  url: string;
}

export const TimelineAccordion = ({ repo, message, url }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const handleChange = () => setExpanded(!expanded);
  return (
    <Accordion
      expanded={expanded}
      elevation={0}
      disableGutters
      onChange={handleChange}
    >
      <AccordionSummary
        expandIcon={
          <ArrowForwardIosIcon
            sx={{
              fontSize: 12,
              transform: expanded ? "rotate(-90deg)" : "",
            }}
          />
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          flexDirection: "row-reverse",
          px: 0,
          mx: -0.5,
        }}
      >
        <Typography color="primary" sx={{ ml: 0.5 }}>
          {repo}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          color="text.secondary"
          onClick={openUrl(url)}
          sx={{ mt: -2 }}
        >
          {message}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};
