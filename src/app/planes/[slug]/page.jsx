import PlanDetailClient from "./PlanDetailClient";

export const dynamicParams = false;

export function generateStaticParams() {
  console.log("[planes/[slug]/page.jsx] generateStaticParams execution started");
  const params = [
    { slug: "presencia" },
    { slug: "empresa" },
    { slug: "eCatalog" },
    { slug: "ecommerce" },
    { slug: "custom" }
  ];
  console.log("[planes/[slug]/page.jsx] generateStaticParams generated params:", params);
  return params;
}

export default function Page() {
    console.log("[planes/[slug]/page.jsx] Server Page Component rendering");
    return <PlanDetailClient />;
}


