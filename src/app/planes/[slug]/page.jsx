import PlanDetailClient from "./PlanDetailClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { slug: "presencia" },
    { slug: "empresa" },
    { slug: "eCatalog" },
    { slug: "ecommerce" },
    { slug: "custom" }
  ];
}

export default function Page() {
    return <PlanDetailClient />;
}

