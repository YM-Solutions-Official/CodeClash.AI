"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Bell, Shield, Trash2 } from "lucide-react";

export default function ProfileSettings() {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [battleNotifications, setBattleNotifications] = useState(true);

    return (
        <div className="space-y-6">
            {/* Edit Profile Section */}
            <div className="glass rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <User className="h-6 w-6 text-primary" />
                    Edit Profile
                </h2>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" defaultValue="John" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" defaultValue="Doe" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="johndoe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            defaultValue="Passionate full-stack developer specializing in React and Node.js."
                            rows={4}
                        />
                    </div>
                    <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                        Save Changes
                    </Button>
                </div>
            </div>

            {/* Account Settings */}
            <div className="glass rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Mail className="h-6 w-6 text-primary" />
                    Account Settings
                </h2>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="flex gap-2">
                            <Input id="email" type="email" defaultValue="john@example.com" disabled />
                            <Button variant="outline">Verify</Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Change Password</Label>
                        <Input id="password" type="password" placeholder="Enter new password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                    </div>
                    <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                        Update Password
                    </Button>
                </div>
            </div>

            {/* Notification Settings */}
            <div className="glass rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Bell className="h-6 w-6 text-primary" />
                    Notifications
                </h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium">Email Notifications</div>
                            <div className="text-sm text-muted-foreground">
                                Receive updates via email
                            </div>
                        </div>
                        <Switch
                            checked={emailNotifications}
                            onCheckedChange={setEmailNotifications}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium">Battle Notifications</div>
                            <div className="text-sm text-muted-foreground">
                                Get notified when challenged
                            </div>
                        </div>
                        <Switch
                            checked={battleNotifications}
                            onCheckedChange={setBattleNotifications}
                        />
                    </div>
                </div>
            </div>

            {/* Privacy Settings */}
            <div className="glass rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Shield className="h-6 w-6 text-primary" />
                    Privacy
                </h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium">Public Profile</div>
                            <div className="text-sm text-muted-foreground">
                                Allow others to view your profile
                            </div>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium">Show Battle History</div>
                            <div className="text-sm text-muted-foreground">
                                Make your battle history visible
                            </div>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="glass rounded-2xl p-6 border-2 border-destructive/20">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-destructive">
                    <Trash2 className="h-6 w-6" />
                    Danger Zone
                </h2>
                <div className="space-y-4">
                    <p className="text-muted-foreground">
                        Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button variant="destructive" className="gap-2">
                        <Trash2 className="h-4 w-4" />
                        Delete Account
                    </Button>
                </div>
            </div>
        </div>
    );
};
