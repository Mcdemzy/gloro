import React from "react";
import loginBG from "@/assets/images/loginBG.png";
import loginMan from "@/assets/images/loginMan.png";
import Image from "next/image";

const LoginPage = () => {
  return (
    <>
    {/* The Login BG is the BG that covers the entire page, with this color too sha #020818 */}
      <main className="bg-[#020818] min-h-screen w-full px-[104px] py-8">
        {/* Main Login View */}
        <section className="bg-purple-600 w-full min-h-[400px] flex flex-col md:flex-row">
          {/* Left Hand Side Image */}
          <div className="max-w-[600px]">
            <Image src={loginMan} alt="Login Illustration" />
          </div>

          {/* Right Hand Side Login Form */}
          <section className="w-fit">
            <div className="mx-auto flex justify-center items-center bg-white rounded-2xl p-2">
              <button>Login</button>
              <button>Signup</button>
            </div>
            <p>Welcome Back</p>

            <form action="">
              <div>
                <label htmlFor="">Email or Username</label>
                <input type="text" placeholder="Enter your email or username" />
              </div>
            </form>
          </section>
        </section>
      </main>
    </>
  );
};

export default LoginPage;
