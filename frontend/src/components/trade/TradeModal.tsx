import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType: 'farmer' | 'vendor';
}

const TradeModal = ({ isOpen, onClose, userType }: TradeModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    type: '',
    itemName: '',
    quantity: '',
    unit: '',
    availabilityWindow: '',
    price: '',
    tradeFor: '',
    description: '',
    location: ''
  });
  const [images, setImages] = useState<string[]>([]);
  const [isTradeMode, setIsTradeMode] = useState(false);

  const tradeTypes = userType === 'farmer' 
    ? ['produce', 'seeds', 'compost']
    : ['seeds', 'compost', 'organic-inputs', 'packaging'];

  const handleSubmit = () => {
    if (!formData.type || !formData.itemName || !formData.quantity) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Trade Request Submitted",
      description: "Your trade offer has been sent to the Co-op for verification",
    });

    // Reset form
    setFormData({
      type: '',
      itemName: '',
      quantity: '',
      unit: '',
      availabilityWindow: '',
      price: '',
      tradeFor: '',
      description: '',
      location: ''
    });
    setImages([]);
    onClose();
  };

  const addImage = () => {
    setImages([...images, `https://images.unsplash.com/photo-150x150-${Math.random()}`]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            ⇄ New Trade Offer
            <Badge variant="outline">{userType}</Badge>
          </DialogTitle>
          <DialogDescription>
            Create a new trade offer for verification by the Co-op Manager
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Trade Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Trade Type *</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select trade type" />
              </SelectTrigger>
              <SelectContent>
                {tradeTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === 'produce' && '🌽 Produce'}
                    {type === 'seeds' && '🌱 Seeds'}
                    {type === 'compost' && '♻️ Compost'}
                    {type === 'organic-inputs' && '🧪 Organic Inputs'}
                    {type === 'packaging' && '📦 Packaging'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Item Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="itemName">Item Name *</Label>
              <Input
                id="itemName"
                value={formData.itemName}
                onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                placeholder="e.g., Organic Corn, Premium Seeds"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <div className="flex gap-2">
                <Input
                  id="quantity"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="100"
                  className="flex-1"
                />
                <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="tons">tons</SelectItem>
                    <SelectItem value="bags">bags</SelectItem>
                    <SelectItem value="pieces">pieces</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Availability & Location */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="availability">Availability Window</Label>
              <Input
                id="availability"
                value={formData.availabilityWindow}
                onChange={(e) => setFormData({ ...formData, availabilityWindow: e.target.value })}
                placeholder="e.g., Next 2 weeks, Harvest season"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Farm location or pickup point"
              />
            </div>
          </div>

          {/* Price or Trade */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Label>Offer Type:</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={!isTradeMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsTradeMode(false)}
                >
                  💰 Set Price
                </Button>
                <Button
                  type="button"
                  variant={isTradeMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsTradeMode(true)}
                >
                  🔄 Trade For
                </Button>
              </div>
            </div>

            {!isTradeMode ? (
              <div className="space-y-2">
                <Label htmlFor="price">Price per {formData.unit || 'unit'}</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="$25.00"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="tradeFor">Trade For</Label>
                <Textarea
                  id="tradeFor"
                  value={formData.tradeFor}
                  onChange={(e) => setFormData({ ...formData, tradeFor: e.target.value })}
                  placeholder="e.g., Looking for organic fertilizer, Will trade for seeds"
                  rows={3}
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Additional details about quality, condition, certifications..."
              rows={3}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Images</Label>
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                onClick={addImage}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Add Image
              </Button>
              
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {images.map((image, index) => (
                    <Card key={index} className="relative">
                      <CardContent className="p-2">
                        <div className="aspect-square bg-muted rounded flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">Image {index + 1}</span>
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Submit for Verification
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TradeModal;