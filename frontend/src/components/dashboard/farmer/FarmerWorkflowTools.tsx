
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, FileText, CreditCard, Phone, MessageSquare, Mail, Wrench, AlertTriangle } from 'lucide-react';

const FarmerWorkflowTools = () => {
  const quickActions = [
    {
      title: 'Reorder Inputs',
      description: 'Low stock alerts for seeds and fertilizers',
      icon: <ShoppingCart className="h-5 w-5" />,
      urgency: 'high',
      action: 'Order Now',
      details: '3 items below threshold'
    },
    {
      title: 'Insurance Claim',
      description: 'File pest damage claim for East Field',
      icon: <FileText className="h-5 w-5" />,
      urgency: 'medium',
      action: 'File Claim',
      details: 'Aphid damage documented'
    },
    {
      title: 'Loan Application',
      description: 'Apply for equipment financing',
      icon: <CreditCard className="h-5 w-5" />,
      urgency: 'low',
      action: 'Apply',
      details: '₱150,000 available'
    },
    {
      title: 'Technical Support',
      description: 'Request agronomist visit',
      icon: <Wrench className="h-5 w-5" />,
      urgency: 'medium',
      action: 'Request Visit',
      details: 'pH issues in West Field'
    }
  ];

  const coopContacts = [
    {
      name: 'Ana Santos',
      role: 'Co-op Manager',
      phone: '+63 917 123 4567',
      email: 'ana.santos@terrasync.coop',
      department: 'Operations',
      available: true
    },
    {
      name: 'Dr. Miguel Torres',
      role: 'Agricultural Technician',
      phone: '+63 918 234 5678',
      email: 'm.torres@terrasync.coop',
      department: 'Technical',
      available: false
    },
    {
      name: 'Maria Cruz',
      role: 'Finance Officer',
      phone: '+63 919 345 6789',
      email: 'maria.cruz@terrasync.coop',
      department: 'Finance',
      available: true
    }
  ];

  const recentNotifications = [
    {
      type: 'alert',
      message: 'VRT system detected pH imbalance in West Field',
      time: '2 hours ago',
      action: 'View Details'
    },
    {
      type: 'reminder',
      message: 'Pest trap inspection due tomorrow',
      time: '4 hours ago',
      action: 'Schedule'
    },
    {
      type: 'success',
      message: 'Compost application logged successfully',
      time: '6 hours ago',
      action: 'View Entry'
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'reminder': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'success': return <AlertTriangle className="h-4 w-4 text-green-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Workflow Tools
          </CardTitle>
          <CardDescription>Quick actions and co-op integration tools</CardDescription>
        </CardHeader>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>Priority tasks and workflow shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${getUrgencyColor(action.urgency)}`}>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/80 rounded">
                    {action.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{action.title}</h4>
                    <p className="text-sm mb-2">{action.description}</p>
                    <p className="text-xs font-medium mb-3">{action.details}</p>
                    <Button size="sm" className="w-full">
                      {action.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Co-op Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Co-op Contacts</CardTitle>
          <CardDescription>Direct communication with co-op staff</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {coopContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${contact.available ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <div>
                    <h4 className="font-medium">{contact.name}</h4>
                    <p className="text-sm text-muted-foreground">{contact.role} • {contact.department}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="gap-1">
                    <Phone className="h-3 w-3" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1">
                    <MessageSquare className="h-3 w-3" />
                    SMS
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1">
                    <Mail className="h-3 w-3" />
                    Email
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">System Notifications</CardTitle>
          <CardDescription>Alerts from integrated farming systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentNotifications.map((notification, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
                <Button size="sm" variant="outline">
                  {notification.action}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerWorkflowTools;
