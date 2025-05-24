import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/myposts", label: "My Posts" },
    { to: "/create", label: "Create Post" },
    { to: "/profile", label: "Profile" },
    { to: "/settings", label: "Settings" },
  ];

  return (
    <nav className="w-48 p-6 bg-black text-white h-screen shadow-lg">
      <h2 className="text-xl font-extrabold mb-8 text-red-600 tracking-wide">
        ContentHub
      </h2>
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          className={({ isActive }) =>
            `block mb-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-red-700 text-white font-semibold"
                : "hover:bg-red-900 text-red-400 hover:text-white"
            }`
          }
        >
          {l.label}
        </NavLink>
      ))}
    </nav>
  );
}