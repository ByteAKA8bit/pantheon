import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PropTypes from "prop-types";

ShareDialog.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  shareButtons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ),
};

export function ShareDialog({ open, onOpenChange, shareButtons = [] }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" closeIconSize={8}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Share and start chatting
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {shareButtons.map((button, index) => (
            <Button key={index} onClick={button.onClick} variant="outline">
              {button.icon}
              {button.label}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ShareDialog;
