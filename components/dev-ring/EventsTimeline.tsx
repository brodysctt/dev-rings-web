import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { dayjs } from "@lib/dayjs";
import type { RepoEvent } from "@lib/firebase/firestore";
import { CommitSvg } from "components";
import { openUrl } from "utils";

export const EventsTimeline = ({ events }: { events: RepoEvent[] }) => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current)
      ref.current.scrollIntoView({
        behavior: "smooth",
      });
  }, [ref]);
  return (
    <Timeline position="alternate">
      {events.map((event, i) => {
        const { createdAt, repo, message, url } = event;
        return (
          <TimelineItem key={i}>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              {dayjs(createdAt.toDate()).format("LT")}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <CommitSvg />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "12px", px: 2, cursor: "pointer" }}>
              {message.length < 100 ? (
                <>
                  <Typography color="primary">{repo}</Typography>
                  <Typography color="text.secondary" onClick={openUrl(url)}>
                    {message}
                  </Typography>
                </>
              ) : (
                <TimelineAccordion {...{ repo, message, url }} />
              )}
            </TimelineContent>
          </TimelineItem>
        );
      })}
      <Box ref={ref} />
    </Timeline>
  );
};

interface Props {
  repo: string;
  message: string;
  url: string;
}

const TimelineAccordion = ({ repo, message, url }: Props) => {
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
