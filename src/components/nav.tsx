"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartPulse, LayoutDashboard, Users } from "lucide-react";

import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export function Nav() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/", label: "ED Overview", icon: LayoutDashboard },
    { href: "/census", label: "Live ED Census", icon: Users },
  ];

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2.5">
          <HeartPulse className="size-8 text-primary" />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold tracking-tight">TriageAI</h2>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={
                  item.href === "/"
                    ? pathname === item.href
                    : pathname.startsWith(item.href)
                }
              >
                <Link href={item.href}>
                  <item.icon className="size-4" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Separator className="my-2" />
        <p className="px-2 text-xs text-muted-foreground">
          Predictive Triage Prototype
        </p>
      </SidebarFooter>
    </>
  );
}
