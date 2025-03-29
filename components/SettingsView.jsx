"use client";
import { Bell, Sun, Globe, Shield, HelpCircle } from "lucide-react";
import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function SettingsView() {
  return (
    <>
      <SidebarHeader className="border-b p-4">
        <div className="text-base font-medium text-foreground">Settings</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <div className="divide-y">
              {/* Notifications */}
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <Bell className="h-5 w-5 mr-3 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Notifications</h3>
                </div>
                <div className="space-y-3 pl-8">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications-all" className="text-sm">
                      Enable notifications
                    </Label>
                    <Switch id="notifications-all" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications-sound" className="text-sm">
                      Sound
                    </Label>
                    <Switch id="notifications-sound" />
                  </div>
                </div>
              </div>

              {/* Appearance */}
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <Sun className="h-5 w-5 mr-3 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Appearance</h3>
                </div>
                <div className="space-y-3 pl-8">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dark-mode" className="text-sm">
                      Dark mode
                    </Label>
                    <Switch id="dark-mode" />
                  </div>
                </div>
              </div>

              {/* Language */}
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <Globe className="h-5 w-5 mr-3 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Language</h3>
                </div>
                <div className="space-y-3 pl-8">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">English (US)</Label>
                  </div>
                </div>
              </div>

              {/* Privacy */}
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <Shield className="h-5 w-5 mr-3 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Privacy & Security</h3>
                </div>
                <div className="space-y-3 pl-8">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="online-status" className="text-sm">
                      Show online status
                    </Label>
                    <Switch id="online-status" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="read-receipts" className="text-sm">
                      Read receipts
                    </Label>
                    <Switch id="read-receipts" />
                  </div>
                </div>
              </div>

              {/* Help */}
              <div className="p-4">
                <div className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-3 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Help & Support</h3>
                </div>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </>
  );
}
