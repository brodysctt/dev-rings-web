import type { Dispatch, SetStateAction } from "react";
import type { MonthYear } from "@lib/dayjs";
import { Button } from "@mui/material";
import { ArrowBackSvg, ArrowNextSvg } from "components/icons";

interface Props {
  type?: "previous" | "next";
  monthInView: MonthYear;
  setMonthInView: Dispatch<SetStateAction<MonthYear>>;
  disabled: boolean;
}

// TODO: Consider refactoring this
export const ArrowButton = ({
  type = "next",
  monthInView,
  setMonthInView,
  disabled,
}: Props) => {
  const isNext = type === "next";
  const [month, year] = monthInView;

  const incrementMonth = () => {
    if (month === 12) {
      setMonthInView([1, year + 1]);
      return;
    }
    setMonthInView([month + 1, year]);
  };

  const decrementMonth = () => {
    if (month === 1) {
      setMonthInView([12, year - 1]);
      return;
    }
    setMonthInView([month - 1, year]);
  };

  return (
    <Button
      variant="text"
      onClick={isNext ? incrementMonth : decrementMonth}
      startIcon={isNext ? <ArrowNextSvg /> : <ArrowBackSvg />}
      disabled={disabled}
    />
  );
};
