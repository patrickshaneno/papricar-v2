'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export function VehicleForm() {
  const [activeTab, setActiveTab] = useState('details');
  const [formData, setFormData] = useState({
    // Fahrzeugdetails
    brand: '',
    model: '',
    year: '',
    vin: '',
    description: '',
    
    // Verbrauchswerte
    fuelType: '',
    consumption: '',
    co2Emissions: '',
    
    // Preis & Rabatte
    price: '',
    discount: '',
    validUntil: new Date(),
    
    // Bilder
    images: [] as File[],
    
    // Status
    status: 'draft',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementiere die Formularverarbeitung
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex space-x-4 border-b">
        <button
          type="button"
          onClick={() => setActiveTab('details')}
          className={`px-4 py-2 ${activeTab === 'details' ? 'border-b-2 border-primary' : ''}`}
        >
          Fahrzeugdetails
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('consumption')}
          className={`px-4 py-2 ${activeTab === 'consumption' ? 'border-b-2 border-primary' : ''}`}
        >
          Verbrauchswerte
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('price')}
          className={`px-4 py-2 ${activeTab === 'price' ? 'border-b-2 border-primary' : ''}`}
        >
          Preis & Rabatte
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('images')}
          className={`px-4 py-2 ${activeTab === 'images' ? 'border-b-2 border-primary' : ''}`}
        >
          Bilder
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('status')}
          className={`px-4 py-2 ${activeTab === 'status' ? 'border-b-2 border-primary' : ''}`}
        >
          Status
        </button>
      </div>

      {activeTab === 'details' && (
        <Card>
          <CardHeader>
            <CardTitle>Fahrzeugdetails</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="brand">Marke</label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="model">Modell</label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="year">Baujahr</label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="vin">Fahrgestellnummer</label>
                <Input
                  id="vin"
                  value={formData.vin}
                  onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="description">Beschreibung</label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'consumption' && (
        <Card>
          <CardHeader>
            <CardTitle>Verbrauchswerte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="fuelType">Kraftstoffart</label>
                <Select
                  value={formData.fuelType}
                  onValueChange={(value) => setFormData({ ...formData, fuelType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wählen Sie eine Kraftstoffart" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrol">Benzin</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="electric">Elektro</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="consumption">Verbrauch (l/100km)</label>
                <Input
                  id="consumption"
                  type="number"
                  step="0.1"
                  value={formData.consumption}
                  onChange={(e) => setFormData({ ...formData, consumption: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="co2Emissions">CO2-Emissionen (g/km)</label>
                <Input
                  id="co2Emissions"
                  type="number"
                  value={formData.co2Emissions}
                  onChange={(e) => setFormData({ ...formData, co2Emissions: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'price' && (
        <Card>
          <CardHeader>
            <CardTitle>Preis & Rabatte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="price">Preis (€)</label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="discount">Rabatt (%)</label>
                <Input
                  id="discount"
                  type="number"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="validUntil">Gültig bis</label>
                <Input
                  id="validUntil"
                  type="date"
                  value={formData.validUntil.toISOString().split('T')[0]}
                  onChange={(e) => setFormData({ ...formData, validUntil: new Date(e.target.value) })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'images' && (
        <Card>
          <CardHeader>
            <CardTitle>Bilder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setFormData({ ...formData, images: files });
                }}
              />
              {/* TODO: Implementiere Bildvorschau */}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'status' && (
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wählen Sie einen Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Entwurf</SelectItem>
                  <SelectItem value="published">Veröffentlicht</SelectItem>
                  <SelectItem value="archived">Archiviert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button type="submit">Speichern</Button>
      </div>
    </form>
  );
} 