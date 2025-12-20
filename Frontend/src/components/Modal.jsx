import { motion as Motion, AnimatePresence } from "framer-motion";
import { ClosedCaptionIcon,  PlusIcon } from "lucide-react";
import React, { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  // Close modal on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <Motion.div
            className="fixed inset-0 bg-indigo-900 bg-opacity-40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal box */}
          <Motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="bg-white rounded-xl shadow-lg w-[55vw] p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {title || "Modal Title"}
                </h2>
                <button
                  onClick={onClose}
                  className="text-black bg-white p-1 text-xl absolute top-2 right-2 rounded-full font-bold"
                >
                  < PlusIcon className="rotate-45" />
                </button>
              </div>

              {/* Body */}
              <div className="text-gray-700">{children}</div>
            </div>
          </Motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
