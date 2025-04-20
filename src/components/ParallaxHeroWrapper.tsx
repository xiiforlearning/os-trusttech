"use client";

import ParallaxHero from "./ParallaxHero";

interface ParallaxHeroWrapperProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export default function ParallaxHeroWrapper(props: ParallaxHeroWrapperProps) {
  return <ParallaxHero {...props} />;
} 