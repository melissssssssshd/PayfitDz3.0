export default function RolesLoading() {
  return (
    <div className="min-h-screen bg-[#F8FBF9] p-4 lg:p-6">
      <div className="mb-6">
        <div className="mb-2 h-8 w-64 animate-pulse rounded bg-[#E0EDE5]" />
        <div className="h-4 w-96 animate-pulse rounded bg-[#E0EDE5]" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-lg bg-white p-4" />
          ))}
        </div>
        <div className="h-96 animate-pulse rounded-lg bg-white" />
      </div>
    </div>
  )
}
