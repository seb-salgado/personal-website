import * as React from "react"
import { cn } from "@/lib/utils"

interface Column {
  key: string
  label: string
  align?: "left" | "right"
}

interface Row {
  [key: string]: React.ReactNode
}

interface PTable1Props {
  columns: Column[]
  rows: Row[]
  className?: string
}

export function PTable1({ columns, rows, className }: PTable1Props) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-[var(--color-border)]">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "py-2 font-medium text-[var(--color-fg-muted)] text-left",
                  col.align === "right" && "text-right"
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[var(--color-border)] last:border-0">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    "py-3 text-[var(--color-fg)] align-top",
                    col.align === "right" && "text-right"
                  )}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
