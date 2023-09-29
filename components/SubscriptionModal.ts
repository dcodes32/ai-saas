import React from 'react';
import { useProModal } from "@/hooks/use-pro-modal";

const SubscriptionModal: React.FC = () => {
  const { isOpen, onClose } = useProModal();

  if (!isOpen) return null;

  return React.createElement(
    "div", 
    { className: "fixed inset-0 flex items-center justify-center z-50" },
    React.createElement(
      "div",
      { className: "bg-white p-6 rounded-md shadow-lg" },
      React.createElement("h2", { className: "text-xl font-bold" }, "Premium Feature"),
      React.createElement("p", null, "This feature is exclusive to subscribers. Please subscribe for full access."),
      React.createElement("button", { onClick: onClose, className: "mt-4 bg-blue-500 text-white p-2 rounded-md" }, "Close")
    )
  );
}

export default SubscriptionModal;
