// import Navbar from "@/components/shared/Navbar";
// import React from "react";

// const page = () => {
//   return (
//     <>
//       <main className="bg-[#021E26] min-h-screen w-full py-40">
//         <Navbar />

//         <div
//           className=" w-[426px] h-[400px] rounded-3xl"
//           style={{
//             background:
//               " linear-gradient(180deg, rgba(178, 139, 179, 0.2) 0%, rgba(144, 168, 168, 0.2) 100%)",
//               border:"1px solid rgba(222, 244, 255, 1)",
//           }}
//         ></div>

//         <div className="w-[536.5px] h-[300px] "
//         style={{
//           background:"rgba(14, 5, 26, 1)",
//           border: "20px solid transparent",
//           borderImageSource: "linear-gradient(180deg, rgba(122, 68, 223, 0.5) 0%, rgba(122, 68, 223, 0) 75%, rgba(142, 46, 217, 0.5) 87.5%, #A218D4 100%)"

//         }}
//         ></div>
//       </main>
//     </>
//   );
// };

// export default page;

import CreatorNavbar from "@/components/creator/CreatorNavbar";
import React from "react";

const page = () => {
  return (
    <>
      <main
        className="min-h-screen w-full pt-5"
        style={{
          background: "rgba(2, 30, 38, 1)",
        }}
      >
        <CreatorNavbar />
      </main>
    </>
  );
};

export default page;
