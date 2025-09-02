type RoadmapProps = {
  histories: AcademicHistoryType[];
};

export type AcademicHistoryType = {
  university: string;
  award: string;
  country: string;
  honours: string;
  start: number;
  end: number;
};

export default function Roadmap({ histories }: RoadmapProps) {
  return (
    <>
      <div className="relative border-2 border-dashed border-white w-4/5">
        {histories &&
          histories.length > 0 &&
          histories.map((history, index) => (
            <>
              <div
                className={`absolute w-6 h-6 border ring ring-white ring-offset-2 border-gap-2 bg-white rounded-full top-1/2 -translate-y-1/2`}
                style={{ left: `${(index / (histories.length - 1)) * 100}%` }}
              />
              <div
                className={`absolute flex flex-col items-center justify-center w-1/3 px-10 h-44 -translate-x-[45%] -translate-y-60 gap-4 shadow-lg shadow-black hover:shadow-xl transition ease-in-out duration-300 bg-neutral-900 border-rounded`}
                style={{ left: `${(index / (histories.length - 1)) * 100}%` }}
              >
                <p className="text-white text-center text-lg">
                  {history.award}
                </p>
                <div className="flex flex-col">
                  <p className="text-white text-center text-sm">
                    {history.university}
                  </p>
                  <p className="text-white text-center text-sm">
                    {history.country}
                  </p>
                </div>
              </div>
              <div
                className={`absolute w-[250px] -translate-x-[45%] translate-y-8`}
                style={{
                  left: `${(index / (histories.length - 1)) * 100}%`,
                }}
              >
                <p className="text-white text-center text-sm">
                  {history.start}
                </p>
              </div>
            </>
          ))}
      </div>
    </>
  );
}
