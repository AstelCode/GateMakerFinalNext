"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

interface AdminItemCardProps {
  name: string;
  description: string;
  type: "mod" | "pack";
  image: string;
}

export function AdminItemCard({
  name,
  description,
  type,
  image,
}: AdminItemCardProps) {
  return (
    <Card className="overflow-hidden pt-0 h-full flex flex-col">
      <div className="relative">
        <img
          className="w-full h-40 object-cover"
          src={image}
          alt={`${name} preview`}
        />

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              >
                <MoreVertical className="size-4 shrink-0 text-foreground" />
              </Button>
            }
          ></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Pencil className="mr-2 size-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <Trash2 className="mr-2 size-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CardHeader className="grow">
        <CardAction>
          <Badge variant={type === "mod" ? "default" : "secondary"}>
            {type === "mod" ? "Mod" : "Pack"}
          </Badge>
        </CardAction>
        <CardTitle className="truncate">{name}</CardTitle>
        <CardDescription className="truncate">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
