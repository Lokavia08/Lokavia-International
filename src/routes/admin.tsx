import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Lokavia" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminRedirect,
});

function AdminRedirect() {
  if (typeof window !== "undefined") {
    window.location.href = "/admin/index.html";
  }
  return null;
}
