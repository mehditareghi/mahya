"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Heart, Star, Moon, Music, Pause } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import first from "@/public/1.jpeg";
import second from "@/public/2.jpeg";
import third from "@/public/3.jpeg";
import fourth from "@/public/4.jpeg";
import fifth from "@/public/5.jpeg";
import sixth from "@/public/6.jpeg";
import { useRef } from "react";

export default function FantasyBirthdayPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Configure these dates for your wife
  const birthDate = new Date("1996-07-23"); // Change this to her actual birth date
  const nextBirthday = new Date("2025-07-23"); // Change this to her next birthday

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateAge = () => {
    const now = currentTime;
    const birth = birthDate;

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    let hours = now.getHours() - birth.getHours();
    let minutes = now.getMinutes() - birth.getMinutes();
    let seconds = now.getSeconds() - birth.getSeconds();

    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }
    if (hours < 0) {
      hours += 24;
      days--;
    }
    if (days < 0) {
      const daysInPrevMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        0,
      ).getDate();
      days += daysInPrevMonth;
      months--;
    }
    if (months < 0) {
      months += 12;
      years--;
    }

    return { years, months, days, hours, minutes, seconds };
  };

  const calculateCountdown = () => {
    const now = currentTime;
    const target = nextBirthday;
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const age = calculateAge();
  const countdown = calculateCountdown();

  const photos = [first, second, third, fourth, fifth, sixth];

  if (!hasMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <audio ref={audioRef} src="/birthday.mp3" loop />
      <div className="flex justify-center my-6 z-20 relative">
        <button
          onClick={toggleMusic}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-pink-600/80 hover:bg-pink-500 text-white font-semibold shadow-lg backdrop-blur-md transition-all duration-300"
        >
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5" />
              Pause Music
            </>
          ) : (
            <>
              <Music className="w-5 h-5" />
              Play Birthday Song
            </>
          )}
        </button>
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 animate-pulse">
          <Sparkles className="w-6 h-6 text-yellow-300" />
        </div>
        <div className="absolute top-32 right-20 animate-bounce">
          <Star className="w-4 h-4 text-pink-300" />
        </div>
        <div className="absolute bottom-20 left-32 animate-pulse">
          <Moon className="w-8 h-8 text-blue-300" />
        </div>
        <div className="absolute top-1/2 right-10 animate-bounce delay-1000">
          <Sparkles className="w-5 h-5 text-purple-300" />
        </div>
        <div className="absolute bottom-32 right-1/3 animate-pulse delay-500">
          <Star className="w-6 h-6 text-yellow-400" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            ✨ My Magical Mahya ✨
          </h1>
          <p className="text-xl text-purple-200 font-light">
            A celebration of Mahya’s light, love, and all the magic she brings
          </p>
        </div>

        {/* Age Display */}
        <Card className="mb-12 bg-gradient-to-r from-purple-800/50 to-pink-800/50 border-purple-400/30 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2">
                <Heart className="w-8 h-8 text-pink-400" />
                Mahya’s Enchanted Age
                <Heart className="w-8 h-8 text-pink-400" />
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
                <div className="bg-purple-700/50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-yellow-300">
                    {age.years}
                  </div>
                  <div className="text-sm text-purple-200">Years</div>
                </div>
                <div className="bg-purple-700/50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-pink-300">
                    {age.months}
                  </div>
                  <div className="text-sm text-purple-200">Months</div>
                </div>
                <div className="bg-purple-700/50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-300">
                    {age.days}
                  </div>
                  <div className="text-sm text-purple-200">Days</div>
                </div>
                <div className="bg-purple-700/50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-green-300">
                    {age.hours}
                  </div>
                  <div className="text-sm text-purple-200">Hours</div>
                </div>
                <div className="bg-purple-700/50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-orange-300">
                    {age.minutes}
                  </div>
                  <div className="text-sm text-purple-200">Minutes</div>
                </div>
                <div className="bg-purple-700/50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-red-300">
                    {age.seconds}
                  </div>
                  <div className="text-sm text-purple-200">Seconds</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Birthday Countdown */}
        <Card className="mb-12 bg-gradient-to-r from-blue-800/50 to-purple-800/50 border-blue-400/30 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2">
                <Sparkles className="w-8 h-8 text-yellow-400" />
                Countdown to Mahya’s Special Day
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-blue-700/50 rounded-lg p-6">
                  <div className="text-4xl font-bold text-yellow-300">
                    {countdown.days}
                  </div>
                  <div className="text-lg text-blue-200">Days</div>
                </div>
                <div className="bg-blue-700/50 rounded-lg p-6">
                  <div className="text-4xl font-bold text-pink-300">
                    {countdown.hours}
                  </div>
                  <div className="text-lg text-blue-200">Hours</div>
                </div>
                <div className="bg-blue-700/50 rounded-lg p-6">
                  <div className="text-4xl font-bold text-green-300">
                    {countdown.minutes}
                  </div>
                  <div className="text-lg text-blue-200">Minutes</div>
                </div>
                <div className="bg-blue-700/50 rounded-lg p-6">
                  <div className="text-4xl font-bold text-orange-300">
                    {countdown.seconds}
                  </div>
                  <div className="text-lg text-blue-200">Seconds</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Photo Gallery */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            ✨ Moments with Mahya ✨
          </h2>
          <p className="text-purple-200">
            Cherished memories from our journey together
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {photos.map((photo, index) => (
            <Card
              key={index}
              className="group overflow-hidden bg-gradient-to-br from-purple-800/30 to-pink-800/30 border-purple-400/20 backdrop-blur-sm hover:scale-105 transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={photo || "/placeholder.svg"}
                    alt={`Beautiful memory ${index + 1}`}
                    width={300}
                    height={400}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-2xl font-light text-purple-200 mb-4">
            {"Created with infinite love for Mahya, my forever magic ✨"}
          </p>
          <div className="flex justify-center gap-2">
            <Heart className="w-6 h-6 text-red-400 animate-pulse" />
            <Heart className="w-6 h-6 text-pink-400 animate-pulse delay-200" />
            <Heart className="w-6 h-6 text-red-400 animate-pulse delay-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
