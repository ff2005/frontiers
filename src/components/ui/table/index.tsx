import { useMemo } from "react";
import { cn } from "../helpers";
import "./styles.scss";

export interface TableProps {
  renderCell?: (cell: any) => JSX.Element;
  renderColumn?: (column: any) => JSX.Element;
  data: {
    header?: boolean;
    sticky?: boolean;
    type?: string;
    value: any;
  }[][];
}

export const Table = ({ data }: TableProps) => {
  const gridTemplateColumns = useMemo(
    () => data[0]?.map(() => "auto").join(" "),
    [data]
  );
  const gridTemplateRows = useMemo(
    () => data.map(() => "auto").join(" "),
    [data]
  );

  return (
    <div className="table">
      <div className="table-container">
        <div
          className="table-content"
          style={{
            gridTemplateColumns,
            gridTemplateRows,
          }}
        >
          {data.map((column, ci) =>
            column.map((row, ri) => (
              <div
                className={cn(
                  "table-cell",
                  { "table-cell--header": row.header },
                  { "table-cell--center": row.header && ri > 0 },
                  { "table-cell--sticky": row.sticky },
                  { "table-cell--right": row.type === 'number' },
                  { "table-cell--empty": row.type === 'empty' },
                )}
                key={`[${ci},${ri}]`}
              >
                {row.value}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
