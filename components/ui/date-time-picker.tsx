"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateTimePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  disabled?: boolean;
}

export function DateTimePicker({
  value,
  onChange,
  disabled,
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false);

  // Derive time value from the value prop
  const timeValue = value
    ? `${String(value.getHours()).padStart(2, "0")}:${String(value.getMinutes()).padStart(2, "0")}:${String(value.getSeconds()).padStart(2, "0")}`
    : "00:00:00";

  const handleDateSelect = (selectedDate: Date | null) => {
    if (!selectedDate) {
      onChange(undefined);
      setOpen(false);
      return;
    }

    // Combine date with existing time
    const [hours, minutes, seconds] = timeValue.split(":").map(Number);
    const newDate = new Date(selectedDate);
    newDate.setHours(hours || 0, minutes || 0, seconds || 0, 0);
    onChange(newDate);
    setOpen(false);
  };

  const handleTimeChange = (time: string) => {
    if (value) {
      const [hours, minutes, seconds] = time.split(":").map(Number);
      const newDate = new Date(value);
      newDate.setHours(hours || 0, minutes || 0, seconds || 0, 0);
      onChange(newDate);
    } else {
      // If no date is selected, create a date with today's date and the selected time
      const [hours, minutes, seconds] = time.split(":").map(Number);
      const newDate = new Date();
      newDate.setHours(hours || 0, minutes || 0, seconds || 0, 0);
      onChange(newDate);
    }
  };

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="justify-between font-normal w-full"
              disabled={disabled}
            >
              {value ? value.toLocaleDateString() : "Pick a date"}
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={handleDateSelect}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={timeValue}
          onChange={(e) => handleTimeChange(e.target.value)}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          disabled={disabled}
        />
      </div>
    </div>
  );
}
