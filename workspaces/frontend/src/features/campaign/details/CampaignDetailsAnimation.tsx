import { useMemo } from "react";
import style from "./style.module.css";

type Props = {
  x?: number;
  y?: number;
}

export const CampaignDetailsAnimation = ({x,y}: Props) => {
  const origin = useMemo(() => ({
    x: x ? `${x}px` : "50%",
    y: y ? `${y}px` : "50%",
  }), [x, y]);

  return <style>{`
    @keyframes unzoom {
      from {
        top: ${origin.y};
        left: ${origin.x};
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

    .${style.details} article {
      animation: unzoom 0.3s;
      transition: 0.2s
    }

    .${style.details}:active article {
      top: ${origin.y};
      left: ${origin.x};
      max-width: 2rem;
      max-height: 2rem;
      border-radius: 2rem;
      padding: 0;
      overflow: hidden;
    }
  `}</style>;
}