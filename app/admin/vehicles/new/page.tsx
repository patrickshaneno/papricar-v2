'use client';

import { VehicleForm } from '@/components/forms/VehicleForm';

export default function NewVehiclePage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Neues Fahrzeug hinzufügen</h1>
      <VehicleForm />
    </div>
  );
} 