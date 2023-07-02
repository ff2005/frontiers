import { useMemo } from "react";
import { useEnergy } from "../../hooks";
import { Navigation, Table } from "../../components";
import { format } from "../../helper";

export const Energy = () => {
  const energy = useEnergy();

  const specs = useMemo(() => {
    if (energy) {
      return [[{ value: "Energy Pack", header: true }, { value: energy.pack }]];
    }
    return [];
  }, [energy]);

  const generation = useMemo(() => {
    if (energy) {
      return [
        [
          { value: "Max Energy Generation", header: true },
          { value: energy.generation.max },
        ],
        [
          { value: "Generation Time", header: true },
          { value: format.toMinutes(energy.generation.minutes) },
        ],
        [
          { value: "Max Generation Time", header: true },
          { value: format.toTime(energy.generation.minutesToMaxGeneration) },
        ],
      ];
    }
    return [];
  }, [energy]);

  const daily = useMemo(() => {
    if (energy && energy.pack) {
      return [
        [
          { value: "Generated", header: true },
          { value: "Limited Bundles", header: true },
          { value: "Platinum Market", header: true },
          { value: "Playtime Rewards", header: true },
          { value: "Alliance", header: true },
          { value: "Total", header: true },
        ],
        [
          { value: energy.generatedPerDay, type: 'number' },
          { value: energy.daily["Limited Bundles"].pack * energy.pack, type: 'number' },
          { value: energy.daily["Platinum Market"].pack * energy.pack, type: 'number' },
          { value: energy.daily["Playtime Rewards"].energy, type: 'number' },
          { value: format.toNumberRange(energy.daily["Alliance"].energy), type: 'number' },
          { value: format.toNumberRange(energy.totalPerDay), type: 'number' },
        ],
        [
          { value: "Energy", type: 'number' },
          { value: `Pack (${energy.daily["Limited Bundles"].pack})`, type: 'number' },
          { value: `Pack (${energy.daily["Platinum Market"].pack})`, type: 'number' },
          { value: "Energy", type: 'number' },
          { value: "Energy", type: 'number' },
          { value: "", type: "empty" },
        ]
      ];
    }
    return [];
  }, [energy]);

  return (
    <div>
      <Navigation.Anchor name="energy" />
      <h2>Energy</h2>
      <Table data={specs} />
      <Navigation.Anchor name="energy-generation" />
      <h3>Generation</h3>
      <Table data={generation} />
      <Navigation.Anchor name="energy-daily" />
      <h3>Daily</h3>
      <Table data={daily} />
    </div>
  );
};
