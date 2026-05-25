import { notFound } from "next/navigation";
import { TourViewer } from "../../components/TourViewer";
import { getSiteBySlug, heritageSites } from "../../lib/data";

export function generateStaticParams() {
  return heritageSites.map((site) => ({ slug: site.slug }));
}

export default async function TourPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = getSiteBySlug(slug);

  if (!site) {
    notFound();
  }

  return <TourViewer site={site} />;
}
