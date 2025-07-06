"use client";

import Navbar from "@/app/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createBlogfunction } from "./actions";
import React from "react";
import { useOrganization } from "@clerk/nextjs";

const FormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  content: z.string().min(10, "Content must be at least 10 characters."),
});

export default function LandingPage() {
  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (!organization) {
        toast.error("Organization not found.");
        return;
      }

      const result = await createBlogfunction({
        title: data.title,
        body: data.content,
        orgId: organization.id,
      });

      toast("Blog submitted successfully!", {
        description: (
          <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
            <code className="text-white">{JSON.stringify(result, null, 2)}</code>
          </pre>
        ),
      });

      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while submitting the blog.");
    }
  }

  return (
    <div>
      <Navbar />
      <div className="m-8 border-4 border-red-500">
        <div className="flex items-center border border-b-blue-950 w-1/2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 p-6 border-amber-500 border m-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter title" className="resize-none w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter blog content..." className="resize-none w-full" {...field} />
                    </FormControl>
                    <FormDescription>
                      You can <span>@mention</span> other users and organizations.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="border">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
