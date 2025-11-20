"use client";

import { createContext, useCallback, useContext, useState, ReactNode } from "react";
import { BookingModal } from "@/components/ui/BookingModal";

type BookingModalContextType = {
  open: () => void;
  close: () => void;
};

const BookingModalContext = createContext<BookingModalContextType | null>(null);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <BookingModalContext.Provider value={{ open, close }}>
      {children}
      <BookingModal isOpen={isOpen} onClose={close} />
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error("useBookingModal must be used within a BookingModalProvider");
  }
  return context;
}
