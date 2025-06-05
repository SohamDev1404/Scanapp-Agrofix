
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScanLine, Users, Database, LogOut, Camera, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("scanner");

  // Sample data
  const scannedEntries = [
    { id: 1, entry: "ABC123", time: "2024-06-10 10:00", status: "processed" },
    { id: 2, entry: "XYZ789", time: "2024-06-10 10:05", status: "pending" },
    { id: 3, entry: "LMN456", time: "2024-06-10 10:10", status: "processed" },
  ];

  const users = [
    { id: 1, email: "admin@example.com", role: "Admin" },
    { id: 2, email: "user1@example.com", role: "User" },
    { id: 3, email: "user2@example.com", role: "User" },
  ];

  const handleLogin = () => {
    if (email && password) {
      setIsLoggedIn(true);
      toast({
        title: "Login successful",
        description: "Welcome to ScannerApp!",
      });
    } else {
      toast({
        title: "Error",
        description: "Please enter email and password",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setActiveTab("scanner");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleStartScan = () => {
    toast({
      title: "Scanner started",
      description: "Ready to scan items...",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <ScanLine className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">ScannerApp</CardTitle>
            <p className="text-gray-600">Sign in to your account</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button 
              onClick={handleLogin} 
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <ScanLine className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">ScannerApp</h1>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="text-red-600 border-red-200 hover:bg-red-50 transition-colors duration-200"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-6 max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="scanner" className="flex items-center space-x-2">
              <Camera className="w-4 h-4" />
              <span>Scanner</span>
            </TabsTrigger>
            <TabsTrigger value="entries" className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>Entries</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Admin</span>
            </TabsTrigger>
          </TabsList>

          {/* Scanner Tab */}
          <TabsContent value="scanner" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scanner Interface</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-300 transition-colors duration-200">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Scanner ready to capture</p>
                  <Button 
                    onClick={handleStartScan}
                    className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                  >
                    <ScanLine className="w-4 h-4 mr-2" />
                    Start Scan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Entries Tab */}
          <TabsContent value="entries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scanned Entries</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Entry</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scannedEntries.map((entry) => (
                      <TableRow key={entry.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <TableCell className="font-medium">{entry.id}</TableCell>
                        <TableCell className="font-mono">{entry.entry}</TableCell>
                        <TableCell>{entry.time}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={entry.status === "processed" ? "default" : "secondary"}
                            className={entry.status === "processed" ? "bg-green-100 text-green-800" : ""}
                          >
                            {entry.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admin Tab */}
          <TabsContent value="admin" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Create User */}
              <Card>
                <CardHeader>
                  <CardTitle>Create New User</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newUserEmail">User Email</Label>
                    <Input
                      id="newUserEmail"
                      type="email"
                      placeholder="user@example.com"
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newUserPassword">Password</Label>
                    <Input
                      id="newUserPassword"
                      type="password"
                      placeholder="Create a password"
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 transition-colors duration-200">
                    <Plus className="w-4 h-4 mr-2" />
                    Create User
                  </Button>
                </CardContent>
              </Card>

              {/* User List */}
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                          <TableCell className="font-medium">{user.id}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === "Admin" ? "default" : "secondary"}>
                              {user.role}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
