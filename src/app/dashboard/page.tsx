"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Download,
  Music,
  CreditCard,
  Settings,
  Calendar,
  FileText,
  Play,
  Heart,
  ShoppingBag,
  Award,
  BarChart3
} from "lucide-react";

export default function DashboardPage() {
  const [user] = useState({
    name: "Max Mustermann",
    email: "max@example.com",
    memberSince: "März 2024",
    avatar: "",
    plan: "Pro"
  });

  const [purchasedTracks] = useState([
    {
      id: 1,
      title: "Stomper Snooper",
      artist: "Harv Self",
      purchaseDate: "15.06.2025",
      licenseType: "Standard",
      price: 29.00,
      downloaded: true,
      genre: "Deep House"
    },
    {
      id: 2,
      title: "The Piano Intro",
      artist: "Harv Self",
      purchaseDate: "12.06.2025",
      licenseType: "Extended",
      price: 49.00,
      downloaded: false,
      genre: "Jazz"
    },
    {
      id: 3,
      title: "Ocean Depths",
      artist: "Deep Vibes",
      purchaseDate: "10.06.2025",
      licenseType: "Standard",
      price: 29.00,
      downloaded: true,
      genre: "Deep House"
    }
  ]);

  const [favorites] = useState([
    {
      id: 4,
      title: "Midnight Drive",
      artist: "Neon Nights",
      genre: "Deep House",
      price: 24.99
    },
    {
      id: 5,
      title: "Electric Storm",
      artist: "Thunder Beats",
      genre: "Elektro House",
      price: 22.99
    }
  ]);

  const stats = {
    totalTracks: purchasedTracks.length,
    totalSpent: purchasedTracks.reduce((sum, track) => sum + track.price, 0),
    favoriteGenre: "Deep House",
    downloadsThisMonth: 5
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-lime-500 text-black text-xl font-bold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Willkommen zurück, {user.name.split(' ')[0]}!
              </h1>
              <p className="text-zinc-400">
                Mitglied seit {user.memberSince} • {user.plan} Plan
              </p>
            </div>
          </div>
          <Button className="bg-lime-500 hover:bg-lime-600 text-black">
            <Settings className="h-4 w-4 mr-2" />
            Account verwalten
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-zinc-900 border-zinc-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Gekaufte Tracks</p>
                  <p className="text-3xl font-bold text-white">{stats.totalTracks}</p>
                </div>
                <Music className="h-8 w-8 text-lime-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Ausgegeben</p>
                  <p className="text-3xl font-bold text-white">€{stats.totalSpent}</p>
                </div>
                <CreditCard className="h-8 w-8 text-lime-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Lieblings-Genre</p>
                  <p className="text-xl font-bold text-white">{stats.favoriteGenre}</p>
                </div>
                <Award className="h-8 w-8 text-lime-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Downloads</p>
                  <p className="text-3xl font-bold text-white">{stats.downloadsThisMonth}</p>
                  <p className="text-xs text-zinc-500">Diesen Monat</p>
                </div>
                <Download className="h-8 w-8 text-lime-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="tracks" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-zinc-800 mb-8">
            <TabsTrigger value="tracks" className="data-[state=active]:bg-lime-500 data-[state=active]:text-black">
              <Music className="h-4 w-4 mr-2" />
              Meine Tracks
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-lime-500 data-[state=active]:text-black">
              <Heart className="h-4 w-4 mr-2" />
              Favoriten
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-lime-500 data-[state=active]:text-black">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Bestellungen
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-lime-500 data-[state=active]:text-black">
              <BarChart3 className="h-4 w-4 mr-2" />
              Statistiken
            </TabsTrigger>
          </TabsList>

          {/* Purchased Tracks */}
          <TabsContent value="tracks">
            <Card className="bg-zinc-900 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Meine Tracks</CardTitle>
                <CardDescription className="text-zinc-400">
                  Alle deine gekauften Tracks und Lizenzen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchasedTracks.map((track) => (
                    <div key={track.id} className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-lg flex items-center justify-center">
                          <Play className="h-5 w-5 text-lime-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{track.title}</h3>
                          <p className="text-sm text-zinc-400">{track.artist}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {track.genre}
                            </Badge>
                            <Badge
                              variant={track.licenseType === 'Extended' ? 'default' : 'secondary'}
                              className={track.licenseType === 'Extended' ? 'bg-lime-500 text-black' : ''}
                            >
                              {track.licenseType}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-zinc-400">Gekauft am</p>
                          <p className="text-sm text-white">{track.purchaseDate}</p>
                          <p className="text-sm font-semibold text-lime-400">€{track.price}</p>
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="border-zinc-600">
                            <Play className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button
                            size="sm"
                            className={`${track.downloaded ? 'bg-green-600 hover:bg-green-700' : 'bg-lime-500 hover:bg-lime-600'} text-black`}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            {track.downloaded ? 'Erneut laden' : 'Download'}
                          </Button>
                          <Button size="sm" variant="outline" className="border-zinc-600">
                            <FileText className="h-4 w-4 mr-1" />
                            Lizenz
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites */}
          <TabsContent value="favorites">
            <Card className="bg-zinc-900 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Favoriten</CardTitle>
                <CardDescription className="text-zinc-400">
                  Deine gespeicherten Lieblings-Tracks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {favorites.map((track) => (
                    <div key={track.id} className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-lg flex items-center justify-center">
                          <Play className="h-5 w-5 text-lime-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{track.title}</h3>
                          <p className="text-sm text-zinc-400">{track.artist}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {track.genre}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <p className="text-lg font-semibold text-lime-400">€{track.price}</p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="border-zinc-600">
                            <Play className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm" className="bg-lime-500 hover:bg-lime-600 text-black">
                            Kaufen
                          </Button>
                          <Button size="sm" variant="outline" className="border-zinc-600 text-red-400 hover:text-red-300">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders */}
          <TabsContent value="orders">
            <Card className="bg-zinc-900 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Bestellhistorie</CardTitle>
                <CardDescription className="text-zinc-400">
                  Alle deine Einkäufe und Transaktionen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchasedTracks.map((track, index) => (
                    <div key={track.id} className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-lime-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                          #{purchasedTracks.length - index}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{track.title}</h3>
                          <p className="text-sm text-zinc-400">
                            {track.purchaseDate} • {track.licenseType} Lizenz
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Badge className="bg-green-600">Abgeschlossen</Badge>
                        <p className="text-lg font-semibold text-white">€{track.price}</p>
                        <Button size="sm" variant="outline" className="border-zinc-600">
                          <FileText className="h-4 w-4 mr-1" />
                          Rechnung
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-zinc-900 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white">Musik-Geschmack</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Deine häufigsten Genres
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white">Deep House</span>
                      <span className="text-zinc-400">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white">Jazz</span>
                      <span className="text-zinc-400">25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white">Elektro House</span>
                      <span className="text-zinc-400">15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white">Lizenz-Verteilung</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Standard vs Extended Lizenzen
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white">Standard Lizenzen</span>
                      <span className="text-zinc-400">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white">Extended Lizenzen</span>
                      <span className="text-zinc-400">33%</span>
                    </div>
                    <Progress value={33} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
