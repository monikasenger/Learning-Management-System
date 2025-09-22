import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Menu,
  X,
  Home,
  LogIn,
  UserPlus,
  Users,
  BookOpen,
  User,
  GraduationCap,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Reusable NavLink with icon
  const NavItem = ({ to, icon: Icon, label, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-2 hover:bg-white/20 px-3 py-2 rounded-md transition-all duration-300"
    >
      <Icon size={18} /> {label}
    </Link>
  );

  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide flex items-center gap-2"
        >
          <GraduationCap size={28} /> LMS Portal
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-medium">
          <NavItem to="/" icon={Home} label="Home" />
          <NavItem to="/courses" icon={BookOpen} label="Courses" />

          {!user && (
            <>
              <NavItem to="/login" icon={LogIn} label="Login" />
              <NavItem to="/register" icon={UserPlus} label="Register" />
            </>
          )}

          {user?.role === "admin" && (
            <>
              <NavItem to="/admin" icon={LayoutDashboard} label="Dashboard" />
              <NavItem to="/admin/users" icon={Users} label="Manage Users" />
              <NavItem
                to="/admin/pending-courses"
                icon={BookOpen}
                label="Pending Courses"
              />
            </>
          )}

          {user?.role === "instructor" && (
            <>
             <NavItem
                to="/instructor"
                icon={LayoutDashboard}
                label="Dashboard"
              />
              <NavItem
                to="/instructor/courses"
                icon={BookOpen}
                label="My Courses"
              />
              <NavItem
                to="/instructor/students"
                icon={Users}
                label="Students"
              />
            </>
          )}

          {user?.role === "student" && (
            <>
             <NavItem
                to="/student"
                icon={LayoutDashboard}
                label="Dashboard"
              />
              <NavItem to="/student/profile" icon={User} label="My Profile" />
              <NavItem
                to="/student/my-courses"
                icon={BookOpen}
                label="My Learning"
              />
              
            </>
          )}
        </nav>

        {/* Right Side (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {user && (
            <span className="font-medium bg-white/20 px-3 py-1 rounded-md">
              {user.name} ({user.role})
            </span>
          )}
          {user && (
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition-all"
            >
              <LogOut size={18} /> Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded hover:bg-purple-800 transition-colors"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-purple-700 px-6 py-4 space-y-3 animate-fadeIn">
          <NavItem
            to="/"
            icon={Home}
            label="Home"
            onClick={() => setIsOpen(false)}
          />
          <NavItem
            to="/courses"
            icon={BookOpen}
            label="Courses"
            onClick={() => setIsOpen(false)}
          />

          {!user && (
            <>
              <NavItem
                to="/login"
                icon={LogIn}
                label="Login"
                onClick={() => setIsOpen(false)}
              />
              <NavItem
                to="/register"
                icon={UserPlus}
                label="Register"
                onClick={() => setIsOpen(false)}
              />
            </>
          )}

          {user?.role === "admin" && (
            <>
              <NavItem
                to="/admin"
                icon={LayoutDashboard}
                label="Dashboard"
                onClick={() => setIsOpen(false)}
              />
              <NavItem
                to="/admin/users"
                icon={Users}
                label="Manage Users"
                onClick={() => setIsOpen(false)}
              />
              <NavItem
                to="/admin/pending-courses"
                icon={BookOpen}
                label="Pending Courses"
                onClick={() => setIsOpen(false)}
              />
            </>
          )}

          {user?.role === "instructor" && (
            <>
              <NavItem
                to="/instructor/courses"
                icon={BookOpen}
                label="My Courses"
                onClick={() => setIsOpen(false)}
              />
              <NavItem
                to="/instructor/students"
                icon={Users}
                label="Students"
                onClick={() => setIsOpen(false)}
              />
            </>
          )}

          {user?.role === "student" && (
            <>
              <NavItem
                to="/student/profile"
                icon={User}
                label="My Profile"
                onClick={() => setIsOpen(false)}
              />
              <NavItem
                to="/student/my-courses"
                icon={BookOpen}
                label="My Learning"
                onClick={() => setIsOpen(false)}
              />
            </>
          )}

          {user && (
            <div className="mt-4 flex flex-col gap-2">
              <span className="font-medium bg-white/20 px-3 py-1 rounded-md">
                {user.name} ({user.role})
              </span>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition-all"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
