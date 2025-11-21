import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Leaf,
  Sprout,
  Tractor,
  CloudRain,
  BarChart3,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Users,
  TrendingUp,
  Zap,
} from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const ACCENT = "#C1E2BE"; // soft green accent

  const stats = [
    { number: "25K+", label: "Farmers", icon: <Users className="w-5 h-5" /> },
    { number: "1M+", label: "Acres", icon: <Leaf className="w-5 h-5" /> },
    { number: "30%", label: "Yield ↑", icon: <TrendingUp className="w-5 h-5" /> },
    { number: "50%", label: "Water saved", icon: <CloudRain className="w-5 h-5" /> },
  ];

  const features = [
    {
      icon: <Sprout className="h-6 w-6 text-green-600" />,
      title: "Crop Monitoring",
      description: "AI image analysis for plant health & alerts.",
    },
    {
      icon: <CloudRain className="h-6 w-6 text-sky-500" />,
      title: "Irrigation Insights",
      description: "Weather-based watering guidance.",
    },
    {
      icon: <Tractor className="h-6 w-6 text-orange-500" />,
      title: "Resource Tracking",
      description: "Manage equipment & maintenance schedules.",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-violet-500" />,
      title: "Yield Analytics",
      description: "Forecasts and performance insights.",
    },
    {
      icon: <Leaf className="h-6 w-6 text-emerald-500" />,
      title: "Sustainable Tips",
      description: "Eco-friendly practice recommendations.",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Create Farm Profile",
      desc: "Add land, crops, and preferences to personalize insights.",
      icon: <Leaf className="w-5 h-5" />,
    },
    {
      step: "02",
      title: "Connect Devices",
      desc: "Add sensors and devices for live data (optional).",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      step: "03",
      title: "Get Insights",
      desc: "Actionable recommendations to improve yield & efficiency.",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      step: "04",
      title: "Optimize & Scale",
      desc: "Implement changes, track impact, and grow sustainably.",
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 px-4 py-6 sm:px-6 md:px-8 max-w-screen-sm mx-auto">
      {/* HERO - compact for mobile */}
      <section
        aria-label="Hero"
        className="relative bg-white rounded-2xl p-5 shadow-sm"
      >
        <div className="flex items-start gap-3">
          <div
            className="flex-shrink-0 rounded-xl p-3"
            style={{ backgroundColor: "#eef8f0" }}
          >
            <Leaf className="w-8 h-8 text-green-700" />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-semibold leading-tight">
              Welcome to <span className="text-green-700">FoodFlow</span>
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Modern, lightweight farm management — practical AI insights,
              resource optimization, and sustainability-first guidance.
            </p>

            <div className="mt-4 flex gap-3">
              <Button
                size="md"
                onClick={onComplete}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm"
                style={{ backgroundColor: ACCENT, color: "#05301a" }}
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                size="md"
                className="px-3 py-2 text-sm border-slate-200"
              >
                Learn
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 text-sm">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1"
            style={{ backgroundColor: "#f5fdf5" }}
          >
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-slate-700">Trusted by 25,000+ farmers</span>
          </div>
          <Badge
            variant="secondary"
            className="ml-auto text-xs bg-white border border-slate-100"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Sustainable Farming
          </Badge>
        </div>
      </section>

      {/* STATS - compact grid */}
      <section
        aria-label="Quick stats"
        className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {stats.map((s, i) => (
          <Card
            key={i}
            className="p-3 flex flex-col items-start gap-2 rounded-xl shadow-sm bg-white"
          >
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-md bg-green-50">
                {s.icon}
              </div>
              <div>
                <div className="text-sm font-semibold">{s.number}</div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
            </div>
          </Card>
        ))}
      </section>

      {/* FEATURES - horizontal scroll for thumb navigation */}
      <section aria-label="Features" className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Key features</h2>
          <span className="text-xs text-slate-500">Swipe →</span>
        </div>

        <div className="mt-3 -ml-4 overflow-x-auto pb-2">
          <div className="flex gap-3 px-4">
            {features.map((f, idx) => (
              <article
                key={idx}
                className="min-w-[68%] sm:min-w-[45%] md:min-w-[22%] bg-white rounded-2xl p-4 shadow-sm"
                role="article"
                aria-label={f.title}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: "#f0fbef" }}>
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{f.title}</h3>
                    <p className="mt-1 text-xs text-slate-500">{f.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - vertical steps with subtle connectors */}
      <section aria-label="How it works" className="mt-6">
        <h2 className="text-lg font-semibold">How it works</h2>
        <div className="mt-3 space-y-3">
          {steps.map((st, i) => (
            <div
              key={i}
              className="flex items-start gap-3 bg-white rounded-xl p-3 shadow-sm"
            >
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold"
                  style={{ backgroundColor: "#eef9ee", color: "#1b4f2f" }}
                >
                  {st.step}
                </div>
                {i !== steps.length - 1 && (
                  <div className="flex-1 w-px bg-green-100 mt-2" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded" style={{ backgroundColor: "#f6fdf6" }}>
                    {st.icon}
                  </div>
                  <h3 className="text-sm font-semibold">{st.title}</h3>
                </div>
                <p className="mt-1 text-xs text-slate-500">{st.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA CARD */}
      <section aria-label="CTA" className="mt-6 pb-24">
        <Card className="p-4 rounded-2xl shadow-md bg-gradient-to-r from-white to-green-50/30">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1">
              <h3 className="text-base font-semibold">Ready to transform your farm?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Start with simple steps — profile, devices (optional), and your first insights.
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={onComplete}
                className="rounded-lg px-4 py-2 text-sm"
                style={{ backgroundColor: ACCENT, color: "#05301a" }}
              >
                Create account
              </Button>
              <Button variant="outline" className="rounded-lg px-3 py-2 text-sm">
                Contact
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Sticky bottom helper (mobile friendly) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] sm:w-[580px]">
        <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <Leaf className="w-5 h-5 text-green-600" />
            <div>
              <div className="text-xs font-semibold">FarmSmart</div>
              <div className="text-[11px] text-slate-500">Sustainable farming made simple</div>
            </div>
          </div>

          <Button
            onClick={onComplete}
            className="px-4 py-2 text-sm rounded-md"
            style={{ backgroundColor: "#084b2d", color: "white" }}
          >
            Get started
          </Button>
        </div>
      </div>
    </main>
  );
}
