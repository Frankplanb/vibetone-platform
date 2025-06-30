"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Heart, ShoppingCart, Menu, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ShoppingCartComponent, { useCart } from "@/components/ShoppingCart";
import { useFavorites } from "@/components/FavoritesContext";

export default function Header() {
  const { getItemCount } = useCart();
  const { getFavoritesCount } = useFavorites();

  const genres = [
    { name: "Deep House", href: "/genres/deep-house" },
    { name: "Elektro House", href: "/genres/elektro-house" },
    { name: "Pop", href: "/genres/pop" },
    { name: "Jazz", href: "/genres/jazz" },
    { name: "Ambiente", href: "/genres/ambiente" },
    { name: "Neu", href: "/genres/neu" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-white">VIBETONE</span>
            </div>
            <span className="text-sm text-zinc-400 hidden sm:block">More than sound - it's a vibe.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/music" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Alle Musik
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Genres</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {genres.map((genre) => (
                        <li key={genre.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={genre.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{genre.name}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/licenses" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Lizenzen
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-2 flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Tracks suchen..."
                className="pl-10 bg-zinc-900 border-zinc-700 text-white placeholder-zinc-400"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/favorites">
              <Button variant="ghost" size="sm" className="relative">
                <Heart className="h-5 w-5" />
                {getFavoritesCount() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-yellow-500 text-black">
                    {getFavoritesCount()}
                  </Badge>
                )}
              </Button>
            </Link>

            <ShoppingCartComponent />

            <Link href="/account">
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-zinc-950 border-zinc-800">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link href="/music" className="text-lg font-medium hover:text-yellow-500 transition-colors">
                    Alle Musik
                  </Link>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Genres</h3>
                    {genres.map((genre) => (
                      <Link
                        key={genre.name}
                        href={genre.href}
                        className="block text-sm hover:text-yellow-500 transition-colors"
                      >
                        {genre.name}
                      </Link>
                    ))}
                  </div>
                  <Link href="/licenses" className="text-lg font-medium hover:text-yellow-500 transition-colors">
                    Lizenzen
                  </Link>
                  <Link href="/account" className="text-lg font-medium hover:text-yellow-500 transition-colors">
                    Mein Account
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
