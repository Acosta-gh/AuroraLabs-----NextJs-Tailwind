// components/ui/PricingSkeletonCard.jsx

// Bloque gris animado — base de todos los skeletons
function ShimmerBlock({ className = "" }) {
    return (
        <div
            className={`bg-muted animate-pulse rounded-md ${className}`}
        />
    );
}

// Skeleton de una sola card de pricing
export function PricingSkeletonCard() {
    return (
        <div className="relative bg-background rounded-xl border border-border/50 overflow-hidden flex flex-col">

            {/* Zona superior: nombre, tagline, precio */}
            <div className="text-center pt-8 pb-6 px-8 border-b border-border/50 space-y-3">
                {/* Nombre del plan */}
                <ShimmerBlock className="h-6 w-32 mx-auto" />
                {/* Tagline */}
                <ShimmerBlock className="h-4 w-48 mx-auto" />
                {/* Precio grande */}
                <ShimmerBlock className="h-10 w-28 mx-auto mt-2" />
                {/* Precio mensual */}
                <ShimmerBlock className="h-3 w-36 mx-auto" />
            </div>

            {/* Zona de features */}
            <div className="px-8 py-6 space-y-3 flex-1">
                <ShimmerBlock className="h-4 w-full" />
                <ShimmerBlock className="h-4 w-5/6" />
                <ShimmerBlock className="h-4 w-full" />
                <ShimmerBlock className="h-4 w-4/6" />
                <ShimmerBlock className="h-4 w-full" />
            </div>

            {/* Zona de botones */}
            <div className="px-8 pb-8 space-y-3">
                <ShimmerBlock className="h-11 w-full rounded-lg" />
                <ShimmerBlock className="h-11 w-full rounded-lg" />
            </div>
        </div>
    );
}

// Grid de N skeletons — usalo así: <PricingSkeletonGrid count={3} />
export function PricingSkeletonGrid({ count = 3 }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <PricingSkeletonCard key={i} />
            ))}
        </>
    );
}