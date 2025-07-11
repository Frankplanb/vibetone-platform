"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, User, Mail, Lock, Music } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      alert("Login erfolgreich! (Demo)");
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      alert("Registrierung erfolgreich! (Demo)");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Music className="h-12 w-12 text-lime-500 mr-3" />
            <h1 className="text-4xl font-bold text-white">VIBETONE Account</h1>
          </div>
          <p className="text-zinc-400 text-lg">
            Verwalte deinen Account und deine Musik-Lizenzen
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full max-w-md mx-auto">
          <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
            <TabsTrigger value="login" className="data-[state=active]:bg-lime-500 data-[state=active]:text-black">
              Anmelden
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-lime-500 data-[state=active]:text-black">
              Registrieren
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <Card className="bg-zinc-900 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white text-center">Bei VIBETONE anmelden</CardTitle>
                <CardDescription className="text-zinc-400 text-center">
                  Melde dich an um deine gekauften Tracks und Lizenzen zu verwalten
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">E-Mail</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                      <Input
                        type="email"
                        placeholder="deine@email.com"
                        required
                        className="pl-10 bg-zinc-800 border-zinc-600 text-white placeholder-zinc-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Passwort</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        className="pl-10 pr-10 bg-zinc-800 border-zinc-600 text-white placeholder-zinc-400"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 text-zinc-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 text-zinc-400">
                      <input type="checkbox" className="rounded" />
                      <span>Angemeldet bleiben</span>
                    </label>
                    <Link href="/forgot-password" className="text-lime-500 hover:text-lime-400">
                      Passwort vergessen?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-lime-500 hover:bg-lime-600 text-black font-semibold h-12"
                  >
                    {isLoading ? "Wird angemeldet..." : "Anmelden"}
                  </Button>
                </form>

                <Separator className="my-6 bg-zinc-700" />

                <div className="space-y-3">
                  <Button variant="outline" className="w-full border-zinc-600 text-white hover:bg-zinc-800">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Mit Google anmelden
                  </Button>

                  <Button variant="outline" className="w-full border-zinc-600 text-white hover:bg-zinc-800">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Mit Facebook anmelden
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <Card className="bg-zinc-900 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white text-center">VIBETONE Account erstellen</CardTitle>
                <CardDescription className="text-zinc-400 text-center">
                  Erstelle einen Account um Musik zu kaufen und zu verwalten
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Vorname</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                        <Input
                          type="text"
                          placeholder="Max"
                          required
                          className="pl-10 bg-zinc-800 border-zinc-600 text-white placeholder-zinc-400"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Nachname</label>
                      <Input
                        type="text"
                        placeholder="Mustermann"
                        required
                        className="bg-zinc-800 border-zinc-600 text-white placeholder-zinc-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">E-Mail</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                      <Input
                        type="email"
                        placeholder="deine@email.com"
                        required
                        className="pl-10 bg-zinc-800 border-zinc-600 text-white placeholder-zinc-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Passwort</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        className="pl-10 pr-10 bg-zinc-800 border-zinc-600 text-white placeholder-zinc-400"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 text-zinc-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-zinc-500">
                      Mindestens 8 Zeichen mit Buchstaben und Zahlen
                    </p>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-start space-x-3 text-sm">
                      <input type="checkbox" required className="mt-1 rounded" />
                      <span className="text-zinc-400">
                        Ich akzeptiere die{" "}
                        <Link href="/agb" className="text-lime-500 hover:text-lime-400">
                          Allgemeinen Geschäftsbedingungen
                        </Link>{" "}
                        und{" "}
                        <Link href="/privacy" className="text-lime-500 hover:text-lime-400">
                          Datenschutzbestimmungen
                        </Link>
                      </span>
                    </label>

                    <label className="flex items-start space-x-3 text-sm">
                      <input type="checkbox" className="mt-1 rounded" />
                      <span className="text-zinc-400">
                        Ich möchte Newsletter und Updates zu neuen Tracks erhalten
                      </span>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-lime-500 hover:bg-lime-600 text-black font-semibold h-12"
                  >
                    {isLoading ? "Account wird erstellt..." : "Account erstellen"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-lime-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="h-6 w-6 text-black" />
              </div>
              <h3 className="font-semibold text-white mb-2">Sofortiger Download</h3>
              <p className="text-zinc-400 text-sm">
                Nach dem Kauf stehen deine Tracks sofort zum Download bereit
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-lime-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-6 w-6 text-black" />
              </div>
              <h3 className="font-semibold text-white mb-2">Sichere Bezahlung</h3>
              <p className="text-zinc-400 text-sm">
                Alle Transaktionen sind SSL-verschlüsselt und sicher
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-lime-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-6 w-6 text-black" />
              </div>
              <h3 className="font-semibold text-white mb-2">Persönliche Bibliothek</h3>
              <p className="text-zinc-400 text-sm">
                Verwalte alle deine Lizenzen und Downloads an einem Ort
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
