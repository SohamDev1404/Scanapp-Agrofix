
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ScanLine, 
  Camera, 
  User as UserIcon, 
  LogOut, 
  History,
  Activity
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('scanner');

  // Mock data for user dashboard
  const recentScans = [
    { id: 1, entry: 'ABC123', time: '2024-06-10 10:00', status: 'processed' },
    { id: 2, entry: 'XYZ789', time: '2024-06-10 09:45', status: 'pending' },
    { id: 3, entry: 'LMN456', time: '2024-06-10 09:30', status: 'processed' },
    { id: 4, entry: 'DEF012', time: '2024-06-10 09:15', status: 'processed' },
  ];

  const userStats = [
    { title: 'Today\'s Scans', value: '12', icon: ScanLine },
    { title: 'This Week', value: '45', icon: Activity },
  ];

  const handleStartScan = () => {
    toast({
      title: "Scanner started",
      description: "Ready to scan items...",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <ScanLine className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Scanner Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <UserIcon className="w-3 h-3 mr-1" />
              User
            </Badge>
            <Button 
              variant="outline" 
              onClick={logout}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-6 max-w-6xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="scanner" className="flex items-center space-x-2">
              <Camera className="w-4 h-4" />
              <span>Scanner</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <History className="w-4 h-4" />
              <span>History</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <UserIcon className="w-4 h-4" />
              <span>Profile</span>
            </TabsTrigger>
          </TabsList>

          {/* Scanner Tab */}
          <TabsContent value="scanner" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2">
              {userStats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Scanner Interface */}
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

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Scans</CardTitle>
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
                    {recentScans.map((scan) => (
                      <TableRow key={scan.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <TableCell className="font-medium">{scan.id}</TableCell>
                        <TableCell className="font-mono">{scan.entry}</TableCell>
                        <TableCell>{scan.time}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={scan.status === "processed" ? "default" : "secondary"}
                            className={scan.status === "processed" ? "bg-green-100 text-green-800" : ""}
                          >
                            {scan.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{user?.name}</h3>
                    <p className="text-gray-600">{user?.email}</p>
                    <Badge variant="outline" className="mt-1">
                      {user?.role}
                    </Badge>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Account Details</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Member since: June 2024</p>
                    <p>Total scans: 127</p>
                    <p>Last login: Today at 10:00 AM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
