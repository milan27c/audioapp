"use client";

import { useState } from "react";
import { NowPlayingHeader } from "@/components/audio/now-playing-header";
import { EqualizerTabs, type EqTabKey } from "@/components/audio/equalizer-tabs";
import { EqualizerBands } from "@/components/audio/equalizer-bands";
import { EqPresets } from "@/components/audio/eq-presets";
import { usePlayback } from "@/components/layout/playback-context";
import {
  deviceStatus,
  eqPresets,
  EQ_MIN_DB,
  EQ_MAX_DB,
  type EqPreset,
} from "@/lib/mock-data";

export function EqualizerScreen() {
  // EQ state lives in the global playback context so it drives the live Web
  // Audio filter graph — dragging a band or picking a preset shapes the sound
  // of whatever is currently playing.
  const { eqBands, setEqBand, setEqValues } = usePlayback();
  const [activeTab, setActiveTab] = useState<EqTabKey>("equalizer");
  const [activePreset, setActivePreset] = useState<string | null>(null);

  function updateBand(index: number, value: number) {
    setActivePreset(null);
    setEqBand(index, value);
  }

  function applyPreset(preset: EqPreset) {
    setActivePreset(preset.name);
    setEqValues(preset.values);
  }

  return (
    <div className="flex flex-1 flex-col px-4 pb-24">
      <NowPlayingHeader deviceName={deviceStatus.name} connection={deviceStatus.connection} />

      <div className="mt-6 flex justify-center">
        <EqualizerTabs active={activeTab} onChange={setActiveTab} />
      </div>

      {activeTab === "equalizer" ? (
        <>
          <div className="mt-8">
            <EqualizerBands bands={eqBands} min={EQ_MIN_DB} max={EQ_MAX_DB} onChange={updateBand} />
          </div>

          <div className="mt-6">
            <EqPresets presets={eqPresets} activePreset={activePreset} onSelectPreset={applyPreset} />
          </div>
        </>
      ) : (
        <div className="mt-24 flex flex-1 flex-col items-center text-center">
          <p className="text-sm font-medium text-foreground/50">
            {activeTab === "bass" ? "Bass control" : "Microphone control"} — coming soon
          </p>
        </div>
      )}
    </div>
  );
}
