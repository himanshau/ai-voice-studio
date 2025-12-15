// app/(auth)/layout.tsx
import type { ReactNode } from "react";
import { Providers } from "~/components/providers";
import Link from "next/link";
import { Sparkles, Mic, Zap, Target } from "lucide-react";
import { db } from "~/server/db";
import { unstable_cache } from "next/cache";

// ========== CACHED STATS FUNCTION ==========
// Cache the stats query for better performance
const getStats = unstable_cache(
    async () => {
        try {
            const [userCount, voiceCount] = await Promise.all([
                db.user.count(),
                db.audioProject.count(),
            ]);

            return {
                userCount,
                voiceCount,
                rating: 4.6, // You can make this dynamic too but dont do this other wise users are going to be very frustate by any then they down the rating
            };
        } catch (error) {
            console.error("Failed to fetch stats:", error);
            return {
                userCount: 0,
                voiceCount: 0,
                rating: 4.6,
            };
        }
    },
    ["auth-layout-stats"], // Cache key
    {
        revalidate: 60, // Revalidate every 60 seconds
        tags: ["stats"], // Tag for manual revalidation
    }
);

// ========== LAYOUT COMPONENT ==========
export default async function AuthLayout({ children }: { children: ReactNode }) {
    // Fetch cached stats
    const stats = await getStats();

    return (
        <Providers>
            <div className="auth-page flex min-h-screen">
                {/* LEFT SIDE - BRANDING */}
                <div className="relative hidden overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-zinc-900 lg:flex lg:w-1/2">
                    {/* Grid Background Pattern */}
                    <div className="absolute inset-0 bg-[size:30px_30px] bg-grid-white/[0.03]" />

                    {/* Main Content Container */}
                    <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
                        {/* Logo Section */}
                        <Link
                            href="/"
                            className="group mb-12 flex cursor-pointer items-center gap-3"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-600/20 backdrop-blur-sm transition-all group-hover:border-violet-500/50 group-hover:bg-violet-600/30">
                                <Sparkles className="h-7 w-7 text-violet-400" />
                            </div>
                            <span className="text-2xl font-bold text-gray-100">
                                AI Voice Studio
                            </span>
                        </Link>

                        {/* Hero Content */}
                        <div className="max-w-md">
                            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-100 xl:text-5xl">
                                Transform Text into{" "}
                                <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                                    Natural Speech
                                </span>
                            </h1>
                            <p className="mb-8 text-lg leading-relaxed text-gray-400">
                                Join thousands of creators using advanced AI to generate
                                realistic, natural-sounding voices in seconds.
                            </p>

                            {/* Feature List */}
                            <FeatureList />
                        </div>

                        {/* Bottom Stats - Dynamic! */}
                        <StatsDisplay stats={stats} />
                    </div>

                    {/* Decorative Blur Elements */}
                    <DecorativeElements />
                </div>

                {/* RIGHT SIDE - AUTH FORM */}
                <div className="flex flex-1 flex-col justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        {/* Mobile Logo */}
                        <MobileLogo />

                        {/* Auth Form Container */}
                        <div>{children}</div>

                        {/* Footer Link */}
                        <p className="mt-6 text-center text-sm text-gray-500">
                            Back to{" "}
                            <Link
                                href="/"
                                className="cursor-pointer font-medium text-violet-400 transition-colors hover:text-violet-300">
                                homepage
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </Providers>
    );
}

// ========== SUB-COMPONENTS ==========

function FeatureList() {
    const features = [
        {
            icon: Mic,
            text: "AI Voice Cloning",
            color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
        },
        {
            icon: Zap,
            text: "Lightning Fast Processing",
            color: "bg-amber-500/10 border-amber-500/30 text-amber-400",
        },
        {
            icon: Target,
            text: "Professional Quality Audio",
            color: "bg-pink-500/10 border-pink-500/30 text-pink-400",
        },
    ];

    return (
        <div className="space-y-4">
            {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg border backdrop-blur-sm ${feature.color}`}
                    >
                        <feature.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-gray-300">{feature.text}</span>
                </div>
            ))}
        </div>
    );
}

interface StatsDisplayProps {
    stats: {
        userCount: number;
        voiceCount: number;
        rating: number;
    };
}

function StatsDisplay({ stats }: StatsDisplayProps) {
    const statsConfig = [
        {
            value: stats.voiceCount,
            label: "Voices Generated",
            color: "text-gray-100",
            format: (v: number) => formatNumber(v),
        },
        {
            value: stats.userCount,
            label: "Happy Users",
            color: "text-gray-100",
            format: (v: number) => formatNumber(v),
        },
        {
            value: stats.rating,
            label: "Rating",
            color: "text-amber-400",
            format: (v: number) => `${v}★`,
        },
    ];

    return (
        <div className="mt-16 grid grid-cols-3 gap-8">
            {statsConfig.map((stat, index) => (
                <div key={index} className="text-center">
                    <div className={`text-2xl font-bold tabular-nums ${stat.color}`}>
                        {stat.format(stat.value)}
                    </div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
            ))}
        </div>
    );
}

function DecorativeElements() {
    return (
        <>
            <div className="absolute right-20 top-20 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />
            <div className="absolute bottom-20 right-32 h-24 w-24 rounded-full bg-pink-500/10 blur-2xl" />
            <div className="absolute right-10 top-1/2 h-16 w-16 rounded-full bg-indigo-500/10 blur-xl" />
        </>
    );
}

function MobileLogo() {
    return (
        <div className="mb-8 text-center lg:hidden">
            <Link
                href="/"
                className="inline-flex cursor-pointer items-center gap-2"
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-500/25">
                    <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-xl font-bold text-transparent">
                    AI Voice Studio
                </span>
            </Link>
        </div>
    );
}

// ========== UTILITY FUNCTIONS ==========

function formatNumber(num: number): string {
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
}