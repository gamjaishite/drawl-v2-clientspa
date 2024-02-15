import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx'
import {Button} from '@/components/ui/button.tsx'

const ConfirmDialog = (props: {
  open: boolean;
  setOpen: (x: boolean) => void;
  setCreateOpen: (x: boolean) => void;
}) => {
  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Discard Changes?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will discard all your changes.
          </DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <Button type='button'>Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type='button' variant='ghost' onClick={() => props.setCreateOpen(false)}>Discard</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
export default ConfirmDialog