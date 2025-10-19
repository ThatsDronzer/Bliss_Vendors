'use client';

import { UnderMaintenance } from "@/components/under-maintenance"

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return <UnderMaintenance />
}
