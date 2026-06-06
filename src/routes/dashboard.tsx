import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { TenaHubApp } from "@/components/tenahub/TenaHubApp";

export const Route = createFileRoute("/dashboard")({
  validateSearch: z.object({
    role: z.enum(["user", "partner", "admin", "professional"]).optional(),
  }),
  head: () => ({
    meta: [{ title: "Dashboard TenaGulecha" }],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { role } = Route.useSearch();
  return <TenaHubApp initialView={role} />;
}
