export default function Navbar() {
  return (
    <div className="flex justify-between px-64 py-9 bg-black text-white">
      <div>
        <p className="text-lg font-semibold">Steven&apos;s Resume</p>
      </div>
      <div className="flex flex-row gap-16">
        <p className="text-base font-semibold">Home</p>
        <p className="text-base font-semibold">Academic History</p>
        <p className="text-base font-semibold">Experience</p>
        <p className="text-base font-semibold">Past Projects</p>
      </div>
    </div>
  );
}
