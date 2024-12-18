
import { useActionState } from "react";
import { useEffect, useState, useCallback } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard } from 'swiper/modules';
// Components
import CustomersTable from "./components/customersTable";
import SubmitCustomersButton from "./components/submitCustomersButton";
import AlgorithmComponent from "./components/algorithmComponent";

// Server Actions
import { generateDataset, runGeneticAlgorithm, runDifferentialEvolution } from "./lib/actions";


import 'swiper/css';
// Types 
import type { Swiper as SwiperType } from "swiper";
interface Message {
  best_distance: number;
  best_route: number[];
  n_generations: number;
  gen_of_best_distance: number[];
  best_distance_arr: number[];
}

export default function App() {
  const [DSmessage, DSformAction, DSisPending] = useActionState(
    generateDataset,
    null
  );
  const [GAmessage, GAformAction, GAisPending] = useActionState(
    runGeneticAlgorithm,
    null
  );
  const [DEmessage, DEformAction, DEisPending] = useActionState(
    runDifferentialEvolution,
    null
  );
  const [GAmessageSt, setGAmessageSt] = useState<Message | null>(GAmessage);
  const [DEmessageSt, setDEmessageSt] = useState<Message | null>(GAmessage);
  

  useEffect(() => {
    setGAmessageSt(GAmessage);
  }, [GAmessage]);

  useEffect(() => {
    setDEmessageSt(DEmessage);
  }, [DEmessage]);


  // Memoized clear handler to prevent unnecessary re-renders
  const handleClear = useCallback(() => {
    setGAmessageSt(null);
    setDEmessageSt(null);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex h-full w-full p-2 gap-2">
        {/* Left Sidebar - Dataset Generation */}
        <div className="w-1/4 p-2 flex flex-col justify-between border-2 rounded-xl">
          <CustomersTable customers={DSmessage} />
          <SubmitCustomersButton
            action={DSformAction}
            setClear={handleClear}
            pending={DSisPending}
          />
        </div>
        <Swiper
          modules={[Keyboard]}
          direction={'vertical'}
          slidesPerView={1}
          className="w-3/4"
          keyboard={true}
          allowTouchMove={false}
          >
          <SwiperSlide className="!flex border-2 rounded-xl">
            <AlgorithmComponent
              DSisPending={DSisPending}
              DSmessage={DSmessage}
              GAmessageSt={GAmessageSt}
              GAisPending={GAisPending}
              GAformAction={GAformAction}
              headerTitle="Genetic Algorithm"
            />
          </SwiperSlide>
          <SwiperSlide className="!flex border-2 rounded-xl">
            <AlgorithmComponent
              DSisPending={DSisPending}
              DSmessage={DSmessage}
              GAmessageSt={DEmessageSt}
              GAisPending={DEisPending}
              GAformAction={DEformAction}
              headerTitle="Differential Evolution"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </ThemeProvider>
  );
}
