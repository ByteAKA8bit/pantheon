import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PropTypes from "prop-types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";

DonateDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
};

export function DonateDialog({ open, onOpenChange }) {
  const donateAmounts = [
    { value: "0.06", label: "0.06 SOL" },
    { value: "0.7", label: "0.7 SOL" },
    { value: "1.82", label: "1.82 SOL" },
    { value: "3.6", label: "3.6 SOL" },
    { value: "5.55", label: "5.55 SOL" },
  ];

  const [donateAmount, setDonateAmount] = useState("0.06");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">捐赠</DialogTitle>
          <DialogDescription className="text-lg font-bold">
            请选择捐赠金额
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="flex flex-col gap-2">
            <RadioGroup
              defaultValue={donateAmount}
              className="grid grid-cols-2 gap-2"
              onValueChange={setDonateAmount}
            >
              {donateAmounts.map((amount, index) => (
                <div
                  key={amount.value}
                  className={`flex items-center space-x-2 bg-zinc-100 p-4 rounded-md ${
                    index === donateAmounts.length - 1
                      ? "w-full col-span-2"
                      : "w-auto"
                  }`}
                >
                  <RadioGroupItem value={amount.value} id={`amount-${index}`} />
                  <Label htmlFor={`amount-${index}`}>{amount.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="flex flex-col items-center justify-center">
            {/* 这里可以放置二维码图片 */}
            <div className="w-32 h-32 bg-gray-200 rounded-lg mb-2"></div>
            <div className="text-center text-sm text-muted-foreground">
              请扫描二维码进行打赏
            </div>
          </div>
        </div>
        <DialogFooter>
          <div className="text-sm text-muted-foreground text-center w-full">
            扫码支付:{donateAmount} SOL,您的支付记录会被自动记录
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DonateDialog;
