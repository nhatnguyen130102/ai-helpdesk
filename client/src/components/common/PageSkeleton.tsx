import Skeleton from "./Skeleton";

export default function PageSkeleton() {
    return (
        <div className="space-y-6 p-6">

            {/* Header */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-72" />
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className="h-28 w-full"
                    />
                ))}
            </div>

            {/* Main content */}
            <Skeleton className="h-96 w-full" />
        </div>
    );
}