import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const useProjectionForm = (onSubmitSuccess: () => void) => {
  const [date, setDate] = useState<Date>();
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"payable" | "receivable">("receivable");
  const [description, setDescription] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !amount || !selectedAccount || !description) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields",
      });
      return;
    }

    const formData = {
      date,
      amount: parseFloat(amount),
      type,
      description,
      accountId: selectedAccount,
    };

    console.log("Form submitted:", formData);
    
    toast({
      title: "Success",
      description: "Cash flow projection saved successfully",
    });

    resetForm();
    onSubmitSuccess();
  };

  const resetForm = () => {
    setDate(undefined);
    setAmount("");
    setType("receivable");
    setDescription("");
    setSelectedAccount("");
  };

  return {
    date,
    setDate,
    amount,
    setAmount,
    type,
    setType,
    description,
    setDescription,
    selectedAccount,
    setSelectedAccount,
    handleSubmit,
  };
};