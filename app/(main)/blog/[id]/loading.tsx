export default function Loading() {
    return (
      <div className="px-8 py-12 max-w-2xl mx-auto">
        <div className="space-y-4 mb-10">
          <div className="h-10 w-3/4 bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
        </div>
        <div className="h-px bg-gray-100 mb-10" />
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-4 w-full bg-gray-100 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    );
}