
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Mail, QrCode, MessageSquare, Settings, Shield, Users, UserCheck } from 'lucide-react';
import TradeApprovalPanel from '../trade/TradeApprovalPanel';

const AdminPanel = () => {
  const [newUserType, setNewUserType] = useState('farmer');
  
  const users = [
    {
      id: 1,
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      role: 'Farmer',
      status: 'Active',
      lastLogin: '2024-07-13',
      permissions: ['View Dashboard', 'Submit Reports']
    },
    {
      id: 2,
      name: 'AgriSupply Pro',
      email: 'contact@agrisupply.com',
      role: 'Vendor',
      status: 'Active',
      lastLogin: '2024-07-12',
      permissions: ['Manage Inventory', 'Process Orders']
    },
    {
      id: 3,
      name: 'Dr. James Rivera',
      email: 'j.rivera@extension.gov',
      role: 'Technician',
      status: 'Active',
      lastLogin: '2024-07-13',
      permissions: ['Technical Support', 'Data Analysis']
    },
    {
      id: 4,
      name: 'Green Audit Corp',
      email: 'audit@greenaudit.com',
      role: 'Auditor',
      status: 'Pending',
      lastLogin: 'Never',
      permissions: ['Carbon Verification', 'Compliance Review']
    }
  ];

  const accessLogs = [
    {
      id: 1,
      user: 'Maria Santos',
      action: 'Logged into Dashboard',
      timestamp: '2024-07-13 08:30:00',
      ipAddress: '192.168.1.45',
      status: 'Success'
    },
    {
      id: 2,
      user: 'AgriSupply Pro',
      action: 'Updated Inventory',
      timestamp: '2024-07-13 07:15:00',
      ipAddress: '203.177.89.23',
      status: 'Success'
    },
    {
      id: 3,
      user: 'System',
      action: 'Failed Login Attempt',
      timestamp: '2024-07-13 02:45:00',
      ipAddress: '194.87.23.11',
      status: 'Failed'
    }
  ];

  const getRoleBadge = (role: string) => {
    const colors = {
      'Farmer': 'bg-green-100 text-green-800',
      'Vendor': 'bg-blue-100 text-blue-800',
      'Technician': 'bg-purple-100 text-purple-800',
      'Auditor': 'bg-orange-100 text-orange-800',
      'Co-op Admin': 'bg-red-100 text-red-800'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusBadge = (status: string) => {
    return status === 'Active' ? 'default' : 'secondary';
  };

  return (
    <div className="space-y-6">
      {/* Admin Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <div className="text-xs text-muted-foreground">+12 this month</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <div className="text-xs text-green-600">Peak: 45 today</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <div className="text-xs text-yellow-600">Requires attention</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">99.8%</div>
            <div className="text-xs text-muted-foreground">Uptime this month</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="logs">Access Logs</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="trades">Trade Approval</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Directory</CardTitle>
              <CardDescription>Manage farmers, vendors, technicians, and auditors</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={getRoleBadge(user.role)}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          {user.status === 'Pending' && (
                            <Button size="sm">Approve</Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role-Based Permissions</CardTitle>
              <CardDescription>Configure access levels for different user types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="h-5 w-5 text-green-600" />
                      <h4 className="font-medium">Farmer Permissions</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span>View Dashboard</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span>Submit Field Reports</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span>Apply for Loans</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Settings className="h-5 w-5 text-blue-600" />
                      <h4 className="font-medium">Vendor Permissions</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-500" />
                        <span>Manage Inventory</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-500" />
                        <span>Process Orders</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-500" />
                        <span>Update Pricing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Access Logs</CardTitle>
              <CardDescription>Monitor user activity and security events</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accessLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                      <TableCell>
                        <Badge variant={log.status === 'Success' ? 'default' : 'destructive'}>
                          {log.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="onboarding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Onboarding</CardTitle>
              <CardDescription>Add new farmers and vendors to the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="text-center space-y-3">
                      <Mail className="h-8 w-8 mx-auto text-blue-600" />
                      <h4 className="font-medium">Email Invitation</h4>
                      <p className="text-sm text-muted-foreground">Send invitation links via email</p>
                      <Button className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="text-center space-y-3">
                      <MessageSquare className="h-8 w-8 mx-auto text-green-600" />
                      <h4 className="font-medium">SMS Registration</h4>
                      <p className="text-sm text-muted-foreground">Register users via SMS</p>
                      <Button className="w-full">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send SMS
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="text-center space-y-3">
                      <QrCode className="h-8 w-8 mx-auto text-purple-600" />
                      <h4 className="font-medium">QR Code Setup</h4>
                      <p className="text-sm text-muted-foreground">Generate registration QR codes</p>
                      <Button className="w-full">
                        <QrCode className="h-4 w-4 mr-2" />
                        Generate QR
                      </Button>
                    </div>
                  </Card>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="font-medium mb-4">Quick Add User</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input placeholder="Full Name" />
                    <Input placeholder="Email Address" />
                    <select className="px-3 py-2 border rounded-md">
                      <option>Farmer</option>
                      <option>Vendor</option>
                      <option>Technician</option>
                      <option>Auditor</option>
                    </select>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trades" className="space-y-4">
          <TradeApprovalPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
