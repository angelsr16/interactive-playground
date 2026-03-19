export const VisualGridText = ({ grid }: { grid: number[] }) => {
  const rows = [grid.slice(0, 3), grid.slice(3, 6), grid.slice(6, 9)];

  return (
    <pre
      style={{
        fontFamily: "monospace",
        lineHeight: "1.5",
      }}
    >
      {rows.map((row) => row.join(" ")).join("\n")}
    </pre>
  );
};
