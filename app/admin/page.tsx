'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card } from '@/components/ui/card';
import { Car, MessageSquare, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  totalVehicles: number;
  savedVehicles: number;
  activeChats: number;
  dealerName: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalVehicles: 0,
    savedVehicles: 0,
    activeChats: 0,
    dealerName: '',
  });
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchStats = async () => {
      // Fahrzeuge zählen
      const { count: vehiclesCount } = await supabase
        .from('vehicles')
        .select('*', { count: 'exact', head: true });

      // Gespeicherte Fahrzeuge zählen
      const { count: savedCount } = await supabase
        .from('saved_vehicles')
        .select('*', { count: 'exact', head: true });

      // Aktive Chats zählen
      const { count: chatsCount } = await supabase
        .from('chats')
        .select('*', { count: 'exact', head: true });

      // Händlerinformationen abrufen
      const { data: { user } } = await supabase.auth.getUser();
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user?.id)
        .single();

      setStats({
        totalVehicles: vehiclesCount || 0,
        savedVehicles: savedCount || 0,
        activeChats: chatsCount || 0,
        dealerName: profile?.full_name || 'Unbekannter Händler',
      });
    };

    fetchStats();
  }, [supabase]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1024px]">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Car className="w-8 h-8 text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold">Fahrzeuge</h3>
              <p className="text-2xl font-bold">{stats.totalVehicles}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Car className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="text-lg font-semibold">Gespeicherte Fahrzeuge</h3>
              <p className="text-2xl font-bold">{stats.savedVehicles}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <MessageSquare className="w-8 h-8 text-purple-500" />
            <div>
              <h3 className="text-lg font-semibold">Aktive Chats</h3>
              <p className="text-2xl font-bold">{stats.activeChats}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Schnellzugriff</h2>
          <div className="space-y-4">
            <Link href="/admin/vehicles" className="flex items-center space-x-2 text-blue-500 hover:text-blue-600">
              <Car className="w-5 h-5" />
              <span>Fahrzeuge verwalten</span>
            </Link>
            <Link href="/admin/chat" className="flex items-center space-x-2 text-purple-500 hover:text-purple-600">
              <MessageSquare className="w-5 h-5" />
              <span>Chat</span>
            </Link>
            <Link href="/admin/settings" className="flex items-center space-x-2 text-gray-500 hover:text-gray-600">
              <Settings className="w-5 h-5" />
              <span>Einstellungen</span>
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Händlerinformationen</h2>
          <p className="text-lg">{stats.dealerName}</p>
          <button 
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = '/';
            }}
            className="mt-4 flex items-center space-x-2 text-red-500 hover:text-red-600"
          >
            <LogOut className="w-5 h-5" />
            <span>Abmelden</span>
          </button>
        </Card>
      </div>
    </div>
  );
} 