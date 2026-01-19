// "use client";

// import { X } from "lucide-react";

// interface AuthModalProps {
//   onClose: () => void;
// }

// export default function AuthModal({ onClose }: AuthModalProps) {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 max-w-md w-full mx-4">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold text-white">Login</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-white"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition">
//           Login with GitHub
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { Github, Mail, X } from "lucide-react";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-[#0f0f0f] w-[400px] rounded-xl p-6 border border-gray-800 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold text-white mb-6 text-center">
          Configure with Github
        </h2>

        {/* OAuth Buttons */}
        <a
          href="/api/auth/github"
          className="flex items-center justify-center gap-3 w-full bg-white text-black py-2 rounded-lg font-medium hover:opacity-90"
        >
          <Github /> Continue with GitHub
        </a>

        
        <div className="flex items-center gap-2 my-5">
          <div className="h-px bg-gray-700 flex-1" />
          <span className="text-gray-400 text-sm">OR</span>
          <div className="h-px bg-gray-700 flex-1" />
        </div>

        {/* Email Login */}
        <form className="space-y-3">
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              className="w-full bg-black border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-green-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Password</label>
            <input
              type="password"
              className="w-full bg-black border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-green-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-black py-2 rounded-lg font-semibold hover:bg-green-400"
          >
            Login with Email
          </button>
        </form>
      </div>
    </div>
  );
}
