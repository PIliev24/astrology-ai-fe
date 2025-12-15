"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useEffect, useRef, useState } from "react";

export interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date | null) => void;
  mode?: "single" | "range" | "multiple";
  disabled?: boolean;
  className?: string;
  showOutsideDays?: boolean;
}

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Calendar({
  selected,
  onSelect,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mode = "single", // Reserved for future range/multiple mode support
  disabled,
  className,
  showOutsideDays = false,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(
    selected
      ? new Date(selected.getFullYear(), selected.getMonth(), 1)
      : new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [monthYearPickerOpen, setMonthYearPickerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"month" | "year">("month");
  const [yearRangeStart, setYearRangeStart] = useState(() => {
    const currentYear = selected?.getFullYear() || new Date().getFullYear();
    return currentYear - 10;
  });
  const yearListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected) {
      setTimeout(() => {
        setCurrentMonth(new Date(selected.getFullYear(), selected.getMonth(), 1));
      }, 0);
    }
  }, [selected]);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleMonthSelect = (monthIndex: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex, 1));
    setMonthYearPickerOpen(false);
    setViewMode("month");
  };

  const handleYearSelect = (year: number) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
    setViewMode("month");
  };

  useEffect(() => {
    if (viewMode === "year" && yearListRef.current) {
      // Scroll to current year when year view opens
      const currentYearButton = yearListRef.current.querySelector(`[data-year="${currentMonth.getFullYear()}"]`);
      if (currentYearButton) {
        currentYearButton.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }
  }, [viewMode, currentMonth]);

  const getYearRange = () => {
    const endYear = yearRangeStart + 20;
    const years: number[] = [];
    for (let year = yearRangeStart; year <= endYear; year++) {
      years.push(year);
    }
    return years;
  };

  const handleEarlierYears = () => {
    setYearRangeStart(prevValue => prevValue - 20);
  };

  const handleLaterYears = () => {
    setYearRangeStart(prevValue => prevValue + 20);
  };

  const handleDateClick = (date: Date) => {
    if (disabled) return;
    if (onSelect) {
      onSelect(date);
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return isSameDay(date, today);
  };

  const isSelected = (date: Date) => {
    if (!selected) return false;
    return isSameDay(date, selected);
  };

  const isOutsideMonth = (date: Date) => {
    return date.getMonth() !== currentMonth.getMonth();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days: (Date | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    }

    // Add days from next month to fill the last row (if needed)
    const remainingCells = 42 - days.length; // 6 rows * 7 days = 42
    if (remainingCells > 0) {
      for (let day = 1; day <= remainingCells; day++) {
        days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, day));
      }
    }

    return days;
  };

  const days = renderCalendarDays();

  return (
    <div className={cn("p-3", className)}>
      <div className="flex flex-col space-y-4">
        {/* Header with month/year and navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={handlePrevMonth}
            disabled={disabled}
            type="button"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Popover
            open={monthYearPickerOpen}
            onOpenChange={open => {
              setMonthYearPickerOpen(open);
              if (open) {
                setViewMode("month");
              }
            }}
          >
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="h-7 px-3 text-sm font-medium hover:bg-accent"
                disabled={disabled}
                type="button"
              >
                {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                <ChevronDown className="ml-1 h-3 w-3 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2" align="center">
              <div className="flex flex-col space-y-2">
                {/* View mode switcher */}
                <div className="flex gap-1">
                  <Button
                    variant={viewMode === "month" ? "default" : "ghost"}
                    size="sm"
                    className="flex-1"
                    onClick={() => setViewMode("month")}
                    type="button"
                  >
                    Month
                  </Button>
                  <Button
                    variant={viewMode === "year" ? "default" : "ghost"}
                    size="sm"
                    className="flex-1"
                    onClick={() => setViewMode("year")}
                    type="button"
                  >
                    Year
                  </Button>
                </div>

                {/* Month picker */}
                {viewMode === "month" && (
                  <div className="grid grid-cols-3 gap-1">
                    {MONTHS.map((month, index) => (
                      <Button
                        key={month}
                        variant={index === currentMonth.getMonth() ? "default" : "ghost"}
                        size="sm"
                        className="text-xs"
                        onClick={() => handleMonthSelect(index)}
                        type="button"
                      >
                        {month.slice(0, 3)}
                      </Button>
                    ))}
                  </div>
                )}

                {/* Year picker */}
                {viewMode === "year" && (
                  <div className="max-h-64 overflow-y-auto" ref={yearListRef}>
                    <div className="grid grid-cols-4 gap-1">
                      {getYearRange().map(year => (
                        <Button
                          key={year}
                          data-year={year}
                          variant={year === currentMonth.getFullYear() ? "default" : "ghost"}
                          size="sm"
                          className="text-xs"
                          onClick={() => handleYearSelect(year)}
                          type="button"
                        >
                          {year}
                        </Button>
                      ))}
                    </div>
                    {/* Year navigation */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t">
                      <Button variant="outline" size="sm" onClick={handleEarlierYears} type="button">
                        <ChevronUp className="h-3 w-3 mr-1" />
                        Earlier
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleLaterYears} type="button">
                        Later
                        <ChevronDown className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={handleNextMonth}
            disabled={disabled}
            type="button"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1">
          {DAYS_OF_WEEK.map(day => (
            <div
              key={day}
              className="h-9 w-9 text-center text-sm font-medium text-muted-foreground flex items-center justify-center"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="h-9 w-9" />;
            }

            const dayIsSelected = isSelected(date);
            const dayIsToday = isToday(date);
            const dayIsOutside = isOutsideMonth(date);

            if (!showOutsideDays && dayIsOutside) {
              return <div key={`outside-${index}`} className="h-9 w-9" />;
            }

            return (
              <button
                key={date.toISOString()}
                type="button"
                onClick={() => handleDateClick(date)}
                disabled={disabled || dayIsOutside}
                className={cn(
                  "h-9 w-9 text-center text-sm p-0 font-normal rounded-md",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus:bg-accent focus:text-accent-foreground",
                  "disabled:pointer-events-none disabled:opacity-50",
                  dayIsSelected &&
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  dayIsToday && !dayIsSelected && "bg-accent text-accent-foreground",
                  dayIsOutside && "text-muted-foreground opacity-50"
                )}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
