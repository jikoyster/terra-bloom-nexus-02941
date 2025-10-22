
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Cpu, 
  Database, 
  Smartphone, 
  Wifi, 
  Cloud, 
  Leaf, 
  Thermometer,
  Droplets,
  Bug,
  Sun,
  Zap,
  Radio,
  Brain,
  TrendingUp,
  Shield,
  Coins,
  Users,
  BarChart3,
  Settings,
  Eye,
  Globe
} from 'lucide-react';

const TerraArchitecture = () => {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  const layers = [
    {
      id: 'hardware',
      title: 'Hardware Layer',
      subtitle: 'Physical Sensing & Collection',
      color: 'from-green-600 to-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      components: [
        { icon: Thermometer, name: 'Soil Sensors', desc: 'Temperature & Moisture' },
        { icon: Bug, name: 'Pest Detection', desc: 'Berlese-Tullgren Sensors' },
        { icon: Sun, name: 'Gomboc Sensor', desc: 'Self-Righting Environmental' },
        { icon: Zap, name: 'Solar Relays', desc: 'Off-Grid Power & Data' }
      ]
    },
    {
      id: 'edge',
      title: 'Edge & Data Processing',
      subtitle: 'Real-Time Analysis & Transmission',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      components: [
        { icon: Cpu, name: 'Microcontrollers', desc: 'Raspberry Pi, Arduino' },
        { icon: Brain, name: 'Edge Analytics', desc: 'Real-Time Alerts' },
        { icon: Radio, name: 'LoRaWAN', desc: 'Long Range Transmission' },
        { icon: Wifi, name: '5G Fallback', desc: 'Backup Connectivity' }
      ]
    },
    {
      id: 'cloud',
      title: 'Cloud & AI Layer',
      subtitle: 'Intelligent Processing & Predictions',
      color: 'from-purple-600 to-purple-700',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      components: [
        { icon: Cloud, name: 'AWS/GCP', desc: 'Scalable Infrastructure' },
        { icon: Settings, name: 'Serverless', desc: 'Lambda/Firebase Functions' },
        { icon: TrendingUp, name: 'Yield Prediction', desc: 'ML Forecasting Models' },
        { icon: Leaf, name: 'Carbon Monitor', desc: 'Sequestration Tracking' }
      ]
    },
    {
      id: 'application',
      title: 'Application Layer',
      subtitle: 'User Interfaces & Business Logic',
      color: 'from-amber-600 to-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      components: [
        { icon: Smartphone, name: 'Farmer Mobile', desc: 'React Native Dashboard' },
        { icon: Globe, name: 'Buyer Dashboard', desc: 'React/Angular Frontend' },
        { icon: Database, name: 'API Backend', desc: 'Node.js + PostgreSQL' },
        { icon: BarChart3, name: 'Inventory System', desc: 'Logistics & Finance' }
      ]
    },
    {
      id: 'governance',
      title: 'Impact & Data Governance',
      subtitle: 'Transparency & Cooperative Management',
      color: 'from-emerald-600 to-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      components: [
        { icon: Eye, name: 'Visibility Profiles', desc: 'Farmer Transparency' },
        { icon: Shield, name: 'Blockchain Ledger', desc: 'Ownership & Credits' },
        { icon: Coins, name: 'Carbon Credits', desc: 'Environmental Impact' },
        { icon: Users, name: 'Cooperative Index', desc: 'Performance Metrics' }
      ]
    }
  ];

  const dataFlows = [
    { from: 'hardware', to: 'edge', label: 'Sensor Data', type: 'iot' },
    { from: 'edge', to: 'cloud', label: 'Processed Data', type: 'network' },
    { from: 'cloud', to: 'application', label: 'API Calls', type: 'api' },
    { from: 'application', to: 'governance', label: 'User Actions', type: 'business' },
    { from: 'governance', to: 'cloud', label: 'Governance Rules', type: 'feedback' }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Architecture Overview */}
      <div className="mb-8">
        <Card className="border-2 border-gray-200 shadow-lg">
          <CardHeader className="text-center bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">TerraSync System Architecture</CardTitle>
            <p className="text-green-100">End-to-End Farm OS for Regenerative Agriculture</p>
          </CardHeader>
        </Card>
      </div>

      {/* Layer Components */}
      <div className="space-y-6 mb-8">
        {layers.map((layer, index) => (
          <Card 
            key={layer.id}
            className={`${layer.bgColor} ${layer.borderColor} border-2 transition-all duration-300 hover:shadow-xl cursor-pointer ${
              activeLayer === layer.id ? 'ring-4 ring-blue-300 scale-105' : ''
            }`}
            onMouseEnter={() => setActiveLayer(layer.id)}
            onMouseLeave={() => setActiveLayer(null)}
          >
            <CardHeader className={`bg-gradient-to-r ${layer.color} text-white rounded-t-lg`}>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl font-bold">{layer.title}</CardTitle>
                  <p className="text-sm opacity-90">{layer.subtitle}</p>
                </div>
                <Badge className="bg-white/20 text-white border-white/30">
                  Layer {index + 1}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {layer.components.map((component, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                      hoveredComponent === `${layer.id}-${idx}` 
                        ? 'bg-white shadow-lg scale-105 border-blue-300' 
                        : 'bg-white/50 border-gray-200 hover:bg-white hover:shadow-md'
                    }`}
                    onMouseEnter={() => setHoveredComponent(`${layer.id}-${idx}`)}
                    onMouseLeave={() => setHoveredComponent(null)}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <component.icon className="w-6 h-6 text-gray-700" />
                      <h4 className="font-semibold text-gray-800">{component.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{component.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Flow Visualization */}
      <Card className="border-2 border-gray-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-t-lg">
          <CardTitle className="text-xl font-bold">System Data Flows</CardTitle>
          <p className="text-gray-200">Information Movement Throughout the Platform</p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataFlows.map((flow, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border-2 border-gray-200 bg-gradient-to-r from-white to-gray-50 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {flow.from.toUpperCase()}
                  </Badge>
                  <div className="flex-1 mx-2 border-t-2 border-dashed border-gray-400 relative">
                    <div className="absolute right-0 top-0 transform -translate-y-1">
                      <div className="w-2 h-2 bg-gray-600 rotate-45"></div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {flow.to.toUpperCase()}
                  </Badge>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-700">{flow.label}</p>
                  <p className="text-xs text-gray-500 capitalize">{flow.type} Communication</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Features Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Leaf className="w-5 h-5 mr-2" />
              Regenerative Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Carbon sequestration monitoring</li>
              <li>• Soil health optimization</li>
              <li>• Biodiversity tracking</li>
              <li>• Sustainable practice recommendations</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Farmer-Owned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Cooperative ownership models</li>
              <li>• Transparent data governance</li>
              <li>• Democratic decision making</li>
              <li>• Shared value creation</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="text-purple-800 flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              AI-Powered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Predictive pest management</li>
              <li>• Yield forecasting models</li>
              <li>• Water optimization algorithms</li>
              <li>• Market price predictions</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TerraArchitecture;
