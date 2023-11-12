export const ProfileError = ({ error = "" }: { error?: string }) => (
  <div className="border rounded-md">
    <div className="w-full h-[240px] rounded-md object-cover bg-slate-500" />
    <div className="flex flex-col md:flex-row justify-between items-center mx-10">
      <div className="w-[160px] h-[160px] border-4 border-background -mt-20 bg-slate-300 rounded-full" />
    </div>
    <div className="min-h-[100px] px-10 my-6">
      <h4>{error}</h4>
    </div>
  </div>
);
