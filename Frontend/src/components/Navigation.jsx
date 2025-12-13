import { Layout, Users, Building2, Calendar, Settings, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion as Motion } from "framer-motion";

const Navigation = ({isOpen, setIsOpen}) => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const pages = [
    { id: "dashboard", name: "Dashboard", icon: Layout },
    { id: "students", name: "Students", icon: Users },
    { id: "rooms", name: "Rooms", icon: Building2 },
    { id: "exams", name: "Exams", icon: Calendar },
    { id: "seating", name: "Seating Plan", icon: Settings },
  ];

  return (
    <div className="flex">

      {/* Sidebar */}
      <Motion.aside
        animate={{ width: isOpen ? 240 : 75 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="h-screen bg-white border-r border-black/20 shadow-lg fixed left-0 top-0 z-40"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-slate-400">
          <div className="flex items-center space-x-2 overflow-hidden">
            {isOpen ? <Calendar className="w-7 h-7 text-indigo-600" /> : null}
            {isOpen && (
              <Motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg font-bold text-indigo-600 whitespace-nowrap"
              >
                Exam Planner
              </Motion.span>
            )}
          </div>

          {/* Toggle Button */}
          <Motion.button
            animate={{ rotate: isOpen ? 0 : 180 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => {setIsOpen(!isOpen); e.stopPropagation()}}
            className="p-2 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition bg-indigo-600"
          >
            <Menu className="w-5 h-5" />
          </Motion.button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 py-4 space-y-1">
          {pages.map((page, index) => {
            const Icon = page.icon;
            const isActive = currentPage === page.id;

            return (
              <Motion.div
                key={page.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                <Link
                  to={page.id === "dashboard" ? "/" : `/${page.id}`}
                  onClick={() => setCurrentPage(page.id)}
                  className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all duration-300
                    ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-slate-700 hover:bg-indigo-100 hover:text-indigo-700"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />

                  {isOpen && (
                    <Motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="ml-3 text-sm font-medium"
                    >
                      {page.name}
                    </Motion.span>
                  )}
                </Link>
              </Motion.div>
            );
          })}
        </div>
      </Motion.aside>

      {/* Content Area (moves with sidebar) */}
      {/* <Motion.div
        animate={{ marginLeft: isOpen ? 240 : 75 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="flex-1 p-8 min-h-screen"
      >
        <h1 className="text-3xl font-semibold text-slate-800">
          Your Content Here
        </h1>
      </Motion.div> */}
    </div>
  );
};

export default Navigation;
