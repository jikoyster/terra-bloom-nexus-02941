
import TerraArchitecture from '../components/TerraArchitecture';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-amber-50">
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Terra<span className="text-green-600">Sync</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Vertically Integrated Agri-Tech Platform: A Comprehensive Farm OS Architecture 
            for Regenerative, Farmer-Owned Food Systems
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Access Co-op Dashboard
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
        <TerraArchitecture />
      </div>
    </div>
  );
};

export default Index;
