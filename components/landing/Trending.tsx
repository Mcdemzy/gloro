import Image from "next/image";
import playStationImg from "@/assets/images/PlayStation.jpg";
const Trending = () => {
  return (
    <>
      <main className="w-full min-h-40">
        <h3 className="mb-10 orbitron">Trending Tournaments</h3>

        <section className="flex gap-8 overflow-x-auto pb-4">
          <div className="bg-[#00000080] border border-[#CBE1EE80] w-fit p-4 rounded-xl flex gap-4 justify-center">
            <div className="border border-[#87A1A2] rounded-2xl w-fit">
              <Image
                src={playStationImg}
                width={150}
                height={150}
                alt="playStationImg"
                className="rounded-2xl"
              />
            </div>
            <div>
              <h4>
                FIFA Global Cup Registration <br /> Open
              </h4>
              <p className="text-[14px]">20 Nov 2024</p>
              <button className="bg-[#020818] text-white px-6 py-2.5 border border-[#1901CA] rounded-3xl">
                Register Now
              </button>
            </div>
          </div>
          <div className="bg-[#00000080] border border-[#CBE1EE80] w-fit p-4 rounded-xl flex gap-4 justify-center">
            <div className="border border-[#87A1A2] rounded-2xl w-fit">
              <Image
                src={playStationImg}
                width={150}
                height={150}
                alt="playStationImg"
                className="rounded-2xl"
              />
            </div>
            <div>
              <h4>
                FIFA Global Cup Registration <br /> Open
              </h4>
              <p className="text-[14px]">20 Nov 2024</p>
              <button className="bg-[#020818] text-white px-6 py-2.5 border border-[#1901CA] rounded-3xl">
                Register Now
              </button>
            </div>
          </div>
          <div className="bg-[#00000080] border border-[#CBE1EE80] w-fit p-4 rounded-xl flex gap-4 justify-center">
            <div className="border border-[#87A1A2] rounded-2xl w-fit">
              <Image
                src={playStationImg}
                width={150}
                height={150}
                alt="playStationImg"
                className="rounded-2xl"
              />
            </div>
            <div>
              <h4>
                FIFA Global Cup Registration <br /> Open
              </h4>
              <p className="text-[14px]">20 Nov 2024</p>
              <button className="bg-[#020818] text-white px-6 py-2.5 border border-[#1901CA] rounded-3xl">
                Register Now
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Trending;
