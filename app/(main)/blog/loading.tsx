export default function Loading() {
    return (
      <div className="px-8 py-12 max-w-3xl mx-auto">
        <div className="h-8 w-32 bg-gray-100 rounded animate-pulse mb-10" />
        <div className="divide-y divide-gray-100">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="py-8 space-y-3">
              <div className="h-5 w-3/4 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
}