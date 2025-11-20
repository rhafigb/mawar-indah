"use client";
import { useState } from "react";
import { X, Save, Loader2 } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
}

export default function OrderModal({
  isOpen,
  onClose,
  onSave,
}: OrderModalProps) {
  const [formData, setFormData] = useState({
    customer_name: "",
    whatsapp_number: "",
    items_summary: "",
    total_amount: "" as number | "",
    status: "Proses",
  });

  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave({
        ...formData,
        total_amount: Number(formData.total_amount),
      });
      setFormData({
        customer_name: "",
        whatsapp_number: "",
        items_summary: "",
        total_amount: "",
        status: "Proses",
      }); // Reset
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };
}
