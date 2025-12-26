import LoginBG from "@/assets/images/loginBG.png";
import LoginMan from "@/assets/images/loginMan.png";
import { LogIn, UserRoundPlus } from "lucide-react";

const SignupPage = () => {
  return (
    <main
      className="w-full min-h-screen px-26 py-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${LoginBG.src})`,
      }}
    >
      <article className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <section
          className="h-full min-h-screen bg-contain bg-left bg-no-repeat"
          style={{
            backgroundImage: `url(${LoginMan.src})`,
          }}
        >
          <h1>Gloro</h1>
          <h2>Welcome to Gloro Gaming platform</h2>

          <p>
            This is where you can sign in and sign up, to get more information
            and participate in upcoming Tournament{" "}
          </p>
        </section>

        {/* Right Section */}
        <section>
          {/* Login & Signup Toggler section */}
          <div>
            <div>
              <button>
                <LogIn />
                Login
              </button>
              <button>
                <UserRoundPlus />
                Sign up
              </button>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
};

export default SignupPage;
