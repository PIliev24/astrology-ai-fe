"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { useCreateBirthChart } from "@/hooks";
import { Plus, Loader2 } from "lucide-react";
import { mutate } from "swr";
import { HOOK_KEYS } from "@/constants";
import { SORTED_COUNTRIES } from "@/constants/countries";

const createChartSchema = z.object({
  name: z.string().min(1, "Name is required"),
  birth_datetime: z.date({
    message: "Birth date and time is required",
  }),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

type CreateChartFormValues = z.infer<typeof createChartSchema>;

interface CreateChartDialogProps {
  children?: React.ReactNode;
}

export function CreateChartDialog({ children }: CreateChartDialogProps) {
  const [open, setOpen] = useState(false);
  const { createChart, isCreating } = useCreateBirthChart();

  const form = useForm<CreateChartFormValues>({
    resolver: zodResolver(createChartSchema),
    defaultValues: {
      name: "",
      birth_datetime: undefined,
      city: "",
      country: "",
    },
  });

  const onSubmit = async (values: CreateChartFormValues) => {
    try {
      // Convert Date to the required format: "dd-mmm-yyyy hh:mm"
      const formattedDate = format(values.birth_datetime, "dd-MMM-yyyy HH:mm");

      await createChart({
        ...values,
        birth_datetime: formattedDate,
      });
      mutate(HOOK_KEYS.BIRTH_CHARTS);
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Failed to create chart:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Chart
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Birth Chart</DialogTitle>
          <DialogDescription>Enter the birth information to generate a new astrological chart.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birth_datetime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birth Date & Time</FormLabel>
                  <FormControl>
                    <DateTimePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>Select the date and time of birth</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="London" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SORTED_COUNTRIES.map(country => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isCreating} className="min-w-[100px]">
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Chart"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
