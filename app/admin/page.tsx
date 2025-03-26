'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  Car,
  MessageSquare,
  Clock,
  TrendingUp,
} from 'lucide-react';

interface DashboardStats {
  totalVehicles: number;
  newMessages: number;
  lastLogin: string;
  activeListings: number;
}

export default function AdminDashboard() {
  const supabase = createClientComponentClient();
  const [stats, setStats] = useState<DashboardStats>({
    totalVehicles: 0,
    newMessages: 0,
    lastLogin: '',
    activeListings: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        // Fahrzeuge zählen
        const { count: vehiclesCount } = await supabase
          .from('vehicles')
          .select('*', { count: 'exact', head: true })
          .eq('dealer_id', session.user.id);

        // Aktive Listings zählen
        const { count: activeListingsCount } = await supabase
          .from('vehicles')
          .select('*', { count: 'exact', head: true })
          .eq('dealer_id', session.user.id)
          .eq('status', 'published');

        // Letzter Login
        const { data: profile } = await supabase
          .from('profiles')
          .select('last_login')
          .eq('id', session.user.id)
          .single();

        // Neue Nachrichten (Platzhalter)
        const newMessages = 0; // TODO: Implementiere Nachrichten-Count

        setStats({
          totalVehicles: vehiclesCount || 0,
          newMessages,
          lastLogin: profile?.last_login || 'Nie',
          activeListings: activeListingsCount || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        toast.error('Fehler beim Laden der Statistiken');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [supabase]);

  const statCards = [
    {
      name: 'Gesamte Fahrzeuge',
      value: stats.totalVehicles,
      icon: Car,
      description: 'Alle eingestellten Fahrzeuge',
    },
    {
      name: 'Neue Nachrichten',
      value: stats.newMessages,
      icon: MessageSquare,
      description: 'Ungelesene Nachrichten',
    },
    {
      name: 'Letzter Login',
      value: stats.lastLogin,
      icon: Clock,
      description: 'Zeitpunkt des letzten Logins',
    },
    {
      name: 'Aktive Listings',
      value: stats.activeListings,
      icon: TrendingUp,
      description: 'Veröffentlichte Fahrzeuge',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Willkommen im Admin-Bereich. Hier finden Sie einen Überblick über Ihre Aktivitäten.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
} 