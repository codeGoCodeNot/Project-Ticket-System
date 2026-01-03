"use client";

import { LucideCalendar } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

export type ImperativeHandleFromDatePickerDemo = {
  reset: () => void;
};

type DatePickerDemoProps = {
  id: string;
  name: string;
  defaultValue?: string | undefined;
  imperativeHandleRef?: React.Ref<ImperativeHandleFromDatePickerDemo>;
};

const DatePickerDemo = ({
  id,
  name,
  defaultValue,
  imperativeHandleRef,
}: DatePickerDemoProps) => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date()
  );

  React.useImperativeHandle(imperativeHandleRef, () => ({
    reset: () => {
      setDate(new Date());
    },
  }));

  const formattedDate = date ? format(date, "yyyy-MM-dd") : "";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full text-xs" id={id} asChild>
        <Button
          variant="outline"
          className="justify-start font-normal text-left"
        >
          <LucideCalendar />
          {formattedDate}
          <input type="hidden" name={name} value={formattedDate} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          onSelect={(date) => {
            setDate(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerDemo;
