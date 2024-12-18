import { Badge } from "./ui/badge";
import ScatterChart from "./ScatterChart";
import LineChart from "./LineChart";
import GenerationsTable from "./generationsTable";
import RunGA from "./runGA";
import RunDE from "./runDE";
import { ScrollArea } from "./ui/scroll-area";

interface GAMessage {
  best_distance: number;
  best_route: number[];
  n_generations: number;
  gen_of_best_distance: number[];
  best_distance_arr: number[];
}

export default function AlgorithmComponent( {
  DSmessage,
  DSisPending,
  GAmessageSt,
  GAisPending,
  GAformAction,
  headerTitle,
}: {
  DSmessage: {customers:number,x:number[],y: number[]};
  DSisPending: boolean;
  GAmessageSt: GAMessage | null;
  GAisPending: boolean;
  GAformAction: (payload: FormData) => void;
  headerTitle: string;
}) {
  const showLoader = DSisPending || GAisPending;
  const bestDistance = GAmessageSt?.best_distance?.toFixed(2);
  return (
    <>
      {/* Central Content Area */}
      <ScrollArea className="p-2 w-2/3 max-w-full relative">
        <h1 className="text-3xl font-bold mb-2 text-center">{headerTitle}</h1>
        {/* Loading Indicator */}
        {showLoader && (
          <div className=" absolute h-full w-full flex justify-center items-center bg-transparent">
            <img
              className="bg-transparent w-56 h-56 rounded-3xl"
              src="/spinning-cat.gif"
              alt="Spinning Cat"
              // width={220}
              // height={220}
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
            <h1 className="text-xl font-bold mb-2 text-center">
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
      </ScrollArea>

      {/* Right Sidebar - Genetic Algorithm Controls */}
      <div className="w-1/3 p-2 flex flex-col justify-between">
        <GenerationsTable generationsRes={GAmessageSt} />
        {headerTitle === "Genetic Algorithm"? (<RunGA action={GAformAction} pending={GAisPending} title={headerTitle} />) : (<RunDE action={GAformAction} pending={GAisPending} title={headerTitle} />)}
      </div>
    </>
  );
}
