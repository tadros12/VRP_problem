"use client";

import React, { useActionState, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

// Components
import CustomersTable from "@/components/customersTable";
import SubmitCustomersButton from "@/components/submitCustomersButton";
import ScatterChart from "@/components/ScatterChart";
import LineChart from "@/components/LineChart";
import GenerationsTable from "@/components/generationsTable";
import RunGA from "@/components/runGA";

// Server Actions
import { generateDataset, runGeneticAlgorithm } from "@/lib/actions";

// Types (consider moving to a separate types file)
interface GAMessage {
  best_distance?: number;
  best_route?: number[];
  n_generations?: number;
  gen_of_best_distance?: number[];
  best_distance_arr?: number[];
}

export default function Home() {
  // State management with improved typing
  // const [clear, setClear] = useState(false);
  const [DSmessage, DSformAction, DSisPending] = useActionState(generateDataset, null);
  const [GAmessage, GAformAction, GAisPending] = useActionState(runGeneticAlgorithm, null);
  const [GAmessageSt, setGAmessageSt] = useState<GAMessage | null>(GAmessage);

  // // Memoized effect to handle GA message updates
  // const [count, setCount] = useState(0);
  // useEffect(() => { 
  //   //Implementing the setInterval method
  //   const interval = setInterval(() => {
  //       console.log(GAmessage)
  //       console.log(GAmessageSt?.best_route)
  //       if(GAmessage && count !== GAmessage.best_route.length){
  //         setCount(count + 1);
  //         console.log("incremented")
  //       }
  //     }, 300);

  //     //Clearing the interval
  //     return () => clearInterval(interval);
  // }, [count]);
  useEffect(() => {
    setGAmessageSt(GAmessage)
    // if (clear) {
    //   setGAmessageSt(null);
    //   setClear(false);
    // } else {
    //   setGAmessageSt(GAmessage);
    // }
  }, [GAmessage]);

  // Compute derived values
  const showLoader = DSisPending || GAisPending;
  const bestDistance = GAmessageSt?.best_distance?.toFixed(2);

  // Memoized clear handler to prevent unnecessary re-renders
  const handleClear = useCallback(() => {
    setGAmessageSt(null);
  }, []);

  return (
    <div className="flex h-full w-full p-2">
      {/* Left Sidebar - Dataset Generation */}
      <div className="w-1/4 p-2 flex flex-col justify-between">
        <CustomersTable customers={DSmessage} />
        <SubmitCustomersButton 
          action={DSformAction} 
          setClear={handleClear} 
        />
      </div>

      {/* Central Content Area */}
      <div className="p-2 w-2/4 max-w-full">
        {/* Loading Indicator */}
        {showLoader && (
          <div className="h-full w-full flex justify-center items-center bg-transparent">
            <Image
              priority
              className="bg-transparent"
              src="/spinning-cat.gif"
              alt="Spinning Cat"
              width={220}
              height={220}
            />
          </div>
        )}

        {/* Best Distance Badge */}
        {bestDistance && !GAisPending && (
          <div className="w-full flex my-3">
            <Badge 
              variant="outline" 
              className="mx-auto text-center text-2xl p-3 hover:bg-accent transition-colors"
            >
              Best Distance: {bestDistance}
            </Badge>
          </div>
        )}

        {/* Customer Locations Scatter Chart */}
        {DSmessage && !DSisPending && !GAisPending && (
          <>
            <h1 className="text-2xl font-bold mb-4 text-center">
              Customer Locations
            </h1>
            <ScatterChart 
              coords={DSmessage} 
              bestRoute={GAmessageSt?.best_route} 
            />
          </>
        )}

        {/* Generations Line Chart */}
        {GAmessageSt && !GAisPending && (
          <LineChart
            n_generations={GAmessageSt?.n_generations}
            generations={GAmessageSt?.gen_of_best_distance}
            bestDistances={GAmessageSt?.best_distance_arr}
          />
        )}
      </div>

      {/* Right Sidebar - Genetic Algorithm Controls */}
      <div className="w-1/4 p-2 flex flex-col justify-between">
        <GenerationsTable generationsRes={GAmessageSt} />
        <RunGA action={GAformAction} />
      </div>
    </div>
  );
}