import { useMemo } from "react";
import { count } from "./helper";
import { cn } from "../helpers";
import "./styles.scss";

export interface GridItemProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
  transparent?: boolean;
  header?: boolean;
  sticky?: boolean;
  span?: boolean;
}

const Item = ({ children, transparent, header, sticky, span, ...props }: GridItemProps) => {
  return (
    <div
      {...props}
      className={cn(
        "grid-item",
        {
          "grid-item--empty": transparent || children === undefined,
          "grid-item--header": header,
          "grid-item--sticky": sticky,
          "grid-item--span": span,
        },
        props.className
      )}
    >
      {children}
    </div>
  );
};

type GridItem = React.ReactElement<GridItemProps> | Iterable<GridItem>;

export interface GridProps {
  columns?: number;
  rows?: number;
  overflow?: "horizontal" | "vertical" | "both";
  children: GridItem;
}

export interface GridStaticProps {
  Item: typeof Item;
}

export const Grid: React.FC<GridProps> & GridStaticProps = ({ columns, rows, children }) => {
  const childrenLength = useMemo(() => count(children), [children]);

  const gridTemplateColumns = useMemo(
    () =>
      Array.from(new Array(Math.ceil(columns ?? childrenLength / (rows ?? 1))))
        .map(() => "auto")
        .join(" "),
    [childrenLength, columns, rows]
  );
  const gridTemplateRows = useMemo(
    () =>
      Array.from(new Array(Math.ceil(rows ?? childrenLength / (columns ?? 1))))
        .map(() => "auto")
        .join(" "),
    [childrenLength, columns, rows]
  );

  return (
    <div className="grid">
      <div className="grid-container">
        <div
          className="grid-content"
          style={{
            gridTemplateColumns,
            gridTemplateRows,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

Grid.Item = Item;
