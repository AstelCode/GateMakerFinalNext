import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  MoreVertical,
  Pencil,
  Trash2,
  ShieldCheck,
  ShieldOff,
  UserCog,
  Mail,
} from "lucide-react";

// --- Datos de ejemplo ---
const USERS_DATA = [
  {
    id: "1",
    name: "NexusCrafter",
    email: "nexuscrafter@example.com",
    avatar: "https://placehold.co/80x80/1a1a2e/e94560?text=NC",
    role: "superadmin" as const,
    modsCount: 24,
    packsCount: 8,
    joinedAt: "2023-01-15",
    status: "active" as const,
  },
  {
    id: "2",
    name: "ShadowBlade99",
    email: "shadowblade@example.com",
    avatar: "https://placehold.co/80x80/16213e/0f3460?text=SB",
    role: "admin" as const,
    modsCount: 12,
    packsCount: 3,
    joinedAt: "2023-03-22",
    status: "active" as const,
  },
  {
    id: "3",
    name: "PixelHunter",
    email: "pixelhunter@example.com",
    avatar: "https://placehold.co/80x80/2d2d2d/10b981?text=PH",
    role: "user" as const,
    modsCount: 5,
    packsCount: 1,
    joinedAt: "2023-06-10",
    status: "active" as const,
  },
  {
    id: "4",
    name: "ModExplorer",
    email: "modexplorer@example.com",
    avatar: "https://placehold.co/80x80/0f3460/e94560?text=ME",
    role: "user" as const,
    modsCount: 0,
    packsCount: 0,
    joinedAt: "2023-08-05",
    status: "active" as const,
  },
  {
    id: "5",
    name: "DarkLord42",
    email: "darklord42@example.com",
    avatar: "https://placehold.co/80x80/1b1a2e/e94560?text=DL",
    role: "user" as const,
    modsCount: 3,
    packsCount: 0,
    joinedAt: "2023-09-18",
    status: "banned" as const,
  },
  {
    id: "6",
    name: "DragonSlayer77",
    email: "dragonslayer@example.com",
    avatar: "https://placehold.co/80x80/1a2e1a/10b981?text=DS",
    role: "admin" as const,
    modsCount: 18,
    packsCount: 5,
    joinedAt: "2023-02-28",
    status: "active" as const,
  },
  {
    id: "7",
    name: "QuestHunter",
    email: "questhunter@example.com",
    avatar: "https://placehold.co/80x80/2e1a2e/e94560?text=QH",
    role: "user" as const,
    modsCount: 2,
    packsCount: 0,
    joinedAt: "2024-01-12",
    status: "active" as const,
  },
  {
    id: "8",
    name: "PixelNinja",
    email: "pixelninja@example.com",
    avatar: "https://placehold.co/80x80/1a1a3e/6060ff?text=PN",
    role: "user" as const,
    modsCount: 7,
    packsCount: 2,
    joinedAt: "2024-02-20",
    status: "active" as const,
  },
  {
    id: "9",
    name: "ModdingVet",
    email: "moddingvet@example.com",
    avatar: "https://placehold.co/80x80/3e1a1a/ff6060?text=MV",
    role: "user" as const,
    modsCount: 15,
    packsCount: 4,
    joinedAt: "2023-04-05",
    status: "active" as const,
  },
  {
    id: "10",
    name: "GhostRider_X",
    email: "ghostrider@example.com",
    avatar: "https://placehold.co/80x80/3e3e1a/ffff60?text=GR",
    role: "user" as const,
    modsCount: 1,
    packsCount: 0,
    joinedAt: "2024-05-30",
    status: "inactive" as const,
  },
];

// --- Helpers ---
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const roleBadgeVariant: Record<string, "default" | "secondary" | "outline"> = {
  superadmin: "default",
  admin: "secondary",
  user: "outline",
};

const statusStyles: Record<string, string> = {
  active: "bg-green-500/15 text-green-700 dark:text-green-400",
  inactive: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
  banned: "bg-red-500/15 text-red-700 dark:text-red-400",
};

// --- Estadísticas ---
function StatsCards() {
  const totalUsers = USERS_DATA.length;
  const activeUsers = USERS_DATA.filter((u) => u.status === "active").length;
  const admins = USERS_DATA.filter(
    (u) => u.role === "admin" || u.role === "superadmin",
  ).length;
  const bannedUsers = USERS_DATA.filter((u) => u.status === "banned").length;

  const stats = [
    { label: "Total Users", value: totalUsers, icon: Users },
    { label: "Active", value: activeUsers, icon: ShieldCheck },
    { label: "Admins", value: admins, icon: UserCog },
    { label: "Banned", value: bannedUsers, icon: ShieldOff },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border/50 bg-muted/10">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <stat.icon className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// --- Page (Server Component) ---
export default function ManageUsersPage() {
  return (
    <div className="flex flex-col h-full max-h-[calc(100dvh_-_64px)] w-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b shrink-0">
        <h1 className="text-2xl font-bold tracking-tight">Manage Users</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Stats */}
        <StatsCards />

        {/* Users Table */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Users className="size-4 text-muted-foreground" />
              All Users ({USERS_DATA.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Mods</TableHead>
                  <TableHead className="text-center">Packs</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {USERS_DATA.map((user) => (
                  <TableRow key={user.id}>
                    {/* User info */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8 border border-border">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Role */}
                    <TableCell>
                      <Badge
                        variant={roleBadgeVariant[user.role] ?? "outline"}
                        className="capitalize"
                      >
                        {user.role}
                      </Badge>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                          statusStyles[user.status] ?? ""
                        }`}
                      >
                        {user.status}
                      </span>
                    </TableCell>

                    {/* Mods count */}
                    <TableCell className="text-center text-sm text-muted-foreground">
                      {user.modsCount}
                    </TableCell>

                    {/* Packs count */}
                    <TableCell className="text-center text-sm text-muted-foreground">
                      {user.packsCount}
                    </TableCell>

                    {/* Joined date */}
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(user.joinedAt)}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                            >
                              <MoreVertical className="size-4" />
                            </Button>
                          }
                        ></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pencil className="mr-2 size-4" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 size-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <UserCog className="mr-2 size-4" />
                            Change Role
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === "banned" ? (
                            <DropdownMenuItem>
                              <ShieldCheck className="mr-2 size-4" />
                              Unban User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              <ShieldOff className="mr-2 size-4" />
                              Ban User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash2 className="mr-2 size-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
