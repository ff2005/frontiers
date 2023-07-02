import { useMemo } from "react";
import { useAnomalies } from "../../hooks";
import { Navigation, Table } from "../../components";
import { format } from "../../helper";

export const Anomalies = () => {
  const anomalies = useAnomalies();

  const data = useMemo(() => {
    if (anomalies) {
      const levels = Object.keys(anomalies.level);
      return [
        [
          { value: "Levels", header: true, sticky: true },
          ...levels.map((l) => ({
            value: l,
            header: true,
          })),
          { value: "", type: "empty" },
        ],
        [
          { value: "Energy", header: true, sticky: true },
          ...levels.map((l) => ({
            value: anomalies.level[l].energy,
            type: "number",
          })),
          { value: "Spend" },
        ],
        [
          { value: "R1", header: true, sticky: true },
          ...levels.map((l) => ({
            value: format.toNumberRange(anomalies.level[l]["R1"]),
            type: "number",
          })),
          { value: "Gain" },
        ],
        [
          { value: "R2", header: true, sticky: true },
          ...levels.map((l) => ({
            value: format.toNumberRange(anomalies.level[l]["R2"]),
            type: "number",
          })),
          { value: "Gain" },
        ],
        [
          { value: "R3", header: true, sticky: true },
          ...levels.map((l) => ({
            value: format.toNumberRange(anomalies.level[l]["R3"]),
            type: "number",
          })),
          { value: "Gain" },
        ],
        [
          { value: "R1 / Energy", header: true, sticky: true },
          ...levels.map((l) => ({
            value: format.toNumberRange(anomalies.level[l].r1PerEnergy),
            type: "number",
          })),
          { value: "", type: "empty" },
        ],
        [
          { value: "R2 / Energy", header: true, sticky: true },
          ...levels.map((l) => ({
            value: format.toNumberRange(anomalies.level[l].r2PerEnergy),
            type: "number",
          })),
          { value: "", type: "empty" },
        ],
        [
          { value: "R3 / Energy", header: true, sticky: true },
          ...levels.map((l) => ({
            value: format.toNumberRange(anomalies.level[l].r3PerEnergy),
            type: "number",
          })),
          { value: "", type: "empty" },
        ],
      ];
    }
    return [];
  }, [anomalies]);

  return (
    <div>
      <Navigation.Anchor name="anomalies" />
      <h2>Anomalies</h2>
      <Table data={data} />
    </div>
  );
};
