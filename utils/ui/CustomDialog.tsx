import { FC } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({ open, onConfirm, onCancel, isLoading }) => {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader className="text-right py-4">
          <DialogTitle>تایید حذف</DialogTitle>
          <DialogDescription>آیا مطمئن هستید که می‌خواهید این مورد را حذف کنید؟</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex items-center gap-3">
          <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
            لغو
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "در حال حذف..." : "حذف"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
