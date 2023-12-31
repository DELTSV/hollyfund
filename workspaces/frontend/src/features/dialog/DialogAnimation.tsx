import { useMemo } from "react";
import style from "./style.module.css";

type Props = {
  x: number;
  y: number;
}

export const DialogAnimation = ({x,y}: Props) => {
  const poppingOrigin = useMemo(() => ({
    x: x ? `${x}px` : "50%",
    y: y ? `${y}px` : "50%",
  }), [x, y]);

  return <style>{`
    @keyframes unzoom {
      from {
        top: ${poppingOrigin.y};
        left: ${poppingOrigin.x};
        max-width: 2rem;
        max-height: 2rem;
        border-radius: 2rem;
        padding: 0;
        overflow: hidden;
      }
      to {
        top: 50%;
        left: 50%;
      }
    }

    .${style.dialog} {
      article {
        animation: unzoom 0.3s;
        transition: 0.2s;
      }
      
      &.${style.closing} article {
        top: ${poppingOrigin.y};
        left: ${poppingOrigin.x};
        max-width: 2rem;
        max-height: 2rem;
        border-radius: 2rem;
        padding: 0;
        overflow: hidden;
      }
    }
  `}</style>;
}