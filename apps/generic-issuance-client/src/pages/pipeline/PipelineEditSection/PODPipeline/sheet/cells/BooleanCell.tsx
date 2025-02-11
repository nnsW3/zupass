import { PODPipelineInputFieldType } from "@pcd/passport-interface";
import { coercions } from "@pcd/podbox-shared";
import * as React from "react";
import {
  CellBase,
  DataEditorComponent,
  DataViewerComponent
} from "react-spreadsheet";

type Cell = CellBase<boolean | string | undefined>;

export const BooleanViewer: DataViewerComponent<Cell> = ({ cell }) => {
  const value = cell?.value || "";
  const parsed = coercions[PODPipelineInputFieldType.Boolean](value);
  return (
    <div
      className={`Spreadsheet__data-viewer ${
        parsed.success ? "" : "Spreadsheet__data-viewer--invalid"
      }`}
    >
      {value}
    </div>
  );
};

export const BooleanEditor: DataEditorComponent<Cell> = ({
  cell,
  onChange
}) => {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...cell,
        value: event.target.checked
      });
    },
    [cell, onChange]
  );

  const value = cell?.value || "";
  const parsed = coercions[PODPipelineInputFieldType.Boolean](value);

  return (
    <div className="Spreadsheet__data-editor">
      <input
        autoFocus
        type="checkbox"
        onChange={handleChange}
        checked={parsed.success ? parsed.data : false}
      />
    </div>
  );
};
