import Image from "next/image";
import comp1 from "@/assets/images/comp1.png";

const LatestCompetitions = () => {
  return (
    <>
      <main>
        <div className="orbitron flex justify-between">
          <h3>Latest Competitions</h3>
          <p>See all</p>
        </div>
        <section className="flex gap-x-18 justify-center flex-wrap">
          <div className="border border-[#455872] w-fit">
            <div className="">
              <Image
                src={comp1}
                width={450}
                height={300}
                alt="comp1"
                className="rounded-b-3xl"
              />
            </div>
            <div className="p-4">
              <h2 className="orbitron">FIFA Global Cup</h2>
              <p>20 Nov 2024</p>
              <p>PGMC Gamers Competition</p>
              <p>PUBG • CODM • Freefire</p>
            </div>
            <button>Registration Open</button>
            <button>Register Now</button>
          </div>
          <div className="border border-[#455872] w-fit">
            <div className="">
              <Image
                src={comp1}
                width={450}
                height={300}
                alt="comp1"
                className="rounded-b-3xl"
              />
            </div>
            <div className="p-4">
              <h2 className="orbitron">FIFA Global Cup</h2>
              <p>20 Nov 2024</p>
              <p>PGMC Gamers Competition</p>
              <p>PUBG • CODM • Freefire</p>
            </div>
            <button>Registration Open</button>
            <button>Register Now</button>
          </div>
          <div className="border border-[#455872] w-fit">
            <div className="">
              <Image
                src={comp1}
                width={450}
                height={300}
                alt="comp1"
                className="rounded-b-3xl"
              />
            </div>
            <div className="p-4">
              <h2 className="orbitron">FIFA Global Cup</h2>
              <p>20 Nov 2024</p>
              <p>PGMC Gamers Competition</p>
              <p>PUBG • CODM • Freefire</p>
            </div>
            <button>Registration Open</button>
            <button>Register Now</button>
          </div>
        </section>
      </main>
    </>
  );
};

export default LatestCompetitions;
