"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthModal from "@/auth/login/AuthModal";
import CustomCursor from "@/components/CustomCursor";

export default function ClientLayout({ children }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("login");

  const openModal = (tab) => {
    setModalTab(tab);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const handleOpenAuthModal = (event) => {
      const requestedTab = event?.detail?.tab;
      openModal(requestedTab === "signup" ? "signup" : "login");
    };

    window.addEventListener("open-auth-modal", handleOpenAuthModal);

    return () => {
      window.removeEventListener("open-auth-modal", handleOpenAuthModal);
    };
  }, []);

  return (
    <>
      <CustomCursor />

      {/* ✅ Global Navbar */}
      <Navbar openModal={openModal} />

      {/* ✅ Page Content */}
      {children}

      {/* ✅ Global Footer */}
      <Footer />

      {/* ✅ Global Modal */}
      <AuthModal
        isOpen={modalOpen}
        onClose={closeModal}
        initialTab={modalTab}
      />
    </>
  );
}
