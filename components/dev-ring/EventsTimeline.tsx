import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
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
import { CommitSvg, PRSvg } from "components/dev-ring/EventIcons";
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
    <Timeline position="alternate" sx={{ ml: -1 }}>
      {events.map((event, i) => {
        const { createdAt, eventType, repo, message, url } = event;
        const isCommit = eventType === "push";
        return (
          <TimelineItem key={i}>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              align="right"
              variant="body2"
              color="text.secondary"
              minWidth="40vw"
            >
              {dayjs(createdAt.toDate()).format("LT")}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              {/* #4DD0E1 */}
              <TimelineDot color={isCommit ? "primary" : "secondary"}>
                {eventType === "push" ? <CommitSvg /> : <PRSvg />}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              sx={{ py: "12px", px: 2, cursor: "pointer" }}
              minWidth="40vw"
            >
              {message.length < 100 ? (
                <Stack onClick={openUrl(url)}>
                  <Typography color="primary">{repo}</Typography>
                  <Typography color="text.secondary" noWrap={true}>
                    {message}
                  </Typography>
                </Stack>
              ) : (
                <TimelineAccordion index={i} {...{ repo, message, url }} />
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
  index: number;
  repo: string;
  message: string;
  url: string;
}

const TimelineAccordion = ({ index, repo, message, url }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const handleChange = () => setExpanded(!expanded);
  const isLeft = index % 2 > 0;
  return (
    <Accordion
      expanded={expanded}
      elevation={0}
      disableGutters
      onChange={handleChange}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: isLeft ? "flex-end" : "flex-start",
      }}
    >
      <AccordionSummary
        expandIcon={
          <ArrowForwardIosIcon
            sx={
              isLeft
                ? {
                    fontSize: 12,
                    transform: expanded ? "rotate(90deg)" : "rotate(180deg)",
                  }
                : {
                    fontSize: 12,
                    transform: expanded ? "rotate(90deg)" : "",
                  }
            }
          />
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          flexDirection: isLeft ? "row" : "row-reverse",
          px: 0,
          mx: -0.5,
        }}
      >
        <Typography color="primary" sx={{ ml: 0.5, pr: isLeft ? 1 : 0 }}>
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
