import { ReactNode, useEffect, useMemo, useState } from "react";
import { DialogAnimation } from "./DialogAnimation";
import style from "./style.module.css";

type Props = {
  children: ReactNode;
  open: boolean;
  shouldClose: boolean;
  onClose: () => void;
  poppingOrigin: {
    x: number;
    y: number;
  }
}

export const Dialog = ({children, open, shouldClose, onClose, poppingOrigin}: Props) => {
  const [isClosing, setIsClosing] = useState(false);
  const className = useMemo(() => [
    style.dialog,
    isClosing ? style.closing : null
  ].filter(Boolean).join(" "), [isClosing])

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose?.();
      setIsClosing(false);
    }, 200);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { shouldClose && handleClose() }, [shouldClose])

  if(!open) return null;

  return <>
    <DialogAnimation x={poppingOrigin.x} y={poppingOrigin.y}/>
    <dialog className={className} onClick={handleClose} open>
      <article onClick={e => e.stopPropagation()}>
        {children}
      </article>
    </dialog>
  </>;
}