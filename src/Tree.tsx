import React from "react";

// Tree.tsx
export default function Tree({ fileName, parsedXML }: { fileName: any; parsedXML: any }): JSX.Element {
  return (
    <div>
      {parsedXML.map((record: any) => (
        <div key={record.id}>{record.id}</div>
      ))}
    </div>
  );
}
