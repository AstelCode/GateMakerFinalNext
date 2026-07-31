"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, Send } from "lucide-react";

type Comment = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
  likes: number;
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ModComments({ comments }: { comments: Comment[] }) {
  return (
    <div className="space-y-4">
      {/* Comment form */}
      <Card className="border-border/50 bg-muted/20">
        <CardContent className="p-4">
          <Textarea
            placeholder="Share your thoughts about this mod..."
            className="mb-3 min-h-[80px] resize-none border-border/50 bg-background"
          />
          <div className="flex justify-end">
            <Button size="sm" className="gap-2">
              <Send className="size-4" />
              Post Comment
            </Button>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Comment list */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card
            key={comment.id}
            className="border-border/50 bg-muted/10 transition-colors hover:bg-muted/20"
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="size-9 shrink-0 border border-border">
                  <AvatarImage
                    src={comment.author.avatar}
                    alt={comment.author.name}
                  />
                  <AvatarFallback>
                    {comment.author.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {comment.author.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(comment.date)}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {comment.content}
                  </p>

                  <div className="flex items-center gap-1 pt-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <ThumbsUp className="size-3.5" />
                      {comment.likes}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
